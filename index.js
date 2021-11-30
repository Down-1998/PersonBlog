const express = require('express');
let app = new express();
let globalConfig = require('./config');
let loader = require('./loader');

app.use(express.static("./page"));

app.post('/editEveryDay', loader.get('/editEveryDay'))

app.listen(globalConfig.port, () => {
    console.log('服务器已经启动,正在监听12306端口');
})