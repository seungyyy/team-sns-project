async function profileOther() {
  const res = await fetch(
    'https://mandarin.api.weniv.co.kr/profile/' + localStorage.getItem('postuploder'),
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
  let profileOther = document.querySelector(".cont-user");
  let followers = profileOther.querySelector(".user-num-followers");
  let followings = profileOther.querySelector(".user-num-followings");
  let imgUser = profileOther.querySelector(".user-img");
  let tit = profileOther.querySelector(".user-tit");
  let name = profileOther.querySelector(".user-name");
  let desc = profileOther.querySelector(".user-desc");
  followers.innerHTML = profile.followerCount;
  followings.innerHTML = profile.followingCount;
  // imgUser.setAttribute("src", profile.image);
  const basicImg = 'https://mandarin.api.weniv.co.kr/Ellipse.png';
  let imgURL =
    profile.image.match(/https:\/\/mandarin\.api\.weniv\.co\.kr\/[0-9]/) === null
      ? basicImg
      : profile.image;
  imgUser.setAttribute("src", imgURL);
  //이미지 주소가 오류일 때 나오는 코드
  imgUser.setAttribute(
    "onerror",
    `this.src="${basicImg}"`
  );
  tit.innerHTML = profile.username;
  name.innerHTML = "@ " + profile.accountname;
  desc.innerHTML = profile.intro ? profile.intro : "설명이 없습니다.";
}
profileOther();
