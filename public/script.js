const circleGreen = document.querySelector(".circle-green");
const circleRed = document.querySelector(".circle-red");
const like = document.querySelector(".like");
const dislike = document.querySelector(".dislike");
const podrzava = document.querySelector(".podrzava");
const nepodrzava = document.querySelector(".nepodrzava");
document.addEventListener("DOMContentLoaded", async () => { 
    try {
        let like = localStorage.getItem("like");
        let dislike = localStorage.getItem("dislike");
        const res = await axios.get("http://localhost:5000/getLikesAndDislikes");
        console.log(res.data);
        console.log(like, dislike);
        podrzava.innerText = res.data.likes;
        nepodrzava.innerText = res.data.dislikes;
        if(like == null && dislike == null) {
            localStorage.setItem("like", false);
            localStorage.setItem("dislike", false);
        }
        if(like === "true") toggleCircle(circleGreen);
        if(dislike === "true") toggleCircle(circleRed);
    } catch(err) {
        console.log(err);
    }
});
like.addEventListener("click", () => {
        let obj = {};
        obj.dislike = localStorage.getItem("dislike");
        localStorage.setItem("dislike", false);
        if(circleRed.classList.contains("scale-circle")) {
            removeCircle(circleRed)
        }
        if(localStorage.getItem("like") === "true") {
            localStorage.setItem("like", false);
            console.log(localStorage.getItem("like"));
            obj.like = localStorage.getItem("like");
            console.log(obj);
            removeCircle(circleGreen);
            changeVote("http://localhost:5000/like", obj);
            return;
        }
        toggleCircle(circleGreen)
        localStorage.setItem("like", true);
        obj.like = localStorage.getItem("like");
        changeVote("http://localhost:5000/like", obj);
        console.log(obj);
}, true)
dislike.addEventListener("click", () => {
    let obj = {};
    obj.like = localStorage.getItem("like");
    localStorage.setItem("like", false);
    if(circleGreen.classList.contains("scale-circle")) {
        removeCircle(circleGreen)
    }
    if(localStorage.getItem("dislike") === "true") {
        localStorage.setItem("dislike", false);
        console.log(localStorage.getItem("dislike"));
        obj.dislike = localStorage.getItem("dislike");
        console.log(obj);
        removeCircle(circleRed);
        changeVote("http://localhost:5000/dislike", obj);
        return;
    }
    toggleCircle(circleRed)
    localStorage.setItem("dislike", true);
    obj.dislike = localStorage.getItem("dislike");
    changeVote("http://localhost:5000/dislike", obj);
    console.log(obj);
}, true)
function toggleCircle(circle) {
    circle.classList.toggle("scale-circle");
}

function removeCircle(circle) {
    circle.classList.remove("scale-circle");
}
async function changeVote(url, obj) {
    try {
        const res = await axios.put(url, obj);
        console.log(res.data);
        podrzava.innerText = res.data.likes;
        nepodrzava.innerText = res.data.dislikes;
    } catch (error) {
        console.log(error);
    }
}