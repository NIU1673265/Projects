import * as g from './public/globals.js';
//import { sendSocketMessage } from './app.js';

export default function fish(speed, swappedDirectionCallback) {
    
    let lastSwapPosition=undefined;
    let lastSwapAt=undefined;
    let direction=undefined;
    let timeout=undefined;

    let SwappedDirectionCallback = swappedDirectionCallback;
    
    const start = () => {
        lastSwapAt = Date.now();
        lastSwapPosition = Math.random(0.0,g.FISH_MAX_POS);
        direction = "down";
        /*sendSocketMessage({
            'type': 'fishInfo',
            'data': {
            lastSwapPosition,
            lastSwapAt,
            direction,
            speed
             }});*/
        let updateDirection = () => {
            lastSwapPosition = g.computeFishCurrentPosition(direction, lastSwapAt, lastSwapPosition, speed);
            lastSwapAt = Date.now();
            direction = (direction=="up") ? "down" : "up";
            SwappedDirectionCallback(direction, lastSwapAt, lastSwapPosition);
           /* sendSocketMessage({
                'type': 'fishInfo',
                'data': {
                lastSwapPosition,
                lastSwapAt,
                direction,
                speed
                 }});*/
        }

        let timeout = () => {
            setTimeout(
                () => {

                    updateDirection();
                    timeout();
                    
                }, 
            g.computeFishTimeToNextSwap(direction, lastSwapPosition, speed)) 
            
        };
        timeout();
        
    }

    const finish = () => {clearTimeout(timeout)}
    const getInfo = () => {
        return {direction, lastSwapAt, lastSwapPosition }
    }

    return { start, finish, getInfo};
}
