
let url = 'http://localhost:4000/messages'
let token = localStorage.getItem('token');
let chats = document.getElementById('chats');
let groupNameHeadline = document.getElementById('group-name-headline');
let groups = document.getElementById('group-list');
let rightContent = document.getElementById('chats');


// groups.addEventListener('click', (e) => {
//   if (e.target.nodeName === 'LI') {
//     groupNameHeadline.innerHTML = e.target.innerHTML;
//     let group = e.target.id;
//     getGroupChat(group);
//   }
// })

//api call to get chats of the group
let getGroupChat = (group) => {
  chats.innerHTML = '';
  axios.get(url, { headers: { 'Authorization': token, } })
    .then(res => {
      let userId = res.data.mainUserId
      let userName = res.data.mainUserName
      res.data.data.forEach(ele => {
        let div = document.createElement('div');

        if (ele.userId === null) {
          div.className = 'mid'
          div.innerHTML = `${ele.chats}`
        } else if (ele.userId === userId) {
          div.innerHTML = ele.chats;
          div.className = 'right'
        } else {
          div.innerHTML = `${userName}: ${ele.chats}`
          div.className = 'left'
        }
        rightContent.appendChild(div);
      });
    })
  // console.log(group);
}
getGroupChat('g1');

let msg = document.getElementById('message-input')
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {

  console.log(msg.innerText);
  if (msg.innerText.trim() !== '') {
    let obj = {
      messages: msg.innerText.trim()
    };
    axios.post(url, obj, { headers: { 'Authorization': token, } })
      .then(res => {
        console.log(res)
        msg.innerText = ''
        getGroupChat('g1')
      })
  }
});
