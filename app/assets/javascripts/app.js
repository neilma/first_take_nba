first_take_nba = angular.module('first_take_nba',[
])
.service('XmlService', function(){
  this.xml2json = function(xmlStr) {
    var x2js = new X2JS();
    return x2js.xml_str2json(xmlStr);
  };
  this.headlines = function(xmlStr) {
    return this.xml2json(xmlStr).rss.channel.item;
  }
})
.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}])
;