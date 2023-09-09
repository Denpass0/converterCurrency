const myKey = '7af53d206961f945ba2cf8d0';

let currencies;

const getCurrenciesFromApi = (obj) => {
  return Object.keys(obj.conversion_rates);
};

const createOptionForEachCurrency = () => {
  const gettingCurrency = document.getElementById('gettingCurrency');
  const transferCurrency = document.getElementById('transferCurrency');

  for (let currency of currencies) {
    let option = document.createElement('option');
    option.textContent = currency;
    option.setAttribute('value', currency);

    let option2 = option.cloneNode(true);

    gettingCurrency.append(option);
    transferCurrency.append(option2);
  }
};

const getSelectedOption = (selectedId) => {
  const options = Array.from(document.querySelectorAll(`#${selectedId} option`));
  return options.find((elem) => elem.selected === true).textContent; 
};

(async () => {
  await fetch(`https://v6.exchangerate-api.com/v6/${myKey}/latest/USD`)
  .then((data) => data.json())
  .then((result) => {
    currencies = getCurrenciesFromApi(result);
    createOptionForEachCurrency(currencies);
  });
  let choosenGettingCurrency;
  let choosenTransferCurrency;
  const gettingCurrency = document.getElementById('gettingCurrency');
  const transferCurrency = document.getElementById('transferCurrency');
  gettingCurrency.addEventListener('change', () => {
    choosenGettingCurrency = getSelectedOption('gettingCurrency');
    return getSelectedOption('gettingCurrency');
  });
  transferCurrency.addEventListener('change', () => {
    choosenTransferCurrency = getSelectedOption('transferCurrency');
    return getSelectedOption('transferCurrency');
  });
  gettingCurrency.addEventListener('click', () => console.log(choosenGettingCurrency));
  
  const gettingCurrencyField = document.getElementById('gettingCurrencyField');
  const transferCurrencyField = document.getElementById('transferCurrencyField');
  gettingCurrencyField.addEventListener('input', (event) => {
    // console.log(event.target);
    event.target.value = '1';
  });
  console.log(gettingCurrencyField);

  const gettingCurrencyFieldValue = gettingCurrencyField.textContent ;

  const transferButton = document.getElementsByTagName('button')[0];
  transferButton.addEventListener('click', () => {
    console.log(gettingCurrencyFieldValue);
  })
})();
