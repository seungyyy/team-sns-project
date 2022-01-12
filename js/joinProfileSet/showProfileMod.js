const url = 'http://146.56.183.55:5050';

function showUerInfo(img, username, account, intro) {
  document.getElementById('user-name').value = username;
  document.getElementById('user-id').value = account;
  document.getElementById('introduce').value = intro;
  document.querySelector('.profile-img').src = img;
};

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