

let url = 'localhost:4000/'
let token = localStorage.getItem('token');
let list = document.getElementById('chatmsg')


document.getElementById('sendbutton').addEventListener('click', () => {

  let massege = document.getElementById('masseges').value;
  console.log(massege)
  // axios.post(url, { massages: massege })
  //   .then(Response => {
  //     let li = document.createElement('li');
  //     li.className = 'msg1';
  //     li.innerHTML =`${user1} : ${Response.data.message}`;
  //     list.appendChild(li)
    // })
})
