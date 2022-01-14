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
    console.log("followings", followings);
    let listFollowers = document.querySelector(".list-followers");
    followings.forEach((following)=>{
        //팔로윙한 유저의 intro가 없을 시
        let intro = following.intro ? following.intro : "소개글이 없습니다.";
        //다른 유저의 팔로윙목록을 내 기준으로 버튼 활성화
        let isFollow = false;
        following.follower.forEach((userFollowData)=>{
            if(userFollowData==localStorage.getItem("_id")){
                isFollow = true;
            }
        })
        let followBtn = isFollow ? 
        '<button type="button" class="btn-followers btn-followers--off">취소</button>' :
        '<button type="button" class="btn-followers btn-followers--on">팔로우</button>' ;
        //다른 유저 팔로워 중에 나인 경우
        if(following.accountname == localStorage.getItem("accountname") ){
            followBtn = '<button type="button" class="btn-followers btn-followers--off cont--hide">취소</button>';
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
  followings();
  