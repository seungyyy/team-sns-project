function imgProcess(post){
    let contImgSlide = document.createElement("div");
    contImgSlide.classList.add("cont-imgSlide");
    contImgSlide.innerHTML=`
    <div class="imgSlide dot-one">
    </div>
    <div class="imgOne"></div>
    <div class="dot-list">
    </div>
    `
    let imgSlide = contImgSlide.querySelector(".imgSlide");
    let imgOne = contImgSlide.querySelector(".imgOne");
    let dotList = contImgSlide.querySelector(".dot-list");
    //함수를 호출한 곳으로 반환할 항목 imgPost
    let imgPost; 
    //이미지가 없거나 공백으로 들어오는 경우
    if(post =="" || post==undefined){
      imgPost="";
    }else{
    //이미지가 한개 이상 들어오는 경우, 여러개 들어오는 경우
        let postArr = post.split(",");
        postArr.forEach((img, index) => {
            //normalImg는 정상으로 들어온 이미지와 아닌 이미지를 구분하고 정상 경로고 바꿔준다.
            let normalImg = img.indexOf("http://146.56.183.55:5050/")>-1 ?
            img :  
            "http://146.56.183.55:5050/" + img;
            if(postArr.length>1){
                imgSlide.innerHTML += `<img src=${normalImg} alt="게시글 이미지" />`;
                postArr.length == 2 ? imgSlide.classList.add("twoImg") : "";
            }
            else{
                imgOne.innerHTML += `<img src=${normalImg} alt="게시글 이미지" />`
            }
            if(postArr.length>1){
                // if(index == 0){dotList.innerHTML += `<span class="point"></span>`}
                // else{
                    dotList.innerHTML += `<span class="dot-${index+1}"></span>`
                // }
                dotList.querySelector(".dot-1").classList.add("point");
            };
      })
      imgPost = contImgSlide;
    }
    return imgPost;
}

function dotClick(dots, imgSlide){
        dots.forEach((dot, index) => {
            dot.addEventListener("click", (e)=>{
                for (const select of e.path[1].children) {
                    select.classList.remove("point")
                }
                if(e.target.classList.contains("dot-1")){
                    imgSlide.classList.remove("dot-two","dot-three");
                    e.path[2].children[0].classList.add("dot-one");
                    dot.classList.add("point");
                }else if(e.target.classList.contains( "dot-2")){
                    imgSlide.classList.remove("dot-one","dot-three");
                    e.path[2].children[0].classList.add("dot-two");
                    dot.classList.add("point")
                }else if(e.target.classList.contains( "dot-3")){
                    imgSlide.classList.remove("dot-one","dot-two");
                    e.path[2].children[0].classList.add("dot-three");
                    dot.classList.add("point");
                }
            })
        });
}