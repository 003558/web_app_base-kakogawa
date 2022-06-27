
//--------------------------------------------------------------------------------
//
// HTML作成関数
//
//--------------------------------------------------------------------------------
var HtmlControl = function() {

  this._dateControl = new DateControl();
}

//--------------------------------------------------------------------------------
//
// すべての要素に枠線を描画する
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BorderLine = function() {

  $("*").css("border","1px solid red");
}

//--------------------------------------------------------------------------------
//
// ブロックを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        margin                        margin
//        float                         float
//        zindex                        z-index
//        disabled                      入力不可
//        align                         文字位置
//        backColor                     背景色
//        backImage                     背景イメージ
//        backSize                      背景サイズ
//        borderColor                   枠色
//        borderWidth                   枠幅
//        display                       表示／非表示
//        scrollX                       true：横スクロールあり
//        scrollY                       true: 縦スクロールあり
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BlockAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.zindex      != null ) {
    elm.css('z-index', param.zindex);
    var width = elm.css('width')*1+1;
    var height = elm.css('height')*1+1;
    elm.css('clip', "rect(0,"+width+","+height+",0)");
  }
  if( param.backColor   != null ) elm.css('background-color', param.backColor );
  if( param.backImage   != null ) {
    elm.css('background-image', 'url('+param.backImage+')' );
    elm.css('background-position', 'center center');
    elm.css('background-repeat', 'no-repeat');
  }
  if( param.backSize    != null ) elm.css('background-size', param.backSize );
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.align       != null ) elm.attr('align', param.align);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.scrollX     == true ) elm.css('overflow-x', 'scroll');
  if( param.scrollY     == true ) elm.css('overflow-y', 'scroll');
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.func        != null ) {
    elm.css('cursor', 'pointer');
    elm.click(function() {
      param.func();
    });
  }
  if( param.move        == true ) {
    elm.mousedown(function(e) {
      elm.drag = true;
      elm.x = e.pageX;
      elm.y = e.pageY;
    });
    elm.mouseup(function() {
      elm.drag = false;
    });
    elm.mousemove(function(e) {
      if( !elm.drag ) return;
      var x; // x座標
      var y; // y座標
      var rect = {}; // 四角形の(x, y, w, h)が入る

      // 四角形の(x, y, w, h) = (X座標, Y座標, 幅, 高さ)を取得
      rect.x = elm.css('left').replace('px','')*1;
      rect.y = elm.css('top').replace('px','')*1;
      rect.w = elm.css('width').replace('px','')*1;
      rect.h = elm.css('height').replace('px','')*1;

      // マウスの位置がドラッグを行いたい要素の中なら
      if (e.pageX > rect.x && e.pageX < rect.x + rect.w) {
        if (e.pageY > rect.y && e.pageY < rect.y + rect.h) {
          // 要素をマウスに付い順させて動かす
          rect.x += e.pageX-elm.x;
          rect.y += e.pageY-elm.y;
          elm.x = e.pageX;
          elm.y = e.pageY;

          // 要素のスタイルと場所を変更
          elm.css('top', rect.y);
          elm.css('left', rect.x);
        }
      }
    });      
  }
}

//--------------------------------------------------------------------------------
//
// ブロックを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        disabled                      disabled
//        borderColor                   枠色
//        borderTopColor                上枠色
//        borderBottomColor             下枠色
//        borderLeftColor               左枠色
//        borderRightColor              右枠色
//        backColor                     背景色
//        backImage                     背景イメージ
//        backSize                      背景サイズ
//        display                       表示／非表示
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BlockEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top               != null ) elm.css('top', param.top);
  if( param.left              != null ) elm.css('left', param.left);
  if( param.top               != null ||
      param.left              != null ) elm.css('position', 'absolute');
  if( param.position          != null ) elm.css('position', param.position);
  if( param.width             != null ) elm.css('width', param.width);
  if( param.height            != null ) elm.css('height', param.height);
  if( param.padding           != null ) elm.css('padding', param.padding);
  if( param.borderWidth       == null ) param.borderWidth = "1";
  if( param.borderColor       != null ) elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  if( param.borderTopColor    != null ) elm.css('border-top', param.borderWidth+'px solid '+param.borderTopColor);
  if( param.borderBottomColor != null ) elm.css('border-bottom', param.borderWidth+'px solid '+param.borderBottomColor);
  if( param.borderLeftColor   != null ) elm.css('border-left', param.borderWidth+'px solid '+param.borderLeftColor);
  if( param.borderRightColor  != null ) elm.css('border-right', param.borderWidth+'px solid '+param.borderRightColor);
  if( param.backColor         != null ) elm.css('background-color', param.backColor );
  if( param.backImage         != null ) {
    elm.css('background-image', 'url('+param.backImage+')' );
    elm.css('background-position', 'center center');
    elm.css('background-repeat', 'no-repeat');
  }
  if( param.backSize          != null ) elm.css('background-size', param.backSize );
  if( param.display           != null ) elm.css('display', param.display);
  if( param.disabled          != null ) elm.attr('disabled', param.disabled);
}

//--------------------------------------------------------------------------------
//
// ブロックをクリアする
//
//        tid                           ブロックID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BlockClear = function( id ) {

  $('#'+id).empty();
}

//--------------------------------------------------------------------------------
//
// ブロックを削除する
//
//        tid                           ブロックID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BlockDelete = function( id ) {

  $('#'+id).remove();
}

//--------------------------------------------------------------------------------
//
// ブロックをスクロールする
//
//        id                            ブロックID
//        top                           表示位置
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.BlockScroll = function( id, top ) {

  $('#'+id).animate({scrollTop: top}, 'fast');
}

//--------------------------------------------------------------------------------
//
// リストを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        zindex                        z-index
//        backColor                     背景色
//        backImage                     背景イメージ
//        borderColor                   枠色
//        borderWidth                   枠幅
//        display                       表示／非表示
//        scrollX                       true：横スクロールあり
//        scrollY                       true: 縦スクロールあり
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ListAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.zindex      != null ) {
    elm.css('z-index', param.zindex);
    var width = elm.css('width')*1+1;
    var height = elm.css('height')*1+1;
    elm.css('clip', "rect(0,"+width+","+height+",0)");
  }
  if( param.backColor   != null ) elm.css('background-color', param.backColor );
  if( param.backImage   != null ) {
    elm.css('background-image', 'url('+param.backImage+')' );
    elm.css('background-position', 'center center');
    elm.css('background-repeat', 'no-repeat');
  }
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.display     != null ) elm.css('display', param.display);
  if( param.scrollX     == true ) elm.css('overflow-x', 'scroll');
  if( param.scrollY     == true ) elm.css('overflow-y', 'scroll');

  var ul = $('<ul></ul>');
  ul.appendTo(elm);
}

