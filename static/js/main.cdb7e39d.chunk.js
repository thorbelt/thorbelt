(this.webpackJsonpthorbelt=this.webpackJsonpthorbelt||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(8),c=n.n(r),o=(n(14),n(3)),i=n(2),l=n(5),d=n.n(l),u=n(6),j={},p=[];function h(e,t){var n=Object(a.useState)(j[e]||t),s=Object(i.a)(n,2),r=s[0],c=s[1];Object(a.useEffect)((function(){var n=function(){(r!==j[e]||t)&&c(j[e]||t)};return p.push(n),function(){return p.splice(p.indexOf(n),1)}}),[]);return[r,function(t){j[e]=t,p.forEach((function(e){return e()}))}]}function b(e,t){return f("midgard",e,"/v2"+t)}function x(e,t){return f("thornode",e,t)}function f(e,t,n){return fetch("https://".concat("testnet"===t?"testnet.":"").concat(e,".thorchain.info").concat(n)).then(function(){var e=Object(u.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(200===t.status){e.next=8;break}return e.t0=Error,e.t1="Non 2xx response code: "+t.status+": ",e.next=5,t.text();case 5:throw e.t2=e.sent,e.t3=e.t1+e.t2,new e.t0(e.t3);case 8:return e.abrupt("return",t.json());case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}function m(e,t){return Object.assign(Object.assign({},e),t)}function O(e,t,n){for(var a=e.toString(),s=a.length;s<t;s++)a=n+a;return a}function v(e){return e.slice(0,8)+"\u2026"+e.slice(-4)}function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(e=parseFloat(e)).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g,"$1 "),a=t>0?"."+e.toFixed(t).split(".")[1]:"";return n+a}function g(e){var t=new Date(e);return[t.getFullYear(),O(t.getMonth()-1,2,"0"),O(t.getDate(),2,"0")].join("-")}function k(e){var t=new Date(e);return[O(t.getHours(),2,"0"),O(t.getMinutes(),2,"0"),O(t.getSeconds(),2,"0")].join(":")}function y(e){return 0===e.indexOf("thor")?43===e.length&&e.match(/^thor[a-z0-9]{39}$/):0===e.indexOf("tthor")&&(44===e.length&&e.match(/^tthor[a-z0-9]{39}$/))}window.globalState=j;var N={testnet:"BNB.BUSD-74E",mainnet:"BNB.BUSD-BD1"},C=JSON.stringify([{name:"default",root:{type:"node",size:100,data:{type:"empty"}}}]),S={selected:null,connected:null,watched:[]},W=n(0);var I=function(e){var t="icon h-6 w-6";switch(e.name){case"plus":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})});case"trash":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})});case"edit":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})});case"save":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"})});case"times":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})});case"arrows-alt-v":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"})});case"arrows-alt-h":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"})});case"chevron-up":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 15l7-7 7 7"})});case"chevron-down":return Object(W.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(W.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})});default:throw new Error("Unknow icon name: "+e.name)}};function E(e){var t=e.title,n=e.path,a=e.updateWorkspace,s=e.children;function r(){a((function(e){return Object.assign(e,{data:{type:"empty"}})}),n)}function c(e){a((function(t){return"vertically"===e?{type:"vsplit",size:t.size,top:Object.assign(t,{size:50}),bottom:{type:"node",size:50,data:{type:"empty"}}}:{type:"hsplit",size:t.size,left:Object.assign(t,{size:50}),right:{type:"node",size:50,data:{type:"empty"}}}}),n)}return Object(W.jsxs)("div",{className:"box",children:[Object(W.jsxs)("div",{className:"box-header",children:[Object(W.jsx)("span",{className:"box-header-title",title:"Change panel type",onClick:r,children:t}),Object(W.jsx)("div",{className:"box-header-icon",title:"Close",onClick:function(){0!==n.length?a((function(){return null}),n):r()},children:Object(W.jsx)(I,{name:"times"})}),Object(W.jsx)("div",{className:"box-header-icon",title:"Split Horizontally",onClick:c.bind(null,"horizontally"),children:Object(W.jsx)(I,{name:"arrows-alt-h"})}),Object(W.jsx)("div",{className:"box-header-icon",title:"Split Vertically",onClick:c.bind(null,"vertically"),children:Object(W.jsx)(I,{name:"arrows-alt-v"})})]}),Object(W.jsx)("div",{className:"box-contents",children:s})]})}function L(e){var t=e.path,n=e.updateWorkspace;function a(e,a){a.preventDefault();n((function(t){return m(t,{data:{type:e}})}),t)}return Object(W.jsx)(E,{title:"Empty",path:t,updateWorkspace:n,children:Object(W.jsxs)("div",{children:[Object(W.jsx)("br",{}),Object(W.jsx)("p",{className:"text-center",children:"select a panel type:"}),Object(W.jsxs)("div",{className:"node-empty",children:[Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"stats"),children:[Object(W.jsx)("strong",{children:"stats."}),Object(W.jsx)("span",{children:"global thorchain stats."})]}),Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"pools"),children:[Object(W.jsx)("strong",{children:"pools."}),Object(W.jsx)("span",{children:"list of thorchain pools."})]}),Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"wallet"),children:[Object(W.jsx)("strong",{children:"wallet."}),Object(W.jsx)("span",{children:"your rune, synth and lp balances."})]}),Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"chart"),children:[Object(W.jsx)("strong",{children:"chart."}),Object(W.jsx)("span",{children:"price chart for a pool."})]}),Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"history"),children:[Object(W.jsx)("strong",{children:"history."}),Object(W.jsx)("span",{children:"action history for current address."})]}),Object(W.jsxs)("button",{className:"button",onClick:a.bind(null,"manualTransaction"),children:[Object(W.jsx)("strong",{children:"manual transaction."}),Object(W.jsx)("span",{children:"send in a manual thorchain transaction."})]})]})]})})}function M(e){var t=e.path,n=e.updateWorkspace,a=h("stats"),s=Object(i.a)(a,1)[0];return Object(W.jsx)(E,{title:"Stats",path:t,updateWorkspace:n,children:s?Object(W.jsxs)("div",{className:"node-empty",children:[Object(W.jsxs)("button",{className:"button",children:[Object(W.jsxs)("strong",{className:"text-primary",children:["$",w(2*parseInt(s.runeDepth)/Math.pow(10,8)*parseFloat(s.runePriceUSD))]}),Object(W.jsx)("span",{children:"total liquidity"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsxs)("strong",{children:["$",w(parseInt(s.swapVolume)/Math.pow(10,8)*parseFloat(s.runePriceUSD))]}),Object(W.jsx)("span",{children:"total swap volume"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.swapCount24h)}),Object(W.jsx)("span",{children:"24h swap count"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.dailyActiveUsers)}),Object(W.jsx)("span",{children:"24h active users"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.swapCount30d)}),Object(W.jsx)("span",{children:"30d swap count"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.monthlyActiveUsers)}),Object(W.jsx)("span",{children:"30d active users"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.swapCount)}),Object(W.jsx)("span",{children:"total swap count"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsx)("strong",{children:w(s.uniqueSwapperCount)}),Object(W.jsx)("span",{children:"unique users"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsxs)("strong",{children:["$",w(s.runePriceUSD,2)]}),Object(W.jsx)("span",{children:"rune price"})]}),Object(W.jsxs)("button",{className:"button",children:[Object(W.jsxs)("strong",{children:["$",w(parseFloat(s.impermanentLossProtectionPaid)/Math.pow(10,8)*parseFloat(s.runePriceUSD))]}),Object(W.jsx)("span",{children:"il paid"})]})]}):"loading..."})}var B=n(4);function D(e){var t=e.headers,n=e.rows,s=e.defaultSort,r=e.onSortChange,c=e.filters,o=e.onFilterChange,l=Object(a.useState)(c||{}),d=Object(i.a)(l,2),u=d[0],j=d[1],p=Object(a.useState)(s||"+"+t[0].id),h=Object(i.a)(p,2),b=h[0],x=h[1];function f(e,t){var n=null;"all"!==t.target.value&&(n=t.target.value);var a=m(u,Object(B.a)({},e,n));j(a),o&&o(a)}function O(e){var t;t=b&&b.slice(1)===e?("+"===b[0]?"-":"+")+b.slice(1):"+"+e,x(t),r&&r(t)}var v,w=n.filter((function(e){for(var t in u)if(u[t]&&e[t]!==u[t])return!1;return!0})),g=b.slice(1);v=function(e){return g+"Value"in e?e[g+"Value"]:e[g]},w=w.sort((function(e,t){var n=v(e),a=v(t);return"number"===typeof n?n-a:n>a})),"-"===b[0]&&(w=w.reverse());return Object(W.jsxs)("table",{className:"trading-table",children:[Object(W.jsxs)("thead",{children:[Object(W.jsx)("tr",{children:t.map((function(e){return Object(W.jsx)("th",{className:e.class,style:e.style||{},children:e.filter?Object(W.jsxs)("select",{onChange:f.bind(null,e.id),value:u[e.id]||"all",children:[Object(W.jsx)("option",{value:"all",children:"all"}),(t=e.id,n.map((function(e){return e[t]})).filter((function(e,t,n){return n.indexOf(e)===t})).sort()).map((function(e){return Object(W.jsx)("option",{value:e,children:e},e)}))]}):null},e.id);var t}))}),Object(W.jsx)("tr",{children:t.map((function(e){return Object(W.jsxs)("th",{className:e.class,style:e.style||{},onClick:O.bind(null,e.id),children:[b.slice(1)===e.id?b[0]:"",e.name||e.id]},e.id)}))})]}),Object(W.jsx)("tbody",{children:w.map((function(e,n){return Object(W.jsx)("tr",{children:t.map((function(t){return Object(W.jsx)("td",{className:t.class+" "+e[t.id+"Class"]||"",style:t.style||{},title:e[t.id+"Title"]||"",children:e[t.id]},t.id)}))},n)}))})]})}function R(e){var t=e.data,n=e.path,a=e.updateWorkspace,s=h("pools",[]);function r(e,t){a((function(n){return m(n,{data:m(n.data,Object(B.a)({},e,t))})}),n)}var c=Object(i.a)(s,1)[0].map((function(e){return{asset:e.asset,status:e.status,price:w(e.price,2),priceValue:e.price,apy:w(100*e.apy,2),apyValue:e.apy,depth:w(e.depth),depthValue:e.depth,volume:w(e.volume),volumeValue:e.volume}}));return Object(W.jsx)(E,{title:"Pools",path:n,updateWorkspace:a,children:Object(W.jsx)(D,{headers:[{id:"asset",filter:!0},{id:"status",filter:!0},{id:"price",class:"text-right"},{id:"apy",class:"text-right"},{id:"depth",class:"text-right"},{id:"volume",name:"volume (24h)",class:"text-right"}],rows:c,filters:t.filters,onFilterChange:r.bind(null,"filters"),defaultSort:t.sort,onSortChange:r.bind(null,"sort")})})}function z(e){var t=e.data,n=e.path,s=e.updateWorkspace,r=h("wallets",{}),c=Object(i.a)(r,1)[0].selected,o=h("stats"),l=Object(i.a)(o,1)[0],d=h("pools",[]),u=Object(i.a)(d,1)[0],j=Object(a.useState)([]),p=Object(i.a)(j,2),f=p[0],O=p[1],v=Object(a.useState)([]),k=Object(i.a)(v,2),y=k[0],N=k[1];function C(e,t){s((function(n){return m(n,{data:m(n.data,Object(B.a)({},e,t))})}),n)}Object(a.useEffect)((function(){if(null===c||void 0===c?void 0:c.address){O([]),t();var e=setInterval(t,5e3);return function(){return clearInterval(e)}}function t(){b(c.network,"/member/"+c.address).then((function(e){return O(e.pools)}),(function(){})),x(c.network,"/cosmos/bank/v1beta1/balances/"+c.address).then((function(e){return N(e.balances)}),(function(){}))}}),[c]);var S=[];return y.forEach((function(e){if(l){var t="rune"===e.denom?parseFloat(l.runePriceUSD):0,n=parseInt(e.amount)/Math.pow(10,8);S.push({asset:e.denom,value:w(n*t),valueValue:n*t,assetAmount:w(n,2),assetAmountValue:n,assetRemoved:"",runeAdded:"",runeRemoved:"",start:""})}})),f.forEach((function(e){var t=u.find((function(t){return t.asset===e.pool}));if(t){var n=(parseInt(e.assetAdded)-parseInt(e.assetWithdrawn))/Math.pow(10,8),a=n*t.price*2;S.push({asset:e.pool+" Pool",value:w(a),valueValue:a,assetAmount:w(n,2),assetAmountValue:n,assetRemoved:w(parseInt(e.assetWithdrawn)/Math.pow(10,8),2),assetRemovedValue:parseInt(e.assetWithdrawn),runeAdded:w(parseInt(e.runeAdded)/Math.pow(10,8),1),runeAddedValue:parseInt(e.runeAdded),runeRemoved:w(parseInt(e.assetWithdrawn)/Math.pow(10,8),1),runeRemovedValue:parseInt(e.assetWithdrawn),start:g(1e3*parseInt(e.dateFirstAdded))})}})),Object(W.jsx)(E,{title:"Wallet",path:n,updateWorkspace:s,children:Object(W.jsx)(D,{headers:[{id:"asset",filter:!0},{id:"value",class:"text-right"},{id:"assetAmount",name:"asset",class:"text-right"},{id:"assetRemoved",name:"-asset",class:"text-right"},{id:"runeAdded",name:"rune",class:"text-right"},{id:"runeRemoved",name:"-rune",class:"text-right"},{id:"start",name:"first added",class:"text-right"}],rows:S,filters:t.filters,onFilterChange:C.bind(null,"filters"),defaultSort:t.sort,onSortChange:C.bind(null,"sort")})})}var F=n(9);function A(e){var t=e.data,n=e.path,s=e.updateWorkspace,r=Object(a.useRef)(),c=h("wallets",{}),o=Object(i.a)(c,1)[0].selected,l=h("pools",[]),d=Object(i.a)(l,1)[0],u=Object(a.useState)(t.asset||"BTC.BTC"),j=Object(i.a)(u,2),p=j[0],x=j[1],f=Object(a.useState)(t.range||"1d"),O=Object(i.a)(f,2),v=O[0],g=O[1],k=Object(a.useState)(),y=Object(i.a)(k,2),C=y[0],S=y[1],I=d.find((function(e){return e.asset===p})),L=I?I.price:0;if("THOR.RUNE"===p){var M=d.find((function(e){return e.asset===N[o.network]}));M&&(L=M.depthAsset/M.depthRune)}function B(e,t){var n={"1d":"interval=5min&count=288","1w":"interval=hour&count=168","3m":"interval=day&count=90","1y":"interval=day&count=365"},a=o?o.network:"mainnet";"THOR.RUNE"===e?b(a,"/history/depths/"+N[a]+"?"+n[t]).then((function(e){return S(e.intervals.map((function(e){return m(e,{assetPriceUSD:1/parseFloat(e.assetPrice)})})))}),(function(){})):b(a,"/history/depths/"+e+"?"+n[t]).then((function(e){return S(e.intervals)}),(function(){}))}return Object(a.useEffect)((function(){B(p,v);var e=setInterval((function(){return B(p,v)}),15e3);return function(){return clearInterval(e)}}),[p,v]),Object(a.useEffect)((function(){var e=r.current;if(e&&C){for(;e.lastChild;)e.removeChild(e.lastChild);var t=e.getBoundingClientRect(),n=Object(F.a)(e,{width:t.width,height:t.height,layout:{backgroundColor:"#111827",textColor:"#ffffff",fontSize:12,fontFamily:"IBM Plex Mono"},vertLines:{color:"rgba(40,40,40,0.2)",style:1,visible:!0},horzLines:{color:"rgba(40,40,40,0.2)",style:1,visible:!0},timeScale:{fixLeftEdge:!0,timeVisible:!0}});n.addAreaSeries({bottomColor:"rgba(35, 220, 200, 0.5)",lineColor:"rgba(35, 220, 200, 1)"}).setData(C.map((function(e){return{time:parseInt(e.startTime),value:parseFloat(e.assetPriceUSD)}}))),n.timeScale().setVisibleLogicalRange({from:0,to:C.length})}}),[r.current,C]),Object(W.jsx)(E,{title:"Chart",path:n,updateWorkspace:s,children:Object(W.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:[Object(W.jsxs)("div",{style:{display:"flex",padding:"4px"},children:[Object(W.jsxs)("select",{value:p,onChange:function(e){var t=e.target.value;x(t),s((function(e){return m(e,{data:m(e.data,{asset:t})})}),n)},style:{padding:"4px 8px",width:"100px",marginRight:"8px"},children:[Object(W.jsx)("option",{value:"THOR.RUNE",children:"THOR.RUNE"}),d.sort((function(e,t){return e.depth-t.depth})).map((function(e){return Object(W.jsx)("option",{value:e.asset,children:e.asset.slice(0,12)},e.asset)}))]}),Object(W.jsxs)("select",{value:v,onChange:function(e){var t=e.target.value;g(t),s((function(e){return m(e,{data:m(e.data,{range:t})})}),n)},style:{padding:"4px 8px",width:"100px"},children:[Object(W.jsx)("option",{value:"1d",children:"past day"}),Object(W.jsx)("option",{value:"1w",children:"past week"}),Object(W.jsx)("option",{value:"3m",children:"past 3 months"}),Object(W.jsx)("option",{value:"1y",children:"past year"})]}),Object(W.jsx)("div",{style:{flex:"1"}}),Object(W.jsx)("div",{children:w(L,3)})]}),Object(W.jsx)("div",{style:{flex:"1"},ref:r})]})})}function V(e){var t=e.data,n=e.path,s=e.updateWorkspace,r=h("wallets",{}),c=Object(i.a)(r,1)[0].selected,o=h("pools"),l=(Object(i.a)(o,1)[0],Object(a.useState)([])),d=Object(i.a)(l,2),u=d[0],j=d[1];function p(e,t){s((function(n){return m(n,{data:m(n.data,Object(B.a)({},e,t))})}),n)}Object(a.useEffect)((function(){(null===c||void 0===c?void 0:c.address)&&(j([]),b(c.network,"/actions?limit=50&offset=0&address="+c.address).then((function(e){return j(e.actions)}),(function(){})))}),[c]);var x=[];return u.forEach((function(e){var t="",n="",a=0;"switch"===e.type&&(t=e.in[0].coins[0].asset,n=e.out[0].coins[0].asset,a=parseInt(e.out[0].coins[0].amount)/Math.pow(10,8)),"addLiquidity"===e.type&&(t=e.pools[0],n=e.in[0].coins[0].asset,a=parseInt(e.in[0].coins[0].amount)/Math.pow(10,8)),"withdraw"===e.type&&(t=e.pools[0],n=e.out[0].coins[0].asset,a=parseInt(e.out[0].coins[0].amount)/Math.pow(10,8)),"swap"===e.type&&(t=e.in[0].coins[0].asset,e.out.length>0&&(n=e.out[0].coins[0].asset,a=parseInt(e.out[0].coins[0].amount)/Math.pow(10,8))),x.push({time:g(parseInt(e.date)/1e6).slice(2)+" "+k(parseInt(e.date)/1e6),timeValue:parseInt(e.date),type:e.type,status:e.status,asset:t,asset2:n,amount:w(a,2),amountValue:a})})),Object(W.jsx)(E,{title:"History",path:n,updateWorkspace:s,children:Object(W.jsx)(D,{headers:[{id:"time",class:"w-datetime"},{id:"type",filter:!0},{id:"status",filter:!0},{id:"asset",filter:!0},{id:"asset2",filter:!0},{id:"amount",class:"text-right"}],rows:x,filters:t.filters,onFilterChange:p.bind(null,"filters"),defaultSort:t.sort||"-time",onSortChange:p.bind(null,"sort")})})}function P(e,t){var n=t.from,a=t.memo,s=t.asset,r=t.recipient,c=t.amount;return new Promise((function(t,o){if(!window.xfi||!window.xfi.thorchain||!n)return o(new Error("xdefi wallet not connected"));window.xfi.thorchain.request({method:e,params:[{from:n,memo:a,asset:s,recipient:r,amount:{amount:c,decimals:8}}]},(function(e,n){if(e)return o(e);t(n)}))}))}function U(e){var t,n,s=e.data,r=e.path,c=e.updateWorkspace,o=h("wallets",{}),l=Object(i.a)(o,1)[0].selected,j=Object(a.useState)(""),p=Object(i.a)(j,2),b=p[0],x=p[1],f=Object(a.useState)(!1),O=Object(i.a)(f,2),v=O[0],w=O[1],g=Object(a.useState)(),k=Object(i.a)(g,2),N=k[0],C=k[1],S=Object(a.useState)(m({type:"transfer",action:"swap",percent:"100"},s.options||{})),I=Object(i.a)(S,2),L=I[0],M=I[1];function D(){var e=L.asset,t=void 0===e?"":e,n=L.address,a=void 0===n?"":n,s=L.limit,r=void 0===s?"":s,c=L.percent,o=parseInt(100*parseFloat(void 0===c?"":c)),i=L.action.toUpperCase();return"swap"===L.action?i+=":".concat(t,":").concat(a,":").concat(r):"add"===L.action?i+=":".concat(t,":").concat(a):"withdraw"===L.action?i+=":".concat(t,":").concat(o).concat(L.assym?":"+L.assym:""):"bond"===L.action||"leave"===L.action?i+=":".concat(a):"unbond"===L.action&&(i+=":".concat(a,":").concat(o)),i}function R(e,t){var n=m(L,Object(B.a)({},e,t));M(n);c((function(e){return m(e,{data:m(e.data,{options:n})})}),r)}function z(){return(z=Object(u.a)(d.a.mark((function e(t){var n,a,s,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),x(""),w(!0),null===l||void 0===l?void 0:l.address){e.next=5;break}return e.abrupt("return",x("no wallet connected"));case 5:if(n=parseInt(parseFloat(L.amount)*Math.pow(10,8)),!Number.isNaN(n)){e.next=8;break}return e.abrupt("return",x("amount is not a valid number"));case 8:if("transfer"!==L.type){e.next=13;break}if(y(L.address)){e.next=11;break}return e.abrupt("return",x("recipient address is not valid"));case 11:e.next=14;break;case 13:"deposit"===L.type&&["swap"].includes(L.action);case 14:if(e.prev=14,w(!1),"transfer"!==L.type){e.next=23;break}return e.next=19,P("transfer",{from:l.address,amount:n,recipient:L.address});case 19:a=e.sent,C(a),e.next=29;break;case 23:if("deposit"!==L.type){e.next=29;break}return s=D(),e.next=27,P("deposit",{from:l.address,amount:n,memo:s});case 27:r=e.sent,C(r);case 29:e.next=35;break;case 31:e.prev=31,e.t0=e.catch(14),console.error(e.t0),x(e.t0.toString());case 35:return e.prev=35,w(!1),e.finish(35);case 38:case"end":return e.stop()}}),e,null,[[14,31,35,38]])})))).apply(this,arguments)}return Object(W.jsx)(E,{title:"Manual Transaction",path:r,updateWorkspace:c,children:Object(W.jsxs)("form",{className:"p-2",onSubmit:function(e){return z.apply(this,arguments)},children:[Object(W.jsxs)("div",{className:"row mb-2",children:[Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"type"}),Object(W.jsxs)("select",{value:L.type,onChange:function(e){return R("type",e.target.value)},children:[Object(W.jsx)("option",{value:"transfer",children:"transfer"}),Object(W.jsx)("option",{value:"deposit",children:"deposit"})]})]}),Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"input amount"}),Object(W.jsx)("input",{type:"text",value:L.amount||"",onChange:function(e){return R("amount",e.target.value)},placeholder:"0.0"})]})]}),"deposit"===L.type?Object(W.jsxs)("div",{children:[Object(W.jsxs)("div",{className:"row mb-2",children:[Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"action"}),Object(W.jsxs)("select",{value:L.action,onChange:function(e){return R("action",e.target.value)},children:[Object(W.jsx)("option",{value:"swap",children:"swap"}),Object(W.jsx)("option",{value:"add",children:"add"}),Object(W.jsx)("option",{value:"withdraw",children:"withdraw"}),Object(W.jsx)("option",{value:"bond",children:"bond"}),Object(W.jsx)("option",{value:"unbond",children:"unbond"}),Object(W.jsx)("option",{value:"leave",children:"leave"})]})]}),["swap","add","withdraw"].includes(L.action)?Object(W.jsxs)("div",{children:[Object(W.jsx)("label",{children:"asset"}),Object(W.jsx)("input",{type:"text",value:L.asset||"",onChange:function(e){return R("asset",e.target.value)},placeholder:"e.g. BTC.BTC"})]}):null,["bond","unbond","leave"].includes(L.action)?Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"address"}),Object(W.jsx)("input",{type:"text",value:L.address||"",onChange:function(e){return R("address",e.target.value)},placeholder:"e.g. thor1a2b3c..."})]}):null]}),Object(W.jsxs)("div",{className:"row mb-2",children:[["swap","add"].includes(L.action)?Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"address (optional)"}),Object(W.jsx)("input",{type:"text",value:L.address||"",onChange:function(e){return R("address",e.target.value)},placeholder:"e.g. thor1a2b3c..."})]}):null,"swap"===L.action?Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"limit"}),Object(W.jsx)("input",{type:"text",value:L.limit||"",onChange:function(e){return R("limit",e.target.value)}})]}):null,["withdraw","unbond"].includes(L.action)?Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("label",{children:"percentage"}),Object(W.jsx)("input",{type:"number",min:"0",max:"100",step:"0.01",value:L.percent||"",onChange:function(e){return R("percent",e.target.value)}})]}):null,["withdraw"].includes(L.action)?Object(W.jsxs)("div",{children:[Object(W.jsx)("label",{children:"assym. asset (optional)"}),Object(W.jsx)("input",{type:"text",value:L.assym||"",onChange:function(e){return R("assym",e.target.value)},placeholder:"e.g. THOR.RUNE"})]}):null]})]}):Object(W.jsxs)("div",{className:"mb-2",children:[Object(W.jsx)("label",{children:"recipient address"}),Object(W.jsx)("input",{type:"text",value:L.address||"",onChange:function(e){return R("address",e.target.value)},placeholder:"e.g. thor1a2b3c..."})]}),"deposit"===L.type?Object(W.jsxs)("div",{className:"truncate mb-2",children:["memo: ",D()]}):null,b?Object(W.jsx)("div",{className:"text-red mb-2",children:b}):null,Object(W.jsx)("button",{type:"submit",className:"btn w-full mb-2",disabled:v,children:v?"loading...":"submit"}),N?Object(W.jsxs)("div",{className:"truncate",children:["tx:"," ",Object(W.jsx)("a",{href:(t=l.network,n=N,"https://".concat("testnet"===t?"testnet.":"","thorchain.net/#/txs/").concat(n)),target:"_blank",children:N})]}):null]})})}function H(e){var t=e.type,n=e.size,s=e.data,r=e.path,c=e.updateWorkspace,l=e.top,d=e.bottom,u=e.left,j=e.right,p=Object(a.useRef)(),h=Object(a.useState)(!1),b=Object(i.a)(h,2),x=b[0],f=b[1],O=function(e){var n=p.current,a=n.querySelectorAll(".workspace-node"),s=n.getBoundingClientRect(),o=(("hsplit"===t?e.clientX:e.clientY)-("hsplit"===t?s.left:s.top))/("hsplit"===t?s.width:s.height)*100;o=Math.min(85,Math.max(15,o)),o=5*Math.round(o/5),a[0].style.flexBasis=o+"%",a[1].style.flexBasis=100-o+"%","hsplit"===t?(c((function(e){return m(e,{size:o})}),r.concat(["left"])),c((function(e){return m(e,{size:100-o})}),r.concat(["right"]))):(c((function(e){return m(e,{size:o})}),r.concat(["top"])),c((function(e){return m(e,{size:100-o})}),r.concat(["bottom"])))};function v(){f(!0)}function w(){f(!1),window.removeEventListener("mousemove",O)}Object(a.useEffect)((function(){if(x)return window.addEventListener("mouseup",w),window.addEventListener("mousemove",O),function(){window.removeEventListener("mouseup",w),window.removeEventListener("mousemove",O)}}),[x]);switch(t){case"vsplit":return Object(W.jsxs)("div",{ref:p,className:"workspace-node workspace-vsplit "+(x?"is-dragging":""),style:{flexBasis:n+"%"},children:[Object(W.jsx)(H,Object(o.a)(Object(o.a)({},l),{},{path:r.concat(["top"]),updateWorkspace:c})),Object(W.jsx)("div",{className:"workspace-resize-handle "+(x?"is-dragging":""),onMouseDown:v}),Object(W.jsx)(H,Object(o.a)(Object(o.a)({},d),{},{path:r.concat(["bottom"]),updateWorkspace:c}))]});case"hsplit":return Object(W.jsxs)("div",{ref:p,className:"workspace-node workspace-hsplit "+(x?"is-dragging":""),style:{flexBasis:n+"%"},children:[Object(W.jsx)(H,Object(o.a)(Object(o.a)({},u),{},{path:r.concat(["left"]),updateWorkspace:c})),Object(W.jsx)("div",{className:"workspace-resize-handle "+(x?"is-dragging":""),onMouseDown:v}),Object(W.jsx)(H,Object(o.a)(Object(o.a)({},j),{},{path:r.concat(["right"]),updateWorkspace:c}))]});case"node":return Object(W.jsx)("div",{ref:p,className:"workspace-node",style:{flexBasis:n+"%"},children:function(){switch(s.type){case"empty":return Object(W.jsx)(L,{data:s,path:r,updateWorkspace:c});case"stats":return Object(W.jsx)(M,{data:s,path:r,updateWorkspace:c});case"pools":return Object(W.jsx)(R,{data:s,path:r,updateWorkspace:c});case"wallet":return Object(W.jsx)(z,{data:s,path:r,updateWorkspace:c});case"chart":return Object(W.jsx)(A,{data:s,path:r,updateWorkspace:c});case"history":return Object(W.jsx)(V,{data:s,path:r,updateWorkspace:c});case"manualTransaction":return Object(W.jsx)(U,{data:s,path:r,updateWorkspace:c});default:throw new Error("Unknown terminal node type: "+s.type)}}()});default:throw new Error("Unknown node type: "+t)}}function T(e){var t=e.onClose,n=h("wallets",S),s=Object(i.a)(n,2),r=s[0],c=s[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),d=l[0],u=l[1],j=Object(a.useState)(""),p=Object(i.a)(j,2),b=p[0],x=p[1];function f(e){c(m(r,{selected:e})),t()}function O(e,t){t.stopPropagation(),navigator.clipboard.writeText(e.address)}function w(e,t){t.stopPropagation(),c(m(r,{watched:r.watched.filter((function(t,n){return n!==e}))}))}return Object(a.useEffect)((function(){var e=function(e){t&&"Escape"===e.key&&t()};return window.addEventListener("keyup",e),function(){return window.removeEventListener("keyup",e)}}),[]),Object(W.jsxs)("div",{className:"modal",onClick:t,children:[Object(W.jsx)("div",{className:"modal-overlay"}),Object(W.jsxs)("div",{className:"modal-content",onClick:function(e){return e.stopPropagation()},children:[Object(W.jsx)("h1",{children:"Wallets"}),Object(W.jsx)("div",{className:"text-bold mb-2 mt-4",children:"Connected"}),r.connected?Object(W.jsxs)("div",{className:"row p-2 bg-gray-800 rounded pointer hover:opacity-75",onClick:f.bind(null,r.connected),children:[Object(W.jsxs)("div",{children:[v(r.connected.address)," (",r.connected.network,")"]}),Object(W.jsxs)("div",{className:"flex-shrink text-right",children:[Object(W.jsx)("a",{className:"ml-2",onClick:O.bind(null,r.connected),children:"Copy"}),Object(W.jsx)("a",{className:"ml-2",onClick:function(e){e.stopPropagation();var t=r.selected;t.address===r.connected.address&&(t=null),c(m(r,{connected:null,selected:t}))},children:"Remove"})]})]}):Object(W.jsx)("button",{className:"btn w-full",onClick:function(){if(!window.xfi||!window.xfi.thorchain)return alert("XDEFI is not installed!");window.xfi.thorchain.request({method:"request_accounts",params:[]},(function(e,t){if(e)return console.log(e),alert("Error connecting to XDEFI: "+e.message);var n={type:"xdefi",address:t[0],network:window.xfi.thorchain.network};c(m(r,{connected:n,selected:n}))}))},children:"Connect XDEFI"}),Object(W.jsx)("div",{className:"text-bold mb-2 mt-4",children:"Watched"}),r.watched.map((function(e,t){return Object(W.jsxs)("div",{className:"row p-2 mb-2 bg-gray-800 rounded pointer hover:opacity-75",onClick:f.bind(null,e),children:[Object(W.jsxs)("div",{children:[v(e.address)," ",e.label?"(".concat(e.label,")"):""," (",e.network,")"]}),Object(W.jsxs)("div",{className:"flex-shrink text-right",children:[Object(W.jsx)("a",{className:"ml-2",onClick:O.bind(null,e),children:"Copy"}),Object(W.jsx)("a",{className:"ml-2",onClick:w.bind(null,t),children:"Remove"})]})]},e.address)})),Object(W.jsxs)("form",{className:"row",onSubmit:function(e){e.preventDefault();var t={type:"watched",address:d,network:d.startsWith("thor")?"mainnet":"testnet",label:b};u(""),x(""),c(m(r,{watched:r.watched.concat([t])}))},children:[Object(W.jsxs)("div",{style:{flex:"1"},children:[Object(W.jsx)("label",{children:"Address"}),Object(W.jsx)("input",{type:"text",value:d,onChange:function(e){return u(e.target.value)}})]}),Object(W.jsxs)("div",{style:{flex:"0 0 150px"},children:[Object(W.jsx)("label",{children:"Label (opt)"}),Object(W.jsx)("input",{type:"text",value:b,onChange:function(e){return x(e.target.value)}})]}),Object(W.jsxs)("div",{style:{flex:"0 0 60px"},children:[Object(W.jsx)("label",{children:"\xa0"}),Object(W.jsx)("button",{type:"submit",className:"btn w-full",children:"Add"})]})]})]})]})}var _=!1,q={left:"right",right:"left",top:"bottom",bottom:"top"};function $(e){var t=e.workspaces,n=e.setWorkspaces,a=e.selectedWorkspaceIndex,s=e.setSelectedWorkspaceIndex;return Object(W.jsxs)("div",{className:"workspaces-nav",children:[Object(W.jsx)("div",{className:"workspaces-nav-current",children:t[a].name}),Object(W.jsxs)("div",{className:"workspaces-nav-dropdown",children:[t.map((function(e,t){return Object(W.jsx)("a",{onClick:function(){return s(t)},className:a===t?"is-active":"",children:e.name},t)})),Object(W.jsxs)("a",{onClick:function(e){e.preventDefault(),n((function(e){return e=e.concat({name:"new workspace",root:{type:"node",size:100,data:{type:"empty"}}})}))},title:"add",children:[Object(W.jsx)(I,{name:"plus"})," add"]}),Object(W.jsxs)("a",{onClick:function(e){e.preventDefault(),n((function(e){return e.splice(a,1),e.splice()}))},title:"delete",children:[Object(W.jsx)(I,{name:"trash"})," delete"]}),Object(W.jsxs)("a",{onClick:function(e){e.preventDefault();var s=prompt("New Name",t[a].name);s&&n((function(e){var t=a;return e[t]=Object(o.a)(Object(o.a)({},e[t]),{},{name:s}),e.slice()}))},title:"rename",children:[Object(W.jsx)(I,{name:"edit"})," rename"]}),Object(W.jsxs)("a",{onClick:function(e){e.preventDefault(),localStorage.workspaces=JSON.stringify(t)},title:"save",children:[Object(W.jsx)(I,{name:"save"})," save"]})]})]})}var J=function(){var e=Object(a.useState)({}),t=Object(i.a)(e,2),n=t[0],s=t[1],r=h("wallets",{}),c=Object(i.a)(r,1)[0].selected,l=h("pools",[]),d=Object(i.a)(l,2),u=(d[0],d[1]),j=h("stats",null),p=Object(i.a)(j,2),f=(p[0],p[1]),O=h("wallets"),w=Object(i.a)(O,2),g=w[0],k=w[1],y=Object(a.useState)(JSON.parse(localStorage.workspaces||C)),S=Object(i.a)(y,2),I=S[0],E=S[1],L=Object(a.useState)(0),M=Object(i.a)(L,2),B=M[0],D=M[1],R=I[B];return Object(a.useEffect)((function(){localStorage.wallets&&"undefined"!==localStorage.wallets&&k(JSON.parse(localStorage.wallets))}),[]),Object(a.useEffect)((function(){var e=JSON.stringify(g);localStorage.wallets!==e&&(localStorage.wallets=e)}),[g]),Object(a.useEffect)((function(){var e=function(){var e=(null===c||void 0===c?void 0:c.network)||"mainnet";x(e,"/thorchain/pools").then((function(t){var n=t.find((function(t){return t.asset===N[e]})),a=parseInt(n.balance_asset)/parseInt(n.balance_rune),s=t.reduce((function(e,t){var n=a*(parseInt(t.balance_rune)/parseInt(t.balance_asset)),s=parseInt(t.balance_rune)/Math.pow(10,8)*a*2;return e[t.asset]={asset:t.asset,status:t.status.toLowerCase(),price:n,depth:s,depthAsset:parseInt(t.balance_asset),depthRune:parseInt(t.balance_rune),apy:0,volume:0},e}),{});_||u(Object.values(s).sort((function(e,t){return e.asset>t.asset}))),b(e,"/pools").then((function(e){_=!0,e.forEach((function(e){if(s[e.asset]){var t=parseFloat(e.volume24h)/Math.pow(10,8)*parseFloat(e.assetPriceUSD)/parseFloat(e.assetPrice)||0;s[e.asset].apy=parseFloat(e.poolAPY),s[e.asset].volume=t}})),u(Object.values(s).sort((function(e,t){return e.asset>t.asset})))})).catch((function(){u(Object.values(s).sort((function(e,t){return e.asset>t.asset})))}))})),b(e,"/stats").then(f)};e();var t=setInterval(e,15e3);return function(){return clearInterval(t)}}),[null===c||void 0===c?void 0:c.network]),Object(W.jsxs)("div",{children:[Object(W.jsxs)("header",{className:"header",children:[Object(W.jsx)("a",{className:"header-brand",href:"/",children:"thorbelt"}),Object(W.jsx)("div",{className:"header-workspaces",children:Object(W.jsx)($,{workspaces:I,setWorkspaces:E,selectedWorkspaceIndex:B,setSelectedWorkspaceIndex:D})}),Object(W.jsx)("div",{className:"nav nav-right",children:Object(W.jsx)("a",{className:"nav-text text-primary",onClick:function(){s({type:"configureAddress"})},children:c?v(c.address)+" ("+c.network+")":"(no wallet connected)"})})]}),Object(W.jsx)("div",{className:"workspace",children:Object(W.jsx)(H,Object(o.a)(Object(o.a)({},R.root),{},{path:[],updateWorkspace:function(e,t){if(0===t.length)R.root=e(R.root);else{var n=t.slice(0,-1).reduce((function(e,t){return e[t]}),R.root),a=t[t.length-1],s=n?n[a]:R.root;(s=e(s))?n[a]=s:Object.assign(n,m(n[q[a]],{size:n.size}))}I[B]=m({},R),E(I.slice()),window.globalWorkspaces=I}}))}),"configureAddress"===n.type?Object(W.jsx)(T,{onClose:function(){return s({})}}):null]})};c.a.render(Object(W.jsx)(s.a.StrictMode,{children:Object(W.jsx)(J,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.cdb7e39d.chunk.js.map