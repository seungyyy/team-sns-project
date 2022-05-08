//하트클릭
async function heartPlus(id) {
  const res = await fetch('https://mandarin.api.weniv.co.kr/post/' + id + '/heart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });
  getPost();
};
//하트 취소
async function heartCancel(id) {
  const res = await fetch('https://mandarin.api.weniv.co.kr/post/' + id + '/unheart', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });    
  
  getPost();
}
