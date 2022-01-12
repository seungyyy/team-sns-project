const profileField = document.querySelector('.profile-set-field');
const url = 'http://146.56.183.55:5050';

// 본인 소개 글이 없는지 체크 
function userIntroduceCheck() {
  const userIntroduce = profileField.querySelector('#introduce').value;
  const userIntroduceAlert = profileField.querySelector('#introduce-alert');

  if (userIntroduce === '') {
    userIntroduceAlert.textContent = '*본인 소개와 상품에 대한 소개 글을 작성해주세요.';
  } else {
    userIntroduceAlert.textContent = '';
  }
}

// 계정 ID 중복 확인, 영문 숫자 밑줄 마침표만 사용 가능 체크
async function accountNameCheck() {
  const accountName = profileField.querySelector('#userid').value;
  const accountNameAlert = profileField.querySelector('#userid-alert');
  const regAccountName = /[A-Za-z0-9\_\.]$/;


  if (regAccountName.test(accountName) === true ) {
    const res = await fetch(url + "/user", {
      method: 'GET',
    });
    const json = await res.json();
    for (const key in json) {
      let arr = [];
      if (Object.hasOwnProperty.call(json, key)) {
        const data = json[key];
        const account = data.accountname;
        arr.push(account);
        let accountCheck = arr.find((check) => check === accountName);
        if (accountCheck === accountName) {
          accountNameAlert.textContent = '*이미 사용 중인 ID입니다.';
          break;
        } else {
          accountNameAlert.textContent = '';
        }
      }
    }
  } else {
    accountNameAlert.textContent = '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
  }
}

// 사용자 이름 길이 체크
function userNameCheck() {
  const userName = profileField.querySelector('#user-name');
  const userNameAlert = profileField.querySelector('#username-alert');
  if (userName.value.length < 2 || userName.value.length > 11) {
    userNameAlert.textContent = '*2~10자 이내여야 합니다.';
  } else {
    userNameAlert.textContent = '';
  }
}

document.getElementById('user-name').addEventListener('keyup', userNameCheck);
document.getElementById('userid').addEventListener('keyup', accountNameCheck);
document.getElementById('introduce').addEventListener('keyup', userIntroduceCheck);