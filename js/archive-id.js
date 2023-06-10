(async () =>{
    /* 多言語切り替え */
    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

    const json = await fetch('/data/timetabele_data_web.json').then(res => res.json());
    const maintag = document.getElementsByTagName("main")[0]; 
    var urlSearch = location.search.substring(1);
    var idnum = urlSearch.split("=");//id番号の代入
    const id = idnum[1];

  /* DOM取得 ---------------
  --------------------------*/
  const mainMovie = document.querySelector(".main-movie");
  const subMoviesWide = document.querySelector(".sub-movies.wide");
  const subMoviesNarrow = document.querySelector(".sub-movies.narrow");

  /* HTML要素追加 -----------
  --------------------------*/
  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    for (let k=0; k<json[Object.keys(json)[i]][0].contents.length; k++){ //各企画をループ
      if (json[Object.keys(json)[i]][0].contents[k].id === id){
        const urlSplit = json[Object.keys(json)[i]][0].contents[k].url.split("/").slice(-1)[0];
        
        const mainMovieIframe = `
        <iframe src="https://www.youtube.com/embed/${urlSplit}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div>
          <div class="main-project-name">${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}</div>
          <div class="main-group-name">${json[Object.keys(json)[i]][0].contents[k].groupName[lang]}</div>
        </div>
        `; 
        mainMovie.insertAdjacentHTML("afterbegin", mainMovieIframe);
      }
    }
  }
  

  const subMoviesWideContents = []; //配列を用意
  for (let i=Object.keys(json).length-1; i>=0; i--){ //1日目・2日目を逆ループ
    for (let k=json[Object.keys(json)[i]][0].contents.length-1; k>=0; k--){ //各企画を逆ループ
    
      if (i === 0){ //1日目は2022/11/5
        if (TimeCompare(2022, 11, 5, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[i]][0].contents[k].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute) <= 0){  
          subMoviesWideContents.push(`
            <div class="${Object.keys(json)[i]} project ${json[Object.keys(json)[i]][0].contents[k].id}">
              <a href="/projects/archive/movie/?id=${json[Object.keys(json)[i]][0].contents[k].id}">
                <div>
                  <div class="project-img"><img src="${json[Object.keys(json)[i]][0].contents[k].imagePath}" alt="${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}"></div>
                  <div class="desc">
                    <div class="project-name">${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}</div>
                    <div class="group-name">${json[Object.keys(json)[i]][0].contents[k].groupName[lang]}</div>
                  </div>
                </div>
              </a> 
            </div> 
          `);          
        } 
      } else if (i === 1 && k !== json[Object.keys(json)[i]][0].contents.length-1){ //2日目は2022/11/6
        //console.log(i, k, TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[i]][0].contents[k].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute));
        if (TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[1]][0].contents[i].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute) <= 0){  
          subMoviesWideContents.push(`
            <div class="${Object.keys(json)[i]} project ${json[Object.keys(json)[i]][0].contents[k].id}">
              <a href="/projects/archive/movie/?id=${json[Object.keys(json)[i]][0].contents[k].id}">
                <div>
                  <div class="project-img"><img src="${json[Object.keys(json)[i]][0].contents[k].imagePath}" alt="${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}"></div>
                  <div class="desc">
                    <div class="project-name">${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}</div>
                    <div class="group-name">${json[Object.keys(json)[i]][0].contents[k].groupName[lang]}</div>
                  </div>
                </div>
              </a> 
            </div> 
          `);
        } 
      }
   

    }
  } 
  const subMoviesWideContentsJoin = subMoviesWideContents.join(""); //配列の要素を連結して文字列とする
  subMoviesWide.insertAdjacentHTML("beforeend", subMoviesWideContentsJoin);

  const subMoviesNarrowContents = []; //配列を用意
  for (let i=Object.keys(json).length-1; i>=0; i--){ //1日目・2日目を逆ループ
    for (let k=json[Object.keys(json)[i]][0].contents.length-1; k>=0; k--){ //各企画を逆ループ
      if (i === 0){ //1日目は2022/11/5
        //console.log(i, k, TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][0].contents[k].startTime.hour, json[Object.keys(json)[0]][0].contents[k].startTime.minute, json[Object.keys(json)[0]][0].contents[k].endTime.hour, json[Object.keys(json)[0]][0].contents[k].endTime.minute));
        if (TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][0].contents[k].startTime.hour, json[Object.keys(json)[0]][0].contents[k].startTime.minute, json[Object.keys(json)[0]][0].contents[k].endTime.hour, json[Object.keys(json)[0]][0].contents[k].endTime.minute) <= 0){  
          subMoviesNarrowContents.push(`
            <div class="${Object.keys(json)[i]} project ${json[Object.keys(json)[i]][0].contents[k].id}">
              <a href="/projects/archive/movie/?id=${json[Object.keys(json)[i]][0].contents[k].id}">
                <div class="project-inner-wrapper">
                  <div class="project-img"><img src="${json[Object.keys(json)[i]][0].contents[k].iconPath}" alt="${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}"></div>
                  <div class="desc">
                    <div class="project-name">${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}</div>
                    <div class="group-name">${json[Object.keys(json)[i]][0].contents[k].groupName[lang]}</div>
                  </div>
                </div>
              </a> 
            </div> 
          `);          
        } 
      } else if (i === 1 && k !== json[Object.keys(json)[i]][0].contents.length-1){ //2日目は2022/11/6
        //console.log(i, k, TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[i]][0].contents[k].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute));
        if (TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[1]][0].contents[i].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute) <= 0){  
          subMoviesNarrowContents.push(`
            <div class="${Object.keys(json)[i]} project ${json[Object.keys(json)[i]][0].contents[k].id}">
              <a href="/projects/archive/movie/?id=${json[Object.keys(json)[i]][0].contents[k].id}">
                <div class="project-inner-wrapper">
                  <div class="project-img"><img src="${json[Object.keys(json)[i]][0].contents[k].iconPath}" alt="${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}"></div>
                  <div class="desc">
                    <div class="project-name">${json[Object.keys(json)[i]][0].contents[k].eventName[lang]}</div>
                    <div class="group-name">${json[Object.keys(json)[i]][0].contents[k].groupName[lang]}</div>
                  </div>
                </div>
              </a> 
            </div> 
          `);
        } 
      }
   

    }
  } 
  const subMoviesNarrowContentsJoin = subMoviesNarrowContents.join(""); //配列の要素を連結して文字列とする
  subMoviesNarrow.insertAdjacentHTML("beforeend", subMoviesNarrowContentsJoin);  
  
  function TimeCompare(year, month, date, startHour, startMinute, endHour, endMinute){
    /* 現在時刻取得 */
    const currentTime = new Date();

    /* 開始時刻取得 */
    const startTime = new Date(year, month-1, date, startHour, startMinute);

    /* 終了時刻取得 */
    const endTime = new Date(year, month-1, date, endHour, endMinute);
    
    /* 時間判定 */
    if (currentTime.getTime() < startTime.getTime()){
      return 1; //未来なら1を返す
    }else if (currentTime.getTime() > endTime.getTime()){
      return -1; //過去なら-1を返す
    }else if (startTime.getTime() <=currentTime.getTime() <=endTime.getTime()){
      return 0; //現在なら0を返す
    }else{
      return null;
    }
  }    

  /* 自分自身のオススメ非表示 - 
  --------------------------*/ 
  const subMovies = document.querySelectorAll(`.project.${id}`);
  for (const subMovie of subMovies){
    subMovie.style.display = "none";
  }

  /* フッターが見えたらfixed解除 
  --------------------------*/
  if (window.innerWidth > 1000) {
    window.addEventListener('scroll', function() {
      let scroll_position = window.pageYOffset; //スクロール位置取得
      const pageH = document.documentElement.scrollHeight; //ドキュメント高さ取得
      const windowH = document.documentElement.clientHeight; //ウインドウ高さ取得
      const mainMovieH = mainMovie.clientHeight; //ウインドウ高さ取得
      if (scroll_position > pageH - windowH - 100){
        document.querySelector(".main-movie").classList.add("move");
        mainMovie.style.bottom = `${windowH - mainMovieH - 150}px`;
      } else{
        document.querySelector(".main-movie").classList.remove("move");
        mainMovie.style.bottom = "auto";
      }    
    });
  } else{
    mainMovie.classList.remove("move");
    
  }

  /* 1000pxをまたいだら自動リロード
  -------------------*/
  let resizeBefore = window.innerWidth - 1000;
  let resizeAfter = window.innerWidth - 1000;
  window.addEventListener('resize', function(){
    resizeBefore = resizeAfter;
    resizeAfter = window.innerWidth - 1000;
    if (resizeBefore * resizeAfter <= 0){
      location.reload();
    }
  });

})()