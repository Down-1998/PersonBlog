let dbUtil = require('./DBUtil');

function insertTag(tag, ctime, utime, success) {
    let insertSql = "insert into tags(`tag`,`ctime`, `utime`) values(?,?,?) ";
    let params = [tag, ctime, utime];
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

function queryTag(tag, success) {
    let insertSql = "select * from tags where tag = ?;";
    let params = [tag];
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

module.exports.insertTag = insertTag
module.exports.queryTag = queryTag