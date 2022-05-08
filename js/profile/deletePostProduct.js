async function deletePost(id) {
  console.log("zz", id);
  const res = await fetch(`https://mandarin.api.weniv.co.kr/post/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });
  location.reload();
}
async function deleteProduct(id) {
  const res = await fetch(`https://mandarin.api.weniv.co.kr/product/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });
  location.reload();
}
async function declaration(id) {
  const res = await fetch(`https://mandarin.api.weniv.co.kr/post/${id}/report`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  });
  location.reload();
}