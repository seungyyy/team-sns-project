// 이메일, 비밀번호 입력 값이 있다면 버튼 활성화 / 입력 값이 없다면 비활성화
function keyupDisabled() {
  const emailField = document.querySelector('.email-field');
  const email = emailField.querySelector('#email');
  const pw = emailField.querySelector('#pw');
  const btn = document.getElementById('login-btn');
    
  if (email.value && pw.value) {
    btn.classList.remove("btn-L--off");
    btn.disabled = false;
  } else if (!email.value && !pw.value) { 
    emailField.querySelector("pwAlert").textContent = '';
    btn.disabled = true;
  } else {
    btn.disabled = true;
  }
}

// 버튼 클릭시 서버에 유저가 있다면 로컬스토리지에 저장 후 홈 피드 화면으로 이동
// 유저가 아니라면 경고 텍스트가 나옵니다
async function login() {
  const emailField = document.querySelector('.email-field');
  const email = emailField.querySelector('#email');
  const pw = emailField.querySelector('#pw');
  const btn = document.getElementById('login-btn');

  const res = await fetch("http://146.56.183.55:5050/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email.value,
        password: pw.value,
      },
    }),
  });
  const json = await res.json();
  const user = json.user;
  console.log(user);
  if (user) {
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const data = user[key];
        console.log(data);
        localStorage.setItem(key, data);
        location.href = "../pages/home.html";
      }
    }
  } else {
    document.getElementById("pwAlert").textContent =
      "이메일이 또는 비밀번호가 일치하지 않습니다.";
    btn.classList.add("btn-L--off");
    pw.value = "";
  }
}

document.querySelector('.email-field').addEventListener('keyup', keyupDisabled);
document.getElementById('login-btn').addEventListener('click', login);
