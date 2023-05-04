

let url = 'http://localhost:4000/user/login'
let token = localStorage.getItem('token');

let submitFrom = document.getElementById('submitBtn');


function showNotification(msg, color) {
  let notification = document.getElementById('notification');

  notification.style.opacity = 1;
  notification.style.backgroundColor = color;
  notification.innerHTML = msg;
  setTimeout(() => {
    notification.style.opacity = 0;
  }, 3000)
}


submitFrom.addEventListener('click', async (e) => {
  e.preventDefault()
  let obj = {
    userEmail: document.getElementById('userEmail').value,
    userPassword: document.getElementById('userPassword').value
  };
  axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      showNotification('Account loged successfully', 'green');
      localStorage.setItem('token', response.data.token)
    })
    .catch((error) => {
      showNotification(error.response.data.msg, 'red');
      console.log(error)
    });
})

document.getElementById('signupBtn').addEventListener('click', () => {
  location.href = 'http://127.0.0.1:5500/signup/signup.html';
})