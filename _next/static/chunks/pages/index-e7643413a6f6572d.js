(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8456:function(e,t,n){"use strict";n.d(t,{Z:function(){return P}});var r=n(3366),a=n(7462),o=n(7294),i=(n(5697),n(6010)),c=n(7192),s=n(917),l=n(8216),u=n(3616),f=n(1496),d=n(8979);function h(e){return(0,d.Z)("MuiCircularProgress",e)}(0,n(6087).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=n(5893);const p=["className","color","disableShrink","size","style","thickness","value","variant"];let x,v,g,b,k=e=>e;const y=44,j=(0,s.F4)(x||(x=k`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),w=(0,s.F4)(v||(v=k`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),S=(0,f.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`color${(0,l.Z)(n.color)}`]]}})((({ownerState:e,theme:t})=>(0,a.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:t.palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,s.iv)(g||(g=k`
      animation: ${0} 1.4s linear infinite;
    `),j))),C=(0,f.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),Z=(0,f.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.circle,t[`circle${(0,l.Z)(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,a.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,s.iv)(b||(b=k`
      animation: ${0} 1.4s ease-in-out infinite;
    `),w)));var P=o.forwardRef((function(e,t){const n=(0,u.Z)({props:e,name:"MuiCircularProgress"}),{className:o,color:s="primary",disableShrink:f=!1,size:d=40,style:x,thickness:v=3.6,value:g=0,variant:b="indeterminate"}=n,k=(0,r.Z)(n,p),j=(0,a.Z)({},n,{color:s,disableShrink:f,size:d,thickness:v,value:g,variant:b}),w=(e=>{const{classes:t,variant:n,color:r,disableShrink:a}=e,o={root:["root",n,`color${(0,l.Z)(r)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(n)}`,a&&"circleDisableShrink"]};return(0,c.Z)(o,h,t)})(j),P={},O={},T={};if("determinate"===b){const e=2*Math.PI*((y-v)/2);P.strokeDasharray=e.toFixed(3),T["aria-valuenow"]=Math.round(g),P.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,O.transform="rotate(-90deg)"}return(0,m.jsx)(S,(0,a.Z)({className:(0,i.Z)(w.root,o),style:(0,a.Z)({width:d,height:d},O,x),ownerState:j,ref:t,role:"progressbar"},T,k,{children:(0,m.jsx)(C,{className:w.svg,ownerState:j,viewBox:"22 22 44 44",children:(0,m.jsx)(Z,{className:w.circle,style:P,ownerState:j,cx:y,cy:y,r:(y-v)/2,fill:"none",strokeWidth:v})})}))}))},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7950)}])},9339:function(e,t,n){"use strict";n.d(t,{Z:function(){return _}});var r=n(5893),a=n(9008),o=n(1163),i=n(1567),c=n(7294),s=n(6010),l=n(1664),u=n(122);function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){f(e,t,n[t])}))}return e}function h(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var m=(0,n(1496).ZP)("a")({}),p=c.forwardRef((function(e,t){var n=e.to,a=e.linkAs,o=(e.href,e.replace),i=e.scroll,c=e.shallow,s=e.prefetch,u=e.locale,f=h(e,["to","linkAs","href","replace","scroll","shallow","prefetch","locale"]);return(0,r.jsx)(l.default,{href:n,prefetch:s,as:a,replace:o,scroll:i,shallow:c,passHref:!0,locale:u,children:(0,r.jsx)(m,d({ref:t},f))})})),x=c.forwardRef((function(e,t){var n=e.activeClassName,a=void 0===n?"active":n,i=e.as,c=e.className,l=e.href,x=e.noLinkStyle,v=(e.role,h(e,["activeClassName","as","className","href","noLinkStyle","role"])),g=(0,o.useRouter)(),b="string"===typeof l?l:l.pathname,k=(0,s.Z)(c,f({},a,g.pathname===b&&a));return"string"===typeof l&&(0===l.indexOf("http")||0===l.indexOf("mailto:"))?x?(0,r.jsx)(m,d({className:k,href:l,ref:t},v)):(0,r.jsx)(u.Z,d({className:k,href:l,ref:t},v)):x?(0,r.jsx)(p,d({className:k,ref:t,to:l},v)):(0,r.jsx)(u.Z,d({component:p,linkAs:i,className:k,ref:t,to:l},v))})),v=n(2293),g=n(7357),b=n(155),k=n(3946),y=n(5861),j=n(5040),w=n(326),S=n(7948),C=n(9661),Z=n(3321),P=n(6893),O=n(5819),T=n(2734),R=n(9879),D=n(7289),E=n(1092);function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(s){c=!0,a=s}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var A={Live:"/",Video:"/video",Messenger:"/"},L=["Profile","Account","Dashboard","Logout"],M=function(){var e=(0,T.Z)(),t=c.useContext(E.Z),n=I(c.useState(null),2),a=n[0],o=n[1],i=I(c.useState(null),2),s=i[0],l=i[1],u=function(){o(null)},f=Object.entries(A).map((function(e){var t=I(e,2),n=t[0],a=t[1];return(0,r.jsx)(O.Z,{onClick:u,children:(0,r.jsx)(x,{style:{textDecoration:"none",color:"#000"},href:a,children:n})},n)})),d=Object.entries(A).map((function(e){var t=I(e,2),n=t[0],a=t[1];return(0,r.jsx)(Z.Z,{component:x,onClick:u,sx:{my:2,color:"white",display:"block"},href:a,children:n},n)}));return(0,r.jsx)(v.Z,{position:"static",color:"primary",children:(0,r.jsx)(S.Z,{maxWidth:"xl",children:(0,r.jsxs)(b.Z,{disableGutters:!0,children:[(0,r.jsx)(y.Z,{variant:"h6",noWrap:!0,component:"div",sx:{mr:2,display:{xs:"none",md:"flex"}},children:"Snapcio"}),(0,r.jsxs)(g.Z,{sx:{flexGrow:1,display:{xs:"flex",md:"none"}},children:[(0,r.jsx)(k.Z,{size:"large","aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)},color:"inherit",children:(0,r.jsx)(w.Z,{})}),(0,r.jsx)(j.Z,{id:"menu-appbar",anchorEl:a,anchorOrigin:{vertical:"bottom",horizontal:"left"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"left"},open:Boolean(a),onClose:u,sx:{display:{xs:"block",md:"none"}},children:f})]}),(0,r.jsx)(y.Z,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1,display:{xs:"flex",md:"none"}},children:"Snapcio"}),(0,r.jsx)(g.Z,{sx:{flexGrow:1,display:{xs:"none",md:"flex"}},children:d}),(0,r.jsx)(g.Z,{sx:{flexGrow:0},children:(0,r.jsx)(k.Z,{sx:{ml:1},"aria-label":"switch between lignt and dark mode",onClick:t.toggleColorMode,color:"inherit",children:"dark"===e.palette.mode?(0,r.jsx)(D.Z,{}):(0,r.jsx)(R.Z,{})})}),(0,r.jsxs)(g.Z,{sx:{flexGrow:0},children:[(0,r.jsx)(P.Z,{title:"Open settings",children:(0,r.jsx)(k.Z,{onClick:function(e){l(e.currentTarget)},sx:{p:0},children:(0,r.jsx)(C.Z,{alt:"I"})})}),(0,r.jsx)(j.Z,{sx:{mt:"45px"},id:"menu-appbar",anchorEl:s,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(s),onClose:function(){l(null)},children:L.map((function(e){return(0,r.jsx)(O.Z,{onClick:u,children:(0,r.jsx)(y.Z,{textAlign:"center",children:e})},e)}))})]})]})})})};function _(e){var t=e.children,n=((0,o.useRouter)(),(0,i.$)()),c=n.t,s=n.i18n,l=(c("siteName"),s.language);c("cookieconsent:cookiePolicy");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.default,{children:[(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.jsx)("meta",{property:"og:site_name",content:"Ionkom Chat"}),(0,r.jsx)("meta",{property:"og:type",content:"website"}),(0,r.jsx)("meta",{property:"og:locale",content:l}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)(M,{}),(0,r.jsx)("main",{children:t})]})}},7658:function(e,t,n){"use strict";n.d(t,{F:function(){return o},a:function(){return i}});var r=n(5893),a=n(7294),o=(0,a.createContext)({localStream:null,remoteStream:null,setLocalStream:function(e){},setRemoteStream:function(e){}}),i=function(e){var t=e.children,n=(0,a.useState)(null),i=n[0],c=n[1],s=(0,a.useState)(null),l=s[0],u=s[1];return(0,r.jsx)(o.Provider,{value:{localStream:i,remoteStream:l,setLocalStream:c,setRemoteStream:u},children:t})}},3851:function(e,t,n){"use strict";n.r(t),n.d(t,{WebRTCContext:function(){return d},WebRTCContextProvider:function(){return p}});var r=n(4051),a=n.n(r),o=n(5893),i=n(7294),c=n(8158),s=n(7658);function l(e,t,n,r,a,o,i){try{var c=e[o](i),s=c.value}catch(l){return void n(l)}c.done?t(s):Promise.resolve(s).then(r,a)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){l(o,r,a,i,c,"next",e)}function c(e){l(o,r,a,i,c,"throw",e)}i(void 0)}))}}var f={iceServers:[{urls:"stun:".concat("15.161.216.220:3478")},{urls:"turn:".concat("15.161.216.220:3478"),username:"ciousr",credential:"T3mTypEIYYYBT473Lz6g"}]},d=(0,i.createContext)({nextUser:function(){},availableUsers:[],myUsername:void 0});function h(e){var t=new Date;console.log("["+t.toLocaleTimeString()+"] "+e)}function m(e){!function(e){var t=new Date;console.trace("["+t.toLocaleTimeString()+"] "+e)}("Error ".concat(e.name,": ").concat(e.message))}var p=function(e){var t=e.children,n=function(){var e=(0,i.useState)(null),t=e[0],n=e[1],r=(0,i.useState)("https://signaling.ionkom.com"),a=r[0];return r[1],(0,i.useEffect)((function(){var e=(0,c.ZP)(a);return n(e),function(){e.disconnect()}}),[a]),t}(),r=(0,i.useContext)(s.F),l=r.localStream,p=(r.setLocalStream,r.setRemoteStream),x=(0,i.useState)(null),v=x[0],g=x[1],b=(0,i.useState)([null]),k=(b[0],b[1],(0,i.useState)([])),y=k[0],j=k[1],w=(0,i.useState)(null),S=w[0],C=w[1],Z=(0,i.useState)(null),P=Z[0],O=Z[1],T=(0,i.useCallback)((function(e){h("Sending '"+e.type+"' message: "+e),n.emit(e.type,e)}),[n]),R=(0,i.useCallback)((function(){h("Closing the call"),v&&(h("--\x3e Closing the peer connection"),v.ontrack=null,v.onnicecandidate=null,v.oniceconnectionstatechange=null,v.onsignalingstatechange=null,v.onicegatheringstatechange=null,v.onnotificationneeded=null,v.getTransceivers().forEach((function(e){e.stop()})),v.close(),g(null)),O(null)}),[v]),D=(0,i.useCallback)((function(){R(),T({name:S,target:P,type:"hang-up"}),O(null)}),[R,T,S,P]),E=(0,i.useCallback)((function(){P&&D(),n.emit("request-a-match",{name:S})}),[n,S,P,D]),N=(0,i.useCallback)((function(e){e.candidate&&(h("*** Outgoing ICE candidate: "+e.candidate.candidate),T({type:"new-ice-candidate",target:P,candidate:e.candidate}))}),[T,P]),I=(0,i.useCallback)((function(e){switch(h("*** ICE connection state changed to "+v.iceConnectionState),v.iceConnectionState){case"closed":case"failed":case"disconnected":R()}}),[v,R]),A=(0,i.useCallback)((function(e){h("*** ICE gathering state changed to: "+v.iceGatheringState)}),[v]),L=(0,i.useCallback)((function(e){switch(h("*** WebRTC signaling state changed to: "+v.signalingState),v.signalingState){case"closed":R()}}),[v,R]),M=(0,i.useCallback)(u(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("*** Negotiation needed"),e.prev=1,h("---\x3e Creating offer"),e.next=5,v.createOffer();case 5:if(t=e.sent,"stable"==v.signalingState){e.next=9;break}return h("     -- The connection isn't stable yet; postponing..."),e.abrupt("return");case 9:return h("---\x3e Setting local description to the offer"),e.next=12,v.setLocalDescription(t);case 12:h("---\x3e Sending the offer to the remote peer"),T({name:S,target:P,type:"video-offer",sdp:v.localDescription}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),h("*** The following error occurred while handling the negotiationneeded event:"),m(e.t0);case 20:case 21:case"end":return e.stop()}}),e,null,[[1,16]])}))),[v,S,P,T]),_=(0,i.useCallback)((function(e){h("*** Track event: show remote stream"),p(e.streams[0])}),[]);(0,i.useEffect)((function(){v&&(v.onicecandidate=N,v.oniceconnectionstatechange=I,v.onicegatheringstatechange=A,v.onsignalingstatechange=L,v.onnegotiationneeded=M,v.ontrack=_)}),[v,N,I,A,L,M,_]);var U=(0,i.useCallback)(u(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("Setting up a connection..."),t=new RTCPeerConnection(f),g(t),e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),[]),F=(0,i.useCallback)(function(){var e=u(a().mark((function e(t){var n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h("Starting to prepare an invitation"),!v){e.next=5;break}alert("You can't start a call because you already have one open!"),e.next=17;break;case 5:if((n=t)!==S){e.next=9;break}return alert("I'm afraid I can't let you talk to yourself. That would be weird."),e.abrupt("return");case 9:return O(n),h("Inviting user "+n),h("Setting up connection to invite user: "+n),e.next=14,U();case 14:r=e.sent,l&&(h("Add the local camera stream to the RTCPeerConnection"),l.getTracks().forEach((function(e){return r.addTransceiver(e,{streams:[l]})})));case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[v,S,l,U,T]);return(0,i.useEffect)((function(){var e=function(e){h("*** Received hang up notification from other peer"),R()};if(n){var t=function(e){var t=e.users;h("updateUserList::ids: ".concat(t)),j(t.filter((function(e){return e!=n.id})))},r=function(e){var t=e.socketId;h("removeUser::ids: ".concat(t)),j(y.filter((function(e){return e!=t})))},o=function(e){var t=e.target;t?(h("inviteToCall: ".concat(t)),F(t)):alert("No other users available")};return n.on("connect",(function(){return C(n.id)})),n.on("update-user-list",t),n.on("remove-user",r),n.on("receive-a-match",o),n.on("video-offer",i),n.on("video-answer",s),n.on("new-ice-candidate",d),n.on("hang-up",e),function(){n.off("update-user-list",t),n.off("remove-user",r),n.off("receive-a-match",o),n.off("video-offer",i),n.off("video-answer",s),n.off("new-ice-candidate",d),n.off("hang-up",e)}}function i(e){return c.apply(this,arguments)}function c(){return(c=u(a().mark((function e(t){var n,r,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.name,O(n),r=v,h("Received video chat offer from "+n),v){e.next=8;break}return e.next=7,U();case 7:r=e.sent;case 8:if(o=new RTCSessionDescription(t.sdp),"stable"==r.signalingState){e.next=16;break}return h("  - But the signaling state isn't stable, so triggering rollback"),e.next=13,Promise.all([r.setLocalDescription({type:"rollback"}),r.setRemoteDescription(o)]);case 13:return e.abrupt("return");case 16:return h("  - Setting remote description"),e.next=19,r.setRemoteDescription(o);case 19:return r.getTransceivers().length<=2&&l&&(h("Add the local camera stream to the RTCPeerConnection"),l.getTracks().forEach((function(e){return r.addTransceiver(e,{streams:[l]})}))),h("---\x3e Creating and sending answer to caller"),e.t0=r,e.next=25,r.createAnswer();case 25:return e.t1=e.sent,e.next=28,e.t0.setLocalDescription.call(e.t0,e.t1);case 28:T({name:S,target:n,type:"video-answer",sdp:r.localDescription});case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(e){return f.apply(this,arguments)}function f(){return(f=u(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("*** Call recipient has accepted our call"),n=new RTCSessionDescription(t.sdp),e.next=4,v.setRemoteDescription(n).catch(m);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return p.apply(this,arguments)}function p(){return(p=u(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new RTCIceCandidate(t.candidate),h("*** Adding received ICE candidate: "+JSON.stringify(n)),e.prev=2,e.next=5,v.addIceCandidate(n);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),m(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})))).apply(this,arguments)}}),[n,v,S,P,l,y,T,R]),(0,o.jsx)(d.Provider,{value:{nextUser:E,availableUsers:y,myUsername:S},children:t})}},7950:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(5893),a=n(5152),o=n(9008),i=n(7294),c=n(7948),s=n(7357),l=n(3321),u=n(9339),f=n(5988),d=n(8456),h=n(7658);function m(){var e=(0,i.useRef)(null),t=(0,i.useContext)(h.F),n=t.remoteStream;t.setRemoteStream;return(0,i.useEffect)((function(){n&&function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.current;r.srcObject=t,r.volume=n?0:1,r.onloadedmetadata=function(){return r.play()}}(n)}),[n]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{sx:{display:"flex",my:3,height:300,justifyContent:"center",alignItems:"center",backgroundColor:"black"},children:n?(0,r.jsx)("video",{ref:e,className:"jsx-21692c2f1b6e7001"}):(0,r.jsx)(d.Z,{})}),(0,r.jsx)(f.default,{id:"21692c2f1b6e7001",children:'video.jsx-21692c2f1b6e7001{max-width:100%;\nmax-height:100%}\n.video-hflip.jsx-21692c2f1b6e7001{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.brokenvideo.jsx-21692c2f1b6e7001{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}var p=n(3851),x=(0,a.default)((function(){return Promise.all([n.e(948),n.e(479)]).then(n.bind(n,7479))}),{loadableGenerated:{webpack:function(){return[7479]}},ssr:!1}),v=(0,a.default)((function(){return Promise.resolve().then(n.bind(n,3851)).then((function(e){return e.WebRTCContextProvider}))}),{loadableGenerated:{webpack:function(){return[3851]}}});function g(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(u.Z,{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:"Chat - Snapcio"}),(0,r.jsx)("meta",{name:"description",content:"Chat free"})]}),(0,r.jsx)(c.Z,{maxWidth:"sm",children:(0,r.jsx)(h.a,{children:(0,r.jsx)(v,{children:(0,r.jsx)(b,{})})})})]})})}var b=function(){var e=(0,i.useContext)(p.WebRTCContext),t=e.nextUser,n=e.availableUsers,a=e.myUsername;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{sx:{my:1},children:(0,r.jsx)(m,{})}),(0,r.jsx)(s.Z,{sx:{my:1},children:(0,r.jsx)(x,{hFlip:!0})}),(0,r.jsx)(s.Z,{sx:{my:1},children:(0,r.jsx)(l.Z,{variant:"contained",onClick:t,children:"Skip"})}),(0,r.jsxs)(s.Z,{sx:{my:1},children:["Available Users: ",n.length]}),(0,r.jsxs)(s.Z,{sx:{my:1},children:["MY Socket Id: ",a]})]})}}},function(e){e.O(0,[774,313,988,158,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);