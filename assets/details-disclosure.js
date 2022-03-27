class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');

    this.mainDetailsToggle.addEventListener(
        'mouseenter',
        this.open.bind(this)
    );
    this.mainDetailsToggle.addEventListener(
        'mouseleave',
        this.closeMouseOut.bind(this)
    );

    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  open(event) {
    if(!event.target.closest('details').hasAttribute('open')) {
      this.mainDetailsToggle.setAttribute('open', true);
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', true);
    }
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach(animation => animation.play());
    } else {
      this.animations.forEach(animation => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }

  closeMouseOut(event) {
    if (event.target.closest('details').hasAttribute('open')) {
      event.target.closest('details').removeAttribute('open');
      event.target.closest('details').querySelector('summary').setAttribute('aria-expanded', false);
    }
  }
}

customElements.define('details-disclosure', DetailsDisclosure);
