const searchInp = document.getElementById("search-inp");
const url = 'http://146.56.183.55:5050';

// 가져온 정보 화면에 보여주기
async function showFindUser(json) {
  const main = document.querySelector('.main-search');
  const ul = document.createElement('ul');
  ul.classList.add('user-ul');
  main.appendChild(ul);
  if (main.childElementCount >= 3) {
    main.lastElementChild.remove();
  }
  
  const basicImg = `${url}/Ellipse.png`;
  const userInfo = [];
  json.forEach((data) => {
    let imgURL = data.image.match(/http:\/\/146.56.183.55:5050\/[0-9]/) === null ? basicImg : data.image;
    let txt = data.username.replace(searchInp.value, `<span>${searchInp.value}</span>`);
    userInfo.push(`
      <li class="user-search">
        <div data-name="${data.accountname}" class="link">
        <img src="${imgURL}" alt="${data.username}님의 이미지" onerror="this.src='${basicImg}';" class="user-search-img">
        <div class="user-search-txt">
          <p class="search-tit">${txt}</p >
          <span class="user-searchId">@ ${data.accountname}</span>
        </div>
        </div>
      </li>
    `);
  });

  document.querySelector('.user-ul').innerHTML = userInfo.join('');
  
  // 유저 클릭하면 해당 유저 페이지로 이동
  const links = document.querySelectorAll('.link');
  [].forEach.call(links, function (links) {
    links.addEventListener('click', clickUser, false);
  });
  function clickUser(e) {
    if (e.target.dataset.name) { 
      localStorage.setItem("postuploder", e.target.dataset.name);
      location.href = "../../pages/otherProfile.html";
    };
  }
}

// 서버에서 유저 정보 가져오기
async function searchUser() { 
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${url}/user/searchuser/?keyword=${searchInp.value}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    const findUser = await showFindUser(json);
    return findUser;
  } catch (error) { 
    console.log(error);
  //  location.href = '../../pages/errPage.html';
  }
}

//  검색창에 입력값이 없다면 화면에 아무것도 검색되지 않고 있다면 화면에서 보여주기
async function valueKeyup() { 
  if (searchInp.value) {
    await searchUser();
  } else { 
    document.querySelector('.user-ul').remove();
  }
}

searchInp.addEventListener('keyup', valueKeyup);