(async () => {
	const data = await fetch('/data/data.json').then(res => res.json());
	// すべてのステージ企画のHTMLを作成
	await addList(data);
    await addNum(data);
    stageEvent();
	
})();

/* 多言語切り替え */
const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

async function addList(data) {

	const $vote = document.querySelectorAll('#rikotenno1 .vote')[0];
	
	
    for(let i = 0 ; i < data["stage"].length ; i++){
        const isActive = localStorage.getItem(data.stage[i].id);
        const activeStageClass = (isActive == null || isActive == "false") ? "" : "active";

        /* 企画構築 */
        let stage = `<div class="project ${activeStageClass}" id=${data.stage[i].id}>
                        <img src=${data.stage[i].iconPath} alt="">
                        <div class="detail">
                            <div class="project-name">${data.stage[i].projectName[lang]}</div>
                            <div class="group-name">${data.stage[i].groupName[lang]}</div>
                        </div>
                    </div>`
        // 各カテゴリのリストに追加
        $vote.insertAdjacentHTML("beforeend", stage);
    }
}

async function addNum() {
    const $stages = document.querySelectorAll('#rikotenno1 .project');

	for(const $stage of $stages) {
        const stageId = $stage.id;
        const dataGet = {mode: 'get', id: stageId};
        const paramGet = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(dataGet)
          }
        await fetch('https://web2022-vote-pioddimwva-an.a.run.app', paramGet)
          .then((res) => {
            return text = res.text()
          })
          .then((text) => {
            text = checkNum(text);
            $stage.getElementsByClassName("result")[0].innerHTML = text;
          })
          .catch((error) => {
            console.log(error)
          })
	}
}

function stageEvent() {

	const $stages = document.querySelectorAll('#rikotenno1 .project');

	for(const $stage of $stages) {
        const stageId = $stage.id;
		$stage.addEventListener("click", async () => {
            if($stage.classList.contains("active")){
                const data = {mode: 'remove', id: stageId};
                const param = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  body: JSON.stringify(data)
                }
                await fetch('https://web2022-vote-pioddimwva-an.a.run.app', param)
                  .then((res) => {
                    return text = res.text()
                  })
                  .then(async (text) => {
                    if(text == "success"){
                        const dataGet = {mode: 'get', id: stageId};
                        const paramGet = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json; charset=utf-8'
                            },
                            body: JSON.stringify(dataGet)
                          }
                        await fetch('https://web2022-vote-pioddimwva-an.a.run.app', paramGet)
                          .then((res) => {
                            return text = res.text()
                          })
                          .then((text) => {
                            text = checkNum(text);
                            $stage.getElementsByClassName("result")[0].innerHTML = text;
                          })
                          .catch((error) => {
                            console.log(error)
                          })
                    }
                  })
                  .then(() => {
                    $stage.classList.remove("active");
                    localStorage.setItem(stageId, "false");
                  })
                  .catch((error) => {
                    console.log(error)
                  })
            }
            else{
                alert("投票ありがとうございます！理工展をお楽しみください！")
                const data = {mode: 'add', id: stageId};
                const param = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  body: JSON.stringify(data)
                }
                await fetch('https://web2022-vote-pioddimwva-an.a.run.app', param)
                  .then((res) => {
                    return text = res.text()
                  })
                  .then(async (text) => {
                    if(text == "success"){
                        const dataGet = {mode: 'get', id: stageId};
                        const paramGet = {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json; charset=utf-8'
                            },
                            body: JSON.stringify(dataGet)
                          }
                        await fetch('https://web2022-vote-pioddimwva-an.a.run.app', paramGet)
                          .then((res) => {
                            return text = res.text()
                          })
                          .then((text) => {
                            text = checkNum(text);
                            $stage.getElementsByClassName("result")[0].innerHTML = text;
                          })
                          .catch((error) => {
                            console.log(error)
                          })
                    }
                  })
                  .then(() => {
                    $stage.classList.add("active");
                    localStorage.setItem(stageId, "true");
                  })
                  .catch((error) => {
                    console.log(error)
                  })
            }

            
		});
	}   
}

function checkNum(text) {
    if(text == "ID error") return "0";
    else if(parseInt(text) < 0) return "0";
    return text;
}