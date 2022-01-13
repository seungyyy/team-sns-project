async function followers() {
    const res = await fetch(
      "http://146.56.183.55:5050/profile/" + localStorage.getItem("accountname")+"/follower",
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
    console.log(followers);
    let listFollowers = document.querySelector(".list-followers");
    followers.forEach((following)=>{
        let addList = document.createElement("li");
        addList.classList.add("item-followers");
        //팔로워한 유저의 intro가 없을 시
        let intro = following.intro ? following.intro : "소개글이 없습니다.";
        //나를 팔로워한 유저를 내가 팔로우하고 있는지 확인
        let isFollow = false;
        following.follower.forEach((userFollowData)=>{
            if(userFollowData==localStorage.getItem("_id")){
                isFollow = true;
            }
        })
        let followBtn = isFollow ? 
        '<button type="button" class="btn-followers btn-followers--off">취소</button>' :
        '<button type="button" class="btn-followers btn-followers--on">팔로우</button>'
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
            ${followBtn}
        `;
        listFollowers.prepend(addList);
        let btnFollow =  document.querySelector(".btn-followers");
        btnFollow.addEventListener("click",()=>{
            if(btnFollow.classList.contains("btn-followers--on")){
                onFollow(following.accountname);
            }else{
                offFollow(following.accountname);
            }
       
        })
    });
}
  followers();
