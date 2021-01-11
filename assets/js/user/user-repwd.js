$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {

            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'

            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    $('.layui-form')[0].reset()
                    layui.layer.msg(res.message)
                } else {
                    layui.layer.msg(res.message)
                }
            }
        })

    })




})