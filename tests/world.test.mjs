import test from 'node:test';import assert from 'node:assert/strict';import {chunk,createWorld} from '../src/world.js';import {makeGame,act,tick} from '../src/simulation.js';
test('seed reproduces chunk',()=>assert.deepEqual(chunk(42,10),chunk(42,10)));
test('all chunks have a traversable lane',()=>{for(let i=0;i<500;i++){const c=chunk(42,i);assert.ok([-1,0,1].includes(c.safeLane));assert.ok(!c.obstacles.some(o=>o.lane===c.safeLane));}});
test('world is independent of access order',()=>{const w=createWorld(42);const a=w.get(100);w.range(0,5);assert.deepEqual(a,w.get(100));});
test('lane boundaries',()=>{const s=makeGame(42);s.status='running';for(let i=0;i<5;i++)act(s,'left');assert.equal(s.lane,-1);for(let i=0;i<5;i++)act(s,'right');assert.equal(s.lane,1);});
test('pause freezes simulation',()=>{const s=makeGame(42);s.status='paused';tick(s,.05);assert.equal(s.distance,0);});
test('running advances',()=>{const s=makeGame(42);s.status='running';tick(s,.05);assert.ok(s.distance>0);});
