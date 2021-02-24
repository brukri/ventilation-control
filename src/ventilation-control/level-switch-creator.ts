import { Direction } from "onoff";
import { Gpio } from 'onoff';

export const createLevelSwitch: (gpio: number, direction: Direction) => any = (gpio, direction) => {
    if (!Gpio.accessible) {
        return {
            gpio, direction,
            writeSync: value => {
                console.log(`Mock function writeSync got value=${value} for gpio=${gpio} and direction=${direction}.`);
              }
        }
    }    

    return new Gpio(gpio, direction);
}