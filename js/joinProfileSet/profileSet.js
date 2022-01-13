let imgUrl = document.querySelector('.profile-img');

// 회원가입시 토큰 없어서 유저 이메일,비밀번호로 로그인해서 토큰 발급받기
async function login(email, pw) { 
  const res = await fetch(url +"/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: pw,
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
        location.href = '../../pages/search.html';
      }
    }
  } else { 
    console.log(error);
  }
}

// 회원가입 정보들 서버로 전송하기 
async function join() {
  const email = document.querySelector("#join-email").value;
  const pw = document.querySelector("#join-pw").value;
  const userName = document.querySelector('#user-name').value;
  const accountId = document.querySelector('#userid').value;
  const introduce = document.querySelector('#introduce').value;

  if (imgUrl.src === 'http://127.0.0.1:5500/images/icon/icon-profile.png') {
    imgUrl.src = 'http://146.56.183.55:5050/Ellipse.png';
  } 

  try {
      const response = await fetch(url + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user": {
            "email": email,
            "password": pw,
            "username": userName,
            "accountname": accountId,
            "intro": introduce,
            "image": imgUrl.src
          },
        }),
      });
      const json = await response.json();
      if (response.status == 200) {
        const userLogin = await login(email, pw);
        console.log(userLogin);
      } else {
        console.log(json);
      }
    } catch (error) {
      location.href = '../../pages/errPage.html';
    }
}

// 이미지 업로드 전 미리보기 기능
async function setThumbnail(e) {
  const file = e.target.files;
  const result = await imgUpload(file);
  
  imgUrl.src = `${url}/${result}`;
  
}


// 이미지 서버로 업로드 하기 
async function imgUpload(file) {
  const formData = new FormData();
  formData.append("image", file[0]);
  const response = await fetch(url + "/image/uploadfile", {
    method: "POST",
    body: formData
  });
  
  const data = await response.json();
  const fileName = data["filename"];
  return fileName;
} 


// 입력값이 다 있을 경우 버튼 활성화
function keyupDisabled() {
  const setBtn = profileField.querySelector('#set-btn');
  const introduce = profileField.querySelector('#introduce').value;
  const accountId = profileField.querySelector('#userid').value;
  const userName = profileField.querySelector('#user-name').value;
  
  if (introduce && accountId && userName) {
    setBtn.disabled = false;
    setBtn.classList.remove('btn-L--off');
  } else {
    setBtn.disabled = true;
    setBtn.classList.add('btn-L--off');
  } 
}

document.querySelector('#avatar').addEventListener("change", setThumbnail);
profileField.addEventListener('keyup', keyupDisabled);
document.getElementById('set-btn').addEventListener('click', join);