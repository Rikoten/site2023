
(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  
  
  /* JSONデータ取得 ---------
  --------------------------*/
  const json = await fetch('/data/timetable_data_web.json?date=20231103').then(res => res.json());
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
  lineWidth();
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
      document.querySelector(".nav-line.left").style.width = navLineLeftWidth;
      document.querySelector(".nav-line.right").style.width = navLineRightWidth;
    } else{ //ウィンドウ幅が狭い時は 左:右 = 1:1
      let navLineLeftWidth = String((navWidth - dateButtonWidth)*1/2) + "px";
      let navLineRightWidth = String((navWidth - dateButtonWidth)*1/2) + "px";
      if (((navWidth - dateButtonWidth)*1/2) < 5){
        navLineLeftWidth = "0px";
        navLineRightWidth = "0px";
      }
      document.querySelector(".nav-line.left").style.width = navLineLeftWidth;
      document.querySelector(".nav-line.right").style.width = navLineRightWidth;  
    }

  }

  

  /* HTML要素追加 -----------
  --------------------------*/ 
  const contents = []; //配列を用意

  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    contents.push(`
      <div class="content-wrapper ${Object.keys(json)[i]}">
    `)
    
    for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ

      // makochan1209-暫定コード。loadイベントが発生しなくても強制的に1番目のタイムテーブルは表示がされるようにした。根本的な解決ではない
      activeOrNot = "";
      if (j == 0) activeOrNot = "active";
      contents.push(`
        <div class="project-type ${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')} ${activeOrNot}">
          <div class="label"><div>${json[Object.keys(json)[i]][j].label[lang]}</div><div>${json[Object.keys(json)[i]][j].place[lang]}</div></div>
      `)

      for (let k=0; k<json[Object.keys(json)[i]][j].contents.length; k++){ //各企画をループ
        const startTimeMinute = json[Object.keys(json)[i]][j].contents[k].startTime.minute==0 ? "00" : (json[Object.keys(json)[i]][j].contents[k].startTime.minute==5 ? "05" : `${json[Object.keys(json)[i]][j].contents[k].startTime.minute}`);
        const endTimeMinute = json[Object.keys(json)[i]][j].contents[k].endTime.minute==0?"00":`${json[Object.keys(json)[i]][j].contents[k].endTime.minute}`;
        const nowLabel = lang=="ja"?"現在公演中":"LIVE";
        const nowImgPath = lang=="ja"?"/img/timetable/label.png":"/img/timetable/label_en.png";
        contents.push(`
        <div class="project-block ${json[Object.keys(json)[i]][j].contents[k].id} row${k}"  onclick="window.location.href='/projects/project/?id=${json[Object.keys(json)[i]][j].contents[k].id}';">
        <div class="now-playing"><img src="${nowImgPath}" alt="${nowLabel} width="50" height="25""></div>
        <div class="time">${json[Object.keys(json)[i]][j].contents[k].startTime.hour}:${startTimeMinute}-${json[Object.keys(json)[i]][j].contents[k].endTime.hour}:${endTimeMinute}</div>
        <div class="projectName">${json[Object.keys(json)[i]][j].contents[k].eventName[lang]}</div>
        <div class="groupName">${json[Object.keys(json)[i]][j].contents[k].groupName[lang]}</div>
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
  
  /* [E-09]シリコンの覚醒 ---
  --------------------------*/
  /*if (window.innerWidth > 576){ //ウィンドウ幅が広いとき
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
  /*  if (resizeBefore * resizeAfter <= 0){
      if (window.innerWidth > 576){ //ウィンドウ幅が広いとき
        document.querySelector(".E-09 .projectName").style.fontSize = "16px"; //企画名のfont-sizeを小さく 
      } else{
        document.querySelector(".E-09 .projectName").style.fontSize = "1.25rem"; //ウィンドウ幅が狭いときは他と同じ
      }
    }*/
  });  

  
  
  /* 企画終了 / 現在公演中 -- 
  --------------------------*/
  AddClassFinishedNow()
  window.addEventListener("load", AddClassFinishedNow); //ロードされたら時間を確認してクラス付与/削除
  //setInterval(AddClassFinishedNow, 1000); //1秒ごとに時間を確認してクラス付与/削除

  function AddClassFinishedNow(){
    for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
      for(let j=0; j<json[Object.keys(json)[i]].length; j++){ //企画タイプをループ
        const projectBlocks = document.querySelectorAll(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')} .project-block`);
        for (let k=0; k<json[Object.keys(json)[i]][j].contents.length; k++){ //各企画をループ
          if (i === 0){ //1日目は2023/11/4
            if (TimeCompare(2023, 11, 4, json[Object.keys(json)[0]][j].contents[k].startTime.hour, json[Object.keys(json)[0]][j].contents[k].startTime.minute, json[Object.keys(json)[0]][j].contents[k].endTime.hour, json[Object.keys(json)[0]][j].contents[k].endTime.minute) === -1){ 
              projectBlocks[k].classList.remove("now");
              projectBlocks[k].classList.add("finished");  
            } else if(TimeCompare(2023, 11, 4, json[Object.keys(json)[0]][j].contents[k].startTime.hour, json[Object.keys(json)[0]][j].contents[k].startTime.minute, json[Object.keys(json)[0]][j].contents[k].endTime.hour, json[Object.keys(json)[0]][j].contents[k].endTime.minute) === 0){
              projectBlocks[k].classList.add("now");
            } 
          } else if (i === 1){ //2日目は2023/11/5
            if (TimeCompare(2023, 11, 5, json[Object.keys(json)[1]][j].contents[k].startTime.hour, json[Object.keys(json)[1]][j].contents[k].startTime.minute, json[Object.keys(json)[1]][j].contents[k].endTime.hour, json[Object.keys(json)[1]][j].contents[k].endTime.minute) === -1){  
              projectBlocks[k].classList.remove("now");
              projectBlocks[k].classList.add("finished");  
            } else if(TimeCompare(2023, 11, 5, json[Object.keys(json)[1]][j].contents[k].startTime.hour, json[Object.keys(json)[1]][j].contents[k].startTime.minute, json[Object.keys(json)[1]][j].contents[k].endTime.hour, json[Object.keys(json)[1]][j].contents[k].endTime.minute) === 0){
              projectBlocks[k].classList.add("now");
            }
          }
        }
      }
    }    
  }
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

    }
    projectTypeButton.push(`
      </div>
    `)
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
     
      projectTypeButtonActive.push(document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`));
      projectTypeButtonActive[j].addEventListener('click', function(){ //企画タイプのボタンが押されたら
     
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}`).classList.add("active"); //ボタンクリックされた企画タイプを表示
        document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][j].label.en.replace(/ /g, '')}-button`).classList.add("active"); //クリックされた企画タイプボタンをactive
       
        for(let jj=0; jj<json[Object.keys(json)[i]].length; jj++){ //企画タイプをループ
          if (jj !== j){
            document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}`).classList.remove("active"); //それ以外の企画タイプを非表示
            document.querySelector(`.${Object.keys(json)[i]} .${json[Object.keys(json)[i]][jj].label.en.replace(/ /g, '')}-button`).classList.remove("active"); //それ以外の企画タイプボタンを非active
          }
        }     
      });
    }
  }

  window.addEventListener("onload", function(){
    location.reload();
  });  
})();