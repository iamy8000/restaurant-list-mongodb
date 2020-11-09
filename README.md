# My first mongodb project: Restaurant list!

餐廳清單列出台北不可錯過的美食！使用者透過這個清單：

- 可以註冊帳號，註冊資料包括：name, email, 密碼, 確認密碼
- 可以透過Facebook Login 直接登入
- 登入後使用者可以創建自己的餐廳清單
- 可以新增一家餐廳
- 可以瀏覽一家餐廳的詳細資訊
- 可以瀏覽全部所有餐廳
- 可以修改一家餐廳的資訊
- 可以刪除一家餐廳
- 可以搜尋餐廳

提供兩組帳密供測試：
- email: 'user1@example.com', password: '12345678'
- email: 'user2@example.com', password: '12345678'

# Prerequisites

- 安裝<a href="https://www.mongodb.com/try/download/community">MongoDB</a></li>
- 安裝<a href="https://robomongo.org/">Robo 3T</a></li>
- 啟動、連線MongoDB資料庫
```
[~] $ cd ~/mongodb/bin/
[~/mongodb/bin] $ ./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```
- Create database named 'Restaurant' in Robo 3T


# Installation and execution

<p>首先啟動終端機，並遵循以下指令。</p>

```
//將專案複製到電腦中
$ git clone https://github.com/iamy8000/restaurant-list-mongodb.git

//進入專案資料夾
$ cd 6_todo_restaurant

//安裝套件
$ npm install

//執行專案
$ npm run dev

//使用種子資料
$ npm run seed

//離開伺服器
$ CTRL+C
```

<p>若終端機顯示 "App is running on http://localhost:3000, 
mongodb connected!"，便代表檔案安裝成功，即可開啟瀏覽器並進入http://localhost:3000。</p>
