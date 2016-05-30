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

  var $choseList = $("#main-choseList");
  var $tmpChoseList = $("#tmp-main-choseList");

  var $imgBox = $("#main-imgBox");
  var $tmpImgBox = $("#tmp-main-imgBox");

  var $imgArea = $(".img-area");

  var _choseList = [];
  var _currentSong = null;

  // var _mouseState = {
  //   x: undefined,
  //   y: undefined,
  //   scrollFromX: undefined,
  // }
  /**
   * ---------------------------------------------------------------------------
   *  Event Binding
   * ---------------------------------------------------------------------------
   */
  $pageMain.on("open", function (event, data) {
    $(window).trigger("pageOpen", [$pageMain, $pageLogin]);
    HANDLER_initPage(data);
  });

  // $imgBox.on("resize", HANDLER_changImgSize);
  //
  // $imgBox.on("mousedown", function (event) {
  //   _mouseState.x = event.screenX;
  //   _mouseState.scrollFromX = $imgBox.position().left;
  //   console.log("set:      " + _mouseState.scrollFromX);
  //   console.log("_____________________________");
  // });
  // $imgBox.on("mousemove", function (event) {
  //   if (event.buttons === 1) {
  //     $imgBox[0].style.left =  event.screenX - _mouseState.x + _mouseState.scrollFromX + "px";
  //     if ($imgBox.position().left > 0 ) {
  //       $imgBox[0].style.left = 0 + "px";
  //     }
  //     if ($imgBox.position().left < $imgArea.width() - $imgBox.width()) {
  //       $imgBox[0].style.left = $imgArea.width() - $imgBox.width() + "px";
  //     }
  //     console.log(event.screenX - _mouseState.x);
  //   }
  // });
  // $(window).on("mouseup", function (event) {
  //   console.log("to:  " + $imgBox.position().left);
  //   console.log("++++++++++++++++++++++++++++++");
  // });

  /**
   * ---------------------------------------------------------------------------
   *  Event Handler
   * ---------------------------------------------------------------------------
   */
  function HANDLER_initPage(user) {
    AJXA_getDefaultList(user, function (json) {
      var sortedList = HANDLER_sortList(json.data, "pickTimes", "-");
      _choseList = sortedList;
      _currentSong = sortedList[0];
      RENDER_choseList(sortedList);
      RENDER_showSong(sortedList[0].page);
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

    if (roomWidth > roomHeight) {
      for (var i = 0; i < _currentSong.page.length; i++) { //20 上下边距加边框  mediaBarHeight 音乐条高度
        $imgBox.find(".img-item")[i].style.height = document.documentElement.clientHeight - 20 + "px";
        $imgBox.find(".img-item")[i].style.width = (document.documentElement.clientHeight - 20) / 1.4 + 20 + "px";
      }
      $imgBox.width(((document.documentElement.clientHeight - 20) / 1.4 + 40) * _currentSong.page.length);
    } else {
      for (var i = 0; i < _currentSong.page.length; i++) { //20 上下边距加边框  mediaBarHeight 音乐条高度
        $imgBox.find(".img-item")[i].style.width = document.documentElement.clientWidth - 20 + "px";
        $imgBox.find(".img-item")[i].style.height = (roomHeight- 20 - mediaBarHeight) + "px";
      }
    }
  }
  // console.dir(document.documentElement);

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
    return function () {
      var jsonObj = {
        success: true,
        data   : [{
          id: 0,
          name: "song1",
          time: "3:00",
          lastTime: 120,
          pickTimes: 31,
          page: ["page/song_0/page_0.gif", "page/song_0/page_1.gif", "page/song_0/page_2.gif"]
        }, {
          id: 1,
          name: "song2",
          time: "5:20",
          lastTime: 170,
          pickTimes: 13,
          page: ["page/song_1/page_0.png", "page/song_1/page_1.png"]
        }, {
          id:2,
          name: "song3",
          time: "1:20",
          lastTime: 150,
          pickTimes: 18,
          page: ["page/song_2/page_0.png", "page/song_2/page_1.png"]
        }]
      }
      success(jsonObj);
    }();
    var url = "";
    var param = user;
    $.ajax({
      type    : "POST",
      url     : url,
      data    : param,
      dataType: "json",
      success : success
    });
  }



})(window, document, $);
