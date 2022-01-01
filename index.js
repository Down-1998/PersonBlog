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
app.post('/editBlog', loader.get('/editBlog'));
//分页查询博客
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
//查询博客的数量
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
//按照博客id查询博客
app.get('/queryBlogById', loader.get('/queryBlogById'));
//添加评论
app.get('/addComment', loader.get('/addComment'));
//验证码
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
//查询留言
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
//查询留言条数
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'));
//查询所有的博客
app.get('/queryAllBlog', loader.get('/queryAllBlog'));
//查询随机标签云
app.get('/queryRandomTags', loader.get('/queryRandomTags'));
//最近热点
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
// 最新评论
app.get('/queryNewComments', loader.get('/queryNewComments'));
//随机标签云进行过滤
app.get('/queryByTag', loader.get('/queryByTag'));
app.get('/queryByTagCount', loader.get('/queryByTagCount'));

app.listen(globalConfig.port, () => {
    console.log('服务器已经启动,正在监听12306端口');
})