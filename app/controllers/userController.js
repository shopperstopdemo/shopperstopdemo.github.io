var emailTempalte = {
		"subject": 'We have an offer you can\'t refuse',
		"html": '<html> <img src=\"http://res.cloudinary.com/dren4jgbp/image/upload/c_scale,h_1400/v1460849665/ADITYA_SIR_grihhr.jpg\"/></html>',
		"from": 'admin@shopperstopdemo.in',
		"api_user": "shopperstopdemo",
		"api_key": "shopperstopdemo@123!"
    };

adminApp.controller('userController', function ($scope, $rootScope, Restangular, $http) {

    $scope.message = 'This is Users Area';
    var userAccounts = Restangular.all('users');

    var userPreferences = Restangular.all('user_Preferences');

    


    if ($scope.allUsers == undefined) {
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
        uniqueEmails.push('saurabhdutta6273@gmail.com');
		
		emailTempalte["to[]"] = uniqueEmails;

       /*  var emailJsonData = [];
        for (var i = 0; i < uniqueEmails.length; i++) {
            console.log(uniqueEmails[i]);
            var emailObject = {};
            emailObject.From = emailTempalte.From;
            emailObject.Subject = emailTempalte.Subject;
            emailObject.HtmlBody = emailTempalte.HtmlBody;
            emailObject.To = uniqueEmails[i];
            emailJsonData.push(emailObject);
        } */
        
        var emailData  = JSON.stringify(emailTempalte);
        
        sendEmail();

      /* $http.post('https://api.postmarkapp.com/email/batch', emailJsonData, {
            headers: {
                'X-Postmark-Server-Token': 'c48030f4-5f0a-4726-a5b4-cf9ff2661b49',
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(response) {
           console.log("heelo")
            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
             console.log("hi")
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
*/
		/* console.log(emailTempalte);
		$http.post('https://api.sendgrid.com/api/mail.send.json', emailTempalte, {})
		.then(function successCallback(response) {
           console.log("heelo")
            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
             console.log("hi")
            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
       
        console.log("Data");
        console.log(emailData);
      //  console.log(emailJsonData);
    }
 */
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    
     
}

});


 function sendEmail(){
      console.log("Here in call");
        var settings = {
		  "url": "https://api.sendgrid.com/api/mail.send.json",
		  "method": "POST",
		  "data": emailTempalte
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
		});
    }