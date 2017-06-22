/**
 * Use the jQuery Validate plugin to add validation to the form
 *
 * Here's what this you will need to do:
 *
 * 1. Include the following jQuery Validate JavaScript in layout.ejs
 *    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
 *
 * 2. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 4 characters
 *    Last Name  - required, at least 4 characters
 *	  ADD any other validation that makes you happy
 *
 * 3. Use a custom message for one validation
 *
 * 4. Make the color of the error text red
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 *
 */

//This is the function to add the jquery validation on the builder form while creating a record from UI

(function() {

  $(function() {

    //code goes here
    errorClass: "text-danger",
    $("#addBuilderForm").validate({
      rules: {// definition of validation rules
        company_name: {
          required: true,
          minlength: 4
        },
        contact_first_name: {
          required: true,
            minlength: 4
        },
        contact_last_name: {  
          required: true,
          minlength: 4
        },
        email_address: {
          email: true
        },
        zip_code: {
          digits: true,
          minlength: 5,
          maxlength: 5
        }
      },
      messages: {//validation warning messages that display on UI
        company_name: {
          required: "company name is required",
          minLength: "Atleast 4 letters are required"
        },
        contact_first_name: {
          required: "first name  is required",
          lettersonly: "Atleast 4 letters are required"
        },
        contact_last_name: {
          required: "last name  is required",
          lettersonly: "Atleast 4 letters are required"
        },
        email_address: {
           email: "valid format only accepts"
         },
        zip_code: {
          digits: "it accepts numbers only",
          minlength:"min length is 5",
          maxlength: "max length is 5"
        }
      },
    });

  })

})();
