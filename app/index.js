
var _clickFlag = false;
var _data = [];

//--------------------------------------------------------------------------------
// 初期処理
//--------------------------------------------------------------------------------
$(document).ready( function() {

  // タイトル
  _windowControl.TitleSet("加古川浸水把握システム");

  // サイドメニュー
  SideMenuDisp();

  // ログイン
  Login();

  // 閉じる処理
  $(document).on('click',  function( event ) {
    if( !_clickFlag ) {
      _windowControl.WindowClose("graph.html");
      _windowControl.WindowClose("explain.html");
    }
    _clickFlag = false;
  });

});

//--------------------------------------------------------------------------------
// サイドメニュー
//--------------------------------------------------------------------------------
var SideMenuDisp = function() {

  // サイドメニュ
  _htmlControl.BlockAdd({
      id: "side_block",
      left: 0,
      top: 0,
      width: 200,
      height: 800,
      backColor: "SteelBlue"
  });

  // タイトル
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 20,
      top: 10,
      size: 22,
      color: "White",
      text: "加 古 川 浸 水"
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 20,
      top: 40,
      size: 22,
      color: "White",
      text: "把 握 シ ス テ ム"
  });

  // 背景
  _htmlControl.BlockAdd({
      id: "map_area_block",
      left: 200,
      top: 0,
      width: 1400,
      height: 800,
      backImage: "img/background.png"
  });
}

//--------------------------------------------------------------------------------
// ログイン
//--------------------------------------------------------------------------------
var Login = function() {

  if( _storageControl.StorageGet("kakogawa_login") == "ok" ) {
    MapDisp();
    return;
  }

  _htmlControl.BlockAdd({
      pid: "map_area_block",
      id: "login_block",
      left: 500,
      top: 300,
      width: 300,
      height: 140,
      backColor: "SteelBlue",
      display: "block"
  });
  _htmlControl.TextAdd({
      pid: "login_block",
      left: 100,
      top: 10,
      size: 22,
      color: "White",
      text: "Ｌｏｇｉｎ"
  });
  _htmlControl.TextInputAdd({
      pid: "login_block",
      id: "user_name_input",
      left: 10,
      top: 50,
      width: 275,
      height: 40,
      placeholder: " ユーザー名",
      enter: LogInCheck
  });
  _htmlControl.TextInputAdd({
      pid: "login_block",
      id: "password_input",
      left: 10,
      top: 88,
      width: 275,
      height: 40,
      type: "password",
      placeholder: " パスワード",
      enter: LogInCheck
  });

  // エラー
  _htmlControl.BlockAdd({
      pid: "map_area_block",
      id: "error_block",
      left: 500,
      top: 450,
      width: 300,
      height: 40,
      backColor: "HotPink",
      display: "none"
  });
  _htmlControl.TextAdd({
      pid: "error_block",
      left: 20,
      top: 10,
      size: 12,
      color: "White",
      text: "ユーザー名、または、パスワードが違います。"
  });
}

//--------------------------------------------------------------------------------
// ログイン認証
//--------------------------------------------------------------------------------
var LogInCheck = function() {

  // IDとパスワードを取得する
  var login_id = _htmlControl.TextInputGet("user_name_input");
  var password = _htmlControl.TextInputGet("password_input");

  // ログインする
  var rtn = _windowControl.LogIn(login_id, password, 
    function() {
      _htmlControl.BlockEdit({
        id: "error_block",
        display: "none"
      });
      _storageControl.StorageSet("kakogawa_login", "ok");
      MapDisp();
    },
    function() {
      _htmlControl.BlockEdit({
        id: "error_block",
        display: "block"
      });
    } 
  );

}

var Return = function() {

  _htmlControl.BlockEdit({
      id: "error_block",
      display: "none"
  });

}

