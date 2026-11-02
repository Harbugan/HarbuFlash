/* HARBUFLASH v0.4.0 - original 16x32 character frames.
   Pixel colors follow the user's blonde adventurer reference, not the world palette.
   Every pose is rendered into an offscreen 16x32 sprite before gameplay. */
(function(){
'use strict';
const C={hair:'#d0dc71',hairShade:'#aaaaaa',skin:'#bb776d',skinShade:'#894036',jacket:'#905f25',jacketShade:'#664400',blue:'#3e31a2',blueLight:'#7c70da',boot:'#000000',bootLight:'#555555',outline:'#000000'};
const SIZE_W=16,SIZE_H=32;
function frame(kind,index){
  const cv=document.createElement('canvas');cv.width=SIZE_W;cv.height=SIZE_H;
  const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
  function r(x,y,w,h,color){g.fillStyle=C[color]||color;g.fillRect(Math.round(x),Math.round(y),w,h)}
  function leg(hip,knee,foot,front){
    const cloth=front?'blueLight':'blue';
    r(hip,18,3,5,cloth);r(knee,22,3,5,cloth);
    r(foot,27,3,3,cloth);r(foot,30,4,2,'boot');
    r(foot+1,29,2,1,'bootLight');
  }
  // Six discrete poses: heel strike, loading, passing, push-off, and mirror.
  // Feet always travel backwards relative to the body during the planted phase.
  const walk=[
    [[7,5,3],[9,10,12]],
    [[7,6,5],[9,10,10]],
    [[7,8,8],[9,9,8]],
    [[7,10,12],[9,5,3]],
    [[7,10,10],[9,6,5]],
    [[7,8,8],[9,8,8]]
  ];
  let legs=walk[index%6];
  if(kind==='idle'||kind==='turn'||kind==='shoot')legs=[[7,7,6],[9,9,10]];
  if(kind==='jump')legs=[[7,6,5],[9,10,12]];
  if(kind==='fall')legs=[[7,5,4],[9,11,12]];
  if(kind==='hang'||kind==='climb')legs=[[7,6,5],[9,11,12]];
  if(kind==='crouch')legs=[[7,5,4],[9,10,11]];
  if(kind==='dead')legs=[[7,7,6],[9,9,10]];
  if(kind==='crouch'){
    r(4,24,9,3,'jacket');r(5,26,7,2,'blue');
    r(4,28,4,2,'boot');r(10,28,4,2,'boot');
  }else{
    leg(...legs[1],false);leg(...legs[0],true);
  }
  const down=kind==='crouch'?8:0;
  const up=kind==='hang'||kind==='climb'?-2:0;
  // Torso, backpack, collar and hair deliberately keep the same silhouette.
  r(5,11+down+up,7,9,'outline');
  r(5,12+down+up,6,7,'jacket');
  r(4,13+down+up,2,7,'jacketShade');
  r(10,13+down+up,2,6,'blue');
  r(6,11+down+up,3,2,'blueLight');
  if(kind==='hang'||kind==='climb'){
    r(4,7,2,7,'skin');r(4,5,2,3,'skin');
    r(11,6,2,8,'skin');r(11,4,2,3,'skin');
  }else if(kind==='shoot'){
    r(11,14+down,4,2,'skin');r(14,14+down,2,2,'bootLight');
  }else{
    r(11,13+down+up,2,8,'skin');
    r(11,20+down+up,2,2,'skinShade');
  }
  r(7,5+down+up,5,7,'skin');
  r(10,7+down+up,2,2,'skinShade');
  r(12,8+down+up,1,1,'outline');
  r(5,3+down+up,7,4,'hair');
  r(4,5+down+up,4,5,'hair');
  r(3,8+down+up,3,3,'hair');
  r(6,2+down+up,5,1,'hairShade');
  r(10,5+down+up,2,1,'hairShade');
  if(kind==='turn')r(9,8+down+up,1,1,'outline');
  if(kind==='dead'){
    const flat=document.createElement('canvas');flat.width=SIZE_W;flat.height=SIZE_H;
    const fg=flat.getContext('2d');fg.imageSmoothingEnabled=false;
    fg.translate(2,28);fg.rotate(-Math.PI/2);fg.drawImage(cv,-8,-20,16,32);
    return flat;
  }
  return cv;
}
const atlas={};
for(const k of ['idle','walk','turn','jump','fall','hang','climb','crouch','shoot','dead']){
  atlas[k]=Array.from({length:k==='walk'?6:1},(_,i)=>frame(k,i));
}
function draw(ctx,o,time){
  if(o.inv>0&&o.st!=='dead'&&Math.floor(time*20)%2===0)return;
  let kind='idle';
  if(o.st==='dead')kind='dead';
  else if(o.st==='hang')kind='hang';
  else if(o.st==='climb')kind='climb';
  else if(o.st==='air')kind=o.vy<0?'jump':'fall';
  else if(o.crouch)kind='crouch';
  else if(o.shoot>0)kind='shoot';
  else if(o.turnT>0)kind='turn';
  else if(Math.abs(o.vx)>1)kind='walk';
  const frames=atlas[kind];
  const i=kind==='walk'?Math.floor(o.anim*1.45)%frames.length:0;
  ctx.save();
  ctx.translate(Math.round(o.x),Math.round(o.y));
  if(o.dir<0)ctx.scale(-1,1);
  ctx.drawImage(frames[i],-8,-32);
  ctx.restore();
}
window.HarbuHero={draw,atlas,width:SIZE_W,height:SIZE_H};
})();
