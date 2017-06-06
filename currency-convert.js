const axios = require('axios');

const getExchangeRate = async (from, to) => {
  let { data } = await axios.get(`http://api.fixer.io/latest?base=${from}`);
  return data.rates[to];
};

const getCountries = async (currencyCode) => {
  let { data } = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  return data.map(country => country.name);
};

const convertCurrency = async (from, to, amount) => {
  let countries = await getCountries(to);
  let exchangeRate = await getExchangeRate(from, to);
  let exchangedAmount = amount * exchangeRate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

// getExchangeRate('USD', 'CAD')
//   .then(rate => console.log(rate));
//
// getCountries('CAD')
//   .then(countries => console.log(countries));

convertCurrency('CAD', 'USD', 100).then(status => {
  console.log(status)
});
