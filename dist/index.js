import { AnalogClock } from ".\analogclock";
import { AnalogClockEditor } from ".\analogclockeditor";

customElements.define(
    "analogclock",
    AnalogClock
);
customElements.define(
    "analogclockeditor",
    AnalogClockEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "analogclock",
    name: "AnalogClock",
    description: "An analog clock card for Home Assistant Lovelace",
});