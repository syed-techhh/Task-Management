from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "Medium"
    category: Optional[str] = None
    deadline: Optional[datetime] = None

class TaskRead(TaskCreate):
    id: int
    completed: bool
    created_at: datetime

    class Config:
        orm_mode = True

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    deadline: Optional[datetime] = None
    completed: Optional[bool] = None
