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
}

export const adjustVentilationLevel: (level: number) => void = (level) => {
    switch(level) {
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
            throw new VentilationControlError(`Level=${level} is not supported.`)
        }
    }
};
