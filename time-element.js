import { LitElement, css, html } from 'lit';
import { templateContent } from 'lit/directives/template-content.js';

const template = document.querySelector('template#custom');

function pad(pad, val) {
  return pad ? String(val).padStart(2, '0') : val;
}

export class TimeElement extends LitElement {
  static styles = css`
    div {
      margin: 20px;
      text-align: center;
    }

    h4 {
      color: #112d32;
      font-size: 100px;
    }

    button {
      margin: 4px;
      padding: 4px;
      border-radius: 1px;
      border-color: #112d32;
      background-color: #fff;
      color: #112d32;
      font-size: 16px;
    }

    audio {
      height: 0px;
      width: 0px;
    }
  `;

  constructor() {
    super();
    this.duration = 60;
    this.end = null;
    this.remaining = 0;
  }

  render() {
    const { remaining, running } = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));
    return html`<div>
      <h4>${min ? `${min}:${sec}` : `${sec}.${hun}`}</h4>
      ${remaining === 0
        ? ''
        : running
        ? html`<button @click=${this.pause}>Pause</button>`
        : html`<button @click=${this.start}>Start</button>`}
      <button @click="${this.reset}">Reset</button>
      ${templateContent(template)}
    </div>`;
  }

  get running() {
    return this.end && this.remaining;
  }

  get audio() {
    return this.renderRoot?.querySelector('#audio') ?? null;
  }

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, this.end - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }
}

TimeElement.properties = {
  duration: {},
  end: { state: true },
  remaining: { state: true },
};

customElements.define('time-element', TimeElement);
