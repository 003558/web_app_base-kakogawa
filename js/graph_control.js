
//--------------------------------------------------------------------------------
//
// グラフ作成
//
//        id                            ID
//        g_width                       幅
//        g_height                      高さ
//
//--------------------------------------------------------------------------------
var GraphControl = function( id, g_width, g_height ) {

  canvas = $("#"+id)[0];
  this._graph = canvas.getContext("2d");

  this._width = canvas.width;
  this._height = canvas.height;
  this._transControl = new TransControl(this._width, this._height, g_width, g_height);
}

//--------------------------------------------------------------------------------
//
// 図形をクリアする
//
//--------------------------------------------------------------------------------
GraphControl.prototype.AllClear = function() {

  this._graph.clearRect(0, 0, this._width, this._height);
}

//--------------------------------------------------------------------------------
//
// 直線を描画する
//
//        color                         ライン色
//        x1                            開始点Ｘ座標
//        y1                            開始点Ｙ座標
//        x2                            終了点Ｘ座標
//        y2                            終了点Ｙ座標
//        lineWidth                     ライン太さ
//
//--------------------------------------------------------------------------------
GraphControl.prototype.LineDraw = function( color, x1, y1, x2, y2, lineWidth ) {

  this._graph.strokeStyle = color;
  if( lineWidth != null ) this._graph.lineWidth = lineWidth;
  else                    this._graph.lineWidth = 1;
  this._graph.beginPath();
  this._graph.moveTo(this._transControl.ChangeX(x1), this._transControl.ChangeY(y1));
  this._graph.lineTo(this._transControl.ChangeX(x2), this._transControl.ChangeY(y2));
  this._graph.closePath();
  this._graph.stroke();
}

//--------------------------------------------------------------------------------
//
// 点線を描画する
//
//        color                         ライン色
//        x1                            開始点Ｘ座標
//        y1                            開始点Ｙ座標
//        x2                            終了点Ｘ座標
//        y2                            終了点Ｙ座標
//        lineWidth                     ライン太さ
//
//--------------------------------------------------------------------------------
GraphControl.prototype.DotDraw = function( color, x1, y1, x2, y2, lineWidth ) {

  this._graph.strokeStyle = color;
  if( lineWidth != null ) this._graph.lineWidth = lineWidth;
  else                    this._graph.lineWidth = 1;
  this._graph.beginPath();
  var dx = x2 - x1;
  var dy = y2 - y1;
  var len = Math.sqrt(dx * dx + dy * dy);
  if( len == 0.0 ) return;
  dx /= len;
  dy /= len;
  this._graph.moveTo(this._transControl.ChangeX(x1), this._transControl.ChangeY(y1));
  var l = 0;
  var draw = true;
  while (l < len) {
    l += 2;
    if( l > len ) l = len;
    draw ? this._graph.lineTo(this._transControl.ChangeX(x1 + l * dx), this._transControl.ChangeY(y1 + l * dy))
         : this._graph.moveTo(this._transControl.ChangeX(x1 + l * dx), this._transControl.ChangeY(y1 + l * dy));
    draw = !draw;
  }
  this._graph.closePath();
  this._graph.stroke();
}

//--------------------------------------------------------------------------------
//
// 破線を描画する
//
//        color                         ライン色
//        x1                            開始点Ｘ座標
//        y1                            開始点Ｙ座標
//        x2                            終了点Ｘ座標
//        y2                            終了点Ｙ座標
//        lineWidth                     ライン太さ
//
//--------------------------------------------------------------------------------
GraphControl.prototype.DashDraw = function( color, x1, y1, x2, y2, lineWidth ) {

  this._graph.strokeStyle = color;
  if( lineWidth != null ) this._graph.lineWidth = lineWidth;
  else                    this._graph.lineWidth = 1;
  this._graph.beginPath();
  var dx = x2 - x1;
  var dy = y2 - y1;
  var len = Math.sqrt(dx * dx + dy * dy);
  if( len == 0.0 ) return;
  dx /= len;
  dy /= len;
  this._graph.moveTo(this._transControl.ChangeX(x1), this._transControl.ChangeY(y1));
  var l = 0;
  var draw = true;
  while (l < len) {
    l += 5;
    if( l > len ) l = len;
    draw ? this._graph.lineTo(this._transControl.ChangeX(x1 + l * dx), this._transControl.ChangeY(y1 + l * dy))
         : this._graph.moveTo(this._transControl.ChangeX(x1 + l * dx), this._transControl.ChangeY(y1 + l * dy));
    draw = !draw;
  }
  this._graph.closePath();
  this._graph.stroke();
}

