// var app=angular.module("myApp",[])

app.controller("RegisterController", function ($scope, $http) {

    $scope.registerUser = function (name, email, mobile, password, cnfrm_pass) {
        if (name == undefined || email == undefined || mobile == undefined || password == undefined || cnfrm_pass == undefined) {
            console.log("please fill all input fields");
        } else {
            if (password != cnfrm_pass) {
                console.log("Password not matched");
            } else {
                var user_data = {
                    name: $scope.name,
                    email: $scope.email,
                    mobile: $scope.mobile,
                    password: $scope.password
                }
                $http({
                    method: "POST",
                    url: "http://localhost:8000/api/create",
                    dataType: 'json',
                    data: user_data,
                    headers: { "Content-Type": "application/json" }
                }).then(function mySuccess(res) {
                    console.log("sssss",res);
                    $scope.msg=res.data.msg;
                }).catch(function myError(err) {
                    console.log("eeeee",err.data.error);
                })
            }
        }
    }
})


