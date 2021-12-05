let everyDay = new Vue({
    el: "#every_day",
    data: {
        content: '你本身就是你珍贵而又值得被爱的人'
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then((res) => {
            this.content = res.data.data[0].content
            console.log(res.data.data[0].content);
        }).catch((erro) => {
            console.log('请求失败', erro);
        })
    }
});

let articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [{
                title: 'Windows下使用zerotier时提示PORT_ERROR错误',
                content: 'ZeroTier是一款基于P2P的内网穿透工具，对于个人免费且支持最多100台设备端对端穿透，看上去很优秀。出于爱折腾的兴趣，就安装试用一下。首先在官网注册帐号并创建一个虚拟网，得到虚拟网ID。然后下载Windows安装包，在Windows上一路确定安装完毕，点击运行，右键托盘图标选择join，填写上新建的虚拟网ID，进行加入。加入后点击”show networks”查看网络状态，发现Status为&...',
                date: "2021-1-1",
                views: "101",
                tags: 'zerotier 内网穿透',
                id: '1',
                link: ''
            }

        ]
    },
    computed: {
        getPage(page, pageSize) {
            return (page, pageSize) => {
                axios({
                    method: 'get',
                    url: `/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`,
                }).then((res) => {
                    console.log(res);
                    let result = res.data.data;
                    let list = [];
                    for (let i = 0; i < result.length; i++) {
                        let temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = result[i].ctime;
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = '' + result[i].id;
                        list.push(temp)
                    }
                    this.articleList = list;
                    this.page = page

                }).catch((err) => {
                    console.log('请求错误');
                })
                axios({
                    method: 'get',
                    url: '/queryBlogCount'
                }).then(res => {
                    this.count = res.data.data[0].count;
                    this.generatePageTool;
                })


            }
        },
        generatePageTool() {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({ text: '<<', page: 1, });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= parseInt((totalCount + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= parseInt((totalCount + pageSize - 1) / pageSize)) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: '>>', page: parseInt((totalCount + pageSize - 1) / pageSize) });
            this.pageNumList = result;
            return result;
        }
    },
    methods: {
        jumpTo(page) {
            this.getPage(page, this.pageSize);
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    }

})