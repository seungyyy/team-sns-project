async function productConfirmation() {
  const res = await fetch(
    "http://146.56.183.55:5050/product/" + localStorage.getItem("postuploder"),
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
  console.log(products);

  let productCont = document.querySelector(".product");
  let productList = productCont.querySelector(".product-list")
  if (!products.data) {
    if (!productCont.classList.contains("cont--hide")) {
      productCont.classList.add("cont--hide");
    }
  } else {
    productCont.classList.remove("cont--hide");
    productArr = products["product"]
    productArr.forEach((product)=>{
      let addListItem = document.createElement("li");
      addListItem.classList.add("product-item");
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
      //추후에 상품 주소 추가
      addListItem.innerHTML = `
      <a href=${product.link} class="product-btn">
        <img
          src="${product.itemImage}"
          alt="${product.itemName}"
          class="product-img"
        />
        <p class="product-desc">${product.itemName}</p>
        <p class="product-price">${price}원</p>
      </button>
      `
      productList.prepend(addListItem);
    })
    
  }
}
productConfirmation();
