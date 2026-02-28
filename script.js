let selectedMood = null;

const moodButtons = document.querySelectorAll('.moods button');
const saveBtn = document.getElementById('save');
const historyList = document.getElementById('history');
const noteInput = document.getElementById('note');

// ===============================
// PILIH MOOD
// ===============================
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    moodButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMood = btn.dataset.mood;
    setMoodTheme(selectedMood);
  });
});

// ===============================
// SIMPAN MOOD
// ===============================
saveBtn.addEventListener('click', () => {
  if (!selectedMood) {
    alert('Pilih mood dulu woy!');
    return;
  }

  const moodData = {
    mood: selectedMood,
    note: noteInput.value,
    date: new Date().toLocaleDateString()
  };

  addToHistory(moodData);
  saveToLocal(moodData);

  noteInput.value = '';
  selectedMood = null;
  moodButtons.forEach(b => b.classList.remove('active'));
});

// ===============================
// TAMBAH KE HISTORY
// ===============================
function addToHistory(data) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${data.date}</strong> - ${data.mood}<br>
    <small>${data.note}</small>
    <button>❌</button>
  `;

  li.querySelector('button').addEventListener('click', () => {
    li.remove();
    removeFromLocal(data);
  });

  historyList.prepend(li);
}

// ===============================
// LOCAL STORAGE
// ===============================
function saveToLocal(data) {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(data);
  localStorage.setItem('moods', JSON.stringify(moods));
}

function removeFromLocal(data) {
  let moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods = moods.filter(m =>
    m.date !== data.date ||
    m.mood !== data.mood ||
    m.note !== data.note
  );
  localStorage.setItem('moods', JSON.stringify(moods));
}

// ===============================
// LOAD DATA SAAT REFRESH
// ===============================
window.addEventListener('load', () => {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.forEach(addToHistory);
});

// ===============================
// TEMA SESUAI MOOD
// ===============================
function setMoodTheme(mood) {
  const themes = {
    'Senang': '#ffe066',
    'B aja': '#e0e0e0',
    'Sedih': '#74c0fc',
    'Marah': '#ff6b6b',
    'Capek': '#ced4da'
  };

  document.body.style.background = themes[mood] || '#f4f4f4';
}