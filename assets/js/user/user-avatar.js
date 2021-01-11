$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btn').click(function() {
        $('#myfile').click()
    })

    $('#myfile').change(function(e) {
        // e.target 是file类型input的原生DOM对象
        var files = e.target.files[0]

        //使用URL.createObjectURL将文件转化成内存路径
        var newImgURL = URL.createObjectURL(files)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })

    $('#btn-req').click(function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串



        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function(res) {
                if (res.status !== 1) {
                    window.parent.getUserDate()
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                }
            }
        })

    })
})