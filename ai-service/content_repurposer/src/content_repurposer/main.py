from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from content_repurposer.crew import ContentRepurposerCrew
import uvicorn
import os

# --------------------- FastAPI Setup ---------------------
app = FastAPI(
    title="Content Repurposer API",
    description="API for repurposing content using CrewAI + Ollama",
    version="1.0.0"
)

# Enable CORS so your Next.js frontend (localhost:3000) can call it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # add your production domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- Input Model ---------------------
class RepurposeRequest(BaseModel):
    topic: str | None = None
    original_content: str | None = None
    platform: str = "all"          # e.g. "twitter", "linkedin", "blog", "youtube", "all"
    current_year: int | None = None
    # Add more fields if your crew needs them (tone, length, etc.)

# --------------------- Endpoints ---------------------
@app.get("/")
async def root():
    return {"message": "Content Repurposer API is running 🚀", "status": "healthy"}

@app.post("/repurpose")
async def repurpose_content(request: RepurposeRequest):
    try:
        inputs = {
            "topic": request.topic,
            "original_content": request.original_content,
            "platform": request.platform,
            "current_year": request.current_year or datetime.now().year,   # ← Auto-fill if not provided
        }

        # Remove None values so the crew doesn't get confused
        inputs = {k: v for k, v in inputs.items() if v is not None}

        if not inputs:
            raise HTTPException(status_code=400, detail="At least topic or original_content is required")

        # Run the CrewAI crew
        result = ContentRepurposerCrew().crew().kickoff(inputs=inputs)

        return {
            "success": True,
            "input": inputs,
            "result": result.raw if hasattr(result, 'raw') else str(result)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crew execution failed: {str(e)}")

# --------------------- Run the server ---------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)