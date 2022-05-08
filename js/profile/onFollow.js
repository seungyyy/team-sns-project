async function onFollow(accountname) {
    const res = await fetch('https://mandarin.api.weniv.co.kr/profile/' + accountname + '/follow', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    });
    location.reload()
}