//--------------------------------------------------------------------------------
//
// リストを編集する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        zindex                        z-index
//        backColor                     背景色
//        backImage                     背景イメージ
//        borderColor                   枠色
//        borderWidth                   枠幅
//        display                       表示／非表示
//        scrollX                       true：横スクロールあり
//        scrollY                       true: 縦スクロールあり
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ListEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.zindex      != null ) {
    elm.css('z-index', param.zindex);
    var width = elm.css('width')*1+1;
    var height = elm.css('height')*1+1;
    elm.css('clip', "rect(0,"+width+","+height+",0)");
  }
  if( param.backColor   != null ) elm.css('background-color', param.backColor );
  if( param.backImage   != null ) {
    elm.css('background-image', 'url('+param.backImage+')' );
    elm.css('background-position', 'center center');
    elm.css('background-repeat', 'no-repeat');
  }
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.display     != null ) elm.css('display', param.display);
  if( param.scrollX     == true ) elm.css('overflow-x', 'scroll');
  if( param.scrollY     == true ) elm.css('overflow-y', 'scroll');

}

//--------------------------------------------------------------------------------
//
// リスト要素を追加する
//
//        uid                           リストID
//        value                         value
//        text                          文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ListItemAdd = function( param ) {

  param = param || {};
  if( param.uid == null ) return;
  var li = $('<li></li>');
  var elm = li.appendTo($('#'+param.uid+' ul'));
  if( param.value != null ) elm.attr('value', param.value);
  if( param.text  != null ) elm.text(param.text);
}

//--------------------------------------------------------------------------------
//
// セレクトを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        margin                        margin
//        width                         width
//        height                        height
//        float                         float
//        padding                       padding
//        display                       表示／非表示
//        size                          文字サイズ
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.display     != null ) elm.css('display', param.display);

  var select = $('<select></select>');
  elm = select.appendTo(elm);
  if( param.id          != null ) elm.attr('name', param.id);
  if( param.width       != null ) elm.css('width', '100%');
  if( param.height      != null ) elm.css('height', param.height);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// セレクトを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        display                       表示／非表示
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.display     != null ) elm.css('display', param.display);
}

//--------------------------------------------------------------------------------
//
// セレクト要素を追加する
//
//        sid                           リストID
//        value                         value
//        text                          文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectItemAdd = function( sid, value, text ) {

  var option = $('<option></option>');
  var elm = option.appendTo($('#'+sid+' select'));
  elm.attr('value', value);
  elm.text(text);
}

//--------------------------------------------------------------------------------
//
// セレクト要素を選択する
//
//        sid                           リストID
//        value                         選択要素
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectItemSet = function( sid, value ) {

  return $('#'+sid+" select").val(value);
}

//--------------------------------------------------------------------------------
//
// セレクト要素を取得する
//
//        sid                           リストID
//        [return]                      選択要素
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectItemGet = function( sid ) {

  return $('#'+sid+" select").val();
}

//--------------------------------------------------------------------------------
//
// セレクト文字列を取得する
//
//        sid                           リストID
//        [return]                      選択文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectItemTextGet = function( sid ) {

  return $('[name='+sid+'] option:selected').text();
}

//--------------------------------------------------------------------------------
//
// セレクト要素をクリアする
//
//        sid                           リストID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SelectItemClear = function( sid ) {

  $('#'+sid+" option").remove();
}

//--------------------------------------------------------------------------------
//
// テーブルを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        zindex                        z-index
//        borderColor                   枠色
//        backColor                     背景色
//        display                       表示／非表示
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));

  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.zindex      != null ) elm.css('z-index', param.zindex);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor );
  if( param.backColor   != null ) elm.css('background-color', param.backColor );
  if( param.display     != null ) elm.css('display', param.display);

  var table = $('<table></table>');
  elm = table.appendTo(elm);
  elm.css('border-collapse', 'collapse');
}

//--------------------------------------------------------------------------------
//
// テーブルを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        borderColor                   枠色
//        display                       表示／非表示
//        disabled                      disabled
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor );
  if( param.display     != null ) elm.css('display', param.display);
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
}

//--------------------------------------------------------------------------------
//
// テーブルヘッダーを追加する
//
//        tid                           テーブルID
//        width                         width
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableHeaderAdd = function( param ) {

  param = param || {};
  if( param.tid == null ) return;
  var thead = $('<thead></thead>');
  var elm = thead.appendTo($('#'+param.tid+' table'));
  if( param.width   != null ) elm.css('width', param.width);
  elm.css('display', 'block');
}

//--------------------------------------------------------------------------------
//
// テーブルヘッダー行を追加する
//
//        tid                           テーブルID
//        height                        height
//        size                          文字サイズ
//        backColor                     背景色
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableHeaderRowAdd = function( param ) {

  param = param || {};
  if( param.tid       == null ) return;
  var tr = $('<tr></tr>');
  var elm = tr.appendTo($('#'+param.tid+' thead'));

  if( param.height    != null ) elm.css('height', param.height);
  if( param.size      != null ) elm.css('font-size', param.size);
  if( param.backColor != null ) elm.css('background-color', param.backColor);
}

//--------------------------------------------------------------------------------
//
// テーブルヘッダー要素を追加する
//
//        tid                           テーブルID
//        width                         カラム幅
//        borderColor                   枠色
//        title                         カラム名
//        colSpan                       列結合
//        rowSpan                       行結合
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableHeaderItemAdd = function( param ) {

  param = param || {};
  if( param.tid         == null ) return;
  var th = $('<td></td>');
  var elm = th.appendTo($('#'+param.tid+' thead tr:last'));
  if( param.width       != null ) elm.css('width', param.width);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.title       != null ) {
    var titles = param.title.split("\n");
    for( var i = 0; i < titles.length; i++ ) {
      var div = $('<div>'+titles[i]+'</div>');
      div.appendTo(elm);
    }
  }
  elm.css('text-align', 'center');
  if( param.colSpan     != null ) elm.attr('colspan', param.colSpan);
  if( param.rowSpan     != null ) elm.attr('rowspan', param.rowSpan);
}

//--------------------------------------------------------------------------------
//
// テーブルボディを追加する
//
//        tid                           テーブルID
//        width                         width
//        height                        height
//        padding                       padding
//        borderColor                   枠色
//        size                          文字サイズ
//        scroll                        true：スクロールあり
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyAdd = function( param ) {

  param = param || {};
  if( param.tid         == null ) return;
  var tbody = $('<tbody></tbody>');
  var elm = tbody.appendTo($('#'+param.tid+' table'));
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.scroll      == true ) elm.css('overflow-y', 'scroll');
  elm.css('display', 'block');
}

