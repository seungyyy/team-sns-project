async function offFollow(accountname) {
    const res = await fetch(
      'https://mandarin.api.weniv.co.kr/profile/' + accountname + '/unfollow',
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
      }
    );
    location.reload()
}

  