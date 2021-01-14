$(function() {
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage;

    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    initTable()

    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                var htmlStr = template("listDate", res)
                $('tbody').html(htmlStr)

                getReadPage(res.total)
            }
        })
    }

    $('tbody').on('click', '.delete-art', function() {
        var id = $(this).parent('td').attr('date-id')
        var delbtn = $('.delete-art').length

        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 1) {
                        if (delbtn == 1) {
                            q.pagenum--
                        }
                        initTable()
                    }

                }
            })

            layer.close(index);
        });

    })

    //初始化渲染分页
    function getReadPage(total) {
        laypage.render({
            elem: 'page', //把分页渲染在哪个容器里
            count: total, //数据总条数
            limit: q.pagesize, //每页显示几条
            curr: q.pagenum, //设置默认被选中的分页
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) { //obj包含当前分页的所有参数

                q.pagenum = obj.curr //得到用户点击的当前页
                q.pagesize = obj.limit //得到每页显示的条数

                if (!first) {
                    initTable()
                }

            }
        })
    }

    //定义美化时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        return date.split('.')[0]
    }

    //获取文章列表数据，渲染下拉菜单
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            var htmlStr = template('classify', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()

        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=city]').val()
        initTable()
    })



})