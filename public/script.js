const posts = document.querySelector(".posts");
document.addEventListener("DOMContentLoaded", async () => {
    try {
        if(localStorage.getItem("like1") == null) {
            for(let i = 1; i <= 4; i++) {
                localStorage.setItem(`like${i}`, false);
                localStorage.setItem(`dislike${i}`, false);
            }
        }
        const res = await axios.get("/getAllPosts");
        console.log(res.data);
        createElements(res.data.data);
    } catch (error) {
        console.log(error)
    }
})
function createElements(datas) { 
    console.log(datas);
    posts.innerHTML = "";
    datas.forEach((post, index) => {
        console.log(index);
        console.log(post);
        const div = document.createElement("div");
        const h1 = document.createElement("h1");
        const likeBtn = document.createElement("button");
        const dislikeBtn = document.createElement("button");
        h1.innerText = post.title;
        likeBtn.innerHTML = `
        <i class="material-icons">thumb_up</i>
        <p class = "brojac podrzava ">${post.like}</p>
        `;
        dislikeBtn.innerHTML = `
        <i class="material-icons">thumb_down</i>
        <p class = "brojac nepodrzava">${post.dislike}</p>
        `;
        h1.classList.add("title");
        likeBtn.classList.add("btn");
        likeBtn.classList.add("like");
        dislikeBtn.classList.add("btn");
        likeBtn.addEventListener("click", (e) => likePost(e, `like${index + 1}`, `dislike${index + 1}`, post._id), true);
        dislikeBtn.addEventListener("click", (e) => dislikePost(e, `like${index + 1}`, `dislike${index + 1}`, post._id), true);
        dislikeBtn.classList.add("dislike");
        div.classList.add("post");
        div.append(h1, likeBtn, dislikeBtn);
        posts.append(div);
    })
}
async function likePost(e, like, dislike, id) {
    try {
        localStorage.setItem(dislike, false);
        let getLike = localStorage.getItem(like);
        let getDislike = localStorage.getItem(dislike);
        if(getLike === "true") {
            localStorage.setItem(like, false);
            getLike = localStorage.getItem(like);
        } else {
            localStorage.setItem(like, true);
            getLike = localStorage.getItem(like);
        }
        const res = await axios.put(`/likePost/${id}`, {
            like: getLike,
            dislike: getDislike
        });
        if(res.status === 200) {
            let like = e.target.closest(".like");
            let dislike = like.nextSibling;
            dislike.innerHTML = `
            <i class="material-icons">thumb_down</i>
            <p class = "brojac nepodrzava">${res.data.dislikes}</p>
            `
            like.innerHTML = `
            <i class="material-icons">thumb_up</i>
            <p class = "brojac podrzava ">${res.data.likes}</p>
            `;
            
        }
    } catch (error) {
        console.log(error)
    }
}
async function dislikePost(e, like, dislike, id) {
    try {
        localStorage.setItem(like, false);
        let getLike = localStorage.getItem(like);
        let getDislike = localStorage.getItem(dislike);
        if(getDislike === "true") {
            localStorage.setItem(dislike, false);
            getDislike = localStorage.getItem(dislike);
    } else {
        localStorage.setItem(dislike, true);
        getDislike = localStorage.getItem(dislike);
    }
        const res = await axios.put(`/dislikePost/${id}`, {
            like: getLike,
            dislike: getDislike
        });
        if(res.status === 200) {
            let dislike = e.target.closest(".dislike");
            let like = dislike.previousSibling;
            dislike.innerHTML = `
            <i class="material-icons">thumb_down</i>
            <p class = "brojac nepodrzava">${res.data.dislikes}</p>
            `
            like.innerHTML = `
            <i class="material-icons">thumb_up</i>
            <p class = "brojac podrzava ">${res.data.likes}</p>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}
function removeCircle(circle) {
    circle.classList.remove("scale-circle");
}
function toggleCircle(circle) {
    circle.classList.toggle("scale-circle");
}