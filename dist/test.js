// A version of the same custom card which uses Lit (https://lit.dev) like the core lovelace cards do.

// Lit is imported from a CDN here, but it can also be bundled with your card with webpack or rollup or the like
import { html, LitElement } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class MyCustomCard3 extends LitElement {
  
  // This will make parts of the card rerender when this.hass or this._config is changed.
  // this.hass is updated by Home Assistant whenever anything happens in your system.
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }

  // The render() function of a LitElement returns the HTML of your card, and any time one or the
  // properties defined above are updated, the correct parts of the rendered html are magically
  // replaced with the new values.  Check https://lit.dev for more info.
  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html` <ha-card>Unknown entity: ${this._config.entity}</ha-card> `;
    }

    // @click below is also LitElement magic
    return html`
      <ha-card>
        <div>${stateObj.attributes.friendly_name || stateObj.entity_id}</div>
        <button @click=${this.buttonClicked}>
          Turn ${stateObj.state === "on" ? "off" : "on"}
        </button>
      </ha-card>
    `;
  }

  buttonClicked() {
    const stateObj = this.hass.states[this._config.entity];
    const service = stateObj.state === "on" ? "turn_off" : "turn_on";

    this.hass.callService("light", service, { entity_id: this._config.entity });
  }
}

customElements.define("my-custom-card3", MyCustomCard3);