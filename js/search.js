(async () => {
    const data = await fetch('/data/1103_2_project_data.json?date=1103').then(res => res.json());
    console.log(data);
    // すべての企画のHTMLを作成
    await addSearchSection();
    await addList(data);
    // タグボタン生成
    await addTagButton();

    categoryEvent(data);
    updateProjectsByTag(data)
    keywordEvent(data);

})();

let activeTagLists = [];
let selectedTagList = [];
let selectedProjectLists = [];
let currentCategory = "all";
let notSelectedProjectListByKW = [];

let counter = 0;
let eventlist = [];
let numList = [];
let addEventListenerNumList = [];
let removeEventListenerNumList = [];

/* 多言語切り替え */
const lang = (localStorage.getItem("lang") == "en") ? "en" : "ja";

const allTagList = ["サークル", "研究室", "インカレ", "理工展連絡会", "制作", "設計", "防災", "実験", "教育", "環境", "資源", "学生生活", "トークショー",
    "参加型", "展示", "ファミリー向け", "謎解き", "ロケット", "ロボット", "天体観測", "スポーツ", "受験生向け", "グローバル", "プレゼン", "コンピュータ", "スマホ",
    "建築", "相談", "子ども向け", "化学", "パフォーマンス", "ゲーム", "研究", "大学院", "生物", "SDGs", "飲食", "フード", "ドリンク", "スイーツ", "ダンス"];

const allTagListEn = ["Circle", "Laboratory", "Intercollegiate", "Rikoten", "Production", "Design", "Disaster Prevention",
    "Experiment", "Education", "Environment", "Resources", "Student Life", "Talk Show", "Participatory", "Exhibition", "Family", "Riddle", "Rocket", " Robots", "Astronomy", "Sports", "For Students",
    "Global", "Presentations", "Computers", "Smartphones", "Architecture", "Consultation", "For Children", "Chemistry", "Performance", "Games", "Research", "Graduate", "Biology ", "SDGs", "Food & Beverage", "Food", "Drink", "Sweets", "Dance"];

const categoryNames = ["all", "general", "experiment", "stage", "shops", "online"];

async function addSearchSection() {
    const searchSection = document.getElementsByClassName("search-section")[0];
    const searchSectionLang = {
        "keyword": {
            "h2": { "ja": "キーワードで絞り込む", "en": "By Keyword" },
            "placeholder": { "ja": "キーワードを入力", "en": "Enter keywords" }
        },
        "category": {
            "h2": { "ja": "区分で絞り込む", "en": "By Category" },
            "all": { "ja": "すべて", "en": "All" },
            "exhibition": { "ja": "展示企画", "en": "Exhibition" },
            "experiment": { "ja": "実験企画", "en": "Experiment" },
            "stage": { "ja": "ステージ企画", "en": "Stage" },
            "booth": { "ja": "模擬店企画", "en": "Booth" },
            "online": { "ja": "オンライン企画", "en": "Online" },
        },
        "tag": {
            "h2": { "ja": "タグで絞り込む", "en": "By Tag" }
        }
    }
    const html = `  <div class="keyword">
                        <h2>${searchSectionLang.keyword.h2[lang]}</h2>
                        <div class="input">
                            <form onsubmit="return false">
                                <input type="search" id="search-text" placeholder="${searchSectionLang.keyword.placeholder[lang]}">
                            </form>
                            
                        </div>
                    </div>
                    <div class="category">
                        <h2>${searchSectionLang.category.h2[lang]}</h2>
                        <ul>
                            <li class = "active">${searchSectionLang.category.all[lang]}</li>
                            <li>${searchSectionLang.category.exhibition[lang]}</li>
                            <li>${searchSectionLang.category.experiment[lang]}</li>
                            <li>${searchSectionLang.category.stage[lang]}</li>
                            <li>${searchSectionLang.category.booth[lang]}</li>
                            <li>${searchSectionLang.category.online[lang]}</li>
                        </ul>
                    </div>
                    <div class="tag">
                        <h2>${searchSectionLang.tag.h2[lang]}</h2>
                        <ul></ul>
                    </div>`

    searchSection.insertAdjacentHTML("beforeend", html);
}

