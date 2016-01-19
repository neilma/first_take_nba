angular.module('first_take_nba').controller('HeadLinesCtrl', function ($scope, $http, $interval, XmlService, $sce) {
  $scope.refreshInterval = 5; // For every 5 sec

  // Create a function as we will reuse this code
  function refresh() {
    $http({
        url: 'http://sports.espn.go.com/espn/rss/nba/news',
        method: "GET"
    }).success(function (data) {
      $scope.headlines = XmlService.headlines(data);
    }).error(function (data) {
      console.log('Error');
    });
  }
  refresh();
    //$interval(function() {
    //    refresh();
    //}, $scope.refreshInterval * 1000);
  $scope.getHeadLineLink = function(headline) {
    return $sce.trustAsHtml("<a class=\"list-group-item\" href=\"" + headline.link + "\">" + headline.title + "</a>");
  }
});