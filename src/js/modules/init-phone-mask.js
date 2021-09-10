import IMask from 'imask/esm/imask';
import 'imask/esm/masked/pattern/';

const phoneInputs = document.querySelectorAll('.field-text input[type="tel"]');

const initPhoneMask = () => {
  phoneInputs.forEach((phoneInput) => {
    let mask = new IMask(phoneInput, {
      mask: '+{7}(000)000-00-00',
      lazy: false,
    });

    phoneInput.addEventListener('change', () => {
      return mask.updateValue();
    });

    phoneInput.closest('form').addEventListener('reset', () => {
      setTimeout(() => {
        mask.updateValue();
      }, 300);
    });
  });
};

export {initPhoneMask};
