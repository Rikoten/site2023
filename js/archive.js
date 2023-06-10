(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

  /* JSONデータ取得 ---------
  --------------------------*/
  const json = await fetch('/data/timetabele_data_web.json').then(res => res.json());

  /* DOM取得 ---------------
  --------------------------*/
  const contentWrapper = document.querySelector(".content-wrapper");

  /* HTML要素追加 -----------
  --------------------------*/ 
  const contents = []; //配列を用意
  for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
    for (let k=0; k<json[Object.keys(json)[i]][0].contents.length; k++){ //各企画をループ
      contents.push(`
        <div class="${Object.keys(json)[i]} project">
          <div class="now-playing">現在公演中</div>
          <a href="/projects/archive/movie/?id=${json[Object.keys(json)[i]][0].contents[k].id}" target="blank">
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
  contents.pop(); //理工展No.1を削除
  const contentsJoin = contents.join(""); //配列の要素を連結して文字列とする
  contentWrapper.insertAdjacentHTML("afterbegin", contentsJoin);  

  /* 企画終了 / 現在公演中 -- 
  --------------------------*/
  window.addEventListener("load", AddClassFinishedNow); //ロードされたら時間を確認してクラス付与/削除
  //setInterval(AddClassFinishedNow, 1000); //1秒ごとに時間を確認してクラス付与/削除

  function AddClassFinishedNow(){
    const projectBlocks = [];
    for (i=0; i<Object.keys(json).length; i++){
      projectBlocks[i] = [];
    }
    for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
      projectBlocks[i].push(document.querySelectorAll(`.${Object.keys(json)[i]}.project`));
    }
    for (let i=0; i<Object.keys(json).length; i++){ //1日目・2日目をループ
      for (let k=0; k<json[Object.keys(json)[i]][0].contents.length; k++){ //各企画をループ
        if (i === 0){ //1日目は2022/11/5
          if (TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][0].contents[k].startTime.hour, json[Object.keys(json)[0]][0].contents[k].startTime.minute, json[Object.keys(json)[0]][0].contents[k].endTime.hour, json[Object.keys(json)[0]][0].contents[k].endTime.minute) === 0){  
            projectBlocks[i][0][k].classList.add("now");  
          } else if(TimeCompare(2022, 11, 5, json[Object.keys(json)[0]][0].contents[k].startTime.hour, json[Object.keys(json)[0]][0].contents[k].startTime.minute, json[Object.keys(json)[0]][0].contents[k].endTime.hour, json[Object.keys(json)[0]][0].contents[k].endTime.minute) === 1){
            projectBlocks[i][0][k].classList.add("future");
            projectBlocks[i][0][k].classList.remove("now");
            projectBlocks[i][0][k].classList.add("future");
          } 
        } else if (i === 1){ //2日目は2022/11/6
          if (TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[1]][0].contents[i].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute) === 0){  
            projectBlocks[i][0][k].classList.add("now");  
          } else if(TimeCompare(2022, 11, 6, json[Object.keys(json)[i]][0].contents[k].startTime.hour, json[Object.keys(json)[i]][0].contents[k].startTime.minute, json[Object.keys(json)[i]][0].contents[k].endTime.hour, json[Object.keys(json)[i]][0].contents[k].endTime.minute) === 1){
            if (k !== json[Object.keys(json)[i]][0].contents.length-1){ //理工展no.1を除く
              projectBlocks[i][0][k].classList.remove("now");
              projectBlocks[i][0][k].classList.add("future");
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

})();