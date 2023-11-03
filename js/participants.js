(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  

  const json = await fetch('/data/1103_project_data.json').then(res => res.json());

  for (let i=0; i<Object.keys(json).length; i++){ // カテゴリをループ
    const categoryWrapper = document.querySelector(`#${Object.keys(json)[i]} > div > div`); // DOM取得

    let contents = []; // 配列を用意
    for (let j=0; j<json[Object.keys(json)[i]].length; j++){
      /* 場所 */
      let placeText = "";
      if (json[Object.keys(json)[i]][j].firstDayPlace.ja == json[Object.keys(json)[i]][j].secondDayPlace.ja) {
          placeText = json[Object.keys(json)[i]][j].isOnline ? "オンライン" : `${json[Object.keys(json)[i]][j].secondDayPlace[lang]}`;
      }
      else if ((json[Object.keys(json)[i]][j].firstDayPlace.ja != "-" && json[Object.keys(json)[i]][j].secondDayPlace.ja == "-") || (json[Object.keys(json)[i]][j].firstDayPlace.ja == "-" && json[Object.keys(json)[i]][j].secondDayPlace.ja != "-")) {
          if (json[Object.keys(json)[i]][j].firstDayPlace.ja != "-") {
              placeText = `11/5 : ${json[Object.keys(json)[i]][j].firstDayPlace[lang]}`;
          } else {
              placeText = `11/6 : ${json[Object.keys(json)[i]][j].secondDayPlace[lang]}`;
          }
      } else {
          placeText = `11/5 : ${json[Object.keys(json)[i]][j].firstDayPlace[lang]}<br>11/6 : ${json[Object.keys(json)[i]][j].secondDayPlace[lang]}`;
      }

      contents.push(`        
          <div class="project">
            <a href="/projects/project/?id=${json[Object.keys(json)[i]][j].id}">
              <div class="project-img">
                <img src="/img/projects/${json[Object.keys(json)[i]][j].id}/${json[Object.keys(json)[i]][j].id}_web_thumbnail.jpg" alt="">
              </div>
              <div class="desc">
                <div class="project-name">${json[Object.keys(json)[i]][j].projectName[lang]}</div>
                <div class="detail">
                  <div class="group-name">${json[Object.keys(json)[i]][j].groupName[lang]}</div>
                  <div class="place">${placeText}</div>
                </div>
              </div>
            </a>
          </div>  
      `)
    }
    const contentsJoin = contents.join(""); // 配列の要素を連結して文字列とする  
    categoryWrapper.insertAdjacentHTML("beforeend", contentsJoin);    

  /* 横スクロールボタン ------ 
  --------------------------*/
  const scrollWrapper = document.querySelector(`#${Object.keys(json)[i]} > div`)
  const hScrollLeft = document.querySelector(`#${Object.keys(json)[i]} .h-scroll.left`);
  const hScrollRight = document.querySelector(`#${Object.keys(json)[i]} .h-scroll.right`);

    scrollWrapper.addEventListener('scroll', function(){
      const hscroll_position = scrollWrapper.scrollLeft;
      if (hscroll_position > 0){
        hScrollLeft.classList.add("active");
      }else{
        hScrollLeft.classList.remove("active");
      }
  
      if (hscroll_position < categoryWrapper.clientWidth - scrollWrapper.clientWidth){
        hScrollRight.classList.add("active");
      }else{
        hScrollRight.classList.remove("active");
      }    
    }); 

  hScrollLeft.addEventListener('click', function(){
    scrollWrapper.scrollBy(-265, 0);
  }); 

  hScrollRight.addEventListener('click', function(){
    scrollWrapper.scrollBy(265, 0);
  });    
  }
})()