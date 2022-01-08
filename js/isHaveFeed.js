let mainHome = document.querySelector(".main-home");
async function getFeed() {
  const res = await fetch("http://146.56.183.55:5050/post/feed", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  });
  const json = await res.json();
  const posts = json.posts;
  console.log(posts);
  if (!posts.length) {
    mainHome.classList.add("main-feed-none");
    mainHome.classList.remove("main-feed-have");
  } else {
    mainHome.classList.add("main-feed-have");
    mainHome.classList.remove("main-feed-none");
  }
}
getFeed();
