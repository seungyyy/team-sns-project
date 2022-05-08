async function followers() {
    const res = await fetch(
      'https://mandarin.api.weniv.co.kr/profile/' +
        localStorage.getItem('postuploder') +
        '/follower',
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
        <a href="../../pages/otherProfile.html" class="link-follow">
            <img
            src="${following.image}"
            alt="팔로워 이미지"
            class="img-followers"
            onerror='this.src="https://mandarin.api.weniv.co.kr/Ellipse.png"'
            />
            <p class="tit-followers">
                <strong>${following.username}</strong>
            </p>
            <p class="desc-followers">${intro}</p>
        </a>
        ${followBtn}
        `;
        listFollowers.prepend(addList);
        
        //팔로우
        let btnFollow =  document.querySelector(".btn-followers");
        btnFollow.addEventListener("click",()=>{
            if(btnFollow.classList.contains("btn-followers--on")){
                onFollow(following.accountname);
            }else{
                offFollow(following.accountname);
            }
        })
        //링크 클릭시 해당 링크의 profile로 이동, accountname정보를 가지고감
        let linkProfile =  document.querySelector(".link-follow");
        linkProfile.addEventListener("click",()=>{
            localStorage.setItem("postuploder", following.accountname);
        })
        
    });
}
  followers();