async function addList(data) {

    const $categories = document.querySelectorAll('#search .search-result .projects > div > div');

    for (let i = 0; i < $categories.length; i++) {
        activeTagLists[i] = [];
        selectedProjectLists[i] = [];
        const $name = categoryNames[i];
        // カテゴリが"All"だったら4つすべてのカテゴリの企画を取得
        if ($name == "all") {
            for (let j = 1; j < categoryNames.length; j++) {
                getProjectHtml(data, categoryNames[j]).then(projects => {
                    // 各カテゴリのリストに追加
                    $categories[i].insertAdjacentHTML("afterbegin", projects);
                });
            }
        }
        else {
            getProjectHtml(data, $name).then(projects => {
                // 各カテゴリのリストに追加
                $categories[i].insertAdjacentHTML("beforeend", projects);
            });
        }
    }
}

async function getProjectHtml(data, name) {
    let projects = "";
    for (let i = 0; i < data[name].length; i++) {
        // 各企画のタグ取得
        let $tags = [];
        if (lang == "ja") {
            $tags = data[name][i].tags;
        }
        else {
            for (const $tag of data[name][i].tags) {
                $tags.push(allTagListEn[allTagList.indexOf($tag)]);
            }
        }
        let projectTagsHtml = await getProjectTagsHtml($tags);

        /* ウォークラリー・チケットの有無 */
        let onlineTicketHtml = "";
        let offlineTicketHtml = "";
        let walkRallyHtml = "";
        if (data[name][i].hasOnlineTicket) {
            const ticketText = lang == "ja" ? "オンラインチケットが必要です" : "Online Ticket";
            onlineTicketHtml = `<div class="ticket red">${ticketText}</div>`;
        }
        if (data[name][i].hasTicket) {
            const ticketText = lang == "ja" ? "整理券が必要です" : "Offline Ticket";
            offlineTicketHtml = `<div class="ticket blue">${ticketText}</div>`;
        }
        if (data[name][i].isWalkRally) {
            const walkRallyText = lang == "ja" ? "ウォークラリー対象企画" : "Walk Rally";
            walkRallyHtml = `<div class="ticket green">${walkRallyText}</div>`;
        }

        /* 場所 */
        let placeText = "";
        
        const placeTextOnline = {
          ja: "オンライン",
          en: "Online"
        }

        if (data[name][i].firstDayPlace.ja == data[name][i].secondDayPlace.ja) {
            placeText = data[name][i].isOnline ? `${placeTextOnline[lang]}` : `${data[name][i].secondDayPlace[lang]}`;
        }
        else if ((data[name][i].firstDayPlace.ja != "-" && data[name][i].secondDayPlace.ja == "-") || (data[name][i].firstDayPlace.ja == "-" && data[name][i].secondDayPlace.ja != "-")) {
            if (data[name][i].firstDayPlace.ja != "-") {
                placeText = ` 11/4 : ${data[name][i].firstDayPlace[lang]}`;
            } else {
                placeText = ` 11/5 : ${data[name][i].secondDayPlace[lang]}`;
            }
        } else {
            placeText = ` 11/4 : ${data[name][i].firstDayPlace[lang]}<br> 11/5 : ${data[name][i].secondDayPlace[lang]}`;
        }

        /* 企画構築 */
        let project = `<div class="project active ${data[name][i].id}">
                            <a href="/projects/project/?id=${data[name][i].id}">
                                <div class="notes">
                                    ${onlineTicketHtml}
                                    ${offlineTicketHtml}
                                    ${walkRallyHtml}
                                </div>
                                <div class="project-img">
                                    <img src=${data[name][i].thumbnailPath.web} alt="">
                                </div>
                                <div class="desc">
                                    <div class="project-name">${data[name][i].projectName[lang]}</div>
                                    <div class="detail">
                                        <div class="group-name">${data[name][i].groupName[lang]}</div>
                                        <div class="place">${placeText}</div>
                                    </div>
                                    <div class="project-tag">
                                        <ul>${projectTagsHtml}</ul>
                                    </div>
                                </div>
                            </a>   
                        </div>`
        projects = projects.concat(project);
    }
    return projects;
}

async function addTagButton() {

    const $tagSection = document.querySelectorAll('#search .search-section .tag ul');
    const allTagListLang = lang == "ja" ? allTagList : allTagListEn;
    const tagButtonsHtml = await getProjectTagsHtml(allTagListLang);
    $tagSection[0].insertAdjacentHTML("beforeend", tagButtonsHtml);
}

async function getProjectTagsHtml(tags) {

    let tagsHtml = "";

    for (let i = 0; i < tags.length; i++) {
        tagsHtml = tagsHtml.concat(`<li># ${tags[i]}</li>`);
    }

    return tagsHtml;
}


