/**
 * =============================================================================
 *  LOGIN
 * =============================================================================
 *
 *  for page: #page-studio-ssm
 *
 * =============================================================================
 *
 * @author Spray Lee
 * @create 2016-05-23
 *
 * note: 本地储存记住用户名密码，Delete可以删除记忆
 */
(function (window, document, $) {

  "use strict";




  /**
   * ---------------------------------------------------------------------------
   *  Variable
   * ---------------------------------------------------------------------------
   */

  var $pageLogin =  $("#page-login");
  var $pageMain  =  $("#page-main");
  var $loginBtn  =  $("#login-btn");
  var $loginInfo =  $("#login-info");
  var form       =  document.forms["login"];
  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */

  $(window).ready(function() {
    var username = localStorage.username;
    var password = localStorage.password;
    if (username && password) {
      form.username.value = username;
      form.password.value = "123456";
      // $loginBtn.trigger("click");
    }
  });

  // 登录事件
  $loginBtn.on("click", function() {
    var username = form.username.value;
    var password = form.password.value;
    if (!username || !password) {
      $loginInfo.text("Please write your information.");
      return;
    }
    AJAX_postLoginInfo([username, password], function(json) {
      var user = json.data;
      localStorage.username = username;
      localStorage.password = password;
      if (json.success) {
        $pageMain.trigger("open", [user]);
      } else {
        $loginInfo.text("Please write correct information.");
      }
    });
  });

  // 回车触发登录点击
  $(window).on("keydown", function (event) {
    console.dir(event);
    if (event.keyCode == 13) {
      $loginBtn.trigger("click");
    }
    if (event.keyCode == 46) {
      localStorage.clear();
    }
  });





  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */





  /**
   * ---------------------------------------------------------------------------
   *  Business Logic
   * ---------------------------------------------------------------------------
   */





  /**
   * ---------------------------------------------------------------------------
   *  Content Render
   * ---------------------------------------------------------------------------
   */





  /**
   * ---------------------------------------------------------------------------
   *  External API
   * ---------------------------------------------------------------------------
   */

  function AJAX_postLoginInfo(data, success) {
    if (data[0] === "spraylee" && data[1] === "123456") {
      return function () {
        var jsonObj = {
          success: true,
          data   : ""
        }
        success(jsonObj);
      }();
    } else {
      return function () {
        var jsonObj = {
          success: false,
          data   : ""
        }
        success(jsonObj);
      }();
    }
    var url   = "";
    var param = data;
    $.ajax({
      type    : "POST",
      url     : url,
      data    : data,
      dataType: "json",
      success : success
    });
  }




})(window, document, $);
