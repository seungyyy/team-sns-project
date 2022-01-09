
// 이미지 업로드 전 미리보기 기능
function setThumbnail(e) {
  let reader = new FileReader();
  reader.onload = function (e) { 
    const img = document.querySelector('.profile-img');
    img.setAttribute('src', e.target.result);
  }
  reader.readAsDataURL(e.target.files[0]);
}

// 회원가입에서 가져온 이메일 비밀번호 변수에 저장 후 로컬스토리지에서 삭제
function localData() { 
  const email =localStorage.getItem('email');
  const pw = localStorage.getItem('password');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  console.log(email, pw);
}


localData();