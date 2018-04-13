/* global $, Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set stripe public key
  Stripe.setPublishablekey( $('meta[name="stripe-key"]').attr('content') );
  
  //when user clicks "form submit button" 
  //will prevent form from submitting to server
  submitBtn.click(function(event){
    event.preventDefault();
  
  //collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
    
  //send card info to Stripe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month: expMonth,
    exp_year: expYear
  },stripeResponseHandler);
  
});
 
    //Stripe returns card token

  //inject card token as hidden fields.
  //Submit to Rails app
  
      
});