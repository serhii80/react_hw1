//Global variables and DOM elements

let dataFromServer = [];
let globalCount = 0;
const p = document.querySelector("p");
const txt = document.querySelector(".text_here");
const img = document.querySelector('img');
const caption = document.querySelector('.caption');
const togg_but = document.querySelector(".togg_but");
const goRight = document.querySelector(".right_adv");
const goLeft = document.querySelector(".left_adv");
const goFirst = document.querySelector(".first_adv");
const goLast = document.querySelector(".last_adv");

//Functions

class ShowAdContent {
    constructor() {
    };
    showAll(cur, data) {
        img.src = data[cur].img;
        img.alt = data[cur].title;
        caption.innerText = data[cur].title;
        p.innerHTML = "<span>" +  data[cur].description.replace(/ /g, '</span> <span>') + "</span>";
    }
    changeSpan() {
        for (let i = 0; i < p.childElementCount; i++) {
            if (p.children[i].offsetTop != p.children[i + 1].offsetTop) {
                p.children[i].setAttribute("lastchar", p.children[i].innerText.slice(-1));
                p.children[i].innerText = p.children[i].innerText.slice(0, -1)
                p.children[i].classList.add("last_dot");
                break;
            };
        };
    };
};
const render = new ShowAdContent();

function renderAll() {
    render.showAll(globalCount, dataFromServer);
    render.changeSpan();
};

fetch('https://my-json-server.typicode.com/IlyaLytvynov/ads-box-server/ads')
.then(response => response.json()
)
.then((data) => {
    dataFromServer = data;
    renderAll();
});

//Listeners

togg_but.addEventListener("click", () => {
    window.getComputedStyle(txt).marginTop == "0px" ? txt.style.marginTop = -(p.getBoundingClientRect().height - parseInt(window.getComputedStyle(p).marginBottom)) + 'px' : txt.style.marginTop = 0;
    p.classList.toggle("p_black");
    document.querySelector(".last_dot").classList.toggle("last");
});

goRight.addEventListener("click", () => {
    globalCount == dataFromServer.length - 1 ? globalCount = 0 : globalCount++;
    renderAll();
});

goLeft.addEventListener("click", () => {
    globalCount == 0 ? globalCount = dataFromServer.length - 1 : globalCount--;
    renderAll();
});

goFirst.addEventListener("click", () => {
    globalCount = 0;
    renderAll();
});

goLast.addEventListener("click", () => {
    globalCount = globalCount = dataFromServer.length - 1;
    renderAll();
});

window.addEventListener('resize', () => renderAll());