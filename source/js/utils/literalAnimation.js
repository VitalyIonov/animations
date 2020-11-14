import { isEven } from '../constants/number';

export default class BuildLiteralAnimation {
  constructor(selector, animationParams) {
    this._elementSelector = selector;
    this._elements = document.querySelectorAll(this._elementSelector);
    this._animationParams = animationParams;

    this.prepareElements();
  }

  prepareElements() {
    if (!this._elements) {
      return null;
    }

    this._elements.forEach((element, index) => this.prepareText(element, index))
  }

  prepareText(element, elementIndex) {
    if (!element) {
      return null;
    }

    if (element.classList.contains('literal-animated--prepared')) {
      return element;
    }

    const text = element.textContent.trim().split(' ').filter((latter) => latter !== '');

    const context = text.reduce((fragmentParent, word, wordIndex) => {
      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add('literal-animated__word')

      wordContainer.appendChild(this.prepareWord(word, elementIndex, wordIndex));

      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment())

    element.innerHTML = '';
    element.appendChild(context);
    element.classList.add('literal-animated--prepared');
  }

  prepareWord(word, elementIndex, wordIndex) {
    return word.split('').reduce((fragmentParent, letter, letterIndex) => {
      const letterContainer = document.createElement(`span`);

      this.addLetterAnimation(letterContainer, elementIndex, wordIndex, letterIndex);

      letterContainer.textContent = letter;

      fragmentParent.appendChild(letterContainer);

      return fragmentParent;
    }, document.createDocumentFragment());
  }

  addLetterAnimation(container, elementIndex, wordIndex, letterIndex) {
    const { duration, name } = this._animationParams;

    container.style.animationName = name;
    container.style.animationDuration = duration;
    container.style.animationFillMode = 'both';
    container.style.animationDelay = this.getAnimationDelay(elementIndex, wordIndex, letterIndex);
  }

  getAnimationDelay(elementIndex, wordIndex, letterIndex) {
    const { delayPatternEven, literalDelayPatternOdd } = this._animationParams;

    const isEvenWord = isEven(wordIndex + 1);

    const pattern = isEvenWord ? delayPatternEven : literalDelayPatternOdd;
    const patternLength = pattern.length;
    const preparedLetterIndex = (letterIndex + 1) % patternLength;

    return `${elementIndex * 1200 + wordIndex * 200 + pattern[preparedLetterIndex]}ms`;
  }
}