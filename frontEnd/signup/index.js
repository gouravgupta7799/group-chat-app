
let url = 'http://localhost:5000/user/signUp'
let submitFrom = document.getElementById('submitBtn');

submitFrom.addEventListener('click', async (e) => {
  try {
    e.preventDefault()

    let obj = {
      userName: document.getElementById('userName').value,
      userEmail: document.getElementById('userEmail').value,
      userPassword: document.getElementById('userPassword').value,
      userContect: document.getElementById('userContect').value
    }
    axios.post(url, obj, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (err) {
    console.log(err)
  }
})