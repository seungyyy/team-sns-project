async function profileMe() {
  const res = await fetch(
    "http://146.56.183.55:5050/profile/" + localStorage.getItem("accountname"),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  const json = await res.json();
  const profile = json.profile;
  console.log(profile);
  //localstorage postuploder 정보 삭제
  // localStorage.removeItem("postuploder");
  //localstorage postuploder에 내정보 추가
  localStorage.setItem("postuploder", localStorage.getItem("accountname"));
  let profileMe = document.querySelector(".cont-user");
  let followers = profileMe.querySelector(".user-num-followers");
  let followings = profileMe.querySelector(".user-num-followings");
  let imgMe = profileMe.querySelector(".user-img");
  let titMe = profileMe.querySelector(".user-tit strong");
  let nameMe = profileMe.querySelector(".user-name");
  let descMe = profileMe.querySelector(".user-desc");
  //팔로워 팔로윙 숫자 기입
  followers.innerHTML = profile.followerCount;
  followings.innerHTML = profile.followingCount;
  //불러온 정보를 이미지에 대입
  imgMe.setAttribute("src", profile.image);
  //이미지 주소가 오류일 때 나오는 코드
  imgMe.setAttribute(
    "onerror",
    `this.src="../../images/icon/icon-profile.png"`
  );
  titMe.innerHTML = profile.username;
  nameMe.innerHTML = "@ " + profile.accountname;
  descMe.innerHTML = profile.intro ? profile.intro : "설명이 없습니다.";
}
profileMe();
