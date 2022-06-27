
//--------------------------------------------------------------------------------
//
// 日付関数
//
//--------------------------------------------------------------------------------
var DateControl = function() {}

//--------------------------------------------------------------------------------
//
// 日付フォーマットで文字列化する
//
//        date                          日付
//        format                        フォーマット（YYYY/MM/DD hh:mm:ss a）
//        [return]                      日付文字列
//
//--------------------------------------------------------------------------------
DateControl.prototype.DateFormat = function( date, format ) {

  var datex;
  if( typeof date === 'string' ) {
    datex = new Date(date.replace(/-/g,"/"));
  }
  else {
    datex = date;
  }
  if( !format ) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, datex.getFullYear());
  format = format.replace(/MM/g, ('0'+(datex.getMonth()+1)).slice(-2));
  format = format.replace(/DD/g, ('0'+datex.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0'+datex.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0'+datex.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0'+datex.getSeconds()).slice(-2));
  format = format.replace(/a/g, ["日","月","火","水","木","金","土"][datex.getDay()] );
  if( format.match(/S/g) ) {
    var milliSeconds = ('00' + datex.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for( var i = 0; i < length; i++ ) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }

  return format;
}

//--------------------------------------------------------------------------------
//
// 日付を加算する
//
//        date                          日付
//        num                           加算数
//        interval                      加算する単位（YYYY、MM、DD、hh、mm、ss）
//        [return]                      加算後日付
//
//--------------------------------------------------------------------------------
DateControl.prototype.DateAdd = function( date, num, interval ) {

  var datex;
  if( typeof date === 'string' ) {
    datex = new Date(date.replace(/-/g,"/"));
  }
  else {
    datex = new Date(date.getTime());
  }
  switch( interval ) {
    case 'YYYY':
      datex.setFullYear(datex.getFullYear() + num*1);
      break;
    case 'MM':
      datex.setMonth(datex.getMonth() + num*1);
      break;
    case 'DD':
      datex.setDate(datex.getDate() + num*1);
      break;
    case 'hh':
      datex.setHours(datex.getHours() + num*1);
      break;
    case 'mm':
      datex.setMinutes(datex.getMinutes() + num*1);
      break;
    case 'ss':
      datex.setSeconds(datex.getSeconds() + num*1);
      break;
  }

  return datex;
}

//--------------------------------------------------------------------------------
//
// 日付の差を求める
//
//        date1                         日付1
//        date2                         日付2
//        interval                      差の単位（YYYY、MM、DD、hh、mm、ss）
//        [return]                      日付の差
//
//--------------------------------------------------------------------------------
DateControl.prototype.DateDiff = function( date1, date2, interval ) {

  var datex1, datex2;
  if( typeof date1 === 'string' ) {
    datex1 = new Date(date1.replace(/-/g,"/"));
  }
  else {
    datex1 = date1;
  }
  if( typeof date2 === 'string' ) {
    datex2 = new Date(date2.replace(/-/g,"/"));
  }
  else {
    datex2 = date2;
  }
  var diff = datex2.getTime() - datex1.getTime();
  switch (interval) {
    case 'YYYY':
      var d1 = new Date(datex1.getTime());
      var d2 = new Date(datex2.getTime());
      d1.setYear(0);
      d2.setYear(0);
      var i;
      if (diff >= 0) {
        i = d2.getTime() < d1.getTime() ? -1 : 0;
      } else {
        i = d2.getTime() <= d1.getTime() ? 0 : 1;
      }
      return datex2.getFullYear() - datex1.getFullYear() + i;
    case 'MM':
      var d1 = new Date(datex1.getTime());
      var d2 = new Date(datex2.getTime());
      d1.setFullYear(0);
      d1.setMonth(0);
      d2.setYear(0);
      d2.setMonth(0);
      var i;
      if (diff >= 0) {
        i = d2.getTime() < d1.getTime() ? -1 : 0;
      } else {
        i = d2.getTime() <= d1.getTime() ? 0 : 1;
      }
      return ((datex2.getFullYear() * 12) + datex2.getMonth()) - ((datex1.getYear() * 12) + datex1.getMonth()) + i;
    case 'DD':
      return ~~(diff / (24 * 60 * 60 * 1000));
    case 'hh':
      return ~~(diff / (60 * 60 * 1000));
    case 'mm':
      return ~~(diff / (60 * 1000));
    case 'ss':
      return ~~(diff / 1000);
  }

  return 0;
}

//--------------------------------------------------------------------------------
//
// 日付をチェックする
//
//        year                          年
//        month                         月
//        day                           日
//        [return]                      true：OK
//
//--------------------------------------------------------------------------------
DateControl.prototype.DateCheck = function( year, month, day ) {

  var check = new Date(year, month, day);

  if( isNaN(check) ) {
    return false;
  }
  else if( check.getFullYear() == year && check.getMonth() == month && check.getDate() == day ) {
    return true;
  }
  else {
    return false;
  }
}

