import * as g from './public/globals.js';
//import { sendSocketMessage } from './app.js';

export default function CatchBar(swappedDirectionCallback) {
    
    let lastSwapAt;
    let lastSwapPosition;
    let direction;
    let callback = swappedDirectionCallback;

    const start = () => {

        lastSwapAt = Date.now();
        lastSwapPosition = g.CATCH_BAR_INITIAL_POSITION;
        direction = "down";
        callback(direction, lastSwapAt, lastSwapPosition);
       /* sendSocketMessage( {
            'type': 'catchBarInfo',
            'data': {
            lastSwapPosition,
            lastSwapAt,
            direction
            }});*/

    }
    
    const updateDirection = (newdirection) => {
        
        lastSwapPosition = g.computeCatchBarCurrentPosition(direction, lastSwapAt, lastSwapPosition);
        direction = newdirection
        lastSwapAt = Date.now();
        callback(direction, lastSwapAt, lastSwapPosition);

        /*sendSocketMessage( {
            'type': 'catchBarInfo',
            'data': {
            lastSwapPosition,
            lastSwapAt,
            direction
            }});*/

    }

    const getInfo = () => {
        return {direction,lastSwapAt,lastSwapPosition};
    }

    return { start, updateDirection, getInfo};
}
