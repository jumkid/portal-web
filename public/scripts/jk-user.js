(function($) {

    // define namespace for user
    $.JK.user = {}

    $.JK.user.Profile = {
        email: "",
        emailVerified: false,
        //requiredActions: ["VERIFY_EMAIL"],
        username: "",
        firstName: "",
        lastName: "",
        enabled: true,
        credentials: [
            {
                "type": "password",
                "value": ""
            }
        ]
    }

    $(document).ready(function() {
        // $(':password').showPassword({
        //     linkRightOffset: 5,
        //     linkTopOffset: 11
        // });
        const signupFormId = "signup-form";
        const signupForm = $("#" + signupFormId);

        $.validator.addMethod("checkUppercase", function(value) {
            return /^(?=.*[A-Z])/.test(value);
        });
        $.validator.addMethod("checkSpecialChar", function(value) {
            return /^(?=.*[@#$%&])/.test(value);
        });
        $.validator.addMethod("checkNumber", function(value) {
            return /^(?=.*[0-9])/.test(value);
        });

        $.JK.user.validator = signupForm.validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2,
                    // remote: {
                    //     url: $.JK.getApiUrl($.JK.API.USER.VALIDATE, {username: $("input[name=username]").val()}),
                    //     type: "GET",
                    //     success: function(response, textStatus, xhr){
                    //         if (response.collection.length > 0) $.JK.user.validator.errorList.push({username: "not able to validate"});
                    //     },
                    //     error: function(xhr, status, error){
                    //         $.JK.user.validator.showErrors({username: "not able to validate"});
                    //     },
                    //     onkeypress: false
                    // }
                },
                email: {
                    required: true,
                    email: true,
                },
                pswd: {
                    required: true,
                    minlength: 6,
                    maxlength: 20,
                    checkUppercase: true,
                    checkSpecialChar: true,
                    checkNumber: true
                },
                cpswd: {
                    required: true,
                    equalTo: "#" + signupFormId + " input[name=pswd]"
                }
            },

            messages: {
                username:  {
                    required: "✖",
                    minlength: "minimum 2 characters",
                    remote: "not available"
                },
                email: {
                    required: "✖",
                    email: "not valid"
                },
                pswd:  {
                    required: "✖",
                    minlength: "minimum 6 characters",
                    maxlength: "maximum 20 characters",
                    checkUppercase: "at least one uppercase",
                    checkSpecialChar: "at least one special character",
                    checkNumber: "at least one number"
                },
                cpswd:  {
                    required: "✖",
                    equalTo: "not match"
                }
            },

            submitHandler: function() {
                const url = $.JK.getApiUrl($.JK.API.USER.SIGNUP);
                console.log( "Register new user " + url );

                if(!$.JK.checkinProgress()) return;

                const userProfile = normalizeUserProfile($.JK.convertFormToJSON(signupFormId));

                $.JK.doPost(url, userProfile, (response, status) => {
                    console.log("status: " + status);
                    if(status === 201){
                        $('#signup-submit-btn').remove();
                        $('#form-submit').text(SYSLang.CMSG_REQUEST_SUBMIT);
                    } else {
                        //TODO
                    }
                }, (response, status) => {
                    if (status === "error") {
                        const error = response.errorMessage.toLowerCase();
                        if (/\bemail\b/i.test(error)) $.JK.user.validator.showErrors({email: error});
                        else if (/\busername\b/i.test(error)) $.JK.user.validator.showErrors({username: error});
                    }
                });
            }
        });

    });

    function normalizeUserProfile(fromData) {
        $.JK.user.Profile.username = fromData.username;
        $.JK.user.Profile.email = fromData.email;
        $.JK.user.Profile.credentials[0].value = fromData.pswd;

        return $.JK.user.Profile;
    }

})(jQuery);