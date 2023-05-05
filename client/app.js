
var app = angular.module("myApp", ["ngRoute", "ngCookies"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/login", {
            templateUrl: "views/pages/auth/login.html",
            controller: "LoginController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        })
        .when("/register", {
            templateUrl: "views/pages/auth/register.html",
            controller: "RegisterController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/');
                    } else {
                        $location.path('/register');
                    }
                }
            }
        })
        .when("/add-blog", {
            templateUrl: "views/user/addBlog.html",
            controller: "AddBlogController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/add-blog');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        })
        .when("/", {
            templateUrl: "views/pages/blog/blogList.html",
            controller: "BlogListController",
        })
        .when("/contact", {
            templateUrl: "views/pages/contact.html",
            controller: "ContactController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/contact');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        })
        .when("/about", {
            templateUrl: "views/pages/about.html",
            controller: "AboutController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/about');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        })
        .when("/profile", {
            templateUrl: "views/pages/auth/profile.html",
            controller: "ProfileDataController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/profile');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        })
        .when("/listbyUser", {
            templateUrl: "views/user/userblog.html",
            controller: "UserBlogController",
            resolve: {
                "check": function ($location) {
                    if (localStorage['token']) {
                        $location.path('/listbyUser');
                    } else {
                        $location.path('/login');
                    }
                }
            }
        }).when("/read-blog/:id", {
            templateUrl: "views/pages/blog/readblog.html",
            controller: "BlogController",
        })
        .when("/one", {
            templateUrl: "views/admin/template/one.html",
            controller: "OneController",  
        })
});



app.controller("ProfileController", function ($scope, $http, $cookies, $location,$window) {
    $scope.cookie = $cookies.get("token")
    if ($scope.cookie != undefined) {
        $http({
            method: "GET",
            url: 'http://localhost:8000/api/profile',
            headers: { 'token': $scope.cookie }
        }).then(function mySuccess(res) {
            $scope.data = res.data;
            $scope.role = $scope.data.role
            if ($scope.data.role == "admin") {
                $scope.admin = $scope.data.role
            } else if ($scope.data.role == "user") {
                $scope.user = $scope.data.role
            }
        }).catch(function myError(err) {
            console.log("eee", err);
        })
    }

    $scope.logout = function () {
        $http({
            method: "GET",
            url: `http://localhost:8000/api/logout`,
        }).then(function mySuccess(res) {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            $cookies.remove('token')
            $cookies.remove('role')
            $location.path('/login');
        }).catch(function myError(err) {
            console.log(err);
        })
    }






})





