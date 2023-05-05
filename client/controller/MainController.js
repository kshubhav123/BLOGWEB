
app.controller("MainController", function ($scope, $http, $cookies,$location) {
   
    $scope.deleteUser = function (id) {
        console.log(id);
        $http({
            method: "DELETE",
            url: `http://localhost:8000/api/delete/${id}`,
        }).then(function mySuccess(res) {
            console.log(res);
        }).catch(function myError(err) {
            console.log(err);
        })
    }
})
