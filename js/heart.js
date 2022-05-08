async function heartPlus(id) {
  const res = await fetch('https://mandarin.api.weniv.co.kr/post/' + id + '/heart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });

  location.reload();
};

async function heartCancel(id) {
  const res = await fetch('https://mandarin.api.weniv.co.kr/post/' + id + '/unheart', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });    
  location.reload();
}