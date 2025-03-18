# Video-Highlight


## 流程

上傳影片送出後 切換到分析頁面  
使用 RTK Query 串接 API  
後端 API 自動從 長度 30、60、120、180 中挑選長度並產生字幕資料後回傳  

前端使用 selector 方法取得資料  
使用 analysisVideoSelectorDefault 作為初始的資料  
避免出現資料 undefined 的問題  
並使用 selector 整理資料避免每次 render 資料都要重新計算  
 
## 技術

- **框架**: Next.js React
- **UI**: Material-UI
- **狀態管理**: Redux Tookit, RTK query
- **工具**: lodash-es (Tree shaking 優化)

## 安裝與運行

### 1. 安裝依賴
npm install

### 2. 啟動開發伺服器
npm run dev

### 3. 部署
npm run build  
npm start

## 專案結構目錄

📦 project-root  
├── 📁 public        # 靜態資源 (影片)  
├── 📁 src  
│   ├── 📁 api        # RTK query 串接 api  
│   ├── 📁 components  # 可重用的 UI 元件  
│   ├── 📁 app       # Next.js 頁面路由  
│   ├── 📁 store       # 狀態管理 (Redux)  
│   ├── 📁 lib       # 通用工具函式  
│   ├── 📁 views      # 主要畫面  
├── .gitignore  
├── .prettierrc.cjs     # prettier 設定  
├── eslint.config.mjs   # eslint 設定  
├── next-env.d.ts  
├── next.config.ts  
├── package.json  
├── README.md  

## API 


### **獲取字幕列表**
#### GET /analysisVideo
##### **請求**

### http
GET /api/analysisVideo
```
{
    highlightVideoLength: 30,
    highlightSentences:[
    {
        "id": "0",
        "startTime": 0,
        "length": 7,
        "sentence": "He practiced his piano skills every evening, hoping to perform a beautiful song at the school concert.",
        "section": "Introduction"
    },
    {
        "id": "1",
        "startTime": 8,
        "length": 4,
        "sentence": "The dog wagged its tail excitedly when it saw its owner return home after a long business trip.",
        "section": "Educational"
    },
    {
        "id": "2",
        "startTime": 13,
        "length": 5,
        "sentence": "The students worked together on a science project, excited to present their findings to the class.",
        "section": "Educational"
    },
    {
        "id": "3",
        "startTime": 19,
        "length": 2,
        "sentence": "He carefully painted a beautiful landscape of the countryside, using his favorite shades of blue and green.",
        "section": "Key Feature"
    },
    {
        "id": "4",
        "startTime": 22,
        "length": 6,
        "sentence": "She dreams of traveling the whole world.",
        "section": "Educational"
    },
    {
        "id": "5",
        "startTime": 29,
        "length": 4,
        "sentence": "He enjoys playing basketball with friends.",
        "section": "Conclusion"
    }]
}
```
