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
  const options = Array.from(
    document.querySelectorAll(`#${selectedId} option`)
  );
  return options.find((elem) => elem.selected === true).textContent;
};

const fieldValidation = (input) => {
  const errorFieldWrappers = Array.from(
    document.querySelectorAll('.validationError')
  );
  input.addEventListener('input', (event) => {
    let value = event.target.value;
    let lastElement = value[value.length - 1];
    console.log(+lastElement);
    if (isNaN(+lastElement)) {
      errorFieldWrappers.forEach((elem) => {
        elem.classList.add('activeValidationError');
      });
    }
  });
};

(async () => {
  try {
    const data = await fetch(
      `https://v6.exchangerate-api.com/v6/${myKey}/latest/USD`
    );

    // if (!data) {
    //   throw new Error('lalala');
    // }
    const result = await data.json();

    currencies = getCurrenciesFromApi(result);
    createOptionForEachCurrency(currencies);

    let choosenGettingCurrency = 'USD';
    let choosenTransferCurrency = 'USD';

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

    const gettingCurrencyField = document.getElementById(
      'gettingCurrencyField'
    );
    const transferCurrencyField = document.getElementById(
      'transferCurrencyField'
    );

    fieldValidation(gettingCurrencyField);

    const transferButton = document.getElementsByTagName('button')[0];
    transferButton.addEventListener('click', async (event) => {
      const gettingCurrencyValue = gettingCurrencyField.value;

      const data = await fetch(
        `https://v6.exchangerate-api.com/v6/${myKey}/latest/${choosenGettingCurrency}`
      );
      const result = await data.json();

      const a = result.conversion_rates[choosenTransferCurrency];

      console.log(new Date());
    });
  } catch (err) {
    console.error(err);
  }
})();
