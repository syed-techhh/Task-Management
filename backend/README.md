# Task Manager - Backend (FastAPI)

## Setup
1. python -m venv venv
2. source venv/bin/activate   # on Windows: venv\Scripts\activate
3. pip install -r requirements.txt

## Run (development)
uvicorn main:app --reload --port 8000

API base: http://localhost:8000

Endpoints:
GET    /tasks
POST   /tasks
GET    /tasks/{id}
PUT    /tasks/{id}
DELETE /tasks/{id}

Notes:
- Database: SQLite file `tasks.db` is created in this folder when first run.
- CORS allows requests from localhost by default.
