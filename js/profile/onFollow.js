async function onFollow(accountname) {
    const res = await fetch(
      "http://146.56.183.55:5050/profile/" +accountname +"/follow",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      }
    );
    location.reload()
}