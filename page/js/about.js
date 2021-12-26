let blogComments = new Vue({
    el: "#blog_comment",
    data: {
        total: 0,
        comments: []
    },
    created() {
        let bid = -1;

        axios({
            method: 'get',
            url: `/queryCommentsByBlogId?bid=${bid}`
        }).then((res) => {
            this.comments = res.data.data;
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].parent > -1) {
                    this.comments[i].options = `回复@${this.comments[i].parent_name}`
                }
            }
        });

        axios({
            method: 'get',
            url: `/queryCommentsCountByBlogId?bid=${bid}`
        }).then((res) => {
            this.total = res.data.data[0].count;
        })
    },
    computed: {

    },
    methods: {
        reply(commentId, userName) {
            document.getElementById('comment_reply').value = commentId;
            document.getElementById('comment_reply_name').value = userName;
            location.href = '#send_comment';
        }
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
                let bid = -1;
                let reply = document.getElementById('comment_reply').value;
                let replyName = document.getElementById('comment_reply_name').value;
                let name = document.getElementById('comment_name').value;
                let email = document.getElementById('comment_email').value;
                let content = document.getElementById('comment_content').value;
                // let code = document.getElementById('comment_code').value;
                axios({
                    method: 'get',
                    url: `/addComment?bid=${bid}&parent=${reply}&userName=${name}&email=${email}&content=${content}&parentName=${replyName}`,
                }).then((res) => {
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