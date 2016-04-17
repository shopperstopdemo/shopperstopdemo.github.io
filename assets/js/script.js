$("document").ready(function(){
    
    

    $('.form-signin').validator().submit(function(event){
        
        
        
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        
        var key = username+':'+password;
        var validEncodedKey = 'YWRtaW46YWRtaW5AMTIzIQ==';
        var encodedKey = $.base64('encode',key);
        
        
      
        
       if(encodedKey === validEncodedKey){
            $(location).attr('href', 'mainapp.html');
        }
        else{
            $("#passwordFormGroup").addClass("has-error").addClass("has-danger");
            $("#passwordError").text("Incorrect Password, try again.")
            
        }
        
        event.preventDefault();
    })
    
    
    
  
    
    

});
