from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from sqlmodel import Session

from database import create_db_and_tables, get_session
from models import Task
from schemas import TaskCreate, TaskRead, TaskUpdate
import crud

# create DB / tables
create_db_and_tables()

app = FastAPI(title="Task Manager API")

# CORS - allow localhost origins; also allow all origins during local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks", response_model=List[TaskRead])
def list_tasks(session: Session = Depends(get_session)):
    """
    List all tasks (most recent first).
    """
    return crud.get_tasks(session)

@app.post("/tasks", response_model=TaskRead, status_code=201)
def create_new_task(task_in: TaskCreate, session: Session = Depends(get_session)):
    """
    Create a new task.
    """
    return crud.create_task(session, task_in)

@app.get("/tasks/{task_id}", response_model=TaskRead)
def read_task(task_id: int, session: Session = Depends(get_session)):
    task = crud.get_task(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=TaskRead)
def edit_task(task_id: int, task_in: TaskUpdate, session: Session = Depends(get_session)):
    task = crud.update_task(session, task_id, task_in)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.delete("/tasks/{task_id}")
def remove_task(task_id: int, session: Session = Depends(get_session)):
    ok = crud.delete_task(session, task_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"ok": True}
