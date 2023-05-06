

let chats = document.getElementById('chats');
let groupNameHeadline = document.getElementById('group-name-headline');
let groups = document.getElementById('group-list');
groups.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') {
    groupNameHeadline.innerHTML = e.target.innerHTML;
    let group = e.target.id;
    getGroupChat(group);
  }
})

let getGroupChat = (group) => {
  chats.innerHTML = '';
  let li = document.createElement('li');
  li.innerHTML = 'fdjkfjfldfj';
  chats.appendChild(li)
  //api call to get chats of the group
  console.log(group);
}