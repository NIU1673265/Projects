import {FISH_BIT_TIMEOUT_MS, PULL_ROD_TIMEOUT_MS,ATTEMPTS_DIFFICULTY} from './public/globals.js';
import CatchingMinigame from './catching_minigame.js';

export default function Game() {
  let playerState = 'standing';
  let attemptNumber = 0;

  const catchingMinigame = CatchingMinigame(() => {
    playerState = 'standing';
  });

  let resolveBite = null;
  let rejectBite = null;
  let temporizadorPez = null;
  let temporizadorPezEscapa = null;


  const castLine = ()=> {

    if (playerState !== 'standing') {

      return playerState;
    
    }

    playerState = 'line_cast';
    temporizadorPez = setTimeout(() => {

      playerState = 'fish_bit';

      if (resolveBite) {

        resolveBite();
      
      }
      temporizadorPezEscapa = setTimeout(() => {
        
        playerState = 'standing';
        
      },PULL_ROD_TIMEOUT_MS);

    },FISH_BIT_TIMEOUT_MS);

    return null;
  }

  const waitForBite = () =>{
    return new Promise((resolve, reject) => {

      if(playerState !='line_cast') {

        reject(playerState)

      }
      else {

      resolveBite = resolve;
      rejectBite = reject;

      }
    });
  }

  const reelIn = ()=> {

    if (playerState === 'fish_bit') {

      playerState = 'playing_minigame';

      const difficulty = ATTEMPTS_DIFFICULTY[attemptNumber];
      attemptNumber = (attemptNumber + 1) % ATTEMPTS_DIFFICULTY.length;

      if (temporizadorPezEscapa !== null) {
        clearTimeout(temporizadorPezEscapa);
        temporizadorPezEscapa = null;
      
      }
      
      catchingMinigame.start(difficulty);

      return { difficulty };

    }
    else if(playerState ==='playing_minigame'){

      return { errorCode: playerState };

    }

    playerState = 'standing';

      if (rejectBite) {

        rejectBite();
      
      }
      clearTimeout(temporizadorPez);

      return { errorCode: playerState };

  }

  const updateCatchBarDirection=(direction)=> {
    catchingMinigame.updateCatchBarDirection(direction);
  }

  const getCatchingMiniGameInfo=()=> {
    return catchingMinigame.getInfo();
  }

  return {
    castLine,
    waitForBite,
    reelIn,
    updateCatchBarDirection,
    getCatchingMiniGameInfo
  };
}
