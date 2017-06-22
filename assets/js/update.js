/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a homebuilder
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an homebuilder contact is selected the form fields should be enabled
      and populated with the data for the selected contact
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

(function() {

  $(function() {

    //declaring the variables for retrieving the data and repopulating on UI
    var builder_id = $("#builder_id");
    var company_name = $("#company_name");
    var first_name = $("#contact_first_name");
    var last_name = $("#contact_last_name");
    var phone_number = $("contact_phone_number");
    var email = $("#email_address");
    var zipcode = $("#zip_code");


    //code goes here
    //this is to envoke bootstrap dropdown
    $("#builderId").selectpicker({
      style: 'btn-info',
      size: 4
    });

    //this is to disable the form fields before selecting the builder contact name to update
    $("#updateBuilderForm :input").prop("disabled", true);

    //this is to enable the form fields after selecting the contact name to update
    $("#builderId").on("changed.bs.select", function() {
      $("#updateBuilderForm :input").prop("disabled", false);
    });


    //function that upon a change will identify the correct ID (builder_id from database) that is selected
    $("#builderId").change(function() {
      var idClick = $(this).val(); //it is going to store the builder_id value in idClick variable for the name selected
      console.log(idClick);

      //retrieving the data to populate the form
      var url = ("http://localhost:1337/builder" + "/" + idClick); //appending the builder_id value(idClick) into api

      $.get(url, function(data) { // retrieving data from api
        builder_id.val(data.builder_id);
        company_name.val(data.company_name);
        first_name.val(data.contact_first_name);
        last_name.val(data.contact_last_name);
        phone_number.val(data.phone_number);
        email.val(data.email_address);
        zipcode.val(data.zip_code);
      });
    });

    errorClass: "text-danger",//this is to display any error messages in red color

      $("#updateBuilderForm").validate({ //jvalidation rules for fields on UI form
        rules: {
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
        messages: { //validation warning messages that display on UI
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
            minlength: "min length is 5",
            maxlength: "max length is 5"
          }
        },
      });
      //this is to get a confirmation before updating
      $("#updateBuilderForm").submit(function(){
           return confirm("Are you sure to update?");
        });
  })

})();
