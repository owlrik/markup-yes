const forms = document.querySelectorAll('.form');

const PHONE_PLACEHOLDER = '+7(___)___-__-__';

const showError = (sth) => {
  const input = sth.target || sth;
  const errorMessage = input.closest('.field-text').querySelector('.field-text__error-message');

  if (!errorMessage.classList.contains('field-text__error-message--shown')) {
    errorMessage.classList.add('field-text__error-message--shown');
    errorMessage.style.maxHeight = errorMessage.scrollHeight + 'px';
  }
};

const hideError = (sth) => {
  const input = sth.target || sth;
  const errorMessage = input.closest('.field-text').querySelector('.field-text__error-message');

  if (errorMessage.classList.contains('field-text__error-message--shown')) {
    errorMessage.classList.remove('field-text__error-message--shown');
    errorMessage.style.maxHeight = '0';
  }
};

const makeInputInvalid = (input) => {
  input.classList.add('field-text__input--invalid');
  showError(input);

  input.addEventListener('focus', showError);
  input.addEventListener('input', validatePhone);
};

const makeInputValid = (input) => {
  input.classList.remove('field-text__input--invalid');
  hideError(input);

  input.removeEventListener('focus', showError);
  input.removeEventListener('input', validatePhone);
};

const validatePhone = (sth) => {
  const input = sth.target || sth;
  let isValidate = true;

  if (input.value.includes('_')) {
    isValidate = false;
  }

  return isValidate;
};

const clearForm = (form) => {
  form.reset();
};

const initForm = () => {
  if (!forms) {
    return;
  }

  forms.forEach((form) => {
    const phoneInput = form.querySelector('input[type="tel"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (validatePhone(phoneInput)) {
        makeInputValid(phoneInput);
        clearForm(form);
        phoneInput.value = PHONE_PLACEHOLDER;
      } else {
        makeInputInvalid(phoneInput);
      }
    });
  });
};

export {initForm};
