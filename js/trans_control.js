
//--------------------------------------------------------------------------------
//
// 座標変換
//
//        v_width                       実描画範囲幅
//        v_height                      実描画範囲高さ
//        g_width                       仮想描画範囲幅
//        g_height                      仮想描画範囲高さ
//
//--------------------------------------------------------------------------------
var TransControl = function( v_width, v_height, g_width, g_height ) {

  this._viewWidth = v_width;            // 実描画範囲幅
  this._viewHeight = v_height;          // 実描画範囲高さ
  this._graphWidth = g_width;           // 仮想描画範囲幅
  this._graphHeight = g_height;         // 最大水位

  if( this._viewHeight * this._graphWidth > this._viewWidth * this._graphHeight ) {
    this._scale = this._viewWidth / this._graphWidth;
    this._postX = 0;
    this._postY = (this._viewHeight - this._graphHeight * this._scale) / 2;
  }
  else {
    this._scale = this._viewHeight / this._graphHeight;
    this._postX = (this._viewWidth - this._graphWidth * this._scale) / 2;
    this._postY = 0;
  }
}

//--------------------------------------------------------------------------------
//
// 座標変換Ｘ
//
//        x                             変換前Ｘ座標
//        [return]                      変換後Ｘ座標
//
//--------------------------------------------------------------------------------
TransControl.prototype.ChangeX = function( x ) {

  return x * this._scale + this._postX;
}

//--------------------------------------------------------------------------------
//
// 座標変換Ｙ
//
//        y                             変換前Ｙ座標
//        [return]                      変換後Ｙ座標
//
//--------------------------------------------------------------------------------
TransControl.prototype.ChangeY = function( y ) {

  return this._viewHeight - (y * this._scale + this._postY);
}

//--------------------------------------------------------------------------------
//
// 長さ
//
//        l                             変換前長さ
//        [return]                      変換後長さ）
//
//--------------------------------------------------------------------------------
TransControl.prototype.ChangeL = function( l ) {

  return l * this._scale;
}

