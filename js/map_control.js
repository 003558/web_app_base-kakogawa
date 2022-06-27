
//--------------------------------------------------------------------------------
// 変数
//--------------------------------------------------------------------------------
var _map;
var _mapNode;
var _mapMouseFlag = 0;

var _mapStdLayer;                // 標準地図
var _mapOrtLayer;                // オルソ画像

//--------------------------------------------------------------------------------
//
// map制御
//
//--------------------------------------------------------------------------------
var MapControl = function() {

  this._htmlControl = new HtmlControl();

}

//--------------------------------------------------------------------------------
//
// 地図を作成する
//
//        id                           地図エリアID
//        latitude                     緯度
//        longitude                    経度
//        zoom                         ズーム
//        func                         クリック時の処理
//
//--------------------------------------------------------------------------------
MapControl.prototype.MapCreate = function( id, latitude, longitude, zoom, func ) {

  // ベースレイヤを作成する
  _mapStdLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: [
        new ol.Attribution({
          html: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
        })
      ],
      url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
      //url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
      projection: 'EPSG:3857',
      visible: false
    }),
    opacity: 0.5,
  });

  _mapOrtLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: [
        new ol.Attribution({
          html: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>地理院タイル</a>"
        })
      ],
      url: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
      visible: false
    })
  });

  // マップを作成する
  var scaleLineControl = new ol.control.ScaleLine();
  _map = new ol.Map({
    target: id,
    rendere: ['canvas', 'dom'],
    layers: [ _mapStdLayer ],
    controls: ol.control.defaults({
      attibutionOptions: ({
        collapsible: false
      })
    }).extend([
      scaleLineControl
    ]),
    view: new ol.View({
      projection: 'EPSG:3857',
      center: ol.proj.transform([longitude,latitude], 'EPSG:4326', 'EPSG:3857'),
      minZoom: 5,
      maxZoom: 20,
      zoom: zoom
    })
  });

  _map.addLayer(_mapOrtLayer);
  //_mapOrtLayer.setVisible(false);

  //_mapStdLayer.on('postcompose', function(event) {
  //  greyscale(event.context);
  //});

  if( func != null ) {
    _map.on('click', function( evt ) {
      var features = [];
      _map.forEachFeatureAtPixel(evt.pixel, function( feature, layer ) {
                                              features.push({feature: feature, layer: layer});
                                            }, { hitTolerance: 10 })
      if( features.length > 0 ) {
        func(features);
      }
    });
  }
}

function greyscale(context) {

  var canvas = context.canvas;
  var width = canvas.width;
  var height = canvas.height;
  var imageData = context.getImageData(0, 0, width, height);
  var data = imageData.data;
  for(i=0; i<data.length; i += 4){
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    // CIE luminance for the RGB
    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // Show white color instead of black color while loading new tiles:
    if(v === 0.0) v=255.0;  
    data[i+0] = v; // Red
    data[i+1] = v; // Green
    data[i+2] = v; // Blue
    data[i+3] = 255; // Alpha
  }
  context.putImageData(imageData,0,0);
 
}

//--------------------------------------------------------------------------------
//
// ポイントJSONを読み込む
//
//        title                        レイヤタイトル
//        json                         GeoJsonファイル
//        flag                         水位超過
//
//--------------------------------------------------------------------------------
MapControl.prototype.PointJsonLoad = function( title, json, flag ) {

  MapDelete(title);

  var pointLayer = new ol.layer.Vector({
      title: title,
      source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: json+"?"+(new Date()).getTime()
      }),
      style: function(feature, resolution) {
          var zoom = _map.getView().getZoom();
          var image = "img/cctv_black.png";
          var index = feature.get("No") - 1;
          if( flag[index] ) {
            image = "img/cctv_red.png";
          }
          var pointStyle = new ol.style.Style({
              image: new ol.style.Icon({
                  anchor: [0.5, 0.5],
                  size : [ 25, 25 ],
                  src: image
              })
          });
          var text = "";
          if( zoom >= 10 ) text = feature.get("Name");
          var labelStyle = new ol.style.Style({
              text: new ol.style.Text({
                  font: "10px Meiryo",
                  offsetY: zoom,
                  text: text,
                  fill: new ol.style.Fill({
                      color: "#000000"
                  }),
                  stroke: new ol.style.Stroke({
                      color: "#FFFFFF",
                      width: 4
                  }),
                  textAlign: "center",
                  textBaseline: "top"
              })
          });
          return [pointStyle, labelStyle];
      }
  });

  _map.addLayer(pointLayer);

}

