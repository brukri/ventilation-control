import { Gpio } from 'onoff';
import { createLevelSwitch } from './level-switch-creator';
import VentilationControlError from './ventilation-control-error';

const LEVEL_SWITCH_0 = createLevelSwitch(17, 'out');
const LEVEL_SWITCH_2 = createLevelSwitch(27, 'out');
const LEVEL_SWITCH_3 = createLevelSwitch(22, 'out');

const resetSwitches: () => void = () => {
    LEVEL_SWITCH_0.writeSync(Gpio.LOW);
    LEVEL_SWITCH_2.writeSync(Gpio.LOW);
    LEVEL_SWITCH_3.writeSync(Gpio.LOW);
};

export const adjustVentilationLevel: (level: number) => void = (level) => {
    switch (level) {
        case 0: {
            resetSwitches();
            LEVEL_SWITCH_0.writeSync(Gpio.HIGH);
            break;
        }
        case 1: {
            resetSwitches();
            break;
        }
        case 2: {
            resetSwitches();
            LEVEL_SWITCH_2.writeSync(Gpio.HIGH);
            break;
        }
        case 3: {
            resetSwitches();
            LEVEL_SWITCH_3.writeSync(Gpio.HIGH);
            break;
        }
        default: {
            throw new VentilationControlError(`Level=${level} is not supported.`);
        }
    }
};

export const getVentilationLevel: () => number = () => {
    const levelSwitch0State = LEVEL_SWITCH_0.readSync();
    const levelSwitch2State = LEVEL_SWITCH_2.readSync();
    const levelSwitch3State = LEVEL_SWITCH_3.readSync();

    if (levelSwitch0State === 1) {
        return 0;
    } else if (levelSwitch2State === 1) {
        return 2;
    } else if (levelSwitch3State === 1) {
        return 3;
    } else {
        return 1;
    }
};
