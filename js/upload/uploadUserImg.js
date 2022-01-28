//유저이미지 설정
async function getUserImg() {
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
  let userImg = document.querySelector('.upload-userimg').src;
  userImg = profile.image;
  document.querySelector('.upload-userimg').src = userImg;
};
getUserImg();