$(function() {
    var form = layui.form
    var layer = layui.layer

    //获取文章分类,渲染下拉菜单
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 1) {
                var htmlStr = template('ArtList', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        }
    })

    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    //点击选择封面弹出文件选择框
    $('#btn_close').on('click', function() {
        $('#myfile').click()
    })

    $('#myfile').change(function() {
        var file = this.files[0]
        var imgStr = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgStr) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })

    var art_state = '已发布'

    $('#drafts').click(function() {
        art_state = '草稿'
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        var fd = new FormData(this)


        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)

                $.ajax({
                    type: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status !== 1) {
                            window.parent.artListIndex()
                            layer.msg(res.message)
                        }
                        layer.msg(res.message)
                    }
                })
            })



    })


})