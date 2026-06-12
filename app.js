// ===== ЭЛЕМЕНТЫ =====
const screenHome = document.getElementById('screen-home');
const screenModule = document.getElementById('screen-module');
const moduleTitleHeader = document.getElementById('module-title-header');
const meditationsList = document.getElementById('meditations-list');
const backBtn = document.getElementById('back-btn');

const playerBar = document.getElementById('player-bar');
const playerTrackTitle = document.getElementById('player-track-title');
const playPauseBtn = document.getElementById('player-playpause');
const seekEl = document.getElementById('player-seek');
const currentEl = document.getElementById('player-current');
const durationEl = document.getElementById('player-duration');
const audio = document.getElementById('audio-el');

let currentPlayingItem = null;

// ===== НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ =====

document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('click', () => {
    const moduleId = card.dataset.module;
    openModule(moduleId);
  });
});

backBtn.addEventListener('click', () => {
  screenModule.classList.remove('active');
  screenHome.classList.add('active');
});

function openModule(moduleId) {
  const moduleData = MODULES[moduleId];
  moduleTitleHeader.textContent = moduleData.title;
  meditationsList.innerHTML = '';

  if (moduleData.meditations.length === 0) {
    meditationsList.innerHTML = `
      <div class="empty-state">
        Здесь пока пусто.<br>
        Медитации появятся, как только их добавят в этот раздел.
      </div>
    `;
  } else {
    moduleData.meditations.forEach((med, index) => {
      const item = document.createElement('div');
      item.className = 'meditation-item';
      item.innerHTML = `
        <div class="med-icon">▶</div>
        <div class="med-info">
          <div class="med-title">${med.title}</div>
          <div class="med-sub">${moduleData.title}</div>
        </div>
      `;
      item.addEventListener('click', () => playTrack(med, item));
      meditationsList.appendChild(item);
    });
  }

  screenHome.classList.remove('active');
  screenModule.classList.add('active');
}

// ===== ПЛЕЕР =====

function playTrack(med, itemEl) {
  // снимаем подсветку с предыдущего трека
  if (currentPlayingItem) {
    currentPlayingItem.classList.remove('playing');
    currentPlayingItem.querySelector('.med-icon').textContent = '▶';
  }

  if (currentPlayingItem === itemEl && !audio.paused) {
    // повторный тап по тому же треку — пауза
    audio.pause();
    currentPlayingItem = null;
    return;
  }

  audio.src = med.file;
  audio.play();
  playerTrackTitle.textContent = med.title;
  playerBar.classList.add('visible');
  playPauseBtn.textContent = '⏸';

  itemEl.classList.add('playing');
  itemEl.querySelector('.med-icon').textContent = '⏸';
  currentPlayingItem = itemEl;
}

playPauseBtn.addEventListener('click', () => {
  if (!audio.src) return;
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
    if (currentPlayingItem) currentPlayingItem.querySelector('.med-icon').textContent = '⏸';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶';
    if (currentPlayingItem) currentPlayingItem.querySelector('.med-icon').textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    seekEl.value = (audio.currentTime / audio.duration) * 100;
    currentEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener('ended', () => {
  playPauseBtn.textContent = '▶';
  if (currentPlayingItem) {
    currentPlayingItem.classList.remove('playing');
    currentPlayingItem.querySelector('.med-icon').textContent = '▶';
    currentPlayingItem = null;
  }
});

seekEl.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekEl.value / 100) * audio.duration;
  }
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ===== TELEGRAM MINI APP =====
// Если приложение открыто внутри Telegram — растягиваем на весь экран
if (window.Telegram && window.Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}
