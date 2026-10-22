'use strict';
/* My Workout: entirely local, no accounts or tracking. */
const STORAGE_KEY='my-workout-anterior-posterior-v1';
const PLAN_REVISION=7;
const DAY_NAMES=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DAY_SHORT=['MON','TUE','WED','THU','FRI','SAT','SUN'];
const MUSCLES={
 chest:{label:'Chest · Pectorals',side:'front',zones:['chest']},
 anteriorDelts:{label:'Front shoulders · Deltoids',side:'front',zones:['shoulders']},
 lateralDelts:{label:'Side shoulders · Deltoids',side:'front',zones:['shoulders']},
 biceps:{label:'Biceps',side:'front',zones:['biceps']},
 quadriceps:{label:'Quadriceps',side:'front',zones:['quads']},
 abdominals:{label:'Core · Abdominals',side:'front',zones:['abs']},
 lats:{label:'Back · Latissimus dorsi',side:'back',zones:['lats']},
 midback:{label:'Upper & middle back',side:'back',zones:['upperback']},
 rearDelts:{label:'Rear shoulders · Deltoids',side:'back',zones:['rearshoulders']},
 triceps:{label:'Triceps',side:'back',zones:['triceps']},
 hamstrings:{label:'Hamstrings',side:'back',zones:['hamstrings']},
 glutes:{label:'Glutes',side:'back',zones:['glutes']},
 calves:{label:'Calves',side:'back',zones:['calves']},
 lowerback:{label:'Lower back · Spinal erectors',side:'back',zones:['lowerback']},
};
const INITIAL_LIBRARY={
 anterior:[
  {id:'a-bench',name:'Barbell Bench Press (Flat)',muscle:'chest',secondary:'Front deltoids · Triceps',sets:3,reps:'10',tip:'Set your feet firmly, retract your shoulder blades and lower the bar with control to a comfortable touch point on your chest. Use safety bars or a spotter.'},
  {id:'a-incline',name:'Incline Dumbbell Press',muscle:'chest',secondary:'Upper chest emphasis · Front deltoids · Triceps',sets:3,reps:'10',tip:'Set the bench to a modest incline. Lower dumbbells smoothly with elbows slightly tucked.'},
  {id:'a-dips',name:'Assisted Dips (Machine)',muscle:'chest',secondary:'Triceps · Front deltoids',sets:3,reps:'10',tip:'Kneel on the machine support pad, hold the handles and lower under control. Higher assistance weight makes the movement easier. Stop before shoulder discomfort.'},
  {id:'a-fly',name:'Chest Fly (Smith Machine)',muscle:'chest',secondary:'Front deltoids',sets:3,reps:'10',tip:'Equipment check: a standard Smith machine has a fixed straight bar and cannot perform a normal chest fly. Use a pec-deck/chest-fly machine or cable station for this movement; confirm the equipment you mean.'},
  {id:'a-press',name:'Seated Dumbbell Shoulder Press (70°)',muscle:'anteriorDelts',secondary:'Side deltoids · Triceps',sets:3,reps:'10',tip:'Set the backrest to approximately 70 degrees and press upward while keeping your lower back supported.'},
  {id:'a-lateral',name:'Dumbbell Lateral Raises',muscle:'lateralDelts',secondary:'Supraspinatus assists',sets:3,reps:'10',tip:'With a soft elbow bend, raise dumbbells to about shoulder height without shrugging or swinging.'},
  {id:'a-cable-lateral',name:'Cable Lateral Raises',muscle:'lateralDelts',secondary:'Supraspinatus assists',sets:3,reps:'10',tip:'Stand sideways to a low cable pulley, raise your arm smoothly and keep your torso still; repeat on both sides.'},
  {id:'a-curl',name:'Alternating Bicep Curls',muscle:'biceps',secondary:'Brachialis',sets:3,reps:'10',tip:'Curl one dumbbell at a time without rocking your body. Fully control the lowering phase.'},
  {id:'a-hammer',name:'Hammer Curl',muscle:'biceps',secondary:'Brachialis · Brachioradialis',sets:3,reps:'10',tip:'Keep palms facing inward throughout the curl and avoid swinging your upper arms.'},
  {id:'a-squat',name:'Goblet Squat',muscle:'quadriceps',secondary:'Glutes · Core',sets:3,reps:'10',tip:'Hold a dumbbell close to your chest, keep heels planted and squat as deep as you can control.'},
  {id:'a-lunge',name:'Lunges (Dumbbell)',muscle:'quadriceps',secondary:'Glutes · Hamstrings',sets:3,reps:'10',tip:'Hold dumbbells at your sides, step into a controlled lunge, and return to standing. Aim for 10 reps per leg.'},
  {id:'a-extension',name:'Leg Extension (Smith Machine)',muscle:'quadriceps',secondary:'Rectus femoris · Vastus muscles',sets:3,reps:'10',tip:'Equipment check: standard Smith machines cannot perform conventional leg extensions. Use a seated leg-extension machine, or check if your gym has a special attachment.'},
  {id:'a-decline-crunch',name:'Decline Bench Crunch',muscle:'abdominals',secondary:'Obliques assist',sets:3,reps:'10',tip:'Secure your feet, round your upper back by bringing your ribs toward your pelvis, and lower with control.'},
  {id:'a-leg-raise',name:'Leg Raises (Machine)',muscle:'abdominals',secondary:'Hip flexors',sets:3,reps:'10',tip:'Use a captain’s-chair/vertical knee raise station or designated leg-raise machine. Raise legs with controlled pelvic movement and avoid swinging.'},
 ],
 posterior:[
  {id:'p-lat',name:'Lat Pulldown',muscle:'lats',secondary:'Biceps · Teres major',sets:3,reps:'10',tip:'Pull the bar towards your upper chest by driving your elbows down. Avoid swinging or pulling behind your neck.'},
  {id:'p-row',name:'Seated Cable Row',muscle:'midback',secondary:'Rhomboids · Trapezius · Biceps',sets:3,reps:'10',tip:'Sit tall, pull the handle towards your torso, and squeeze your shoulder blades gently together.'},
  {id:'p-wide-row',name:'Wide Grip Row (Smith Machine)',muscle:'midback',secondary:'Rear deltoids · Rhomboids · Biceps',sets:3,reps:'10',tip:'Use a controlled, wide-grip bent-over row with the Smith bar, if that is the exercise you intend. Keep a stable hip hinge and avoid rounding your back. Do not confuse this with a seated row machine.'},
  {id:'p-rear',name:'Reverse Pec Deck',muscle:'rearDelts',secondary:'Rhomboids · Middle trapezius',sets:3,reps:'10',tip:'With your chest supported, sweep your hands apart at shoulder height. Control the return rather than shrugging.'},
  {id:'p-pushdown',name:'Rope Triceps Pushdown',muscle:'triceps',secondary:'All triceps heads',sets:3,reps:'10',tip:'Keep your elbows by your sides, extend your arms and separate the rope ends slightly at the bottom.'},
  {id:'p-overhead',name:'Overhead Triceps Extension',muscle:'triceps',secondary:'Triceps long head',sets:3,reps:'10',tip:'Keep your upper arms relatively still. Extend the elbows without arching your lower back.'},
  {id:'p-rdl',name:'Romanian Deadlift',muscle:'hamstrings',secondary:'Glutes · Spinal erectors',sets:3,reps:'10',tip:'Hinge at the hips with slightly bent knees, keep the bar close to your legs and stop when you cannot maintain a neutral spine.'},
  {id:'p-hip',name:'Hip Thrust',muscle:'glutes',secondary:'Hamstrings (assist)',sets:3,reps:'10',tip:'Support your upper back on the bench and lift your hips until your torso and thighs align. Avoid arching your lower back.'},
  {id:'p-lying-curl',name:'Lying Leg Curl (Smith Machine)',muscle:'hamstrings',secondary:'Knee-flexing hamstrings',sets:3,reps:'10',tip:'Equipment check: standard Smith machines do not perform conventional lying leg curls. Use a dedicated prone/lying leg-curl machine with ankle roller and padded bench, or confirm your gym attachment.'},
  {id:'p-extension',name:'Back Extension',muscle:'lowerback',secondary:'Glutes · Hamstrings',sets:3,reps:'10',tip:'On a 45-degree back-extension bench, hinge at the hips and stop at a neutral, straight-body position. Avoid excessive arching.'},
 ]
};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
let state={library:clone(INITIAL_LIBRARY),sessions:{},planRevision:PLAN_REVISION};
let currentTab='week',weekOffset=0,selectedDay=(new Date().getDay()+6)%7,editSplit='anterior',editId=null,pendingAction=null,toastTimer=null;
function validExercise(e){return e && typeof e.id==='string' && e.id.length<80 && typeof e.name==='string' && e.name.length<=85 && MUSCLES[e.muscle] && Number.isInteger(e.sets) && e.sets>=1 && e.sets<=8 && typeof e.reps==='string' && e.reps.length<=25 && (!e.tip||typeof e.tip==='string');}
function includesDips(items){return items.some(e=>e.id==='a-dips'||/\bdips?\b/i.test(e.name));}
function migrateDips(){
 if(state.planRevision>=2)return;
 const dips=clone(INITIAL_LIBRARY.anterior.find(e=>e.id==='a-dips'));
 if(!includesDips(state.library.anterior)){
  const idx=state.library.anterior.findIndex(e=>e.id==='a-incline');
  state.library.anterior.splice(idx<0?state.library.anterior.length:idx+1,0,clone(dips));
 }
 // Keep all past session snapshots intact; update any future sessions without erasing ticks.
 const today=dateKey(new Date());
 for(const [key,session] of Object.entries(state.sessions)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||key<today||!session||session.type!=='anterior'||!Array.isArray(session.items)||includesDips(session.items))continue;
  const weekday=parseDate(key).getDay();
  const idx=session.items.findIndex(e=>e.id==='a-incline');
  session.items.splice(idx<0?session.items.length:idx+1,0,{...clone(dips),sets:weekday===3?1:dips.sets});
 }
 state.planRevision=2;
}
function migrateCoreUpdates(){
 if(state.planRevision>=3)return;
 // Modify only original named exercises, not user-renamed/custom movements.
 // Keep customised sets/reps on renamed entries and retain all past history snapshots.
 const replacements=[
  ['a-dips','Parallel-Bar Dips','a-dips'],
  ['a-crunch','Cable Crunch','a-decline-crunch'],
  ['a-deadbug','Dead Bug','a-leg-raise']
 ];
 function updateItems(items){
  for(const [oldId,oldName,newId] of replacements){
   const i=items.findIndex(e=>e.id===oldId && e.name===oldName);
   if(i<0)continue;
   const old=items[i],updated=clone(INITIAL_LIBRARY.anterior.find(e=>e.id===newId));
   items[i]={...old,...updated,sets:old.sets,reps:old.reps};
  }
 }
 updateItems(state.library.anterior);
 const today=dateKey(new Date());
 for(const [key,session] of Object.entries(state.sessions)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||key<=today||!session||session.type!=='anterior'||!Array.isArray(session.items))continue;
  // Do not reinterpret an exercise the user has already marked complete.
  const existingDone=session.completed||{};
  if(replacements.some(([id])=>existingDone[id]))continue;
  updateItems(session.items);
 }
 state.planRevision=3;
}
function migrateAssistedDips(){
 if(state.planRevision>=4)return;
 // Update the previous standard dips variations only; leave renamed/custom dip exercises unchanged.
 const originalNames=new Set(['Smith-Machine-Supported Dips','Parallel-Bar Dips']);
 const replacement=clone(INITIAL_LIBRARY.anterior.find(e=>e.id==='a-dips'));
 function update(items){
  for(const item of items){
   if(item.id==='a-dips' && originalNames.has(item.name)){
    // Keep any user-adjusted sets and rep targets while updating the exercise identity and technique.
    Object.assign(item,{...replacement,sets:item.sets,reps:item.reps});
   }
  }
 }
 update(state.library.anterior);
 // Preserve previous session records exactly, as well as any dips already ticked today.
 const today=dateKey(new Date());
 for(const [key,session] of Object.entries(state.sessions)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||key<today||!session||session.type!=='anterior'||!Array.isArray(session.items))continue;
  if(key===today && session.completed?.['a-dips'])continue;
  update(session.items);
 }
 state.planRevision=4;
}

