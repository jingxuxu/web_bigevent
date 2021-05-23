$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    });
    // 注册表单提交

    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('注册失败');
            }
            layer.msg('注册成功，请登录');
            $('#link-login').click();
            $('.layui-input').val('');
        })
    });
    // 登录表单提交
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    });
})