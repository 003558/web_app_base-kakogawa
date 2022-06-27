
var _graphControl;

var _data;
var _startDate;

var _index;
var _title = ["曇川樋門", "草谷川水門", "都染樋門", "小川合流部", "両荘市民センター", "五ヶ井ポンプ場"];

//--------------------------------------------------------------------------------
// 初期処理
//--------------------------------------------------------------------------------
$(document).ready( function() {

  // ユーザーIDを取得する
  _userID = _storageControl.StorageGet("kakogawa_login");
  if( _userID == null || _userID == "" || _userID != "ok" ) {
    //window.close();
    return;
  }

  _windowControl.WindowSizeSet({width: 1350, height: 860});

  // 計算フラッグ
  var calcFlag = _storageControl.LocalStorageGet("CalcFlag", "");

  // データ取得
  _index = _storageControl.StorageGet("No") - 1;
  $.ajax({
    url: "json" + calcFlag + "/" + _pointName[_index] + ".json?" + _dateControl.DateFormat(new Date(), "YYYYMMDDhhmmss"),
    type: "get",
    dataType: "json",
    async: false,
    success: function( data ) {
      _data = data;
    },
    error: function( data ) {
      _data = data;
    }
  });

  if( _data.lines.length == 0 ) window.close();

  // タイトル
  _windowControl.TitleSet("加古川浸水把握システム　～　" + _title[_index]);

  // 現在日時から6時間前
  _startDate = toDate(_data.lines.slice(-1)[0].picture);
  _startDate.setHours(_startDate.getHours() - 6);

  // タイトル
  TitleDisp();

  // 左側
  LeftDisp();

  // 右側
  RightDisp();

});

//--------------------------------------------------------------------------------
// タイトル
//--------------------------------------------------------------------------------
var TitleDisp = function() {

  _htmlControl.TextAdd({
      left: 0,
      top: 0,
      width: "100%",
      height: 40,
      paddingTop: 5,
      backColor: "LightSeaGreen",
      align: "center",
      size: 28,
      color: "White",
      text: _title[_index]
  });
}

//--------------------------------------------------------------------------------
// 左側
//--------------------------------------------------------------------------------
var LeftDisp = function() {

  _htmlControl.BlockAdd({
      id: "left_block",
      left: 0,
      top: 45,
      width: 600,
      height: 730,
      borderColor: "Gray"
  });

  let suii = _data.lines.slice(-1)[0].shinsui*1;
  if (suii < -1000) {
    suii = "-";
  }
  else {
    suii = sprintf("%.2f", suii);
  }
  _htmlControl.TextAdd({
      pid: "left_block",
      left: 20,
      top: 10,
      size: 24,
      color: "DarkBlue",
      text: "現時刻水位（想定）　： " + suii + " T.P.+m"
  });

  _htmlControl.TextAdd({
      pid: "left_block",
      left: 20,
      top: 40,
      size: 24,
      text: "異常判定　　　　　　："
  });
  if (_data.lines.slice(-1)[0].flag == "False") {
    _htmlControl.TextAdd({
        pid: "left_block",
        top: 40,
        left: 294,
        size: 24,
        color: "Red",
        text: "異常"
    });
  }
  else {
    _htmlControl.TextAdd({
        pid: "left_block",
        top: 40,
        left: 294,
        size: 24,
        text: "正常"
    });
  }

  // グラフ
  GraphDisp();

  // 表
  TableDisp();
}

