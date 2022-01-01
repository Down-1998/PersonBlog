let dbUtil = require('./DBUtil');

function insertComment(blogId, parent, userName, email, comments, ctime, utime, parentName, success) {
    let insertSql = "insert into comments(`blog_id`,`parent`,`user_name`,`email`,`comments`,`ctime`, `utime`, `parent_name`) values(?,?,?,?,?,?,?,?) ";
    let params = [blogId, parent, userName, email, comments, ctime, utime, parentName];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
}

function queryCommentByBlogId(blogId, success) {
    let querySql = "select * from comments where blog_id = ?";
    let params = [blogId];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
}

function queryCommentsCountByBlogId(blogId, success) {
    let querySql = "select count(1) as count from comments where blog_id = ?";
    let params = [blogId];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

function queryNewComments(size, success) {
    let querySql = "select * from comments order by id desc limit ?;";
    let params = [size];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}


module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId
module.exports.insertComment = insertComment
module.exports.queryCommentByBlogId = queryCommentByBlogId
module.exports.queryNewComments = queryNewComments