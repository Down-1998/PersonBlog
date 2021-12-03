let dbUtil = require('./DBUtil');

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

module.exports.insertBlog = insertBlog;