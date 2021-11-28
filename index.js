const express = require('express');
let app = new express();

app.use(express.static("./page"));

app.listen(12306, () => {
    console.log('服务器已经启动,正在监听12306端口');
})