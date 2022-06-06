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
    promise.then(function(response) {
      const body = JSON.parse(response);
      const convertedValue = usd * parseInt(body.conversion_rates.requestedCurrency);
      $('.showValue').text(`${usd} USD in ${requestedCurrency} is ${convertedValue}`);
    }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});