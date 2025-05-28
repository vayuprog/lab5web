function saveSystemInfo() {
  const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
  };
  localStorage.setItem('systemInfo', JSON.stringify(systemInfo));
}

function displaySystemInfo() {
  const info = localStorage.getItem('systemInfo');
  if (info) {
    document.getElementById('system-info').textContent = info;
  }
}

function loadComments() {
  const variantNumber = 31;
  fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
    .then(response => response.json())
    .then(comments => {
      const commentsList = document.getElementById('comments-list');
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
        commentsList.appendChild(li);
      });
    })
    .catch(error => console.error('Помилка завантаження коментарів:', error));
}

function showModalAfterDelay() {
  setTimeout(() => {
    document.getElementById('modal').classList.remove('hidden');
  }, 60000);
}

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function setThemeBasedOnTime() {
  const hour = new Date().getHours();
  const isDayTime = hour >= 7 && hour < 21;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  } else {
    document.body.classList.toggle('dark-mode', !isDayTime);
  }
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
  saveSystemInfo();
  displaySystemInfo();
  loadComments();
  showModalAfterDelay();
  setThemeBasedOnTime();
});