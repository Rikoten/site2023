(async () =>{
    /* 多言語対応 */

    console.log("rasubosu");
    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";
    const allTagList = ["サークル", "研究室", "インカレ", "理工展連絡会", "制作", "設計", "防災", "実験", "教育", "環境", "資源", "学生生活", "トークショー", "参加型", "展示", "ファミリー向け", "謎解き", "ロケット", "アニメ", "上映会", "ロボット", "天体観測", "スポーツ", "受験生向け", "グローバル", "プレゼン", "コンピュータ", "スマホ", "建築", "相談", "子ども向け", "クイズ", "化学", "パフォーマンス", "ゲーム", "eスポーツ", "数学", "研究", "大学院", "生物", "SDGs", "飲食", "フード", "ドリンク", "スイーツ", "ダンス"];

    const allTagListEn = ["Circles", "Lab", "Intercollegiate", "Rikoten Contact", "Production", "Design", "Disaster Prevention", "Experiments", "Education", "Environment", "Resources", "Student Life", "Talk Show", "Participatory", "Exhibition", "Family", "Mystery Solving", "Rocket", "Anime", "Screening", "Robot", "Astronomical Observation", "Sports", "For Examinees", "Global", "Presentation", "Computer", "Smartphone", "Architecture", "Consultation", "For Children", "Quiz", "Chemistry", "Performance", "Game", "eSports", "Math", "Research", "Graduate School", "Biology", "SDGs", "Food and Drink", "Food", "Drink", "Sweets", "Dance"];

    const json = await fetch('/data/data.json').then(res => res.json());
    const maintag = document.getElementsByTagName("main")[0]; 
    var urlSearch = location.search.substring(1);
    
    var idnum = urlSearch.split("=");//id番号の代入
    
    const contents = ["general", "stage", "experiment","shops"]

    var category = "";
    var number = "";

    for (let j=0; j<contents.length; j++){
        for (let i=0; i<json[`${contents[j]}`].length; i++){
            if(`${json[`${contents[j]}`][i].id}`==idnum[1]){
                category = `${contents[j]}`;
                number = i;
            }
        }
    }

    const data = json[`${category}`][number];
    
    const insert=[];
    const day_off = []

    insert.push(
        `<section id = "event">
            <div class="event-main">
                <div class="upup">
                    <img class="photo" src=${data.thumbnailPath["web"]}>

                    <div class="rightside">
                        <h1>${data.projectName[lang]}</h1>
                        <div class="iconicon">                            
                            <h2>${data.groupName[lang]}</h2>
                            <h2 id="location"></h2>
                        </div>
                    </div>
                </div>
                <div class="tag"></div>
                <ul>
                    <li>${data.projectDetail[lang]}</li>
                </ul>

            </div>



            <div class="container">
                <div class="event-info">
                    <h1>${data.groupName[lang]}</h1>
                    <p>${data.groupDetail[lang]}</p>
                <div class="upper">
                </div>
                <div class="lower">
                </div>
                </div>
                    
                <div class = "article_wrapper"></div>
                <div class = "pdf_wrapper"></div>
            </div>

            
            </div>
            
        </div>
    </section>`
    )
    
    day_off.push(
        `<section id = "event">
            <div class="event-main">
                <div class="upup">
                    <img class="photo" src=${data.iconPath}>

                    <div class="rightside">
                        <h1>${data.projectName[lang]}</h1>
                        <div class="iconicon">                            
                            <h2>${data.groupName[lang]}</h2>
                        </div>
                    </div>
                </div>
                <div class="tag"></div>
                <ul>
                    <li>${data.projectDetail[lang]}</li>
                </ul>

            </div>
            <div class="apporogize">
                <div class="pass langCng" lang="ja">
                    <p>公開終了いたしました。<br>ありがとうございました。</p>
                </div>
                <div class="yaguchi">
                    <img src="../../img/event/bloom矢口.png">
                </div>
            </div>`)
        
            const bool = true;
            if(bool){
                maintag.insertAdjacentHTML("afterbegin", insert);
            }else{
                maintag.insertAdjacentHTML("afterbegin", day_off);
            }

    //*********SNSリンク**********//
    const hp_tag = document.getElementsByClassName("hp")[0];
    const twitter_tag = document.getElementsByClassName("twitter")[0];
    const instagram_tag = document.getElementsByClassName("instagram")[0];
    const facebook_tag = document.getElementsByClassName("facebook")[0];

    const upper_class = document.getElementsByClassName("upper")[0];
    const lower_class = document.getElementsByClassName("lower")[0]



    if(data.url["twitter"]!=null){
        const tw1 = [];
        tw1.push(`
            <a href="${data.url["twitter"]}"><img class="twitter" src="/img/event/グループ 66.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw1)
    }else{
        const tw2 = [];
        tw2.push(`
            <a><img class="twitter gray" src="/img/event/グループ 66.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw2)
    }

    if(data.url["hp"]!=null){
        const hp1 = [];
        hp1.push(`
            <a href="${data.url["hp"]}"><img class="hp" src="/img/event/グループ 65.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp1)
    }else{
        const hp2 = [];
        hp2.push(`
            <a><img class="hp gray" src="/img/event/グループ 65.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp2)
    }

    if(data.url["instagram"]!=null){
        const insta1 = [];
        insta1.push(`
            <a href="${data.url["instagram"]}"><img class="instagram" src="/img/event/グループ 68.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", insta1)
    }else{
        const insta2 = [];
        insta2.push(`
            <a><img class="instagram gray" src="/img/event/グループ 68.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", insta2)
    }

    if(data.groupFacebookUrl!=null){
        const face1 = [];
        face1.push(`
            <a href="${data.url["facebook"]}"><img class="facebook" src="/img/event/グループ 67.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", face1)
    }else{
        const face2 = [];
        face2.push(`
            <a><img class="facebook gray" src="/img/event/グループ 67.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", face2)
    }
    //*********場所の表示**********//
    const place_tag = document.getElementById("location");
    const place =[];
    if (data.firstDayPlace.ja == data.secondDayPlace.ja){
        data.isOnline ? place.push(`オンライン`) : 
        place.push(`${data.secondDayPlace[lang]}`);
        place_tag.insertAdjacentHTML("beforeend", place);        
    }
    else if((data.firstDayPlace.ja != null && data.secondDayPlace.ja == null) || (data.firstDayPlace.ja == null && data.secondDayPlace.ja != null))
    {
        if(data.firstDayPlace.ja != null){
            place.push(`11/5 : ${data.firstDayPlace[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);    
        }else{
            place.push(`11/6 : ${data.secondDayPlace[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);
        }

    }else{
        place.push(`11/5 : ${data.firstDayPlace[lang]}<br>11/6 : ${data.secondDayPlace[lang]}`);
        place_tag.insertAdjacentHTML("beforeend", place);
    }

    /****タグの追加 ****/
    const tag_tag = document.getElementsByClassName("tag")[0]
    for(const tag of data.tags){
        let tagLang = "";
        if(lang == "ja"){
            tagLang = tag;
        }
        else {
            tagLang = allTagListEn[allTagList.indexOf(tag)];
        }
        let tag1 = `<span># ${tagLang}</span>`
        tag_tag.insertAdjacentHTML("beforeend", tag1);
    }

    /* pdf */
    if(data.id == "A-02" || data.id == "B-07"){
        const pdf_wrapper = document.getElementsByClassName("pdf_wrapper")[0];
        pdf_wrapper.insertAdjacentHTML("beforeend", `
                                    <div class="pdf-content">
                                        <div class="pdf-desc">${data.pdfContents[0].desc[lang]}</div>
                                        <a href=${data.pdfContents[0].link}>
                                            <div class="pdf-button">PDF</div>
                                        </a>
                                    </div>`)
    }
})()