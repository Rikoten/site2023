(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  

  const json = await fetch('/data/1014_project_data.json').then(res => res.json());
  console.log("json", json);
  console.log(json.general[0].id);
  let contents = []; // 配列を用意
  for (let i=0; i<json.general.length; i++){
    contents.push(`
      <div>
        <div class="img"><img src="/img/projects/${json.general[i].id}/${json.general[i].id}_web_thumbnail.jpg" alt=""></div>
        <div class="desc">
          <div class="project-name">${json.general[i].projectName[lang]}</div>
          <div class="group-name">${json.general[i].groupName[lang]}</div>
          <div class="place">
            <div>${json.general[i].firstDayPlace[lang]}</div>
            <div>${json.general[i].secondDayPlace[lang]}</div>
          </div>
        </div>
      </div>    
    `)
  }
  const contentsJoin = contents.join(""); // 配列の要素を連結して文字列とする

  const exhibition = document.querySelector("#exhibition");

  exhibition.insertAdjacentHTML("afterbegin", contentsJoin);
})()