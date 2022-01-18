const profileField = document.querySelector('.profile-set-field');
const url = 'http://146.56.183.55:5050';

// 소개 글이 없는지 체크 
function userIntroduceCheck() {
  const userIntroduce = profileField.querySelector('#user-introduce');
  const userIntroduceAlert = profileField.querySelector('#introduce-alert');

  if (userIntroduce.value === '') {
    userIntroduceAlert.textContent = '*본인 소개와 상품에 대한 소개 글을 작성해주세요.';
    userIntroduce.classList.add('alert-inp');
  } else {
    userIntroduceAlert.textContent = '';
    userIntroduce.classList.remove('alert-inp');
  }
}

// 계정 ID 중복 확인, 영문 숫자 밑줄 마침표만 사용 가능 체크
async function accountNameCheck() {
  const accountName = profileField.querySelector('#user-id');
  const accountNameAlert = profileField.querySelector('#userid-alert');
  const regAccountName = /[A-Za-z0-9\_\.]$/;


  if (regAccountName.test(accountName.value) === true ) {
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
        let accountCheck = arr.find((check) => check === accountName.value);
        if (accountCheck === accountName.value) {
          accountNameAlert.textContent = '*이미 사용 중인 ID입니다.';
          accountName.classList.add('alert-inp');
          break;
        } else {
          accountNameAlert.textContent = '';
          accountName.classList.remove('alert-inp');
        }
      }
    }
  } else {
    accountNameAlert.textContent = '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.';
    accountName.classList.add('alert-inp');
  }
}

// 사용자 이름 길이 체크
function userNameCheck() {
  const userName = profileField.querySelector('#user-name');
  const userNameAlert = profileField.querySelector('#username-alert');
  if (userName.value.length < 2 || userName.value.length > 11) {
    userNameAlert.textContent = '*2~10자 이내여야 합니다.';
    userName.classList.add("alert-inp");
  } else {
    userNameAlert.textContent = '';
    userName.classList.remove("alert-inp");
  }
}

document.getElementById('user-name').addEventListener('keyup', userNameCheck);
document.getElementById('user-id').addEventListener('keyup', accountNameCheck);
document.getElementById('user-introduce').addEventListener('keyup', userIntroduceCheck);