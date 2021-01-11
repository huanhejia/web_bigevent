$(function() {
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{1,6}$/, '昵称长度必须1到6个字符之间，不且能有空格'
        ]
    })
    getUserData()

    //重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        getUserData()
    })

    //提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    layui.layer.msg(res.message)
                    window.parent.getUserDate()
                } else {
                    layui.layer.msg(res.message)
                }
            }
        })

    })

})

function getUserData() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 1) {
                layui.form.val('formUserInfo', res.data)
            } else {
                layui.layer.msg(res.message)
            }
        }
    })
}