(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7950)}])},7658:function(e,t,n){"use strict";n.d(t,{F:function(){return s},a:function(){return i}});var r=n(5893),o=n(7294),s=(0,o.createContext)({localStream:null,remoteStream:null,setLocalStream:function(e){},setRemoteStream:function(e){}}),i=function(e){var t=e.children,n=(0,o.useState)(null),i=n[0],a=n[1],c=(0,o.useState)(null),l=c[0],u=c[1];return(0,r.jsx)(s.Provider,{value:{localStream:i,remoteStream:l,setLocalStream:a,setRemoteStream:u},children:t})}},7950:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});var r=n(5893),o=n(5152),s=n(9008),i=n(7294),a=n(7948),c=n(7357),l=n(8032),u=n(3946),d=n(1811),x=n(7440),f=n(9994),h=n(25),m=n(265),j=n(3486),b=n(7914),g=n(5988),v=n.n(g),p=n(1458),Z=n(7658),w=n(3851);function y(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)}function C(){var e=(0,i.useRef)(null),t=(0,i.useContext)(Z.F),n=t.remoteStream,o=(t.setRemoteStream,(0,i.useContext)(w.WebRTCContext).availableUsers),s=(0,i.useState)(700),a=s[0],l=s[1];(0,i.useEffect)((function(){n&&function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.current;r.srcObject=t,r.volume=n?0:1,r.onloadedmetadata=function(){return r.play()}}(n)}),[n]),(0,i.useEffect)((function(){var e=setInterval((function(){l((function(e){return e+y(-15,15)}))}),2e4);return function(){return clearInterval(e)}}),[]),(0,i.useEffect)((function(){l(700+y(-15,15))}),[]);var u=(0,r.jsxs)(c.Z,{sx:{mx:{md:1},display:"flex",flexDirection:"column",height:"100%",alignItems:"center",backgroundColor:"#606060FF"},children:[(0,r.jsx)(c.Z,{sx:{width:"100%"},children:(0,r.jsx)(p.Z,{})}),700!==a&&(0,r.jsxs)(c.Z,{sx:{mt:10,color:"#D6ED17FF"},children:["Available Users: ",1e3*o.length+a]})]});return(0,r.jsxs)(r.Fragment,{children:[n?(0,r.jsx)(c.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",position:"relative",overflow:"hidden",maxWidth:"100%"},children:(0,r.jsx)("video",{ref:e,controls:!0,className:"jsx-500e14ecf6ac9500"})}):u,(0,r.jsx)(v(),{id:"500e14ecf6ac9500",children:'video.jsx-500e14ecf6ac9500{position:relative;\nwidth:101%;\nheight:101%;\nleft:-.5%;\ntop:-.5%;\nmax-width:101%;\nmax-height:101%;\nbackground:#000;\nobject-fit:cover}\n.video-hflip.jsx-500e14ecf6ac9500{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.brokenvideo.jsx-500e14ecf6ac9500{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){k(e,t,n[t])}))}return e}var _=(0,o.default)((function(){return Promise.all([n.e(455),n.e(384)]).then(n.bind(n,7479))}),{loadableGenerated:{webpack:function(){return[7479]}},ssr:!1}),F=(0,o.default)((function(){return Promise.resolve().then(n.bind(n,3851)).then((function(e){return e.WebRTCContextProvider}))}),{loadableGenerated:{webpack:function(){return[3851]}}});function O(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(b.Z,{children:[(0,r.jsxs)(s.default,{children:[(0,r.jsx)("title",{children:"Chat - Snapcio"}),(0,r.jsx)("meta",{name:"description",content:"Chat free"})]}),(0,r.jsx)(Z.a,{children:(0,r.jsx)(F,{children:(0,r.jsx)(R,{})})})]})})}var P={color:"common.white",bgcolor:"#ed6c02","&:hover":{bgcolor:h.Z[900]}},E=(m.Z[500],m.Z[600],{color:"common.white",bgcolor:j.Z[500],"&:hover":{bgcolor:j.Z[600]}}),R=function(){var e=(0,i.useContext)(w.WebRTCContext),t=e.nextUser,n=e.availableUsers,o=e.myUsername,s=e.targetUsername,h=(0,i.useContext)(Z.F).localStream,m=(0,i.useRef)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.Z,{maxWidth:!1,sx:{px:{xs:0},mb:{xs:20}},children:[(0,r.jsxs)(c.Z,{sx:{display:{md:"none"},flexDirection:"row",justifyContent:"center"},children:[(0,r.jsx)(c.Z,{sx:{mt:0,height:{xs:300,md:720}},children:(0,r.jsx)(C,{})}),(0,r.jsx)(c.Z,{sx:{mb:1,height:{xs:300,md:720}},children:(0,r.jsx)(_,{hFlip:!0})})]}),(0,r.jsx)(a.Z,{maxWidth:"xl",sx:{height:{xs:300,md:720}},children:(0,r.jsxs)(c.Z,{sx:{display:{xs:"none",md:"flex"},flexDirection:"row",justifyContent:"center",height:"100%"},children:[(0,r.jsx)(c.Z,{sx:{mt:1,width:"100%"},children:(0,r.jsx)(C,{})}),(0,r.jsx)(c.Z,{sx:{mt:1,width:"100%"},children:(0,r.jsx)(_,{hFlip:!0})})]})})]}),(0,r.jsxs)(a.Z,{sx:{position:"fixed",bottom:0,left:0,right:0,mb:8,"& > :not(style)":{m:1},display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,r.jsx)(l.Z,{size:"small",color:"inherit","aria-label":"replay",sx:S({},P),disabled:!0,children:(0,r.jsx)(f.Z,{})}),(0,r.jsx)(l.Z,{"aria-label":"skipnext",sx:S({},E),onClick:t,disabled:!h,children:(0,r.jsx)(x.Z,{fontSize:"large"})}),(0,r.jsx)(u.Z,{"aria-label":"fav",children:(0,r.jsx)(d.Z,{})})]}),m.current&&(0,r.jsxs)(a.Z,{maxWidth:"sm",children:[(0,r.jsxs)(c.Z,{sx:{my:1},children:["Available Users: ",n.length]}),(0,r.jsxs)(c.Z,{sx:{my:1},children:["MY Socket Id: ",o]}),(0,r.jsxs)(c.Z,{sx:{mb:10},children:["Peer Socket Id: ",s]})]})]})}}},function(e){e.O(0,[774,826,195,639,914,851,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);