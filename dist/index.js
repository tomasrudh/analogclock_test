import { AnalogClock } from "./analogclock";
import { AnalogClockEditor } from ".\analogclockeditor";

customElements.define(
    "AnalogClock",
    AnalogClock
);
customElements.define(
    "AnalogClockEditor",
    AnalogClockEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "AnalogClock",
    name: "AnalogClock",
    description: "An analog clock card for Home Assistant Lovelace",
});
