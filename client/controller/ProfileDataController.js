app.controller("ProfileDataController", function($http,$cookies,$scope,){
    $scope.cookie = $cookies.get("token")
    $http({
        method: "GET",
        url: 'http://localhost:8000/api/profile',
        headers: {'token': $scope.cookie}
    }).then(function mySuccess(res) {
        $scope.data = res.data;
        console.log("data",$scope.data);
       
    }).catch(function myError(err) {
        console.log("eee",err);
    })


})