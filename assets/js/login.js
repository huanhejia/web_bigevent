$(function() {
    $('#link_login').click(function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_reg').click(function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        reqwd: function(value) {
            if (value !== $('#pwd').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('#from_reg').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: {
                username: $('#from_reg [name=username]').val(),
                password: $('#from_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    $('#link_reg').click()
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })

    $('#from-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    location.href = 'index.html'
                    localStorage.setItem('token', res.token)
                } else {
                    layer.msg(res.message)
                }
            }

        })
    })

})