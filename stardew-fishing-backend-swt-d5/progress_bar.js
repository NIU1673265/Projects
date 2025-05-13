
import * as g from './public/globals.js';
//import { sendSocketMessage } from './app.js';

export default function ProgressBar(fishSpeed,finishCallback) {
    let lastSwapPosition =undefined;
    let lastSwapAt=undefined;
    let direction=undefined;
    let state=undefined;

    let fishDirectionT=undefined;
    let fishLastSwapAtT=undefined;
    let fishLastSwapPositionT=undefined;

    let catchBarDirectionT=undefined;
    let catchBarLastSwapAtT=undefined;
    let catchBarLastSwapPositionT=undefined;

    const start =()=>{
        lastSwapAt = Date.now();
        lastSwapPosition = g.PROGRESS_BAR_INITIAL_POSITION;
        direction = "down";
        state = "in_progress";
       /* sendSocketMessage({
            'type': 'progressBarInfo',
            'data': {
            lastSwapPosition,
            lastSwapAt,
            direction,
            state
             }});*/
        

        let t1 = setTimeout(() => { funcionMirarState(),clearInterval(t2),finishCallback() }, g.timeForProgressBarToReachLimit(direction,lastSwapPosition));//falta stop timer t2
        let t2 = setInterval(() => {

           
            
            let auxCatchbar = g.computeCatchBarCurrentPosition(catchBarDirectionT,catchBarLastSwapAtT,catchBarLastSwapPositionT);
    
            let auxFish = g.computeFishCurrentPosition(fishDirectionT,fishLastSwapAtT,fishLastSwapPositionT,fishSpeed);
       
            let touching = g.catchBarAndFishTouch(auxFish,auxCatchbar);

            if((touching && direction == 'down') || (!touching && direction == 'up')) {
              

                lastSwapPosition = g.computeProgressBarCurrentPosition(direction, lastSwapAt, lastSwapPosition);
                    
                direction = (direction == "up") ? "down" : "up";
                
                
                lastSwapAt = Date.now();

                
                
                clearTimeout(t1);
            
                t1 = setTimeout(() =>{funcionMirarState(), clearInterval(t2), finishCallback() }, g.timeForProgressBarToReachLimit(direction,lastSwapPosition));
               /* 
                sendSocketMessage({
                    'type': 'progressBarInfo',
                    'data': {
                    lastSwapPosition,
                    lastSwapAt,
                    direction,
                    state
                     }
                    });
           */
                
            }
                
        }, g.PROGRESS_BAR_TICK_FREQUENCY);

        
           
    }


    const fishSwappedDirection = (fishDirection, fishLastSwapAt, fishLastSwapPosition) => {
        fishDirectionT = fishDirection;
        fishLastSwapAtT = fishLastSwapAt;
        fishLastSwapPositionT = fishLastSwapPosition;
        
    }

    const catchBarSwappedDirection = (catchBarDirection, catchBarLastSwapAt, catchBarLastSwapPosition) => {
       
        catchBarDirectionT = catchBarDirection;
        catchBarLastSwapAtT = catchBarLastSwapAt;
        catchBarLastSwapPositionT = catchBarLastSwapPosition;
    }
    
    const getInfo = () => ({direction, lastSwapAt, lastSwapPosition, state});

    const funcionMirarState = () => {
       // console.log(state);

        //console.log(direction);
        
        state = (direction == 'up' ) ? "successful" : "failed";
       /* sendSocketMessage({
            'type': 'progressBarInfo',
            'data': {
            lastSwapPosition,
            lastSwapAt,
            direction,
            state
             }});*/

        //console.log(state);

        //console.log(direction);
      
    };

    return { start, fishSwappedDirection, catchBarSwappedDirection, getInfo};
    
}


