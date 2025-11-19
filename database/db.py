import sqlite3
import os
import queue
import contextlib


class SQLiteConnectionPool:
    def __init__(self, db_path: str, size: int = 5, timeout: float = 5.0):
        self.db_path = db_path
        self.size = size
        self.timeout = timeout  # sqlite connection busy timeout (seconds)
        self._pool = queue.LifoQueue(maxsize=size)
        for _ in range(size):
            self._pool.put(self._create_connection())

    def _create_connection(self):
        return sqlite3.connect(self.db_path, check_same_thread=False, timeout=self.timeout)

    @contextlib.contextmanager
    def connection(self, acquire_timeout: float | None = None):
        conn = self._pool.get(timeout=acquire_timeout)
        try:
            yield conn
        finally:
            self._pool.put(conn)

    def close(self):
        while not self._pool.empty():
            try:
                conn = self._pool.get_nowait()
                conn.close()
            except queue.Empty:
                break


class Database:
    def __init__(self, db_path='database/db.sqlite', pool_size: int = 5):
        self.pool = SQLiteConnectionPool(db_path, size=pool_size)

    # Exécute un script SQL depuis un fichier
    def execute_script(self, script_path):
        if not os.path.exists(script_path):
            raise FileNotFoundError(f"Le script {script_path} n'existe pas")

        with open(script_path, 'r', encoding='utf-8') as f:
            script = f.read()

        with self.pool.connection() as conn:
            conn.executescript(script)
            conn.commit()
            return True

    # Initialise la base de données avec le schéma
    def init_database(self):
        return self.execute_script('database/scripts/create.sql')

    # Exécute une requête SELECT
    def fetch_all(self, query, params=()):
        with self.pool.connection() as conn:
            cur = conn.execute(query, params)
            return cur.fetchall()

    # Exécute une requête SELECT pour une seule ligne
    def fetch_one(self, query, params=()):
        with self.pool.connection() as conn:
            cur = conn.execute(query, params)
            return cur.fetchone()

    # Exécute une requête INSERT/UPDATE/DELETE
    def execute(self, query, params=()):
        with self.pool.connection() as conn:
            cur = conn.execute(query, params)
            conn.commit()
            return cur.lastrowid

    def close(self):
        self.pool.close()