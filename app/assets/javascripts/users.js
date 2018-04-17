/* global $, Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set stripe public key
  Stripe.setPublishablekey( $('meta[name="stripe-key"]').attr('content') );
  
  //when user clicks "form submit button" 
  submitBtn.click(function(event){
    //will prevent form from submitting to server
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
  
  //collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
    
    //Use Stripe JS Library to check for card errors
    
    var error = false;
    
    //Validate card number
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('This credit card appears invalid');
    }
    
    //Validate CVC
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('This CVC appears invalid');
    }
    
      //Validate expiration date
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('This expiration date appears invalid');
    }
    
    if (error) {
      //If there are card errors, don't send to Stripe
    submitBtn.prop('disabled', false).val("Sign Up");
    } else {
       //send card info to Stripe
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
        },stripeResponseHandler);
    }
      
  return false;
  
});
 
    //Stripe returns card token
  function stripeResponseHandler(status, response) {
    var token = response.id;
  }

  //inject card token as hidden fields.
  theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );

  //Submit to Rails app
  theForm.get(0).submit();
  
      
});