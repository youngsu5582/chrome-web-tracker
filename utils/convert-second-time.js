export function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const seconds = seconds % 60;
    if(hours===0)
        return `${minutes}분 ${seconds}초`;
    else
        return `${hours}시간 ${minutes}분 ${seconds}`;
  }