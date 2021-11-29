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

    }
});


let newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: [{
                title: '使用码云git的webhook实现生产环境代',
                link: ''
            },
            {
                title: 'VirtualBox压缩vmdk、vagrant打包b',
                link: ''
            },
            {
                title: '初烧盲狙一条铁三角e40',
                link: ''
            },
            {
                title: '树莓派安装homebridge小记',
                link: ''
            },
            {
                title: '使用码云git的webhook实现生产环境代',
                link: ''
            },
            {
                title: 'VirtualBox压缩vmdk、vagrant打包b',
                link: ''
            },
            {
                title: '初烧盲狙一条铁三角e40',
                link: ''
            },
            {
                title: '树莓派安装homebridge小记',
                link: ''
            }
        ]
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
    }
})