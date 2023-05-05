app.controller("BlogListController", function ($scope,$http) {
    $http({
        method: "GET",
        url: "http://localhost:8000/api/blog-list",
    }).then(function (res) {
        $scope.data=res.data
        console.log(res.data);
    }).catch(function (err) {
        console.log(err);
    })

});



