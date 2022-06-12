import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './exchange-rate-service.js';

$(document).ready(function() {
  $('#conversion-form').submit(function(event) {
    event.preventDefault();

    let usd = $('#dollar-amount').val();
    let requestedCurrency = $("input[name='currency']:checked").val();
    let promise = ExchangeRateService.getRate();
    
    promise.then(function(response) {
      const body = JSON.parse(response);
      const convertedValue = usd * body.conversion_rates[requestedCurrency];
  
      if (body.conversion_rates[requestedCurrency] === undefined) {
        $('.showValue').text(`${requestedCurrency} is not a valid currency. Please try again.`); 
      } else {
        $('.showValue').text(`${usd} USD in ${requestedCurrency} is ${convertedValue}`);
      }
    }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
      });
  });
});