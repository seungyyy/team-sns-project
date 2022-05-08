//유저이미지 설정
async function getUserImg() {
  const res = await fetch(
    'https://mandarin.api.weniv.co.kr/profile/' + localStorage.getItem('accountname'),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }
  );
  const json = await res.json();
  const profile = json.profile;
  let userImg = document.querySelector('.upload-userimg').src;
  userImg = profile.image;
  document.querySelector('.upload-userimg').src = userImg;
};
getUserImg();