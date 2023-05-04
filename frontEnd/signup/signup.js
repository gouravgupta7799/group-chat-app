
let url = 'http://localhost:5000/user/signUp'
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
  try {
    e.preventDefault();

    let obj = {
      userName: document.getElementById('userName').value,
      userEmail: document.getElementById('userEmail').value,
      userPassword: document.getElementById('userPassword').value,
      userContect: document.getElementById('userContect').value
    }
    axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        showNotification('Account created successfully','green');
      })
      .catch((error) => {
        showNotification(error.response.data.msg, 'red');
      });
  }
  catch (err) {
    // console.log(err)
  }
})