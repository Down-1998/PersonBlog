let dbUtil = require('./DBUtil');

function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
    let insertSql = "insert into tag_blog_mapping(`tag_id`,`blog_id`, `ctime`, `utime`) values(?,?,?,?) ";
    let params = [tag_id, blog_id, ctime, utime];
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
module.exports.insertTagBlogMapping = insertTagBlogMapping;