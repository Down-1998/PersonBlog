let BlogDao = require('../dao/BlogDao');
let TagsDao = require('../dao/TagDao');
let TagBlogMapping = require('../dao/TagBlogMappingDao');
let timeUtil = require('../utils/TimeUtil');
let respUtil = require('../utils/respUtil');
let url = require('url');
let path = new Map();

function queryRandomTags(request,response){
    TagsDao.queryAllTag((result) => {
        result.sort(() => {
            return Math.random() > 0.5 ? true : false
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询随机标签云成功', result));
        response.end()
    })
}
path.set('/queryRandomTags',queryRandomTags);

function queryByTag (request,response){
    let params = url.parse(request.url,true).query;
    TagsDao.queryTag(params.tag,(result) => {
        if(result === null || result.length === 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end()
        }else{
            TagBlogMapping.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),(result) => {
                let blogList = [];
                for(let i = 0; i < result.length; i++){
                    BlogDao.queryBlogById(result[i].blog_id,(result) => {
                        blogList.push(result[0]);
                    });
                }
               getResult(blogList,result.length,response);
              
            })
        }
        
    })
    
}
path.set('/queryByTag',queryByTag);

function getResult(blogList,len,response){
    if(blogList.length < len){
        setTimeout(() => {
            getResult(blogList,len,response)
        },10)
    }else{
        for (let i = 0; i < blogList.length; i++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/<\/?.+?\/?>/g, '');
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', blogList));
        response.end()
    }
}

function queryByTagCount (request,response){
    let params = url.parse(request.url,true).query;
    TagsDao.queryTag(params.tag,(result) => {
        TagBlogMapping.queryByTagCount(result[0].id,(result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end()
        });
    })
    
}
path.set('/queryByTagCount',queryByTagCount);

module.exports.path = path;