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
        articleList: [{
                title: 'Windows下使用zerotier时提示PORT_ERROR错误',
                content: 'ZeroTier是一款基于P2P的内网穿透工具，对于个人免费且支持最多100台设备端对端穿透，看上去很优秀。出于爱折腾的兴趣，就安装试用一下。首先在官网注册帐号并创建一个虚拟网，得到虚拟网ID。然后下载Windows安装包，在Windows上一路确定安装完毕，点击运行，右键托盘图标选择join，填写上新建的虚拟网ID，进行加入。加入后点击”show networks”查看网络状态，发现Status为&...',
                date: "2021-1-1",
                views: "101",
                tags: 'zerotier 内网穿透',
                id: '1',
                link: ''
            },
            {
                title: 'Windows下使用zerotier时提示PORT_ERROR错误',
                content: 'ZeroTier是一款基于P2P的内网穿透工具，对于个人免费且支持最多100台设备端对端穿透，看上去很优秀。出于爱折腾的兴趣，就安装试用一下。首先在官网注册帐号并创建一个虚拟网，得到虚拟网ID。然后下载Windows安装包，在Windows上一路确定安装完毕，点击运行，右键托盘图标选择join，填写上新建的虚拟网ID，进行加入。加入后点击”show networks”查看网络状态，发现Status为&...',
                date: "2021-1-1",
                views: "101",
                tags: 'zerotier 内网穿透',
                id: '1',
                link: ''
            },
            {
                title: 'Windows下使用zerotier时提示PORT_ERROR错误',
                content: 'ZeroTier是一款基于P2P的内网穿透工具，对于个人免费且支持最多100台设备端对端穿透，看上去很优秀。出于爱折腾的兴趣，就安装试用一下。首先在官网注册帐号并创建一个虚拟网，得到虚拟网ID。然后下载Windows安装包，在Windows上一路确定安装完毕，点击运行，右键托盘图标选择join，填写上新建的虚拟网ID，进行加入。加入后点击”show networks”查看网络状态，发现Status为&...',
                date: "2021-1-1",
                views: "101",
                tags: 'zerotier 内网穿透',
                id: '1',
                link: ''
            },
            {
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

    },
    created() {

    }

})