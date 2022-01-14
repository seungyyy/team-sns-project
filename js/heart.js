async function heartPlus(id) {
  const res = await fetch(
    "http://146.56.183.55:5050/post/"+id+"/heart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );
  location.reload();
};

async function heartCancel(id) {
  const res = await fetch(
    "http://146.56.183.55:5050/post/"+id+"/unheart",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  );    
  location.reload();
}