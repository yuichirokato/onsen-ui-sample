(function () {
    'use strict';
    var QIITA_API_END_POINT = "https://qiita.com/api/v1";
    var TAG_NAMES = ["swift", "scala", "ios", "android"];

    var module = ons.bootstrap('my-app', ['onsen']);
    module.controller('AppController', function ($scope) {
    });

    module.controller('MainPageController', function ($scope, $data) {

        TAG_NAMES.forEach(function (tag) {
            var apiPath = "/tags/" + tag + "/items";
            var res = $data.feedRead(QIITA_API_END_POINT + apiPath);
            res.success(function (data) {
                localStorage.setItem(tag, JSON.stringify(data));
                if (tag === "android") {
                    console.log("hide!");
                    monaca.splashScreen.hide();
                }
            }).error(function (data, status, heaers, config) {
                alert('error! statuscode: ' + status);
            });
        });

        $scope.swipeleftEvent = function () {
            var index = $scope.tabbar.getActiveTabIndex();
            $scope.tabbar.setActiveTab(index + 1, {});
        };

        $scope.swiperightEvent = function () {
            var index = $scope.tabbar.getActiveTabIndex();
            $scope.tabbar.setActiveTab(index - 1, {});
        };
    })

        .controller('SwiftPostsController', function ($scope, $data, $timeout) {
            var posts = JSON.parse(localStorage.getItem("swift"));
            if (posts !== 'undefined') {
                console.log("swift posts: " + posts);
                $scope.rssList = posts;
            } else {
                console.log('no local data!');
                $data.feedRead(QIITA_API_END_POINT + '/tags/swift/items').success(function (data) {
                    $scope.rssList = data;
                }).error(function (data, status, heaers, config) {
                    alert('error! statuscode: ' + status + ', url: ' + requestURL);
                });
            }

            $scope.load = function ($done) {
                $timeout(function () {
                    var res = $data.feedRead(QIITA_API_END_POINT + '/tags/swift/items');
                    res.success(function (data) {
                        localStorage.setItem("swift", JSON.stringify(data));
                        $scope.rssList = data;
                    }).error(function (data, status, heaers, config) {
                        alert('error! statuscode: ' + status + ', url: ' + requestURL);
                    }).finally(function () {
                        $done();
                    });
                }, 1000);
            };

            $scope.showArticle = function (index) {
                var item = $scope.rssList[index];
                window.open(item.url, '_blank', 'location=no');
            };
        })

        .controller('ScalaPostsController', function ($scope, $timeout, $data) {
            var posts = JSON.parse(localStorage.getItem("scala"));
            console.log("swift posts: " + posts);
            $scope.rssList = posts;

            $scope.load = function ($done) {
                $timeout(function () {
                    var res = $data.feedRead(QIITA_API_END_POINT + '/tags/scala/items');
                    res.success(function (data) {
                        localStorage.setItem("scala", JSON.stringify(data));
                        $scope.rssList = data;
                    }).error(function (data, status, heaers, config) {
                        alert('error! statuscode: ' + status + ', url: ' + requestURL);
                    }).finally(function () {
                        $done();
                    });
                }, 1000);
            };

            $scope.showArticle = function (index) {
                var item = $scope.rssList[index];
                window.open(item.url, '_blank', 'location=no');
            };
        })

        .controller('iOSPostsController', function ($scope, $timeout, $data) {
            var posts = JSON.parse(localStorage.getItem("ios"));
            console.log("swift posts: " + posts);
            $scope.rssList = posts;

            $scope.load = function ($done) {
                $timeout(function () {
                    var res = $data.feedRead(QIITA_API_END_POINT + '/tags/ios/items');
                    res.success(function (data) {
                        localStorage.setItem("ios", JSON.stringify(data));
                        $scope.rssList = data;
                    }).error(function (data, status, heaers, config) {
                        alert('error! statuscode: ' + status + ', url: ' + requestURL);
                    }).finally(function () {
                        $done();
                    });
                }, 1000);
            };

            $scope.showArticle = function (index) {
                var item = $scope.rssList[index];
                window.open(item.url, '_blank', 'location=no');
            };
        })

        .controller('AndroidPostsController', function ($scope, $timeout, $data) {
            var posts = JSON.parse(localStorage.getItem("android"));
            console.log("swift posts: " + posts);
            $scope.rssList = posts;

            $scope.load = function ($done) {
                $timeout(function () {
                    var res = $data.feedRead(QIITA_API_END_POINT + '/tags/android/items');
                    res.success(function (data) {
                        localStorage.setItem("android", JSON.stringify(data));
                        $scope.rssList = data;
                    }).error(function (data, status, heaers, config) {
                        alert('error! statuscode: ' + status + ', url: ' + requestURL);
                    }).finally(function () {
                        $done();
                    });
                }, 1000);
            };

            $scope.showArticle = function (index) {
                var item = $scope.rssList[index];
                window.open(item.url, '_blank', 'location=no');
            };
        });

    module.factory('$data', ['$http', function ($http) {
        var data = {};

        data.feedRead = function (url) {
            //console.log(XML_2_JSON_SERVICE_URL + encodeURIComponent(url));
            return $http.get(url);
        };

        return data;
    }]);
})();
