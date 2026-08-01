// ===== MUSIC PLAYER (hanya aktif di halaman playlist.html) =====
const playerBoxes = document.querySelectorAll('.player-box');

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

if (playerBoxes.length > 0) {
  const boxArray = Array.from(playerBoxes);

  boxArray.forEach((box, index) => {
    const audioEl = box.querySelector('.track-audio');
    const btn = box.querySelector('.track-btn');
    const prevBtn = box.querySelector('.track-prev');
    const nextBtn = box.querySelector('.track-next');
    const fill = box.querySelector('.progress-fill');
    const timeCurrent = box.querySelector('.time-current');
    const timeRemaining = box.querySelector('.time-remaining');

    function stopAllExcept(keepAudio) {
      document.querySelectorAll('.track-audio').forEach(a => {
        if (a !== keepAudio) a.pause();
      });
      document.querySelectorAll('.track-btn').forEach(b => {
        if (b !== btn) b.textContent = '▶';
      });
    }

    function playThis() {
      stopAllExcept(audioEl);
      audioEl.play();
      btn.textContent = '⏸';
    }

    btn.addEventListener('click', () => {
      if (audioEl.paused) {
        playThis();
      } else {
        audioEl.pause();
        btn.textContent = '▶';
      }
    });

    audioEl.addEventListener('timeupdate', () => {
      if (audioEl.duration) {
        fill.style.width = `${(audioEl.currentTime / audioEl.duration) * 100}%`;
        timeCurrent.textContent = formatTime(audioEl.currentTime);
        timeRemaining.textContent = `-${formatTime(audioEl.duration - audioEl.currentTime)}`;
      }
    });

    audioEl.addEventListener('ended', () => {
      btn.textContent = '▶';
      fill.style.width = '0%';
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevIndex = (index - 1 + boxArray.length) % boxArray.length;
        const prevBox = boxArray[prevIndex];
        prevBox.querySelector('.track-btn').click();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIndex = (index + 1) % boxArray.length;
        const nextBox = boxArray[nextIndex];
        nextBox.querySelector('.track-btn').click();
      });
    }
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

// ===== BT21 GALLERY MODAL =====
const bt21Gallery = {
  van: { name: 'VAN', images: [
    "images/van1.jpeg","images/van2.jpeg","images/van3.jpeg",
    "images/van4.jpeg","images/van5.jpeg","images/van6.jpeg","images/van7.jpeg",
    "images/van8.jpeg","images/van9.jpeg","images/van10.jpeg",
    "images/van11.jpeg","images/van12.jpeg","images/van13.jpeg",
    "images/van14.jpeg","images/van15.jpeg","images/van16.jpeg","images/van17.jpeg","images/van18.jpeg"
]},
  koya: { name: 'KOYA', images: [
    "images/koya1.jpeg","images/koya2.jpeg","images/koya3.jpeg",
    "images/koya4.jpeg","images/koya5.jpeg","images/koya6.jpeg","images/koya7.jpeg"
  ]},
  rj: { name: 'RJ', images: [
    "images/rj1.jpeg","images/rj2.jpeg","images/rj3.jpeg",
    "images/rj4.jpeg","images/rj5.jpeg"
  ]},
  shooky: { name: 'SHOOKY', images: [
    "images/shky1.jpeg","images/shky2.jpeg","images/shky3.jpeg",
    "images/shky4.jpeg","images/shky5.jpeg","images/shky6.jpeg","images/shky7.jpeg"
  ]},
  mang: { name: 'MANG', images: [
    "images/mg1.jpeg","images/mg2.jpeg","images/mg3.jpeg",
    "images/mg4.jpeg","images/mg5.jpeg","images/mg6.jpeg","images/mg7.jpeg"
  ]},
  chimmy: { name: 'CHIMMY', images: [
    "images/cmmy1.jpeg","images/cmmy2.jpeg","images/cmmy3.jpeg",
    "images/cmmy4.jpeg","images/cmmy5.jpeg","images/cmmy6.jpeg"
  ]},
  tata: { name: 'TATA', images: [
    "images/tata1.jpeg","images/tata2.jpeg","images/tata3.jpeg",
    "images/tata4.jpeg","images/tata5.jpeg","images/tata6.jpeg","images/tata7.jpeg"
  ]},
  cooky: { name: 'COOKY', images: [
    "images/coky1.jpeg","images/coky2.jpeg","images/coky3.jpeg",
    "images/coky4.jpeg","images/coky5.jpeg","images/coky6.jpeg","images/coky7.jpeg"
  ]}
};

const bt21Cards = document.querySelectorAll('.bt21-card');

if (bt21Cards.length > 0) {
  const modal = document.getElementById('bt21Modal');
  const modalName = document.getElementById('bt21ModalName');
  const modalGallery = document.getElementById('bt21ModalGallery');
  const modalIgLink = document.getElementById('bt21ModalIgLink');
  const modalClose = document.getElementById('bt21ModalClose');

  bt21Cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const key = card.dataset.character;
      const data = bt21Gallery[key];
      if (!data) return;

      modalName.textContent = data.name;
      modalIgLink.href = card.href;

      modalGallery.innerHTML = '';
      if (data.images.length === 0) {
        modalGallery.innerHTML = '<p class="bt21-modal-empty">Belum ada foto buat karakter ini.</p>';
      } else {
        data.images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          modalGallery.appendChild(img);
        });
      }
      modal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

  