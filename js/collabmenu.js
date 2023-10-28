(async () => {
  /* 多言語切り替え */
  const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";  
  
  /* DOM取得 (Part 1) --------
  -------------------*/
  const menu = document.querySelector(".menu"); //MENUリスト

  const contentsWrapper = document.querySelector(".contents-wrapper"); //コンテンツ

  /* JSONデータ取得 --
  -------------------*/
  const json = await fetch('/data/collabmenu.json').then(res => res.json());

  /* MENUリスト作成 --
  -------------------*/ 
  const menuList = []; // 配列を用意
  for (let i=0; i<json.length; i++){
    menuList.push(`
      <li>
        <a class="menu-link" href="#content${json[i].num}">
          <span class="num">${json[i].num}</span>
          <span class="name">${json[i].name[lang]}</span>
        </a>
      </li>
    `);
  }
  menuListJoin = menuList.join(""); //配列の要素を連結して文字列とする
  menu.insertAdjacentHTML("afterbegin", menuListJoin); //MENUリストをHTMLに追加
  
  /* コンテンツ-------
  -------------------*/
  const contents = []; //配列を用意 
  for (let i=0; i<json.length; i++){
    if (json[i].release === true){
      //let fontSize = (json[i].num == "02"|| json[i].num == "05") ? "font-size:2.2rem;" : "";
      contents.push(`
        <div id="content${json[i].num}" class="content-wrapper">
          <div class="content-left">
            <div class="content-left-inner">
              <h3>
                <span class="num">${json[i].num}</span>
                <span class="name">${json[i].name[lang]}</span>
              </h3>
              
              <div class="menu-img-wrapper">
                <div class="menu-img-inner"><img class="menu-img" src="${json[i].menuImg}" alt="${json[i].menuName}"></div>
              </div>
              <span class="menu-name">${json[i].menuName[lang]}</span>
              <span class="menu-price">${json[i].menuPrice[lang]}</span>  
            </div>        
          </div>


          <div class="content-right">
            <div class="ad-copy"><h4>${json[i].adCopy[lang]}</h4></div>

            <div class="details">
              <div class="menu-comment-wrapper"><p class="comment menu-comment">${json[i].menuComment[lang]}</p></div>
              <div class="shop-info"><div class="info-title">お店のコンセプト</div>${json[i].concept[lang]}</div>
              <!--<div>${json[i].address}</div>
              <div>TEL: ${json[i].tel}</div>
              <div>${json[i].access}</div>-->
              <div class="shop-info"><div class="info-title">営業時間</div>${json[i].time[lang]}</div>
              <div class="shop-info"><div class="info-title">理工展当日営業</div>${json[i].rikoten[lang]}</div>
              <div class="shop-info"><div class="info-title">コラボ期間</div>${json[i].period[lang]}</div>
              <div class="sns-wrapper"></div>
            </div>

            <div class="map">${json[i].map}</div>

          </div>
        </div> 
      `)
    }else{
      contents.push(`
        <div id="content${json[i].num}" class="content-wrapper">
          <div class="content-left preparation">
            <div class="content-left-inner">
              <h3>
                <span class="num">${json[i].num}</span>
                <span class="name">${json[i].name[lang]}</span>
              </h3>

              <p>準備中<p>

            </div>
          </div>
          
          <div class="content-right preparation">
            <p>Coming Soon...</p>
            <p>ただ今準備中です。</p>
            <p>今しばらくお待ちください。</p>
            <div class="sns-wrapper"></div>
          </div>
        </div>
      `)
    }


  }
  
  contentsJoin = contents.join(""); //配列の要素を連結して文字列とする
  contentsWrapper.insertAdjacentHTML("afterbegin", contentsJoin) //コンテンツをHTMLに追加

  /* CSS加筆---------
  -------------------*/
  /* MENU .scrollの表示非表示 */
  const scroll = document.querySelector(".scroll");
  if (window.innerWidth > 1000){
    scroll.classList.add("show")
    scroll.addEventListener('click', function(){
      document.documentElement.scrollTop = 200;
    });
  }else{
    scroll.classList.remove("show")
  }

  /* 左コンテンツ背景画像 */
  const contentLeftInner = document.querySelectorAll(".content-left-inner");
  for (let i=0; i<json.length; i++){
    if (json[i].release === true){
      contentLeftInner[i].style.backgroundImage = `url(${json[i].menuImg})`;
    }
  }

  /* DOM取得 (Part 2) 
  -------------------*/
  const collabmenuTop = document.querySelector(".collabmenu-top"); //トップメニュー
  const contentWrapper = document.querySelectorAll(".content-wrapper");
  const Lefts = document.querySelectorAll(".content-left"); //左コンテンツ
  const Rights = document.querySelectorAll(".content-right"); //右コンテンツ
  const menuName = document.querySelectorAll(".menu-name"); //メニュー名
  const menuPrice = document.querySelectorAll(".menu-price"); //メニュー名
  const menuImg = document.querySelectorAll(".menu-img"); //メニュー名
  const menuCommentWrapper = document.querySelectorAll(".menu-comment-wrapper"); //メニュー名
  const snsWrapper = document.querySelectorAll(".sns-wrapper"); //SNSリンク

/*
  setInterval(() => {
    const a = document.querySelector('#content08 .content-left-inner.transition');
    const b = document.querySelector('#content08 .content-left-inner:not(.transition)');
    a.classList.remove('transition');
    b.classList.add('transition');
  }, 3500);
*/

  /* SNSリンク-------
  -------------------*/
  /* Instagram */
  for (i=0; i<json.length; i++){
    if (json[i].Instagram !== null && json[i].release === true){
      const instagram = `
      <div class="sns">
        <span class="sns-title">Instagram: </span>
        <a class="sns-url" href="${json[i].Instagram}" target="_blank" rel="noopener noreferrer">${json[i].Instagram}</a>
      </div>
      `;
      snsWrapper[i].insertAdjacentHTML("beforeend", instagram); //コンテンツをHTMLに追加
    }
  } 
  
  /* Twitter */
  for (i=0; i<json.length; i++){
    if (json[i].Twitter !== null){
      const twitter = `
      <div class="sns">
        <span class="sns-title">Twitter: </span>
        <a class="sns-url" href="${json[i].Twitter}" target="_blank" rel="noopener noreferrer">${json[i].Twitter}</a>
      </div>
      `;
      snsWrapper[i].insertAdjacentHTML("beforeend", twitter); //コンテンツをHTMLに追加
    }
  }   

  /* LINE */
  for (i=0; i<json.length; i++){
    if (json[i].LINE !== null){
      const line = `
      <div class="sns">
        <span class="sns-title">LINE: </span>
        <a class="sns-url" href="${json[i].LINE}" target="_blank" rel="noopener noreferrer">${json[i].LINE}</a>
      </div>
      `;
      snsWrapper[i].insertAdjacentHTML("beforeend", line); //コンテンツをHTMLに追加
    }
  }




  /* スクロール操作---
  -------------------*/
  if (window.innerWidth > 1000){
    window.addEventListener('scroll', function() {
      /* ---要素の高さ取得--- */
      const windowH = document.documentElement.clientHeight; //ウインドウ高さ
  
      const collabmenuTopH = collabmenuTop.offsetHeight; //トップメニュー
      
      const LeftsH = [];
      for (let i=0; i<json.length; i++){  
        LeftsH.push(Lefts[i].offsetHeight); //左コンテンツ
      }
      
      const RightsH = [];
      for (let i=0; i<json.length; i++){
        RightsH.push(Rights[i].clientHeight); //右コンテンツ
      }
    
      /* ---.content-Wrapperの高さを指定--- */
      for (let i=0; i<json.length; i++){
        contentWrapper[i].style.height = RightsH[i] + "px";
      }
  
      /* ---.content-Wrapperのページ上部からの位置を取得--- */
      const contentY = [];
      for (let i=0; i<json.length; i++){
        contentY.push(contentWrapper[i].getBoundingClientRect().top + window.pageYOffset);
      }
  
      /* ---スクロール位置取得--- */
      scroll_position = window.pageYOffset;
      

  
      /* ---表示切り替え--- */
      if (scroll_position > 100){
        collabmenuTop.classList.remove("show"); //トップメニュー非表示
        
        Lefts[0].classList.add("show"); //左コンテンツ表示
        
        //ここのlengthの値を変更した
        for (let i=0; i<json.length-3; i++){
          Rights[i].classList.add("show"); //右コンテンツ表示
        }
      }else{
        collabmenuTop.classList.add("show"); //トップメニュー表示
        Lefts[0].classList.remove("show"); //左コンテンツ非表示
        for (let i=0; i<json.length; i++){
          Rights[i].classList.remove("show"); //右コンテンツ非表示
        }
      }
  
      for (let i=0; i<json.length-3; i++){
        if (scroll_position > contentY[i+1] - windowH * 1/2){
          Lefts[i].classList.remove("show"); //1つ前の左コンテンツ非表示

          //ここのlengthの値を変更した
          if (i !== json.length -4){
            Lefts[i+1].classList.add("show"); //次の左コンテンツ表示
          }       
        }else if(i !== json.length -3){
          Lefts[i+1].classList.remove("show"); //それ以外の時左コンテンツ非表示
        }
      }

    });
  }else{
    collabmenuTop.classList.remove("show");
    for (i=0; i<json.length; i++){
      Lefts[i].classList.remove("show");
      Rights[i].classList.remove("show");
    }
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

})();

