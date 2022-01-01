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

function queryByTag(tag_id,page,pageSize, success) {
    let insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
    let params = [tag_id,page*pageSize,pageSize];
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

function queryByTagCount(tag_id, success) {
    let insertSql = "select count(1) as count  from tag_blog_mapping where tag_id = ?;";
    let params = [tag_id];
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
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;