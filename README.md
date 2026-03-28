# Generate AI

## Overview

`repurpose-ai` is a multi-component project for content repurposing and AI agent orchestration. It includes:

- `ai-service`: crewAI-based multi-agent content repurposer (Python)
- `backend`: API/server logic (Node.js/Express or similar)
- `frontend`: Web UI (Next.js)

## Architecture

- `ai-service/content_repurposer`: agent definitions, task pipeline, and output report generation.
- `backend/src`: authentication and repurpose API routes.
- `frontend/app`: user interface including login, dashboard, and how-it-works pages.

## Prerequisites

- Node.js (>=18) and npm/pnpm
- Python 3.10 - 3.13
- `uv` for Python dependency management
- OpenAI API key or other configured LLM provider key (set in `.env`, if used)

## Quickstart

From repo root:

1. Install dependencies

```bash
cd frontend && npm install
cd backend && npm install
cd ai-service/content_repurposer && pip install -r requirements.txt
```

2. Start frontend

```bash
npm run frontend
```

3. Start backend

```bash
npm run backend
```

4. Start AI service

```bash
npm run ai
```

## AI Service (content_repurposer)

In `ai-service/content_repurposer`:

- `config/agents.yaml` defines agents and tools
- `config/tasks.yaml` defines task flow
- `crew.py` handles the AI crew orchestration
- `main.py` launches FastAPI endpoints and task execution

Run the crew:

```bash
cd ai-service/content_repurposer
crewai run
```

This generates `report.md` by default.

## Backend

- `backend/src/routes/auth.ts`: auth routes
- `backend/src/routes/repurpose.ts`: repurposing workflows and API

## Frontend

- `frontend/app/page.tsx`: home
- `frontend/app/dashboard/page.tsx`: dashboard
- `frontend/app/login/page.tsx`: login flow
- `frontend/app/how-it-works/page.tsx`: feature details

## Environment

Add any required keys to `.env` files in relevant folders. Typical values:

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_API_URL`
- authentication cookie/secrets

## Testing / Validation

No dedicated tests present; use service health checks and manual UI flows.

## Contributing

1. Fork repository
2. Create feature branch
3. Open PR with summary and testing notes

## License

Specify your license here (e.g. MIT).
