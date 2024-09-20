from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from datetime import datetime
from .database import Base  # Base sınıfını data/database.py dosyasından import et

class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    genre = Column(Enum("Macera", "Fantastik", "Bilim Kurgu", name="genre_enum"), nullable=False)
    target_age = Column(Enum("0-3 Yaş", "4-6 Yaş", "7-9 Yaş", "10-12 Yaş", name="target_age_enum"), nullable=False)  # target_age sütununu Enum tipinde değiştirdik
    illustration_style = Column(Enum("Anime", "Karikatür", "Gerçekçi", name="illustration_style_enum"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Story(id={self.id}, title='{self.title}', genre='{self.genre}', illustration_style='{self.illustration_style}')>"