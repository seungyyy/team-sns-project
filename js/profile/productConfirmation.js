async function productConfirmation() {
  const res = await fetch(
    "http://146.56.183.55:5050/product/" + localStorage.getItem("accountname"),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  const json = await res.json();
  const products = json;
  console.log("상품리스트",products);

  let productCont = document.querySelector(".product");
  let productList = productCont.querySelector(".product-list");
  let productHr = document.querySelector(".product-hr");
  //상품이 있는지 없는지 확인
  if (!products.data) {
    if (!productCont.classList.contains("cont--hide")) {
      productCont.classList.add("cont--hide");
      productHr.classList.add("cont--hide");
    }
  } else {
    productCont.classList.remove("cont--hide");
    productHr.classList.remove("cont--hide");
    productArr = products["product"];
    productArr.forEach((product)=>{
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
      //li에 내용 삽입
      let addListItem = document.createElement("li");
      addListItem.classList.add("product-item");
      addListItem.innerHTML = `
      <button type="button" class="product-btn">
        <div class="product-cont-img">
          <img
            src="${product.itemImage}"
            alt="${product.itemName}"
            class="product-img"
          />
        </div>
        <p class="product-desc">${product.itemName}</p>
        <p class="product-price">${price}원</p>
      </button>
      `
      productList.prepend(addListItem);

      let contModal = document.querySelector(".modal-product-outside");
      document
      .querySelector(".product-btn")
      .addEventListener("click", ()=>{
        contModal.classList.remove("cont--hide");
        modalProduct(product.id);
      })
    })
  }
}
productConfirmation();
