from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from content_repurposer.crew import ContentRepurposerCrew
import uvicorn
import os

# --------------------- CrewAI Entry Points ---------------------
def run():
    """Main entry point to run the crew."""
    try:
        inputs = {
            "topic": "Content repurposing with AI",
            "original_content": (
                "AI tools are transforming how creators produce content. "
                "Instead of spending hours writing separate posts for each platform, "
                "a single piece of content can now be intelligently adapted for "
                "Twitter, LinkedIn, Instagram, and blogs in minutes."
            ),
            "platform": "all",
        }
        result = ContentRepurposerCrew().crew().kickoff(inputs=inputs)
        print("\n" + "="*80)
        print("CREW EXECUTION COMPLETED")
        print("="*80)
        print(result)
    except Exception as e:
        print(f"Error running crew: {e}")
        raise

def train():
    """Placeholder for training the crew."""
    print("Training functionality not yet implemented.")

def replay():
    """Placeholder for replaying crew execution."""
    print("Replay functionality not yet implemented.")

def test():
    """Placeholder for testing the crew."""
    print("Testing functionality not yet implemented.")

def run_with_trigger():
    """Run the crew with a specific trigger."""
    run()

# --------------------- FastAPI Setup ---------------------
app = FastAPI(
    title="Content Generator API",
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
    platform: str = "all"          # e.g. "twitter", "linkedin", "blog", "youtube", "instagram", "all"
    current_year: int | None = None  # Optional, can be used to provide context for time-sensitive content
     # Add more fields if your crew needs them (tone, length, etc.)

# --------------------- Endpoints ---------------------
@app.get("/")
async def root():
    return {"message": "Content Generator API is running 🚀", "status": "healthy"}

@app.post("/repurpose")
async def repurpose_content(request: RepurposeRequest):
    try:
        inputs = {
            "topic": request.topic or "",
            "original_content": request.original_content,
            "platform": request.platform,
            "current_year": request.current_year or datetime.now().year, # Provide current year if not specified, useful for time-sensitive content
           
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