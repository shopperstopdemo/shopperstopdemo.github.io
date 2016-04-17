adminApp.controller('productController', function($scope,$http) {
    $scope.message = 'This is Products Board';
    
      var allUserEmails = [];
        var uniqueEmails;
        for (var i = 0; i < $rootScope.allUsers.length; i++) {
            allUserEmails.push($rootScope.allUsers[i].email);
        }


        uniqueEmails = allUserEmails.filter(onlyUnique);
        uniqueEmails.push('saurabhdutta6273@gmail.com');

        var emailJsonData = [];
        for (var i = 0; i < uniqueEmails.length; i++) {
            console.log(uniqueEmails[i]);
            var emailObject = {};
            emailObject.From = emailTempalte.From;
            emailObject.Subject = emailTempalte.Subject;
            emailObject.HtmlBody = emailTempalte.HtmlBody;
            emailObject.To = uniqueEmails[i];
            emailJsonData.push(emailObject);
        }
        
        var emailData  = JSON.stringify(emailJsonData);

       $http.post('https://api.postmarkapp.com/email/batch', emailJsonData, {
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

       
        console.log("Data");
        console.log(emailData);
        console.log(emailJsonData);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

});