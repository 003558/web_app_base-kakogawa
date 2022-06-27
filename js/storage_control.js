
//--------------------------------------------------------------------------------
//
// �X�g���[�W����
//
//--------------------------------------------------------------------------------
var StorageControl = function() {}

//--------------------------------------------------------------------------------
//
// �X�g���[�W���N���A����
//
//--------------------------------------------------------------------------------
StorageControl.prototype.StorageClear = function() {

  sessionStorage.clear();
}

//--------------------------------------------------------------------------------
//
// �X�g���[�W���擾����
//
//        key                           �L�[
//        initValue                     �����l
//        [return]                      �l
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
// �X�g���[�W��ݒ肷��
//
//        key                           �L�[
//        value                         �l
//
//--------------------------------------------------------------------------------
StorageControl.prototype.StorageSet = function( key, value ) {

  sessionStorage.setItem(key, value);
}

//--------------------------------------------------------------------------------
//
// ���[�J���X�g���[�W���擾����
//
//        key                           �L�[
//        initValue                     �����l
//        [return]                      �l
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
// �X�g���[�W��ݒ肷��
//
//        key                           �L�[
//        value                         �l
//
//--------------------------------------------------------------------------------
StorageControl.prototype.LocalStorageSet = function( key, value ) {

  localStorage.setItem(key, value);
}
