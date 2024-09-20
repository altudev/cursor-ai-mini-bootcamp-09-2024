from sqlalchemy import Column, Integer, String, Text, DateTime, Enum  # Gerekli SQLAlchemy modüllerini içe aktar
from sqlalchemy.ext.declarative import declarative_base  # SQLAlchemy'nin declarative_base fonksiyonunu içe aktar
from datetime import datetime  # Python'un datetime modülünden datetime sınıfını içe aktar

Base = declarative_base()  # SQLAlchemy ORM kullanarak veritabanı tablolarını temsil eden sınıflar oluşturmak için temel sınıfı tanımla

class Story(Base):  # Story adında bir sınıf oluştur, bu sınıf Base sınıfını miras alır
    __tablename__ = "stories"  # Bu sınıfın veritabanında "stories" adında bir tabloyu temsil ettiğini belirt

    id = Column(Integer, primary_key=True, index=True)  # id sütunu, tam sayı tipinde, birincil anahtar ve indeksli
    title = Column(String(100), nullable=False)  # title sütunu, en fazla 100 karakter uzunluğunda metin tipinde ve boş bırakılamaz
    content = Column(Text, nullable=False)  # content sütunu, uzun metin tipinde ve boş bırakılamaz
    genre = Column(Enum("Macera", "Fantastik", "Bilim Kurgu", name="genre_enum"), nullable=False)  # genre sütunu, belirtilen değerlerden birini alabilen bir enum tipinde ve boş bırakılamaz
    target_age = Column(String(20))  # target_age sütunu, en fazla 20 karakter uzunluğunda metin tipinde
    illustration_style = Column(Enum("Anime", "Karikatür", "Gerçekçi", name="illustration_style_enum"), nullable=False)  # illustration_style sütunu, belirtilen değerlerden birini alabilen bir enum tipinde ve boş bırakılamaz
    created_at = Column(DateTime, default=datetime.utcnow)  # created_at sütunu, tarih ve saat tipinde, varsayılan değeri UTC zaman dilimine göre şu anki tarih ve saat
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # updated_at sütunu, tarih ve saat tipinde, varsayılan değeri UTC zaman dilimine göre şu anki tarih ve saat, güncellendiğinde otomatik olarak güncellenir

    def __repr__(self):  # __repr__ metodu, sınıfın bir örneğini temsil eden bir metin döndürür
        return f"<Story(id={self.id}, title='{self.title}', genre='{self.genre.value}', illustration_style='{self.illustration_style.value}')>"  # Örnek: <Story(id=1, title='Bir Hikaye', genre='Macera', illustration_style='Anime')>