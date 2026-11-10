/* Wonder Learning and Coaching: shared page script */
const QS_COUNT = 5;
const STYLES = [
 {
  "n": "Collaborative Leader",
  "d": "A collaborative leader values teamwork and consensus, often seeking input from team members to make decisions.",
  "r": "Over-reliance on this approach can lead to slow decision-making, potential for groupthink, and difficulties in situations where swift or unpopular decisions are required.",
  "t": [
   "Strengthen decision-making by occasionally taking a more directive approach when needed.",
   "Balance team input with efficiency in making final decisions.",
   "Provide direction by communicating goals clearly and how they link up to the company strategy."
  ]
 },
 {
  "n": "Analytical Leader",
  "d": "Analytical leaders rely heavily on data and logic to make decisions, emphasizing facts and figures in their management style.",
  "r": "This style can sometimes lead to analysis paralysis, where decision-making is delayed due to overanalyzing data. It may also overlook the emotional and relational aspects of leadership, potentially alienating team members.",
  "t": [
   "Encourage creativity by allowing more flexibility.",
   "Balance data-driven decisions with empathetic people management.",
   "Remember, it's okay if others aren't as organized and detailed as you. Some folks thrive in different conditions."
  ]
 },
 {
  "n": "Innovative Leader",
  "d": "Innovative leaders are characterized by their creativity and willingness to take risks, often leading their teams through change and new ideas.",
  "r": "Overemphasis on pushing the status quo can result in a lack of structure and consistency, making it challenging to maintain focus and discipline in an ever-changing environment. There's also a risk of pursuing change for change's sake, without clear benefits.",
  "t": [
   "Implement structure and processes to ensure consistency and reliability.",
   "Balance creative freedom with the need for clear direction and objectives.",
   "Focus on strategic goals so you don't get side-tracked."
  ]
 },
 {
  "n": "Structured Leader",
  "d": "A structured leader prefers well-defined systems and processes, valuing organization and predictability in their approach to management.",
  "r": "Over-reliance on structure can lead to inflexibility, resistance to necessary change, and a stifling of creativity and innovation within the team. It can also result in a micromanagement approach that undermines team autonomy.",
  "t": [
   "Don't strangle your team with too many detailed processes, especially for more creative and ambiguous roles.",
   "Encourage innovation and creativity within your team by having a process for accepting and judging new ideas.",
   "Focus on telling people what you want, but not how to get there."
  ]
 }
];
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");

/* Quiz */
const form = document.getElementById("quizForm"), result = document.getElementById("quizResult");
if (form) {
form.addEventListener("change",()=>{
  const n = Array.from({length:QS_COUNT}).filter((q,i)=>form.querySelector(`input[name=q${i}]:checked`)).length, left = QS_COUNT-n;
  document.getElementById("quizGo").disabled = left>0;
  document.getElementById("quizLeft").textContent = left ? `${left} question${left>1?"s":""} left` : "All set";
});
form.addEventListener("submit",e=>{
  e.preventDefault();
  const tally=[0,0,0,0];
  Array.from({length:QS_COUNT}).forEach((q,i)=>{ const c=form.querySelector(`input[name=q${i}]:checked`); if(c) tally[+c.value]++; });
  const top=Math.max(...tally), winners=STYLES.filter((s,i)=>tally[i]===top);
  result.innerHTML = (winners.length>1?`<p><b>You're a blend of ${winners.length} styles.</b> Read both of them below.</p>`:"") + winners.map(s=>`
   <div class="result">
    <p class="eyebrow">Your style</p><h3 style="font-size:1.8rem">${esc(s.n)}</h3>
    <p>${esc(s.d)}</p>
    <p><b>The risk:</b> ${esc(s.r)}</p>
    <div><b>Tips to flex your style</b><ul>${s.t.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
   </div>`).join("") + `
   <p class="muted">Over-relying on one style can turn a strength into a weakness when it's applied at the wrong time or to the wrong task.</p>
   <div class="cta"><a class="btn" href="mailto:gvra.marcos@gmail.com?subject=Free%20consultation%20request&amp;body=Hi%20Marcos%2C%0A%0AI%27d%20like%20to%20book%20a%20free%2030-minute%20consultation.%0A%0AA%20little%20about%20me%20and%20my%20team%3A%0A%0AA%20few%20days%20and%20times%20that%20work%20for%20me%3A%0A">Talk it through in a free consultation</a><button class="btn alt" type="button" id="quizAgain">Retake the quiz</button></div>`;
  result.hidden=false; form.hidden=true; result.scrollIntoView({block:"start"});
  document.getElementById("quizAgain").addEventListener("click",()=>{
    form.reset(); document.getElementById("quizGo").disabled=true; document.getElementById("quizLeft").textContent="5 questions left";
    result.hidden=true; form.hidden=false; document.getElementById("quiz").scrollIntoView();
  });
});
}

/* Copy email address */
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) copyBtn.addEventListener("click", e => {
  const btn = e.currentTarget, addr = document.getElementById("emailAddr");
  const done = msg => { btn.textContent = msg; setTimeout(() => btn.textContent = "Copy email address", 2000); };
  const select = () => { const r = document.createRange(); r.selectNodeContents(addr); const s = getSelection(); s.removeAllRanges(); s.addRange(r); done("Selected — press Ctrl+C"); };
  try { navigator.clipboard.writeText(addr.textContent).then(() => done("Copied"), select); } catch (_) { select(); }
});

