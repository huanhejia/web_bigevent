$.ajaxPrefilter(function(options) {
    // 在发起请求之前会先调用ajaxPrefilter这个函数
    // 在这个函数中，可以拿到ajax当中的配置项
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})