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
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    build-essential \
    # Puoi aggiungere qui altri pacchetti utili per compilare codice C/C++
    # es: libc-dev, make etc. ma gcc e build-essential di solito bastano per i basi
    && rm -rf /var/lib/apt/lists/*

# Copia le dipendenze Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il backend Flask e la directory dei template
COPY app.py .
COPY templates ./templates
COPY static ./static

# Espone la porta su cui Gunicorn è in ascolto
EXPOSE 5000

# Comando per avviare il server Flask con SocketIO usando Gunicorn
CMD ["gunicorn", "--worker-class", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "--bind", "0.0.0.0:5000", "--log-level", "info", "app:app"]