//--------------------------------------------------------------------------------
//
// テーブルボディ行を追加する
//
//        tid                           テーブルID
//        height                        height
//        size                          文字サイズ
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyRowAdd = function( param ) {

  param = param || {};
  if( param.tid     == null ) return;
  var tr = $('<tr></tr>');
  elm = tr.appendTo($('#'+param.tid+' tbody'));

  if( param.height != null ) elm.css('height', param.height);
  if( param.size   != null ) elm.css('font-size', param.size);
}

//--------------------------------------------------------------------------------
//
// テーブルボディ要素を追加する（ラベル）
//
//        tid                           テーブルID
//        width                         カラム幅
//        height                        カラム高さ
//        backColor                     背景色
//        borderColor                   枠色
//        borderTopColor                上枠色
//        borderBottomColor             下枠色
//        borderLeftColor               左枠色
//        borderRightColor              右枠色
//        padding                       padding
//        color                         文字色
//        size                          文字サイズ
//        weight                        文字太さ
//        align                         文字位置
//        rowspan                       行結合
//        colspan                       列結合
//        data                          データ
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyItemAdd = function( param ) {

  param = param || {};
  if( param.tid               == null ) return;
  var td = $('<td></td>');
  var elm = td.appendTo($('#'+param.tid+' tbody tr:last'));
  if( param.width             != null ) elm.css('width', param.width);
  if( param.height            != null ) elm.css('height', param.height);
  if( param.backColor         != null ) elm.css('background-color', param.backColor);
  if( param.borderColor       != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.borderTopColor    != null ) elm.css('border-top', '1px solid '+param.borderTopColor);
  if( param.borderBottomColor != null ) elm.css('border-bottom', '1px solid '+param.borderBottomColor);
  if( param.borderLeftColor   != null ) elm.css('border-left', '1px solid '+param.borderLeftColor);
  if( param.borderRightColor  != null ) elm.css('border-right', '1px solid '+param.borderRightColor);
  if( param.padding           != null ) elm.css('padding', param.padding);
  if( param.color             != null ) elm.css('color', param.color);
  if( param.size              != null ) elm.css('font-size', param.size);
  if( param.weight            != null ) elm.css('font-weight', param.weight);
  if( param.align             != null ) elm.css('text-align', param.align);
  if( param.rowspan           != null ) elm.attr('rowspan', param.rowspan);
  if( param.colspan           != null ) elm.attr('colspan', param.colspan);
  if( param.data              != null ) {
    if( param.data == -9999 ) param.data = "-";
    elm.text(param.data);
  }
  if( param.func              != null ) {
    elm.css('color', 'blue');
    elm.css('text-decoration', 'underline');
    elm.css('cursor', 'pointer');
    elm.click(function(){
      var row = $(this).closest('tr').index();
      param.func(row);
    });
  }
}

//--------------------------------------------------------------------------------
//
// テーブルボディ要素を追加する（数値入力）
//
//        tid                           テーブルID
//        width                         カラム幅
//        borderColor                   枠色
//        color                         文字色
//        size                          文字サイズ
//        weight                        文字太さ
//        align                         文字位置
//        rowspan                       行結合
//        colspan                       列結合
//        post                          小数点以下桁数
//        data                          データ
//        func                          元データの取得
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyInputAdd = function( param ) {

  param = param || {};
  if( param.tid         == null ) return;
  var td = $('<td></td>');
  var elm = td.appendTo($('#'+param.tid+' tbody tr:last'));
  if( param.width       != null ) elm.css('width', param.width);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.rowspan     != null ) elm.attr('rowspan', param.rowspan);
  if( param.colspan     != null ) elm.attr('colspan', param.colspan);

  var input = $('<input type="text"></input>');
  elm = input.appendTo(elm);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.color       != null ) elm.css('color', param.color);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.weight      != null ) elm.css('font-weight', param.weight);
  if( param.align       != null ) elm.css('text-align', param.align);
  elm.css('border', 'none');
  var frm = "%d";
  if( param.post        != null ) {
    if( param.post > 0 ) frm = "%."+param.post+"f";
    if( param.func != null ) {
      elm.change(function() {
        var nume = elm.val()*1;
        if( nume == -9999 ) {
          elm.val("-");
        }
        else {
          elm.val(sprintf(frm, nume));
        }
        var row = $(this).closest('tr').index();
        var col = $(this).closest('td').index();
        var old = param.func(row, col);
        if( old != nume ) elm.css('color', 'red');
        else              elm.css('color', 'black');
      });
    }
    else {
      elm.change(function() {
        var nume = elm.val()*1;
        if( nume == -9999 ) {
          elm.val("-");
        }
        else {
          elm.val(sprintf(frm, nume));
        }
      });
    }
  }
  if( param.data        != null ) {
    var nume = param.data*1;
    if( nume == -9999 ) {
      elm.val("-");
    }
    else {
     elm.val(sprintf(frm,nume));
    }
  }
  elm.keydown(function(e) {
    if( e.which == 13 ) {
      e.preventDefault();
      var next = $('input').index(this)+1;
      $('input')[next].focus();
    }
  });
}

//--------------------------------------------------------------------------------
//
// テーブルボディ行を削除する
//
//        tid                           テーブルID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyRowDelete = function( tid ) {

  $('#'+tid+' tbody').empty();
}

//--------------------------------------------------------------------------------
//
// テーブルボディ行をスクロールする
//
//        tid                           テーブルID
//        top                           スクロール位置
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableBodyScrollTop = function( tid, top ) {

  $('#'+tid+' tbody').scrollTop(top);
}

//--------------------------------------------------------------------------------
//
// テーブル列の値を取得する
//
//        tid                           テーブルID
//        col                           列番号（0～）
//        [return]                      配列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TableColmGet = function( tid, col ) {

  var data = new Array();
  var tr = $('#'+tid+' tbody tr');
  for( var i = 0; i < tr.length; i++ ) {
    var td = tr.eq(i).children();
    var input = td.eq(col).children();
    data[i] = input.eq(0).val();
  }
  return data;
}

//--------------------------------------------------------------------------------
//
// リンクを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        link                          リンク先
//        name                          リンク名
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.LinkAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);

  if( param.name        == null ) param.name = "";
  var a;
  if( param.link        == null ) a = $('<a>' + param.name + '</a>');
  else                            a = $('<a href="' + param.link + '">' + param.name + '</a>');
  a.appendTo(elm);
}

