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
    connection.end();
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
    connection.end();
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
    connection.end();
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
    connection.end();
}

//查询所有博客
function queryAllBlog(success) {
    let querytSql = "select * from blog order by desc;";
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
    connection.end();
}
//增加浏览次数
function addViews(id,success) {
    let querytSql = "update blog set views = views + 1 where id = ?;";
    let params = [id];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querytSql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}

//增加浏览次数
function queryHotBlog(size,success) {
    let querytSql = "select * from blog order by views desc limit ?;";
    let params = [size];
    let connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querytSql, params, (err, result) => {
        if (err === null) {
            success(result);
        } else {
            console.log(err);
        }
    })
    connection.end();
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;