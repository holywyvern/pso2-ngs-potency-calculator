import { CLASSES } from "../data/classes";
import { Window } from "../design/Window";
import { HpAddOn } from "./HpAddOn";
import { PpAddOn } from "./PpAddOn";

export function AddOnsWindow() {
  return (
    <Window>
      <Window.Header>Add-On Setup</Window.Header>
      <Window.Body className="add-ons">
        {CLASSES.map((_, index) => (
          <HpAddOn key={index} index={index} />
        ))}
        <div />
        <div />
        <PpAddOn />
      </Window.Body>
    </Window>
  );
}