//--------------------------------------------------------------------------------
//
// ボタンを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        margin                        margin
//        padding                       padding
//        float                         float
//        disabled                      disabled
//        display                       表示／非表示
//        backColor                     背景色
//        color                         文字色
//        size                          文字サイズ
//        weight                        文字太さ
//        align                         文字位置
//        text                          文字列
//        noprint                       印刷なし
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ButtonAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");
  elm.css('cursor', 'pointer');

  if( param.text        == null ) param.text = "";
  var input = $('<input type="button" value="'+param.text+'"></input>');
  elm = input.appendTo(elm);
  elm.css('cursor', 'pointer');
  elm.css('background-color', '#ddd');
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.color       != null ) elm.css('color', param.color);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.weight      != null ) elm.css('font-weight', param.weight);
  if( param.align       != null ) elm.css('text-align', param.align);
  elm.css('white-space', 'pre-line');
  elm.css('word-break', 'break-all');
  elm.mouseover(function() {
    elm.css('background-color', '#afeeee');
  }).mouseout(function() {
    if( param.backColor != null ) {
      elm.css('background-color', param.backColor);
    }
    else {
      elm.css('background-color', '#ddd');
    }
  });

  if( param.func != null ) {
    elm.click(function(){
      param.func(param.id);
    });
  }
}

//--------------------------------------------------------------------------------
//
// ボタンを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        float                         float
//        disabled                      入力不可
//        backColor                     背景色
//        display                       表示／非表示
//        color                         文字色
//        size                          文字サイズ
//        text                          文字列
//        noprint                       印刷なし
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ButtonEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.text        != null ) elm.val(param.text);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.color       != null ) elm.css('color', param.color);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  elm.mouseover(function() {
    elm.css('background-color', '#afeeee');
  }).mouseout(function() {
    if( param.backColor != null ) {
      elm.css('background-color', param.backColor);
    }
    else {
      elm.css('background-color', '#ddd');
    }
  });

  if( param.func != null ) {
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// ボタンをコピーする
//
//        sid                           コピー元ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        float                         float
//        disabled                      入力不可
//        backColor                     背景色
//        display                       表示／非表示
//        color                         文字色
//        size                          文字サイズ
//        text                          文字列
//        noprint                       印刷なし
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ButtonCopy = function( param ) {

  if( param.sid == null ) return;
  var src = $('#'+param.sid);
  var elm = src.clone().appendTo(src.parent());

  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.text        != null ) elm.val(param.text);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.color       != null ) elm.css('color', param.color);
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  elm.mouseover(function() {
    elm.css('background-color', '#afeeee');
  }).mouseout(function() {
    if( param.backColor != null ) {
      elm.css('background-color', param.backColor);
    }
    else {
      elm.css('background-color', '#ddd');
    }
  });

  if( param.func != null ) {
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// 文字列入力を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        margin                        margin
//        padding                       padding
//        float                         float
//        size                          文字サイズ
//        align                         文字位置
//        display                       表示／非表示
//        borderColor                   枠色
//        borderTop                     上枠
//        borderBottom                  下枠
//        borderLeft                    左枠
//        borderRight                   右枠
//        backColor                     背景色
//        backColor                     背景色
//        noprint                       印刷なし
//        type                          入力タイプ（input,date）
//        imeMode                       入力方式
//        number                        数値入力
//        placeholder                   プレースホルダー
//        value                         文字列
//        func                          クリックの処理
//        enter                         Enter時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextInputAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid          == null ) elm = div.appendTo($('body'));
  else                             elm = div.appendTo($('#'+param.pid));
  if( param.id           != null ) elm.attr('id', param.id);
  if( param.top          != null ) elm.css('top', param.top);
  if( param.left         != null ) elm.css('left', param.left);
  if( param.top          != null ||
      param.left         != null ) elm.css('position', 'absolute');
  if( param.position     != null ) elm.css('position', param.position);
  if( param.width        != null ) elm.css('width', param.width);
  if( param.height       != null ) elm.css('height', param.height);
  if( param.margin       != null ) elm.css('margin', param.margin);
  if( param.padding      != null ) elm.css('padding', param.padding);
  if( param.float        != null ) elm.css('float', param.float);
  if( param.display      != null ) elm.css('display', param.display);
  //if( param.borderColor  != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.borderColor  != null ) elm.css('border', '0px solid '+param.borderColor);
  if( param.borderTop    != null ) elm.css('border-top', param.borderTop);
  if( param.borderBottom != null ) elm.css('border-bottom', param.borderBottom);
  if( param.borderLeft   != null ) elm.css('border-left', param.borderLeft);
  if( param.borderRight  != null ) elm.css('border-right', param.borderRight);
  if( param.backColor    != null ) elm.css('background-color', param.backColor);
  if( param.noprint      == true ) elm.addClass("noprint");

  var text = "text";
  if( param.type         != null ) text = param.type;
  var input = $('<input type="'+text+'"></input>');
  var inp = input.appendTo(elm);
  if( param.paddingTop   != null ) inp.css('padding-top', param.paddingTop);
  if( param.paddingRight != null ) inp.css('padding-right', param.paddingRight);
  inp.css('width', '100%');
  inp.css('height', '80%');
  if( param.size         != null ) inp.css('font-size', param.size);
  if( param.align        != null ) inp.css('text-align', param.align);
  if( param.imeMode      != null ) inp.css('ime-mode', param.imeMode);
  if( param.placeholder  != null ) inp.attr('placeholder', param.placeholder);
  if( param.value        != null ) inp.attr('value', param.value);

  if( param.func != null ) {
    inp.click(function(){
      param.func();
    });
  }
  if( param.enter != null ) {
    inp.keypress(function(e){
      if( e.which == 13 ) {
        param.enter();
      }
    });
  }
  if( param.number       == true ) {
    inp.on('input', function(e) {
      var value = inp.val();
      inp.val(value.replace(/[^0-9.]+/i, ''));
    });
    inp.css('ime-mode', 'disabled');
  }
}

//--------------------------------------------------------------------------------
//
// 文字列入力を編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        paddingTop                    padding-top
//        float                         float
//        display                       表示／非表示
//        disabled                      入力不可
//        size                          文字サイズ
//        backColor                     背景色
//        noprint                       印刷なし
//        value                         文字列
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextInputEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.noprint     == true ) elm.addClass("noprint");

  var inp = $('#'+param.id+' input');
  if( param.disabled    != null ) inp.prop('disabled', param.disabled);
  if( param.paddingTop  != null ) inp.css('padding-top', param.paddingTop);
  inp.css('width', '100%');
  inp.css('height', '80%');
  if( param.size        != null ) inp.css('font-size', param.size);
  if( param.value       != null ) inp.val(param.value);

  if( param.func != null ) {
    inp.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// 文字列入力を取得する
//
//        id                            ID
//        [return]                      文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextInputGet = function( id ) {

  var elm = $('#'+id+ ' input');
  return elm.val();
}

