const url = 'http://146.56.183.55:5050';
const prodLink = prodField.querySelector('#prod-link');
const price = prodField.querySelector('#price');
const btn = document.getElementById('prod-save-btn');
const prodName = prodField.querySelector('#prod-name');
const prodImg = prodField.querySelector('.prod-set-img');

// 서버로 상품 올리고 로컬스토리지에 저장하기
async function addProd(prodLink, price, prodName, img) {
  const token = localStorage.getItem('token');
  const res = await fetch(url + '/product', {
    method: 'POST',
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "product": {
        "itemName": prodName,
        "price": parseInt(price),
        "link": prodLink,
        "itemImage": img
      },
    }),
  });
  const json = await res.json();
  const product = json.product;
  if (product) {
    for (const key in product) {
      if (Object.hasOwnProperty.call(product, key)) {
        const data = product[key];
        localStorage.setItem(key, data);
        location.href = '../../pages/profile.html';
      }
    }
  } else {
    console.log(error);
  }

}


// 입력값이 없다면 버튼 비활성화 
async function clickDisabled(event) {
  event.preventDefault();
  const img = document.querySelector('.prod-img');
  if (!prodLink.value && !price.value && !prodName.value) {
    btn.disabled = true;
  } else if (img === null) {
    btn.disabled = true;
  } else {
    btn.classList.remove('btn-MS--off');
    btn.disabled = false;
    await addProd(prodLink.value, price.value, prodName.value, img.src);
  }
}


// 이미지 업로드 전 미리보기 기능
async function setThumbnail(e) {
  const imgTag = document.createElement('img');
  imgTag.classList.add('prod-img');
  if (prodImg.firstElementChild === null) {
    imgTag.style.height = '202px';
    imgTag.style.objectFit = 'cover';
    imgTag.style.borderRadius = '10px';
    prodImg.appendChild(imgTag);
  }
  const result = await imgUpload(e.target.files);
  document.querySelector('.prod-img').src = `${url}/${result}`;
}

// 이미지 서버로 업로드 하기
async function imgUpload(file) {
  const formData = new FormData();
  formData.append('image', file[0]);
  const response = await fetch(url + '/image/uploadfile', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  const fileName = data['filename'];
  return fileName;
}

// 입력값이 다 있을 경우 버튼 활성화
function keyupDisabled() {
  const img = document.querySelector('.prod-img');
  const regLink = /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g;
  if (prodName.value.length > 11 || regLink.test(prodLink.value) === false) {
    btn.disabled = true;
    btn.classList.add('btn-MS--off');
  } else if (prodLink.value && price.value && prodName.value && img !== null) {
    btn.disabled = false;
    btn.classList.remove('btn-MS--off');
  }  else {
    btn.disabled = true;
    btn.classList.add('btn-MS--off');
  }
}

document.querySelector('#prodfile').addEventListener('change', setThumbnail);
prodField.addEventListener('keyup', keyupDisabled);
