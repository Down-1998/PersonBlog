let randomTags = new Vue({
    el: '#random_tasg',
    data: {
        tags: ['树莓派', 'C语言', '拟航天飞机', 'php', '数据结构', '数据结构', '树莓派', 'C语言', '拟航天飞机', '拟航天飞机', 'php', '数据结构', ]
    },
    computed: {
        randomColor() {
            return () => {
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let blur = Math.random() * 255;
                return `rgb(${red},${green},${blur})`
            }
        },
        randomSize() {
            return () => {
                let size = Math.random() * 20 + 10 + 'px'
                return size;
            }
        }
    },
    created() {
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then((res) => {
            console.log(res,'========');
            result = [];
            for(let i = 0; i < res.data.data.length; i++){
                result.push({
                    text:res.data.data[i].tag,
                    link: `/?tag=${res.data.data[i].tag}`
                })
            }
            this.tags = result;
        })
    }
});


let newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then((res) => {
            let result = [];
            for(let i = 0; i < res.data.data.length; i++){
                let temp = {}
                temp.title = res.data.data[i].title;
                temp.link = `/blog_detail.html?bid=${res.data.data[i].id}`
                result.push(temp);
            }
            this.titleList = result;
            console.log(this.titleList);
        })
    }

})

let newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: [{
                name: 'james',
                date: '2个月前',
                comment: '在登录YouTube时一直显示手机号'

            },
            {
                name: 'wanxinlun',
                date: '1个月前',
                comment: '在登录YouTube时一直显示手机号'

            },
            {
                name: 'jack',
                date: '15天',
                comment: '在登录YouTube时一直显示手机号'

            },
            {
                name: 'james',
                date: '2个月前',
                comment: '在登录YouTube时一直显示手机号'

            },
            {
                name: 'wanxinlun',
                date: '1个月前',
                comment: '在登录YouTube时一直显示手机号'

            },
            {
                name: 'jack',
                date: '15天',
                comment: '在登录YouTube时一直显示手机号'

            },


        ]
    },
    created(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then((res) => {
            console.log(res);
            let result = [];
            for(let i = 0; i < res.data.data.length; i++){
                let temp = {}
                temp.name = res.data.data[i].user_name;
                temp.date = res.data.data[i].utime;
                temp.comment = res.data.data[i].comments;
                result.push(temp)
            }
            this.commentList = result;
        })
    }
})