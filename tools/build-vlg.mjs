#!/usr/bin/env node
// COVIL 0.1 unsigned developer build, Node 20+.
import {mkdtemp,cp,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
const [specArg,outArg]=process.argv.slice(2);
if(!specArg||!outArg){console.error('Usage: node tools/build-vlg.mjs ../covil-game-spec ./inrun.vlg');process.exit(2);}
const spec=resolve(specArg),output=resolve(outArg),dir=await mkdtemp(join(tmpdir(),'inrun-vlg-'));
try{
const source=resolve('.');
for(const file of ['index.html','style.css','manifest.json'])await cp(join(source,file),join(dir,file));
await cp(join(source,'src'),join(dir,'src'),{recursive:true});
await mkdir(resolve(output,'..'),{recursive:true});
const {build}=await import(pathToFileURL(join(spec,'tools/covil-build.mjs')).href);
console.log(await build(dir,output));
}finally{await rm(dir,{recursive:true,force:true});}
