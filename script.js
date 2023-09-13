const myKey = '234e80b26ac7f1befcf468eb';

let currencies;

const getAppropriateFormatOfDate = (value) => {
  const date = new Date();
  switch (value) {
    case 'month':
      return ("0" + (date.getMonth() + 1)).slice(-2);
    case 'day':
      return ("0" + (date.getDate() + 1)).slice(-2);
  }
};

const getFullDate = () => {
  const date = new Date();
  const dateInAppropriateFormat = `${getAppropriateFormatOfDate('day')}-${getAppropriateFormatOfDate('month')}-${date.getFullYear()} ${date.toLocaleTimeString()} GMT+03:00`;

  return dateInAppropriateFormat;
};

const dateArea = document.getElementById('date');

dateArea.textContent = getFullDate();

const getCurrenciesFromApi = (obj) => {
  return Object.keys(obj.conversion_rates);
};

const createOptionForEachCurrency = () => {
  const gettingCurrency = document.getElementById('gettingCurrency');
  const transferCurrency = document.getElementById('transferCurrency');

  for (let currency of currencies) {
    const option = document.createElement('option');
    option.textContent = currency;
    option.setAttribute('value', currency);

    const option2 = option.cloneNode(true);

    if (currency === 'RUB') {
      option2.selected = 'selected';
    }

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
  const errorFieldWrappers = document.querySelector('.validationError');

  input.addEventListener('input', (event) => {
    let value = event.target.value;
    let lastElement = value[value.length - 1];
    if (isNaN(+lastElement)) {
      errorFieldWrappers.classList.add('activeValidationError');
    }
    if (lastElement == undefined || !isNaN(+value)) {
      errorFieldWrappers.classList.remove('activeValidationError');
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
    let choosenTransferCurrency = 'RUB';

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

    const transferButton = document.getElementById('convertButton');
    transferButton.addEventListener('click', async (event) => {
      const gettingCurrencyValue = gettingCurrencyField.value;

      const data = await fetch(
        `https://v6.exchangerate-api.com/v6/${myKey}/latest/${choosenGettingCurrency}`
      );
      const result = await data.json();

      const receivedCurrency = +result.conversion_rates[choosenTransferCurrency] * +gettingCurrencyValue;

      if (isNaN(+receivedCurrency)) {
        console.error('Field value is not a number')
      } else {
        transferCurrencyField.value = receivedCurrency;
      }

      dateArea.textContent = getFullDate();
    });
  } catch (err) {
    console.error(err);
  }
})();
