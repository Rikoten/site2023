(async () =>{
    /* 多言語対応 */
    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";
    const allTagList = ["環境資源",	"模擬店", "理工展主催", "オンライン", "サークル", "研究室",
                        "制作", "実験", "教育", "学生生活", "トークショー", "参加型", "展示",
                        "ファミリー向け", "ロボット", "スポーツ", "受験生向け", "グローバル",
                        "コンピュータ", "建築", "子供向け", "クイズ", "化学", "パフォーマンス",
                        "ゲーム", "生物", "ビジネス", "宇宙", "ものづくり"];

    const allTagListEn = ["Environmental Resources", "Bake Sale", "Rikoten Organizer", "Online", "Circles", "Lab",
                        "production", "experiments", "education", "student life", "talk show", "participatory", "exhibition",
                        "Family", "Robot", "Sports", "Exams", "Global",
                        "Computers", "Architecture", "For children", "Quiz", "Chemistry", "Performance",
                        "Games", "Biology", "Business", "Space", "Manufacturing"];

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
                    <img class="photo" src=${data.iconPath}>

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
                    <li>${data.projectDesc[lang]}</li>
                </ul>

                <div class="ticket-narabi">
                    <div class="ticket"></div>
                    <div class="walk"></div>
                    <div class="onlineticket"></div>
                </div>
            </div>



        <a class="get-onlineticket" href="${data.ticketLink}" target="_blank">
            <p>オンラインチケット取得ページ</p>
        </a>


            <div class="side">
                <p>目次</p>
                <ol>
                    <li class="menu_name">${data.groupName[lang]}</li>
                </ol>
            </div>
            <div class="container">
                <div class="event-info">
                    <h1>${data.groupName[lang]}</h1>
                    <p>${data.groupDesc[lang]}</p>
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
                    <li>${data.projectDesc[lang]}</li>
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
        
            const bool = false;
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



    if(data.groupTwitterUrl!=null){
        const tw1 = [];
        tw1.push(`
            <a href="${data.groupTwitterUrl}"><img class="twitter" src="/img/event/グループ 66.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw1)
    }else{
        const tw2 = [];
        tw2.push(`
            <a><img class="twitter gray" src="/img/event/グループ 66.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", tw2)
    }

    if(data.groupHpUrl!=null){
        const hp1 = [];
        hp1.push(`
            <a href="${data.groupHpUrl}"><img class="hp" src="/img/event/グループ 65.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp1)
    }else{
        const hp2 = [];
        hp2.push(`
            <a><img class="hp gray" src="/img/event/グループ 65.png"></a>
        `)
        upper_class.insertAdjacentHTML("afterbegin", hp2)
    }

    if(data.groupInstagramUrl!=null){
        const insta1 = [];
        insta1.push(`
            <a href="${data.groupInstagramUrl}"><img class="instagram" src="/img/event/グループ 68.png"></a>
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
            <a href="${data.groupFacebookUrl}"><img class="facebook" src="/img/event/グループ 67.png"></a>
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
    if (data.placeFirstDay.ja == data.placeSecondDay.ja){
        data.isOnline ? place.push(`オンライン`) : 
        place.push(`${data.placeSecondDay[lang]}`);
        place_tag.insertAdjacentHTML("beforeend", place);        
    }
    else if((data.placeFirstDay.ja != null && data.placeSecondDay.ja == null) || (data.placeFirstDay.ja == null && data.placeSecondDay.ja != null))
    {
        if(data.placeFirstDay.ja != null){
            place.push(`11/5 : ${data.placeFirstDay[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);    
        }else{
            place.push(`11/6 : ${data.placeSecondDay[lang]}`);
            place_tag.insertAdjacentHTML("beforeend", place);
        }

    }else{
        place.push(`11/5 : ${data.placeFirstDay[lang]}<br>11/6 : ${data.placeSecondDay[lang]}`);
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
    /****チケットの判別****/
    const ticket_tag = document.getElementsByClassName("ticket")[0];
    const walk_tag = document.getElementsByClassName("walk")[0];
    const onlineticket_tag = document.getElementsByClassName("onlineticket")[0];
    data.hasOfflineTicket ? ticket_tag.insertAdjacentHTML("beforeend" ,`<p>整理券が必要です</p>`) :ticket_tag.classList.add("inactive") 
    data.isWalkRally ? walk_tag.insertAdjacentHTML("beforeend" ,`<p>ウォークラリー<br>対象企画</p>`) :walk_tag.classList.add("inactive") 
    data.hasOnlineTicket ? onlineticket_tag.insertAdjacentHTML("beforeend" ,'<p>オンラインチケット<br>が必要です</p>') :onlineticket_tag.classList.add("inactive") 

    
    /*****オンラインチケットゲットへのリンク *****/
    const ticketlink_tag = document.getElementsByClassName("get-onlineticket")[0];
    if(data.ticketLink == null){
        ticketlink_tag.classList.add("inactive")
    }else{

    }

    /***目次***/
    const li1_tag = document.getElementsByClassName("menu_name")[0];
    
    for(let i=0; i<data.detailContents.length; i++){
        var menu_list=[];
        menu_list.push(`
            <li>${data.detailContents[i].bigHeadline[lang]}</li>
            <ol class="child_ol"></ol>
        `)
        li1_tag.insertAdjacentHTML("beforeend", menu_list);
        var ol_tag = document.getElementsByClassName("child_ol")[i];
        
        for(let j=0; j<data.detailContents[i].articles.length;j++){
            const mokuji_list =[]
            mokuji_list.push(`
                <li>${data.detailContents[i].articles[j].headline[lang]}</li>
            `)
            ol_tag.insertAdjacentHTML("beforeend", mokuji_list);
        }
    }

    /*****本文*****/
    const article_wrapper = document.getElementsByClassName("article_wrapper")[0];

    for(let i=0; i<data.detailContents.length; i++){
        article_wrapper.insertAdjacentHTML("beforeend", `<div class="introduce"></div>`)
        const article_tag = document.getElementsByClassName("introduce")[i];
        const article=[]
        article.push(`
        <div>
            <h2 class="bighead">${data.detailContents[i].bigHeadline[lang]}</h2>
            <ul class="article_sentence"></ul>
        </div>

        `)
        article_tag.insertAdjacentHTML("beforeend", article);
       
        /******画像の分岐 ******/
        const h2_bighead = document.getElementsByClassName("bighead")[i];
        if(data.detailContents[i].bigHeadlineImages!=""){
            for(let j=0; j<data.detailContents[i].bigHeadlineImages.length; j++){
                const big_img=[];
                big_img.push(`
                <div class="disp-img">
                    <img src="${data.detailContents[i].bigHeadlineImages[j].imagePath}">
                </div>   
                `)
                h2_bighead.insertAdjacentHTML("beforeend", big_img);
            }

        }else{}
        if(data.detailContents[i].bigHeadlineMovieLinks!=""){
            for(let j=0; j<data.detailContents[i].bigHeadlineMovieLinks.length; j++){            
                const link = data.detailContents[i].bigHeadlineMovieLinks[j].split("/");
                const big_mov=[];
                big_mov.push(`
                <div class="disp-video">
                <iframe src="https://www.youtube.com/embed/${link[3]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>   
                `)
                h2_bighead.insertAdjacentHTML("afterend", big_mov);
            }

        }else{}
        

        const ul_tag= document.getElementsByClassName("article_sentence")[i];
        for(let j=0; j<data.detailContents[i].articles.length; j++){
            const ul_li =[];
            ul_li.push(`
                <li>${data.detailContents[i].articles[j].headline[lang]}</li>
                <p class="li_p_${i}">${data.detailContents[i].articles[j].body[lang]}</p>
            `)
            ul_tag.insertAdjacentHTML("beforeend", ul_li);
        
            /*****pの下の画像たち *****/
            if(data.detailContents[i].articles[j].headlineImages!=""){
                const sm_img=[];
                const li_p = document.getElementsByClassName(`li_p_${i}`)[j];
                for(let k=0; k<data.detailContents[i].articles[j].headlineImages.length; k++){
                    sm_img.push(`
                    <div class="disp-img">
                        <img src="${data.detailContents[i].articles[j].headlineImages[k].imagePath}">
                    </div>   
                    `)
                }
                li_p.insertAdjacentHTML("afterend", sm_img);

            }else{}
            if(data.detailContents[i].articles[j].headlineMovieUrls!=""){
                const sm_mov=[];
                const li_p = document.getElementsByClassName(`li_p_${i}`)[j];
                for(let k=0; k<data.detailContents[i].articles[j].headlineMovieUrls.length; k++){
                    const link = data.detailContents[i].articles[j].headlineMovieUrls[k].split("/");
                    sm_mov.push(`
                    <div class="disp-video">
                    <iframe src="https://www.youtube.com/embed/${link[3]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>   
                    `)
                }
                li_p.insertAdjacentHTML("afterend", sm_mov);

            }else{}
        }

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