//--------------------------------------------------------------------------------
//
// 複数行文字列入力を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        paddingTop                    padding-top
//        float                         float
//        size                          文字サイズ
//        backColor                     背景色
//        noprint                       印刷なし
//        disabled                      入力不可
//        value                         文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextAreaAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<textarea></textarea>');
  var inp = input.appendTo(elm);
  if( param.paddingTop  != null ) inp.css('padding-top', param.paddingTop);
  inp.css('width', '100%');
  inp.css('height', '80%');
  if( param.size        != null ) inp.css('font-size', param.size);
  if( param.disabled    != null ) inp.prop('disabled', param.disabled);
  if( param.value       != null ) {
    var value = param.value.split("\n");
    for( var i = 0; i < value.length; i++ ) {
      var div = $('<div>'+value[i]+'</div>');
      div.appendTo(inp);
    }
  }
}

//--------------------------------------------------------------------------------
//
// 複数行文字列入力を編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        paddingTop                    padding-top
//        float                         float
//        size                          文字サイズ
//        backColor                     背景色
//        display                       表示／非表示
//        noprint                       印刷なし
//        value                         文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextAreaEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  var inp = $('#'+param.id+' textarea');
  if( param.paddingTop  != null ) inp.css('padding-top', param.paddingTop);
  inp.css('width', '100%');
  inp.css('height', '80%');
  if( param.size        != null ) inp.css('font-size', param.size);
  if( param.value       != null ) {
    inp.empty();
    var value = param.value.split("\n");
    for( var i = 0; i < value.length; i++ ) {
      var div = $('<div>'+value[i]+'</div>');
      div.appendTo(inp);
    }
  }
}

//--------------------------------------------------------------------------------
//
// 複数行文字列入力を取得する
//
//        id                            ID
//        [return]                      文字列
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextAreaGet = function( id ) {

  var div = $('#'+id).find('div');
  var text = "";
  for( var i = 0; i < div.length; i++ ) {
    if( text != "" )	text += "\n";
    text += div[i].innerText;
  }

  return text;
}

//--------------------------------------------------------------------------------
//
// パスワード入力を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        size                          文字サイズ
//        backColor                     背景色
//        noprint                       印刷なし
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.PasswordInputAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid       == null ) elm = div.appendTo($('body'));
  else                          elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.noprint == true ) elm.addClass("noprint");

  var input = $('<input type="password"></input>');
  elm = input.appendTo(elm);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.size        != null ) elm.css('font-size', param.size);
}

//--------------------------------------------------------------------------------
//
// ファイル選択入力を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        size                          文字サイズ
//        width                         width
//        height                        height
//        value                         パラメータ値
//        action                        アクション先
//        noprint                       印刷なし
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FileInputAdd = function( param ) {

  param = param || {};
  var form = $('<form method="post" enctype="multipart/form-data" target="dummy_frame"></form>');
  var elm;
  if( param.pid       == null ) elm = form.appendTo($('body'));
  else                          elm = form.appendTo($('#'+param.pid));
  if( param.id        != null ) elm.attr('id', param.id);
  if( param.top       != null ) elm.css('top', param.top);
  if( param.left      != null ) elm.css('left', param.left);
  if( param.top       != null ||
      param.left      != null ) elm.css('position', 'absolute');
  if( param.position  != null ) elm.css('position', param.position);
  if( param.action    != null ) elm.attr('action', 'php/'+param.action);
  if( param.noprint   == true ) elm.addClass("noprint");

  var input = $('<input type="file"></input>');
  inp = input.appendTo(elm);
  if( param.width     != null ) inp.css('width', param.width);
  if( param.height    != null ) inp.css('height', param.height);
  if( param.size      != null ) inp.css('font-size', param.size);
  if( param.name      != null ) {
    inp.attr('name', param.name);
    inp.attr('id', param.name);
  }

  if( param.value     != null ) {
    input = $('<input type="hidden" name="param" value="'+param.value+'"></input>');
    input.appendTo(elm);
  }

  var iframe = $('<iframe width="0" height="0" name="dummy_frame" style="display:none;"></iframe>');
  if( param.pid       == null ) iframe.appendTo($('body'));
  else                          iframe.appendTo($('#'+param.pid));

}

//--------------------------------------------------------------------------------
//
// ファイル選択入力のパラメータ値を設定する
//
//        id                            ID
//        value                         パラメータ値
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FileInputParamSet = function( id, value ) {

  var input = $('#'+id).find('input');
  input[1].value = value;
}

//--------------------------------------------------------------------------------
//
// ファイル選択入力のファイル名を取得する
//
//        id                            ID
//        [return]                      ファイル名
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FileInputGet = function( id ) {

  var input = $('#'+id).find('input');
  return input.val();
}

//--------------------------------------------------------------------------------
//
// ファイル選択入力のファイル名をクリアする
//
//        id                            ID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FileInputClear = function( id ) {

  var input = $('#'+id).find('input');
  return input.val("");
}

//--------------------------------------------------------------------------------
//
// ファイル選択入力のファイルをアップロードする
//
//        id                            ID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FileInputUpload = function( id ) {

  var form = $('#'+id);
  form.submit();
}

//--------------------------------------------------------------------------------
//
// 日時入力を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        float                         float
//        size                          文字サイズ
//        align                         文字位置
//        backColor                     背景色
//        time                          初期時刻
//        step                          ステップ
//        timePicker                    時刻表示有無
//        noprint                       印刷なし
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.DateInputAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<input type="text"></input>');
  elm = input.appendTo(elm);
  elm.css('width', '100%');
  elm.css('height', '80%');
  if( param.size        != null ) elm.css('font-size', param.size);
  if( param.align       != null ) elm.css('text-align', param.align);
  elm.addClass("dateTime");

  var step = 10;
  var timePicker = true;
  var format = "Y/m/d H:i";
  if( param.step        != null ) step = param.step;
  if( param.timePicker  != null ) {
    timePicker = param.timePicker;
    if( !param.timePicker ) {
      format = "Y/m/d";
    }
  }
  elm.datetimepicker({lang: 'ja',
                      timepicker: timePicker,
                      step: step,
                      format: format,
                      value: param.time,
                      //closeOnDateSelect: true,
                      onChangeDateTime: param.func});
}

//--------------------------------------------------------------------------------
//
// 日時入力を変更する
//
//        id                            ID
//        time                          時刻
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.DateInputSet = function( id, time ) {

  var elm = $('#'+id+ ' input');
  elm.val(time);
}

//--------------------------------------------------------------------------------
//
// 日時入力を取得する
//
//        id                            ID
//        [return]                      時刻
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.DateInputGet = function( id ) {

  var elm = $('#'+id+ ' input');
  return elm.val();
}

