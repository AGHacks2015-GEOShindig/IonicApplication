angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


    .controller('MapController', function($scope, $cordovaGeolocation) {

        console.log("Jestem w MapController");

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {

            console.log("Jestem w device ready");

            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;

                console.log("Lat: " + lat);

                var myLatlng = new google.maps.LatLng(lat, long);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                $scope.map = map;
                $ionicLoading.hide();

            }, function(err) {
                $ionicLoading.hide();
                console.log(err);
            });
        }
    })


.controller('EventListController', function($scope, Geoshindig) {

     // $scope.dane = Geoshindig.all();

    //  console.log(Geoshindig.all());
      console.log("Controller");

        Geoshindig.all().then(function(d) {
            $scope.data = d.hits;
        });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Geoshindig) {
        console.log("Kontroler chat detail");
  $scope.chat = Geoshindig.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

