const bodyMessageElement = document.getElementById("message");
const timeSendElement = document.getElementById("second");
const btn = document.getElementById("btnSend");
const form = document.getElementById("myForm");
const maxLengthMessage = 55;


form.addEventListener('submit', function (event) {
  event.preventDefault();
  showLateMessage();
  
  bodyMessageElement.value = '';
  timeSendElement.value = '';
  btn.disabled=true;
 
})

btn.disabled=true;
function showLateMessage() {
  const message = bodyMessageElement.value;
  const delay = Number(timeSendElement.value) * 1000;
  const table = document.getElementById("table");
  const finishTime = Date.now() + delay;

  if (!message || isNaN(delay) || delay < 0) {
    console.error("Некорректные значения для сообщения или времени.");
    return;
  }

  let row = table.insertRow();
  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();

  cell1.textContent = message.length > maxLengthMessage ? message.substring(0, maxLengthMessage) + "..." : message;
  cell3.textContent = "Pending";


  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
  
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
  
    let timeRem = "";
  
    if (days > 0) {
      timeRem += `${String(days)}d `;
    }
  
    timeRem += `${String(hours)}h ${String(minutes)}m ${String(seconds)}s`;
  
    return timeRem;
  }



  function updateTime() {
    const remainingTime = finishTime - Date.now();
    if (remainingTime <= 0) {
      cell2.textContent = "-";
      cell3.textContent = 'Sended';

      return;
    }
    else {
      cell2.textContent = formatTime(remainingTime) + " left";
      setTimeout(updateTime, 0);
    }
  }

  updateTime();

 


};




bodyMessageElement.addEventListener('input',function(){
  if (bodyMessageElement.value!=='') {
    btn.disabled=false;
  } else{
    btn.disabled=true;
  }
});




timeSendElement.addEventListener('input',function(){
if (timeSendElement.value!=='') {
  btn.disabled=false;
} else{
  btn.disabled=true;
}
});