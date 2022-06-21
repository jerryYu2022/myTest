$(() => {
    $("#link-reg").on("click", () => {
        $(".box-login").hide();
        $(".box-reg").show();
    });
    $("#link-login").on("click", () => {
        $(".box-reg").hide();
        $(".box-login").show();

    });

    // 定义规则
    const form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: value => {
            const pwd = $("#form-reg [name=password]").val();
            if (pwd !== value) return '两次密码输入不一致';
        }
    })
    // 定义弹出变量
    const layer = layui.layer;
    // 注册事件
    $("#form-reg").on("submit", e => {
        e.preventDefault();
        const data = { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() };
        $.post({ url: "/api/reguser" }, data, res => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功，请登录');
            $("#link-login").click();
        });
    });
    // 登录事件
    $("#form-login").on("submit", e => {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "post",
            data: $("#form-login").serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('登录失败');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });
});