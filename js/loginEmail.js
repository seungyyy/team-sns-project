async function login() {
  const email = document.querySelector("#email");
  const pw = document.querySelector("#pw");
  const res = await fetch('http://146.56.183.55:5050/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email: email.value,
        password: pw.value,
      },
    }),
  })
  const json = await res.json();
  const user = json.user;
  if (user) {
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        const data = user[key];
        localStorage.setItem(key, data);
        location.href = '../pages/homeFeed/feedhome.html';
      }
    }

  } else { 
    if (email.value === '' && pw.value === '') {
      document.getElementById('pwAlert').textContent = '이메일 또는 비밀번호를 입력해주세요.';
    } else if (email.value && pw.value === '') {
      document.getElementById('pwAlert').textContent = '비밀번호를 입력해주세요.';
    } else if (pw.value && email.value === '') {
      document.getElementById('emailAlert').textContent = '이메일을 입력해주세요.';
    } else {
      document.getElementById('pwAlert').textContent =
        '이메일이 또는 비밀번호가 일치하지 않습니다.';
      pw.value = '';
    }
  }
}
document.querySelector("#login-btn").addEventListener('click', login);
