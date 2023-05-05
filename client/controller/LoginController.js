
app.controller("LoginController", function ($scope,$http,$cookies,$location,$window) {

    $scope.loginUser = function (email, password) {
        if (email == undefined || password == undefined) {
            console.log("Please fill All field");
        } else {
            var user_data = {
                email: $scope.email,
                password: $scope.password
            }
            $http({
                method: "POST",
                url: "http://localhost:8000/api/login",
                dataType: 'json',
                data: user_data,
                headers: { "Content-Type": "application/json" }
            }).then(function mySuccess(res) {
                if (localStorage['token']) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                }
                $cookies.put("token", res.data.token); 
                $cookies.put("role", res.data.role); 
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                $location.path("/")
            }).catch(function myError(err) {
                console.log("fffffff",err.data);
            })
        }
    }
})