//--------------------------------------------------------------------------------
//
// イメージボタンを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        backColor                     背景色
//        borderColor                   枠色
//        borderWidth                   枠幅
//        image                         背景画像
//        noprint                       印刷なし
//        display                       表示／非表示
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ImageButtonAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                          elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<input type="image"></input>');
  elm = input.appendTo(elm);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.image       != null ) elm.attr('src', param.image+'?'+new Date());
  elm.css('cursor', 'pointer');

  if( param.func != null ) {
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// イメージボタンを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        borderColor                   枠色
//        borderWidth                   枠幅
//        backColor                     背景色
//        image                         背景画像
//        display                       表示／非表示
//        noprint                       印刷なし
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ImageButtonEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.backColor   != null ) elm.css('background-color', param.backColor);
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.image       != null ) elm.attr('src', param.image);

  if( param.func != null ) {
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// チェックボックスを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        backColor                     背景色
//        margin                        margin
//        padding                       padding
//        float                         float
//        display                       表示／非表示
//        noprint                       印刷なし
//        checked                       true：チェックオン
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CheckBoxAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);

  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<input type="checkbox">');
  elm = input.appendTo(elm);
  if( param.backColor   != null ) input.css('background-color', param.backColor);
  if( param.checked  == true ) elm.prop('checked', param.checked);

  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// チェックボックスを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        display                       表示／非表示
//        noprint                       印刷なし
//        checked                       true：チェックオン
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CheckBoxEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  if( param.checked  == true ) elm.prop('checked', param.checked);

  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// チェックボックスをコピーする
//
//        sid                           コピー元ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        display                       表示／非表示
//        noprint                       印刷なし
//        checked                       true：チェックオン
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CheckBoxCopy = function( param ) {

  if( param.sid == null ) return;
  var src = $('#'+param.sid);
  var elm = src.clone().appendTo(src.parent());

  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  if( param.checked  == true ) elm.prop('checked', param.checked);

  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// チェックボックスをチェックする
//
//        id                            ID
//        [return]                      チェック状態
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CheckBoxGet = function( id ) {

  var elm = $('#'+id+' input');
  return elm.is(':checked');
}

//--------------------------------------------------------------------------------
//
// チェックボックスにチェックを入れる
//
//        id                            ID
//        checked                       true：チェックオン
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CheckBoxSet = function( id, checked ) {

  $('#'+id+' input').prop('checked', checked);
}

//--------------------------------------------------------------------------------
//
// ラジオボタンを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        margin                        margin
//        padding                       padding
//        float                         float
//        display                       表示／非表示
//        noprint                       印刷なし
//        name                          名前
//        checked                       true：チェックオン
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.RadioAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);

  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<input type="radio">');
  elm = input.appendTo(elm);
  if( param.name        != null ) elm.prop('name', param.name);
  if( param.checked     == true ) elm.prop('checked', param.checked);

  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// ラジオボタンを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        display                       表示／非表示
//        noprint                       印刷なし
//        checked                       true：チェックオン
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.RadioEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;

  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  elm = $('#'+param.id+' input');
  elm.prop('checked', param.checked);
}

//--------------------------------------------------------------------------------
//
// ラジオボタンをチェックする
//
//        id                            ID
//        [return]                      チェック状態
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.RadioGet = function( id ) {

  var elm = $('#'+id+' input');
  return elm.is(':checked');
}

//--------------------------------------------------------------------------------
//
// ラジオボタンにチェックを入れる
//
//        id                            ID
//        checked                       true：チェックオン
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.RadioSet = function( id, checked ) {

  $('#'+id+' input').prop('checked', checked);
}

