
let url = 'http://localhost:4000/messages'
let token = localStorage.getItem('token');
let chats = document.getElementById('chats');
let groupNameHeadline = document.getElementById('group-name-headline');
let groups = document.getElementById('group-list');


let lastUsedId = localStorage.getItem('lastUserId');
if (lastUsedId === null) {
  localStorage.setItem('lastUserId', JSON.stringify(0));
}
let lastUserId = JSON.parse(lastUsedId);


// groups.addEventListener('click', (e) => {
//   if (e.target.nodeName === 'LI') {
//     groupNameHeadline.innerHTML = e.target.innerHTML;
//     let group = e.target.id;
//     getGroupChat(group);
//   }
// })

//api call to get chats of the group
let getGroupChat = (group, arr, Id) => {
  chats.innerHTML = '';

  let userId = Id
  arr.forEach(ele => {
    let div = document.createElement('div');

    if (ele.userId === null) {
      div.className = 'mid'
      div.innerHTML = ele.chats;
    } else if (ele.userId === userId) {
      div.className = 'right'
      div.innerHTML = ele.chats;
    } else {
      div.className = 'left'
      div.innerHTML = `<div class="message-user-name">${ele.name}</div> ${ele.chats}`;
    }
    chats.appendChild(div);
  });
  chats.scrollTop = chats.scrollHeight;
  // })
  // console.log(group);
}


let msg = document.getElementById('message-input')
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {

  if (msg.innerText.trim() !== '') {
    let obj = {
      messages: msg.innerText.trim()
    };
    axios.post(url, obj, { headers: { 'Authorization': token, } })
      .then(res => {
        msg.innerText = ''
      })
      .catch(err => {
        console.log(err)
      })
  }
});


let localChats = localStorage.getItem('localChats');
setInterval(() => {
  saveInLocalChats()
}, 1000)

// save chats in localStorage
function saveInLocalChats() {
  if (localChats === null) {
    let arr = [];
    let chatsArr = JSON.stringify(arr);
    localStorage.setItem('localChats', chatsArr);
  } else {
    let arr = JSON.parse(localChats);
    axios.get(url + `?lastUserId=${lastUserId}`, { headers: { 'Authorization': token, } })
      .then(res => {
        let Id = res.data.mainUserId
        let idd;
        res.data.data.forEach(ele => {
          arr.push(ele);
          idd = ele.id
        })
        const lastTenMessages = arr.slice(-12)
        if (idd === undefined) {
          idd = lastUserId;
        }
        getGroupChat('g1', lastTenMessages, Id)
        let newidd = JSON.stringify(idd)
        localStorage.setItem('lastUserId', newidd)
        let newArr = JSON.stringify(lastTenMessages);
        localStorage.setItem('localChats', newArr);
      })
  }
}
