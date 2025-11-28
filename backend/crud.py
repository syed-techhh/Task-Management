from typing import List, Optional
from sqlmodel import Session, select
from models import Task
from schemas import TaskCreate, TaskUpdate

def create_task(session: Session, task_in: TaskCreate) -> Task:
    task = Task(**task_in.dict())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_task(session: Session, task_id: int) -> Optional[Task]:
    return session.get(Task, task_id)

def get_tasks(session: Session) -> List[Task]:
    stmt = select(Task).order_by(Task.created_at.desc())
    results = session.exec(stmt).all()
    return results

def update_task(session: Session, task_id: int, task_in: TaskUpdate) -> Optional[Task]:
    task = session.get(Task, task_id)
    if not task:
        return None
    task_data = task_in.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def delete_task(session: Session, task_id: int) -> bool:
    task = session.get(Task, task_id)
    if not task:
        return False
    session.delete(task)
    session.commit()
    return True