// カテゴリのactiveの切り替え
const categoryEvent = (data) => {

    const $categorySection = document.getElementsByClassName("category");
    const $categories = $categorySection[0].getElementsByTagName("li");

    for (const $category of $categories) {
        $category.addEventListener("click", () => {
            const $activeCategory = $categorySection[0].getElementsByClassName("active");
            // 現在のカテゴリからactiveを消去
            $activeCategory[0].classList.remove("active");
            // クリックしたタブにactive追加
            $category.classList.add("active");
            // 選択していたタグのリセット
            selectedTagList = [];
            // 表示する企画の更新
            const $selectedCategoryIndex = [].slice.call($categories).indexOf($category);
            updateProjectsByCategory(data, $selectedCategoryIndex);
        });
    }
}

// １
function updateProjectsByCategory(data, selectedCategoryIndex) {

    // 古いカテゴリのactive削除
    document.getElementsByClassName(currentCategory)[0].classList.remove("active");
    // タグのactiveをリセット
    deleteAllActiveTags();
    // すべてのタグからremoveEventListenerする
    const removeYetList = addEventListenerNumList.filter(i => removeEventListenerNumList.indexOf(i) == -1);
    removelistener(removeYetList);

    // 新しいカテゴリのactive追加
    currentCategory = categoryNames[selectedCategoryIndex];
    document.getElementsByClassName(currentCategory)[0].classList.add("active");
    updateProjectsByTag(data);
}

// 2
async function updateProjectsByTag(data) {

    const currentCategoryIndex = categoryNames.indexOf(currentCategory);
    selectedProjectLists[currentCategoryIndex] = [];

    if (currentCategory == "all") {
        for (let i = 1; i < categoryNames.length; i++) {
            pushselectedProject(data, currentCategoryIndex, categoryNames[i]);
        }
    }
    else {
        pushselectedProject(data, currentCategoryIndex, currentCategory);
    }
    changeActive(data);
}

function pushselectedProject(data, index, category) {

    for (let i = 0; i < data[category].length; i++) {
        // selectedTagListのタグが企画タグにすべて含まれている&&キーワードも含んでいる->その企画をselectedProjectに追加
        if (tagIsSelected(data[category][i].tags) && notSelectedProjectListByKW.indexOf(data[category][i].id) == -1) {
            selectedProjectLists[index].push(data[category][i].id);
            // 重複削除
            selectedProjectLists[index] = Array.from(new Set(selectedProjectLists[index]));
        }
    }
}

// 3
async function changeActive(data) {

    // 各企画のactiveを削除
    await deleteAllActiveProjects();
    // projectにactiveつける
    const $categorySection = document.getElementsByClassName(currentCategory)[0];
    for (const selectedProjectId of selectedProjectLists[categoryNames.indexOf(currentCategory)]) {
        const $selectedProject = $categorySection.getElementsByClassName(selectedProjectId)[0];
        if ($selectedProject != undefined) $selectedProject.classList.add("active");
    }

    updateTagLists(data);
}

// 4
function updateTagLists(data) {

    const $index = categoryNames.indexOf(currentCategory);
    activeTagLists[$index] = [];

    if (currentCategory == "all") {
        for (let i = 1; i < categoryNames.length; i++) {
            pushActiveTagLists(data, $index, categoryNames[i]);
        }
    }
    else {
        pushActiveTagLists(data, $index, currentCategory);
    }

    updateTagButton(data);
}

function pushActiveTagLists(data, index, category) {

    for (const $selectedProjectId of selectedProjectLists[index]) {
        const $selectedProject = data[category].filter(item => item.id == $selectedProjectId)[0];
        if ($selectedProject != undefined) {
            for (const $tag of $selectedProject.tags) {
                activeTagLists[index].push($tag);
                // 重複削除
                activeTagLists[index] = Array.from(new Set(activeTagLists[index]));
            }
        }
    }
}

// 5
function updateTagButton(data) {

    numList = addlistener(".tag li", "click", tagEventFunc, { data: data });
    showProjectsNum();
}


// タグのイベント
function tagEventFunc() {

    const tmpTagName = this.tag.innerText.substring(this.tag.innerText.indexOf("#") + 2);
    /* 英語タグ：-1 */
    const $tagIndex = allTagList.indexOf(tmpTagName);
    let $tagName = "";
    /* 英語のタグだったら日本語にする */
    if ($tagIndex == -1) {
        $tagName = allTagList[allTagListEn.indexOf(tmpTagName)];
    } else {
        $tagName = allTagList[$tagIndex];
    }


    if (this.tag.classList.contains("active")) {
        this.tag.classList.remove("active");
        selectedTagList = selectedTagList.filter(item => item != $tagName);
    } else {
        this.tag.classList.add("active");
        selectedTagList.push($tagName);
        // 重複削除
        selectedTagList = Array.from(new Set(selectedTagList));
    }

    removelistener(numList);
    updateProjectsByTag(this.data);
}

