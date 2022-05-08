async function profileOtherIsFollow() {
  const res = await fetch(
    'https://mandarin.api.weniv.co.kr/profile/' +
      localStorage.getItem('accountname') +
      '/following',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
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
      btnUnFollow.addEventListener("click", ()=>{
        isfollower = false;
        offFollow(localStorage.getItem("postuploder"));
      });
    };
  });
  if (!isfollower) {
    btnFollow.classList.remove("cont--hide");
    btnUnFollow.classList.add("cont--hide");
    btnFollow.addEventListener("click", ()=>{
      isfollower = true;
      onFollow(localStorage.getItem("postuploder"));
    });
  };
}
profileOtherIsFollow();
