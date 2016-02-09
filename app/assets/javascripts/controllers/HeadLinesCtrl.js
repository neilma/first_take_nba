angular.module('first_take_nba').controller('HeadLinesCtrl', ["$scope", "$http", "$interval", "XmlService", "$sce", function ($scope, $http, $interval, XmlService, $sce) {
  $scope.refreshInterval = 5; // For every 5 sec

  // Create a function as we will reuse this code
  function refresh() {
    $http({
        url: '/news.json',
        method: "GET"
    }).success(function (data) {
      $scope.headlines = data.news;
    }).error(function (data) {
      console.log('Error');
    });
  }
  refresh();
    //$interval(function() {
    //    refresh();
    //}, $scope.refreshInterval * 1000);
  $scope.getHeadLineLink = function(headline) {
      console.log(headline);
    return $sce.trustAsHtml("<a target=\"_blank\" class=\"list-group-item\" href=\"" + headline.link + "\">" + headline.title + "</a>");
  }
}]);