//--------------------------------------------------------------------------------
// グラフ
//--------------------------------------------------------------------------------
var GraphDisp = function() {

  _htmlControl.TextAdd({
      pid: "left_block",
      left: 20,
      top: 75,
      size: 16,
      text: "グラフ（水位）"
  });

  _htmlControl.CanvasAdd({pid: "left_block", id: "suii_graph", top: 110, left: 0, width: 600, height: 340});
  _graphControl = new GraphControl("suii_graph", 600, 340);

  // 最大水位
  var maxSuii = _startSuii[_index];
  _data.lines.forEach( function( line ) {
    if( maxSuii < line.shinsui ) maxSuii = line.shinsui*1;
  });
  suiiPitch = 1;
  while( suiiPitch * 6 < maxSuii ) suiiPitch++;

  // 枠
  var x1 = 70;
  var y1 = 75;
  var x2 = 590;
  var y2 = 330;
  var xpitch = (x2 - x1) / 7;
  var ypitch = (y2 - y1) / 6;
  _graphControl.RectDraw("Black", x1, y1, x2, y2);

  // タイトル
  _graphControl.TextDraw("Black", 15, 35, 150, "水位 (T.P.+m)", -90);

  // X軸目盛
  for( var i = 0; i < 7; i++ ) {
    var x = i * xpitch + x1;
    var text = (6 - i) + " 時間前";
    if( i == 7 - 1 ) text = "  現時刻";
    _graphControl.TextDraw("Black", 12, x + xpitch / 2 + 3, 15, text, -90);
    if( i < 7 - 1 ) _graphControl.LineDraw("Gray", x + xpitch, y1, x + xpitch, y2);
  }

  // Y軸目盛
  for( var i = 0; i <= 6; i++ ) {
    var y = i * ypitch + y1;
    _graphControl.TextDraw("Black", 14, x1 - 20, y - 5, (i * suiiPitch) + "");
    if( i < 6 ) _graphControl.LineDraw("Gray", x1, y + ypitch, x2, y + ypitch);
  }

  var x11 = x1 + xpitch / 2;
  var x22 = x2 - xpitch / 2;

  // 凡例
  _graphControl.FillRectDraw("White", (x1 + x2) / 2 + 10, y1 + 10, x2 - 15, y1 + 90);
  _graphControl.RectDraw("Black", (x1 + x2) / 2 + 10, y1 + 10, x2 - 15, y1 + 90, 1);
  _graphControl.LineDraw("Blue", (x1 + x2) / 2 + 25, y1 + 75, (x1 + x2) / 2 + 60, y1 + 75, 2);
  _graphControl.TextDraw("Black", 14, (x1 + x2) / 2 + 70, y1 + 70, "水位");
  _graphControl.LineDraw("Red", (x1 + x2) / 2 + 25, y1 + 50, (x1 + x2) / 2 + 60, y1 + 50, 2);
  _graphControl.TextDraw("Black", 14, (x1 + x2) / 2 + 70, y1 + 45, "水位、浸水開始水位超過");
  _graphControl.DashDraw("Red", (x1 + x2) / 2 + 25, y1 + 25, (x1 + x2) / 2 + 60, y1 + 25);
  _graphControl.TextDraw("Black", 14, (x1 + x2) / 2 + 70, y1 + 20, "浸水開始水位");

  // 浸水開始水位
  _graphControl.DashDraw("Red", SetX(36, x11, x22), SetY(_startSuii[_index] / suiiPitch, y1, y2),
                                SetX(73 - 1, x11, x22), SetY(_startSuii[_index] / suiiPitch, y1, y2));

  // 水位
  for( var i = 36; i < _data.lines.length - 1; i++ ) {
    //var i1 = _dateControl.DateDiff(_startDate, toDate(_data.lines[i].picture), "mm") / 10;
    //var i2 = _dateControl.DateDiff(_startDate, toDate(_data.lines[i+1].picture), "mm") / 10;
    var i1 = i;
    var i2 = i + 1;
    if( i1 < 0 || i2 < 0 ) continue;
    var suii1 = _data.lines[i1].shinsui*1;
    var suii2 = _data.lines[i2].shinsui*1;
    if( suii1 < -1000 || suii2 < -1000 ) continue;
    if( suii1 <= _startSuii[_index] && suii2 <= _startSuii[_index] ) {
      _graphControl.LineDraw("Blue", SetX(i1, x11, x22), SetY(suii1 / suiiPitch, y1, y2),
                                     SetX(i2, x11, x22), SetY(suii2 / suiiPitch, y1, y2), 2);
    }
    else if( suii1 >= _startSuii[_index] && suii2 >= _startSuii[_index] ) {
      _graphControl.LineDraw("Red", SetX(i1, x11, x22), SetY(suii1 / suiiPitch, y1, y2),
                                    SetX(i2, x11, x22), SetY(suii2 / suiiPitch, y1, y2), 2);
    }
    else {
      var x = (_startSuii[_index] - suii1) / (suii2 - suii1) * (x22 - x11) / 36 + SetX(i1, x11, x22);
      if( suii1 < _startSuii[_index] ) {
        _graphControl.LineDraw("Blue", SetX(i1, x11, x22), SetY(suii1 / suiiPitch, y1, y2),
                                       x, SetY(_startSuii[_index] / suiiPitch, y1, y2), 2);
        _graphControl.LineDraw("Red", x, SetY(_startSuii[_index] / suiiPitch, y1, y2),
                                      SetX(i2, x11, x22), SetY(suii2 / suiiPitch, y1, y2), 2);
      }
      else {
        _graphControl.LineDraw("Red", SetX(i1, x11, x22), SetY(suii1 / suiiPitch, y1, y2),
                                      x, SetY(_startSuii[_index] / suiiPitch, y1, y2), 2);
        _graphControl.LineDraw("Blue", x, SetY(_startSuii[_index] / suiiPitch, y1, y2),
                                       SetX(i2, x11, x22), SetY(suii2 / suiiPitch, y1, y2), 2);
      }
    }
  }

}

