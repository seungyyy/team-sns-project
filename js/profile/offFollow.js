async function offFollow(accountname) {
    const res = await fetch(
      "http://146.56.183.55:5050/profile/" + accountname +"/unfollow",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      }
    );
    location.reload()
}

  