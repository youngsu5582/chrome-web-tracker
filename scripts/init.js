chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
      // 최초 설치 시 실행되는 코드
      setupApp();
    }
  });
  
  function setupApp() {
    // 앱 세팅 및 초기화 작업 수행
    console.log('앱 세팅을 수행합니다.');
    chrome.storage.local.set({ storage: {} });
    // ...
  }