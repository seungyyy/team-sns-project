const profileField = document.querySelector('.profile-set-field');
const user = {};
const url = "http://146.56.183.55:5050";

// 회원가입 정보들 서버로 전송하기 
async function join() {
  imgUpload();
  user.email = document.querySelector('#join-email').value;
  user.pw = document.querySelector('#join-pw').value;
  try {
    const response = await fetch(url + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.pw,
          username: user.userName,
          accountname: user.accountId,
          intro: user.introduce,
          image: user.fileName,
        },
      }),
    });
    const json = await response.json();
    location.href = '../../pages/search.html';
  } catch (error) {
    location.href = '../../pages/errPage.html';
  }
}

// 이미지 서버로 업로드 하기 
async function imgUpload() {
  const inp = document.querySelector('#avatar');
  const file = inp.files[0]
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(url + "/image/uploadfiles", {
      method: "POST",
      body: formData
    });
  
    const data = await response.json();
    user.fileName = data[0]['filename'];
    
  } catch (error) { 
    console.log(error);
  }
}

// 입력값이 다 있을 경우 버튼 활성화
function keyupDisabled() {
  const setBtn = profileField.querySelector('#set-btn');
  user.introduce = profileField.querySelector('#introduce').value;
  user.accountId = profileField.querySelector('#userid').value;
  user.userName = profileField.querySelector('#user-name').value;
  
  if (user.introduce && user.accountId && user.userName) {
    setBtn.disabled = false;
    setBtn.classList.remove('btn-L--off');
  } else {
    setBtn.disabled = true;
    setBtn.classList.add('btn-L--off');
  } 
}

// 
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

// 이미지 업로드 전 미리보기 기능
function setThumbnail(e) {
  let reader = new FileReader();
  reader.onload = function (e) {
    const img = document.querySelector('.profile-img');
    img.setAttribute('src', e.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
}

document.getElementById('user-name').addEventListener('keyup', userNameCheck);
document.getElementById('userid').addEventListener('keyup', accountNameCheck);
document.getElementById('introduce').addEventListener('keyup', userIntroduceCheck);
profileField.addEventListener('keyup', keyupDisabled);
document.getElementById('set-btn').addEventListener('click', join);