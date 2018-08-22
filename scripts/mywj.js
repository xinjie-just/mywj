/**
 * Created by lixinjie on 2017/8/16.
 */

// 侧滑导航切换
$("#menu").on("click", function(e) {
    $("#navWrapper").toggle();
    $(document).on("click", function () {
        $("#navWrapper").hide();
    });
    e.stopPropagation();
});
$("#nav").on("click", function (e) {
    e.stopPropagation();
});

// 回到顶部图标的显示与影藏
$(window).scroll(function() {
    if($(window).scrollTop() >= 100) {
        $("#toTop").fadeIn(400).css("display", "block"); // 当滑动到不小于 100px 时，回到顶部图标显示
    }else {
        $("#toTop").fadeOut(400); // 当滑动到小于(页面被卷去的高度) 100px 时，回到顶部图标隐藏
    }
});

// 回到顶部
$("#toTop").on("click", function() {
    $("html, body").animate({scrollTop: 0}, 600);
});

// 返回
$("#back").on("click", function () {
    history.go(-1);
});

// 重新加载页面时
$(function () {
    setOthersOption();
    matchUrl();
    setMainHeight();
});
//页面缩放时
$(window).resize(function () {
    setOthersOption();
    setMainHeight();
});

// 保证页面 main 部分不会被 header 和 footer  部分遮挡
function setMainHeight() {
    var headerHeight = $("#header").outerHeight();
    var footerHeight = $("#footer").outerHeight();
    $("#main").css({
        "padding-top": headerHeight,
        "padding-bottom": footerHeight
    });
}

/*其他部分(qq和回到顶部的位置)*/
function setOthersOption() {
    if ($(window).outerWidth() > 767) {
        $(".others").css({
            "left": "50%",
            "transform": "translate(350px, -50%)"
        });
    } else {
        $(".others").css({
            "left": "100%",
            "transform": "translate(-.4rem, -50%)"
        });
    }
}

// 当前页面地址与路由匹配情况
function matchUrl() {
    var link =  $("#nav").find("a");
    var locationUrl = location.href;
    for (var i = 0, len = link.length; i < len; i++) {
        /*如果当前地址与a链接的地址不匹配，则表示当前为首页*/
        if (!locationUrl.match($(link[i]).attr("href"))) {
            $("#nav").find("a[href*='index']").addClass("active");
        }
        if (locationUrl.indexOf($(link[i]).attr("href")) !== -1) {
            $(link[i]).addClass("active");
            $("#nav").find("a[href*='index']").removeClass("active");
        }
    }
}
