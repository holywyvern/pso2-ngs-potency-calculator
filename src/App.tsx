import {
  EquipmentContext,
  useEquipmentState,
} from "./contexts/EquipmentContext";

import { EquipWindow } from "./components/EquipWindow";
import {
  ClipboardContext,
  useClipboardState,
} from "./contexts/ClipboardContext";
import { Footer } from "./components/Footer";

import { AddOnsWindow } from "./components/AddOnsWindow";
import { SaveSystem } from "./components/SaveSystem";
import { PlayerStats } from "./components/PlayerStats";

function App() {
  const clipboard = useClipboardState();
  const equipment = useEquipmentState();

  return (
    <EquipmentContext.Provider value={equipment}>
      <ClipboardContext.Provider value={clipboard}>
        <div className="flex stats-window">
          <PlayerStats />
          <AddOnsWindow />
        </div>
        <SaveSystem />
        <div className="ui">
          <EquipWindow index={0} />
          <EquipWindow index={1} />
          <EquipWindow index={2} />
          <EquipWindow index={3} />
        </div>
        <Footer />
      </ClipboardContext.Provider>
    </EquipmentContext.Provider>
  );
}

export default App;
