(function ($) {


    $('#form-data').submit(function (e) {
        var data = $(this).serializeArray();
        var type = $(this).data('type');
        console.log(type);
        console.log(data);
        console.log(data[0].value);

        var isFormValid = validateForm(type, data)
        return false;

        if (isFormValid) {
            console.log("Form is valid");
        } else {
            console.log("form isnt valid");
        }

        return false;


        e.preventDefault();
        return false;

        // Send data to server
        $.post($(this).data('url'), data).done(function (res) {
            // Convert data array to an object, with repeated keys as property value array (e.g., multiple selects)
            //Added updated functionality to handle more than one case 

        }).fail(function (res, textStatus, errThrown) {
            if (res && res.status !== 404) {
                Object.keys(res.responseJSON).forEach(function (key) {
                    var errObj = res.responseJSON;
                    var errorEl = $("#" + key + "-error");
                    errorEl.text(errObj[key]);
                    errorEl.css('color', 'red');
                });
            }
        });

        return false;
    });


    //--------Functions-----

    function validateForm(type, data) {

        switch (type) {
            case "log-in":
                console.log("log-in");
                if (validateEmail(data[0].value)) {
                    console.log("Valid");
                    $('#email-validation').hide();
                } else {
                    $('#email-validation').show();
                    console.log("Invalid");
                    return false;
                }
                break;
            case "sign-up":
                console.log("sign-up");

                if (validateEmail(data[0].value)) {
                    console.log("Valid");
                    $('#email-validation').hide();
                } else {
                    $('#email-validation').show();
                    console.log("Invalid");
                    return false;
                }

                if (data[1].value != "" && data[1].value == data[2].value) {
                    if (!checkPassword(data[1].value)) {
                        alert("The password you have entered is not valid!");
                        data[1].value.focus();
                        e.preventDefault();
                        return false;
                    }
                } else {
                    alert("Error: Please check that you've entered and confirmed your password!");
                    data[1].value.focus();
                    e.preventDefault();
                    return false;
                }
                console.log("Both username and password are VALID!");


                if (supports_input_validity()) {

                    var pwd1Input = document.getElementById("field_pwd1");
                    pwd1Input.setCustomValidity(pwd1Input.title);

                    var pwd2Input = document.getElementById("field_pwd2");

                    // input key handlers

                    pwd1Input.addEventListener("keyup", function (e) {
                        this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
                        if (this.checkValidity()) {
                            pwd2Input.pattern = RegExp.escape(this.value);
                            pwd2Input.setCustomValidity(pwd2Input.title);
                        } else {
                            pwd2Input.pattern = this.pattern;
                            pwd2Input.setCustomValidity("");
                        }
                    }, false);

                    pwd2Input.addEventListener("keyup", function (e) {
                        this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
                    }, false);


                }
                return true;
                break;
            case "create-bug-report":
                console.log("create-bug-report");
                return false;
                break;
            case "add-employee":
                console.log("add-employee");
                var firstName = data[0].value;
                var lastName = data[1].value;
                var regName = /^[a-zA-Z\s]+$/;
                var fname_span = document.getElementById("first-name-span");
                var lname_span = document.getElementById("last-name-span");
                if (!regName.test(firstName)) {
                    //alert('Invalid name given.');
                    fname_span.style.display = '';
                    return false;
                } else {
                    //alert('Valid name given.');
                    fname_span.style.display = 'none';

                }

                if (!regName.test(lastName)) {
                    lname_span.style.display = '';
                    return false;
                } else {
                    lname_span.style.display = 'none';
                }

                return true;
                break;
            case "add-program":
                console.log("add-program");
                return false;
                break;
        }

    }

    function supports_input_validity() {
        var i = document.createElement("input");
        return "setCustomValidity" in i;
    }

    function checkPassword(str) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return re.test(str);
    };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }




})(jQuery);