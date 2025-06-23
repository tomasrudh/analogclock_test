import {
  html, LitElement,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

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
        { name: "locale", selector: { text: null } },
        { name: "timezone", selector: { text: null } },
        { name: "show_timezone", selector: { boolean: null } },
        { name: "timezonedisplayname", selector: { text: null } },
        { name: "diameter", selector: { number: { min: 0, max: 1000 } } },
        { name: "hide_weeknumber", selector: { boolean: null } },
        { name: "color_background", selector: { text: null } },
        { name: "hide_secondhand", selector: { boolean: null } },
        { name: "hide_weekday", selector: { boolean: null } },
        { name: "hide_date", selector: { boolean: null } },
        { name: "hide_facedigits", selector: { boolean: null } },
        { name: "hide_digitaltime", selector: { boolean: null } },
        { name: "color_ticks", selector: { text: null } },
        { name: "hide_minorticks", selector: { boolean: null } },
        { name: "hide_majorticks", selector: { boolean: null } },
        { name: "color_facedigits", selector: { text: null } },
        { name: "color_digitaltime", selector: { text: null } },
        { name: "color_hourhand", selector: { text: null } },
        { name: "color_minutehand", selector: { text: null } },
        { name: "color_secondhand", selector: { text: null } },
        { name: "color_text", selector: { text: null } },
        { name: "style_hourhand", selector: { number: { min: 1, max: 6 } } },
        { name: "style_minutehand", selector: { number: { min: 1, max: 6 } } },
        { name: "style_secondhand", selector: { number: { min: 1, max: 6 } } },
        { name: "dateformat", selector: { text: null } },
        { name: "timeformat", selector: { text: null } }
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