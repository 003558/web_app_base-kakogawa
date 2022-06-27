
//--------------------------------------------------------------------------------
//
// ストレージ制御
//
//--------------------------------------------------------------------------------
var StorageControl = function() {}

//--------------------------------------------------------------------------------
//
// ストレージをクリアする
//
//--------------------------------------------------------------------------------
StorageControl.prototype.StorageClear = function() {

  sessionStorage.clear();
}

//--------------------------------------------------------------------------------
//
// ストレージを取得する
//
//        key                           キー
//        initValue                     初期値
//        [return]                      値
//
//--------------------------------------------------------------------------------
StorageControl.prototype.StorageGet = function( key, initValue ) {

  var value = sessionStorage.getItem(key);
  if( value == null || value == "undefined" ) {
    value = initValue;
    sessionStorage.setItem(key, value);
  }

  return value;
}

//--------------------------------------------------------------------------------
//
// ストレージを設定する
//
//        key                           キー
//        value                         値
//
//--------------------------------------------------------------------------------
StorageControl.prototype.StorageSet = function( key, value ) {

  sessionStorage.setItem(key, value);
}

//--------------------------------------------------------------------------------
//
// ローカルストレージを取得する
//
//        key                           キー
//        initValue                     初期値
//        [return]                      値
//
//--------------------------------------------------------------------------------
StorageControl.prototype.LocalStorageGet = function( key, initValue ) {

  var value = localStorage.getItem(key);
  if( value == null || value == "undefined" ) {
    value = initValue;
    localStorage.setItem(key, value);
  }

  return value;
}

//--------------------------------------------------------------------------------
//
// ストレージを設定する
//
//        key                           キー
//        value                         値
//
//--------------------------------------------------------------------------------
StorageControl.prototype.LocalStorageSet = function( key, value ) {

  localStorage.setItem(key, value);
}
