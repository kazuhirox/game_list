(this.webpackJsonpgame_list=this.webpackJsonpgame_list||[]).push([[0],{16:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),o=n(11),i=n.n(o),a=n(8),l=n(23),s=n(24),d=n(25),u=n(26),j=n(27),f=(n(16),n(1)),m="\u3059\u3079\u3066",b=[],O=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),i=Object(a.a)(o,2),O=i[0],h=i[1],p=Object(r.useState)(),v=Object(a.a)(p,2),x=v[0],g=v[1],S=Object(r.useState)(m),y=Object(a.a)(S,2),C=y[0],N=y[1];Object(r.useEffect)((function(){var e=localStorage.getItem("games");if(e){var t=JSON.parse(e).sort(w);b=Array.from(t),c(t),g(Array.from(new Set(t.map((function(e){return e.platform})))).sort((function(e,t){return(e=e.toString().toLowerCase())>(t=t.toString().toLowerCase())?1:t>e?-1:0})))}}),[]);var w=function(e,t){return e.platform<t.platform?-1:e.platform>t.platform?1:e.title<t.title?-1:e.title>t.title?1:0},J=function(e,t){var n=b,r=t||C;return e&&(n=n.filter((function(t){return t.title.toUpperCase().includes(e.toUpperCase())}))),r!==m&&(n=n.filter((function(e){return e.platform===r}))),n};return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)("div",{className:"card",children:Object(f.jsxs)("div",{className:"card-body",children:[Object(f.jsxs)(l.a,{children:[Object(f.jsx)(s.a,{type:"text",placeholder:"\u30b2\u30fc\u30e0\u30bf\u30a4\u30c8\u30eb",value:O,onChange:function(e){var t=e.target.value;h(t),c(J(t,C))}}),Object(f.jsxs)("select",{id:"selectPlatform",className:"form-select",onChange:function(e){var t=e.target.value;N(t),c(J(O,t))},children:[Object(f.jsx)("option",{selected:!0,value:m,children:m},m),null===x||void 0===x?void 0:x.map((function(e){return Object(f.jsx)("option",{value:e,children:e},e)}))]})]}),Object(f.jsx)("div",{className:"text-right",children:Object(f.jsx)(d.a,{color:"secondary",onClick:function(){c(b),h(""),N(m),document.getElementById("selectPlatform").selectedIndex=0},className:"m-1",children:"\u30af\u30ea\u30a2"})}),Object(f.jsxs)(u.a,{children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0"}),Object(f.jsx)("th",{onClick:function(){return c(n.sort((function(e,t){return e.title<t.title?-1:e.title>t.title?1:0})).filter((function(e){return e})))},children:"\u30bf\u30a4\u30c8\u30eb"})]})}),Object(f.jsx)("tbody",{children:null===n||void 0===n?void 0:n.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e.platform}),Object(f.jsx)("td",{children:e.title})]},e.id)}))})]})]})}),Object(f.jsx)("div",{className:"card",children:Object(f.jsxs)("div",{className:"card-body",children:[Object(f.jsxs)(l.a,{children:[Object(f.jsx)(j.a,{for:"importJson",children:"Json\u30d5\u30a1\u30a4\u30eb\u3092\u30a4\u30f3\u30dd\u30fc\u30c8"}),Object(f.jsx)(s.a,{type:"file",id:"importJson",onChange:function(e){var t,n,r=null===e||void 0===e||null===(t=e.target)||void 0===t||null===(n=t.files)||void 0===n?void 0:n.item(0);if(r){var o=new FileReader;o.onload=function(){var e,t=null===(e=o.result)||void 0===e?void 0:e.toString();if(t){var n=0,r=JSON.parse(t).sort(w).map((function(e){return e.id=n++,e}));b=Array.from(r),c(r),g(Array.from(new Set(r.map((function(e){return e.platform})))).sort((function(e,t){return(e=e.toString().toLowerCase())>(t=t.toString().toLowerCase())?1:t>e?-1:0}))),localStorage.clear(),localStorage.setItem("games",JSON.stringify(r))}},o.readAsText(r)}}})]}),Object(f.jsx)("div",{className:"text-left",children:Object(f.jsx)(d.a,{color:"secondary",onClick:function(){var e=0,t=b.sort(w).map((function(t){return t.id=e++,t})).filter((function(e){return e})),n=JSON.stringify(t),r=new Blob([n],{type:"text/plain"}),c=URL.createObjectURL(r),o=document.createElement("a");document.body.appendChild(o),o.download="games.json",o.href=c,o.click(),o.remove(),URL.revokeObjectURL(c)},className:"mt-2",children:"Json\u30d5\u30a1\u30a4\u30eb\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8"})})]})})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,28)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),o(e),i(e)})).catch((function(e){return console.error(e)}))};n(20);i.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(O,{})}),document.getElementById("root")),h()}},[[21,1,2]]]);
//# sourceMappingURL=main.e36ee5c0.chunk.js.map