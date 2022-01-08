const joinEmailField = document.querySelector('.join-email-field');
const joinBtn = document.querySelector('#join-btn');
const joinEmail = joinEmailField.querySelector('#join-email');
const joinPw = joinEmailField.querySelector('#join-pw');


// 이메일, 비밀번호 입력 값이 있다면 버튼 활성화 / 입력 값이 없다면 비활성화
function keyupDisabled() {
  if (joinEmail.value && joinPw.value) {
    console.log("ggg");
    document.querySelector('#pw-alert').textContent = '';
    joinBtn.disabled = false;
    joinBtn.classList.remove('btn-L--off');
  } else if (joinEmail.value) { 
    checkEmail();
  }
  else {
    joinBtn.disabled = true;
  }
}

async function checkEmail() { 
  const res = await fetch('http://146.56.183.55:5050/user', {
    method: 'GET',
  });
  const json = await res.json();
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const data = json[key];
      console.log(data);
    }
  }
}


// 버튼 클릭시 서버에 유저가 있다면 로컬스토리지에 저장 후 홈 피드 화면으로 이동
// 유저가 아니라면 경고 텍스트가 나옵니다
async function join() {
  const res = await fetch('http://146.56.183.55:5050/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email: email.value,
        password: pw.value,
      },
    }),
  });
  const json = await res.json();
  const user = json.user;
  if (user) {
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const data = user[key];
        localStorage.setItem(key, data);
        location.href = '../pages/homeFeed/feedhome.html';
      }
    }
  } else {
    document.querySelector('#alert-txt').textContent = '*이메일 또는 비밀번호가 일치하지 않습니다.';
    joinBtn.classList.add('btn-L--off');
    pw.value = '';
  }
}

joinEmail.addEventListener('blur', keyupDisabled);
joinBtn.addEventListener('click', join);
