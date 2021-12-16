let dbUtil = require('./DBUtil');

function insertComment(blogId, parent, userName, email, comments, ctime, utime, success) {
    let insertSql = "insert into comments(`blog_id`,`parent`,`user_name`,`email`,`comments`,`ctime`, `utime`) values(?,?,?,?,?,?,?) ";
    let params = [blogId, parent, userName, email, comments, ctime, utime];
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



module.exports.insertComment = insertComment