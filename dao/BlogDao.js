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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;