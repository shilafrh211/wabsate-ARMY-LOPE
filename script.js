// ===== MUSIC PLAYER (hanya aktif di halaman playlist.html, mendukung banyak lagu) =====
const trackButtons = document.querySelectorAll('.track-btn');

if (trackButtons.length > 0) {
  trackButtons.forEach(btn => {
    // Ambil elemen audio yang satu box dengan tombol ini
    const audioEl = btn.parentElement.querySelector('.track-audio');

    btn.addEventListener('click', () => {
      const isPlaying = !audioEl.paused;

      // Hentikan semua lagu lain dulu, biar nggak numpuk suaranya
      document.querySelectorAll('.track-audio').forEach(a => {
        a.pause();
        a.currentTime = a === audioEl && isPlaying ? a.currentTime : 0;
      });
      trackButtons.forEach(b => (b.textContent = '▶'));

      // Baru mainkan lagu yang diklik (kalau sebelumnya belum main)
      if (!isPlaying) {
        audioEl.play();
        btn.textContent = '⏸';
      }
    });

    // Balikin tombol jadi ▶ otomatis kalau lagu selesai
    audioEl.addEventListener('ended', () => {
      btn.textContent = '▶';
    });
  });
}

// ===== FILTER GALLERY (hanya aktif di halaman gallery.html) =====
const tabs = document.querySelectorAll('.tab');
const galleryItems = document.querySelectorAll('.gallery-item');

if (tabs.length > 0) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Tandai tab yang aktif
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      // Tampilkan/sembunyikan item sesuai kategori
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===== SLIDER (hanya aktif di halaman index.html) =====
// Ambil elemen-elemen yang dibutuhkan
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track) {
  let currentIndex = 0;

  // Buat dot secara otomatis sesuai jumlah slide
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Fungsi untuk memindahkan slide ke index tertentu
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  // Tombol panah kanan & kiri
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

  // Auto slide setiap 4 detik
  setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 4000);
}
