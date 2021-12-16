let CommentDao = require('../dao/CommentDao');
let respUtil = require('../utils/respUtil');
let timeUtil = require('../utils/TimeUtil');
let captcha = require('svg-captcha');
let url = require('url');
let path = new Map();


function addComment(request, response) {
    let params = url.parse(request.url, true).query;
    CommentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论插入成功', result));
        response.end();
    });
}

function queryRandomCode(request, response) {
    let img = captcha.create({
            fontSize: 50,
            width: 100,
            height: 34
        })
        // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '评论插入成功', img));
    response.end();
}
path.set('/addComment', addComment);
path.set('/queryRandomCode', queryRandomCode);
module.exports.path = path;