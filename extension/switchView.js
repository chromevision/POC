const logInButton = document.getElementById('login-button');
const loginForm = document.getElementById('login-form');
const contentToShow = document.getElementById('content');

logInButton.addEventListener('click', switchView);

function switchView() {
  loginForm.classList.toggle('hidden');
  contentToShow.classList.toggle('hidden');
}
