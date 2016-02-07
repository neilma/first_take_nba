first_take_nba = angular.module('first_take_nba',['ngAnimate'])
.service('XmlService', function(){
  this.xml2json = function(xmlStr) {
    var x2js = new X2JS();
    return x2js.xml_str2json(xmlStr);
  };
 this.endpoints = { 'headlines' : 'http://sports.espn.go.com/espn/rss/nba/news' };
})
.filter('to_trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}])
;