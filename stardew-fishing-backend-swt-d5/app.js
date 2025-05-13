import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';
import express, { response } from 'express';
import Game from './game.js';
import { request } from 'http';
import { error } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
const publicFolder = path.join(__dirname, '/public');
app.use(express.static(publicFolder));

const game = Game();
app.listen(PORT, () => {
    return console.log(`App listening on port ${PORT}!`);
});

// Implement your endpoints here...

app.get('/cast_line',(req, res) => {

    let result = game.castLine();

    if(result !== null) {

        return res.status(400).json({errorCode:result});
       
    } 
       return  res.status(200).send()
    
        
    
})

app.get('/wait_for_bite',(req, res) => {

    const promesa = game.waitForBite();

    promesa.then(()=>{res.status(200).send();})
    .catch((err)=>{return res.status(400).json({err})})


})

app.get('/reel_in',(req, res) => {
    let result = game.reelIn();
    console.log(result);
    
    
    if (result.errorCode) {
        return res.status(400).json(result);
    } 
    else {
        return res.status(200).json(result);
    }
})

app.get('/get_mini_game_info',(req, res) => {
    const resu = game.getCatchingMiniGameInfo()
    return res.status(200).json(resu);
})

app.get('/move_catch_bar_up',(req, res) => {
    game.updateCatchBarDirection('up');
    return res.status(200).send();
})

app.get('/stop_moving_catch_bar_up',(req, res) => {
    game.updateCatchBarDirection('down');
    return res.status(200).send();
})

/*import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let wsClient = null;

wss.on('connection', function connection(ws) {
  console.log('Cliente WebSocket conectado');
  wsClient = ws;

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
    wsClient = null;
  });
});
export function sendSocketMessage(diccionari) {
    if (wsClient && wsClient.readyState === wsClient.OPEN) {
      wsClient.send(JSON.stringify(diccionari));
    }
  }
    */
