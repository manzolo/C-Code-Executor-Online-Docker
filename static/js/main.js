var socket = io.connect('http://' + document.domain + ':' + location.port);
var compileRunButton = document.getElementById('compile-run-button');
var outputConsole = document.getElementById('output-console');

// Accordion elements
var examplesHeader = document.getElementById('examples-header'); // NEW
var examplesContent = document.getElementById('examples-content'); // NEW
var examplesList = document.getElementById('examples-list'); // NEW

var codeHeader = document.getElementById('code-header');
var codeContent = document.getElementById('code-content');
var outputHeader = document.getElementById('output-header');
var outputContent = document.getElementById('output-content');


// --- Inizializzazione CodeMirror ---
var editor = CodeMirror.fromTextArea(document.getElementById("c-code"), {
    lineNumbers: true, // Show line numbers
    mode: "text/x-csrc", // Mode for C language
    theme: "dracula", // Dark theme (ensure theme CSS is included)
    indentUnit: 4, // 4 spaces for indentation
    tabSize: 4, // Tab is 4 spaces
    indentWithTabs: false, // Indent with spaces, not actual tabs
    extraKeys: {
        "Tab": function(cm) {
            // Indent on Tab press instead of changing focus
            if (cm.somethingSelected()) {
                cm.indentSelection("add");
            } else {
                cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end");
            }
        }
    },
    matchBrackets: true, // Highlight matching brackets
    autofocus: true // Editor receives focus on load
});

// Function to expand/collapse an accordion panel
function toggleAccordion(header, content, shouldOpen) {
    if (shouldOpen === undefined) { // If shouldOpen is not specified, act as a normal toggle
        shouldOpen = !content.classList.contains('show');
    }

    if (shouldOpen) {
        header.classList.add('active');
        content.classList.add('show');
        // Set max-height based on content's scrollHeight for smooth transition
        content.style.maxHeight = content.scrollHeight + "px";
        // After transition, set to 'none' or a very large value if content changes dynamically
        // This is tricky with dynamically changing content within the accordion,
        // but for fixed content like these examples, scrollHeight is fine.
        // For textarea/pre, it needs to be an arbitrary large enough value (e.g. 500px).
    } else {
        header.classList.remove('active');
        content.classList.remove('show');
        content.style.maxHeight = null; // Collapse
    }
}

// Function to dynamically populate examples list
function populateExamplesList() {
    examplesList.innerHTML = ''; // Clear existing list
    codeExamples.forEach((example, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = example.title;
        listItem.classList.add('example-item'); // Add a class for styling
        listItem.dataset.index = index; // Store index for easy lookup

        listItem.addEventListener('click', function() {
            // Set the editor content
            editor.setValue(codeExamples[this.dataset.index].code);
            
            // Clear output console
            outputConsole.textContent = "Code loaded from example. Click 'Compile and Run' to execute.";
            outputConsole.classList.remove('error-message');

            // Manage accordions:
            // 1. Close examples section
            toggleAccordion(examplesHeader, examplesContent, false);
            // 2. Open source code section
            toggleAccordion(codeHeader, codeContent, true);
            // 3. Close output section (it will reopen on run)
            toggleAccordion(outputHeader, outputContent, false);

            editor.focus(); // Focus the editor
            editor.setCursor(0, 0); // Move cursor to the beginning
            editor.refresh(); // Refresh CodeMirror to ensure correct display after content change
        });
        examplesList.appendChild(listItem);
    });
}


// Event listeners for accordion headers
examplesHeader.addEventListener('click', function() {
    toggleAccordion(examplesHeader, examplesContent);
    // When opening examples, close other sections
    if (examplesContent.classList.contains('show')) {
        toggleAccordion(codeHeader, codeContent, false);
        toggleAccordion(outputHeader, outputContent, false);
    }
});

codeHeader.addEventListener('click', function() {
    toggleAccordion(codeHeader, codeContent);
    // When opening code, close other sections
    if (codeContent.classList.contains('show')) {
        toggleAccordion(examplesHeader, examplesContent, false);
        toggleAccordion(outputHeader, outputContent, false);
    }
});

outputHeader.addEventListener('click', function() {
    toggleAccordion(outputHeader, outputContent);
    // When opening output, close other sections
    if (outputContent.classList.contains('show')) {
        toggleAccordion(examplesHeader, examplesContent, false);
        toggleAccordion(codeHeader, codeContent, false);
    }
});


socket.on('connect', function() {
    console.log('Connected to SocketIO server!');
    outputConsole.textContent = "Connected. Ready to receive C code.";
});

socket.on('disconnect', function() {
    console.log('Disconnected from SocketIO server!');
    outputConsole.textContent += '\n--- Disconnected from server ---';
});

socket.on('compiler_output', function(msg) {
    outputConsole.textContent += `\n[COMPILER] ${msg.data}`;
    outputConsole.scrollTop = outputConsole.scrollHeight;
});

socket.on('runtime_output', function(msg) {
    outputConsole.textContent += `\n[RUN] ${msg.data}`;
    outputConsole.scrollTop = outputConsole.scrollHeight;
});

socket.on('error_message', function(msg) {
    outputConsole.textContent += `\n[ERROR] ${msg.data}`;
    outputConsole.scrollTop = outputConsole.scrollHeight;
    outputConsole.classList.add('error-message');
});

compileRunButton.addEventListener('click', function() {
    outputConsole.textContent = "Compiling and executing...";
    outputConsole.classList.remove('error-message');
    
    // Accordion logic on button click
    // 1. Open output
    toggleAccordion(outputHeader, outputContent, true); 
    // 2. Close source code
    toggleAccordion(codeHeader, codeContent, false); 
    // 3. Close examples
    toggleAccordion(examplesHeader, examplesContent, false);
    
    // Get code from CodeMirror, not from textarea
    var cCode = editor.getValue(); 
    socket.emit('compile_and_run', { code: cCode });
});

// Initial setup for accordions and examples list
// A small timeout is good for CodeMirror to be fully rendered before
// calculating scrollHeight for the code content.
setTimeout(function() {
    // Ensure initial max-height for code content for smooth collapse
    codeContent.style.maxHeight = codeContent.scrollHeight + "px";
    editor.refresh(); // Refresh CodeMirror to ensure correct display

    // Populate the examples list when the page loads
    populateExamplesList();
}, 100);