//--------------------------------------------------------------------------------
// 地図表示
//--------------------------------------------------------------------------------
var MapDisp = function() {

  // ログイン非表示
  _htmlControl.BlockEdit({
      id: "login_block",
      display: "none"
  });

  // 区切り
  var top = 85;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 10,
      top: top,
      width: 180,
      height: 2,
      backColor: "White"
  });
  // カメラ画像選択
  top += 20;
  _htmlControl.ImageAdd({
     pid: "side_block",
     left: 20,
     top: top,
     width: 27,
     height: 20,
     image: "img/cctv_white.png"
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "カメラ画像選択"
  });
  top += 30;
  _htmlControl.RadioAdd({
     pid: "side_block",
     id: "cctv_camera",
     left: 30,
     top: top,
     width: 20,
     height: 20,
     name: "camera",
     checked: true,
     func: ShinsuiDisp
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "浸水把握カメラ"
  });
  top += 30;
  _htmlControl.RadioAdd({
     pid: "side_block",
     id: "mimamori_camera",
     left: 30,
     top: top,
     width: 20,
     height: 20,
     name: "camera",
     func: ShinsuiDisp
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "見守りカメラ"
  });
  // 画像解析手法選択
  top += 40;
  _htmlControl.ImageAdd({
     pid: "side_block",
     left: 20,
     top: top,
     width: 20,
     height: 20,
     image: "img/mixer.png"
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "画像解析手法選択"
  });
  top += 30;
  _htmlControl.RadioAdd({
     pid: "side_block",
     id: "calc_flag_2",
     left: 30,
     top: top,
     width: 20,
     height: 20,
     name: "method",
     checked: _storageControl.LocalStorageGet("CalcFlag") == "2",
     func: CalcFlagSet
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "数値予測法"
  });
  _htmlControl.ImageButtonAdd({
     pid: "side_block",
     id: "explain",
     left: 165,
     top: top,
     width: 15,
     height: 15,
     padding: 1,
     image: "img/hatena.png",
     borderColor: "White",
     func: function() {
             _windowControl.WindowDisp("explain.html");
             _clickFlag = true;
           }
  });
  top += 30;
  _htmlControl.RadioAdd({
     pid: "side_block",
     id: "calc_flag_1",
     left: 30,
     top: top,
     width: 20,
     height: 20,
     name: "method",
     checked: _storageControl.LocalStorageGet("CalcFlag", "") == "",
     func: CalcFlagSet
  });
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 55,
     top: top,
     size: 16,
     color: "White",
     text: "水面検知法"
  });
  // 区切り
  top += 40;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 10,
      top: top,
      width: 180,
      height: 2,
      backColor: "White"
  });
  // 背景地図切り替え
  top += 20;
  _htmlControl.TextAdd({
     pid: "side_block",
     left: 20,
     top: top,
     size: 16,
     color: "White",
     text: "背景地図切り替え"
  });
  top += 30;
  _htmlControl.RadioAdd({
      pid: "side_block",
      id: "kihon",
      left: 30,
      top: top,
      width: 20,
      height: 20,
      name: "layer",
      checked: false,
      func: LayerSet
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 55,
      top: top,
      size: 16,
      color: "White",
      text: "標準地図"
  });
  top += 30;
  _htmlControl.RadioAdd({
      pid: "side_block",
      id: "ortho",
      left: 30,
      top: top,
      width: 20,
      height: 20,
      name: "layer",
      checked: true,
      func: LayerSet
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 55,
      top: top,
      size: 16,
      color: "White",
      text: "オルソ画像"
  });
  // 凡例
  top += 30;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 0,
      top: top,
      width: 200,
      height: 800-top,
      backColor: "White",
  });
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 0,
      top: top,
      width: 196,
      height: 796-top,
      borderColor: "SteelBlue",
      borderWidth: 2
  });
  // 凡例（浸水）
  top += 30;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 10,
      top: top-10,
      width: 176,
      height: 170,
      borderColor: "Black"
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 20,
      top: top,
      size: 16,
      text: "推定浸水深"
  });
  top += 30;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(250, 255, 181)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 88,
      top: top-2,
      size: 12,
      text: " ～   0.3m未満"
  });
  top += 20;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(242, 246, 175)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 50,
      top: top-2,
      size: 12,
      text: "  0.3m ～   0.5m未満"
  });
  top += 20;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(247, 221, 172)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 50,
      top: top-2,
      size: 12,
      text: "  0.5m ～   1.0m未満"
  });
  top += 20;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(255, 213, 191)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 50,
      top: top-2,
      size: 12,
      text: "  1.0m ～   3.0m未満"
  });
  top += 20;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(254, 185, 188)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 50,
      top: top-2,
      size: 12,
      text: "  3.0m ～   5.0m未満"
  });
  top += 20;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 30,
      top: top,
      width: 15,
      height: 15,
      backColor: "#"+toHex(254, 146, 146)
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 50,
      top: top-2,
      size: 12,
      text: "  5.0m ～ 10.0m未満"
  });

  // 凡例（カメラ）
  top += 60;
  _htmlControl.BlockAdd({
      pid: "side_block",
      left: 10,
      top: top-10,
      width: 176,
      height: 100,
      borderColor: "Black"
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 20,
      top: top,
      size: 16,
      text: "浸水把握カメラ"
  });
  top += 35;
  _htmlControl.ImageAdd({
      pid: "side_block",
      left: 25,
      top: top,
      width: 25,
      height: 20,
      image: "img/cctv_black.png"
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 60,
      top: top,
      size: 12,
      text: "浸水なし"
  });
  top += 25;
  _htmlControl.ImageAdd({
      pid: "side_block",
      left: 25,
      top: top,
      width: 25,
      height: 20,
      image: "img/cctv_red.png"
  });
  _htmlControl.TextAdd({
      pid: "side_block",
      left: 60,
      top: top,
      size: 12,
      text: "浸水あり"
  });

  // 地図表示
  _htmlControl.BlockAdd({
      pid: "map_area_block",
      id: "map_block", 
      width: 1400,
      height: 800,
      backColor: "White"
  });
  _mapControl.MapCreate("map_block", 34.785193, 134.882939, 14, FeaturePick);

  // 見守りカメラ読み込み
  _mapControl.PointJsonStdLoad("見守りカメラ", "json/mimamori_camera.geojson");

  // 浸水表示
  ShinsuiDisp();

}

