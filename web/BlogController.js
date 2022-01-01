let BlogDao = require('../dao/BlogDao');
let TagsDao = require('../dao/TagDao');
let TagBlogMapping = require('../dao/TagBlogMappingDao');
let timeUtil = require('../utils/TimeUtil');
let respUtil = require('../utils/respUtil');
const { request } = require('express');
let url = require('url');
let path = new Map();

//按照博客id查询博客
function queryBlogById(request, response) {
    let params = url.parse(request.url, true).query
    BlogDao.queryBlogById(parseInt(params.bid), (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
        BlogDao.addViews(parseInt(params.bid),(result) => {

        })
    })
}
path.set('/queryBlogById', queryBlogById)

//查询博客总数
function queryBlogCount(request, response) {
    BlogDao.queryBlogCount((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryBlogCount', queryBlogCount);

//分页查询博客
function queryBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    BlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), (result) => {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<\/?.+?\/?>/g, '');
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}

path.set('/queryBlogByPage', queryBlogByPage);
//编辑博客会进行插入标签和标签博客映射三张表
function editBlog(request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, "").replace('，', ',');
    request.on('data', (data) => {
        BlogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === '') {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    })
}
path.set('/editBlog', editBlog);

//查询标签
function queryTag(tag, blogId) {
    TagsDao.queryTag(tag, (result) => {
        if (result === null || result.length === 0) {
            insertTag(tag, blogId);
        } else {
            TagBlogMapping.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => {

            });
        }
    })
}

//插入标签
function insertTag(tag, blogId) {
    TagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), (result) => {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

//插入标签博客映射
function insertTagBlogMapping(tagId, blogId) {
    TagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => {

    });
}

//查询所有博客
function queryAllBlog(request, response) {
    BlogDao.queryAllBlog((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询全部成功', result));
        response.end();
    })
}
path.set('/queryAllBlog', queryAllBlog);

function queryHotBlog(request, response) {
    BlogDao.queryHotBlog(5,(result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询全部成功', result));
        response.end();
    })
}
path.set('/queryHotBlog', queryHotBlog);

module.exports.path = path;