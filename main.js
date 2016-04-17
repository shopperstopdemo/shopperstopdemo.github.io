/*
 * Auto-generated content from the Brackets New Project extension.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler
$(document).ready(function () {
    "use strict";
    $("#btnSubmit").click(function (e) {
        var settings = {
            "url": "https://api.postmarkapp.com/email/batch",
            "method": "POST",
            "headers": {
                "x-postmark-server-token": "c48030f4-5f0a-4726-a5b4-cf9ff2661b49",
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "data": "[{From: 'admin@shopperstopdemo.in', To: 'saurabhdutta.jk@gmail.com', Subject: 'We have an offer you can\\'t refuse', HtmlBody: '<html> <img src=\"http://res.cloudinary.com/dren4jgbp/image/upload/c_scale,h_1400/v1460849665/ADITYA_SIR_grihhr.jpg\"/></html>'},{From: 'admin@shopperstopdemo.in', To: 'kumaraditya13@gmail.com', Subject: 'We have an offer you can\\'t refuse', HtmlBody: '<html><body> <img src=\"http://res.cloudinary.com/dren4jgbp/image/upload/c_scale,h_1400/v1460849665/ADITYA_SIR_grihhr.jpg\"/></body></html>'}]"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});