from pydantic import BaseModel  # Pydantic'in BaseModel sınıfını içe aktar
from datetime import datetime  # Python'un datetime modülünden datetime sınıfını içe aktar
from typing import Optional  # Tip ipuçları için Optional sınıfını içe aktar
from enum import Enum  # Enum sınıfını içe aktar

class GenreEnum(str, Enum):  # GenreEnum adında bir enum sınıfı oluştur, str tipinden miras alır
    MACERA = "Macera"
    FANTASTİK = "Fantastik"
    BİLİM_KURGU = "Bilim Kurgu"

class TargetAgeEnum(str, Enum):  # TargetAgeEnum adında bir enum sınıfı oluştur, str tipinden miras alır
    AGE_0_3 = "0-3 Yaş"
    AGE_4_6 = "4-6 Yaş"
    AGE_7_9 = "7-9 Yaş"
    AGE_10_12 = "10-12 Yaş"

class IllustrationStyleEnum(str, Enum):  # IllustrationStyleEnum adında bir enum sınıfı oluştur, str tipinden miras alır
    ANİME = "Anime"
    KARİKATÜR = "Karikatür"
    GERÇEKÇİ = "Gerçekçi"

class StoryBase(BaseModel):  # StoryBase adında bir model oluştur, Pydantic'in BaseModel sınıfını miras alır
    title: str  # title alanı, metin tipinde
    genre: GenreEnum  # genre alanı, GenreEnum tipinde
    target_age: TargetAgeEnum  # target_age alanı, TargetAgeEnum tipinde
    illustration_style: IllustrationStyleEnum  # illustration_style alanı, IllustrationStyleEnum tipinde

class StoryCreate(StoryBase):  # StoryCreate adında bir model oluştur, StoryBase modelini miras alır
    pass  # Ek alan veya işlem eklenmedi

class StoryUpdate(StoryBase):  # StoryUpdate adında bir model oluştur, StoryBase modelini miras alır
    pass  # Ek alan veya işlem eklenmedi

class Story(StoryBase):  # Story adında bir model oluştur, StoryBase modelini miras alır
    id: int  # id alanı, tam sayı tipinde
    content: Optional[str] = None  # content alanı, metin tipinde, isteğe bağlı ve varsayılan değeri None
    created_at: datetime  # created_at alanı, datetime tipinde
    updated_at: datetime  # updated_at alanı, datetime tipinde

    class Config:  # Config adında bir iç sınıf oluştur
        orm_mode = True  # ORM modunu etkinleştir, SQLAlchemy modelleriyle uyumluluk sağlar
