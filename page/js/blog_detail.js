let blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created() {
        let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (searchUrlParams == '') {
            return
        }
        let bid = -1;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1])
                } catch (error) {
                    console.log(error);
                }
            }
        }
        axios({
            method: 'get',
            url: `/queryBlogById?bid=${bid}`
        }).then((res) => {
            console.log(res);
            let result = res.data.data[0];
            this.title = result.title;
            this.content = result.content;
            this.ctime = result.ctime;
            this.tags = result.tags;
            this.views = result.views;
        }).catch((err) => {
            console.log(err);
        })
    }
})

let sendComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        sendComment() {
            return () => {
                let code = document.getElementById('comment_code').value;
                if (code !== this.rightCode) {
                    alert('验证码有误');
                    return;
                }
                let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split('?')[1].split('&') : "";
                let bid = -1;
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'bid') {
                        try {
                            bid = parseInt(searchUrlParams[i].split('=')[1])
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                let reply = document.getElementById('comment_reply').value;
                let name = document.getElementById('comment_name').value;
                let email = document.getElementById('comment_email').value;
                let content = document.getElementById('comment_content').value;
                // let code = document.getElementById('comment_code').value;
                axios({
                    method: 'get',
                    url: `/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}`,
                }).then((res) => {
                    console.log(res);
                    alert(res.data.msg);
                    document.getElementById('comment_reply').value = ''
                    document.getElementById('comment_name').value = ''
                    document.getElementById('comment_email').value = ''
                    ocument.getElementById('comment_content').value = ''
                    document.getElementById('comment_code').value = ''
                })
            }
        }
    },
    created() {
        this.changeCode()
    },
    methods: {
        changeCode() {
            axios({
                method: 'get',
                url: "/queryRandomCode"
            }).then((res) => {
                console.log(res);
                this.vcode = res.data.data.data;
                this.rightCode = res.data.data.text;
            })
        }
    }
})