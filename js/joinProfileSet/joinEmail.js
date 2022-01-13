const joinEmailField = document.querySelector('.join-email-field');
const joinBtn = document.querySelector('#join-btn');
const joinEmail = joinEmailField.querySelector('#join-email');
const joinPw = joinEmailField.querySelector('#join-pw');
const emailAlert = joinEmailField.querySelector('#email-alert');

// 버튼 클릭시 프로필 설정으로 화면 보여주기
function nextProfile() {
  document.querySelector('.main-join-email').style.display = 'none';
  document.querySelector('.main-profile-set').classList.remove('cont--hide');
}

// 이메일, 비밀번호 입력 값이 있다면 버튼 활성화 / 입력 값이 없다면 비활성화
function keyupDisabled() {
    if (joinEmail.value && joinPw.value.length >= 6 && joinPw.value) {
      joinBtn.disabled = false;
      joinBtn.classList.remove('btn-L--off');
    } else {
      joinBtn.disabled = true;
    }
}

// 비밀번호 6자리 미만이라면 경고문구 표시
function checkPw() {
  const pwAlert = joinEmailField.querySelector('#pw-alert');
  if (joinPw.value.length >= 6) {
    pwAlert.textContent = '';
  } else { 
    pwAlert.textContent = '*비밀번호는 6자 이상이어야 합니다.';
  }
}

// 회원가입 이메일이 서버에 이미 이메일이 있는 경우인지 중복 체크
async function checkEmail() { 
  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (regEmail.test(joinEmail.value) === true) {
    const res = await fetch('http://146.56.183.55:5050/user', {
      method: 'GET',
    });
    const json = await res.json();
    for (const key in json) {
      let arr = [];
      if (Object.hasOwnProperty.call(json, key)) {
        const data = json[key];
        const email = data.email;
        arr.push(email);
        let emailCheck = arr.find((check) => check === joinEmail.value);
        if (emailCheck === joinEmail.value) {
          document.querySelector('#email-alert').textContent = '*이미 가입된 이메일 주소입니다.';
          break;
        } else {
          document.querySelector('#email-alert').textContent = '';
        }
      }
    }
  } else {
    emailAlert.textContent = '*이메일 형식이 올바르지 않습니다.';
  }
}

joinEmail.addEventListener('blur', checkEmail);
joinPw.addEventListener('keyup', checkPw);
joinEmailField.addEventListener('keyup', keyupDisabled);
joinBtn.addEventListener('click', nextProfile);

