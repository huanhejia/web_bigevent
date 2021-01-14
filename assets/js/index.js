$(function() {
    getUserDate()

    $('.logout').on('click', function() {
        layui.layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserDate() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                layui.layer.msg(res.message)
            } else {
                renderAvata(res.data)
            }

        }
    })
}

function renderAvata(user) {

    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic == null) {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(first)
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }

}

function artListIndex() {
    $('#artlist').click()
}