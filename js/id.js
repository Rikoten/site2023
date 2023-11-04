(async () => {
    /* 多言語対応 */
    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";
    const allTagList = ["サークル", "研究室", "インカレ", "理工展連絡会", "制作", "設計", "防災", "実験", "教育", "環境", "資源", "学生生活", "トークショー",
        "参加型", "展示", "ファミリー向け", "謎解き", "ロケット", "アニメ", "上映会", "ロボット", "天体観測", "スポーツ", "受験生向け", "グローバル", "プレゼン", "コンピュータ", "スマホ",
        "建築", "相談", "子ども向け", "クイズ", "化学", "パフォーマンス", "ゲーム", "eスポーツ", "数学", "研究", "大学院", "生物", "SDGs", "飲食", "フード", "ドリンク", "スイーツ", "ダンス"];

    const allTagListEn = ["Circle", "Laboratory", "Intercollegiate", "Rikoten", "Production", "Design", "Disaster Prevention",
        "Experiment", "Education", "Environment", "Resources", "Student Life", "Talk Show", "Participatory", "Exhibition", "Family", "Riddle", "Rocket", "Anime", "Screening", " Robots", "Astronomy", "Sports", "For Students",
        "Global", "Presentations", "Computers", "Smartphones", "Architecture", "Consultation", "For Children", "Quiz", "Chemistry", "Performance", "Games", "eSports", "Mathematics", "Research", "Graduate", "Biology ", "SDGs", "Food & Beverage", "Food", "Drink", "Sweets", "Dance"];

    const json = await fetch('/data/1104_3_project_data.json?date=20231104').then(res => res.json());

    const maintag = document.getElementsByTagName("main")[0];
    var urlSearch = location.search.substring(1);

    var idnum = urlSearch.split("=");//id番号の代入

    const contents = ["general", "stage", "experiment", "shops", "online"]

    var category = "";
    var number = "";

    for (let j = 0; j < contents.length; j++) {
        for (let i = 0; i < json[`${contents[j]}`].length; i++) {
            if (`${json[`${contents[j]}`][i].id}` == idnum[1]) {
                category = `${contents[j]}`;
                number = i;
                break
            }
        }
    }
    const data = json[`${category}`][number];
    console.log(data);

    const insert = [];
    const day_off = []

    const sideText = {
      ja: "目次",
      en: "Contents"
    }

    insert.push(
        `<section id = "event">
            <div class="event-main">
                <div class="upup">
                    <img class="photo" src=${data.thumbnailPath.web}>

                    <div class="rightside">
                        <h1>${data.projectName[lang]}</h1>
                        <div class="iconicon">                            
                            <h2>${data.groupName[lang]}</h2>
                            <h2 id="location"></h2>
                            <h2 id="walkrally"></h2>
                        </div>
                    </div>
                </div>
                <div class="tag"></div>
                <ul>
                    <li>${data.projectDetail[lang]}</li>
                </ul>
                <div class="ticket"></div>
            </div>

        </a>
            <div class="side">
                <p>${sideText[lang]}</p>
                <ol>
                    <li class="menu_name">${data.groupName[lang]}</li>
                </ol>
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
                <div class = "subarticle_wrapper"></div>
                <div class = "pdf_wrapper"></div>
                <div class = "link_wrapper"></div>
            </div>

            
            </div>
            
        </div>
    </section>`
    )

    day_off.push(
        `<section id = "event">
            <div class="event-main">
                <div class="upup">
                    <img class="photo" src=${data.thumbnailPath.web}>

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
    if (bool) {
        maintag.insertAdjacentHTML("afterbegin", insert);
    } /*else {
        maintag.insertAdjacentHTML("afterbegin", day_off);
    }*/

    //*********SNSリンク**********//
    const hp_tag = document.getElementsByClassName("hp")[0];
    const twitter_tag = document.getElementsByClassName("twitter")[0];
    const instagram_tag = document.getElementsByClassName("instagram")[0];
    const facebook_tag = document.getElementsByClassName("facebook")[0];

    const upper_class = document.getElementsByClassName("upper")[0];
    const lower_class = document.getElementsByClassName("lower")[0]



    if (data.url.twitter != "") {
        const tw1 = [];
        tw1.push(`
            <a href="${data.url.twitter}" target=blank rel="noopener noreferrer"><img class="twitter" src="/img/event/Twitter_tab.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw1)
    } /*else {
        const tw2 = [];
        tw2.push(`
            <a><img class="twitter gray" src="/img/event/Twitter_tab.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw2)
    }*/

    if (data.url.hp != "") {
        const hp1 = [];
        hp1.push(`
            <a href="${data.url.hp}" target=blank rel="noopener noreferrer"><img class="hp" src="/img/event/HP_tab.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp1)
    } /*else {
        const hp2 = [];
        hp2.push(`
            <a><img class="hp gray" src="/img/event/HP_tab.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp2)
    }*/

    if (data.url.instagram != "") {
        const insta1 = [];
        insta1.push(`
            <a href="${data.url.instagram}" target=blank rel="noopener noreferrer"><img class="instagram" src="/img/event/Instagram_tab.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", insta1)
    } /*else {
        const insta2 = [];
        insta2.push(`
            <a><img class="instagram gray" src="/img/event/Instagram_tab.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", insta2)
    }*/

    if (data.url.facebook != "") {
        const face1 = [];
        face1.push(`
            <a href="${data.url.facebook}" target=blank rel="noopener noreferrer"><img class="facebook" src="/img/event/facebook_tab.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", face1)
    } /*else {
        const face2 = [];
        face2.push(`
            <a><img class="facebook gray" src="/img/event/facebook_tab.png"></a>
        `)
        lower_class.insertAdjacentHTML("afterbegin", face2)
    }*/
    //*********場所の表示**********//
    const place_tag = document.getElementById("location");
    const place = [];

    const placeTextOnline = {
      ja: "オンライン",
      en: "Online"
    }

    if (data.firstDayPlace.ja == data.secondDayPlace.ja) {
        data.isOnline ? place.push(`${placeTextOnline[lang]}`) :
            place.push(`${data.secondDayPlace[lang]}`);
        place_tag.insertAdjacentHTML("beforeend", place);
    }
    else if ((data.firstDayPlace.ja != "-" && data.secondDayPlace.ja == "-") || (data.firstDayPlace.ja == "-" && data.secondDayPlace.ja != "-")) {
        if (data.firstDayPlace.ja != "-") {
            place.push(`11/4 : ${data.firstDayPlace[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);
        } else {
            place.push(`11/5 : ${data.secondDayPlace[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);
        }

    } else {
        place.push(`11/4 : ${data.firstDayPlace[lang]}<br>11/5 : ${data.secondDayPlace[lang]}`);
        place_tag.insertAdjacentHTML("beforeend", place);
    }
    //*********ウォークラリーの表示**********//
    const walkrally_tag = document.getElementById("walkrally");
    const walkrallyText = {
      ja: "ウォークラリー対象企画",
      en: "Walkrally Eligible Projects"
    }
    // const walk = [];
    // if (data.isWalkRally) {
    //     walk.push(`ウォークラリー企画`);
    //     walkrally_tag.insertAdjacentHTML("beforeend", walk);
    // }
    data.isWalkRally ? walkrally_tag.insertAdjacentHTML("beforeend", `${walkrallyText[lang]}`) : walkrally_tag.classList.add("inactive")

    /****タグの追加 ****/
    const tag_tag = document.getElementsByClassName("tag")[0]
    for (const tag of data.tags) {
        let tagLang = "";
        if (lang == "ja") {
            tagLang = tag;
        }
        else {
            tagLang = allTagListEn[allTagList.indexOf(tag)];
        }
        let tag1 = `<span># ${tagLang}</span>`
        tag_tag.insertAdjacentHTML("beforeend", tag1);
    }
    /****チケットの判別****/
    const ticket_tag = document.getElementsByClassName("ticket")[0];
    const ticketText = {
      ja: "整理券が必要です",
      en: "Numbered tickets required"
    }
    data.hasTicket ? ticket_tag.insertAdjacentHTML("beforeend", `<p class="ticket_anounce">${ticketText[lang]}</p><p>${data.ticketDetail[lang]}</p>`) : ticket_tag.classList.add("inactive");

    /***目次***/
    const li1_tag = document.getElementsByClassName("menu_name")[0];
    var menu_list = [];
    menu_list.push(`
    <li>${data.mainArticle.bigHeadline[lang]}</li>
    <ol class="child_ol"></ol>
`);
    li1_tag.insertAdjacentHTML("beforeend", menu_list);

    var ol_tag = document.querySelector(".child_ol");

    for (let j = 0; j < data.mainArticle.articles.length; j++) {
        const mokuji_list = [];
        mokuji_list.push(`
        <li>${data.mainArticle.articles[j].headline[lang]}</li>
    `);
        ol_tag.insertAdjacentHTML("beforeend", mokuji_list);
    }

    const li2_tag = document.getElementsByClassName("menu_name")[0];
    if (data.subArticles.length > 0) {
        for (let i = 0; i < data.subArticles.length; i++) {
            const submenu_list = [];
            submenu_list.push(`
              <li>${data.subArticles[i].bigHeadline[lang]}</li>
              <ol class="subchild_ol"></ol>
            `);

            li2_tag.insertAdjacentHTML("beforeend", submenu_list);
            const subol_tag = li2_tag.querySelector(".subchild_ol:last-child"); // 最後のol要素を取得

            for (let j = 0; j < data.subArticles[i].articles.length; j++) {
                const submokuji_list = [];
                submokuji_list.push(`
                <li>${data.subArticles[i].articles[j].headline[lang]}</li>
              `);
                subol_tag.insertAdjacentHTML("beforeend", submokuji_list);
            }
        }
    }

    /*****本文*****/
    const article_wrapper = document.getElementsByClassName("article_wrapper")[0];
    if (data.mainArticle.articles.length > 0) {

        article_wrapper.insertAdjacentHTML("beforeend", `<div class="introduce"></div>`)
        const article_tag = document.querySelector(".introduce");
        const article = []
        article.push(`
        <div>
            <h2 class="bighead">${data.mainArticle.bigHeadline[lang]}</h2>
            <ul class="article_sentence"></ul>
        </div>

        `)
        article_tag.insertAdjacentHTML("beforeend", article);

        const ul_tag = document.querySelector(".article_sentence");
        for (let j = 0; j < data.mainArticle.articles.length; j++) {
            const ul_li = [];
            ul_li.push(`
                <li>${data.mainArticle.articles[j].headline[lang]}</li>
                <p class="li_p">${data.mainArticle.articles[j].body[lang]}</p>
            `)
            if (data.mainArticle.articles[j].images != "") {
                for (let k = 0; k < data.mainArticle.articles[j].images.length; k++) {
                    ul_li.push(`
                        <div class="disp-img">
                        <img src="${data.mainArticle.articles[j].images[k].imagePath}">
                        <div class="caption"> ${data.mainArticle.articles[j].images[k].caption[lang]}</div>
                        </div>   
                        `)
                }
            } else { }
            if (data.mainArticle.articles[j].movies != "") {
                for (let k = 0; k < data.mainArticle.articles[j].movies.length; k++) {
                    const link = data.mainArticle.articles[j].movies[k].moviePath.split("/");
                    console.log(link[3]);
                    ul_li.push(`
                        <div class="disp-video">
                        <iframe src="https://www.youtube.com/embed/${link[3]}?si=iIQ7upbMzS5PySMi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>   
                        `)
                }
            } else { }
            ul_tag.insertAdjacentHTML("beforeend", ul_li.join(''));
        }
    }


    /*****サブ本文*****/
    const subarticle_wrapper = document.getElementsByClassName("subarticle_wrapper")[0];

    for (let i = 0; i < data.subArticles.length; i++) {
        // 各subArticle用にsubintroduce divを作成します
        subarticle_wrapper.insertAdjacentHTML("beforeend", `<div class="subintroduce"></div>`);
        const subarticle_tag = document.querySelectorAll(".subintroduce")[i];
        const subarticle = [];
        subarticle.push(`
        <div>
            <h2 class="subbighead">${data.subArticles[i].bigHeadline[lang]}</h2>
            <ul class="subarticle_sentence"></ul>
        </div>
    `);
        subarticle_tag.insertAdjacentHTML("beforeend", subarticle);

        const subul_tag = subarticle_tag.querySelector(".subarticle_sentence");
        for (let j = 0; j < data.subArticles[i].articles.length; j++) {
            const subul_li = [];
            subul_li.push(`
            <li>${data.subArticles[i].articles[j].headline[lang]}</li>
            <p class="li_p">${data.subArticles[i].articles[j].body[lang]}</p>
        `);
            if (data.subArticles[i].articles[j].images != "") {
                for (let k = 0; k < data.subArticles[i].articles[j].images.length; k++) {
                    subul_li.push(`
                    <div class="disp-img">
                    <img src="${data.subArticles[i].articles[j].images[k].imagePath}">
                    <div class="caption">${data.subArticles[i].articles[j].images[k].caption[lang]}</div>
                    </div>
                `);
                }
            }
            if (data.subArticles[i].articles[j].movies != "") {
                for (let k = 0; k < data.subArticles[i].articles[j].movies.length; k++) {
                    const link = data.subArticles[i].articles[j].movies[k].moviePath.split("/");
                    subul_li.push(`
                    <div class="disp-video">
                    <iframe src="https://www.youtube.com/embed/${link[3]}?si=iIQ7upbMzS5PySMi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `);
                }
            }
            subul_tag.insertAdjacentHTML("beforeend", subul_li.join(''));
        }
    }

    /* pdf */
    // if (data.id == "A-02" || data.id == "B-07") {
    //     const pdf_wrapper = document.getElementsByClassName("pdf_wrapper")[0];
    //     pdf_wrapper.insertAdjacentHTML("beforeend", `
    //                                 <div class="pdf-content">
    //                                     <div class="pdf-desc">${data.pdfContents[0].desc[lang]}</div>
    //                                     <a href=${data.pdfContents[0].link}>
    //                                         <div class="pdf-button">PDF</div>
    //                                     </a>
    //                                 </div>`)
    // }

    if (data.endSentenceLink.length !== 0){
      const link_wrapper = document.getElementsByClassName("link_wrapper")[0];
      const linkText = {
        ja: "文末リンク",
        en: "Links"
      }
      const linkHTML = [];
      linkHTML.push(`<div class="link-content"><h3>${linkText[lang]}</h3><ul>`)
      for (let i=0; i<data.endSentenceLink.length; i++){
        linkHTML.push(`
          <li>${data.endSentenceLink[i].pageName[lang]}：
            <a href="${data.endSentenceLink[i].url}" target=blank rel="noopener noreferrer">${data.endSentenceLink[i].url}</a>    
          </li>
        `)
      }
      linkHTML.push(`</ul></div>`)
      const linkHTMLjoin = linkHTML.join("")
      link_wrapper.insertAdjacentHTML("beforeend", linkHTMLjoin);

      li2_tag.insertAdjacentHTML("beforeend", `<li>${linkText[lang]}</li>`)
    }
})()