(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(7950)}])},7658:function(e,n,t){"use strict";t.d(n,{F:function(){return a},a:function(){return o}});var r=t(5893),s=t(7294),a=(0,s.createContext)({localStream:null,remoteStream:null,setLocalStream:function(e){},setRemoteStream:function(e){}}),o=function(e){var n=e.children,t=(0,s.useState)(null),o=t[0],c=t[1],i=(0,s.useState)(null),l=i[0],d=i[1];return(0,r.jsx)(a.Provider,{value:{localStream:o,remoteStream:l,setLocalStream:c,setRemoteStream:d},children:n})}},7950:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return O}});var r=t(5893),s=t(5152),a=t(9008),o=t(7294),c=t(7948),i=t(7357),l=t(6886),d=t(8032),x=t(3946),u=t(1811),m=t(7440),f=t(9994),h=t(25),j=t(265),b=t(3486),g=t(7914),p=t(5988),v=t.n(p),Z=t(1458),y=t(7658),k=t(3851);function C(){var e=(0,o.useRef)(null),n=(0,o.useContext)(y.F),t=n.remoteStream,s=(n.setRemoteStream,(0,o.useContext)(k.WebRTCContext).availableUsers);(0,o.useEffect)((function(){t&&function(n){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.current;r.srcObject=n,r.volume=t?0:1,r.onloadedmetadata=function(){return r.play()}}(t)}),[t]);var a=(0,r.jsxs)(i.Z,{sx:{mx:1,display:"flex",flexDirection:"column",height:{xs:300,md:720},alignItems:"center",backgroundColor:"gray"},children:[(0,r.jsx)(i.Z,{sx:{width:"100%"},children:(0,r.jsx)(Z.Z,{})}),(0,r.jsxs)(i.Z,{sx:{mt:10},children:["Available Users: ",s.length]})]});return(0,r.jsxs)(r.Fragment,{children:[t?(0,r.jsx)(i.Z,{sx:{display:"flex",height:{xs:300,md:720},justifyContent:"center",alignItems:"center"},children:(0,r.jsx)("video",{ref:e,controls:!0,className:"jsx-38aac46e5ecc6fa9"})}):a,(0,r.jsx)(v(),{id:"38aac46e5ecc6fa9",children:'video.jsx-38aac46e5ecc6fa9{width:100%;\nheight:100%}\n.video-hflip.jsx-38aac46e5ecc6fa9{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.brokenvideo.jsx-38aac46e5ecc6fa9{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}function S(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function w(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){S(e,n,t[n])}))}return e}var P=(0,s.default)((function(){return Promise.all([t.e(455),t.e(384)]).then(t.bind(t,7479))}),{loadableGenerated:{webpack:function(){return[7479]}},ssr:!1}),_=(0,s.default)((function(){return Promise.resolve().then(t.bind(t,3851)).then((function(e){return e.WebRTCContextProvider}))}),{loadableGenerated:{webpack:function(){return[3851]}}});function O(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(g.Z,{children:[(0,r.jsxs)(a.default,{children:[(0,r.jsx)("title",{children:"Chat - Snapcio"}),(0,r.jsx)("meta",{name:"description",content:"Chat free"})]}),(0,r.jsx)(y.a,{children:(0,r.jsx)(_,{children:(0,r.jsx)(E,{})})})]})})}var F={color:"common.white",bgcolor:"#ed6c02","&:hover":{bgcolor:h.Z[900]}},R=(j.Z[500],j.Z[600],{color:"common.white",bgcolor:b.Z[500],"&:hover":{bgcolor:b.Z[600]}}),E=function(){var e=(0,o.useContext)(k.WebRTCContext),n=e.nextUser,t=e.availableUsers,s=e.myUsername,a=e.targetUsername,h=(0,o.useContext)(y.F).localStream,j=(0,o.useRef)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.Z,{maxWidth:!1,sx:{px:{xs:0}},children:[(0,r.jsxs)(i.Z,{sx:{display:{md:"none"}},children:[(0,r.jsx)(i.Z,{sx:{mt:0},children:(0,r.jsx)(C,{})}),(0,r.jsx)(i.Z,{sx:{mb:1},children:(0,r.jsx)(P,{hFlip:!0})})]}),(0,r.jsx)(i.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,r.jsxs)(l.ZP,{sx:{my:1},container:!0,spacing:2,children:[(0,r.jsx)(l.ZP,{item:!0,xs:6,children:(0,r.jsx)(C,{})}),(0,r.jsx)(l.ZP,{item:!0,xs:6,children:(0,r.jsx)(P,{hFlip:!0})})]})})]}),(0,r.jsx)(c.Z,{maxWidth:"sm",sx:{position:"fixed",bottom:0,left:0,right:0,mb:8},children:(0,r.jsxs)(i.Z,{sx:{"& > :not(style)":{m:1},display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,r.jsx)(d.Z,{size:"small",color:"inherit","aria-label":"replay",sx:w({},F),disabled:!0,children:(0,r.jsx)(f.Z,{})}),(0,r.jsx)(d.Z,{"aria-label":"skipnext",sx:w({},R),onClick:n,disabled:!h,children:(0,r.jsx)(m.Z,{fontSize:"large"})}),(0,r.jsx)(x.Z,{"aria-label":"fav",children:(0,r.jsx)(u.Z,{})})]})}),j.current&&(0,r.jsxs)(c.Z,{maxWidth:"sm",children:[(0,r.jsxs)(i.Z,{sx:{my:1},children:["Available Users: ",t.length]}),(0,r.jsxs)(i.Z,{sx:{my:1},children:["MY Socket Id: ",s]}),(0,r.jsxs)(i.Z,{sx:{mb:10},children:["Peer Socket Id: ",a]})]})]})}}},function(e){e.O(0,[774,826,195,721,914,851,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);