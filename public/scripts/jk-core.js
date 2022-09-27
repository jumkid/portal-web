(function($) {
    $(document).ready(function() {
        // $(':password').showPassword({
        //     linkRightOffset: 5,
        //     linkTopOffset: 11
        // });

        $.validator.addMethod("pwcheck", function(value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&])(.{6,20}$)/.test(value) // consists of only these
                && /^(?=.*[A-Z])/.test(value) // has a uppercase letter
                && /^(?=.*[@#$%&])/.test(value) // has a special characters
        });

        $("#signup_form").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true,
                },
                pswd: {
                    required: true,
                    minlength: 6,
                    maxlength: 20,
                    pwcheck: true
                },
                cpswd: {
                    required: true,
                    equalTo: "#signup_form input[name=password]"
                }
            },

            messages: {
                username:  {
                    required: "✖",
                    minlength: "minimum 2 characters"
                },
                email: {
                    required: "✖",
                    email: "not valid"
                },
                pswd:  {
                    required: "✖",
                    minlength: "minimum 6 characters",
                    maxlength: "maximum 20 characters",
                    pwcheck: "1 uppercase 1 special character"
                },
                cpswd:  {
                    required: "✖",
                    equalTo: "not match"
                }
            },

            submitHandler: function() {
                console.log("validate form");

                const signUpApi = $.JK.getApiUrl($.JK.API.USER.SIGNUP);
                console.log( "API calling : " + signUpApi );
                event.preventDefault();
            }
        });

    });

    // global single instance object
    $.JK = {

        version: "0.9.1",

        locale: "en",

        contextUrl: null,

        isInProgress: false,

        API: {
            HOST: 'http://localhost',
            USER: {
                SIGNUP: '/v1/user/signup',
                VALIDATE: '/v1/user/validate'
            }
        },

        getApiUrl: function(api, params, noPrefix) {
            const regEx = /[-_\w]+/g;
            let url = (!noPrefix) ? $.JK.API.HOST + api : api;
            url = url.replace(regEx, function(str) {
                const match = /[-_\w]+/g.exec(str);
                if (params && params[match[0]])
                    return params[match[0]];
                else
                    return '';
            });
            return url;
        },

        assembleUrl: function(api, params, noPrefix) {
            const regEx = /[-_\w]+/g;
            let url = (!noPrefix) ? this.contextUrl + api : api;
            url = url.replace(regEx, function(str) {
                const match = /[-_\w]+/g.exec(str);
                if (params && params[match[0]])
                    return params[match[0]];
                else
                    return '';
            });
            return url;
        },

        /**
         * Submit lock for duplicate submit request by the user
         */
        checkinProgress: function() {
            if (!this.isInProgress) {
                this.isInProgress = true;
                return true;
            } else {
                const target_message_bar = "popup_error_msg";

                this.showError("in progress", target_message_bar);
                return false;
            }
        },
        checkoutProgress: function() {
            if (this.isInProgress) {
                this.isInProgress = false;
                return true;
            }
        },

        setLocale: function(locale) {
            this.locale = locale;
        },

        getLocale: function() {
            return this.locale;
        },

        setContextUrl: function(contextUrl) {
            this.contextUrl = contextUrl;
        },

        convertFormToJSON: function(formId) {
            const array = $('#' + formId).serializeArray();
            let json = {};

            $.each(array, function() {
                json[this.name] = this.value || '';
            });

            return json;
        },

    };

})(jQuery);