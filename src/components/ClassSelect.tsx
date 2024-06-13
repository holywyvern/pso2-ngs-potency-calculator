import Select, { components } from "react-select";

import { useEquipment } from "../contexts/EquipmentContext";
import { CLASSES } from "../data/classes";

const CLASS_OPTIONS = CLASSES.map(({ name }, value) => ({
  label: name,
  icon: `${name.toLocaleLowerCase()}.png`,
  value,
}));

const { SingleValue, Option } = components;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} />
      {props.data.label}
    </Option>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconValue = (props: any) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} />
      {props.data.label}
    </SingleValue>
  );
};

export function ClassSelect() {
  const equipment = useEquipment();
  return (
    <Select
      className="select"
      classNamePrefix="ngs-select"
      options={CLASS_OPTIONS}
      value={CLASS_OPTIONS[equipment.classId]}
      onChange={(value) => {
        equipment.classId = value?.value || 0;
      }}
      components={{ Option: IconOption, SingleValue: IconValue }}
    />
  );
}