//--------------------------------------------------------------------------------
//
// スライドバーを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        margin                        margin
//        padding                       padding
//        float                         float
//        display                       表示／非表示
//        noprint                       印刷なし
//        name                          名前
//        valueMin                      最小値
//        valueMax                      最大値
//        valueStep                     ステップ
//        value                         値
//        func                          変更時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SlideBarAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);

  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.noprint     == true ) elm.addClass("noprint");

  var input = $('<input type="range">');
  elm = input.appendTo(elm);
  if( param.name        != null ) elm.prop('name', param.name);
  if( param.valueMin    != null ) elm.prop('min', param.valueMin);
  if( param.valueMax    != null ) elm.prop('max', param.valueMax);
  if( param.valueStep   != null ) elm.prop('step', param.valueStep);
  if( param.value       != null ) elm.prop('value', param.value);

  if( param.func        != null ) {
    elm.change(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// スライドバー値を取得する
//
//        sid                           スライドバーID
//        [return]                      スライドバー値
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.SlideBarGet = function( sid ) {

  return $('#'+sid+' input').val();
}

//--------------------------------------------------------------------------------
//
// フォームを追加する
//
//        pid                           親ID
//        id                            ID
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FormAdd = function( param ) {

  param = param || {};
  var form = $('<form></form>');
  var elm;
  if( param.pid == null ) elm = a.appendTo($('body'));
  else                    elm = a.appendTo($('#'+param.pid));
  if( param.id  != null ) elm.attr('id', param.id);
}

//--------------------------------------------------------------------------------
//
// 文字列を追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        margin                        margin
//        padding                       padding
//        paddingTop                    padding-top
//        paddingRight                  padding-right
//        paddingBottom                 padding-bottom
//        paddingLeft                   padding-left
//        margin                        margin
//        float                         float
//        zindex                        z-index
//        size                          文字サイズ
//        weight                        文字太さ
//        color                         文字色
//        font                          フォント
//        borderColor                   枠色
//        borderTop                     上枠
//        borderBottom                  下枠
//        borderLeft                    左枠
//        borderRight                   右枠
//        borderRadius                  角丸半径
//        backColor                     背景色
//        align                         文字位置
//        decoration                    文字列装飾
//        angle                         回転角
//        display                       表示／非表示
//        scrollX                       true：横スクロールあり
//        scrollY                       true: 縦スクロールあり
//        cursor                        カーソル
//        text                          文字列
//        noprint                       印刷なし
//        mouseBackColor                マウスオーバー時の背景色
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid           == null ) elm = div.appendTo($('body'));
  else                              elm = div.appendTo($('#'+param.pid));
  if( param.id            != null ) elm.attr('id', param.id);
  if( param.top           != null ) elm.css('top', param.top);
  if( param.left          != null ) elm.css('left', param.left);
  if( param.top           != null ||
      param.left          != null ) elm.css('position', 'absolute');
  if( param.position      != null ) elm.css('position', param.position);
  if( param.width         != null ) elm.css('width', param.width);
  if( param.height        != null ) elm.css('height', param.height);
  if( param.margin        != null ) elm.css('margin', param.margin);
  if( param.padding       != null ) elm.css('padding', param.padding);
  if( param.paddingTop    != null ) elm.css('padding-top', param.paddingTop);
  if( param.paddingRight  != null ) elm.css('padding-right', param.paddingRight);
  if( param.paddingBottom != null ) elm.css('padding-bottom', param.paddingBottom);
  if( param.paddingLeft   != null ) elm.css('padding-left', param.paddingLeft);
  if( param.float         != null ) elm.css('float', param.float);
  if( param.borderColor   != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.borderTop     != null ) {
    if( param.borderTop    == "" ) elm.css('border-top', '1px solid #000');
    else                           elm.css('border-top', param.borderTop);
  }
  if( param.borderBottom != null ) {
    if( param.borderBottom == "" ) elm.css('border-bottom', '1px solid #000');
    else                           elm.css('border-bottom', param.borderBottom);
  }
  if( param.borderLeft   != null ) {
    if( param.borderLeft   == "" ) elm.css('border-left', '1px solid #000');
    else                           elm.css('border-left', param.borderLeft);
  }
  if( param.borderRight  != null ) {
    if( param.borderRight  == "" ) elm.css('border-right', '1px solid #000');
    else                           elm.css('border-right', param.borderRight);
  }
  if( param.borderRadius != null ) elm.css('border-radius', param.borderRadius);
  if( param.backColor    != null ) elm.css('background-color', param.backColor);
  if( param.align        != null ) elm.css('text-align', param.align);
  if( param.decoration   != null ) elm.css('text-decoration', param.decoration);
  if( param.zindex       != null ) elm.css('z-index', param.zindex);
  if( param.size         != null ) elm.css('font-size', param.size);
  if( param.weight       != null ) elm.css('font-weight', param.weight);
  if( param.color        != null ) elm.css('color', param.color);
  if( param.font         != null ) elm.css('font-family', param.font);
  if( param.angle        != null ) elm.css('transform', 'rotate('+param.angle+'deg)');
  if( param.display      != null ) elm.css('display', param.display);
  if( param.scrollX      == true ) elm.css('overflow-x', 'scroll');
  if( param.scrollY      == true ) elm.css('overflow-y', 'scroll');
  if( param.cursor       != null ) elm.css('cursor', param.cursor);
  if( param.text         != null ) {
    if( param.align == "right" ) param.text = param.text+"&nbsp;&nbsp;";
    var text = param.text.split("\n");
    for( var i = 0; i < text.length; i++ ) {
      var div = $('<div>'+text[i].replace(/ /g, '&nbsp;')+'</div>');
      div.appendTo(elm);
    }
  }

  if( param.noprint     == true ) elm.addClass("noprint");
  if( param.mouseBackColor != null && param.backColor ) {
    elm.mouseover(function() {
      elm.css('background-color', param.mouseBackColor);
    }).mouseout(function() {
      elm.css('background-color', param.backColor);
    });
  }

  if( param.func != null ) {
    elm.css('cursor', 'pointer');
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// 文字列を編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        paddingTop                    padding-top
//        paddingRight                  padding-right
//        paddingBottom                 padding-bottom
//        paddingLeft                   padding-left
//        size                          文字サイズ
//        weight                        文字太さ
//        color                         文字色
//        borderColor                   枠色
//        backColor                     背景色
//        align                         文字位置
//        decoration                    文字列装飾
//        angle                         回転角
//        display                       表示／非表示
//        cursor                        カーソル
//        text                          文字列
//        mouseBackColor                マウスオーバー時の背景色
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextEdit = function( param ) {

  param = param || {};
  if( param.id == null ) return;
  var elm = $('#'+param.id);
  if( param.top          != null ) elm.css('top', param.top);
  if( param.left         != null ) elm.css('left', param.left);
  if( param.top          != null ||
      param.left         != null ) elm.css('position', 'absolute');
  if( param.position     != null ) elm.css('position', param.position);
  if( param.width        != null ) elm.css('width', param.width);
  if( param.height       != null ) elm.css('height', param.height);
  if( param.padding      != null ) elm.css('padding', param.padding);
  if( param.paddingTop    != null ) elm.css('padding-top', param.paddingTop);
  if( param.paddingRight  != null ) elm.css('padding-right', param.paddingRight);
  if( param.paddingBottom != null ) elm.css('padding-bottom', param.paddingBottom);
  if( param.paddingLeft   != null ) elm.css('padding-left', param.paddingLeft);
  if( param.borderColor  != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.size         != null ) elm.css('font-size', param.size);
  if( param.weight       != null ) elm.css('font-weight', param.weight);
  if( param.color        != null ) elm.css('color', param.color);
  if( param.backColor    != null ) elm.css('background-color', param.backColor);
  if( param.align        != null ) elm.css('text-align', param.align);
  if( param.decoration   != null ) elm.css('text-decoration', param.decoration);
  if( param.angle        != null ) elm.css('transform', 'rotate('+param.angle+'deg)');
  if( param.display      != null ) elm.css('display', param.display);
  if( param.cursor       != null ) elm.css('cursor', param.cursor);
  if( param.text         != null ) {
    var text = param.text.split("\n");
    elm.empty();
    for( var i = 0; i < text.length; i++ ) {
      var div = $('<div>'+text[i]+'</div>');
      div.appendTo(elm);
    }
  }

  if( param.mouseBackColor != null && param.backColor ) {
    elm.mouseover(function() {
      elm.css('background-color', param.mouseBackColor);
    }).mouseout(function() {
      elm.css('background-color', param.backColor);
    });
  }

  if( param.func != null ) {
    elm.css('cursor', 'pointer');
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// 文字列をコピーする
//
//        sid                           コピー元ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        paddingTop                    padding-top
//        paddingRight                  padding-right
//        paddingBottom                 padding-bottom
//        paddingLeft                   padding-left
//        size                          文字サイズ
//        weight                        文字太さ
//        color                         文字色
//        borderColor                   枠色
//        backColor                     背景色
//        align                         文字位置
//        decoration                    文字列装飾
//        angle                         回転角
//        display                       表示／非表示
//        cursor                        カーソル
//        text                          文字列
//        mouseBackColor                マウスオーバー時の背景色
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.TextCopy = function( param ) {

  if( param.sid == null ) return;
  var src = $('#'+param.sid);
  var elm = src.clone().appendTo(src.parent());

  if( param.id           != null ) elm.attr('id', param.id);
  if( param.top          != null ) elm.css('top', param.top);
  if( param.left         != null ) elm.css('left', param.left);
  if( param.top          != null ||
      param.left         != null ) elm.css('position', 'absolute');
  if( param.position     != null ) elm.css('position', param.position);
  if( param.width        != null ) elm.css('width', param.width);
  if( param.height       != null ) elm.css('height', param.height);
  if( param.padding      != null ) elm.css('padding', param.padding);
  if( param.paddingTop    != null ) elm.css('padding-top', param.paddingTop);
  if( param.paddingRight  != null ) elm.css('padding-right', param.paddingRight);
  if( param.paddingBottom != null ) elm.css('padding-bottom', param.paddingBottom);
  if( param.paddingLeft   != null ) elm.css('padding-left', param.paddingLeft);
  if( param.borderColor  != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.size         != null ) elm.css('font-size', param.size);
  if( param.weight       != null ) elm.css('font-weight', param.weight);
  if( param.color        != null ) elm.css('color', param.color);
  if( param.backColor    != null ) elm.css('background-color', param.backColor);
  if( param.align        != null ) elm.css('text-align', param.align);
  if( param.decoration   != null ) elm.css('text-decoration', param.decoration);
  if( param.angle        != null ) elm.css('transform', 'rotate('+param.angle+'deg)');
  if( param.display      != null ) elm.css('display', param.display);
  if( param.cursor       != null ) elm.css('cursor', param.cursor);
  if( param.text         != null ) {
    var text = param.text.split("\n");
    elm.empty();
    for( var i = 0; i < text.length; i++ ) {
      var div = $('<div>'+text[i]+'</div>');
      div.appendTo(elm);
    }
  }

  if( param.mouseBackColor != null && param.backColor ) {
    elm.mouseover(function() {
      elm.css('background-color', param.mouseBackColor);
    }).mouseout(function() {
      elm.css('background-color', param.backColor);
    });
  }

  if( param.func != null ) {
    elm.css('cursor', 'pointer');
    elm.click(function(){
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// イメージを追加する
//
//        pid                           親ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        borderColor                   枠色
//        image                         イメージURL
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ImageAdd = function( param ) {

  param = param || {};
  var div = $('<div></div>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.image       != null ) {
    elm.css('background', 'url('+param.image+')');
    elm.css('background-size', 'cover');
  }
}

//--------------------------------------------------------------------------------
//
// イメージを編集する
//
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        borderColor                   枠色
//        image                         イメージURL
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.ImageEdit = function( param ) {

  param = param || {};
  if( param.id == null ) return;
  var elm = $('#'+param.id);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.image       != null ) {
    elm.css('background', 'url('+param.image+')');
    elm.css('background-size', 'cover');
  }
}

//--------------------------------------------------------------------------------
//
// CANVASを追加する
//
//        pid                           親ID
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        margin                        margin
//        width                         width
//        height                        height
//        borderColor                   枠色
//        display                       表示／非表示
//        func                          クリック時の処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CanvasAdd = function( param ) {

  param = param || {};
  if( param.id == null ) return;
  var canvas = $('<canvas></canvas>');
  var elm;
  if( param.pid         == null ) elm = canvas.appendTo($('body'));
  else                            elm = canvas.appendTo($('#'+param.pid));
  elm.attr('id', param.id);
  if( param.width       != null ) elm.attr('width', param.width);
  if( param.height      != null ) elm.attr('height', param.height);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.position    != null ) elm.css('position', param.position);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.display     != null ) elm.css('display', param.display);

  if( param.func != null ) {
    canvas[0].addEventListener('click', param.func, false);
  }
}

//--------------------------------------------------------------------------------
//
// CANVASを編集する
//
//        id                            ID
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        borderColor                   枠色
//        display                       表示／非表示
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.CanvasEdit = function( param ) {

  param = param || {};
  if( param.id          == null ) return;
  var elm = $('#'+param.id);
  if( param.width       != null ) elm.attr('width', param.width);
  if( param.height      != null ) elm.attr('height', param.height);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.borderColor != null ) elm.css('border', '1px solid '+param.borderColor);
  if( param.display     != null ) elm.css('display', param.display);
}

//--------------------------------------------------------------------------------
//
// フレームを追加する
//
//        pid                           親ID
//        id                            ID
//        src                           URL
//        top                           top
//        left                          left
//        position                      position
//        width                         width
//        height                        height
//        padding                       padding
//        margin                        margin
//        float                         float
//        zindex                        z-index
//        disabled                      入力不可
//        align                         文字位置
//        borderColor                   枠色
//        borderWidth                   枠幅
//        display                       表示／非表示
//        func                          クリックの処理
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.FrameAdd = function( param ) {

  param = param || {};
  var div = $('<iframe></iframe>');
  var elm;
  if( param.pid         == null ) elm = div.appendTo($('body'));
  else                            elm = div.appendTo($('#'+param.pid));
  if( param.id          != null ) elm.attr('id', param.id);
  if( param.src         != null ) elm.attr('src', param.src);
  if( param.top         != null ) elm.css('top', param.top);
  if( param.left        != null ) elm.css('left', param.left);
  if( param.top         != null ||
      param.left        != null ) elm.css('position', 'absolute');
  if( param.position    != null ) elm.css('position', param.position);
  if( param.width       != null ) elm.css('width', param.width);
  if( param.height      != null ) elm.css('height', param.height);
  if( param.padding     != null ) elm.css('padding', param.padding);
  if( param.margin      != null ) elm.css('margin', param.margin);
  if( param.float       != null ) elm.css('float', param.float);
  if( param.zindex      != null ) {
    elm.css('z-index', param.zindex);
    var width = elm.css('width')*1+1;
    var height = elm.css('height')*1+1;
    elm.css('clip', "rect(0,"+width+","+height+",0)");
  }
  if( param.borderColor != null || param.borderWidth != null ) {
    if( param.borderColor == null ) param.borderColor = "black";
    if( param.borderWidth == null ) param.borderWidth = "1";
    elm.css('border', param.borderWidth+'px solid '+param.borderColor);
  }
  if( param.align       != null ) elm.attr('align', param.align);
  if( param.display     != null ) elm.css('display', param.display);
  if( param.disabled    != null ) elm.prop('disabled', param.disabled);
  if( param.func        != null ) {
    elm.css('cursor', 'pointer');
    elm.click(function() {
      param.func();
    });
  }
}

//--------------------------------------------------------------------------------
//
// コントロールを無効化する
//
//        id                            ID
//        disabled                      disabled
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.DisableSet = function( id, disabled ) {

  var elm = $('#'+id);
  elm[0].disabled = disabled;
}

//--------------------------------------------------------------------------------
//
// 画面キャプチャを取る
//
//        id                            対象エレメントID
//        fileName                      ファイル名
//        func                          コールバック関数
//
//--------------------------------------------------------------------------------
HtmlControl.prototype.Html2Image = function( id, fileName, func ) {

  html2canvas(document.getElementById(id)).then(
    function( canvas ) {

      // バイナリに変換
      var base64 = canvas.toDataURL("image/png"),
          bin = atob(base64.replace(/^.*,/, '')),
          buffer = new Uint8Array(bin.length);
      for( var i = 0; i < bin.length; i++ ) {
        buffer[i] = bin.charCodeAt(i);
      }

      // Blobに変換
      var blob = new Blob([buffer], {
        type: 'image/png'
      });

      // FormDataに変換
      var form = new FormData();
      form.append("image", blob);
      form.append("file_name", fileName);

      // POST送信する
      $.ajax({
        url: "php/upload.php",
        type: "POST",
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "html",
        success: function( data ) {
          rtn = true;
        },
        error: function( data ) {
          rtn = false;
        },
        async: false,
        timeout: 10000
      });

      if( rtn ) func();

    }
  );

  return;
}
