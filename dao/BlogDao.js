let dbUtil = require('./DBUtil');

//新增博客
function insertBlog(title, content, tags, views, ctime, utime, success) {
    let insertSql = "insert into blog(`title`, `content`,`tags`, `views`,`ctime`, `utime`) values(?,?,?,?,?,?) ";
    let params = [title, content, tags, views, ctime, utime];
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

//分页查询博客
function queryBlogByPage(page, pageSize, success) {
    let insertSql = "select * from blog order by id desc limit ?,?;";
    let params = [page * pageSize, pageSize];
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

//id查询博客
function queryBlogById(id, success) {
    let querySql = "select * from blog where id = ?;";
    let params = [id];
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

//查询博客总数
function queryBlogCount(success) {
    let querytSql = "select count(1) as count from blog ";
    let params = [];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querytSql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;