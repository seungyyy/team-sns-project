async function productConfirmation() {
  const res = await fetch(
    'https://mandarin.api.weniv.co.kr/product/' + localStorage.getItem('postuploder'),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    }
  );
  const json = await res.json();
  const products = json;

  let productCont = document.querySelector(".product");
  let productList = productCont.querySelector(".product-list");
  let productHr = document.querySelector(".product-hr");
  if (!products.data) {
    if (!productCont.classList.contains("cont--hide")) {
      productCont.classList.add("cont--hide");
      productHr.classList.add("cont--hide");
    }
  } else {
    productCont.classList.remove("cont--hide");
    productHr.classList.remove("cont--hide");
    productArr = products["product"]
    productArr.forEach((product)=>{
       //게시물 이미지로 들어온 소스를 구분한다.
       let postImg =
         product.itemImage.indexOf('https://mandarin.api.weniv.co.kr/') > -1
           ? product.itemImage
           : 'https://mandarin.api.weniv.co.kr/' + product.itemImage;
      //금액 자릿수 수정
      let price = [];
      (product.price+"").split("").reverse().forEach((data, i)=>{
        price.push(data);
        if((i+1)%3==0){
          price.push(",")
        }
      })
      if(price[price.length-1]==","){
        price.pop();
      }
      price = price.reverse().join("");
      let addListItem = document.createElement("li");
      addListItem.classList.add("product-item");
      addListItem.innerHTML = `
      <a href=${product.link} class="product-btn">
        <div class="product-cont-img">
          <img
            src="${postImg}"
            alt="${product.itemName}"
            class="product-img"
          />
        </div>
        <p class="product-desc">${product.itemName}</p>
        <p class="product-price">${price}원</p>
      </button>
      `
      productList.prepend(addListItem);
    })
    
  }
}
productConfirmation();
