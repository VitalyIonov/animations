export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    body.classList.add('document-loaded');
  });
}