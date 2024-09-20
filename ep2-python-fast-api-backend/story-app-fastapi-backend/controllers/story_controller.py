from typing import List, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException

from data.models import Story
from schemas.story import StoryCreate, StoryUpdate
from services.openai_service import generate_story

class StoryController:
    @staticmethod
    async def create_story(db: Session, story: StoryCreate):
        """
        Veritabanına yeni bir hikaye ekler.

        Args:
            db: Veritabanı oturumu.
            story: Oluşturulacak hikaye için veri modeli.

        Returns:
            Oluşturulan hikaye.
        """
        # OpenAI servisini kullanarak hikaye içeriği oluştur
        content = generate_story(story.title, story.genre.value, story.target_age.value, story.illustration_style.value)

        db_story = Story(
            title=story.title,
            content=content,  # OpenAI tarafından oluşturulan içeriği kullan
            genre=story.genre,
            target_age=story.target_age,
            illustration_style=story.illustration_style,
        )
        db.add(db_story)
        db.commit()
        db.refresh(db_story)
        return db_story

    @staticmethod
    def get_all_stories(db: Session) -> List[Story]:
        """
        Veritabanındaki tüm hikayeleri döndürür.

        Args:
            db: Veritabanı oturumu.

        Returns:
            Hikayelerin listesi.
        """
        return db.query(Story).all()

    @staticmethod
    def get_story_by_id(db: Session, story_id: int) -> Story:
        """
        Belirtilen ID'ye sahip hikayeyi döndürür.

        Args:
            db: Veritabanı oturumu.
            story_id: Hikayenin ID'si.

        Returns:
            Hikaye nesnesi.

        Raises:
            HTTPException: Hikaye bulunamazsa 404 hatası.
        """
        story = db.query(Story).filter(Story.id == story_id).first()
        if not story:
            raise HTTPException(status_code=404, detail="Hikaye bulunamadı.")
        return story

    @staticmethod
    def update_story(db: Session, story_id: int, story: StoryUpdate) -> Story:
        """
        Belirtilen ID'ye sahip hikayeyi günceller.

        Args:
            db: Veritabanı oturumu.
            story_id: Hikayenin ID'si.
            story: Hikaye güncelleme şeması.

        Returns:
            Güncellenen hikaye nesnesi.

        Raises:
            HTTPException: Hikaye bulunamazsa 404 hatası.
        """
        db_story = db.query(Story).filter(Story.id == story_id).first()
        if not db_story:
            raise HTTPException(status_code=404, detail="Hikaye bulunamadı.")
        for key, value in story.dict(exclude_unset=True).items():
            setattr(db_story, key, value)
        db.commit()
        db.refresh(db_story)
        return db_story

    @staticmethod
    def delete_story(db: Session, story_id: int) -> Dict[str, Any]:
        """
        Belirtilen ID'ye sahip hikayeyi siler.

        Args:
            db: Veritabanı oturumu.
            story_id: Hikayenin ID'si.

        Returns:
            Başarılı silme işlemi için bir mesaj içeren sözlük.

        Raises:
            HTTPException: Hikaye bulunamazsa 404 hatası.
        """
        story = db.query(Story).filter(Story.id == story_id).first()
        if not story:
            raise HTTPException(status_code=404, detail="Hikaye bulunamadı.")
        db.delete(story)
        db.commit()
        return {"message": "Hikaye başarıyla silindi."}
