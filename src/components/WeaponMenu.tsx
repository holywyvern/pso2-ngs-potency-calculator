import { Button } from "../design/Button";
import { ArmorMenu } from "./ArmorMenu";

export function WeaponMenu({ index }: { index: number }) {
  return (
    <>
      <ArmorMenu index={index} />
      <Button disabled>
        Ex Combos...
      </Button>
    </>
  );
}