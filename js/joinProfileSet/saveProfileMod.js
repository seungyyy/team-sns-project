let imgUrl = document.querySelector('.profile-img');


// 회원가입 정보들 서버로 전송하기
async function saveProfile(event) {
  event.preventDefault();
  const userName = document.querySelector('#user-name');
  const accountId = document.querySelector('#user-id');
  const introduce = document.querySelector('#introduce');
  const token = localStorage.getItem('token');

  if (imgUrl.src === 'https://mandarin.api.weniv.co.kr/Ellipse.png') {
    imgUrl.src = 'https://mandarin.api.weniv.co.kr/Ellipse.png';
  }

  try {
    const response = await fetch(url + '/user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user": {
          "username": userName.value,
          "accountname": accountId.value,
          "intro": introduce.value,
          "image": imgUrl.src,
        },
      }),
    });
    const json = await response.json();
    const user = json.user;
    if (response.status == 200) {
      for (const key in user) {
        if (Object.hasOwnProperty.call(user, key)) {
          const data = user[key];
          console.log(data);
          localStorage.setItem(key, data);
          location.href = '../../pages/profile.html';
        }
      }
    }
  } catch (error) {
    location.href = '../../pages/errPage.html';
    console.log(error);
  }
}

// 이미지 업로드 전 미리보기 기능
async function setThumbnail(e) {
  const result = await imgUpload(e.target.files);
  imgUrl.src = `${url}/${result}`;
  if (imgUrl.src !== localStorage.getItem('image')) { 
    saveBtn.disabled = false;
    saveBtn.classList.remove('btn-MS--off');
  };
}

// 이미지 서버로 업로드 하기
async function imgUpload(file) {
  const formData = new FormData();
  formData.append('image', file[0]);
  const response = await fetch(url + '/image/uploadfile', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  const fileName = data['filename'];
  return fileName;
}

// 입력값이 다 있을 경우 버튼 활성화
function keyupDisabled() {
  const introduce = profileField.querySelector('#introduce').value;
  const accountId = profileField.querySelector('#user-id').value;
  const userName = profileField.querySelector('#user-name').value;
  if (
    1 === accountId.length ||
    accountId.length > 11 ||
    1 === userName.length ||
    userName.length > 11
  ) {
    saveBtn.disabled = true;
    saveBtn.classList.add('btn-MS--off');
  } else if (introduce && accountId && userName) {
    saveBtn.disabled = false;
    saveBtn.classList.remove('btn-MS--off');
  } else {
    saveBtn.disabled = true;
    saveBtn.classList.add('btn-MS--off');
  }
}

document.querySelector('#avatar').addEventListener('change', setThumbnail);
profileField.addEventListener('keyup', keyupDisabled);
