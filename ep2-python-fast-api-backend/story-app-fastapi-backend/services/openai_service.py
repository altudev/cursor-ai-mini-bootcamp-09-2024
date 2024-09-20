import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_story(title: str, genre: str, target_age: str, illustration_style: str):
    """
    Verilen parametrelere göre bir hikaye oluşturmak için OpenAI API'sini kullanır.

    Args:
        title: Hikayenin başlığı.
        genre: Hikayenin türü.
        target_age: Hedef yaş grubu.
        illustration_style: İllüstrasyon stili.

    Returns:
        Oluşturulan hikaye metni.
    """

    prompt = f"""Lütfen aşağıdaki özelliklere sahip bir çocuk hikayesi/masalı yaz:

Başlık: {title}
Tür: {genre}
Hedef Yaş Grubu: {target_age}
İllüstrasyon Stili: {illustration_style}

Hikaye şu özelliklere sahip olmalı:
1. Hedef yaş grubuna uygun dil ve içerik
2. Belirtilen türe uygun olay örgüsü
3. İllüstrasyon stiline uygun betimlemeler
4. Eğitici ve eğlendirici unsurlar
5. Açık ve anlaşılır bir anlatım

Hikaye:
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Updated to use gpt-4o-mini
        messages=[
            {"role": "system", "content": "Sen çocuk hikayeleri yazan yetenekli bir yazarsın."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2048,
        temperature=0.8,
        top_p=0.9,
        frequency_penalty=0.5,
        presence_penalty=0.5,
    )

    story_text = response.choices[0].message.content.strip()
    return story_text