//--------------------------------------------------------------------------------
//
// ポイントJSONを読み込む（標準版）
//
//        title                        レイヤタイトル
//        json                         GeoJsonファイル
//
//--------------------------------------------------------------------------------
MapControl.prototype.PointJsonStdLoad = function( title, json ) {

  var pointLayer = new ol.layer.Vector({
      title: title,
      source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: json+"?"+(new Date()).getTime()
      }),
      style: function(feature, resolution) {
          var image = "img/cctv_line.png";
          var pointStyle = new ol.style.Style({
              image: new ol.style.Icon({
                  anchor: [0.5, 0.5],
                  size : [ 25, 25 ],
                  src: image
              })
          });
          return [pointStyle];
      }
  });

  _map.addLayer(pointLayer);
  pointLayer.setVisible(false);

}

//--------------------------------------------------------------------------------
//
// メッシュJSONを読み込む
//
//        title                        レイヤタイトル
//        json                         GeoJsonファイル
//
//--------------------------------------------------------------------------------
MapControl.prototype.MeshJsonLoad = function( title, json ) {

  MapDelete(title);

  var meshLayer = new ol.layer.Vector({
      title: title,
      source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: json+"?"+(new Date()).getTime()
      }),
      style: function(feature, resolution) {
          var colors = ['rgba(250,255,181,0.6)', 'rgba(242,246,175,0.6)', 'rgba(247,221,172,0.6)',
                        'rgba(255,213,191,0.6)', 'rgba(254,185,188,0.6)', 'rgba(254,146,146,0.6'];
          var level = feature.get('Level')-1;
          var fillStyle = new ol.style.Style({
              fill: new ol.style.Fill({
                  color: colors[level]
              })
          });
          return [fillStyle];
      }
  });

  _map.addLayer(meshLayer);

}

//--------------------------------------------------------------------------------
//
// ポリゴンJSONを読み込む
//
//        title                        レイヤタイトル
//        json                         GeoJsonファイル
//        borderColor                  枠色
//        backColor                    塗りつぶし色
//
//--------------------------------------------------------------------------------
MapControl.prototype.PolygonLoad = function( title, json, borderColor, backColor ) {

  MapDelete(title);

  var polygonLayer = new ol.layer.Vector({
      title: title,
      source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: json+"?"+(new Date()).getTime()
      }),
      style: function(feature, resolution) {
          var zoom = _map.getView().getZoom();
          var fillStyle = new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: borderColor,
                  width: 1
              }),
              fill: new ol.style.Fill({
                  color: backColor
              })
          });
          return [fillStyle];
      }
  });

  _map.addLayer(polygonLayer);

}

//--------------------------------------------------------------------------------
//
// レイヤの表示／非表示を設定する
//
//        name                          レイヤ名
//        disp                          true：表示
//
//--------------------------------------------------------------------------------
MapControl.prototype.LayerDispSet = function( name, disp ) {

  _map.getLayers().forEach(function(layer) {
    if( layer.get('title') == name ) {
      layer.setVisible(disp);
      return;
    }
  });

}

MapControl.prototype.OrthoLayerSet = function( flag ) {

  _mapOrtLayer.setVisible(flag);

}

//--------------------------------------------------------------------------------
//
// 再描画する
//
//--------------------------------------------------------------------------------
MapControl.prototype.ReDraw = function() {

  var mapCenter = _map.getView().getCenter();
  var newCenter = [mapCenter[0] - 0.001, mapCenter[1] - 0.001];
  _map.getView().setCenter(newCenter);
  
}

//--------------------------------------------------------------------------------
//
// レイヤ削除
//
//        name                          レイヤ名
//
//--------------------------------------------------------------------------------
function MapDelete( name ) {

  _map.getLayers().forEach(function(layer) {
    if( layer.get('title') == name ) {
      _map.removeLayer(layer);
    }
  });

}

