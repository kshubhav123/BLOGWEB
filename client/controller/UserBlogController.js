

app.controller("UserBlogController", function($http,$cookies,$scope){
    $scope.cookie = $cookies.get("token")
    $http({
        method: "GET",
        url: 'http://localhost:8000/api/listbyUser/',
        headers: {'token': $scope.cookie}
    }).then(function mySuccess(res) {
        $scope.data = res.data;
        console.log("rrr",$scope.data);
    }).catch(function myError(err) {
        console.log("eee",err);
    })

    $scope.deleteBlog=function(id){
        $scope.loading=true;
        $scope.cookie = $cookies.get("token")
        $http({
            method: "delete",
            url: `http://localhost:8000/api/removeBlog/${id}`,
            headers:{'token':$scope.cookie}
        }).then(function (res) {
            console.log(res);
            window.location.reload();
            $scope.loading=true;
        }).catch(function (err) {
            console.log("jj",err);
        })
    }

})