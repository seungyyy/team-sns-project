//게시글 모달
async function postImgmore() {
  let repModalCont = document.querySelector('.modal-report-container')
  let repModal = document.querySelector('#modal-report')
  let delModalCont = document.querySelector('.modal-delete-container')
  let delModal = document.querySelector('#modal-delete')
  const res = await fetch(
    `https://mandarin.api.weniv.co.kr/post/${localStorage.getItem('postId')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }
  );
  const json = await res.json();
  const posts = json.post;
  
  function postIdcheck() {
    if(localStorage.getItem('_id') === posts.author._id) {
      delModalCont.style.display = 'block';
      delModal.classList.remove('modal-delete');
      delModal.style.display = 'block';
      if(delModalCont.style.display === 'block') {
        delModalCont.addEventListener('click', ()=> {
          delModalCont.style.display = 'none';
          delModal.classList.add('modal-delete');
          delModal.style.display = 'none';
        })
      }
    } else {
      repModalCont.style.display = 'block';
      repModal.classList.remove('modal-report');
      repModal.style.display = 'block';
      if(repModalCont.style.display === 'block') {
        repModalCont.addEventListener('click', ()=> {
          repModalCont.style.display = 'none';
          repModal.classList.add('modal-delete');
          repModal.style.display = 'none';
        })
      }
    }
  }
  
  window.addEventListener('click', e => {
    e.target.className === 'img-more' ? 
    postIdcheck() :
    false;
  })
}
postImgmore();

//댓글 모달
async function commentModal() {
  const repModalCont = document.querySelector('.modal-report-container')
  const repModal = document.querySelector('#modal-report')
  const delModalCont = document.querySelector('.modal-delete-container')
  const delModal = document.querySelector('#modal-delete')
  const commentImgmore = document.querySelectorAll('.comment-imgmore')
  const parent = document.querySelector('.post-comment')

  const res = await fetch(
    `https://mandarin.api.weniv.co.kr/post/${localStorage.getItem('postId')}/comments`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }
  );

  const json = await res.json();
  const comments = json.comments;
  
for(let i = 0; i<comments.length; i++){
  if(comments[i].author._id === localStorage.getItem('_id')){
    parent.children[comments.length-1 - i].children[0].children[1].children[0].classList.add('comment-del')
  } else {
    parent.children[comments.length-1 - i].children[0].children[1].children[0].classList.add('comment-rep')
  }
}

parent.addEventListener('click', (e) => {
  if(e.target.className.includes('comment-imgmore')){
    if(e.target.className.includes('comment-del')){
      delModalCont.style.display = 'block';
      delModal.classList.remove('modal-delete');
      delModal.style.display = 'block';
      if(delModalCont.style.display === 'block') {
        delModalCont.addEventListener('click', ()=> {
          delModalCont.style.display = 'none';
          delModal.classList.add('modal-delete');
          delModal.style.display = 'none';
      })
    }
  } else {
    repModalCont.style.display = 'block';
    repModal.classList.remove('modal-report');
    repModal.style.display = 'block';
    if(repModalCont.style.display === 'block') {
      repModalCont.addEventListener('click', ()=> {
        repModalCont.style.display = 'none';
        repModal.classList.add('modal-delete');
        repModal.style.display = 'none';
      })
    }
}
}})
}
commentModal()
