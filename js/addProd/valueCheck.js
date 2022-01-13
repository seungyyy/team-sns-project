const prodField = document.querySelector('.prod-set-field');
const url = 'http://146.56.183.55:5050';

// 상품링크 체크
function linkCheck() {
  const prodLink = prodField.querySelector('#prod-link').value;
  const prodLinkAlert = prodField.querySelector('#link-alert');
  const regLink = /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/g;
  prodLinkAlert.classList.add('alert');
  if (prodLink === '') {
    prodLinkAlert.textContent = '*URL을 입력해주세요.';
  } else if (regLink.test(prodLink) === false) {
    prodLinkAlert.textContent = '*URL 양식이 맞지 않습니다.';
  } else {
    prodLinkAlert.textContent = '';
  }
}

// 가격 숫자인지 체크
function NumPriceCheck() {
  const price = prodField.querySelector('#price');
  const priceAlert = prodField.querySelector('#price-alert');
  const regNum = /^[0-9]*$/;

  if (regNum.test(price.value) === false) {
    price.value = '';
    priceAlert.classList.add('alert');
    priceAlert.textContent = '*숫자만 입력 가능합니다';
  } else {
    priceAlert.textContent = '';
  }
}

// 상품명 길이 체크 
function prodNameCheck() {
  const prodName = prodField.querySelector('#prod-name');
  const prodNameAlert = prodField.querySelector('#prod-alert');
  if (prodName.value.length < 2 || prodName.value.length > 11) {
    prodNameAlert.classList.add('alert');
    prodNameAlert.textContent = '*2~10자 이내여야 합니다.';
  } else {
    prodNameAlert.textContent = '';
  }
}

document.getElementById('prod-name').addEventListener('keyup', prodNameCheck);
document.getElementById('price').addEventListener('keyup', NumPriceCheck);
document.getElementById('prod-link').addEventListener('keyup', linkCheck);
