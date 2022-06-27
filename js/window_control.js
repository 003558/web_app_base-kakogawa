
//--------------------------------------------------------------------------------
//
// �E�B���h�E����
//
//--------------------------------------------------------------------------------
var WindowControl = function() {

  this._dateControl = new DateControl();
  this.windowList = [];
}

//--------------------------------------------------------------------------------
//
// �^�C�g����ݒ肷��
//
//        title                         �^�C�g��
//
//--------------------------------------------------------------------------------
WindowControl.prototype.TitleSet = function( title ) {

  document.title = title;
}

//--------------------------------------------------------------------------------
//
// Window�����擾����
//
//        [return]                      �E�B���h�E��
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowWidthGet = function() {

  return $(window).width();
}

//--------------------------------------------------------------------------------
//
// Window�T�C�Y��ύX����
//
//        width                         ��
//        height                        ����
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
// Window��\������
//
//        url                           �t�q�k
//        name                          �E�B���h�E��
//        close                         ����t���b�O
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowDisp = function( url, name, close ) {

  // �I�v�V������ݒ肷��
  var opt = "width=150,height=150,menubar=no,toolbar=no,location=no,directories=no,status=no,resizable=no,scrollbars=no";
  //var opt = "width=150,height=150,resizable=yes,scrollbars=yes";

  // ���ɊJ���Ă���΁A����
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    if( close != false ) this.windowList[url].close();
    else                 return this.windowList[url];
  }

  // �E�B���h�E�I�u�W�F�N�g���擾
  var wd = window.open(url+"?"+this._dateControl.DateFormat(new Date(), "YYYYMMDDhhmmss"), name, opt);
  this.windowList[url] = wd;

  // �E�B���h�E�Ƀt�H�[�J�X�ړ�
  wd.focus();

  return wd;
}

WindowControl.prototype.WindowDispSize = function( url, name, close, width, height ) {

  // �I�v�V������ݒ肷��
  var opt = "width=" + width + ",height=" + height + ",menubar=no,toolbar=no,location=no,directories=no,status=no,resizable=no,scrollbars=no";

  // ���ɊJ���Ă���΁A����
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    if( close != false ) this.windowList[url].close();
    else                 return this.windowList[url];
  }

  // �E�B���h�E�I�u�W�F�N�g���擾
  var wd = window.open(url+"?"+new Date(), name, opt);
  this.windowList[url] = wd;

  // �E�B���h�E�Ƀt�H�[�J�X�ړ�
  wd.focus();

  return wd;
}

//--------------------------------------------------------------------------------
//
// Window�����
//
//        url                           �t�q�k
//
//--------------------------------------------------------------------------------
WindowControl.prototype.WindowClose = function( url ) {

  // ���ɊJ���Ă���΁A����
  if(  this.windowList[url] && !this.windowList[url].closed ) {
    this.windowList[url].close();
  }
}

//--------------------------------------------------------------------------------
//
// Dialog��\������
//
//        url                           �t�q�k
//        width                         ��
//        height                        ����
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DialogDisp = function( url, width, height ) {

  // �I�v�V������ݒ肷��
  var opt = "dialogWidth="+width+"px;dialogHeight="+height+"px;";

  // ���ɊJ���Ă���΁A�������Ȃ�
  if( this.windowList[url] && !this.windowList[url].closed )   return;

  // �_�C�A���O��\������
  var wd = showModalDialog(url+"?"+new Date(), window, opt);
  this.windowList[url] = wd;

  return wd;
}

//--------------------------------------------------------------------------------
//
// CGI���ďo��
//
//        url                           ���s�t�@�C��
//        par                           �p�����[�^
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
// ���O�C������
//
//        login_id                      ���O�C��ID
//        password                      �p�X���[�h
//        ok_func                       OK�̏ꍇ�̏���
//        out_func                      OUT�̏ꍇ�̏���
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
// ���O�A�E�g����
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
// �x�������s����
//
//        func                          ���s�֐�
//        time                          �x������
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DelayExecute = function( func, time ) {

  if( time == null ) time = 10;
  return window.setTimeout(func, time);
}

//--------------------------------------------------------------------------------
//
// �x�����s���~����
//
//        id                            ���sID
//
//--------------------------------------------------------------------------------
WindowControl.prototype.DelayStop = function( id ) {

  window.clearTimeout(id);
}

//--------------------------------------------------------------------------------
//
// Wait�J�[�\����\������
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CursorWait = function() {

  document.body.style.cursor = "wait";
}

//--------------------------------------------------------------------------------
//
// Default�J�[�\����\������
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CursorDefault = function() {

  document.body.style.cursor = "default";
}

//--------------------------------------------------------------------------------
//
// �t�@�C�����_�E�����[�h������
//
//        url                           �t�q�k
//
//--------------------------------------------------------------------------------
WindowControl.prototype.Download = function( url ) {

  location.href = url+"?"+new Date();
}

//--------------------------------------------------------------------------------
//
// �N�b�L�[�ɕۑ�����
//
//        name                          ���O
//        value                         �l
//
//--------------------------------------------------------------------------------
WindowControl.prototype.CookieSave = function( name, value ) {

  document.cookie = name+"="+value;
}

//--------------------------------------------------------------------------------
//
// �Z�b�V�������擾����
//
//        name                          ���O
//        [return]                      �l
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
// ���݂̃y�[�W���ēǂݍ��݂���
//
//--------------------------------------------------------------------------------
WindowControl.prototype.Reload = function() {

  location.reload();
}

//--------------------------------------------------------------------------------
//
// �t�@�C����ǂݍ���
//
//        file_name                     �t�@�C����
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
// ��������\��
//
//        mesg                          ���b�Z�[�W
//        func                          ���s�֐�
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
