export class AnalogClockEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }

_valueChanged(ev) {
  // We make a copy of the current config so we don't accidentally overwrite anything too early
  var _config = Object.assign({}, this._config);
  _config = ev.detail.value;

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
  // console.info('render()');
  return html`
      <ha-form
      .hass=${this._hass}
      .data=${this._config}
      .schema=${[
      { name: "locale", selector: {} },
      // { name: "timezone", selector: { text: {} }},
      { name: "show_timezone", selector: { boolean: null }},
      // { name: "timezonedisplayname", selector: { text: {} }},
      { name: "diameter", selector: { number: { min: 0, max: 1000 } }},
      { name: "hide_weeknumber", selector: { boolean: null }}
    ]}
      .computeLabel=${this._computeLabel}
      @value-changed=${this._valueChanged} 
      @focusout=${this.valueChanged}
      ></ha-form>
    `;
}
}

customElements.define("analog-clock-editor", AnalogClockEditor);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "analog-clock",
  name: "AnalogClock",
  preview: true, // Optional - defaults to false
  description: "An analog clock card", // Optional
  documentationURL:
    "https://github.com/tomasrudh/analogclock_test",
});