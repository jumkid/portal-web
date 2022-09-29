(function($) {
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

        getApiUrl: function(api, params, noPrefix) {
            const regEx = /{[-_\w]+}/g;
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

        convertFormToJSON: function(formId) {
            const array = $('#' + formId).serializeArray();
            let json = {};

            $.each(array, function() {
                json[this.name] = this.value || '';
            });

            return json;
        },

        doPost: function(url, jsonData, successCallback, failCallback) {
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(jsonData),
                success: function(data, status, xhr) {
                    successCallback(data, status);

                    $.JK.checkoutProgress();
                    return this;
                },
                error: function(xhr, status, error){
                    failCallback(xhr.responseJSON, status);

                    $.JK.checkoutProgress();
                    return this;
                }
            });
        }

    };

})(jQuery);