function addlistener(selectors, type, handleEvent, arg = {}, option = null) {

    let counterList = [];
    const docs = document.querySelectorAll(selectors);

    for (const doc of docs) {
        const tmpTagName = doc.innerText.substring(doc.innerText.indexOf("#") + 2);
        /* 英語タグ：-1 */
        const $tagIndex = allTagList.indexOf(tmpTagName);
        let tagName = "";
        /* 英語のタグだったら日本語にする */
        if ($tagIndex == -1) {
            tagName = allTagList[allTagListEn.indexOf(tmpTagName)];
        } else {
            tagName = allTagList[$tagIndex];
        }
        if (activeTagLists[categoryNames.indexOf(currentCategory)].indexOf(tagName) == -1) {
            doc.classList.add("inactive");
        } else {
            counter++;
            counterList.push(counter);
            arg.tag = doc;
            const eventlistner = { handleEvent, ...arg };
            const array = { counter, selectors, type, eventlistner, option };
            eventlist.push(array);
            doc.classList.remove("inactive");
            doc.addEventListener(type, eventlistner, option);
        }
    }
    addEventListenerNumList = addEventListenerNumList.concat(counterList);
    return counterList;
}

function removelistener(numList) {

    for (const num of numList) {
        const find_in = (e) => e.counter === num;
        const value = eventlist.findIndex(find_in);
        const { counter, selectors, type, eventlistner, option } = eventlist[value];
        eventlistner.tag.removeEventListener(type, eventlistner, option);
        removeEventListenerNumList.push(num);
    }
}

// 6
function showProjectsNum() {

    const ken = lang == "ja" ? "件" : "Projects";
    document.querySelector(".search-result>p").innerText =
        `${selectedProjectLists[categoryNames.indexOf(currentCategory)].length} ${ken}`;
}


// selectedTagListのタグが企画タグにすべて含まれているか
function tagIsSelected(tags) {

    const tmp = selectedTagList.filter(x => tags.indexOf(x) >= 0);
    return tmp.length == selectedTagList.length;
}

async function deleteAllActiveProjects() {

    const $allActiveProjects = document.querySelectorAll(".projects > div > div > div");
    for (const $activeProject of $allActiveProjects) {
        $activeProject.classList.remove("active");
    }
}

function deleteAllActiveTags() {

    const $allActiveTags = document.querySelectorAll(".tag li");
    for (const $activeTag of $allActiveTags) {
        $activeTag.classList.remove("active");
    }
}

async function keywordEvent(data) {

    const $searchData = await fetch('/data/dataForSearch_1028.json').then(res => res.json());
    const $searchText = document.getElementById("search-text");
    // ページ読み込み時にLocalStorageからキーワードを取得
    /*const storedKeyword = localStorage.getItem("searchKeyword");
    if (storedKeyword) {
        $searchText.value = storedKeyword;
        // フィルターを適用するために input イベントをトリガーします
        $searchText.dispatchEvent(new Event('input'));
    }*/
    $searchText.addEventListener('input', (event) => {
        notSelectedProjectListByKW = [];
        for (const $sd of $searchData) {
             if ($sd.dataForSearch_en.indexOf(event.currentTarget.value) == -1 && $sd.dataForSearch_hira.indexOf(event.currentTarget.value) == -1 && $sd.dataForSearch_kanji.indexOf(event.currentTarget.value) == -1 && $sd.dataForSearch_kata.indexOf(event.currentTarget.value) == -1) {
                 notSelectedProjectListByKW.push($sd.id)
            }
            /*if ($sd.dataForSearch_hira.indexOf(event.currentTarget.value) == -1 && $sd.dataForSearch_kanji.indexOf(event.currentTarget.value) == -1 && $sd.dataForSearch_kata.indexOf(event.currentTarget.value) == -1) {
                notSelectedProjectListByKW.push($sd.id)
            }*/
        }
        /*localStorage.setItem("searchKeyword", event.currentTarget.value);*/
        updateProjectsByTag(data);
    });

    window.addEventListener('load', () => {
        const storedKeyword = localStorage.getItem("searchKeyword");
        /*if (storedKeyword) {
            $searchText.value = storedKeyword;
            // フィルターを適用するために input イベントをトリガーします
            $searchText.dispatchEvent(new Event('input'));
        }*/
    });
}
