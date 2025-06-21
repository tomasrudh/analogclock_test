// A version of the same custom card that shows up in the card picker dialog and also has a graphical editor
// This also used Lit because it's easy, but everything can be done without that too.

import { html, LitElement } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

// First we need to make some changes to the custom card class
class MyCustomCard4 extends LitElement {
  static getConfigElement() {
    // Create and return an editor element
    return document.createElement("my-custom-card-editor");
  }

  static getStubConfig() {
    // Return a minimal configuration that will result in a working card configuration
    return { entity: "" };
  }

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
}

customElements.define("my-custom-card4", MyCustomCard4);

// Next we add our card to the list of custom cards for the card picker
window.customCards = window.customCards || []; // Create the list if it doesn't exist. Careful not to overwrite it
window.customCards.push({
  type: "my-custom-card4",
  name: "My Custom Card",
  description: "A cool custom card",
});

// Finally we create and register the editor itself
class MyCustomCardEditor extends LitElement {

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  // setConfig works the same way as for the card itself
  setConfig(config) {
    this._config = config;
  }

  // This function is called when the input element of the editor loses focus
  entityChanged(ev) {

    // We make a copy of the current config so we don't accidentally overwrite anything too early
    const _config = Object.assign({}, this._config);
    // Then we update the entity value with what we just got from the input field
    _config.entity = ev.target.value;
    // And finally write back the updated configuration all at once
    this._config = _config;

    // A config-changed event will tell lovelace we have made changed to the configuration
    // this make sure the changes are saved correctly later and will update the preview
    const event = new CustomEvent("config-changed", {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    // @focusout below will call entityChanged when the input field loses focus (e.g. the user tabs away or clicks outside of it)
    return html`
    Entity:
    <input
    .value=${this._config.entity}
    @focusout=${this.entityChanged}
    ></input>
    `;
  }
}

customElements.define("my-custom-card-editor", MyCustomCardEditor);