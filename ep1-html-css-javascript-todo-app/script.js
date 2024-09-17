// HTML elemanlarını alıyoruz
const todoListesi = document.getElementById('todo-listesi'); // ul elemanı
const yeniTodoInput = document.getElementById('yeni-todo'); // input elemanı
const ekleButonu = document.getElementById('ekle-butonu'); // button elemanı

// Sayfa yüklendiğinde örnek todoları ekle
window.addEventListener('load', () => {
    ekleOrnekTodolar();
});

// Ekle butonuna tıklandığında todoEkle fonksiyonunu çalıştır
ekleButonu.addEventListener('click', todoEkle);

// Input alanında Enter tuşuna basıldığında da todoEkle fonksiyonunu çalıştır
yeniTodoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        todoEkle();
    }
});

// Yeni bir todo eklemek için kullanılan fonksiyon
function todoEkle() {
    // Input alanındaki değeri alıp başındaki ve sonundaki boşlukları temizliyoruz
    const yeniTodoMetni = yeniTodoInput.value.trim();

    // Eğer input alanı boş değilse
    if (yeniTodoMetni !== '') {
        // Yeni bir li elementi oluşturuyoruz
        const yeniLi = document.createElement('li');

        // Yeni li elementinin içeriğini HTML olarak ayarlıyoruz
        yeniLi.innerHTML = `
            <span class="todo-text">${yeniTodoMetni}</span>
            <button class="duzenle-butonu">Düzenle</button>
            <button class="sil-butonu">Sil</button>
        `;

        // Yeni li elementini todo listesine ekliyoruz
        todoListesi.appendChild(yeniLi);

        // Input alanını temizliyoruz
        yeniTodoInput.value = '';

        // Yeni eklenen li elementinin içindeki sil butonunu seçiyoruz
        const silButonu = yeniLi.querySelector('.sil-butonu');

        // Sil butonuna tıklandığında li elementini sil
        silButonu.addEventListener('click', () => {
            yeniLi.remove();
        });

        // Yeni eklenen li elementinin içindeki düzenle butonunu ve todo metnini seçiyoruz
        const duzenleButonu = yeniLi.querySelector('.duzenle-butonu');
        const todoText = yeniLi.querySelector('.todo-text');

        // Düzenle butonuna tıklandığında
        duzenleButonu.addEventListener('click', () => {
            // Input alanını kontrol et
            const input = yeniLi.querySelector('.todo-input');

            // Eğer input alanı varsa, kaydetme işlemi yap
            if (input) {
                // Input alanını ve yeni metni al
                const yeniMetin = input.value.trim();

                // Eğer yeni metin boş değilse
                if (yeniMetin !== '') {
                    // Yeni bir span elementi oluştur
                    const yeniSpan = document.createElement('span');
                    yeniSpan.className = 'todo-text';
                    yeniSpan.textContent = yeniMetin;

                    // Yeni span elementini input alanının önüne ekle
                    yeniLi.insertBefore(yeniSpan, input);

                    // Input alanını sil
                    yeniLi.removeChild(input);

                    // Butonun metnini "Düzenle" olarak değiştir
                    duzenleButonu.textContent = 'Düzenle';
                } else {
                    // Eğer yeni metin boşsa uyarı mesajı göster
                    alert('Todo boş olamaz!');
                }
            } else { // Eğer input alanı yoksa, düzenleme işlemi yap
                // Eğer butonun metni "Düzenle" ise
                if (duzenleButonu.textContent === 'Düzenle') {
                    // Yeni bir input alanı oluştur
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'todo-input';
                    input.value = todoText.textContent;

                    // Yeni input alanını todo metninin önüne ekle
                    yeniLi.insertBefore(input, todoText);

                    // Eski todo metnini sil
                    yeniLi.removeChild(todoText);

                    // Butonun metnini "Kaydet" olarak değiştir
                    duzenleButonu.textContent = 'Kaydet';
                } else { // Eğer butonun metni "Kaydet" ise
                    // Input alanını ve yeni metni al
                    const yeniMetin = input.value.trim();

                    // Eğer yeni metin boş değilse
                    if (yeniMetin !== '') {
                        // Yeni bir span elementi oluştur
                        const yeniSpan = document.createElement('span');
                        yeniSpan.className = 'todo-text';
                        yeniSpan.textContent = yeniMetin;

                        // Yeni span elementini input alanının önüne ekle
                        yeniLi.insertBefore(yeniSpan, input);

                        // Input alanını sil
                        yeniLi.removeChild(input);

                        // Butonun metnini "Düzenle" olarak değiştir
                        duzenleButonu.textContent = 'Düzenle';
                    } else {
                        // Eğer yeni metin boşsa uyarı mesajı göster
                        alert('Todo boş olamaz!');
                    }
                }
            }
        });

        // Todo metnine çift tıklandığında "tamamlandi" class'ını ekle/çıkar
        todoText.addEventListener('dblclick', () => {
            todoText.classList.toggle('tamamlandi');
        });
    } else { // Eğer input alanı boşsa uyarı mesajı göster
        alert('Lütfen bir todo girin!');
    }
}

