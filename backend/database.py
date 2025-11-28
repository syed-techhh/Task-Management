from sqlmodel import SQLModel, create_engine, Session
from typing import Generator

DATABASE_URL = "sqlite:///./tasks.db"

# create_engine for sqlite; connect_args not required for SQLModel create_engine wrapper in local file mode
engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables() -> None:
    """
    Create the sqlite database and tables (if not exist).
    Call this once at startup.
    """
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """
    Dependency for FastAPI endpoints.
    Yields a SQLModel Session (works with `Depends(get_session)`).
    """
    with Session(engine) as session:
        yield session
