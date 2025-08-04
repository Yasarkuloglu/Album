document.addEventListener('DOMContentLoaded', () => {
    // HTML elementlerini seç
    const albumCover = document.getElementById('albumCover');
    const photoGallery = document.getElementById('photoGallery');
    const mainPhoto = document.getElementById('mainPhoto');
    const photoCaption = document.getElementById('photoCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    const closeAlbumBtn = document.getElementById('closeAlbumBtn');

    // Albümdeki fotoğrafların listesi (BURAYI KENDİ FOTOĞRAFLARINIZA GÖRE GÜNCELLEYİN!)
    const photos = [
        { src: 'images/1.jpeg', caption: 'Güneşli bir gün' },
        { src: 'images/2.jpg', caption: 'Nostalji' },
        { src: 'images/3.jpg', caption: 'Göl Manzarası' },
        { src: 'images/4.jpg', caption: 'Manzara' },
        { src: 'images/5.jpg', caption: 'İlkbahar' },
        { src: 'images/6.jpg', caption: 'Dağ Manzarası' }
        // Daha fazla fotoğraf eklemek için virgül koyup devam edin
        // { src: 'images/yeni_fotograf.png', caption: 'Yeni bir açıklama.' },
    ];

    let currentIndex = 0; // Şu an gösterilen fotoğrafın indeksi

    // Fonksiyon: Belirli bir indeksteki fotoğrafı göster
    function showPhoto(index) {
        if (index >= 0 && index < photos.length) {
            mainPhoto.src = photos[index].src;
            photoCaption.textContent = photos[index].caption;
            currentIndex = index;
            updateThumbnails(); // Küçük resimlerde aktif olanı işaretle
        }
    }

    // Fonksiyon: Küçük resimleri oluştur ve güncel tut
    function createThumbnails() {
        thumbnailGrid.innerHTML = ''; // Önceki küçük resimleri temizle
        photos.forEach((photo, index) => {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = photo.src;
            thumbnailImg.alt = `Küçük Resim ${index + 1}`;
            thumbnailImg.dataset.index = index; // Hangi fotoğrafa ait olduğunu sakla

            if (index === currentIndex) {
                thumbnailImg.classList.add('active'); // Aktif olana stil ekle
            }

            thumbnailImg.addEventListener('click', () => {
                showPhoto(index); // Tıklayınca o fotoğrafı göster
            });
            thumbnailGrid.appendChild(thumbnailImg);
        });
    }

    // Fonksiyon: Küçük resimlerde aktif olanı güncelle
    function updateThumbnails() {
        const thumbnails = thumbnailGrid.querySelectorAll('img');
        thumbnails.forEach((img, index) => {
            if (index === currentIndex) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    // Olay Dinleyicileri

    // Kapak tıklanınca albümü aç
    albumCover.addEventListener('click', () => {
        albumCover.classList.add('open'); // Kapağı döndür
        // Bir süre sonra galeri gösterilsin (animasyon bitince)
        setTimeout(() => {
            photoGallery.classList.add('active'); // Galeriyi görünür yap
            showPhoto(currentIndex); // İlk fotoğrafı göster
            createThumbnails(); // Küçük resimleri oluştur
        }, 800); // CSS geçiş süresiyle aynı olmalı
    });

    // Önceki fotoğraf butonu
    prevBtn.addEventListener('click', () => {
        showPhoto(currentIndex - 1);
    });

    // Sonraki fotoğraf butonu
    nextBtn.addEventListener('click', () => {
        showPhoto(currentIndex + 1);
    });

    // Albümü kapat butonu
    closeAlbumBtn.addEventListener('click', () => {
        photoGallery.classList.remove('active'); // Galeriyi gizle
        setTimeout(() => {
            albumCover.classList.remove('open'); // Kapağı geri getir
            currentIndex = 0; // Albüm kapanınca indeksi sıfırla (isteğe bağlı)
            mainPhoto.src = ""; // Ana fotoğrafı temizle
            photoCaption.textContent = ""; // Açıklamayı temizle
            thumbnailGrid.innerHTML = ""; // Küçük resimleri temizle
        }, 800); // Geçiş süresi
    });

    // Klavyeden ileri/geri tuşları ile navigasyon
    document.addEventListener('keydown', (event) => {
        if (photoGallery.classList.contains('active')) { // Sadece galeri açıksa çalışsın
            if (event.key === 'ArrowLeft') {
                showPhoto(currentIndex - 1);
            } else if (event.key === 'ArrowRight') {
                showPhoto(currentIndex + 1);
            }
        }
    });
});
