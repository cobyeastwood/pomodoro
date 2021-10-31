import { LitElement, css, html } from "lit";

export class TimeElement extends LitElement {
    constructor() {
        super()
        this.wasClicked = false
    }

    render() {
        return html`<span><p @click="${this._clickHandler}">is clicked: ${this.wasClicked}</p></span>`
    }

    _clickHandler(e) {
        this.wasClicked = !this.wasClicked;
    }
}

TimeElement.properties = {
    wasClicked: {}
}

customElements.define('time-element', TimeElement)