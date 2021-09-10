const header = document.querySelector('.page-header');

const addScrolledClass = () => {
  if (!header) {
    return;
  }

  if (window.pageYOffset >= 1) {
    header.classList.add('page-header--scrolled');
  } else {
    header.classList.remove('page-header--scrolled');
  }
};

const headerScroll = () => {
  window.addEventListener('scroll', addScrolledClass);
  window.addEventListener('load', addScrolledClass);

  addScrolledClass();
};

export {headerScroll};
