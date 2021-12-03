let everyDayDao = require('../dao/EveryDayDao');
let timeUtil = require('../utils/TimeUtil');
let respUtil = require('../utils/respUtil');
let path = new Map();
//编辑每日一句
function editEveryDay(request, response) {
    request.on('data', (data) => {

        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function(result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    })
}
path.set('/editEveryDay', editEveryDay);

//获取每日一句
function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', result));
        response.end();
    })
}

path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;