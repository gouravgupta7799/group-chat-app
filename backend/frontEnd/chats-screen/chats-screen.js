
let url = 'http://localhost:4000'
let token = localStorage.getItem('token');
let chats = document.getElementById('chats');
let groupNameHeadline = document.getElementById('group-name-headline');
let rightHeader = document.getElementById('right-header');
let groups = document.getElementById('group-list');
let createNewGroup = document.getElementById('create-new-group');
let leftHearder = document.getElementById('left-header');
localStorage.setItem('groupId', JSON.stringify(0));
localStorage.setItem('lastUserId', JSON.stringify(0));
localStorage.setItem('localChats', JSON.stringify([]));

let lastUsedId = localStorage.getItem('lastUserId');

let lastUserId = JSON.parse(lastUsedId);

// creating a New Group in DB
createNewGroup.addEventListener('click', () => {
  let div = document.getElementById('create-new-group-form');
  div.style.display = 'block'


  let createGroup = document.getElementById('create-group');
  createGroup.addEventListener('click', () => {
    let groupName = document.getElementById('create-input').value
    axios.post(url + '/groups', { groupName: groupName }, { headers: { 'Authorization': token, } })
      .then(res => {
        localStorage.setItem('groupId', JSON.stringify(res.data.data.id));

        addGroup(res.data.data);
        div.style.display = 'none'
      })
      .catch(err => { console.log(err) });
  })
});

showGroups();

function showGroups() {
  axios.get(url + '/groups', { headers: { 'Authorization': token } })
    .then(res => {
      let newRes = res.data.data;
      newRes.forEach(Response => {
        addGroup(Response);
      });
    })
    .catch(err => console.log(err));
};

function addGroup(data) {
  let li = document.createElement('li');
  li.id = data.groupId;
  li.innerHTML = data.groupName;
  groups.appendChild(li);
}


groups.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') {
    groupNameHeadline.innerHTML = e.target.innerHTML;
    let group = parseInt(e.target.id);
    saveInLocalChats(group);
    localStorage.setItem('localChats', JSON.stringify([]));
    localStorage.setItem('groupId', JSON.stringify(group));
  };
});

let localChats = localStorage.getItem('localChats');
// setInterval(() => {
saveInLocalChats();
// }, 3000);


//api call to get chats of the group
//and save chats in localStorage

function saveInLocalChats() {

  let groupId = JSON.parse(localStorage.getItem('groupId'));
  let arr = JSON.parse(localChats);
  axios.get(url + '/messages' + `?lastUserId=${lastUserId}&groupId=${groupId}`, { headers: { 'Authorization': token, } })
    .then(res => {
      let Id = res.data.mainUserId;
      let idd;
      res.data.data.forEach(ele => {
        arr.push(ele);
        idd = ele.id;
      });
      const lastTenMessages = arr.slice(-12);
      if (idd === undefined) {
        idd = lastUserId;
      };
      getGroupChat(lastTenMessages, Id);
      let newidd = JSON.stringify(idd);
      localStorage.setItem('lastUserId', newidd);
      let newArr = JSON.stringify(lastTenMessages);
      localStorage.setItem('localChats', newArr);
    })
    .catch(err => {
      console.log(err);
    });
};


// chat box
let getGroupChat = (arr, Id) => {
  chats.innerHTML = '';
  let userId = Id;
  arr.forEach(ele => {
    let div = document.createElement('div');
    console.log(ele)
    if (ele.name === null) {
      div.className = 'mid';
      div.innerHTML = ele.chats;
    } else if (ele.userId === userId) {
      div.className = 'right'
      if (ele.chats === null) {
        div.innerHTML = `<img src="${ele.urlfile}" alt="img"  width='400px'/>`;
      } else {
        div.innerHTML = ele.chats;
      }
    } else {
      div.className = 'left'
      if (ele.chats === null) {
        div.innerHTML = `<img src="${ele.urlfile}" alt="img" height="50px" width="50px />`;
      } else {
        div.innerHTML = `<div class="message-user-name">${ele.name}</div> ${ele.chats}`;
      }
    }
    chats.appendChild(div);
  });
  chats.scrollTop = chats.scrollHeight;
};

// send messages
let msg = document.getElementById('message-input');
let sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  if (msg.innerText.trim() !== '') {
    let obj = {
      messages: msg.innerText.trim()
    };
    let groupId = JSON.parse(localStorage.getItem('groupId'));
    axios.post(url + `/messages?groupId=${groupId}`, obj, { headers: { 'Authorization': token, } })
      .then(res => {
        msg.innerText = '';
      })
      .catch(err => {
        console.log(err)
      });
  };
});


