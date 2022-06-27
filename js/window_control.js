
//--------------------------------------------------------------------------------
//
// ウィンドウ制御
//
//--------------------------------------------------------------------------------
var WindowControl = function() {

  this._dateControl = new DateControl();
  this.windowList = [];
}

//--------------------------------------------------------------------------------
//
// タイトルを設定する
//
//        title                         タイトル
//
//--------------------------------------------------------------------------------
WindowControl.prototype.TitleSet = function( title ) {

  document.title = title;
}

//--------------------------------------------------------------------------------
//
// Window幅を取得する
//
//        [return]                      ウィンドウ幅
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowWidthGet = function() {

  return $(window).width();
}

//--------------------------------------------------------------------------------
//
// Windowサイズを変更する
//
//        width                         幅
//        height                        高さ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowSizeSet = function( param ) {

  param = param || {};
  if( param.width  != null ) width  = param.width;
  if( param.height != null ) height = param.height;

  resizeTo(width, height);
}

//--------------------------------------------------------------------------------
//
// Windowを表示する
//
//        url                           ＵＲＬ
//        name                          ウィンドウ名
//        close                         閉じるフラッグ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowDisp = function( url, name, close ) {

  // オプションを設定する
  var opt = "width=150,height=150,menubar=no,toolbar=no,location=no,directories=no,status=no,resizable=no,scrollbars=no";
  //var opt = "width=150,height=150,resizable=yes,scrollbars=yes";

  // 既に開いていれば、閉じる
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    if( close != false ) this.windowList[url].close();
    else                 return this.windowList[url];
  }

  // ウィンドウオブジェクトを取得
  var wd = window.open(url+"?"+this._dateControl.DateFormat(new Date(), "YYYYMMDDhhmmss"), name, opt);
  this.windowList[url] = wd;

  // ウィンドウにフォーカス移動
  wd.focus();

  return wd;
}

WindowControl.prototype.WindowDispSize = function( url, name, close, width, height ) {

  // オプションを設定する
  var opt = "width=" + width + ",height=" + height + ",menubar=no,toolbar=no,location=no,directories=no,status=no,resizable=no,scrollbars=no";

  // 既に開いていれば、閉じる
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    if( close != false ) this.windowList[url].close();
    else                 return this.windowList[url];
  }

  // ウィンドウオブジェクトを取得
  var wd = window.open(url+"?"+new Date(), name, opt);
  this.windowList[url] = wd;

  // ウィンドウにフォーカス移動
  wd.focus();

  return wd;
}

//--------------------------------------------------------------------------------
//
// Windowを閉じる
//
//        url                           ＵＲＬ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowClose = function( url ) {

  // 既に開いていれば、閉じる
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    this.windowList[url].close();
  }
}

//--------------------------------------------------------------------------------
//
// Dialogを表示する
//
//        url                           ＵＲＬ
//        width                         幅
//        height                        高さ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DialogDisp = function( url, width, height ) {

  // オプションを設定する
  var opt = "dialogWidth="+width+"px;dialogHeight="+height+"px;";

  // 既に開いていれば、何もしない
  if( this.windowList[url] && !this.windowList[url].closed )   return;

  // ダイアログを表示する
  var wd = showModalDialog(url+"?"+new Date(), window, opt);
  this.windowList[url] = wd;

  return wd;
}

//--------------------------------------------------------------------------------
//
// CGIを呼出す
//
//        url                           実行ファイル
//        par                           パラメータ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CgiExecute = function( url, par ) {

  $.ajax({
    async: false,
    type: "GET",
    url: url,
    data: par,
    timeout: 10000,
    success: function( data ) {
      rtn = data;
    },
    error: function( data ) {
      rtn = false;
    }
  });
}