function migrateIllustrationMetadata(){
 if(state.planRevision>=5)return;
 for(const split of ['anterior','posterior']){
  for(const item of state.library[split]){
   const original=INITIAL_LIBRARY[split].find(e=>e.id===item.id&&e.name===item.name);
   if(original && !item.secondary && original.secondary) item.secondary=original.secondary;
  }
 }
 state.planRevision=5;
}
function migrateNewAnteriorRoutine(){
 if(state.planRevision>=6)return;
 // Explicitly requested full replacement of the anterior program.
 // Preserve all older completed workout history and the posterior routine.
 state.library.anterior=clone(INITIAL_LIBRARY.anterior);
 const today=dateKey(new Date());
 for(const [key,session] of Object.entries(state.sessions)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||key<today||!session||session.type!=='anterior')continue;
  // Keep started sessions (their snapshots and ticks) unchanged, even when future dated.
  if(Object.values(session.completed||{}).some(Boolean))continue;
  // Drop only untouched snapshots so the new anterior program appears on upcoming days.
  delete state.sessions[key];
 }
 state.planRevision=6;
}
function migrateNewPosteriorRoutine(){
 if(state.planRevision>=7)return;
 // Preserve past/completed historical workout records and anterior routine.
 state.library.posterior=clone(INITIAL_LIBRARY.posterior);
 const today=dateKey(new Date());
 for(const [key,session] of Object.entries(state.sessions)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||key<today||!session||session.type!=='posterior')continue;
  if(Object.values(session.completed||{}).some(Boolean))continue;
  // Future plans without any ticks are refreshed to the new exercise names and targets.
  delete state.sessions[key];
 }
 state.planRevision=7;
}
function migratePlan(){migrateDips();migrateCoreUpdates();migrateAssistedDips();migrateIllustrationMetadata();migrateNewAnteriorRoutine();migrateNewPosteriorRoutine();}
function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;const obj=JSON.parse(raw);if(obj&&obj.library&&['anterior','posterior'].every(k=>Array.isArray(obj.library[k]) && obj.library[k].length<=100 && obj.library[k].every(validExercise))&&obj.sessions&&typeof obj.sessions==='object'&&!Array.isArray(obj.sessions)){state={library:obj.library,sessions:obj.sessions,planRevision:obj.planRevision||1};if(state.planRevision<PLAN_REVISION){migratePlan();save();}}}catch(err){console.warn('Local workout data could not be read.',err);}}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(err){toast('Storage unavailable. Export your data to keep a backup.');}}
function atMidnight(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function addDays(d,n){const copy=atMidnight(d);copy.setDate(copy.getDate()+n);return copy;}
function mondayFor(d){return addDays(d,-((d.getDay()+6)%7));}
function dateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function parseDate(key){const [y,m,d]=key.split('-').map(Number);return new Date(y,m-1,d);}
function dateForDay(i){return addDays(mondayFor(new Date()),weekOffset*7+i);}
function splitFor(i){return i%2===0?'anterior':'posterior';}
function sessionPlan(i){const split=splitFor(i);if(split==='recovery')return [];const existing=state.sessions[dateKey(dateForDay(i))];if(existing&&Array.isArray(existing.items))return existing.items;
 return state.library[split].map(e=>({...e}));}
function doneCount(d,i){const s=state.sessions[dateKey(d)];return s?Object.keys(s.completed||{}).filter(id=>s.completed[id]&&s.items?.some(e=>e.id===id)).length:0;}
function countAllDoneThisWeek(){return Array.from({length:7},(_,i)=>doneCount(dateForDay(i),i)).reduce((a,b)=>a+b,0);}
function formatDate(d,opt={day:'numeric',month:'short'}){return new Intl.DateTimeFormat('en-AU',opt).format(d);}
function longDate(d){return formatDate(d,{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
const ILLUSTRATED_IDS=new Set([...INITIAL_LIBRARY.anterior,...INITIAL_LIBRARY.posterior].map(e=>e.id));
function illustrationPath(ex){return ILLUSTRATED_IDS.has(ex.id)?`./exercise-art/${ex.id}.svg`:'./exercise-art/custom.svg';}
function displayPercent(done,total){return total?Math.round(100*done/total):0;}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function showTab(tab){currentTab=tab;for(const name of ['week','progress','history','settings'])$(name+'-screen').classList.toggle('hidden',name!==tab);document.querySelectorAll('.nav-tab').forEach(n=>{n.classList.toggle('active',n.dataset.tab===tab);n.setAttribute('aria-current',n.dataset.tab===tab?'page':'false');});if(tab==='week')renderWeek();if(tab==='progress')renderProgress();if(tab==='history')renderHistory();if(tab==='settings')renderEditor();window.scrollTo({top:0,behavior:'instant'});}
function renderWeek(){
 const today=new Date();
 $('today-label').textContent=formatDate(today,{weekday:'long',day:'numeric',month:'long'});
 $('week-range').textContent=`${formatDate(dateForDay(0),{day:'numeric',month:'short'})} – ${formatDate(dateForDay(6),{day:'numeric',month:'short',year:'numeric'})}`;
 $('week-grid').innerHTML=DAY_NAMES.map((day,i)=>{
   const date=dateForDay(i),type=splitFor(i),count=type==='recovery'?0:sessionPlan(i).length,done=doneCount(date,i),isToday=dateKey(date)===dateKey(today);
   const label=type==='anterior'?'Front':type==='posterior'?'Back':'Rest';
   return `<button type="button" data-day="${i}" class="day-card ${selectedDay===i?'selected':''} ${isToday?'today':''}" aria-pressed="${selectedDay===i}" aria-label="${esc(day)}, ${date.getDate()}, ${label}, ${done} of ${count} completed"><strong>${DAY_SHORT[i].slice(0,1)+DAY_SHORT[i].slice(1).toLowerCase()}</strong><span>${label}</span><small>${type==='recovery'?'Rest':done+'/'+count}</small></button>`;
 }).join('');
 renderWorkout();
}
function renderWorkout(){
 const i=selectedDay,date=dateForDay(i),type=splitFor(i),plan=sessionPlan(i),done=doneCount(date,i),pct=displayPercent(done,plan.length),light=i===2||i===3;
 $('session-kicker').textContent=formatDate(date,{weekday:'long',day:'numeric',month:'short'});
 $('workout-title').textContent=type==='recovery'?'Rest day':type==='anterior'?'Anterior workout':'Posterior workout';
 $('session-description').textContent=type==='recovery'?'Rest, walk or stretch gently.':type==='anterior'?'Front-focused · Chest, shoulders, biceps, legs and abs':'Back-focused · Back, triceps, hamstrings, glutes and lower back';
 $('session-tags').innerHTML=type==='recovery'?'':`<span>${plan.length} exercises</span>${light?'<span class="light-tag">Light day · 1 set each</span>':''}`;
 $('day-percent').textContent=pct+'%';
 $('completion-label').textContent=type==='recovery'?'Enjoy your recovery day':`${done} of ${plan.length} completed`;
 $('day-bar').style.width=pct+'%';
 $('reset-day').classList.toggle('hidden',type==='recovery'||done===0);
 $('exercise-heading').textContent=type==='recovery'?'Recovery':'Your exercises';
 $('exercise-count-label').textContent=type==='recovery'?'':`${plan.length} total`;
 if(type==='recovery'){$('exercise-list').innerHTML='<div class="rest-card"><div class="rest-symbol">☾</div><h3>Time to recover</h3><p>No strength workout today. A short walk or gentle mobility is optional.</p></div>';$('session-note').textContent='';return;}
 const recorded=state.sessions[dateKey(date)],doneMap=recorded?.completed||{};
 $('exercise-list').innerHTML=plan.map((ex,index)=>{
  const complete=!!doneMap[ex.id],meta=MUSCLES[ex.muscle]||MUSCLES.chest;
  return `<article class="exercise-card ${complete?'completed':''}">
   <button type="button" data-detail="${esc(ex.id)}" class="exercise-figure" aria-label="See how to do ${esc(ex.name)}"><img loading="lazy" src="${illustrationPath(ex)}" alt="${esc(ex.name)} movement illustration"></button>
   <div class="ex-info"><span class="ex-number">${index+1} OF ${plan.length}</span><h4>${esc(ex.name)}</h4><p>${ex.sets} set${ex.sets===1?'':'s'} × ${esc(ex.reps)} reps</p><span class="muscle-label">${esc(meta.label)}</span><button class="guide-link" type="button" data-detail="${esc(ex.id)}">How to do it ›</button></div>
   <button type="button" data-detail="${esc(ex.id)}" class="muscle-button" aria-label="See the muscles worked by ${esc(ex.name)}">${muscleSVG(ex.muscle)}</button>
   <button type="button" data-toggle="${esc(ex.id)}" class="check-button ${complete?'is-done':''}" aria-label="${complete?'Remove completion for':'Mark completed'} ${esc(ex.name)} with confirmation"><span aria-hidden="true">${complete?'✓':''}</span></button>
  </article>`;
 }).join('');
 $('session-note').textContent='3 sets × 10 reps for each exercise. Tap the muscle figure to see a larger, detailed anatomy view.';
}
/* Static, atlas-style anatomical muscle maps. Primary muscles are highlighted red. No animation. */
function muscleSVG(key){
 const meta=MUSCLES[key]||MUSCLES.chest;
 const front=meta.side==='front', active=new Set(meta.zones);
 const fibers = (x,y,w,h,angle=0)=>{
  let out='';for(let i=0;i<5;i++){
   const xx=x+w*(i+.65)/6;
   out+=`<path d="M${xx.toFixed(1)} ${y} q${(-w*.14).toFixed(1)} ${(h*.49).toFixed(1)} ${(w*.05).toFixed(1)} ${h}" fill="none" stroke="#2c3336" stroke-width=".55" opacity=".43"/>`;
  }
  return out;
 };
 const fill=(zone,path,fx='')=>`<path class="${active.has(zone)?'active':'base'}" d="${path}"/>${fx}`;
 let anatomy='';
 // Full figure, anatomically separated torso/limbs with visible muscle boundaries.
 if(front){
  anatomy+=fill('shoulders','M44 42 Q33 44 27 58 L27 72 Q35 69 48 52 Z M76 42 Q87 44 93 58 L93 72 Q85 69 72 52 Z');
  anatomy+=fill('chest','M48 45 Q53 42 59 45 L59 66 Q47 70 40 62 Q39 52 48 45 Z M61 45 Q67 42 72 45 Q81 52 80 62 Q73 70 61 66 Z');
  anatomy+=fill('biceps','M29 71 Q32 67 36 72 L32 89 Q27 98 25 88 Z M91 71 Q88 67 84 72 L88 89 Q93 98 95 88 Z');
  anatomy+=fill('abs','M48 73 L58 73 L58 83 L47 83 Z M62 73 L72 73 L73 83 L62 83 Z M47 85 L58 85 L58 97 L47 97 Z M62 85 L73 85 L73 97 L62 97 Z M46 99 L58 99 L57 111 L47 109 Z M62 99 L74 99 L73 109 L63 111 Z');
  anatomy+=fill('quads','M41 140 Q45 137 54 140 L56 165 L48 187 L42 184 L37 162 Z M66 140 Q75 137 79 140 L83 162 L78 184 L72 187 L64 165 Z');
  anatomy+=fill('shins','M45 190 L55 190 L53 222 L45 225 Z M65 190 L75 190 L75 225 L67 222 Z');
  anatomy+='<path class="detail" d="M41 59 L56 65 M79 59 L64 65 M48 77 H57 M63 77 H72 M48 90 H57 M63 90 H72 M47 103 H57 M63 103 H73 M49 145 L52 177 M72 145 L70 178 M43 166 L48 181 M79 166 L74 181"/>';
 } else {
  anatomy+=fill('rearshoulders','M44 43 Q31 44 27 58 L30 70 L45 53 Z M76 43 Q89 44 93 58 L90 70 L75 53 Z');
  anatomy+=fill('upperback','M49 43 Q60 47 71 43 L83 65 Q72 82 60 75 Q48 82 37 65 Z');
  anatomy+=fill('lats','M38 70 Q43 75 55 81 L56 114 L49 108 Q40 97 38 70 Z M82 70 Q77 75 65 81 L64 114 L71 108 Q80 97 82 70 Z');
  anatomy+=fill('lowerback','M56 80 L64 80 L68 125 Q60 133 52 125 Z');
  anatomy+=fill('triceps','M29 72 Q35 67 37 73 L32 100 L25 96 Z M91 72 Q85 67 83 73 L88 100 L95 96 Z');
  anatomy+=fill('glutes','M42 134 Q52 129 59 135 L59 153 Q51 165 40 156 Z M61 135 Q68 129 78 134 L80 156 Q69 165 61 153 Z');
  anatomy+=fill('hamstrings','M42 163 L57 163 Q55 179 53 187 L46 190 Z M63 163 L78 163 L74 190 L67 187 Z');
  anatomy+=fill('calves','M44 194 Q51 191 56 195 L53 217 L48 225 L43 215 Z M64 195 Q69 191 76 194 L77 215 L72 225 L67 217 Z');
  anatomy+='<path class="detail" d="M60 45 V128 M43 58 L53 70 M77 58 L67 70 M44 85 L53 101 M76 85 L67 101 M42 143 Q49 151 56 148 M78 143 Q71 151 64 148 M45 172 L52 185 M75 172 L68 185 M45 200 L50 215 M75 200 L70 215"/>';
 }
 // Tendon lines and subtle muscular fibre hatching give a static medical plate appearance.
 const hatch=front
 ?'<path class="fibre" d="M43 50 L56 64 M45 47 L57 60 M77 50 L64 64 M74 47 L63 60 M30 76 L33 82 M90 76 L87 82 M42 146 L52 170 M46 142 L54 165 M78 146 L68 170 M74 142 L66 165"/>'
 :'<path class="fibre" d="M43 58 L56 72 M46 52 L56 65 M77 58 L64 72 M74 52 L64 65 M44 81 L54 105 M76 81 L66 105 M30 78 L30 94 M90 78 L90 94 M45 170 L51 184 M75 170 L69 184"/>';
 // The large view is an anatomical overview; exact individual muscle anatomy is not diagnostic.
 return `<svg class="muscle-svg" viewBox="0 0 120 257" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${front?'Anterior':'Posterior'} anatomical view, ${esc(meta.label)} highlighted">
 <defs><linearGradient id="anatomyShade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7f8f6"/><stop offset="1" stop-color="#dce6e7"/></linearGradient><linearGradient id="skinTone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bdc8ca"/><stop offset="1" stop-color="#8a9ca0"/></linearGradient><linearGradient id="target" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff7776"/><stop offset="1" stop-color="#c71e37"/></linearGradient></defs>
 <rect width="120" height="257" rx="9" fill="url(#anatomyShade)"/>
 <g stroke="#8c9ea3" stroke-width=".45" opacity=".45"><path d="M11 14 H109 M11 233 H109 M8 35 H15 M105 35 H112 M8 198 H15 M105 198 H112"/></g>
 <g stroke="#394951" stroke-width="1.12" stroke-linejoin="round"><path fill="url(#skinTone)" d="M52 30 L49 39 Q36 38 28 46 Q23 50 22 64 L13 104 Q11 111 16 114 Q22 116 26 109 L35 83 L37 126 L36 149 L40 169 L43 193 L44 231 L53 231 L57 194 L59 171 L61 171 L63 194 L67 231 L76 231 L77 193 L80 169 L84 149 L83 126 L85 83 L94 109 Q98 116 104 114 Q109 111 107 104 L98 64 Q97 50 92 46 Q84 38 71 39 L68 30 Z"/><ellipse fill="url(#skinTone)" cx="60" cy="19" rx="13" ry="16"/><path fill="#a0adb0" d="M38 125 Q58 132 82 125 L83 146 Q76 152 61 153 L59 153 Q44 152 37 146 Z"/></g>
 <g stroke="#4b575c" stroke-width=".8" stroke-linejoin="round"><style>.muscle-svg .base{fill:#b5c0c2}.muscle-svg .active{fill:url(#target);stroke:#a82637;stroke-width:.9}.muscle-svg .detail{fill:none;stroke:#526266;stroke-width=".85";stroke-linecap:round}.muscle-svg .fibre{fill:none;stroke:#657678;stroke-width=".57";opacity:.7}</style>${anatomy}${hatch}</g>
 <path d="M60 41 V125 M38 126 Q60 132 82 126" fill="none" stroke="#5d686c" stroke-width=".75"/>
 <rect x="16" y="235" width="88" height="15" rx="3" fill="#dbe4e5"/><text x="60" y="245.5" font-family="Arial,sans-serif" font-weight="700" font-size="8.6" text-anchor="middle" fill="#28363c">${front?'ANTERIOR':'POSTERIOR'}</text>
 </svg>`;
}
function confirmPrompt({title,description,accept='Yes, confirm',onAccept,warning=false}){pendingAction=onAccept;$('confirm-title').textContent=title;$('confirm-description').textContent=description;$('confirm-accept').textContent=accept;$('confirm-icon').textContent=warning?'!':'✓';$('confirm-dialog').showModal();}
function toggleExercise(id){const i=selectedDay,date=dateForDay(i),key=dateKey(date),exercise=sessionPlan(i).find(e=>e.id===id);if(!exercise)return;const done=!!state.sessions[key]?.completed?.[id];confirmPrompt({title:done?'Remove completion?':'Mark as completed?',description:`${exercise.name} · ${longDate(date)}. ${done?'This removes the tick from your saved session.':'Only confirm after you have finished the exercise.'}`,accept:done?'Yes, remove tick':'Yes, completed',warning:done,onAccept:()=>{if(!state.sessions[key])state.sessions[key]={type:splitFor(i),items:clone(sessionPlan(i)),completed:{}};if(done)delete state.sessions[key].completed[id];else state.sessions[key].completed[id]=new Date().toISOString();save();renderWeek();toast(done?'Exercise unticked.':'Exercise completed and saved.');}});}
function showDetails(id){const ex=sessionPlan(selectedDay).find(e=>e.id===id);if(!ex)return;const meta=MUSCLES[ex.muscle];$('detail-title').textContent=ex.name;$('detail-illustration').innerHTML=`<img src="${illustrationPath(ex)}" alt="Illustration of ${esc(ex.name)}">`;$('detail-map').innerHTML=muscleSVG(ex.muscle);$('detail-target').textContent=`Highlighted primary target: ${meta.label}.${ex.secondary?' Additional muscles worked: '+ex.secondary+'.':' Other muscle groups may also assist with this exercise.'}`;$('detail-tip').textContent=`TECHNIQUE TIP · ${ex.tip||'Use controlled reps and a range of motion that feels comfortable.'}`;$('detail-dialog').showModal();}
function renderProgress(){
 const rows=Array.from({length:7},(_,i)=>{
  const d=dateForDay(i),plan=sessionPlan(i),key=dateKey(d),done=doneCount(d,i);
  return {i,d,key,plan,done,pct:displayPercent(done,plan.length),type:splitFor(i)};
 });
 const workdays=rows.filter(r=>r.type!=='recovery');
 const done=workdays.reduce((a,b)=>a+b.done,0),planned=workdays.reduce((a,b)=>a+b.plan.length,0),pct=displayPercent(done,planned);
 const complete=workdays.filter(r=>r.done===r.plan.length && r.plan.length>0).length;
 $('progress-summary').innerHTML=`<div class="stat-card"><strong>${pct}%</strong><span>WEEKLY<br>COMPLETION</span></div><div class="stat-card"><strong>${done}</strong><span>EXERCISES<br>COMPLETED</span></div><div class="stat-card"><strong>${complete}/7</strong><span>WORKOUTS<br>FULLY FINISHED</span></div>`;
 $('progress-week-title').textContent='Week at a glance';
 $('progress-week-dates').textContent=`${formatDate(rows[0].d,{day:'numeric',month:'short'})} – ${formatDate(rows[6].d,{day:'numeric',month:'short',year:'numeric'})}`;
 $('progress-days').innerHTML=rows.map(r=>`<div class="progress-day"><strong>${DAY_SHORT[r.i]}</strong><div class="progress-day-ring ${r.type==='recovery'?'rest':''} ${r.pct===100&&r.type!=='recovery'?'finished':''}" style="--progress:${r.pct}%"><span>${r.type==='recovery'?'R':r.pct+'%'}</span></div><small>${r.type==='recovery'?'REST':r.done+'/'+r.plan.length}</small></div>`).join('');
 $('progress-week-bar').innerHTML=`<div class="bar-top"><span>${done} of ${planned} exercises done</span><strong>${pct}%</strong></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>`;
 const groupLabels={chest:'Chest',anteriorDelts:'Shoulders',lateralDelts:'Shoulders',biceps:'Biceps',quadriceps:'Quadriceps',abdominals:'Core',lats:'Back',midback:'Back',rearDelts:'Rear shoulders',triceps:'Triceps',hamstrings:'Hamstrings',glutes:'Glutes',calves:'Calves',lowerback:'Lower back'};
 const counts={};
 for(const r of rows){const completed=state.sessions[r.key]?.completed||{};for(const ex of r.plan){if(completed[ex.id]){const label=groupLabels[ex.muscle]||MUSCLES[ex.muscle]?.label||'Other';counts[label]=(counts[label]||0)+1;}}}
 const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);const high=Math.max(...entries.map(e=>e[1]),1);
 $('progress-muscles').innerHTML=entries.length?entries.map(([label,n])=>`<div class="muscle-progress-row"><span>${esc(label)}</span><div class="muscle-progress-bar"><div style="width:${Math.round(n/high*100)}%"></div></div><strong>${n}</strong></div>`).join(''):'<div class="empty-state">Complete some exercises this week to see your target-muscle breakdown.</div>';
}
function renderHistory(){const rows=Object.entries(state.sessions).filter(([key,s])=>/^\d{4}-\d{2}-\d{2}$/.test(key)&&s&&Array.isArray(s.items)&&typeof s.completed==='object').map(([key,s])=>({key,date:parseDate(key),type:s.type,total:s.items.length,done:s.items.filter(e=>s.completed[e.id]).length})).filter(s=>s.done>0).sort((a,b)=>b.date-a.date);
 const total=rows.reduce((a,r)=>a+r.done,0),full=rows.filter(r=>r.done===r.total).length;
 $('history-summary').innerHTML=`<div class="stat-card"><strong>${rows.length}</strong><span>SESSIONS<br>STARTED</span></div><div class="stat-card"><strong>${full}</strong><span>FULLY COMPLETED<br>SESSIONS</span></div><div class="stat-card"><strong>${total}</strong><span>EXERCISES<br>COMPLETED</span></div>`;
 $('history-list').innerHTML=rows.length?rows.map(r=>`<div class="history-card"><div class="history-datebox"><span>${formatDate(r.date,{month:'short'}).toUpperCase()}</span><strong>${r.date.getDate()}</strong></div><div class="history-description"><h3>${r.type==='posterior'?'Posterior / Back':'Anterior / Front'}</h3><p>${formatDate(r.date,{weekday:'long',year:'numeric',month:'short',day:'numeric'})} · ${r.done} / ${r.total} exercises</p></div><div class="history-score ${r.done===r.total?'complete':''}">${displayPercent(r.done,r.total)}%</div></div>`).join(''):'<div class="empty-state">Your training log is empty.<br>Complete an exercise in My week and it will appear here.</div>';
}
function renderEditor(){const anterior=editSplit==='anterior';$('edit-anterior').classList.toggle('active',anterior);$('edit-posterior').classList.toggle('active',!anterior);
 $('editor-list').innerHTML=state.library[editSplit].map((ex,i)=>`<div class="editor-row"><span class="editor-index">${i+1}</span><div class="editor-details"><strong>${esc(ex.name)}</strong><small>${esc(MUSCLES[ex.muscle].label)} · ${ex.sets} set${ex.sets===1?'':'s'} × ${esc(ex.reps)}</small></div><button class="editor-action" type="button" data-edit="${esc(ex.id)}" aria-label="Edit ${esc(ex.name)}">✎</button><button class="editor-action remove" type="button" data-remove="${esc(ex.id)}" aria-label="Remove ${esc(ex.name)}">×</button></div>`).join('')||'<div class="empty-state">No exercises added yet.</div>';
}
function openExerciseEditor(id=null){editId=id;const ex=id?state.library[editSplit].find(e=>e.id===id):null;$('edit-dialog-title').textContent=ex?'Edit exercise':'Add exercise';$('edit-name').value=ex?.name||'';$('edit-sets').value=ex?.sets??2;$('edit-reps').value=ex?.reps||'8–12';$('edit-tip').value=ex?.tip||'';$('edit-muscle').innerHTML=Object.entries(MUSCLES).filter(([,m])=>m.side===(editSplit==='anterior'?'front':'back')).map(([key,m])=>`<option value="${key}">${esc(m.label)}</option>`).join('');$('edit-muscle').value=ex?.muscle||(editSplit==='anterior'?'chest':'lats');$('edit-dialog').showModal();}
function editExercise(event){event.preventDefault();const ex={id:editId||('custom-'+Date.now()+'-'+Math.random().toString(36).slice(2,8)),name:$('edit-name').value.trim(),muscle:$('edit-muscle').value,sets:Number($('edit-sets').value),reps:$('edit-reps').value.trim(),tip:$('edit-tip').value.trim()};const original=editId?state.library[editSplit].find(e=>e.id===editId):null;if(original?.secondary)ex.secondary=original.secondary;if(!validExercise(ex)){toast('Please enter a valid name, sets and reps.');return;}if(editId){const pos=state.library[editSplit].findIndex(e=>e.id===editId);if(pos>=0)state.library[editSplit][pos]=ex;}else state.library[editSplit].push(ex);save();$('edit-dialog').close();renderEditor();toast('Workout plan updated.');}
function exportData(){const content=JSON.stringify({app:'My Workout',version:2,exportedAt:new Date().toISOString(),...state},null,2);const blob=new Blob([content],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`my-workout-backup-${dateKey(new Date())}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('Backup file created.');}
async function importData(file){if(!file)return;if(file.size>3_000_000){toast('Backup file is too large.');return;}try{const obj=JSON.parse(await file.text());if(obj.app!=='My Workout'||!obj.library||!obj.sessions||!['anterior','posterior'].every(k=>Array.isArray(obj.library[k])&&obj.library[k].length<=100&&obj.library[k].every(validExercise))||Array.isArray(obj.sessions)||typeof obj.sessions!=='object')throw Error('Invalid backup');confirmPrompt({title:'Replace your saved data?',description:'Importing will replace the workout plan and history currently saved on this device. Consider exporting a backup first.',accept:'Yes, import',warning:true,onAccept:()=>{state={library:obj.library,sessions:obj.sessions,planRevision:obj.planRevision||1};migratePlan();save();renderEditor();renderWeek();toast('Backup imported.');}});}catch(err){toast('Could not read that backup file.');}finally{$('import-data').value='';}}
function attachEvents(){
 document.querySelectorAll('.nav-tab').forEach(el=>el.addEventListener('click',()=>showTab(el.dataset.tab)));
 $('week-grid').addEventListener('click',e=>{const btn=e.target.closest('[data-day]');if(btn){selectedDay=Number(btn.dataset.day);renderWeek();document.querySelector('.workout-section').scrollIntoView({behavior:'smooth',block:'start'});}});
 $('jump-today').addEventListener('click',()=>{weekOffset=0;selectedDay=(new Date().getDay()+6)%7;renderWeek();document.querySelector('.workout-section').scrollIntoView({behavior:'smooth',block:'start'});});
 $('exercise-list').addEventListener('click',e=>{const toggle=e.target.closest('[data-toggle]'),detail=e.target.closest('[data-detail]');if(toggle)toggleExercise(toggle.dataset.toggle);else if(detail)showDetails(detail.dataset.detail);});
 $('prev-week').addEventListener('click',()=>{weekOffset--;selectedDay=0;renderWeek();});$('next-week').addEventListener('click',()=>{weekOffset++;selectedDay=0;renderWeek();});$('current-week').addEventListener('click',()=>{weekOffset=0;selectedDay=(new Date().getDay()+6)%7;renderWeek();});
 $('reset-day').addEventListener('click',()=>{const date=dateForDay(selectedDay),key=dateKey(date);confirmPrompt({title:'Reset this day?',description:`This deletes all the completion ticks for ${longDate(date)} from your history.`,accept:'Yes, reset day',warning:true,onAccept:()=>{delete state.sessions[key];save();renderWeek();toast('Day reset.');}});});
 $('confirm-cancel').addEventListener('click',()=>$('confirm-dialog').close());$('confirm-accept').addEventListener('click',()=>{const action=pendingAction;pendingAction=null;$('confirm-dialog').close();if(action)action();});$('confirm-dialog').addEventListener('close',()=>{pendingAction=null;});
 $('detail-close').addEventListener('click',()=>$('detail-dialog').close());
 $('edit-anterior').addEventListener('click',()=>{editSplit='anterior';renderEditor();});$('edit-posterior').addEventListener('click',()=>{editSplit='posterior';renderEditor();});
 $('editor-list').addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),remove=e.target.closest('[data-remove]');if(edit)openExerciseEditor(edit.dataset.edit);if(remove){const ex=state.library[editSplit].find(item=>item.id===remove.dataset.remove);if(!ex)return;confirmPrompt({title:'Remove exercise?',description:`Remove ${ex.name} from future ${editSplit} sessions? Previously recorded sessions will be preserved.`,accept:'Yes, remove',warning:true,onAccept:()=>{state.library[editSplit]=state.library[editSplit].filter(item=>item.id!==ex.id);save();renderEditor();toast('Exercise removed.');}});}});
 $('add-exercise').addEventListener('click',()=>openExerciseEditor());$('exercise-form').addEventListener('submit',editExercise);$('edit-cancel').addEventListener('click',()=>$('edit-dialog').close());
 $('restore-defaults').addEventListener('click',()=>confirmPrompt({title:'Restore default exercises?',description:'This replaces both exercise lists with the current defaults: 14 anterior and 10 posterior. Recorded sessions will remain in your history.',accept:'Yes, restore',warning:true,onAccept:()=>{state.library=clone(INITIAL_LIBRARY);state.planRevision=PLAN_REVISION;save();renderEditor();toast('Original exercise plans restored.');}}));
 $('export-data').addEventListener('click',exportData);$('import-data').addEventListener('change',event=>importData(event.target.files?.[0]));
 // The confirmation and exercise dialogs are dismissible via Escape or tapping outside.
 for(const id of ['confirm-dialog','detail-dialog','edit-dialog']){const dialog=$(id);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
}
load();attachEvents();showTab('week');
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
