let dbutil = require('./DBUtil');

//编辑每日一句
function insertEveryDay(content, ctime, success) {
    let insertSql = "insert into every_day(`content`, `ctime`) values(?,?) ";
    let params = [content, ctime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, result) {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}
//查询每日一句
function queryEveryDay(success) {
    let querySql = "select * from every_day order by id desc limit 1;";
    let params = []
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, result) {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;