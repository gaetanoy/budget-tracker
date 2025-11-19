import sqlite3
import os


class Database:
    def __init__(self, db_path='database/db.sqlite'):
        self.db_path = db_path
        self.connection = None

    # récupère la connexion
    def get_connection(self):
        if self.connection is None:
            self.connection = sqlite3.connect(self.db_path, check_same_thread=False)
            self.connection.row_factory = sqlite3.Row  # Permet d'accéder aux colonnes par nom
        return self.connection

    # déconnecte la connexion
    def disconnect(self):
        if self.connection is not None:
            self.connection.close()
            self.connection = None

    # Exécute un script SQL depuis un fichier
    def execute_script(self, script_path):
        if not os.path.exists(script_path):
            raise FileNotFoundError(f"Le script {script_path} n'existe pas")
        
        with open(script_path, 'r', encoding='utf-8') as f:
            script = f.read()
        
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.executescript(script)
        conn.commit()
        return True

    # Initialise la base de données avec le schéma
    def init_database(self):
        script_path = 'database/scripts/create.sql'
        return self.execute_script(script_path)

    # Exécute une requête SELECT
    def fetch_all(self, query, params=()):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchall()

    # Exécute une requête SELECT pour une seule ligne
    def fetch_one(self, query, params=()):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        return cursor.fetchone()

    # Exécute une requête INSERT/UPDATE/DELETE
    def execute(self, query, params=()):
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        return cursor.lastrowid