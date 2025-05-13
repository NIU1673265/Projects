import * as g from './public/globals.js';
import ProgressBar from './progress_bar.js';
import CatchBar from './catch_bar.js';
import Fish from './fish.js';

export default function CatchingMinigame(finishCallback) {
   
    let progressBar=undefined;
    let catchBar=undefined;
    let fish=undefined;

    const start = (difficulty) => {
        console.log('Entro en minigame');
        
        let fishSpeed = g.DIFFICULTY_TO_FISH_SPEED[difficulty];

        progressBar = ProgressBar(fishSpeed, () => {
            fish.finish();
            finishCallback();
        });

        catchBar = CatchBar(
            (catchBarDirection, catchBarLastSwapAt, catchBarLastSwapPosition) => {
                progressBar.catchBarSwappedDirection(catchBarDirection, catchBarLastSwapAt, catchBarLastSwapPosition)}
        );

        fish = Fish(fishSpeed,
            (fishDirection, fishLastSwapAt, fishLastSwapPosition) => {
                progressBar.fishSwappedDirection(fishDirection, fishLastSwapAt, fishLastSwapPosition);}
        );
     
        catchBar.start();
        fish.start();
        progressBar.start();
        

    };

    const getInfo = () => {
     return {
         progressBarInfo: progressBar.getInfo(), catchBarInfo: catchBar.getInfo(),fishInfo: fish.getInfo()};};

    const updateCatchBarDirection = (direccion) => {
        catchBar.updateDirection(direccion);
    };

    return { start, updateCatchBarDirection, getInfo};
}
