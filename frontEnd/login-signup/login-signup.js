const SUCCESS_COLOR = '#59B259';
const FAILURE_COLOR = '#D2504D';

let url = 'http://localhost:4000/user'
let token = localStorage.getItem('token');

let loginTab = document.getElementById('login-tab');
let signupTab = document.getElementById('signup-tab');
let loginForm = document.getElementById('login-form');
let signupForm = document.getElementById('signup-form');

signupTab.addEventListener('click', () => {
  loginForm.classList.remove('active-form');
  loginForm.classList.add('not-active-form');

  loginTab.classList.remove('active-tab');
  signupTab.classList.add('active-tab');

  signupForm.classList.remove('not-active-form');
  signupForm.classList.add('active-form');
})

loginTab.addEventListener('click', () => {
  signupForm.classList.remove('active-form');
  signupForm.classList.add('not-active-form');

  signupTab.classList.remove('active-tab');
  loginTab.classList.add('active-tab');

  loginForm.classList.remove('not-active-form');
  loginForm.classList.add('active-form');
})


function createNotification(msg, color) {
  let notification = document.createElement('div');
  notification.style.cssText = `
    opacity: 0;
    z-index: 99;
    color: white;
    width: fit-content;
    position: fixed;
    top: 50px;
    right: 50%;
    transform: translateX(50%);
    padding: 7px;
    border-radius: 5px;
    transition: opacity 0.5s ease-in-out;
    background-color: ${color};
    `;
  document.body.appendChild(notification);
  notification.innerHTML = msg;
  return notification;
}
function showNotification(notification) {
  setTimeout(() => {
    notification.style.opacity = 1;
  }, 0);
  setTimeout(() => {
    notification.style.opacity = 0;
  }, 3000)
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let obj = {
    userEmail: document.getElementById('loginUserEmail').value,
    userPassword: document.getElementById('loginUserPassword').value
  };
  axios.post(url + '/login', obj, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      showNotification(createNotification('Account loged successfully', SUCCESS_COLOR));
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        location.href = 'http://127.0.0.1:5500/chats-screen/chats-screen.html';
      }, 3000);
      console.log(response);
    })
    .catch((error) => {
      showNotification(createNotification(error.response.data.msg, FAILURE_COLOR));
    });
})

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let obj = {
    userName: document.getElementById('signupUserName').value,
    userEmail: document.getElementById('signupUserEmail').value,
    userPassword: document.getElementById('signupUserPassword').value,
    userContect: document.getElementById('signupUserContect').value
  }
  axios.post(url + '/signup', obj, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      showNotification(createNotification('Account created successfully', SUCCESS_COLOR));
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        location.href = 'http://127.0.0.1:5500/chats-screen/chats-screen.html';
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      showNotification(createNotification(error.response.data.msg, FAILURE_COLOR));
    });

})