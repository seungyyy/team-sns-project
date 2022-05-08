const url = 'https://mandarin.api.weniv.co.kr';

// 유저 프로필 화면에 보여주기
function showUerInfo(img, username, account, intro) {
  document.getElementById('user-name').value = username;
  document.getElementById('user-id').value = account;
  document.getElementById('introduce').value = intro;
  document.querySelector('.profile-img').src = img;
};

// 서버에 있는 유저 정보 가져오기 
async function getUserInfo() {
  const token = localStorage.getItem("token");
  const accountName = localStorage.getItem("accountname");

  const res = await fetch(`${url}/profile/${accountName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  console.log(json);
  const userimg = json.profile.image;
  const userName = json.profile.username;
  const userAccount = json.profile.accountname;
  const userIntro = json.profile.intro;

  showUerInfo(userimg, userName, userAccount, userIntro);
}

getUserInfo();