// add new member to group form
groupNameHeadline.addEventListener('click', (e) => {
  if (e.target.innerHTML) {

    let div = document.createElement('div');
    div.id = 'group-info-tab';
    div.innerHTML = `<div class="group-info">
              <div class="group-info-headline">
              <div class="cancel" onclick="removeGroupInfoTab()">X</div>
                Group Info
              </div>
              <div id="add-person" onclick="addNewParticipant()">
                Add New Participants
              </div>
              <div id="searchperson">
              </div>
              <div class="group-info-content">
                <ul id="person-list">
                </ul>
                <ul id="not-in-group">
                </ul>
              </div>
            </div>
          </div> `;
    rightHeader.appendChild(div);

    //list of all member in group
    let groupId = JSON.parse(localStorage.getItem('groupId'));
    let personList = document.getElementById('person-list');

    axios.get(url + `/admin/allUserNot/?groupId=${groupId}`, { headers: { 'Authorization': token } })
      .then(data => {
        console.log(data)
        let notInGroup = document.getElementById('not-in-group');
        data.data.data.forEach(data => {
          let li = document.createElement('li');
          if (data.groupId !== groupId) {
            li.innerHTML = `${data.userName}
            <button onclick="addMe(${data.userId},${groupId})">add</button>`;
          } else {
            li.innerHTML = `${data.userName} already in a group`;
          }
          notInGroup.appendChild(li);
        })
      })
      .catch(err => {
        console.log(err)
      })


    axios.get(url + `/admin/allUser/?groupId=${groupId}`, { headers: { 'Authorization': token } })
      .then(data => {
        // let activeUser = data.data.activeUser;
        data.data.data.forEach(person => {

          let li = document.createElement('li');
          if (!person.isAdmin) {
            li.innerHTML = `${person.userName}
          <button onclick="removePerson(${person.id})">remove</button>
          <button onclick="makeAdminTo(${person.id},${groupId})">make admin</button>`;
          } else {
            li.innerHTML = `${person.userName}
          <button onclick="removePerson(${person.id},${groupId})">remove</button>`;
          };
          personList.appendChild(li);
        })
      })
      .catch(err => console.log(err));
  }
})
// remove from group function
function removePerson(id, groupId) {
  axios.post(url + '/admin/removePerson', { id: id, groupId: groupId }, { headers: { 'Authorization': token } })
    .then(res => {
      // console.log(res)
    })
    .catch(err => console.log(err))
};

// make him admin function
function makeAdminTo(id, groupId) {
  axios.post(url + '/admin/makeAdmin', { id: id, groupId: groupId }, { headers: { 'Authorization': token } })
    .then(res => {
      // console.log(res)
    })
    .catch(err => console.log(err));
};

// add new person to group function
function addMe(id) {
  let groupId = JSON.parse(localStorage.getItem('groupId'));
  axios.post(url + '/admin/addToGroup', { groupId: groupId, Id: id }, { headers: { 'Authorization': token } })
    .then(res => {
      // console.log('done')
    })
    .catch(err => {
      console.log(err)
    })
}

// remove group info tab (close button)
function removeGroupInfoTab() {
  let groupinfotab = document.getElementById('group-info-tab');
  rightHeader.removeChild(groupinfotab);
};

// search bar for add new person
function addNewParticipant() {
  let div = document.createElement('div');
  div.innerHTML = `<input type="text" id="search-name" placeholder="search Name">
            <button class="btn" id="searchBtn">search</button>`;
  let add = document.getElementById('add-person');
  let addNewParticipant = document.getElementById('searchperson');
  addNewParticipant.appendChild(div);
  add.style.display = 'none';


  document.getElementById('searchBtn').addEventListener('click', () => {
    let name = document.getElementById('search-name').value;
    let groupId = JSON.parse(localStorage.getItem('groupId'));
    axios.post(url + '/admin/searchUser', { name: name }, { headers: { 'Authorization': token } })
      .then(data => {

        let notInGroup = document.getElementById('not-in-group');
        data.data.data.forEach(data => {
          let li = document.createElement('li');
          if (data.groupId !== groupId) {
            li.innerHTML = `${data.userName}
            <button onclick="addMe(${data.userId},${groupId})">add</button>`;
          } else {
            li.innerHTML = `${data.userName} already in a group`;
          }
          notInGroup.appendChild(li);
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
};

// sending media or Img

let media = document.getElementById('inputTag');

media.addEventListener('change', () => {
  let groupId = localStorage.getItem('groupId');
  let inputTag = document.querySelector("input[type=file]").files;
  // console.log(inputTag)
  var formData = new FormData();
  formData.append("file", inputTag[0]);
  axios.post(url + `/messages/sendImg?groupId=${groupId}`, formData, { headers: { 'Authorization': token } })
    .then(ee => console.log(ee))

})