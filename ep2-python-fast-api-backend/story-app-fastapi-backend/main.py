from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from data.database import engine, SessionLocal  # data/database.py dosyasından import et
from data import models  # data/models.py dosyasından import et
from controllers import story_controller
from schemas import story

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS ayarları
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Veritabanı bağımlılığı
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hikaye API'sine hoş geldiniz!"}


@app.get("/stories", response_model=list[story.Story])
async def read_stories(db: Session = Depends(get_db)):
    """
    Tüm hikayeleri listeler.
    """
    return story_controller.StoryController.get_all_stories(db)


@app.get("/stories/{story_id}", response_model=story.Story)
async def read_story(story_id: int, db: Session = Depends(get_db)):
    """
    Belirtilen ID'ye sahip hikayeyi getirir.
    """
    return story_controller.StoryController.get_story_by_id(db, story_id)


@app.post("/stories", response_model=story.Story, status_code=201)
async def create_story(story: story.StoryCreate, db: Session = Depends(get_db)):
    """
    Yeni bir hikaye oluşturur.
    """
    return await story_controller.StoryController.create_story(db, story)


@app.put("/stories/{story_id}", response_model=story.Story)
async def update_story(
    story_id: int, story: story.StoryUpdate, db: Session = Depends(get_db)
):
    """
    Belirtilen ID'ye sahip hikayeyi günceller.
    """
    return story_controller.StoryController.update_story(db, story_id, story)


@app.delete("/stories/{story_id}", status_code=204)
async def delete_story(story_id: int, db: Session = Depends(get_db)):
    """
    Belirtilen ID'ye sahip hikayeyi siler.
    """
    story_controller.StoryController.delete_story(db, story_id)
    return {"message": "Hikaye başarıyla silindi."}

