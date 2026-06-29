# 1. Base image
FROM python:3.11-slim

# 2. Environment (小優化，可讓 log 立即輸出、不寫 .pyc)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Set working directory inside container
WORKDIR /app

# 4. Install system dependencies (pyttsx3 需要 build-essential 等)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 5. Copy project files into container
#    Build context = C:\kids-learning
COPY backend /app/backend
COPY frontend /app/frontend

# 6. Set working directory to backend
WORKDIR /app/backend

# 7. Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 8. Expose FastAPI port
EXPOSE 8001

# 9. Run FastAPI app with Uvicorn
CMD ["uvicorn", "kids_ai_teacher:app", "--host", "0.0.0.0", "--port", "8001"]
