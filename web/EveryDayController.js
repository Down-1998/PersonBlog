let path = new Map();

function editEveryDay(request, response) {
    request.on('data', (data) => {
        console.log(data.toString());
    })
}

path.set('/editEveryDay', editEveryDay);

module.exports.path = path;