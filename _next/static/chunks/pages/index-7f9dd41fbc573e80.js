(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(7950)}])},7658:function(e,n,t){"use strict";t.d(n,{F:function(){return o},a:function(){return a}});var r=t(5893),s=t(7294),o=(0,s.createContext)({localStream:null,remoteStream:null,setLocalStream:function(e){},setRemoteStream:function(e){}}),a=function(e){var n=e.children,t=(0,s.useState)(null),a=t[0],i=t[1],l=(0,s.useState)(null),c=l[0],d=l[1];return(0,r.jsx)(o.Provider,{value:{localStream:a,remoteStream:c,setLocalStream:i,setRemoteStream:d},children:n})}},7950:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return _}});var r=t(5893),s=t(5152),o=t(9008),a=t(7294),i=t(7948),l=t(7357),c=t(6886),d=t(8032),x=t(3946),u=t(1811),m=t(7440),f=t(9994),h=t(25),b=t(265),j=t(3486),g=t(7914),p=t(5988),v=t(1458),Z=t(7658),y=t(3851);function k(){var e=(0,a.useRef)(null),n=(0,a.useContext)(Z.F),t=n.remoteStream,s=(n.setRemoteStream,(0,a.useContext)(y.WebRTCContext).availableUsers);(0,a.useEffect)((function(){t&&function(n){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.current;r.srcObject=n,r.volume=t?0:1,r.onloadedmetadata=function(){return r.play()}}(t)}),[t]);var o=(0,r.jsxs)(l.Z,{sx:{display:"flex",flexDirection:"column",height:{xs:300,md:500},alignItems:"center",backgroundColor:"gray"},children:[(0,r.jsx)(l.Z,{sx:{width:"100%"},children:(0,r.jsx)(v.Z,{})}),(0,r.jsxs)(l.Z,{sx:{mt:10},children:["Available Users: ",s.length]})]});return(0,r.jsxs)(r.Fragment,{children:[t?(0,r.jsx)(l.Z,{sx:{display:"flex",height:{xs:300,md:500},justifyContent:"center",alignItems:"center",backgroundColor:"gray"},children:(0,r.jsx)("video",{ref:e,className:"jsx-21692c2f1b6e7001"})}):o,(0,r.jsx)(p.default,{id:"21692c2f1b6e7001",children:'video.jsx-21692c2f1b6e7001{max-width:100%;\nmax-height:100%}\n.video-hflip.jsx-21692c2f1b6e7001{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.brokenvideo.jsx-21692c2f1b6e7001{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}function C(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function S(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){C(e,n,t[n])}))}return e}var w=(0,s.default)((function(){return Promise.all([t.e(973),t.e(23)]).then(t.bind(t,7479))}),{loadableGenerated:{webpack:function(){return[7479]}},ssr:!1}),P=(0,s.default)((function(){return Promise.resolve().then(t.bind(t,3851)).then((function(e){return e.WebRTCContextProvider}))}),{loadableGenerated:{webpack:function(){return[3851]}}});function _(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(g.Z,{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:"Chat - Snapcio"}),(0,r.jsx)("meta",{name:"description",content:"Chat free"})]}),(0,r.jsx)(Z.a,{children:(0,r.jsx)(P,{children:(0,r.jsx)(E,{})})})]})})}var O={color:"common.white",bgcolor:"#ed6c02","&:hover":{bgcolor:h.Z[900]}},F=(b.Z[500],b.Z[600],{color:"common.white",bgcolor:j.Z[500],"&:hover":{bgcolor:j.Z[600]}}),E=function(){var e=(0,a.useContext)(y.WebRTCContext),n=e.nextUser,t=e.availableUsers,s=e.myUsername,o=e.targetUsername,h=(0,a.useContext)(Z.F).localStream;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i.Z,{maxWidth:"xl",sx:{px:{xs:0}},children:[(0,r.jsxs)(l.Z,{sx:{display:{md:"none"}},children:[(0,r.jsx)(l.Z,{sx:{mt:0},children:(0,r.jsx)(k,{})}),(0,r.jsx)(l.Z,{sx:{mb:1},children:(0,r.jsx)(w,{hFlip:!0})})]}),(0,r.jsx)(l.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,r.jsxs)(c.ZP,{sx:{my:1},container:!0,spacing:2,children:[(0,r.jsx)(c.ZP,{item:!0,xs:6,children:(0,r.jsx)(k,{})}),(0,r.jsx)(c.ZP,{item:!0,xs:6,children:(0,r.jsx)(w,{hFlip:!0})})]})})]}),(0,r.jsx)(i.Z,{maxWidth:"sm",sx:{position:"fixed",bottom:0,left:0,right:0,mb:8},children:(0,r.jsxs)(l.Z,{sx:{"& > :not(style)":{m:1},display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,r.jsx)(d.Z,{size:"small",color:"inherit","aria-label":"replay",sx:S({},O),disabled:!0,children:(0,r.jsx)(f.Z,{})}),(0,r.jsx)(d.Z,{"aria-label":"skipnext",sx:S({},F),onClick:n,disabled:!h,children:(0,r.jsx)(m.Z,{fontSize:"large"})}),(0,r.jsx)(x.Z,{"aria-label":"fav",children:(0,r.jsx)(u.Z,{})})]})}),(0,r.jsxs)(i.Z,{maxWidth:"sm",children:[(0,r.jsxs)(l.Z,{sx:{my:1},children:["Available Users: ",t.length]}),(0,r.jsxs)(l.Z,{sx:{my:1},children:["MY Socket Id: ",s]}),(0,r.jsxs)(l.Z,{sx:{mb:10},children:["Peer Socket Id: ",o]})]})]})}}},function(e){e.O(0,[774,826,195,721,914,851,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);