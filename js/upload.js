const inpTxT = document.querySelector('.upload-textarea');
const sendBtn = document.querySelector('.btn-MS--off');

function enterkey() {
  if (window.event.keyCode == 13) {
      sendComment();
  }
}
inpTxT.addEventListener('keyup', () => {
  switch (!(inpTxT.value)) {
      case true: 
      sendBtn.style.backgroundColor = '#8ac392';
      sendBtn.disabled = true; 
      break;
      case false:
      sendBtn.style.backgroundColor = '#24732f';
      sendBtn.disabled = false; 
      sendBtn.style.cursor = 'pointer';
      enterkey();
      break;
  };
});

//textarea 자동 높이 조절
const textArea = document.querySelector('.upload-textarea');
textArea.addEventListener('keyup', () => {
  textArea.style.height = "1px";
  textArea.style.height = (10 + textArea.scrollHeight)+"px";
})

async function upload() {
  const res = await fetch('http://146.56.183.55:5050/post', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        "post": {
            "content": textArea.value,
            "image": ""
        }
    }
    )
  });
  const json = await res.json();
  const post = json.post;
  console.log(json);
  console.log(post);
  // location.href('../pages/home.html');
  //
}
sendBtn.addEventListener('click', upload);