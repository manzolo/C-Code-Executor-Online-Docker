# C Code Executor Online

---

## Project Description

This web application lets users write, compile, and run C code right from their browser. It's built with Flask for the backend, Socket.IO for real-time communication, and Docker for an isolated execution environment. The user interface features an advanced code editor (CodeMirror) and an accordion-style layout for a better user experience.

---

## Key Features

* **Interactive Code Editor**: Write your C code in an enhanced textarea powered by **CodeMirror**, featuring syntax highlighting, line numbers, automatic indentation, and Tab key handling.
* **Real-time Compilation and Execution**: Your C code is sent to the server, compiled using **GCC**, and then executed. The output (both standard output and errors) streams back to your browser in real time.
* **Accordion User Interface**: The interface is cleanly organized with expandable/collapsible sections for the source code and console output. The output panel automatically opens when you run your code.
* **Dockerized Environment**: The entire application runs inside **Docker containers**, providing a consistent and isolated environment for development and deployment.
* **Execution Timeout**: Running C programs have a maximum execution time limit to prevent infinite loops or excessive resource consumption.
* **Automatic Cleanup**: Temporary files created during compilation and execution are automatically removed from the server.

---

## How to Use

Follow these steps to get the application running on your local machine.

### Prerequisites

* **Docker** and **Docker Compose** installed on your system.

### Starting the Application

1.  **Clone the repository** (or make sure all files are in the same directory):
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <your_repository_folder_name>
    ```
2.  **Ensure your files are correctly set up**:
    * `app.py`: The Flask-SocketIO backend.
    * `Dockerfile.web_app`: Defines the Docker image for the web service (includes GCC).
    * `index.html`: The frontend user interface.
    * `requirements.txt`: Python dependencies for Flask and Flask-SocketIO.
    * `docker-compose.yml`: The Docker Compose file for service management.
3.  **Build and start the Docker containers**:
    From your project's root directory, run:
    ```bash
    docker compose up --build
    ```
    This command will build the necessary Docker images and start the Flask-SocketIO server. You might see some `AssertionError` messages from `gevent` when it starts up; these are usually harmless and won't stop the application from working.
4.  **Access the application**:
    Open your web browser and go to:
    ```
    http://localhost:8080
    ```

### Using the Interface

1.  Write (or modify) your C code in the "Source Code" section. The CodeMirror editor will give you syntax highlighting and other helpful features.
2.  Click the **"Compile and Run"** button.
3.  The "Output Console" section will automatically expand and show you compiler messages (any errors) and your program's output.
4.  You can expand or collapse the "Source Code" and "Output Console" sections by clicking their respective headers.

---

## Technologies Used

* **Backend**:
    * **Python 3.x**
    * **Flask**: A Python micro web framework.
    * **Flask-SocketIO**: A Flask extension for WebSocket handling.
    * **Gunicorn**: A WSGI HTTP server for Flask.
    * **Gevent / Gevent-WebSocket**: Libraries for asynchronous programming.
    * **subprocess**: Python module for running system commands (GCC, C programs).
    * **GCC**: The GNU Compiler Collection, used for compiling C code.
* **Frontend**:
    * **HTML5**
    * **CSS3**
    * **JavaScript**
    * **Socket.IO Client**: A JavaScript library for real-time WebSocket communication.
    * **CodeMirror**: A JavaScript code editor for an advanced input interface.
* **Deployment / Containerization**:
    * **Docker**
    * **Docker Compose**

---

## Considerations and Future Improvements

* **Security**: Allowing users to run arbitrary code on your server is a significant security risk. For a production environment, it's crucial to implement a **robust security sandbox** (e.g., isolated Docker containers with resource limits, seccomp, AppArmor, or Firecracker) for each code execution.
* **Scalability**: To handle many users simultaneously, you might consider using a load balancer and more advanced Gunicorn worker management.
* **Editor Features**: Add features like autocompletion, C code linting, or the ability to upload/download files.
* **Customization**: Let users choose editor themes or other display options.
* **Multi-Language Support**: Extend the application to support other programming languages (C++, Python, Java, etc.).
* **Persistence**: If needed, save user code or output for future reference (this would require a database).
