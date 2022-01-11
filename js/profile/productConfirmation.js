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
  const product = json;
  console.log(product);
  let productCont = document.querySelector(".product");
  product.data;
  if (!product.data) {
    if (!productCont.classList.contains("cont--hide")) {
      productCont.classList.add("cont--hide");
    }
  } else {
    productCont.classList.remove("cont--hide");
  }
}
productConfirmation();
