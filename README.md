# 第十三組期末專題 - 傳傳二手書交易平台

歡迎來到第十三組的專案儲存庫！
這是一個基於 HTML、CSS 與 JavaScript 建構的靜態網頁應用程式，旨在解決 校園二手書資訊不透明 的問題。

## 📖 專案介紹 (Introduction)
本專案為 多媒體程式設計 的期末成果。

### 核心目標
* 提供清晰的資訊展示介面。
* 實作完整的網頁切版與路由跳轉。
* 優化使用者體驗 (UX)，確保操作流暢。

## ✨ 功能特色 (Key Features)
我們在這個專案中實作了以下功能與技術亮點：

### 1. 介面設計與排版 (UI/Layout)
* **CSS Grid & Flexbox 佈局**：我們不依賴現成框架，手刻了大部分的排版，確保網頁結構的彈性與整潔。
* **視覺一致性**：統一的色調與字體設計（定義於 `style.css`）。

### 2. 互動功能 (Interactivity)
* **動態效果**：使用 JavaScript (`script.js`) 製作了 [例如：導覽列縮放、圖片輪播、或是按鈕回饋] 等互動效果。
* **頁面跳轉**：完整的 `pages` 結構，模擬實際網站的多頁面瀏覽體驗。

## 🛠️ 技術棧 (Tech Stack)
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Version Control**: Git & GitHub
* **Editor**: VS Code

## 📂 專案結構說明 (Folder Structure)
為了保持程式碼的可維護性，我們採用了模組化的檔案結構：

```text
第十三組專題/
├── README.md           # 專案說明文件（你現在看到的這份）
├── assets/             # 靜態資源區（CSS, JS, 圖片分離）
│   ├── style.css       # 全站共用樣式表
│   ├── script.js       # 全站共用邏輯
│   └── images/         # 圖片素材庫
└── pages/              # 網頁頁面區
    ├── index.html      # [建議] 主首頁
    ├── about.html      # 關於我們
    └── ....html        # 其他功能頁面