var toHex = function( r, g, b )
{
  return ("0"+r.toString(16)).substr(-2)+("0"+g.toString(16)).substr(-2)+("0"+b.toString(16)).substr(-2);
}

//--------------------------------------------------------------------------------
// 浸水範囲表示
//--------------------------------------------------------------------------------
var ShinsuiDisp = function() {

  // 浸水範囲読み込み
  var calcFlag = "";
  if (_htmlControl.RadioGet("calc_flag_2")) calcFlag = "2";
  for (var i = 0; i < 5; i++) {
    if (i == 3) continue;
    _mapControl.MeshJsonLoad(_pointName[i],   "json" + calcFlag + "/" + _pointName[i] + ".geojson");
  }

  // データ取得
  var calcFlag = "";
  if (_htmlControl.RadioGet("calc_flag_2")) calcFlag = "2";
  for (var i = 0; i < 6; i++) {
   if (i == 3) continue;
   $.ajax({
      url: "json" + calcFlag + "/" + _pointName[i] + ".json?" + (new Date()).getTime(),
      type: "get",
      dataType: "json",
      async: false,
      success: function( data ) {
        _data[i] = data;
      },
      error: function( data ) {
        _data[i] = data;
      }
    });
  }

  // 浸水判定
  var flag = [false, false, false, false, false, false];
  for (var i = 0; i < 6; i++) {
    if (i == 3) continue;
    if (_data[i].lines.length > 0) {
      if (_data[i].lines.slice(-1)[0].flag == "False") {
        flag[i] = true;
      }
      else {
        flag[i] = _data[i].lines.slice(-1)[0].shinsui*1 >= _startSuii[i];
      }
    }
  }

  // カメラ画像
  if( _htmlControl.RadioGet("cctv_camera") ) {
    _mapControl.PointJsonLoad("CCTVカメラ", "json/cctv_camera.geojson", flag);
    _mapControl.LayerDispSet("見守りカメラ", false);
  }
  else {
    _mapControl.LayerDispSet("CCTVカメラ", false);
    _mapControl.LayerDispSet("見守りカメラ", true);
  }

  _mapControl.ReDraw();

  setTimeout(ShinsuiDisp, 60000);

}

//--------------------------------------------------------------------------------
// 図形ピック
//--------------------------------------------------------------------------------
var FeaturePick = function( features ) {

  for( var i = 0; i < features.length; i++ ) {
    if( features[i].layer.get("title") == "CCTVカメラ" ) {
      _storageControl.StorageSet("No", features[i].feature.get("No"));
      _windowControl.WindowDisp("graph.html");
      //_windowControl.DialogDisp("graph.html", 1183, 750);
      _clickFlag = true;
      return;
    }
  }

}

var LayerSet = function() {

  _mapControl.OrthoLayerSet(_htmlControl.RadioGet("ortho"));

}

//--------------------------------------------------------------------------------
// 画像解析手法切り替え
//--------------------------------------------------------------------------------
var CalcFlagSet = function() {

  var calcFlag = "";
  if( _htmlControl.RadioGet("calc_flag_2") ) calcFlag = "2";

  _storageControl.LocalStorageSet("CalcFlag", calcFlag);

  ShinsuiDisp();
}

