async function deletePost(id) {
  const res = await fetch(
    `http://146.56.183.55:5050/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  location.reload();
}
async function deleteProduct(id) {
  const res = await fetch(
    `http://146.56.183.55:5050/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  location.reload();
}
async function declaration(id) {
  const res = await fetch(
    `http://146.56.183.55:5050/post/${id}/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  location.reload();
}