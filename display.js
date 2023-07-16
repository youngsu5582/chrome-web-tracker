
function displayStorageData(data) {
  const storageList = document.getElementById('storageList');
  storageList.innerHTML = '';
  let group = {};
  for (const key in data) {
    const tag = getCategory(key);
    const value = data[key];
    group = addGroup(group,tag,value);
  }
  for(const element in group){
    const listItem = document.createElement('li');
    const time = convertSecondsToTime(group[element]);
    listItem.textContent = `${element}: ${time}\n`;
    storageList.appendChild(listItem);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var getURLButton = document.getElementById('getURLButton');

  getURLButton.addEventListener('click', function() {
    chrome.storage.local.get('storage', function(data) {
        displayStorageData(data.storage);
      });
  });

  chrome.storage.local.get('storage', function(data) {
    displayStorageData(data.storage);
  });
});
const category= {
    'www.naver.com':'포럼',
    'velog.io' : '공부',
    'www.notion.so':'공부'
    
}
function getCategory(key){
    if(typeof category[key] ==='undefined')
        return '기타';
    else
        return category[key];
}

function addGroup(group,tag,value){
    
    if(typeof group[tag] === 'undefined')
        group[tag] = value
    else
        group[tag] += value
    console.log(group);
    return group ;
}

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainSecond = seconds % 60;
    if(hours===0)
        return `${minutes}분 ${remainSecond}초`;
    else
        return `${hours}시간 ${minutes}분 ${remainSecond}`;
}