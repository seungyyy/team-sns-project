async function followers() {
    const res = await fetch(
      "http://146.56.183.55:5050/profile/" + localStorage.getItem("postuploder")+"/follower",
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
    console.log("followers",followers);
    let listFollowers = document.querySelector(".list-followers");
    followers.forEach((following)=>{
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
        //다른 유저 팔로워 중에 나인 경우
        if(following.accountname == localStorage.getItem("accountname") ){
            followBtn = ""
        }
        let addList = document.createElement("li");
        addList.classList.add("item-followers");
        addList.innerHTML = `
            <img
            src="${following.image}"
            alt="팔로워 이미지"
            class="img-followers"
            onerror='this.src="http://146.56.183.55:5050/Ellipse.png"'
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
