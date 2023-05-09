
let url = 'http://localhost:4000'
let token = localStorage.getItem('token');
let chats = document.getElementById('chats');
let groupNameHeadline = document.getElementById('group-name-headline');
let groups = document.getElementById('group-list');
let createNewGroup = document.getElementById('create-new-group');
let leftHearder = document.getElementById('left-header');
localStorage.setItem('groupId', JSON.stringify(0));
localStorage.setItem('lastUserId', JSON.stringify(0));

let lastUsedId = localStorage.getItem('lastUserId');

let lastUserId = JSON.parse(lastUsedId);
// creating a New Group in DB
createNewGroup.addEventListener('click', () => {
  let div1 = document.createElement('div');
  div1.id = 'asdf';
  let div = document.createElement('div')
  div.innerHTML = `<div id="group-form">
            <input type="text" id="create-input" placeholder="group name">
            <button class="btn" id="create-group">create</button>
          </div>`
  leftHearder.appendChild(div1);
  let asdf = document.getElementById('asdf')
  asdf.appendChild(div);

  let createGroup = document.getElementById('create-group');
  createGroup.addEventListener('click', () => {
    let groupName = document.getElementById('create-input').value
    axios.post(url + '/groups', { groupName: groupName }, { headers: { 'Authorization': token, } })
      .then(res => {
        console.log(res)
        addGroup(res.data.data);
      })
    leftHearder.removeChild(asdf)
  })
})

showGroups();

function showGroups() {
  axios.get(url + '/groups', { headers: { 'Authorization': token } })
    .then(res => {
      let newRes = res.data.data
      newRes.forEach(Response => {
        addGroup(Response);
      })
    })
}

function addGroup(data) {
  let li = document.createElement('li');
  li.id = data.id;
  li.innerHTML = data.groupName
  groups.appendChild(li);
}


groups.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') {
    groupNameHeadline.innerHTML = e.target.innerHTML;
    let group = parseInt(e.target.id);
    // saveInLocalChats(group);
    localStorage.setItem('localChats', JSON.stringify([]));
    localStorage.setItem('lastUserId', JSON.stringify(0))
    showGroupChatsMessage(group);
  }
})

//api call to get chats of the group
let getGroupChat = (arr, Id) => {
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
}


let msg = document.getElementById('message-input')
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {

  if (msg.innerText.trim() !== '') {
    let obj = {
      messages: msg.innerText.trim()
    };
    let groupId = JSON.parse(localStorage.getItem('groupId'));
    axios.post(url + `/messages?groupId=${groupId}`, obj, { headers: { 'Authorization': token, } })
      .then(res => {
        msg.innerText = ''
      })
      .catch(err => {
        console.log(err)
      })
  }
});

let localChats = localStorage.getItem('localChats');
// setInterval(() => {
saveInLocalChats()
// }, 3000)

// save chats in localStorage
function saveInLocalChats() {
  console.log(1)
  if (localChats === null) {
    let arr = [];
    let chatsArr = JSON.stringify(arr);
    localStorage.setItem('localChats', chatsArr);
  } else {
    let arr = JSON.parse(localChats);
    let groupId = JSON.parse(localStorage.getItem('groupId'));
    axios.get(url + '/messages' + `?lastUserId=${lastUserId}&groupId=${groupId}`, { headers: { 'Authorization': token, } })
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
        getGroupChat(lastTenMessages, Id)
        let newidd = JSON.stringify(idd)
        localStorage.setItem('lastUserId', newidd)
        let newArr = JSON.stringify(lastTenMessages);
        localStorage.setItem('localChats', newArr);
      })
  }
}


function showGroupChatsMessage(id) {
  localStorage.setItem('groupId', JSON.stringify(id));
  let groupId = JSON.parse(localStorage.getItem('groupId'));
}

