$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initCate();
    initEditor();

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败！')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    };
    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    $image.cropper(options);
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    });
    $('#coverFile').on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image.cropper('destroy').attr('src', newImgURL).cropper(options);
    });
    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    });
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            fd.append('cover_img', blob)
            publishArticle(fd);
        });
    });

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发表文章失败！')
                }
                layer.msg('发表文章成功！');
                // location.href = '/article/article_list.html';
                window.parent.$('#list').click();
            }
        })
    }
})