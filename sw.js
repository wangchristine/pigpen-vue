if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B_GhhsqF.css",revision:null},{url:"assets/index-Bo8Qo5mN.js",revision:null},{url:"index.html",revision:"df7d5c8ae4817405e49456c0d56dcc4c"},{url:"registerSW.js",revision:"5d34045a5962868532fad0cf6bebb40f"},{url:"icon-192x192.png",revision:"d2f3932572bdebf8bba6291744768942"},{url:"icon-512x512.png",revision:"030b251f98ccf05c930e92e68598f272"},{url:"manifest.webmanifest",revision:"4d1399c4fc2aa0f79015e17dd77b27bb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
