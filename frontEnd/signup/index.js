let submitFrom = document.getElementById('submitBtn');

submitFrom.addEventListener('click', async (e) => {
  try {
    // e.preventDefault()

    let obj = {
      userName: document.getElementById('userName').value,
      userEmail: document.getElementById('userEmail').value,
      userPassword: document.getElementById('userPassword').value,
      userContect: document.getElementById('userContect').value
    }

    await axios.post(url, obj)
  }
  catch (err) {
    console.log(err)
  }
})