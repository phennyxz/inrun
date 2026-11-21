import {makeGame,act,tick} from './simulation.js';
import {draw} from './renderer.js';
import {createCovilRuntime} from '../covil-core.mjs';
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const overlay=document.getElementById('overlay'),label=document.getElementById('overlayText'),play=document.getElementById('play'),meters=document.getElementById('meters'),coins=document.getElementById('coins');
let game=makeGame(42),last=0,time=0,hostMode=false,frame=0;
const actions=['left','right','up','down','pause'];
function show(message,button){label.textContent=message;play.textContent=button;overlay.classList.remove('hidden');}
function start(){game=makeGame();game.status='running';overlay.classList.add('hidden');}
function togglePause(){if(game.status==='running'){game.status='paused';show('Corrida pausada.','CONTINUAR');}else if(game.status==='paused'){game.status='running';overlay.classList.add('hidden');}}
function dispatch(action){if(action==='pause'){if(!hostMode)togglePause();return;}act(game,action);}
function step(t){const dt=last?Math.min(.05,(t-last)/1000):0;last=t;if(game.status==='running'){tick(game,dt);time+=dt;}draw(ctx,game,time);meters.textContent=String(Math.floor(game.distance)).padStart(4,'0')+' m';coins.textContent='✦ '+String(game.coins).padStart(2,'0');if(game.status==='over')show('Fim da corrida! '+Math.floor(game.distance)+' metros · '+game.coins+' sóis · seed '+game.seed,'TENTAR DE NOVO');frame=requestAnimationFrame(step);}
frame=requestAnimationFrame(step);
const keymap={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down',a:'left',d:'right',w:'up',s:'down',Escape:'pause',' ':'up'};
window.addEventListener('keydown',e=>{const action=keymap[e.key];if(!action||hostMode)return;e.preventDefault();if(!e.repeat)dispatch(action);});
for(const button of document.querySelectorAll('[data-action]'))button.addEventListener('pointerdown',e=>{e.preventDefault();if(!hostMode)dispatch(button.dataset.action);});
play.addEventListener('click',()=>{if(hostMode)return;if(game.status==='paused')togglePause();else start();});
document.getElementById('pause').addEventListener('click',()=>{if(!hostMode)togglePause();});
window.addEventListener('message',function bootstrap(event){
if(event.data?.type!=='covil.connect'||event.data?.covil!=='0.1'||!event.ports?.[0]||typeof event.data.sessionId!=='string'||event.data.sessionId.length<16)return;
hostMode=true;overlay.classList.add('hidden');
createCovilRuntime({port:event.ports[0],sessionId:event.data.sessionId,init:async covil=>{
for(const action of actions)covil.controls.on(action,pressed=>{if(pressed)dispatch(action);});
covil.lifecycle.on('start',()=>start());
covil.lifecycle.on('pause',()=>{game.status='paused';});
covil.lifecycle.on('resume',()=>{if(game.status==='paused')game.status='running';});
covil.lifecycle.on('stop',()=>{game.status='stopped';cancelAnimationFrame(frame);});
}});
window.removeEventListener('message',bootstrap);
});