//--------------------------------------------------------------------------------
//
// ログインする
//
//        login_id                      ログインID
//        password                      パスワード
//        ok_func                       OKの場合の処理
//        out_func                      OUTの場合の処理
//
//--------------------------------------------------------------------------------
WindowControl.prototype.LogIn = function( login_id, password, ok_func, out_func ) {

  $.ajax({
    url: "login/" + login_id + "_" + password + ".php"
  }).done(function() {
    ok_func();
  }).fail(function() {
    out_func();
  });

}

//--------------------------------------------------------------------------------
//
// ログアウトする
//
//--------------------------------------------------------------------------------
WindowControl.prototype.LogOut = function( name ) {

  $.ajax({
    url: "php/logout.php",
    data: {
      dummy: '' + new Date()
    },
    async: false,
    type: "GET",
    timeout: 10000
  });
}

//--------------------------------------------------------------------------------
//
// 遅延を実行する
//
//        func                          実行関数
//        time                          遅延時間
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DelayExecute = function( func, time ) {

  if( time == null ) time = 10;
  return window.setTimeout(func, time);
}

//--------------------------------------------------------------------------------
//
// 遅延実行を停止する
//
//        id                            実行ID
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DelayStop = function( id ) {

  window.clearTimeout(id);
}

//--------------------------------------------------------------------------------
//
// Waitカーソルを表示する
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CursorWait = function() {

  document.body.style.cursor = "wait";
}

//--------------------------------------------------------------------------------
//
// Defaultカーソルを表示する
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CursorDefault = function() {

  document.body.style.cursor = "default";
}

//--------------------------------------------------------------------------------
//
// ファイルをダウンロードをする
//
//        url                           ＵＲＬ
//
//--------------------------------------------------------------------------------
WindowControl.prototype.Download = function( url ) {

  location.href = url+"?"+new Date();
}

//--------------------------------------------------------------------------------
//
// クッキーに保存する
//
//        name                          名前
//        value                         値
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CookieSave = function( name, value ) {

  document.cookie = name+"="+value;
}

//--------------------------------------------------------------------------------
//
// セッションを取得する
//
//        name                          名前
//        [return]                      値
//
//--------------------------------------------------------------------------------
WindowControl.prototype.SessionGet = function( name ) {

  $.ajax({
    url: "php/session_get.php",
    data: {
      name: name,
      dummy: '' + new Date()
    },
    success: function( data ) {
      rtn = data;
    },
    error: function( data ) {
      rtn = false;
    },
    async: false,
    type: "GET",
    timeout: 10000
  });

  return rtn;
}

//--------------------------------------------------------------------------------
//
// 現在のページを再読み込みする
//
//--------------------------------------------------------------------------------
WindowControl.prototype.Reload = function() {

  location.reload();
}

//--------------------------------------------------------------------------------
//
// ファイルを読み込む
//
//        file_name                     ファイル名
//
//--------------------------------------------------------------------------------
WindowControl.prototype.FileRead = function( file_name ) {

  $.ajax({
    url: "php/file_read.php",
    data: {
      file_name: file_name,
      dummy: '' + new Date()
    },
    success: function( data ) {
      rtn = data;
    },
    error: function( data ) {
      rtn = false;
    },
    async: false,
    type: "GET",
    timeout: 10000
  });

  return rtn;
}

//--------------------------------------------------------------------------------
//
// 処理中を表示
//
//        mesg                          メッセージ
//        func                          実行関数
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WaitStart = function( mesg, func ) {

  var msgCss = "style='display:table-cell;text-align:center;vertical-align:middle;padding-top:100px;font-size:25px;'"
  var waitCss = "style='display:table;width:100%;height:100%;position:fixed;top:0;left:0;"+
                "background-color:#fff;opacity:0.8;'";
    
  var dispMsg = "<div "+msgCss+">"+mesg+"</div>";
  $("body").append("<div id='wait' "+waitCss+">"+dispMsg+"</div>");

  window.setTimeout( function() {

    func();

    $("#wait").remove();
  
  }, 100);

}
