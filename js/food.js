(async () =>{
    /* 多言語切り替え */
    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

    const json = await fetch('/data/data.json').then(res => res.json());
    

    for(let i=0; i<json.shops.length; i++){
        const discription = [];
        const box = document.getElementById("shops");
        const seatCard = lang == "ja" ? "席カードが必要です" : "Seat Card";
        discription.push(`<a class="project" id="${json.shops[i].id}" href="/projects/project/?id=${json.shops[i].id}"><div class="ticket">${seatCard}</div>
        <div class="project-img">
            <img src="${json.shops[i].thumbnailPath}" alt="">
        </div>
        <div class="desc">
            <div class="project-name">${json.shops[i].projectName[lang]}</div>
            <div class="detail">
                <div class="group-name">${json.shops[i].groupName[lang]}</div>
                <div class="place">${json.shops[i].placeFirstDay[lang]}</div>
            </div>
        </div></a>`)
        box.insertAdjacentHTML("beforeend", discription);
    }
    const pin_1 = document.getElementById("pin_1");
    const pin_2 = document.getElementById("pin_2");
    const pin_3 = document.getElementById("pin_3");
    const pin_4 = document.getElementById("pin_4");
    const pin_5 = document.getElementById("pin_5");
    const pin_6 = document.getElementById("pin_6");
    const pin_7 = document.getElementById("pin_7");
    const pin_8 = document.getElementById("pin_8");

    const K_01 = document.getElementById("K-01");
    const K_02 = document.getElementById("K-02");
    const M_02 = document.getElementById("M-02");
    const M_03 = document.getElementById("M-03");
    const M_04 = document.getElementById("M-04");
    const M_05 = document.getElementById("M-05");
    const M_06 = document.getElementById("M-06");
    const M_01 = document.getElementById("M-01");

    pin_1.addEventListener("click", () => {
        K_01.classList.add("flash");
    });
    pin_2.addEventListener("click", () => {
        K_02.classList.add("flash");
    });
    pin_3.addEventListener("click", () => {
        M_02.classList.add("flash");
    });
    pin_4.addEventListener("click", () => {
        M_03.classList.add("flash");
    });
    pin_5.addEventListener("click", () => {
        M_04.classList.add("flash");
    });
    pin_6.addEventListener("click", () => {
        M_05.classList.add("flash");
    });
    pin_7.addEventListener("click", () => {
        M_06.classList.add("flash");
    });
    pin_8.addEventListener("click", () => {
        M_01.classList.add("flash");
    });
})();