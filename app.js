const q = selector => document.querySelector(selector);
// Event names and dates retained from the Guildhall study; all are.
// Add each chapter's Facebook URL as  facebook:'https://www.facebook.com/...'  and it appears in the directory.
const chapters = [
  {name:'Seattle',dbid:8,region:'Washington, US',website:'https://www.refugelarpseattle.com',discord:'https://discord.gg/BeQHb9h9wC'},
  {name:'Boise',dbid:1,region:'Idaho, US',website:'https://www.refugelarpboise.com',discord:'https://discord.gg/pfFTDrTThz'},
  {name:'Calgary',dbid:2,region:'Alberta, Canada',website:'https://www.refugelarpcalgary.ca',discord:'https://discord.gg/dDEGwbeEHh'},
  {name:'Edmonton',dbid:4,region:'Alberta, Canada',website:'https://www.refugelarpedmonton.ca',discord:'https://discord.gg/fvReGmkMz6'},
  {name:'Salt Lake',dbid:6,region:'Utah, US',website:'https://www.refugelarpsaltlake.com',discord:'https://discord.gg/JuJqzUMW9S'},
  {name:'San Francisco',dbid:7,region:'California, US',website:'https://www.refugelarpsanfransico.com',discord:'https://discord.gg/2D8rESwUkn'},
  {name:'Oregon City',dbid:5,region:'Oregon, US',website:'',discord:'https://discord.gg/SmyD8DsQ4J'}
];

let eventTrigger = null;
// Upcoming events from the Refuge Database (db.refugelarp.org/events), snapshot of Nov 6, 2026.
const events = [
  ['Seattle','Arantir','Olympia, WA','2026-11-06','2026-11-08',724],
  ['San Francisco','Enerret','Napa, CA','2026-11-06','2026-11-08',703],
  ['Salt Lake','ALT','Midvale, UT','2026-11-07','2026-11-07',736],
  ['Seattle','Arantir','Olympia, WA','2027-01-15','2027-01-17',725],
  ['Oregon City','City of the Fallen','Washougal, WA','2027-02-12','2027-02-14',730],
  ['Seattle','Arantir','Olympia, WA','2027-03-12','2027-03-14',726],
  ['Edmonton','Alasta','Edmonton, AB','2027-04-09','2027-04-11',738],
  ['Calgary','Terranox','Cremona, AB','2027-04-16','2027-04-18',717],
  ['Oregon City','City of the Fallen','Washougal, WA','2027-04-30','2027-05-02',731],
  ['Calgary','Terranox','','2027-05-07','2027-05-09',745],
  ['Edmonton','Alasta','Edmonton, AB','2027-05-14','2027-05-16',739],
  ['Calgary','Terranox','','2027-06-11','2027-06-13',746],
  ['Edmonton','Alasta','Edmonton, AB','2027-06-18','2027-06-20',740],
  ['Calgary','Terranox','Cremona, AB','2027-07-09','2027-07-11',747],
  ['Oregon City','City of the Fallen','Goldendale, WA','2027-07-16','2027-07-18',732],
  ['Edmonton','Alasta','Edmonton, AB','2027-07-16','2027-07-18',741],
  ['Calgary','Terranox','','2027-08-06','2027-08-08',748],
  ['Edmonton','Alasta','Edmonton, AB','2027-08-20','2027-08-22',742],
  ['Calgary','Terranox','','2027-09-03','2027-09-05',749]
].map(([chapter,name,location,start,end,id]) => ({chapter,name,location,start,end,id,url:`https://db.refugelarp.org/events/${id}`}));
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const parts = iso => { const [y,m,d] = iso.split('-').map(Number); return {y,m:monthNames[m-1],d}; };
function dateRange(e) {
  const s = parts(e.start), f = parts(e.end);
  if (e.start === e.end) return `${s.m} ${s.d}, ${s.y}`;
  return s.m === f.m ? `${s.m} ${s.d}–${f.d}, ${f.y}` : `${s.m} ${s.d} – ${f.m} ${f.d}, ${f.y}`;
}
function renderEvents() {
  const selected = q('#event-chapter').value;
  let shown;
  if (selected === 'all') {
    const seen = {};
    shown = events.filter(e => (seen[e.chapter] = (seen[e.chapter] || 0) + 1) <= 1).slice(0, 6);
  } else shown = events.filter(e => e.chapter === selected).slice(0, 6);
  q('#event-count').textContent = `${shown.length} ${shown.length === 1 ? 'event' : 'events'} shown`;
  q('#event-list').innerHTML = shown.length ? shown.map(e => `<article class="event-row"><div class="event-date" aria-hidden="true"><span>${parts(e.start).m}</span><strong>${parts(e.start).d}</strong></div><div class="event-copy"><h3>${e.name}</h3><p>${e.chapter}${e.location ? ' · ' + e.location : ''} · ${dateRange(e)}</p><button class="event-preview-button" data-event="${e.id}" aria-label="Preview ${e.name}, ${e.chapter}">Preview event ↗</button></div></article>`).join('') : '<p class="fine">No upcoming events are listed for this chapter yet.</p>';
}
q('#chapter-list').innerHTML = chapters.map(chapter => `<article class="chapter-row"><div class="chapter-heading"><h3>${chapter.name}</h3><p>${chapter.region}</p></div><div class="chapter-links">${chapter.website ? `<a href="${chapter.website}" aria-label="${chapter.name} website">Website ↗</a>` : ''}<a href="https://db.refugelarp.org/chapters/${chapter.dbid}" aria-label="${chapter.name} in the Refuge Database">Database ↗</a>${chapter.discord ? `<a href="${chapter.discord}" aria-label="${chapter.name} Discord">Discord ↗</a>` : ''}${chapter.facebook ? `<a href="${chapter.facebook}" aria-label="${chapter.name} Facebook">Facebook ↗</a>` : ''}</div></article>`).join('');
q('#event-chapter').addEventListener('change',renderEvents);
q('#event-list').addEventListener('click',event => {
  const button = event.target.closest('[data-event]');
  if (!button) return;
  const e = events.find(item => String(item.id) === button.dataset.event);
  const chapter = chapters.find(item => item.name === e.chapter);
  eventTrigger = button;
  q('#event-title').textContent = e.name;
  q('#event-description').textContent = '';
  q('#event-facts').innerHTML = `<div><dt>Chapter</dt><dd>${e.chapter}</dd></div><div><dt>Dates</dt><dd>${dateRange(e)}</dd></div>${e.location ? `<div><dt>Location</dt><dd>${e.location}</dd></div>` : ''}<div><dt>Region</dt><dd>${chapter.region}</dd></div>`;
  q('#event-website').href = e.url;
  q('#event-dialog').showModal();
});
q('#event-dialog').addEventListener('close',()=>eventTrigger?.focus());

document.getElementById('theme').addEventListener('change',event=>{document.documentElement.dataset.theme=event.target.value;});
// Header Refuge Database menu
(() => {
  const trigger = q('.menu-trigger'), list = q('.menu-list');
  const close = () => { trigger.setAttribute('aria-expanded', 'false'); list.hidden = true; };
  trigger.addEventListener('click', () => { const open = trigger.getAttribute('aria-expanded') === 'true'; open ? close() : (trigger.setAttribute('aria-expanded', 'true'), list.hidden = false); });
  document.addEventListener('click', event => { if (!event.target.closest('.menu')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !list.hidden) { close(); trigger.focus(); } });
})();

renderEvents();
