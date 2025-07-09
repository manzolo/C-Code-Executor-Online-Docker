from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import subprocess
import os
import sys
import select
import gevent
import uuid
import shutil
import time # Add this import at the beginning of your app.py

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app, async_mode='gevent', logger=False, engineio_logger=False, cors_allowed_origins="*")

# Directory where temporary C code files will be saved and compiled
COMPILE_DIR = '/tmp/c_code_runner'
# Maximum execution time for a compiled program (in seconds)
MAX_EXECUTION_TIME = 5

# This directory creation runs when the app module is imported by Gunicorn.
# os.makedirs(..., exist_ok=True) ensures it's safe to call multiple times.
os.makedirs(COMPILE_DIR, exist_ok=True)
print(f"Setup: Compilation directory created or already exists: {COMPILE_DIR}")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def test_connect():
    print(f"Client {request.sid} connected.")
    emit('status', {'data': 'Connected. Enter your C code.'})

@socketio.on('disconnect')
def test_disconnect():
    print(f"Client {request.sid} disconnected.")

@socketio.on('compile_and_run')
def handle_compile_and_run(data):
    session_id = request.sid
    c_code = data.get('code', '')
    
    if not c_code.strip():
        emit('error_message', {'data': 'No C code provided.'}, room=session_id)
        return

    # Create a unique subdirectory for each execution to isolate files
    run_id = str(uuid.uuid4())
    current_run_dir = os.path.join(COMPILE_DIR, run_id)
    os.makedirs(current_run_dir, exist_ok=True)

    c_file_path = os.path.join(current_run_dir, 'main.c')
    executable_path = os.path.join(current_run_dir, 'output_program')

    try:
        # 1. Save the C code to a file
        with open(c_file_path, 'w') as f:
            f.write(c_code)
        
        emit('compiler_output', {'data': 'Code saved. Compiling...'}, room=session_id)
        
        # 2. Compile the C code
        # Use subprocess.run for compilation as we wait for it to finish
        compile_command = ['gcc', c_file_path, '-o', executable_path]
        print(f"[{session_id}] Compiling: {' '.join(compile_command)}")
        compile_process = subprocess.run(
            compile_command,
            capture_output=True, # Capture stdout and stderr
            text=True,
            timeout=10 # Timeout for compilation
        )

        if compile_process.returncode != 0:
            emit('error_message', {'data': f'Compilation error:\n{compile_process.stdout}\n{compile_process.stderr}'}, room=session_id)
            print(f"[{session_id}] Compilation failed.")
            return
        
        emit('compiler_output', {'data': 'Compilation successful. Executing...'}, room=session_id)
        
        # 3. Execute the compiled program in a separate greenlet
        # to avoid blocking the Flask-SocketIO worker
        gevent.spawn(run_compiled_program_stream, session_id, executable_path, current_run_dir)

    except subprocess.TimeoutExpired:
        emit('error_message', {'data': 'Compilation interrupted: maximum time exceeded.'}, room=session_id)
        print(f"[{session_id}] Compilation timed out.")
    except Exception as e:
        emit('error_message', {'data': f'Error handling file or during compilation: {e}'}, room=session_id)
        print(f"[{session_id}] Error in handle_compile_and_run: {e}")
    finally:
        # Cleanup of the directory will be done after execution
        pass


def run_compiled_program_stream(session_id, executable_path, run_dir):
    proc = None # Initialize proc to None for the finally block
    try:
        if not os.path.exists(executable_path):
            with app.app_context(): # Add this context
                socketio.emit('error_message', {'data': 'Error: Executable not found after compilation.'}, room=session_id)
            return
        if not os.access(executable_path, os.X_OK):
            os.chmod(executable_path, 0o755) 

        print(f"[{session_id}] Executing: {executable_path}")
        proc = subprocess.Popen(
            [executable_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1 # Line buffered
        )

        end_time = time.time() + MAX_EXECUTION_TIME
        
        # --- START OF CORRECT BLOCK ---
        while time.time() < end_time:
            # Check if the C process has terminated
            if proc.poll() is not None:
                break # Exit the loop if the process has terminated

            reads = [proc.stdout.fileno(), proc.stderr.fileno()]
            # select.select blocks the current greenlet for a maximum of 0.05 seconds
            ret = select.select(reads, [], [], 0.05)

            for fd in ret[0]:
                with app.app_context(): # Add this context for each emit
                    if fd == proc.stdout.fileno():
                        line = proc.stdout.readline()
                        if line:
                            socketio.emit('runtime_output', {'data': line}, room=session_id)
                    elif fd == proc.stderr.fileno():
                        line = proc.stderr.readline()
                        if line:
                            socketio.emit('error_message', {'data': f"[ERR] {line}"}, room=session_id)
            
            gevent.sleep(0.001) # Yield control to avoid blocking
        # --- END OF CORRECT BLOCK ---

        # This block executes AFTER the while loop has finished
        # Check if the process is still running (means timeout occurred)
        if proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=0.5)
            except subprocess.TimeoutExpired:
                proc.kill()
            with app.app_context(): # Add this context
                socketio.emit('error_message', {'data': f'Execution interrupted: maximum time ({MAX_EXECUTION_TIME}s) exceeded.'}, room=session_id)
            print(f"[{session_id}] Program execution timed out and terminated.")
        
        # Read any remaining output after termination/timeout
        with app.app_context(): # Add this context for remaining output
            for line in proc.stdout.readlines():
                if line: socketio.emit('runtime_output', {'data': line}, room=session_id)
            for line in proc.stderr.readlines():
                if line: socketio.emit('error_message', {'data': f"[ERR] {line}"}, room=session_id)


        proc.wait() # Ensure the process has fully terminated
        print(f"[{session_id}] Program finished with return code {proc.returncode}.")
        with app.app_context(): # Add this context
            socketio.emit('runtime_output', {'data': f'\n--- Program terminated (Code: {proc.returncode}) ---'}, room=session_id)

    except FileNotFoundError:
        with app.app_context(): # Add this context
            socketio.emit('error_message', {'data': 'Error: Executable not found (might be a permissions or compilation issue).'}, room=session_id)
    except Exception as e:
        with app.app_context(): # Add this context
            socketio.emit('error_message', {'data': f'Error during execution: {e}'}, room=session_id)
            print(f"[{session_id}] Error in run_compiled_program_stream: {e}")
    finally:
        # Ensure the process is terminated if not already, and clean up
        if proc and proc.poll() is None: # If the process is still alive
            proc.terminate()
            try:
                proc.wait(timeout=0.5)
            except subprocess.TimeoutExpired:
                proc.kill()
        
        if os.path.exists(run_dir):
            shutil.rmtree(run_dir)
            print(f"[{session_id}] Cleaned up directory: {run_dir}")