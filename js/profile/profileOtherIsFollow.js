async function profileOtherIsFollow() {
  const res = await fetch(
    //타유저의 프로필일 시 해당 account name이 들어감
    "http://146.56.183.55:5050/profile/" +
      localStorage.getItem("accountname") +
      "/following",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  const json = await res.json();
  const followers = json;
  let btnFollow = document.querySelector(".user-btn-follow");
  let btnUnFollow = document.querySelector(".user-btn-unfollow");
  let isfollower = false;
  followers.forEach((follower) => {
    if (localStorage.getItem("postuploder") == follower.accountname) {
      isfollower = true;
      btnFollow.classList.add("cont--hide");
      btnUnFollow.classList.remove("cont--hide");
    }
  });
  if (!isfollower) {
    btnFollow.classList.remove("cont--hide");
    btnUnFollow.classList.add("cont--hide");
  }
}
profileOtherIsFollow();
