$(function() {
    var layer = layui.layer
    var form = layui.form
    getArtlist()

    var closebtnindex = null
    $('#btn-add').click(function() {
        closebtnindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#addAricle').html()
        });
    })

    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    getArtlist()
                    layer.close(closebtnindex)
                } else {
                    layer.msg(res.message)
                    layer.close(closebtnindex)
                }
            }
        })
    })


    $('tbody').on('click', '.updateArt', function() {
        var id = $(this).parent('td').attr('data-id')
        closebtnindex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#updateAricle').html()
        });

        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 1) {
                    form.val('fupdate', res.data)
                }
            }
        })
    })

    $('body').on('submit', '#form_update', function(e) {
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    getArtlist()
                    layer.close(closebtnindex)
                } else {
                    layer.msg(res.message)
                    layer.close(closebtnindex)

                }

            }
        })
    })

    //删除标题
    $('tbody').on('click', '.delete-art', function() {
        var id = $(this).parent('td').attr('data-id')
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 1) {
                        layer.msg(res.message)
                        getArtlist()
                    } else {
                        layer.msg(res.message)
                    }

                }

            })

            layer.close(index);
        });



    })

    //获取文章类别列表数据
    function getArtlist() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    var htmlStr = template('Artlist', res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
})