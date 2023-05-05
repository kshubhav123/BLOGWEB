app.controller("AddBlogController", function ($http, $scope,$cookies,$timeout,$window) {

$scope.createBlog=(title,description)=>{
    
    $scope.cookie=$cookies.get("token");
    var blog_data={
        title:title,
        description:description
    }
        $http({
            method: "POST",
            url: "http://localhost:8000/api/add-blog",
            dataType: 'json',
            data: blog_data,
            headers: { "Content-Type": "application/json",'token': $scope.cookie }
        }).then(function (res) {
            console.log(res);
            $scope.msg="Blog Created Successfully"
            $timeout(function(){
                $window.location.reload();
             }, 2000);

        }).catch(function (err) {
            console.log(err);
        })
}
});