import { extractHostname } from './utils/extract-host-name.js';

// 최초 설치 시 초기화
chrome.storage.local.get('storage', function(data) {
  if (!data.storage) {
    chrome.storage.local.set({ storage: {} });
  }
});


async function trackCurrentWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const currentTab = tabs[0];
    const host = extractHostname(currentTab.url);

    if (await checkHostUsage(host)) {
      await incrementHostUsage(host);
    } else {
      await initHostUsage(host);
    }
  });
}

document.addEventListener('DOMContentLoaded', trackCurrentWindow);
// 1초마다 현재 창 정보를 확인하여 사용 시간을 증가시키도록 설정
setInterval(trackCurrentWindow, 1000);

async function checkHostUsage(url) {
  const data = await chrome.storage.local.get('storage');
  return data.storage.hasOwnProperty(url);
}

async function initHostUsage(url) {
  const data = await chrome.storage.local.get('storage');
  data.storage[url] = 0;
  await chrome.storage.local.set({ storage: data.storage });
}

async function incrementHostUsage(url) {
  const data = await chrome.storage.local.get('storage');
  data.storage[url]++;
  await chrome.storage.local.set({ storage: data.storage });
}

async function getHostUsage(url) {
  const data = await chrome.storage.local.get('storage');
  return data.storage[url];
}
