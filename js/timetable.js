(async () => {
  // 言語設定
  const lang = localStorage.getItem("lang") === "en" ? "en" : "ja";

  // JSONデータ取得
  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };
  const json = await fetchData('/data/timetable_data_web.json');
  console.log("json:", json);

  // DOM要素取得
  const elements = {
    firstDayButton: document.querySelector(".first-day-button"),
    secondDayButton: document.querySelector(".second-day-button"),
    contentsWrapper: document.querySelector(".contents-wrapper"),
    hScrollLeft: document.querySelector(".h-scroll.left"),
    hScrollRight: document.querySelector(".h-scroll.right"),
  };

  // 日付ボタン横の線の長さ調整
  const adjustLineWidth = () => {
    const navWidth = Math.floor(document.querySelector("#timetable .nav").getBoundingClientRect().width);
    const dateButtonWidth = Math.ceil(document.querySelector(".date-button").getBoundingClientRect().width);
    const navLineLeftWidth = window.innerWidth > 576 ? `${(navWidth - dateButtonWidth) * 1/5}px` : "0px";
    const navLineRightWidth = window.innerWidth > 576 ? `${(navWidth - dateButtonWidth) * 4/5}px` : "0px";

    document.querySelector(".nav-line.left").style.width = navLineLeftWidth;
    document.querySelector(".nav-line.right").style.width = navLineRightWidth;
  };

  window.addEventListener("load", adjustLineWidth);
  window.addEventListener('resize', adjustLineWidth);

  // HTML要素追加
  const contents = [];
  for (const day of Object.keys(json)) {
    contents.push(`<div class="content-wrapper ${day}">`);

    for (const projectType of json[day]) {
      let activeOrNot = "";
      if (json[day].indexOf(projectType) === 0) activeOrNot = "active";

      contents.push(`
        <div class="project-type ${projectType.label.en.replace(/ /g, '')} ${activeOrNot}">
          <div class="label">
            <div>${projectType.label[lang]}</div>
            <div>${projectType.place[lang]}</div>
          </div>
      `);

      for (const content of projectType.contents) {
        const startTimeMinute = content.startTime.minute === 0 ? "00" : content.startTime.minute;
        const endTimeMinute = content.endTime.minute === 0 ? "00" : content.endTime.minute;
        const nowLabel = lang === "ja" ? "現在公演中" : "LIVE";
        const detailLabel = lang === "ja" ? "詳細を見る" : "Detail";

        contents.push(`
          <div class="project-block ${content.id} row${projectType.contents.indexOf(content)}" style="background-image: url(${content.imagePath});">
            <div class="now-playing">${nowLabel}</div>
            <div class="time">${content.startTime.hour}:${startTimeMinute}-${content.endTime.hour}:${endTimeMinute}</div>
            <div class="projectName">${content.eventName[lang]}</div>
            <div class="groupName">${content.groupName[lang]}</div>
            <div class="detail"><a href="/projects/project/?id=${content.id}">${detailLabel}</a></div>
          </div>
        `);
      }

      contents.push(`</div>`);
    }

    contents.push(`</div>`);
  }

  const contentsJoin = contents.join("");
  elements.contentsWrapper.insertAdjacentHTML("afterbegin", contentsJoin);
  document.querySelector(".secondday").classList.add("active");

  // CSS 企画ボックスの色設定
  // [E-09]シリコンの覚醒
  if (window.innerWidth > 576) {
    document.querySelector(".E-09 .projectName").style.fontSize = "16px";
  }

  let resizeBefore = window.innerWidth - 576;
  let resizeAfter = window.innerWidth - 576;

  window.addEventListener('resize', () => {
    resizeBefore = resizeAfter;
    resizeAfter = window.innerWidth - 576;

    if (resizeBefore * resizeAfter <= 0) {
      if (window.innerWidth > 576) {
        document.querySelector(".E-09 .projectName").style.fontSize = "16px";
      } else {
        document.querySelector(".E-09 .projectName").style.fontSize = "1.25rem";
      }
    }
  });

  // 企画終了 / 現在公演中のクラス設定
  const addClassFinishedNow = () => {
    for (const day of Object.keys(json)) {
      for (const projectType of json[day]) {
        const projectBlocks = document.querySelectorAll(`.${day} .${projectType.label.en.replace(/ /g, '')} .project-block`);

        for (const content of projectType.contents) {
          const date = day === "firstDay" ? "2022/11/5" : "2022/11/6";

          const compareResult = TimeCompare(date, content.startTime, content.endTime);

          if (compareResult === -1) {
            projectBlocks[projectType.contents.indexOf(content)].classList.remove("now");
            projectBlocks[projectType.contents.indexOf(content)].classList.add("finished");
          } else if (compareResult === 0) {
            projectBlocks[projectType.contents.indexOf(content)].classList.add("now");
          }
        }
      }
    }
  };

  window.addEventListener("load", addClassFinishedNow);
  setInterval(addClassFinishedNow, 1000);

  function TimeCompare(date, startTime, endTime) {
    const currentTime = new Date();
    const startDate = new Date(date);
    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.hour, startTime.minute);
    const endDateTime = new Date(startDate);
    endDateTime.setHours(endTime.hour, endTime.minute);

    if (currentTime < startDateTime) {
      return 1;
    } else if (currentTime > endDateTime) {
      return -1;
    } else if (startDateTime <= currentTime && currentTime <= endDateTime) {
      return 0;
    } else {
      return null;
    }
  }

  // 横スクロールボタン
  if (window.innerWidth > 576) {
    elements.contentsWrapper.addEventListener('scroll', () => {
      const hscroll_position = elements.contentsWrapper.scrollLeft;

      if (hscroll_position > 0) {
        elements.hScrollLeft.classList.add("active");
      } else {
        elements.hScrollLeft.classList.remove("active");
      }

      if (hscroll_position < elements.contentsWrapper.querySelector(".content-wrapper.active").clientWidth - elements.contentsWrapper.clientWidth - 20) {
        elements.hScrollRight.classList.add("active");
      } else {
        elements.hScrollRight.classList.remove("active");
      }
    });
  }

  // 初日/二日目ボタンの切り替え
  elements.firstDayButton.addEventListener("click", () => {
    elements.firstDayButton.classList.add("active");
    elements.secondDayButton.classList.remove("active");
    document.querySelector(".firstday").classList.add("active");
    document.querySelector(".secondday").classList.remove("active");
  });

  elements.secondDayButton.addEventListener("click", () => {
    elements.secondDayButton.classList.add("active");
    elements.firstDayButton.classList.remove("active");
    document.querySelector(".secondday").classList.add("active");
    document.querySelector(".firstday").classList.remove("active");
  });
})();
