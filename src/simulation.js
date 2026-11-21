import {createWorld} from './world.js';
export function makeGame(seed=(Math.random()*0xffffffff)>>>0){return {seed,world:createWorld(seed),distance:0,lane:0,jump:0,slide:0,coins:0,speed:5.2,status:'ready',hit:new Set(),collected:new Set()};}
export function act(s,action){if(s.status!=='running')return;if(action==='left')s.lane=Math.max(-1,s.lane-1);if(action==='right')s.lane=Math.min(1,s.lane+1);if(action==='up'&&!s.jump&&!s.slide)s.jump=.82;if(action==='down'&&!s.slide&&!s.jump)s.slide=.75;}
export function tick(s,dt){if(s.status!=='running')return;dt=Math.min(.05,Math.max(0,dt));const previous=s.distance;s.speed=Math.min(11.4,5.2+s.distance/240);s.distance+=s.speed*dt;s.jump=Math.max(0,s.jump-dt);s.slide=Math.max(0,s.slide-dt);
for(const segment of s.world.range(Math.max(0,previous-2),s.distance+3)){
for(const c of segment.coins){const id='c:'+c.at+':'+c.lane;if(!s.collected.has(id)&&c.lane===s.lane&&previous<=c.at&&s.distance>=c.at){s.coins++;s.collected.add(id);}}
for(const o of segment.obstacles){const id='o:'+o.at+':'+o.lane;if(s.hit.has(id)||o.lane!==s.lane||previous>o.at||s.distance<o.at)continue;s.hit.add(id);if((o.type==='rock'&&!s.jump)||(o.type==='log'&&!s.slide))s.status='over';}
}} 