// Örnek todoları ekleyen fonksiyon
function ekleOrnekTodolar() {
    const ornekTodolar = [
        'Alışveriş yap.',
        'Projeyi tamamla.',
        'Arkadaşlarla buluş.'
    ];

    ornekTodolar.forEach(todo => {
        // Yeni bir li elementi oluşturuyoruz
        const yeniLi = document.createElement('li');

        // Yeni li elementinin içeriğini HTML olarak ayarlıyoruz
        yeniLi.innerHTML = `
            <span class="todo-text">${todo}</span>
            <button class="duzenle-butonu">Düzenle</button>
            <button class="sil-butonu">Sil</button>
        `;

        // Yeni li elementini todo listesine ekliyoruz
        todoListesi.appendChild(yeniLi);

        // Yeni eklenen li elementinin içindeki sil butonunu seçiyoruz
        const silButonu = yeniLi.querySelector('.sil-butonu');

        // Sil butonuna tıklandığında li elementini sil
        silButonu.addEventListener('click', () => {
            yeniLi.remove();
        });

        // Yeni eklenen li elementinin içindeki düzenle butonunu ve todo metnini seçiyoruz
        const duzenleButonu = yeniLi.querySelector('.duzenle-butonu');
        const todoText = yeniLi.querySelector('.todo-text');

        // Düzenle butonuna tıklandığında
        duzenleButonu.addEventListener('click', () => {
            // Input alanını kontrol et
            const input = yeniLi.querySelector('.todo-input');

            // Eğer input alanı varsa, kaydetme işlemi yap
            if (input) {
                // Input alanını ve yeni metni al
                const yeniMetin = input.value.trim();

                // Eğer yeni metin boş değilse
                if (yeniMetin !== '') {
                    // Yeni bir span elementi oluştur
                    const yeniSpan = document.createElement('span');
                    yeniSpan.className = 'todo-text';
                    yeniSpan.textContent = yeniMetin;

                    // Yeni span elementini input alanının önüne ekle
                    yeniLi.insertBefore(yeniSpan, input);

                    // Input alanını sil
                    yeniLi.removeChild(input);

                    // Butonun metnini "Düzenle" olarak değiştir
                    duzenleButonu.textContent = 'Düzenle';
                } else {
                    // Eğer yeni metin boşsa uyarı mesajı göster
                    alert('Todo boş olamaz!');
                }
            } else { // Eğer input alanı yoksa, düzenleme işlemi yap
                // Eğer butonun metni "Düzenle" ise
                if (duzenleButonu.textContent === 'Düzenle') {
                    // Yeni bir input alanı oluştur
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'todo-input';
                    input.value = todoText.textContent;

                    // Yeni input alanını todo metninin önüne ekle
                    yeniLi.insertBefore(input, todoText);

                    // Eski todo metnini sil
                    yeniLi.removeChild(todoText);

                    // Butonun metnini "Kaydet" olarak değiştir
                    duzenleButonu.textContent = 'Kaydet';
                } else { // Eğer butonun metni "Kaydet" ise
                    // Input alanını ve yeni metni al
                    const input = yeniLi.querySelector('.todo-input');
                    const yeniMetin = input.value.trim();

                    // Eğer yeni metin boş değilse
                    if (yeniMetin !== '') {
                        // Yeni bir span elementi oluştur
                        const yeniSpan = document.createElement('span');
                        yeniSpan.className = 'todo-text';
                        yeniSpan.textContent = yeniMetin;

                        // Yeni span elementini input alanının önüne ekle
                        yeniLi.insertBefore(yeniSpan, input);

                        // Input alanını sil
                        yeniLi.removeChild(input);

                        // Butonun metnini "Düzenle" olarak değiştir
                        duzenleButonu.textContent = 'Düzenle';
                    } else {
                        // Eğer yeni metin boşsa uyarı mesajı göster
                        alert('Todo boş olamaz!');
                    }
                }
            }
        });

        // Todo metnine çift tıklandığında "tamamlandi" class'ını ekle/çıkar
        todoText.addEventListener('dblclick', () => {
            todoText.classList.toggle('tamamlandi');
        });
    });
}