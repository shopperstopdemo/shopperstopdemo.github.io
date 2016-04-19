var emailTempalte = {
    "subject": 'We have an offer you can\'t refuse',
    "html": '<html> <img src=\"http://res.cloudinary.com/dren4jgbp/image/upload/c_scale,h_1400/v1460849665/ADITYA_SIR_grihhr.jpg\"/></html>',
    "from": 'admin@shopperstopdemo.in',
    "api_user": "shopperstopdemo",
    "api_key": "shopperstopdemo@123!"
};

adminApp.controller('userController', function ($scope, $rootScope, Restangular, $http) {

    var userAccounts = Restangular.all('users');

    var userPreferences = Restangular.all('user_Preferences');

    if ($rootScope.allUsers == undefined) {
        userAccounts.getList().then(function (users) {
            $rootScope.allUsers = users;
        });
    }

    $scope.setUser = function (user) {
        console.log(user);
        $rootScope.user = user;
        $rootScope.userPreferences = undefined;

        userPreferences.getList({
            user_id: user.id
        }).then(function (preferences) {
            $rootScope.userPreferences = [];
            console.log(preferences);
            for (index = 0; index < preferences.length; index++) {
                var pref = {};
                pref.id = preferences[index].id;
                pref.user_id = preferences[index].user_id;
                pref.preference_type = preferences[index].preference_type;
                pref.preference_values = [];

                for (var idx in preferences[index].preference_values) {
                    var value = preferences[index].preference_values[idx];
                    pref.preference_values.push(value.split("#"));
                }
                console.log(pref);
                $rootScope.userPreferences.push(pref);
            }

        });
    }

    $scope.sendPromotionalEmail = function () {


        var allUserEmails = [];
        var uniqueEmails;
        for (var i = 0; i < $rootScope.allUsers.length; i++) {
            allUserEmails.push($rootScope.allUsers[i].email);
        }


        uniqueEmails = allUserEmails.filter(onlyUnique);

        emailTempalte["to[]"] = uniqueEmails;


        var emailData = JSON.stringify(emailTempalte);

        sendEmail();
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

    }

});


function sendEmail() {
    var settings = {
        "url": "https://api.sendgrid.com/api/mail.send.json",
        "method": "POST",
        "data": emailTempalte
    }
    $("#mailSpinner").css("visibility", 'visible');

    $.ajax(settings).done(function (response) {
        
    }).fail(function () {
        
    }).always(function () {
            $("#mailSpinner").css("visibility", 'hidden');
    });


}