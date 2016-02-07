angular.module('first_take_nba').controller('HomeCarouselCtrl', function ($scope, $sce, $http) {
    function embedVidHtml(vidId) {
        return $sce.trustAsHtml('<iframe width="640px" height="350px" src="https://www.youtube.com/embed/' + vidId + '"></iframe>');
    }

    var getVids = function() {
        $http({
            //url: 'https://www.googleapis.com/youtube/v3/search?key=' + process.env.YOUTUBE_KEY + '&channelId=' +  + '&part=snippet&order=date&maxResults=3',
            url: '/headline_vid',
            method: 'GET'
        }).success(function(data){
            console.log(typeof(data.vid_ids));
            $scope.carousel_vid1 = embedVidHtml(data.vid_ids[0]);
            $scope.carousel_vid2 = embedVidHtml(data.vid_ids[1]);
            $scope.carousel_vid3 = embedVidHtml(data.vid_ids[2]);
            return data.vid_ids;
        }).error(function(data){
            console.log(data);
            return [];
        });
    };
    getVids();
    //vids = getVids();
    //console.log(vids);
    //var carouselVids = function(vids) {
    //    $scope.tests = vids;
    //    var carouselVidIds = [];
    //    for (var vid in vids) {
    //        carouselVidIds.push(embedVidHtml(vids[vid]));
    //    }
    //    console.log(carouselVidIds);
    //    return carouselVidIds;
    //}
    //console.log(carouselVidIds);
    //$scope.carouselVidIds = carouselVidIds;
});