(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  

  const json = await fetch('/data/1014_project_data.json').then(res => res.json());

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
      console.log("scroll")
      const hscroll_position = scrollWrapper.scrollLeft;
      console.log("hscroll_position", hscroll_position);    
      if (hscroll_position > 0){
        hScrollLeft.classList.add("active");
      }else{
        hScrollLeft.classList.remove("active");
      }
  
      //console.log(`document.querySelector(".content-wrapper.active").clientWidth`, document.querySelector(".content-wrapper.active").clientWidth);
      //console.log(`document.querySelector(".content-wrapper.active").clientWidth - scrollWrapper.clientWidth`, document.querySelector(".content-wrapper.active").clientWidth - scrollWrapper.clientWidth);
      
      if (hscroll_position < categoryWrapper.clientWidth - scrollWrapper.clientWidth){
        hScrollRight.classList.add("active");
      }else{
        hScrollRight.classList.remove("active");
      }    
    }); 
/*  scrollWrapper.addEventListener('scroll', function(){
    const hscroll_position = scrollWrapper.scrollLeft;
    //console.log("hscroll_position", hscroll_position);    
    if (hscroll_position > 0){
      hScrollLeft.classList.add("active");
    }else{
      hScrollLeft.classList.remove("active");
    }

    //console.log(`document.querySelector(".content-wrapper.active").clientWidth`, document.querySelector(".content-wrapper.active").clientWidth);
    //console.log(`document.querySelector(".content-wrapper.active").clientWidth - scrollWrapper.clientWidth`, document.querySelector(".content-wrapper.active").clientWidth - scrollWrapper.clientWidth);
    
    if (hscroll_position < document.querySelector(".content-wrapper.active").clientWidth - scrollWrapper.clientWidth - 20){
      hScrollRight.classList.add("active");
    }else{
      hScrollRight.classList.remove("active");
    }    
  }); */

  hScrollLeft.addEventListener('click', function(){
    scrollWrapper.scrollBy(-265, 0);
    document.querySelector(`#${Object.keys(json)[i]} > div`)
    console.log("click")
  }); 

  hScrollRight.addEventListener('click', function(){
    scrollWrapper.scrollBy(265, 0);
  });    

/*window.addEventListener('scroll', function(){
  const vscroll_position = window.pageYOffset;
  console.log("vscroll_position", vscroll_position);
  contentWrapperY = document.querySelector(".content-wrapper.active").getBoundingClientRect().top + window.pageYOffset;
  console.log("contentWrapperY", contentWrapperY);
  projectBlocksTopY = contentWrapperY + document.querySelector("#timetable .label").offsetHeight - 60;
  console.log("projecetBlocksTopY", projectBlocksTopY);
  projectBlocksBottomY = contentWrapperY + document.querySelector(".content-wrapper.active").offsetHeight - document.documentElement.clientHeight;
  console.log("projecetBlocksBottomY", projectBlocksBottomY);
});*/

  }
})()