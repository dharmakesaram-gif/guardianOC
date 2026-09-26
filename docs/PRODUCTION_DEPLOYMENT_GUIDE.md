# GuardianOC — Enterprise Production Deployment Guide 🚀
### Continuous Cyber Risk Quantification & Investment Optimization Platform

GuardianOC is engineered as a cloud-native, production-ready distributed system consisting of:
1. **Frontend**: Next.js 14 Bloomberg Terminal dark dashboard.
2. **Backend**: FastAPI asynchronous Python engine with Open FAIR Monte Carlo, 0-1 Knapsack, and 4 Machine Learning models.
3. **Connectors**: FIRST.org live EPSS client, RFC 7865 SIP REC VoIP UDP listener, and Cloud CMDB sync.
4. **Reverse Proxy / Ingress**: Nginx with WebSocket streaming and gzip compression.

---

## Deployment Strategy Matrix

| Deployment Target | Cost | Effort | Best For | Architecture |
|---|---|---|---|---|
| **1. Vercel + Render** | **Free** | ~3 mins | Hackathon Finales & Live Demos | Vercel (Edge Frontend) + Render (FastAPI Backend) |
| **2. Railway / Koyeb** | Free / Low | ~2 mins | All-in-One Cloud PaaS | Docker / Nixpacks unified backend & frontend |
| **3. AWS / GCP / Azure VM** | \$10–\$40/mo | ~5 mins | Enterprise Corporate Hosting | `docker-compose.prod.yml` + Nginx + SSL |
| **4. Cloudflare Tunnel / ngrok** | **Free** | Instant | Live Jury Presentation from Localhost | Zero-port-forwarding public HTTPS tunnels |

---

## Method 1: 1-Click Cloud Deployment (Vercel + Render) [RECOMMENDED FOR SIH]

This gives you a globally accessible, blazing-fast HTTPS production URL in under 3 minutes.

### Step 1.1: Deploy Backend to Render (Free)
1. Go to [Render.com](https://render.com) and log in with GitHub.
2. Click **New +** $\to$ **Web Service** $\to$ Connect your repository: `https://github.com/dharmakesaram-gif/guardianOC.git`.
3. Configure settings:
   - **Name**: `guardianoc-api`
   - **Language**: `Python`
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT --workers 2`
   - **Plan**: `Free`
4. Click **Deploy Web Service**.
5. Once deployed, copy your backend URL (e.g., `https://guardianoc-api.onrender.com`).

*(Note: You can also use the included [render.yaml](../render.yaml) Blueprint for 1-click automatic deployment!)*

### Step 1.2: Deploy Frontend to Vercel (Free)
1. Go to [Vercel.com](https://vercel.com) and click **Add New...** $\to$ **Project**.
2. Select `dharmakesaram-gif/guardianOC`.
3. Set **Root Directory** to `frontend`.
4. Under **Environment Variables**, add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://guardianoc-api.onrender.com` (your backend URL from Step 1.1)
5. Click **Deploy**.
6. In ~60 seconds, your production Bloomberg Terminal is live with SSL at `https://guardianoc.vercel.app`!

---

## Method 2: Enterprise Docker Compose Production (Ubuntu / AWS EC2 / Azure)

For enterprise-grade self-hosted or dedicated cloud infrastructure:

### Prerequisites:
- Ubuntu 22.04 LTS or 24.04 LTS VM (e.g. AWS EC2 `t3.medium` or DigitalOcean Droplet).
- Docker and Docker Compose installed.

### Step 2.1: Clone and Configure
```bash
git clone https://github.com/dharmakesaram-gif/guardianOC.git
cd guardianOC
```

### Step 2.2: Launch Production Cluster
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

This starts:
- `guardianoc-prod-backend` on port `8000` (FastAPI + 4 Uvicorn workers).
- `guardianoc-prod-frontend` on port `3000` (Next.js standalone Node server).
- `guardianoc-prod-proxy` on port `80` (Nginx reverse proxy routing `/api` and `/` under one port).
- `guardianoc-prod-cache` on port `6379` (Redis).

### Step 2.3: Verify Health
```bash
# Check container status
docker compose -f docker-compose.prod.yml ps

# Check backend health
curl http://localhost/api/ml/overview
```

### Step 2.4: Enable SSL with Let's Encrypt Certbot (Optional Domain)
If you have a domain pointing to your server IP:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Method 3: Instant Live Production Tunnel (Zero Cost, No VPS Needed)

If you are presenting live to the SIH jury or evaluating judges directly from your development machine:

### Option 3.1: Cloudflare Tunnel (Recommended)
Download `cloudflared` from Cloudflare and run:
```bash
# Terminal 1: Run GuardianOC backend
cd backend
python -m uvicorn main:app --port 8000

# Terminal 2: Run Frontend
cd frontend
npm run dev

# Terminal 3: Expose via Cloudflare
cloudflared tunnel --url http://localhost:3000
```
Cloudflare will give you a temporary URL like `https://random-word.trycloudflare.com` that anyone in the world can access.

### Option 3.2: ngrok / LocalTunnel
```bash
npx localtunnel --port 3000
```

---

## Environment Variables Reference

| Variable | Default Value | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000` | Base URL of the FastAPI backend for frontend fetch calls |
| `PORT` | `8000` (Backend) / `3000` (Frontend) | Service binding port |
| `ENVIRONMENT` | `production` | Environment switch (`development` / `production`) |
| `NODE_ENV` | `production` | Node.js runtime mode |
| `PYTHONUNBUFFERED` | `1` | Stream Python standard output without buffering |

---

## Continuous Integration & Automated Delivery (CI/CD)

Every push to `main` at `https://github.com/dharmakesaram-gif/guardianOC.git` triggers the GitHub Actions CI/CD workflow (`.github/workflows/ci-cd.yml`):
1. **Python 3.12 Backend Verification**: Installs dependencies and verifies CRQ, Monte Carlo, and ML models.
2. **Next.js 14 Production Build**: Compiles TypeScript, bundles assets, and ensures zero lint or static build errors.
