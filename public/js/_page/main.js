/**
 * =============================================================================
 *  LOGIN
 * =============================================================================
 *
 *  for page: #page-main
 *
 * =============================================================================
 *
 * @author Spray Lee
 * @create 2016-05-23
 *
 */
(function (window, document, $) {

  "use strict";

  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */
  var $pageMain  = $("#page-main");
  var $pageLogin = $("#page-login");

  var $choseArea = $(".chose-area");
  var $choseList = $("#main-choseList");
  var $tmpChoseList = $("#tmp-main-choseList");

  var $imgBox = $("#main-imgBox");
  var $tmpImgBox = $("#tmp-main-imgBox");

  var $imgArea = $(".img-area");

  var $fullScreenBtn = $(".full-screen-btn");
  var $pullBtn = $(".pull-btn");

  var _choseList = [];
  var _currentSong = null;


  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
   // 页面跳转事件
  $pageMain.on("open", function (event, data) {
    $(window).trigger("pageOpen", [$pageMain, $pageLogin]);
    HANDLER_initPage(data);
  });

  // 窗口大小改变时，动态调整图片大小
  $(window).on("resize", HANDLER_changImgSize);

  // 全屏
  $fullScreenBtn.on("click", function (event) {
    if ($pageMain.hasClass("full-screen")) {
      exitFull();
      $pageMain.removeClass("full-screen");
    } else {
      requestFullScreen($pageMain[0]);
      $pageMain.addClass("full-screen");
    }
  });


  // 换谱
  $choseList.on("click", function (event) {
    console.log(event);
    var path = event.originalEvent.path;
    for (var i = 0; i < _choseList.length; i++) {
      if (path.indexOf($choseList.find("li")[i]) > -1) {
        _currentSong = _choseList[i];
        RENDER_showSong(_choseList[i]);
        HANDLER_changImgSize();
        $choseArea.removeClass("hover");
      }
    }
  });

  // 点击显示侧边栏
  $pullBtn.on("click", function (event) {
    $choseArea.toggleClass("hover");
  });

  // 悬停显示侧边栏
  $choseArea.hover(function (event) {
    $choseArea.addClass("hover");
  }, function (event) {
    // $choseArea.removeClass("hover");
  });

  // 点击取消侧边栏
  $imgArea.on("click", function (event) {
    if ($choseArea.hasClass("hover")) {
      $choseArea.removeClass("hover");
    }
  });


  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_initPage(user) {
    AJXA_getDefaultList(user, function (data) {
      var sortedList = HANDLER_sortList(data, "pickTimes", "-");
      _choseList = sortedList;
      _currentSong = sortedList[0];
      RENDER_choseList(sortedList);
      RENDER_showSong(sortedList[0]);
      HANDLER_changImgSize();
    });
  }

  function HANDLER_sortList(data, sortBy, direction) {
    var sortBy     = sortBy    || "lastTime";
    var direction  = direction || "-";
    var sortedList = data;
    var isReduce  = (direction === "-") ? true : false;
    for (var i = 0; i < data.length - 1; i++) {
      for (var j = i; j < data.length; j++) {
        if ((sortedList[i][sortBy] < sortedList[j][sortBy]) === isReduce) {
          var temp      = sortedList[i];
          sortedList[i] = data[j];
          sortedList[j] = temp;
        }
      }
    }
    return sortedList;
  }

  function HANDLER_changImgSize() {
    var mediaBarHeight = 0;
    var roomWidth = $imgArea.width();
    var roomHeight = $imgArea.height();

    if (roomWidth > roomHeight) {  // 横屏（PC）
      if (_currentSong.page.length >= 3) {
        for (var i = 0; i < _currentSong.page.length; i++) { //20 上下边距加边框  mediaBarHeight 音乐条高度
          $imgBox.find(".img-item")[i].style.height = document.documentElement.clientHeight - 10 + "px";
          $imgBox.find(".img-item")[i].style.width = ((document.documentElement.clientWidth) / 3 - 10) + "px";
        }
        $imgBox.width(((document.documentElement.clientWidth) / 3) * _currentSong.page.length);
      } else {
        for (var i = 0; i < _currentSong.page.length; i++) { //20 上下边距加边框  mediaBarHeight 音乐条高度
          $imgBox.find(".img-item")[i].style.height = document.documentElement.clientHeight - 10 + "px";
          $imgBox.find(".img-item")[i].style.width = (document.documentElement.clientHeight - 10) / 1.5 + "px";
        }
        $imgBox.width(document.documentElement.clientWidth);
      }
    } else { // 竖屏（Mobie）
      for (var i = 0; i < _currentSong.page.length; i++) { //20 上下边距加边框  mediaBarHeight 音乐条高度
        $imgBox.find(".img-item")[i].style.width = document.documentElement.clientWidth - 10 + "px";
        $imgBox.find(".img-item")[i].style.height = (roomHeight- 10 - mediaBarHeight) + "px";
      }
    }
  }


  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */

  function RENDER_showSong(page) {
    $imgBox.render($tmpImgBox, page);
  }

  function RENDER_choseList(choseList) {
    $choseList.render($tmpChoseList, choseList);
  }



  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */

  function AJXA_getDefaultList(user, success) {
    var url = "./getPicks";
    var param = user;
    $.ajax({
      type    : "POST",
      url     : url,
      data    : param,
      dataType: "json",
      success : success
    });
  }




  function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  }

  //退出全屏 判断浏览器种类

  function exitFull() {
    // 判断各种浏览器，找到正确的方法
    var exitMethod = document.exitFullscreen || //W3C
      document.mozCancelFullScreen || //Chrome等
      document.webkitExitFullscreen || //FireFox
      document.webkitExitFullscreen; //IE11
    if (exitMethod) {
      exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  }



})(window, document, $);
