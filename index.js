const express = require('express');
let app = new express();
let globalConfig = require('./config');
let loader = require('./loader');

app.use(express.static("./page"));

//编辑每日一句
app.post('/editEveryDay', loader.get('/editEveryDay'))
    //获取每日一句
app.get('/queryEveryDay', loader.get('/queryEveryDay'))
    //编辑博客
app.post('/editBlog', loader.get('/editBlog'))

app.listen(globalConfig.port, () => {
    console.log('服务器已经启动,正在监听12306端口');
})