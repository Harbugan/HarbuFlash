/* HARBUFLASH v0.4.2 — original blonde pulp-adventurer sprite.
   16x32 native pixels, hand-pixeled poses, no borrowed game artwork. */
(function(){
'use strict';
const W=16,H=32;
const C={ink:'#201d27',hair:'#eed46c',hairDark:'#ae8641',skin:'#f1b184',shadow:'#bc7457',shirt:'#c79a57',shirtDark:'#805733',shirtLight:'#eed090',pack:'#654638',strap:'#49332a',trousers:'#4163a5',trouserLight:'#7797d1',boot:'#292a30',bootHi:'#5c5050',eye:'#211c27',white:'#fff1d5'};
function make(kind,phase=0){
 const c=document.createElement('canvas');c.width=W;c.height=H;
 const g=c.getContext('2d');g.imageSmoothingEnabled=false;
 const r=(x,y,w,h,k)=>{g.fillStyle=C[k]||k;g.fillRect(Math.round(x),Math.round(y),w,h)};
 const outline=(x,y,w,h,k)=>{r(x-1,y-1,w+2,h+2,'ink');r(x,y,w,h,k)};
 // Walking cycle: planted foot goes backwards; upper body stays readable.
 const gait=[[[5,6,5],[10,11,12]],[[6,7,6],[10,10,10]],[[7,8,8],[9,9,9]],[[10,11,12],[5,6,5]],[[10,10,10],[6,7,6]],[[8,8,8],[8,8,8]]];
 let legs=gait[phase%6],headY=3,torsoY=13,arm='normal';
 if(kind==='idle'||kind==='turn'||kind==='shoot')legs=[[6,6,5],[10,10,11]];
 if(kind==='takeoff')legs=[[6,6,4],[10,11,10]],arm='lift';
 if(kind==='jump')legs=[[6,5,5],[10,11,11]],arm='lift';
 if(kind==='apex')legs=[[6,6,6],[10,10,11]],arm='lift';
 if(kind==='fall')legs=[[6,5,4],[10,11,12]],arm='lift';
 if(kind==='land'||kind==='anticipate')legs=[[6,6,5],[10,10,11]],headY=6,torsoY=17;
 if(kind==='crouch')headY=10,torsoY=20;
 if(kind==='hang'||kind==='grab'||kind==='climbReach'){arm='reach';legs=[[6,5,5],[10,11,11]];headY=7;torsoY=16;}
 if(kind==='climbPull'){arm='pull';legs=[[6,5,4],[10,11,10]];headY=6;torsoY=16;}
 if(kind==='climbKnee'){arm='brace';legs=[[6,6,5],[10,11,11]];headY=4;torsoY=15;}
 if(kind==='climbStand'){arm='normal';legs=[[6,6,5],[10,10,11]];headY=3;torsoY=13;}
 if(kind==='dead'){headY=15;torsoY=22;}
 // Boots and distinct blue trouser legs.
 const leg=(a,front)=>{let [hip,knee,foot]=a;const col=front?'trouserLight':'trousers';
   outline(hip,torsoY+6,3,5,col);r(knee,torsoY+10,3,4,col);
   r(foot,27,3,3,col);r(foot-1,30,5,2,'boot');r(foot+2,30,2,1,'bootHi');};
 if(kind==='land'||kind==='anticipate'||kind==='crouch'){
   r(4,27,10,2,'trousers');r(3,29,5,3,'boot');r(10,29,5,3,'boot');
 }else{leg(legs[1],false);leg(legs[0],true);}
 // Backpack is a strong independent silhouette, not part of the head.
 outline(3,torsoY+1,4,8,'pack');r(3,torsoY+5,2,3,'shirtDark');
 outline(5,torsoY,7,9,'shirtDark');
 r(6,torsoY+1,6,6,'shirt');r(7,torsoY+1,3,2,'shirtLight');
 r(6,torsoY+1,2,8,'strap');r(8,torsoY+6,3,2,'shirtDark');
 // Arms: dedicated overhead catch, two-step pull and braced climb.
 if(arm==='reach'){
   outline(4,torsoY-7,2,9,'shirt');r(4,torsoY-10,3,4,'skin');
   outline(11,torsoY-9,2,11,'shirt');r(11,torsoY-12,3,4,'skin');
   r(4,torsoY-11,3,1,'shadow');r(11,torsoY-13,3,1,'shadow');
 }else if(arm==='pull'){
   outline(4,torsoY-5,3,8,'shirt');r(3,torsoY-7,4,3,'skin');
   outline(10,torsoY-6,3,8,'shirt');r(10,torsoY-8,4,3,'skin');
 }else if(arm==='brace'){
   outline(10,torsoY+1,3,5,'shirt');r(11,torsoY+5,4,3,'skin');
   r(4,torsoY-3,3,7,'skin');
 }else if(kind==='shoot'){
   r(11,torsoY+2,4,2,'skin');r(14,torsoY+2,2,2,'boot');
 }else if(arm==='lift'){
   r(3,torsoY-2,3,7,'shirt');r(3,torsoY-4,2,3,'skin');
   r(11,torsoY-3,3,7,'shirt');r(12,torsoY-5,2,3,'skin');
 }else{
   r(11,torsoY+1,3,5,'shirt');r(12,torsoY+5,2,4,'skin');
   r(3,torsoY+2,2,6,'shirtDark');r(3,torsoY+7,2,2,'skin');
 }
 // Short expressive face, forward nose, eye, ear and clearly blonde quiff.
 outline(6,headY+3,6,9,'skin');r(10,headY+8,3,3,'shadow');
 r(12,headY+6,2,2,'skin');r(12,headY+8,1,1,'shadow');
 r(11,headY+5,1,1,'eye');r(10,headY+4,2,1,'shirtDark');
 r(10,headY+10,2,1,'shadow');
 r(5,headY+4,2,5,'hairDark');
 r(5,headY+1,7,4,'hairDark');r(5,headY+1,7,3,'hair');
 r(4,headY+3,4,3,'hair');r(3,headY+4,3,2,'hair');
 r(8,headY,4,2,'hair');r(10,headY-1,3,2,'hair');
 r(11,headY+2,2,2,'hairDark');r(5,headY+9,2,2,'hairDark');
 if(kind==='turn')r(8,headY+5,1,1,'eye');
 if(kind==='dead'){r(8,headY+6,3,1,'ink');}
 return c;
}
const atlas={};
const kinds=['idle','walk','turn','anticipate','takeoff','jump','apex','fall','land','hang','grab','climbReach','climbPull','climbKnee','climbStand','crouch','shoot','dead'];
for(const k of kinds)atlas[k]=Array.from({length:k==='walk'?6:1},(_,i)=>make(k,i));
function draw(ctx,o,time){
 if(o.inv>0&&o.st!=='dead'&&Math.floor(time*20)%2===0)return;
 let kind='idle';
 if(o.st==='dead')kind='dead';
 else if(o.st==='hang')kind=(o.grabT||0)>.07?'grab':'hang';
 else if(o.st==='climb'){
   const q=o.climbT||0;
   kind=q<.24?'climbReach':q<.52?'climbPull':q<.79?'climbKnee':'climbStand';
 }else if(o.st==='air'){
   const age=o.airT||0;
   kind=age<.09?'takeoff':o.vy<-65?'jump':o.vy<45?'apex':'fall';
 }else if(o.landT>0)kind='land';
 else if(o.crouch)kind='crouch';
 else if(o.shoot>0)kind='shoot';
 else if(o.turnT>0)kind='turn';
 else if(Math.abs(o.vx)>1)kind='walk';
 const frames=atlas[kind],i=kind==='walk'?Math.floor(o.anim*1.45)%6:0;
 ctx.save();ctx.translate(Math.round(o.x),Math.round(o.y));
 if(o.dir<0)ctx.scale(-1,1);
 ctx.drawImage(frames[i],-8,-32);
 ctx.restore();
}
window.HarbuHero={draw,atlas,width:W,height:H};
})();
