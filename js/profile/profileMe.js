async function profileMe() {
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
  localStorage.setItem("postuploder", localStorage.getItem("accountname"));
  let profileMe = document.querySelector(".cont-user");
  let followers = profileMe.querySelector(".user-num-followers");
  let followings = profileMe.querySelector(".user-num-followings");
  let imgMe = profileMe.querySelector(".user-img");
  let titMe = profileMe.querySelector(".user-tit");
  let nameMe = profileMe.querySelector(".user-name");
  let descMe = profileMe.querySelector(".user-desc");
  //팔로워 팔로윙 숫자 기입
  followers.innerHTML = profile.followerCount;
  followings.innerHTML = profile.followingCount;
  //불러온 정보를 이미지에 대입
  const basicImg = 'https://mandarin.api.weniv.co.kr/Ellipse.png';
  let imgURL =
    profile.image.match(/https:\/\/mandarin\.api\.weniv.co\.kr\/[0-9]/) === null
      ? basicImg
      : profile.image;
  imgMe.setAttribute('src', `${imgURL}`);
  //이미지 주소가 오류일 때 나오는 코드
  imgMe.setAttribute(
    "onerror",
    `this.src="${basicImg}"`
  );
  titMe.innerHTML = profile.username;
  nameMe.innerHTML = "@ " + profile.accountname;
  descMe.innerHTML = profile.intro ? profile.intro : "설명이 없습니다.";
}
profileMe();
