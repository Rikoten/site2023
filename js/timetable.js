
(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  
  
  /* JSONデータ取得 ---------
  --------------------------*/
  const json = await fetch('/data/timetable_data_web.json').then(res => res.json());
  console.log("json:", json); 

  /* DOM取得 ---------------
  --------------------------*/
  const firstDayButton = document.querySelector(".first-day-button");
  const secondDayButton = document.querySelector(".second-day-button");
  const contentsWrapper = document.querySelector(".contents-wrapper");
  const hScrollLeft = document.querySelector(".h-scroll.left");
  const hScrollRight= document.querySelector(".h-scroll.right");


  

  /* 日付ボタン横の線の長さ --
  --------------------------*/
  window.addEventListener("load", lineWidth); //ロードされたら設定
  window.addEventListener('resize', lineWidth); //ウィンドウ幅が変わったら調整
  

  function lineWidth(){
    const navWidth = Math.floor(document.querySelector("#timetable .nav").getBoundingClientRect().width); //navの幅は切り捨て
    //console.log("navWidth", navWidth);
    const dateButtonWidth = Math.ceil(document.querySelector(".date-button").getBoundingClientRect().width); //date-buttonの幅は切り上げ
    //console.log("dateButtonWidth", dateButtonWidth);
    if (window.innerWidth > 576){ //ウィンドウ幅が広いときは 左:右 = 1:4
      const navLineLeftWidth = String((navWidth - dateButtonWidth)*1/5) + "px";
      const navLineRightWidth = String((navWidth - dateButtonWidth)*4/5) + "px";
      //console.log("navLineLeftWidth", navLineLeftWidth);
      //console.log("navLineRightWidth", navLineRightWidth);
      document.querySelector(".nav-line.left").style.width = navLineLeftWidth;
      document.querySelector(".nav-line.right").style.width = navLineRightWidth;
      //console.log(".nav-line.left", document.querySelector(".nav-line.left"));
      //console.log(".nav-line.right", document.querySelector(".nav-line.right"));
      //console.log("nav-line left", document.querySelector(".nav-line.left").clientWidth);
      //console.log("nav-line right", document.querySelector(".nav-line.right").clientWidth);
    } else{ //ウィンドウ幅が狭い時は 左:右 = 1:1
      let navLineLeftWidth = String((navWidth - dateButtonWidth)*1/2) + "px";
      let navLineRightWidth = String((navWidth - dateButtonWidth)*1/2) + "px";
      if (((navWidth - dateButtonWidth)*1/2) < 5){
        navLineLeftWidth = "0px";
        navLineRightWidth = "0px";
      }
      //console.log("navLineLeftWidth", navLineLeftWidth);
      //console.log("navLineRightWidth", navLineRightWidth);
      document.querySelector(".nav-line.left").style.width = navLineLeftWidth;
      document.querySelector(".nav-line.right").style.width = navLineRightWidth;
      //console.log(".nav-line.left", document.querySelector(".nav-line.left"));
      //console.log(".nav-line.right", document.querySelector(".nav-line.right"));
      //console.log("nav-line left", document.querySelector(".nav-line.left").clientWidth);
      //console.log("nav-line right", document.querySelector(".nav-line.right").clientWidth);      
    }

  }

  /* HTML要素追加 -----------
  --------------------------*/ 
  const contents = []; //配列を用意
  //console.log("json.length", Object.keys(json).length);
  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    contents.push(`
      <div class="content-wrapper ${Object.keys(json)[i]}">
    `)
    //console.log("Object.keys(json)[0]", Object.keys(json)[0]);
    //console.log("json[Object.keys(json)[i]]", json[Object.keys(json)[i]]);
    //console.log("json[Object.keys(json)[i]].length", json[Object.keys(json)[i]].length);
    
    for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ

      // makochan1209-暫定コード。loadイベントが発生しなくても強制的に1番目のタイムテーブルは表示がされるようにした。根本的な解決ではない
      activeOrNot = "";
      if (j == 0) activeOrNot = "active";
      contents.push(`
        <div class="project-type ${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')} ${activeOrNot}">
          <div class="label"><div>${json[Object.keys(json)[i]][j].label[lang]}</div><div>${json[Object.keys(json)[i]][j].place[lang]}</div></div>
      `)

      // 以下旧コード
      /*
      contents.push(`
        <div class="project-type ${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}">
          <div class="label"><div>${json[Object.keys(json)[i]][j].label[lang]}</div><div>${json[Object.keys(json)[i]][j].place[lang]}</div></div>
      `)
      */
      // ここまで

      //console.log("json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')", json[Object.keys(json)[i]][j].label.en.replace(/ /g, ''))
      //console.log("json[Object.keys(json)[i]][j].label[lang]", json[Object.keys(json)[i]][j].label[lang]);
      //console.log("json[Object.keys(json)[i]][j].place[lang]", json[Object.keys(json)[i]][j].place[lang]);      
      
      //console.log("json[Object.keys(json)[i]][j].contents[0]", json[Object.keys(json)[i]][j].contents[0]);
      for (let k=0; k<json[Object.keys(json)[i]][j].contents.length; k++){ //各企画をループ
        //console.log("json[Object.keys(json)[i]][j].contents[k]", json[Object.keys(json)[i]][j].contents[k]);
        //console.log("json[Object.keys(json)[i]][j].contents[k].eventName[lang]", json[Object.keys(json)[i]][j].contents[k].eventName[lang]);
        //console.log("json[Object.keys(json)[i]][j].contents[k].imagePath", json[Object.keys(json)[i]][j].contents[k].imagePath);
        const startTimeMinute = json[Object.keys(json)[i]][j].contents[k].startTime.minute==0?"00":`${json[Object.keys(json)[i]][j].contents[k].startTime.minute}`;
        const endTimeMinute = json[Object.keys(json)[i]][j].contents[k].endTime.minute==0?"00":`${json[Object.keys(json)[i]][j].contents[k].endTime.minute}`;
        const nowLabel = lang=="ja"?"現在公演中":"LIVE";
        const detailLabel = lang=="ja"?"詳細を見る":"Detail";
        contents.push(`
          <div class="project-block ${json[Object.keys(json)[i]][j].contents[k].id} row${k}" style="background-image: url(${json[Object.keys(json)[i]][j].contents[k].imagePath});">
            <div class="now-playing">${nowLabel}</div>
            <div class="time">${json[Object.keys(json)[i]][j].contents[k].startTime.hour}:${startTimeMinute}-${json[Object.keys(json)[i]][j].contents[k].endTime.hour}:${endTimeMinute}</div>
            <div class="projectName">${json[Object.keys(json)[i]][j].contents[k].eventName[lang]}</div>
            <div class="groupName">${json[Object.keys(json)[i]][j].contents[k].groupName[lang]}</div>
            <div class="detail"><a href="/projects/project/?id=${json[Object.keys(json)[i]][j].contents[k].id}">${detailLabel}</a></div>
          </div>        
        `)
      }
      
      contents.push(`
        </div>
      `)      
 
    }
    contents.push(`
      </div>
    `)    
  }

  const contentsJoin = contents.join(""); //配列の要素を連結して文字列とする
  contentsWrapper.insertAdjacentHTML("afterbegin", contentsJoin);

  document.querySelector(".secondday").classList.add("active"); //はじめは2日目がactive

  /* CSS 企画ボックスの色 ---
  --------------------------*/
 
  

  /* [E-09]シリコンの覚醒 ---
  --------------------------*/
  if (window.innerWidth > 576){ //ウィンドウ幅が広いとき
    document.querySelector(".E-09 .projectName").style.fontSize = "16px"; //企画名のfont-sizeを小さく 
  }

  /* リサイズ時に対応 */  
  let resizeBefore = window.innerWidth - 576;
  let resizeAfter = window.innerWidth - 576;
  //console.log("resizeBefore: ", resizeBefore, "resizeAfter: ", resizeAfter);
  window.addEventListener('resize', function(){
    //console.log("window.innerWidth", window.innerWidth);
    resizeBefore = resizeAfter;
    resizeAfter = window.innerWidth - 576;
    //console.log("resizeBefore: ", resizeBefore, "resizeAfter: ", resizeAfter);
    if (resizeBefore * resizeAfter <= 0){
      if (window.innerWidth > 576){ //ウィンドウ幅が広いとき
        document.querySelector(".E-09 .projectName").style.fontSize = "16px"; //企画名のfont-sizeを小さく 
      } else{
        document.querySelector(".E-09 .projectName").style.fontSize = "1.25rem"; //ウィンドウ幅が狭いときは他と同じ
      }
    }
  });  

  
   

  /* 日付切り替え -----------
  --------------------------*/   
  firstDayButton.addEventListener('click', function(){ //1日目のボタンが押されたら
    document.querySelector(".firstday").classList.add("active"); //1日目を表示
    document.querySelector(".secondday").classList.remove("active"); //2日目を非表示
    firstDayButton.classList.add("active");
    secondDayButton.classList.remove("active");
  });

  secondDayButton.addEventListener('click', function(){ //2日目のボタンが押されたら
    document.querySelector(".firstday").classList.remove("active"); //1日目を非表示
    document.querySelector(".secondday").classList.add("active"); //2日目を表示
    firstDayButton.classList.remove("active");
    secondDayButton.classList.add("active");
  });



  /* 企画終了 / 現在公演中 -- 
  --------------------------*/
  window.addEventListener("load", AddClassFinishedNow); //ロードされたら時間を確認してクラス付与/削除
  setInterval(AddClassFinishedNow, 1000); //1秒ごとに時間を確認してクラス付与/削除

  function AddClassFinishedNow(){
    for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
      for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ
        const projectBlocks = document.querySelectorAll(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')} .project-block`);
        //console.log(i, "projectBlocks", projectBlocks);
        for (let k=0; k<json[Object.keys(json)[i]][j].contents.length; k++){ //各企画をループ
          if (i === 0){ //1日目は2022/11/5
            if (TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][j].contents[k].startTime.hour, json[Object.keys(json)[0]][j].contents[k].startTime.minute, json[Object.keys(json)[0]][j].contents[k].endTime.hour, json[Object.keys(json)[0]][j].contents[k].endTime.minute) === -1){  
              projectBlocks[k].classList.remove("now");
              projectBlocks[k].classList.add("finished");  
            } else if(TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][j].contents[k].startTime.hour, json[Object.keys(json)[0]][j].contents[k].startTime.minute, json[Object.keys(json)[0]][j].contents[k].endTime.hour, json[Object.keys(json)[0]][j].contents[k].endTime.minute) === 0){
              projectBlocks[k].classList.add("now");
            } 
          } else if (i === 1){ //2日目は2022/11/6
            if (TimeCompare(2022, 11, 6, json[Object.keys(json)[1]][j].contents[k].startTime.hour, json[Object.keys(json)[1]][j].contents[k].startTime.minute, json[Object.keys(json)[1]][j].contents[k].endTime.hour, json[Object.keys(json)[1]][j].contents[k].endTime.minute) === -1){  
              projectBlocks[k].classList.remove("now");
              projectBlocks[k].classList.add("finished");  
            } else if(TimeCompare(2022, 11, 6, json[Object.keys(json)[1]][j].contents[k].startTime.hour, json[Object.keys(json)[1]][j].contents[k].startTime.minute, json[Object.keys(json)[1]][j].contents[k].endTime.hour, json[Object.keys(json)[1]][j].contents[k].endTime.minute) === 0){
              projectBlocks[k].classList.add("now");
            }
          }
        }
      }
    }    
  }


  //const a = TimeCompare(2022, 10, 22, 19, 25, 20, 0);
  //console.log("a", a);

  function TimeCompare(year, month, date, startHour, startMinute, endHour, endMinute){
    /* 現在時刻取得 */
    const currentTime = new Date();
    //console.log("currentTime", currentTime);
    //console.log("currentTime.getTime()", currentTime.getTime());

    /* 開始時刻取得 */
    const startTime = new Date(year, month-1, date, startHour, startMinute);
    //console.log("startTime", startTime);
    //console.log("startTime.getTime()", startTime.getTime());

    /* 終了時刻取得 */
    const endTime = new Date(year, month-1, date, endHour, endMinute);
    //console.log("endTime", endTime);
    //console.log("endTime.getTime()", endTime.getTime()); 
    
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

  /* 横スクロールボタン ------ 
  --------------------------*/
  if (window.innerWidth > 576){ //ウィンドウ幅が広いとき
    contentsWrapper.addEventListener('scroll', function(){
      const hscroll_position = contentsWrapper.scrollLeft;
      //console.log("hscroll_position", hscroll_position);    
      if (hscroll_position > 0){
        hScrollLeft.classList.add("active");
      }else{
        hScrollLeft.classList.remove("active");
      }
  
      //console.log(`document.querySelector(".content-wrapper.active").clientWidth`, document.querySelector(".content-wrapper.active").clientWidth);
      //console.log(`document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth`, document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth);
      
      if (hscroll_position < document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth - 20){
        hScrollRight.classList.add("active");
      }else{
        hScrollRight.classList.remove("active");
      }    
    });  
  } else{
    hScrollLeft.classList.remove("active");
    hScrollRight.classList.remove("active");
  }
/*  contentsWrapper.addEventListener('scroll', function(){
    const hscroll_position = contentsWrapper.scrollLeft;
    //console.log("hscroll_position", hscroll_position);    
    if (hscroll_position > 0){
      hScrollLeft.classList.add("active");
    }else{
      hScrollLeft.classList.remove("active");
    }

    //console.log(`document.querySelector(".content-wrapper.active").clientWidth`, document.querySelector(".content-wrapper.active").clientWidth);
    //console.log(`document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth`, document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth);
    
    if (hscroll_position < document.querySelector(".content-wrapper.active").clientWidth - contentsWrapper.clientWidth - 20){
      hScrollRight.classList.add("active");
    }else{
      hScrollRight.classList.remove("active");
    }    
  }); */


  hScrollLeft.addEventListener('click', function(){
    contentsWrapper.scrollBy(-470, 0);
  }); 

  hScrollRight.addEventListener('click', function(){
    contentsWrapper.scrollBy(470, 0);
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

  /* レスポンシブ対応 ------- 
  --------------------------*/
  /* --- 企画タイプボタンの作成 --- */
  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    const projectTypeButton = []; //配列を用意
    projectTypeButton.push(`
      <div class="project-type-button">
    `)
    for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ
      
      // makochan1209-暫定コード。loadイベントが発生しなくても強制的に1番目のタイムテーブルは表示がされるようにした。根本的な解決ではない
      activeOrNot = "";
      if (j == 0) activeOrNot = "active";
      
      projectTypeButton.push(`
          <div class="button ${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button ${activeOrNot}">${json[Object.keys(json)[i]][j].label[lang]}</div>          
      `)

      // 以下旧コード
      /*projectTypeButton.push(`
          <div class="button ${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button">${json[Object.keys(json)[i]][j].label[lang]}</div>          
      `)*/
    }
    projectTypeButton.push(`
      </div>
    `)
    console.log("prohectTypeButton", projectTypeButton);
    const projectTypeButtonJoin = projectTypeButton.join(""); //配列の要素を連結して文字列とする
    document.querySelector(`.content-wrapper.${Object.keys(json)[i]}`).insertAdjacentHTML("afterbegin", projectTypeButtonJoin);      
  }

  /* --- ウィンドウ幅576px以下のときボタンを表示 --- */
  window.addEventListener("load", projectTypeButtonDisplay); //ロードされたら表示/非表示
  window.addEventListener('resize', projectTypeButtonDisplay); //ウィンドウ幅が変わったら表示/非表示
  firstDayButton.addEventListener('click', projectTypeButtonDisplay); //1日目のボタンが押されたら表示
  secondDayButton.addEventListener('click', projectTypeButtonDisplay); //2日目のボタンが押されたら表示


  function projectTypeButtonDisplay(){
    if (window.innerWidth <= 576){
      for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
        //console.log(`document.querySelector(".content-wrapper.active .project-type-button")`, document.querySelector(".content-wrapper.active .project-type-button"));
        document.querySelector(".content-wrapper.active .project-type-button").classList.add("active");
      }
    } else {
      for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
        document.querySelector(".content-wrapper.active .project-type-button").classList.remove("active");
      }
    }    
  }

  /* --- 企画タイプ切り替え --- */
  window.addEventListener("load", initializeProjectType); //ロードされたら
  firstDayButton.addEventListener('click', initializeProjectType); //1日目のボタンが押されたら表示
  secondDayButton.addEventListener('click', initializeProjectType); //2日目のボタンが押されたら表示 

  function initializeProjectType(){
    for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
      document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][0].label.en.replace(/ /g, '')}`).classList.add("active"); //はじめは1個目の企画タイプ(ステージ)がactive
      document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][0].label.en.replace(/ /g, '')}-button`).classList.add("active"); //はじめは1個目の企画タイプ(ステージ)がactive
      for (let j=1; j<json[Object.keys(json)[i]].length; j++){
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`).classList.remove("active"); //はじめは1個目の企画タイプ(ステージ)がactive
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`).classList.remove("active"); //はじめは1個目の企画タイプ(ステージ)がactive        
      }
    }    
  }

  
  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    const projectTypeButtonActive = [];
    for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ
      //console.log(i, 'document.querySelector(`.${Object.keys(json)[i]}`).classList.contains("active")', document.querySelector(`.${Object.keys(json)[i]}`).classList.contains("active"));
      projectTypeButtonActive.push(document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`));
      //console.log(i,j, "document.querySelector(`.${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`)", document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`));
      //console.log(i,j, "projectTypeButtonActive", projectTypeButtonActive);
      projectTypeButtonActive[j].addEventListener('click', function(){ //企画タイプのボタンが押されたら
        //console.log(i, j, "document.querySelector(`${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`)", document.querySelector(`${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`));
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`).classList.add("active"); //ボタンクリックされた企画タイプを表示
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`).classList.add("active"); //クリックされた企画タイプボタンをactive
        //console.log(i, j, "active", `document.querySelector(".${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}")`, document.querySelector(`.${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`));
        //console.log(i, j, `document.querySelector(".${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button")`, document.querySelector(`.${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`));
        for(let jj=0; jj<json[Object.keys(json)[i]].length; jj++){ //企画タイプをループ
          if (jj !== j){
            document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}`).classList.remove("active"); //それ以外の企画タイプを非表示
            document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}-button`).classList.remove("active"); //それ以外の企画タイプボタンを非active
            //console.log(i, j, "non-active", `document.querySelector(".${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}")`, document.querySelector(`.${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}`));
            //console.log(i, j, `document.querySelector(".${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}-button")`, document.querySelector(`.${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}-button`));
          }
        }     
      });
    }
  }
  /*for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    document.querySelector(`.content-wrapper.active .${json[Object.keys(json)[i]][0].label.en.replace(/ /g, '')}`).classList.add("active"); //はじめは1個目の企画タイプ(ステージ)がactive
    document.querySelector(`.content-wrapper.active .${json[Object.keys(json)[i]][0].label.en.replace(/ /g, '')}-button`).classList.add("active"); //はじめは1個目の企画タイプ(ステージ)がactive
  }*/

  /*if (sessionStorage.getItem('timetableAccess') !== "true"){
    location.reload();
    sessionStorage.setItem("timetableAccess", "true");
    //console.log("timetableAccess: true");
  }*/
  

  window.addEventListener("onload", function(){
    location.reload();
  });
  
})();