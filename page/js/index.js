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
        articleList: []
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
                        temp.link = '/blog_detail.html?bid=' + result[i].id;
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

let header = new Vue({
    el: "#header",
    methods: {
        jumpToAbout() {
            window.location.href = '/about.html'
        },
        jumpToGuestbook() {
            console.log(1321231);
            window.location.href = "/guestbook.html"
        }
    }
})