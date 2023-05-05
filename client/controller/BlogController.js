app.controller('BlogController', function ($scope, $http, $cookies, $routeParams,$window) {
    $scope.id = $routeParams.id
    $http({
        method: "GET",
        url: `http://localhost:8000/api/read-blog/${$scope.id}`,
    }).then(function mySuccess(res) {
        $scope.data = res.data;
        console.log("fff", $scope.data);
    }).catch(function myError(err) {
        console.log("eee", err);
    })

    $scope.commentBox = (text, email) => {
        $scope.id = $routeParams.id
        var comment_data = {
            text: text,
            email: email,
            blogId: $scope.id
        }
        $http({
            method: "Post",
            url: `http://localhost:8000/api/create-comment`,
            dataType: "json",
            data: comment_data,
            headers: { "Content-Type": "application/json" }
        }).then(function mySuccess(res) {
            $scope.data = res.data;
            console.log("fff", $scope.data);
            $window.location.reload();
        }).catch(function myError(err) {
            console.log("eee", err);
        })

    }


})

app.controller('CommentListController', function ($scope, $http,$routeParams) {
    $scope.id = $routeParams.id
    $http({
        method: "GET",
        url: `http://localhost:8000/api/comment-list`,
        headers: {'blogid':$scope.id} 
    }).then(function mySuccess(res) {
        $scope.data = res.data;
        console.log("fff", $scope.data);
    }).catch(function myError(err) {
        console.log("eee", err);
    })

})


