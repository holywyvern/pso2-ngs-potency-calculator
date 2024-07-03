import { useState } from "react";
import { Button } from "../design/Button";
import { Modal } from "../design/Modal";
import { Window } from "../design/Window";
import { useEquipment } from "../contexts/EquipmentContext";
import { findAugments } from "../utils/augments";

interface ExCombo {
  name: string;
  augments: string[];
  description: string;
}

const BIS_AUGMENTS = [
  "Anaddi Deft Parfait",
  "Lux Halphinale",
  "Glan Gigas Maste",
  "Gran Gladia Soul",
];
const BUDGET_AUGMENTS = [
  "Mega Triyal",
  "Wardro Triyal",
  "Halphinale LC",
  "Gladia Soul LC",
];

const EX_COMBOS: ExCombo[] = [
  {
    name: "Burning Hyper offensive combo",
    description:
      "Provides increased damage, PP regeneration and fast Photon blast charge in exchange of continuous burning. For advance players.",
    augments: [
      "EX Shortage PP Burn Up P",
      "EX Hysterical Strength P",
      "EX Endure Pain PB Boost P",
    ],
  },
  {
    name: "Burning Extra damage combo",
    description:
      "Provides the highest damage output as long as you stay on low HP.",
    augments: [
      "EX Shortage PP Burn Up P",
      "EX Hysterical Strength P",
      "EX Shortage HP Starling P",
    ],
  },
  {
    name: "Range Fast PB Combo",
    description:
      "Good PP and Photon blast generation for classes using Long Range Advantage.",
    augments: [
      "EX Risky Stance P",
      "EX Endure Pain PB Boost P",
      "EX Stealth Wall P",
    ],
  },
  {
    name: "Long Range Advantage User",
    description:
      "Used for people as an alternative to Stealth Strike from Ranger",
    augments: [
      "EX Dazzle Camouflage P",
      "EX Stealth Wall P",
      "EX Gradual Pressing P",
    ],
  },
  {
    name: "Down Accumulation",
    description:
      "Good PP and Down acummulation. Good build for Techters and Bouncers.",
    augments: [
      "EX Gradual PP Gauge P",
      "EX Gradual Pressing P",
      "EX Tri-Shield P",
    ],
  },
  {
    name: "PSE Farming",
    description:
      "A setup for PSE farming without the need of using Force as a subclass.",
    augments: [
      "EX Light Attack Protect P",
      "EX Gradual PP Gauge P",
      "EX Enemy Field PP Gauge P",
    ],
  },
  {
    name: "Boss Tanking",
    description: "For Bossing using a defensive approach.",
    augments: [
      "EX Heavy Attack Protect P",
      "EX Gradual Pressing P",
      "EX Tri-Shield P",
    ],
  },
  {
    name: "Increased Damage on Max HP",
    description: "High Damage output on high HP.",
    augments: [
      "EX Lively HP Starlings P",
      "EX Gradual Pressing P",
      "EX Tri-Shield P",
    ],
  },
];

export function WeaponMenu({ index }: { index: number }) {
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(false);
  const { equipment } = useEquipment();
  const item = equipment[index];

  const selectAugments = (ex: ExCombo) => {
    const commons = budget ? BUDGET_AUGMENTS : BIS_AUGMENTS;
    const list = [...ex.augments, ...commons];
    item.augmentIds = findAugments(list);
    setOpen(false);
  };
  return (
    <>
      <Modal open={open}>
        <Window>
          <Window.Header>Select an Ex Combo</Window.Header>
          <Window.Body>
            <p className="max-width">
              These are some EX Recommendations tested by experienced players.
              <br />
              <strong>
                The EX Augments are flexible enough for you to pick the ones you
                like.
              </strong>
              <br />
              Experiement and <strong>use the ones you like</strong> instead.
            </p>
            <div className="flex vertical list">
              {EX_COMBOS.map((ex) => (
                <Button key={ex.name} onClick={() => selectAugments(ex)}>
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                </Button>
              ))}
            </div>
            <hr />
            <div className="flex end">
              <label>
                <input
                  type="checkbox"
                  checked={budget}
                  onChange={(e) => setBudget(e.target.checked)}
                />
                Use budget augments?
              </label>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </Window.Body>
        </Window>
      </Modal>
      <Button onClick={() => setOpen(true)}>Ex Combos...</Button>
    </>
  );
}
