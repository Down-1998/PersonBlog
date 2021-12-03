let BlogDao = require('../dao/BlogDao');
let TagsDao = require('../dao/TagDao');
let TagBlogMapping = require('../dao/TagBlogMappingDao');
let timeUtil = require('../utils/TimeUtil');
let respUtil = require('../utils/respUtil');
const { request } = require('express');
let url = require('url');
let path = new Map();

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

function queryTag(tag, blogId) {
    TagsDao.queryTag(tag, (result) => {
        if (result === null || result.length === 0) {
            insertTag(tag, blogId);
        } else {
            TagBlogMapping.insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    TagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), (result) => {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    TagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => {

    });
}

module.exports.path = path;