//--------------------------------------------------------------------------------
//
// 矩形を描画する
//
//        color                         ライン色
//        x1                            １点目Ｘ座標
//        y1                            １点目Ｙ座標
//        x2                            ２点目Ｘ座標
//        y2                            ２点目Ｙ座標
//
//--------------------------------------------------------------------------------
GraphControl.prototype.RectDraw = function( color, x1, y1, x2, y2 ) {

  var x, y, width, height;
  if( x1 < x2 ) {
    x = this._transControl.ChangeX(x1);
    width = this._transControl.ChangeL(x2 - x1);
  }
  else {
    x = this._transControl.ChangeX(x2);
    width = this._transControl.ChangeL(x1 - x2);
  }
  if( y1 < y2 ) {
    y = this._transControl.ChangeY(y2);
    height = this._transControl.ChangeL(y2 - y1);
  }
  else {
    y = this._transControl.ChangeY(y1);
    height = this._transControl.ChangeL(y1 - y2);
  }
  this._graph.strokeStyle = color;
  this._graph.beginPath();
  this._graph.strokeRect(x, y, width, height);
}

//--------------------------------------------------------------------------------
//
// 塗り潰し矩形を描画する
//
//        color                         塗り潰し色
//        x1                            １点目Ｘ座標
//        y1                            １点目Ｙ座標
//        x2                            ２点目Ｘ座標
//        y2                            ２点目Ｙ座標
//
//--------------------------------------------------------------------------------
GraphControl.prototype.FillRectDraw = function( color, x1, y1, x2, y2 ) {

  var x, y, width, height;
  if( x1 < x2 ) {
    x = this._transControl.ChangeX(x1);
    width = this._transControl.ChangeL(x2 - x1);
  }
  else {
    x = this._transControl.ChangeX(x2);
    width = this._transControl.ChangeL(x1 - x2);
  }
  if( y1 < y2 ) {
    y = this._transControl.ChangeY(y2);
    height = this._transControl.ChangeL(y2 - y1);
  }
  else {
    y = this._transControl.ChangeY(y1);
    height = this._transControl.ChangeL(y1 - y2);
  }
  this._graph.fillStyle = color;
  this._graph.beginPath();
  this._graph.fillRect(x, y, width, height);
}

//--------------------------------------------------------------------------------
//
// 円を描画する
//
//        color                         ライン色
//        x                             Ｘ座標
//        y                             Ｙ座標
//        radius                        半径
//
//--------------------------------------------------------------------------------
GraphControl.prototype.CircleDraw = function( color, x, y, radius ) {

  this._graph.strokeStyle = color;
  this._graph.beginPath();
  this._graph.arc(this._transControl.ChangeX(x), this._transControl.ChangeY(y), radius, 0, Math.PI*2, false);
  this._graph.stroke();
}

//--------------------------------------------------------------------------------
//
// 文字列を描画する
//
//        color                         文字列色
//        size                          文字サイズ
//        x                             Ｘ座標
//        y                             Ｙ座標
//        text                          文字列
//        angle                         回転角
//
//--------------------------------------------------------------------------------
GraphControl.prototype.TextDraw = function( color, size, x, y, text, angle ) {

  this._graph.fillStyle = color;
  this._graph.font = size+"px 'ＭＳ 明朝'";
  if( angle != null ) {
    var a = angle * Math.PI / 180;
    var c = Math.cos(a);
    var s = Math.sin(a);
    this._graph.setTransform(c, s, -s, c, this._transControl.ChangeX(x), this._transControl.ChangeY(y));
    this._graph.fillText(text, 0, 0);
    this._graph.setTransform(1,0,0,1,0,0);
  }
  else {
    this._graph.fillText(text, this._transControl.ChangeX(x), this._transControl.ChangeY(y));
  }
}

//--------------------------------------------------------------------------------
//
// 連続線を描画する（開始）
//
//        color                         枠色
//        fillColor                     塗り潰し色
//        x                             Ｘ座標
//        y                             Ｙ座標
//
//--------------------------------------------------------------------------------
GraphControl.prototype.PolylineStart = function( color, fillColor, x, y ) {

  this._graph.strokeStyle = color;
  this._graph.fillStyle = fillColor;
  this._graph.beginPath();
  this._graph.moveTo(this._transControl.ChangeX(x), this._transControl.ChangeY(y));
}

//--------------------------------------------------------------------------------
//
// 連続線を描画する（途中）
//
//        x                             Ｘ座標
//        y                             Ｙ座標
//
//--------------------------------------------------------------------------------
GraphControl.prototype.PolylineSet = function( x, y ) {

  this._graph.lineTo(this._transControl.ChangeX(x), this._transControl.ChangeY(y));
}

//--------------------------------------------------------------------------------
//
// 連続線を描画する（終了）
//
//        close                         true：閉じる
//
//--------------------------------------------------------------------------------
GraphControl.prototype.PolylineEnd = function( close ) {

  this._graph.closePath();
  if( close ) {
    this._graph.fill();
  }
  else {
    this._graph.stroke();
  }
}

