# GuardianOC - Enterprise Production Dockerfile
FROM python:3.12-slim AS backend

# Install system dependencies including curl for health checks
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application layers
COPY backend/ ./backend/
COPY engine/ ./engine/
COPY sensors/ ./sensors/

# Create non-root user for security hardening
RUN useradd -m -u 10001 guardian && \
    chown -R guardian:guardian /app

USER guardian

# HTTP API and RFC 7865 SIP REC VoIP UDP port
EXPOSE 8000
EXPOSE 10000/udp

ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/ml/overview || exit 1

# Production server launch with 4 Uvicorn workers
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
