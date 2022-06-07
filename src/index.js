import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './exchange-rate-service';

$(document).ready(function() {
  $('#conversion-form').submit(function(event) {
    event.preventDefault();

    let usd = parseInt($('#dollar-amount').val());
    let requestedCurrency = $('input[name="currency"]:checked').val();
    let promise = ExchangeRateService.getRate();
    // console.log(usd);
    
    promise.then(function(response) {
      const body = JSON.parse(response);
      // console.log(body.conversion_rates.requestedCurrency);
      // console.log(usd * body.conversion_rates.requestedCurrency);
      const convertedValue = usd * parseInt(body.conversion_rates.requestedCurrency);
      if (requestedCurrency === "SIM") {
        $('.showValue').text("Simoleon conversions are unfortunately not available on this page. We apologize for the inconvenience."); 
      } else {
        $('.showValue').text(`${usd} USD in ${requestedCurrency} is ${convertedValue}`);
      }
    }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
      });
  });
});