from sqlalchemy import create_engine  # SQLAlchemy'nin create_engine fonksiyonunu içe aktar
from sqlalchemy.orm import sessionmaker  # SQLAlchemy'nin sessionmaker fonksiyonunu içe aktar
from sqlalchemy.ext.declarative import declarative_base  # SQLAlchemy'nin declarative_base fonksiyonunu içe aktar

from .database import SessionLocal, engine  # database modülünü import et
# from . import models  # models modülünü import etme

SQLALCHEMY_DATABASE_URL = "sqlite:///./stories.db"  # Veritabanı bağlantı adresi, SQLite kullanılacak ve veritabanı dosyası "stories.db" olarak adlandırılacak

engine = create_engine(  # Veritabanı bağlantısı oluştur
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}  # SQLite için gerekli bağlantı argümanları
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  # Veritabanı oturumu oluşturucu

Base = declarative_base()  # SQLAlchemy ORM kullanarak veritabanı tablolarını temsil eden sınıflar oluşturmak için temel sınıfı tanımla

def create_db():  # Veritabanı tablolarını oluşturan fonksiyon
    Base.metadata.create_all(bind=engine)  # Base sınıfına bağlı tüm tabloları oluştur