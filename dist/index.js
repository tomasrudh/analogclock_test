import { AnalogClock } from ".\analogclock";
import { ToggleCardLitEditor } from "./editor";

customElements.define(
    "analogclock",
    AnalogClock
);
customElements.define(
    "togglecardliteditor",
    ToggleCardLitEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "analogclock",
    name: "AnalogClock",
    description: "An analog clock card for Home Assistant Lovelace",
});