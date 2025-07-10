# Fase 1: Questo è solo un esempio di come potresti aver avuto un c_builder.
# Per questo nuovo progetto, non ci serve un c_builder separato che copia un binario.
# Il server Python compilerà da solo. Puoi rimuovere questa fase se vuoi,
# o lasciarla e semplicemente non copiare nulla da essa se non più utile.
# FROM gcc:latest AS c_builder
# WORKDIR /c_src
# COPY main.c .
# RUN gcc main.c -o game-of-life -Wall -Wextra -pedantic


# Fase principale: Costruzione del server Python/Flask
FROM python:3.12-slim

WORKDIR /app

# Installa le dipendenze di sistema necessarie:
# - gcc: ESSENZIALE per compilare il codice C inviato dall'utente
# - Altri strumenti di base
# - curl: Necessario per scaricare gli asset via URL
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    build-essential \
    curl \
    # Puoi aggiungere qui altri pacchetti utili per compilare codice C/C++
    # es: libc-dev, make etc. ma gcc e build-essential di solito bastano per i basi
    && rm -rf /var/lib/apt/lists/*

# Copia le dipendenze Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# --- DOWNLOAD E POSIZIONAMENTO DEGLI ASSET ESTERNI ---
# Crea le directory statiche se non esistono già
RUN mkdir -p static/js static/css

# Scarica Socket.IO Client (una versione specifica per compatibilità)
# Controlla la versione del tuo server Socket.IO per scegliere il client corretto.
# Qui uso una versione comune che dovrebbe essere compatibile con Gunicorn-WebSocket.
RUN curl -o static/js/socket.io.js https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.min.js
RUN curl -o static/js/socket.io.js.map https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.min.js.map

# Scarica CodeMirror e i suoi componenti
# File CSS
RUN curl -o static/css/codemirror.min.css https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css
RUN curl -o static/css/dracula.min.css https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/dracula.min.css

# File JS
RUN curl -o static/js/codemirror.min.js https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.js
RUN curl -o static/js/clike.min.js https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/clike/clike.min.js
#RUN curl -o static/js/indent-on-tab.min.js https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/addon/edit/indentontab.min.js
RUN curl -o static/js/matchbrackets.min.js https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/addon/edit/matchbrackets.min.js

# --- FINE DOWNLOAD ASSET ---

# Copia il backend Flask e la directory dei template
COPY app.py .
COPY templates ./templates

# Copia i tuoi file JS/CSS locali che non provengono da CDN
# Assicurati che questi file siano già presenti nella tua cartella 'static' locale
COPY static/css/main.css static/css/
COPY static/js/main.js static/js/
COPY static/js/c-examples.js static/js/

# Espone la porta su cui Gunicorn è in ascolto
EXPOSE 5000

# Comando per avviare il server Flask con SocketIO usando Gunicorn
CMD ["gunicorn", "--worker-class", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "--bind", "0.0.0.0:5000", "--log-level", "info", "app:app"]
