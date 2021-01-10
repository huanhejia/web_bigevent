$.ajaxPrefilter(function(options) {
    // 在发起请求之前会先调用ajaxPrefilter这个函数
    // 在这个函数中，可以拿到ajax当中的配置项
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            location.href = 'login.html'
            localStorage.removeItem('token')

        }
        console.log(res);
    }

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})