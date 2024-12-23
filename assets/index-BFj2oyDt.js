import{r as O,a as h,j as e,m as o,u as B}from"./vendor-CF60DbUU.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();var y={},S;function z(){if(S)return y;S=1;var t=O();return y.createRoot=t.createRoot,y.hydrateRoot=t.hydrateRoot,y}var H=z();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),R=(...t)=>t.filter((i,a,r)=>!!i&&i.trim()!==""&&r.indexOf(i)===a).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var F={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=h.forwardRef(({color:t="currentColor",size:i=24,strokeWidth:a=2,absoluteStrokeWidth:r,className:n="",children:s,iconNode:l,...c},d)=>h.createElement("svg",{ref:d,...F,width:i,height:i,stroke:t,strokeWidth:r?Number(a)*24/Number(i):a,className:R("lucide",n),...c},[...l.map(([x,u])=>h.createElement(x,u)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(t,i)=>{const a=h.forwardRef(({className:r,...n},s)=>h.createElement(G,{ref:s,iconNode:i,className:R(`lucide-${V(t)}`,r),...n}));return a.displayName=`${t}`,a};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=m("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=m("ChartNoAxesColumnIncreasing",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=m("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=m("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=m("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=m("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=m("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=m("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=m("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=m("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=m("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);function U(){return e.jsx("header",{className:"bg-gradient-to-r from-blue-900 to-purple-900 text-white py-6",children:e.jsxs("nav",{className:"container mx-auto px-4 flex justify-between items-center",children:[e.jsx("h1",{className:"text-2xl font-extrude",children:"Dondapati Sidhartha"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("a",{href:"https://github.com/dsid271",className:"hover:text-blue-300 transition-colors",children:e.jsx(L,{size:24})}),e.jsx("a",{href:"https://www.linkedin.com/in/sidhartha-dondapati-90541827a/",className:"hover:text-blue-300 transition-colors",children:e.jsx(P,{size:24})}),e.jsx("a",{href:"mailto:dsid271@gmail.com",className:"hover:text-blue-300 transition-colors",children:e.jsx(C,{size:24})})]})]})})}function Q(){return e.jsx("section",{className:"bg-[#2a2a2a] text-[#00ff00] py-20 scanline",children:e.jsxs("div",{className:"container mx-auto px-4 flex flex-col md:flex-row items-center gap-12",children:[e.jsxs(o.div,{className:"md:w-1/2",initial:{opacity:0,x:-50},animate:{opacity:1,x:0},transition:{duration:.8,ease:"easeOut"},children:[e.jsx("div",{className:"glitch-wrapper",children:e.jsx("h1",{className:"glitch","data-text":"ML ENGINEER_",children:"ML ENGINEER_"})}),e.jsxs("p",{className:"text-xl text-[#00ffff] mb-8 pixel-text",children:["> FINAL YEAR B.TECH STUDENT",e.jsx("br",{}),"> SPECIALIZING IN AI/ML",e.jsx("br",{}),"> READY TO DEBUG THE MATRIX"]}),e.jsxs(o.div,{className:"flex gap-4",initial:{opacity:0},animate:{opacity:1},transition:{delay:.4,duration:.6},children:[e.jsx("a",{href:"#projects",className:"pixel-button",children:"VIEW_PROJECTS.exe"}),e.jsx("a",{href:"#contact",className:"pixel-button bg-[#ff00ff]",children:"CONTACT.bat"})]})]}),e.jsx(o.div,{className:"md:w-1/2 pixel-border p-8",initial:{opacity:0,x:50},animate:{opacity:1,x:0},transition:{duration:.8,ease:"easeOut"},children:e.jsxs("div",{className:"bg-black p-4 rounded",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(q,{className:"text-[#00ff00]"}),e.jsx("span",{className:"text-[#00ff00]",children:"terminal.exe"})]}),e.jsxs("div",{className:"font-[Extrude]",children:[e.jsx("p",{className:"text-[#00ff00]",children:"> Loading skills..."}),e.jsx("p",{className:"text-[#00ffff]",children:"> Python loaded ████████████ 100%"}),e.jsx("p",{className:"text-[#00ffff]",children:"> TensorFlow loaded ████████████ 100%"}),e.jsx("p",{className:"text-[#00ffff]",children:"> PyTorch loaded ████████████ 100%"}),e.jsx("p",{className:"text-[#ff00ff]",children:"> Neural networks initialized..."}),e.jsx("p",{className:"text-[#00ff00]",children:"> Ready for deployment_"})]})]})})]})})}var k=new Map,b=new WeakMap,I=0,X=void 0;function ee(t){return t?(b.has(t)||(I+=1,b.set(t,I.toString())),b.get(t)):"0"}function te(t){return Object.keys(t).sort().filter(i=>t[i]!==void 0).map(i=>`${i}_${i==="root"?ee(t.root):t[i]}`).toString()}function ae(t){const i=te(t);let a=k.get(i);if(!a){const r=new Map;let n;const s=new IntersectionObserver(l=>{l.forEach(c=>{var d;const x=c.isIntersecting&&n.some(u=>c.intersectionRatio>=u);t.trackVisibility&&typeof c.isVisible>"u"&&(c.isVisible=x),(d=r.get(c.target))==null||d.forEach(u=>{u(x,c)})})},t);n=s.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),a={id:i,observer:s,elements:r},k.set(i,a)}return a}function ie(t,i,a={},r=X){if(typeof window.IntersectionObserver>"u"&&r!==void 0){const d=t.getBoundingClientRect();return i(r,{isIntersecting:r,target:t,intersectionRatio:typeof a.threshold=="number"?a.threshold:0,time:0,boundingClientRect:d,intersectionRect:d,rootBounds:d}),()=>{}}const{id:n,observer:s,elements:l}=ae(a),c=l.get(t)||[];return l.has(t)||l.set(t,c),c.push(i),s.observe(t),function(){c.splice(c.indexOf(i),1),c.length===0&&(l.delete(t),s.unobserve(t)),l.size===0&&(s.disconnect(),k.delete(n))}}function se({threshold:t,delay:i,trackVisibility:a,rootMargin:r,root:n,triggerOnce:s,skip:l,initialInView:c,fallbackInView:d,onChange:x}={}){var u;const[g,D]=h.useState(null),j=h.useRef(),[v,A]=h.useState({inView:!!c,entry:void 0});j.current=x,h.useEffect(()=>{if(l||!g)return;let f;return f=ie(g,(T,w)=>{A({inView:T,entry:w}),j.current&&j.current(T,w),w.isIntersecting&&s&&f&&(f(),f=void 0)},{root:n,rootMargin:r,threshold:t,trackVisibility:a,delay:i},d),()=>{f&&f()}},[Array.isArray(t)?t.toString():t,g,n,r,s,l,a,d,i]);const N=(u=v.entry)==null?void 0:u.target,E=h.useRef();!g&&N&&!s&&!l&&E.current!==N&&(E.current=N,A({inView:!!c,entry:void 0}));const p=[D,v.inView,v.entry];return p.ref=p[0],p.inView=p[1],p.entry=p[2],p}function M(){const t=B(),[i,a]=se({threshold:.1,triggerOnce:!0,rootMargin:"-50px 0px"});return h.useEffect(()=>{a&&t.start("visible")},[t,a]),[i,t]}const ne=[{icon:e.jsx($,{className:"w-8 h-8"}),title:"Machine Learning",items:["TensorFlow","PyTorch","Scikit-learn","Neural Networks"]},{icon:e.jsx(Y,{className:"w-8 h-8"}),title:"Data Processing",items:["Pandas","NumPy","SQL","Data Visualization"]},{icon:e.jsx(W,{className:"w-8 h-8"}),title:"Programming",items:["Python","R","Java","C++"]},{icon:e.jsx(q,{className:"w-8 h-8"}),title:"Tools",items:["Docker","Linux","AWS","Jupyter"]},{icon:e.jsx(J,{className:"w-8 h-8"}),title:"Version Control",items:["Git","GitHub","MLflow","DVC"]},{icon:e.jsx(_,{className:"w-8 h-8"}),title:"Analytics",items:["Statistical Analysis","A/B Testing","Hypothesis Testing"]}],re={hidden:{opacity:0},visible:{opacity:1,transition:{delayChildren:.3,staggerChildren:.1}}},oe={hidden:{y:20,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5,ease:"easeOut"}}};function le(){const[t,i]=M();return e.jsx("section",{id:"skills",className:"py-20 bg-gray-50",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsx(o.h2,{className:"text-3xl font-bold text-center mb-12",initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:"Technical Skills"}),e.jsx(o.div,{ref:t,variants:re,initial:"hidden",animate:i,className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",children:ne.map((a,r)=>e.jsxs(o.div,{variants:oe,className:"bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[e.jsx(o.div,{whileHover:{rotate:360},transition:{duration:.6},className:"text-blue-600",children:a.icon}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800",children:a.title})]}),e.jsx("ul",{className:"space-y-2 flex-grow",children:a.items.map((n,s)=>e.jsxs("li",{className:"text-gray-600 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 bg-blue-500 rounded-full"}),n]},s))})]},r))})]})})}const ce=[{title:"Deep Learning for Medical Imaging",description:"Developed a CNN-based model for early detection of diseases in medical images, achieving 94% accuracy.",tech:["PyTorch","OpenCV","Docker"],image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400"},{title:"Natural Language Processing Pipeline",description:"Built an end-to-end NLP pipeline for sentiment analysis on social media data using BERT.",tech:["TensorFlow","BERT","AWS"],image:"https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400"},{title:"Time Series Forecasting",description:"Implemented LSTM networks for predicting stock market trends with feature engineering.",tech:["Keras","Pandas","Scikit-learn"],image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400"}],de={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.2}}},he={hidden:{y:30,opacity:0},visible:{y:0,opacity:1,transition:{duration:.6}}};function me(){const[t,i]=M();return e.jsx("section",{id:"projects",className:"py-20 bg-white",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsx(o.h2,{className:"text-3xl font-bold text-center mb-12",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},children:"Featured Projects"}),e.jsx(o.div,{ref:t,variants:de,initial:"hidden",animate:i,className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:ce.map((a,r)=>e.jsxs(o.div,{variants:he,className:"bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",children:[e.jsx(o.img,{src:a.image,alt:a.title,className:"w-full h-48 object-cover",whileHover:{scale:1.1},transition:{duration:.3}}),e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-3",children:a.title}),e.jsx("p",{className:"text-gray-600 mb-4 min-h-[120px]",children:a.description}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.tech.map((n,s)=>e.jsx(o.span,{className:"bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm",whileHover:{scale:1.1},transition:{duration:.2},children:n},s))})]})]},r))})]})})}function xe(){const[t,i]=M(),[a,r]=h.useState({name:"",email:"",message:""}),[n,s]=h.useState(!1),l=d=>{r({...a,[d.target.name]:d.target.value})},c=async d=>{d.preventDefault();try{(await fetch("https://portfolio-backend-4plr.onrender.com/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).ok?(s(!0),r({name:"",email:"",message:""})):alert("Failed to send message.")}catch(x){console.error("Error sending message:",x),alert("An error occurred.")}};return n?e.jsx("section",{id:"contact",className:"py-20 bg-black",children:e.jsxs("div",{className:"container mx-auto text-center",children:[e.jsx(o.h2,{className:"text-pixel font-arcade text-bright-yellow mb-4",initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},transition:{duration:.8},children:"🎉 ACHIEVEMENT UNLOCKED 🎉"}),e.jsx(o.p,{className:"text-pixel font-arcade text-bright-green mb-6",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:"Thank You for Getting in Touch!"}),e.jsx(o.div,{className:"text-pixel font-arcade text-white",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.4},children:"I’ll get back to you as soon as possible. 🚀"}),e.jsx(o.button,{className:"mt-8 px-6 py-3 bg-bright-pink text-black font-arcade rounded-lg hover:bg-bright-yellow transition-all",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},onClick:()=>s(!1),children:"Back to Contact"})]})}):e.jsx("section",{id:"contact",className:"py-20 bg-black",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsx(o.h2,{className:"text-pixel font-arcade text-bright-pink text-center mb-12",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6},children:"Get in Touch"}),e.jsx(o.div,{ref:t,initial:{opacity:0,y:30},animate:i,variants:{visible:{opacity:1,y:0}},transition:{duration:.6},className:"max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 text-bright-pink",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4 font-arcade",children:"Contact Information"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs(o.div,{className:"flex items-center gap-3",whileHover:{x:10},transition:{duration:.2},children:[e.jsx(C,{className:"text-bright-green"}),e.jsx("span",{children:"dsid271@gmail.com"})]}),e.jsxs(o.div,{className:"flex items-center gap-3",whileHover:{x:10},transition:{duration:.2},children:[e.jsx(Z,{className:"text-bright-green"}),e.jsx("span",{children:"+91 6309787190"})]}),e.jsxs(o.div,{className:"flex items-center gap-3",whileHover:{x:10},transition:{duration:.2},children:[e.jsx(K,{className:"text-bright-green"}),e.jsx("span",{children:"Hyderabad, India"})]})]})]}),e.jsxs("form",{onSubmit:c,className:"space-y-4",children:[e.jsxs(o.div,{children:[e.jsx("label",{className:"block text-sm font-medium text-bright-yellow mb-1 font-arcade",children:"Name"}),e.jsx("input",{type:"text",name:"name",value:a.name,onChange:l,className:"w-full px-4 py-2 border rounded-lg bg-black text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300",required:!0})]}),e.jsxs(o.div,{children:[e.jsx("label",{className:"block text-sm font-medium text-bright-yellow mb-1 font-arcade",children:"Email"}),e.jsx("input",{type:"email",name:"email",value:a.email,onChange:l,className:"w-full px-4 py-2 border rounded-lg bg-black text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300",required:!0})]}),e.jsxs(o.div,{children:[e.jsx("label",{className:"block text-sm font-medium text-bright-yellow mb-1 font-arcade",children:"Message"}),e.jsx("textarea",{name:"message",value:a.message,onChange:l,rows:4,className:"w-full px-4 py-2 border rounded-lg bg-black text-bright-green focus:ring-2 focus:ring-bright-pink focus:border-transparent transition-all duration-300",required:!0})]}),e.jsx(o.button,{type:"submit",className:"w-full bg-bright-pink text-black py-2 px-4 rounded-lg hover:bg-bright-yellow transition-all duration-300 font-arcade",children:"Send Message"})]})]})})]})})}function ue(){return e.jsx("footer",{className:"bg-gray-900 text-white py-12",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center",children:[e.jsxs("div",{className:"mb-6 md:mb-0",children:[e.jsx("h3",{className:"text-xl font-extrude",children:"Dondapati Sidhartha"}),e.jsx("p",{className:"text-gray-400",children:"ML Engineer | B.Tech Final Year"})]}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx("a",{href:"https://github.com/dsid271",className:"hover:text-blue-400 transition-colors",children:e.jsx(L,{size:20})}),e.jsx("a",{href:"https://www.linkedin.com/in/sidhartha-dondapati-90541827a/",className:"hover:text-blue-400 transition-colors",children:e.jsx(P,{size:20})}),e.jsx("a",{href:"mailto:dsid271@gmail.com",className:"hover:text-blue-400 transition-colors",children:e.jsx(C,{size:20})})]})]}),e.jsx("div",{className:"mt-8 text-center text-gray-400",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," Dondapati Sidhartha. All rights reserved."]})})]})})}function pe(){return e.jsxs("div",{className:"min-h-screen flex flex-col",children:[e.jsx(U,{}),e.jsxs("main",{className:"flex-grow",children:[e.jsx(Q,{}),e.jsx(le,{}),e.jsx(me,{}),e.jsx(xe,{})]}),e.jsx(ue,{})]})}H.createRoot(document.getElementById("root")).render(e.jsx(h.StrictMode,{children:e.jsx(pe,{})}));
//# sourceMappingURL=index-BFj2oyDt.js.map
