async function followings() {
    const res = await fetch(
      "http://146.56.183.55:5050/profile/" + localStorage.getItem("postuploder")+"/following",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      }
    );
    const json = await res.json();
    const followings = json;
    console.log(followings);
    let listFollowers = document.querySelector(".list-followers");
    followings.forEach((following)=>{
        let addList = document.createElement("li");
        addList.classList.add("item-followers");
        //팔로윙한 유저의 intro가 없을 시
        let intro = following.intro ? following.intro : "소개글이 없습니다.";
        addList.innerHTML = `
            <img
            src="${following.image}"
            alt="팔로워 이미지"
            class="img-followers"
            onerror="../../images/icon/icon-profile.png"
            />
            <p class="tit-followers">
                <strong>${following.username}</strong>
            </p>
            <p class="desc-followers">${intro}</p>
            <button type="button" class="btn-followers btn-followers--off">취소</button>
        `;
        listFollowers.prepend(addList);
        document.querySelector(".btn-followers").addEventListener("click",()=>{
            offFollow(following.accountname);
        })
    });
}
  followings();
  