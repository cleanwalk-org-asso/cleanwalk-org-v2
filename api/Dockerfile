# Utilisez une image Python comme image de base
FROM python:3.8-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de dépendances dans le conteneur
COPY requirements.txt .

# Installez les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le reste du code dans le conteneur
COPY . .

# Exposez le port sur lequel l'API s'exécute
EXPOSE 5000

# Démarrez l'API
CMD ["python3", "app.py"]