var SetX = function( i, x1, x2 )
{
  var xpitch = (x2 - x1) / 36;
  return xpitch * ( i - 36 ) + x1;
}

var SetY = function( suii, y1, y2 )
{
  return (suii - 0) / (6 - 0) * (y2 - y1) + y1;
}

var toDate = function( picture ) {

  return new Date(picture.substr(0, 4) + "/" + picture.substr(4, 2) + "/" + picture.substr(6, 2) + " " +
                  picture.substr(8, 2) + ":" + picture.substr(10, 2));

}


//--------------------------------------------------------------------------------
// 表
//--------------------------------------------------------------------------------
var TableDisp = function() {

  _htmlControl.TextAdd({
      pid: "left_block",
      left: 20,
      top: 430,
      size: 16,
      text: "表（水位）"
  });

  var time = _startDate;

  _htmlControl.TableAdd({
      pid: "left_block",
      id: "suii_table",
      left: 20,
      top: 455,
      width: 350,
      height: 270
  });
  _htmlControl.TableHeaderAdd({
      tid: "suii_table",
      width: 350
  });
  _htmlControl.TableHeaderRowAdd({
      tid: "suii_table",
      height: 20,
      size: 12,
      backColor: "LightGray"
  });
  _htmlControl.TableHeaderItemAdd({
      tid: "suii_table",
      width: 235,
      borderColor: "Gray",
      title: "時刻"
  });
  _htmlControl.TableHeaderItemAdd({
      tid: "suii_table",
      width: 100,
      borderColor: "Gray",
      title: "水位(T.P.+m)"
  });
  _htmlControl.TableBodyAdd({
      tid: "suii_table",
      width: 358,
      height: 242,
      size: 11,
      scroll: true
  });

  for( var i = 0; i < 37; i++ ) {

    _htmlControl.TableBodyRowAdd({
        tid: "suii_table",
        height: 20,
        size: 12
    });
    _htmlControl.TableBodyItemAdd({
        tid: "suii_table",
        width: 105,
        borderColor: "Gray",
        align: "left",
        data: (i == 36) ? "　現時刻" : "　" + Math.floor((36 - i) / 6) + " 時間 " +
              sprintf("%02d", ((36 - i) % 6) * 10) + " 分前"
    });

    _htmlControl.TableBodyItemAdd({
        tid: "suii_table",
        width: 128,
        borderColor: "Gray",
        align: "center",
        data: _dateControl.DateFormat( toDate(_data.lines[i+36].picture), "YYYY/MM/DD hh:mm")
    });
    let suii = _data.lines[i+36].shinsui*1;
    if (suii < -1000) {
      suii = "-";
    }
    else {
      suii = sprintf("%.2f", suii);
    }
    _htmlControl.TableBodyItemAdd({
        tid: "suii_table",
        width: 100,
        borderColor: "Gray",
        align: "center",
        backColor: (_data.lines[i+36].shinsui < _startSuii) ? "PaleTurquoise" : "LightPink", 
        data: suii
    });

  }

  _htmlControl.TableBodyScrollTop("suii_table", 37 * 20);

}

//--------------------------------------------------------------------------------
// 右側
//--------------------------------------------------------------------------------
var RightDisp = function() {

  _htmlControl.BlockAdd({
      id: "right_block",
      left: 600,
      top: 45,
      width: 730,
      height: 730,
      borderColor: "Gray"
  });
  _htmlControl.TextAdd({
      pid: "right_block",
      left: 20,
      top: 10,
      size: 16,
      text: "平常時"
  });
  _htmlControl.ImageAdd({
      pid: "right_block",
      left: 20,
      top: 50,
      width: 180 / 1080 * 1920,
      height: 180,
      image: "img/" + _pointName[_index] + "_normal.jpg"
  });
  _htmlControl.TextAdd({
      pid: "right_block",
      left: 20,
      top: 250,
      size: 16,
      text: "現況カメラ"
  });
  _htmlControl.ImageAdd({
      pid: "right_block",
      left: 20,
      top: 290,
      width: 390 / 1080 * 1920,
      height: 390,
      image: "img/" + _pointName[_index] + ".jpg?" + _dateControl.DateFormat(new Date(), "YYYYMMDDhhmmss")
  });

}

