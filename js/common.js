(async () =>{
  const sessionKey = "accesed";
  const sessionValue = "true";
  //初回アクセス時のみ
  if (localStorage.getItem(sessionKey) != "true") {
    await setLang();
    localStorage.setItem(sessionKey, sessionValue);
  }
  changeLang();
  await setHeaderFooter();
  await langEvent();
})();

async function setLang() {
  if(window.localStorage) {
    const lang = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0,2) == "ja" ? "ja" : "en";
    localStorage.setItem("lang", lang);
  }
}

function changeLang() {
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

  const $langElms = document.getElementsByClassName("langCng");
  for (const $elm of $langElms) {
    if($elm.getAttribute("lang") == lang){
      $elm.style.display = '';
    }
    else{
      $elm.style.display = 'none';
    }
  }
}


async function setHeaderFooter() {

    const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";
    
    const headerLang = {
                        "projects":{"ja": "企画情報", "en": "Projects"},
                        "participants":{"ja": "出展団体", "en": "Participants"},
                        "collab":{"ja": "飲食店コラボ", "en": "Collab"},
                        "specialguest":{"ja": "有名人企画", "en": "Special Guest"},
                        "about":{"ja": "理工展とは", "en": "About"},
                        "theme":{"ja": "今年のテーマ", "en": "Theme"},
                        "lastyear":{"ja": "昨年度の様子", "en": "Last Year's Rikoten"},
                        "info":{"ja": "お知らせ", "en": "Info"},
                        "app":{"ja": "アプリ紹介", "en": "App"},
                        "faq":{"ja": "よくある質問", "en": "FAQ"},
                        "contact":{"ja": "お問い合わせ", "en": "Contact"},
                        "privacy":{"ja": "プライバシーポリシー", "en": "Privacy Policy"}
                      }


    const head=[];
    const headerelement = document.getElementsByTagName("header")[0];//getElementsByTagNameは配列

    const jaActive = lang == "ja" ? "active" : "";
    const enActive = lang == "en" ? "active" : "";

    head.push(`
    <div class="menu_bar">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <nav>
        <div class="pcmenu">
            <div id="logo"><a href="/"><img src="/img/common/logo-spark.png"></a></div>
            <ul>
            <li class="pulldown" id="header-projects">${headerLang.projects[lang]}
                <ul>
                    <li><a href="/projects/participants">${headerLang.participants[lang]}</a></li>
                    <li><a href="/projects/collab">${headerLang.collab[lang]}</a></li>
                    <li><a href="/projects/specialguest">${headerLang.specialguest[lang]}</a></li>
                </ul>
            </li>
            <li class="pulldown" id="header-about">${headerLang.about[lang]}
                <ul>
                    <li><a href="/about/about">${headerLang.about[lang]}</a></li>
                    <li><a href="/about/theme">${headerLang.theme[lang]}</a></li>
                    <li><a href="/about/lastyear">${headerLang.lastyear[lang]}</a></li>
                </ul>
            </li>
            <li class="pulldown" id="header-info">${headerLang.info[lang]}
                <ul>
                <li><a href="/info/app">${headerLang.app[lang]}</a></li>
                <li><a href="/info/FAQ">${headerLang.faq[lang]}</a></li>
                <li><a href="/info/contact">${headerLang.contact[lang]}</a></li>
                <li><a href="/info/privacy">${headerLang.privacy[lang]}</a></li>
                </ul>
            </li>
            </ul>
            <div class="jaen">
              <div class="ja ${jaActive}">Ja</div>
              <span>/</span>
              <di class="en ${enActive}">En</di>
            </div>
        </div>
    </nav>
    <div class="phone-menu">
    <li id="logo"><a href="/"><img src="/img/common/logo-spark.png"></a></li>
        <ul class="include-accordion scroll-control">
            <li>
            <button class="accordionBtn" type="button">${headerLang.projects[lang]}</button>
            <ul>
                <li><a href="/projects/participants">${headerLang.participants[lang]}</a></li>
                <li><a href="/projects/collab">${headerLang.collab[lang]}</a></li>
                <li><a href="/projects/specialguest">${headerLang.specialguest[lang]}</a></li>
            </ul>
            </li>
            <li>
            <button class="accordionBtn" type="button">${headerLang.about[lang]}</button>
            <ul>
                <li><a href="/about/about">${headerLang.about[lang]}</a></li>
                <li><a href="/about/theme">${headerLang.theme[lang]}</a></li>
                <li><a href="/about/lastyear">${headerLang.lastyear[lang]}</a></li>
            </ul>
            </li>
            <li>
            <button class="accordionBtn" type="button">${headerLang.info[lang]}</button>
            <ul>
                <li><a href="/info/app">${headerLang.app[lang]}</a></li>
                <li><a href="/info/FAQ">${headerLang.faq[lang]}</a></li>
                <li><a href="/info/contact">${headerLang.contact[lang]}</a></li>
                <li><a href="/info/privacy">${headerLang.privacy[lang]}</a></li>
            </ul>
            </li>
        </ul>
        <div class="jaen">
          <div class="ja ${jaActive}">Ja</div>
          <span>/</span>
          <di class="en ${enActive}">En</di>
        </div>
    </div>
    `)
    headerelement.insertAdjacentHTML("afterbegin", head);

    const pcmenu = document.querySelector(".pcmenu > ul");
    const pulldown = [...pcmenu.querySelectorAll("li.pulldown")];
    console.log(pulldown)

    //console.log("pulldown", pulldown[0]);

    pcmenu.addEventListener("mouseover", () =>{
      document.addEventListener("mouseover", (e)=>{
        if (pulldown.includes(e.target)){
          hpulldown = e.target.querySelector("ul").clientHeight
          pcmenu.style.height = `calc(50px + ${hpulldown}px)`;        
        }
        /*hpulldown = e.target.querySelector("ul").clientHeight
        pcmenu.style.height = `calc(50px + ${hpulldown}px)`;*/
      })

    });

    pcmenu.addEventListener("mouseleave", ()=>{
      pcmenu.style.height = "50px";
    });



    const menu=document.getElementsByClassName("menu_bar")[0];
    const open=document.getElementsByClassName("phone-menu")[0];
    

    menu.addEventListener("click", ()=>{
        headerelement.classList.toggle("open")
        open.classList.toggle("active")
        menu.classList.toggle("unactive")
    })

    // メニューを開く関数
const slideDown = (el) => {
    el.style.height = 'auto'; //いったんautoに
    let h = el.offsetHeight; //autoにした要素から高さを取得
    el.style.height = h + 'px';
    el.animate([ //高さ0から取得した高さまでのアニメーション
      { height: 0 },
      { height: h + 'px' }
    ], {
      duration: 300, //アニメーションの時間（ms）
     });
  };
  
  // メニューを閉じる関数
  const slideUp = (el) => {
    el.style.height = 0;
  };
  
  let activeIndex = null; //開いているアコーディオンのindex
  
  //アコーディオンコンテナ全てで実行
  const accordions = document.querySelectorAll('ul.include-accordion');
  accordions.forEach((accordion) => {
  
    //アコーディオンボタン全てで実行
    const accordionBtns = accordion.querySelectorAll('.accordionBtn');
    accordionBtns.forEach((accordionBtn, index) => {
      accordionBtn.addEventListener('click', (e) => {
        activeIndex = index; //クリックされたボタンを把握
        e.target.parentNode.classList.toggle('active'); //ボタンの親要素（=ul>li)にクラスを付与／削除
        const content = accordionBtn.nextElementSibling; //ボタンの次の要素（=ul>ul）
        if(e.target.parentNode.classList.contains('active')){
          slideDown(content); //クラス名がactive（＝閉じていた）なら上記で定義した開く関数を実行
        }else{
          slideUp(content); //クラス名にactiveがない（＝開いていた）なら上記で定義した閉じる関数を実行
        }
        /*accordionBtns.forEach((accordionBtn, index) => {
          if (activeIndex !== index) {
            //accordionBtn.parentNode.classList.remove('active');
            const openedContent = accordionBtn.nextElementSibling;
            //slideUp(openedContent); //現在開いている他のメニューを閉じる
          }
        });*/
        //スクロール制御のために上位階層ulのクラス名を変える
        let container = accordion.closest('.scroll-control'); //sroll-controlnのクラス名である親要素を取得
        if(accordionBtn.parentNode.classList.contains('active') == false && container !== null ){
          container.classList.remove('active')
        }else if (container !== null){
          container.classList.add('active')
        }
      });
    });
  });


    //footer
    const bottom=[];
    const footerelement = document.getElementsByTagName("footer")[0];//getElementsByTagNameは配列
    const rikoten = lang == "ja" ? "理工展連絡会": "Rikoten";
    bottom.push(`
    <p>official SNS</p>
    <ul class = "social-icon">
      <li class = "twitter-icon"><a href="https://twitter.com/rikoten_waseda" target="_blank" rel = "noopener"><img src = "/img/common/icon/twitter.svg"></a></li>
      <li class = "instagram-icon"><div></div><a href="https://www.instagram.com/waseda_rikoten/" target="_blank" rel = "noopener"><img src = "/img/common/icon/instagram.svg"></a></li>
      <li class = "line-icon"><a href="https://line.me/R/ti/p/o-ox8Dei12" target="_blank" rel = "noopener"><img src = "/img/common/icon/line.svg"></a></li>
      <li class = "youtube-icon"><a href="https://www.youtube.com/channel/UCdBEdqUB9DvgHShFqzxswdA" target="_blank" rel = "noopener"><img src = "/img/common/icon/youtube.svg"></a></li>
    </ul>
    <p class="copyright">Copyright © 2002-2022 ${rikoten} All Rights Reserved.</p>
    `)
    footerelement.insertAdjacentHTML("afterbegin", bottom);
}

async function langEvent() {
  const $ja = document.getElementsByClassName("ja");
  const $en = document.getElementsByClassName("en");

  for(let i = 0 ; i < $ja.length ; i++){
    $ja[i].addEventListener("click", () => {
      if(!$ja[i].classList.contains("active")){
        localStorage.setItem("lang", "ja");
        $en[i].classList.remove("active");
        $ja[i].classList.add("active");
      }
      location.reload();
    })
    $en[i].addEventListener("click", () => {
      if(!$en[i].classList.contains("active")){
        localStorage.setItem("lang", "en");
        $ja[i].classList.remove("active");
        $en[i].classList.add("active");
      }
      location.reload();
    })
  }
}
