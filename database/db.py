from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

DEFAULT_DB_URL = "sqlite:///database/db.sqlite"

class Database:
    def __init__(self, url: str = DEFAULT_DB_URL):
        self.engine = create_engine(url, future=True, pool_pre_ping=True)
        self.SessionLocal = sessionmaker(bind=self.engine, autoflush=False, autocommit=False, future=True)

    def init_database(self, script_path: str = "database/scripts/create.sql"):
        with open(script_path, "r", encoding="utf-8") as f:
            sql = f.read()
        with self.engine.begin() as conn:
            conn.exec_driver_sql(sql)

    @contextmanager
    def session(self):
        session = self.SessionLocal()
        try:
            yield session
        finally:
            session.close()

    def fetch_all(self, query: str, params: dict | None = None):
        with self.session() as s:
            result = s.execute(text(query), params or {})
            return [dict(r._mapping) for r in result]

    def fetch_one(self, query: str, params: dict | None = None):
        with self.session() as s:
            result = s.execute(text(query), params or {})
            row = result.fetchone()
            return dict(row._mapping) if row else None

    def execute(self, query: str, params: dict | None = None):
        with self.session() as s:
            res = s.execute(text(query), params or {})
            s.commit()
            return res.lastrowid if hasattr(res, "lastrowid") else None

    def dispose(self):
        self.engine.dispose()