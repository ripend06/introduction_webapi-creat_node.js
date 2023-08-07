const express = require("express"); //expressをインポート
const app = express(); //express関数で使用
app.use(express.json()); // これからJSON形式のファイルを使う指定

app.listen(3000, console.log("サーバーが開始されました")); //losten関すで、ローカルサーバーを構築

app.get("/", (req, res) =>  {
    res.send("プログラミングチュートリアルへようこそ"); //resポンスとして、文字を返した
});

//お客様情報をサーバーに置いておく（JSON）
const customers = [
    {title: "田中", id: 1},
    {title: "斎藤", id: 2},
    {title: "橋本", id: 3},
    {title: "鈴木", id: 4},
    {title: "安藤", id: 5},
];


//データを取得できるようにしよう（GETメソッド）
app.get("/api/customers", (req, res) => {
    res.send(customers);
})

app.get("/api/customers/:id", (req, res) => {
    //　find関数　クライントがリクエストを送ります　どういうリクエス？
    //　①/api/customers/2 /api/customers/4 とかをリクエスト
    //　②parseIntでint型に変換
    //　③c.id　customersの中の上をを一つひとつ見て、　1,2,3,4,5
    //　④c.id　と　②で送ったリクエスト　が一致してるならば、その情報を返す
    //　　例：/api/customers/2　なら、c.id　が２の情報を返す
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    res.send(customer); //情報を返す

});


//データを送信（作成）してみよう（POSTメソッド）
app.post("/api/customers", (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1, //　今いるカスタマーの数＋１（例：今５人いるけど、＋１して、６人目を追加したい）
    };
    customers.push(customer); //　JSON形式に、追加したものpush
    res.send(customers); //　情報を取得　カスタマー情報を表示
});


//データを更新してみよう（PUTメソッド）
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title; // タイトルを更新
    res.send(customer); //情報を返す
})


//データを削除してみよう（DELETEメソッド）
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));

    const index = customers.indexOf(customer); // indexO関数で、最初に現れたindex番号を返す（例：２をリクエストすると、２の配列を取得できる。橋本さんだったら橋本さんの配列を返す）
    customers.splice(index, 1); // splice関数で、その配列の番号を削除する

    res.send(customer); //情報を返す
});