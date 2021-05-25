$(function() {
    var layer = layui.layer;
    var imgURL;
    var $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });
    $('#file').on('change', function(e) {
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择文件')
        }
        var file = filelist[0];
        imgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgURL).cropper(options);
    });
    $('#btnUpload').on('click', function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                console.log(res);
                window.parent.getUserInfo();
                console.log(imgURL);

            }
        })
    })
})