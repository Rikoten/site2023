const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

// 出展団体部分背景のグラデーションを設定する関数
const setBackGrad = () => {
  const w = document.documentElement.clientWidth; //ウィンドウ幅  
  const htop = document.getElementById("top").clientHeight; //トップ部分高さ
  const hpart = document.querySelector(`#participants[lang="${lang}"]`).clientHeight; // 出展団体部分高さ

  const backGrad = document.querySelector(".back-grad");
  backGradPct = ((w*0.7 - htop*0.3) / (w + hpart)) * 100; // グラデーション境目の位置を計算
  backGrad.style.background = `linear-gradient(135deg, rgb(255, 253, 205) ${backGradPct}%, rgba(0, 255, 255, 0.2) ${backGradPct}%)`; // CSSグラデーション設定
}

// ウィンドウサイズ変更時に発火する関数
let resizeFlg;    //setTimeoutの待機中かを判定するフラグ
const windowResize = () => {
  //resizeFlgに値が設定されている場合は、待ち時間中なのでリセットする
  if (resizeFlg !== false) {
      clearTimeout(resizeFlg);
  }
  //300ms待機後にリサイズ処理を実施する
  resizeFlg = setTimeout(() => {
      setBackGrad();
  }, 100);
}

setBackGrad(); // 読み込み時に設定
window.addEventListener("resize", windowResize); // ウインドウサイズ変更時に再設定