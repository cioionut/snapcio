(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[384],{7479:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return T}});var r=t(4051),c=t.n(r),a=t(5893),i=t(5988),o=t.n(i),u=t(7294),l=t(5819),s=t(7357),d=t(8456),f=t(3321),h=t(3946),v=t(4054),m=t(3841),b=t(2984),g=t(9074),x=t(5195),p=t(4229),k=t(48),j=t(7228),C=t(3835),y=t(7658),w=t(3851);function S(e,n,t,r,c,a,i){try{var o=e[a](i),u=o.value}catch(l){return void t(l)}o.done?n(u):Promise.resolve(u).then(r,c)}function Z(e){return function(){var n=this,t=arguments;return new Promise((function(r,c){var a=e.apply(n,t);function i(e){S(a,r,c,i,o,"next",e)}function o(e){S(a,r,c,i,o,"throw",e)}i(void 0)}))}}C._1("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@".concat(C.Ye,"/dist/"));var I=1280,E=960,R=function(e){switch(function(e){var n=new Date;console.trace("["+n.toLocaleTimeString()+"] "+e)}(e),e.name){case"NotFoundError":alert("Unable to open your call because no camera and/or microphonewere found.");break;case"SecurityError":case"PermissionDeniedError":break;default:alert("Error opening your camera and/or microphone: "+e.message)}},W=function(e,n,t,r,c,a){if(e.length>0){n.clearRect(0,0,t,r);for(var i=0;i<e.length;i++){c&&(e[i].topLeft=e[i].topLeft.arraySync(),e[i].bottomRight=e[i].bottomRight.arraySync(),a&&(e[i].landmarks=e[i].landmarks.arraySync()));var o=e[i].topLeft,u=e[i].bottomRight,l=[u[0]-o[0],u[1]-o[1]];if(n.fillStyle="rgba(255, 0, 0, 0.5)",n.fillRect(o[0],o[1],l[0],l[1]),a){var s=e[i].landmarks;n.fillStyle="blue";for(var d=0;d<s.length;d++){var f=s[d][0],h=s[d][1];n.fillRect(f,h,5,5)}}}}};function T(e){var n=e.defaultMute,t=void 0===n||n,r=e.hFlip,i=void 0!==r&&r,C=e.faceDetect,S=void 0!==C&&C,T=e.stats,F=void 0!==T&&T,L=(0,u.useContext)(w.WebRTCContext),_=L.joinConv,D=L.stopConv,X=L.peerConnection,N=(0,u.useContext)(y.F),B=N.localStream,H=N.setLocalStream,P=(0,u.useRef)(null),z=(0,u.useRef)(null),A=(0,u.useRef)(null),M=(0,u.useState)("wasm"),O=M[0],U=(M[1],(0,u.useState)(null)),V=U[0],q=U[1],G=(0,u.useState)(!1),Q=G[0],Y=G[1],J=(0,u.useState)(!1),K=J[0],$=J[1],ee=(0,u.useState)([]),ne=ee[0],te=ee[1],re=(0,u.useState)(""),ce=re[0],ae=re[1],ie=(0,u.useState)(""),oe=ie[0],ue=ie[1],le=(0,u.useState)([]),se=le[0],de=le[1],fe=(0,u.useState)([]),he=fe[0],ve=fe[1],me=se.map((function(e){return(0,a.jsx)(l.Z,{value:e.deviceId,children:e.label},e.deviceId)})),be=he.map((function(e){return(0,a.jsx)(l.Z,{value:e.deviceId,children:e.label},e.deviceId)})),ge=(0,u.useCallback)(function(){var e=Z(c().mark((function e(n){var t,r,a,o,u,l,s,d,f,h;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof P.current||null===P.current||4!==P.current.readyState||"undefined"===typeof z.current||null===z.current){e.next=17;break}return t=P.current,r=P.current.width,a=P.current.height,o=!1,u=i,l=!0,s=j.Xhn.fromPixels(t),d=j.BHj.resizeBilinear(s,[a,r]),e.next=11,n.estimateFaces(d,o,u,l);case 11:f=e.sent,j.B90(s),j.B90(d),console.log(f),h=z.current.getContext("2d"),requestAnimationFrame((function(){W(f,h,r,a,o,l)}));case 17:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[P,z]);(0,u.useEffect)((function(){if(ne&&"undefined"!==typeof P.current&&null!==P.current&&"undefined"!==typeof z.current&&null!==z.current){console.log("canvas setup",P.current,z.current);P.current;var e=A.current?A.current.scrollWidth:void 0,n=A.current?A.current.scrollHeight:void 0;P.current.width=e,P.current.height=n,z.current.width=e,z.current.height=n}}),[ne]);var xe=(0,u.useCallback)(Z(c().mark((function e(){var n,t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.z();case 2:n=e.sent,t=setInterval((function(){console.log("Run predict"),ge(n)}),50),q(t);case 5:case"end":return e.stop()}}),e)}))),[ge,q]),pe=(0,u.useCallback)(Z(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.CQI(O);case 2:case"end":return e.stop()}}),e)}))),[O]);(0,u.useEffect)((function(){pe()}),[pe]),(0,u.useEffect)((function(){S&&(K&&j.Cd_()&&!V?(console.log("should start face detection"),xe()):!K&&V&&(clearInterval(V),q(null)))}),[pe,xe,K,S,V]),(0,u.useEffect)((function(){if(B&&he.length>0){var e=B.getVideoTracks(),n=e?e[0]:void 0,t=he.find((function(e){return e.label===n.label}));ue(t.deviceId)}}),[he,B]),(0,u.useEffect)((function(){if(B&&se.length>0){var e=B.getAudioTracks(),n=e?e[0]:void 0,t=se.find((function(e){return e.label===n.label}));ae(t.deviceId)}}),[se,B]);var ke=(0,u.useCallback)((function(e){te(e);var n=e.filter((function(e){return"audioinput"===e.kind})),t=e.filter((function(e){return"videoinput"===e.kind}));de(n),ve(t)}),[]),je=(0,u.useCallback)((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,r=function(n){n.getSenders().map((function(n){if(console.log(n.track),n.track){var t=e.getTracks().find((function(e){return e.kind===n.track.kind}));n.replaceTrack(t)}}))};$(!0),H(e);var c=P.current;return c.srcObject=e,c.volume=n?0:1,c.onloadedmetadata=function(){return c.play()},X&&r(X),_(),navigator.mediaDevices.enumerateDevices()}),[P,t,H,X,_]),Ce=(0,u.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ce;B&&B.getTracks().forEach((function(e){e.stop()}));A.current&&A.current.scrollWidth,A.current&&A.current.scrollHeight;var t={audio:{deviceId:n?{exact:n}:void 0,echoCancellation:!0},video:{deviceId:e?{exact:e}:void 0,facingMode:"user",aspectRatio:{ideal:1.333333},width:{max:I},height:{max:E}}};navigator.mediaDevices.getUserMedia(t).then(je).then(ke).catch(R)}),[B,ce,oe,je,ke,A]),ye=(0,u.useCallback)((function(e){ue(e.target.value),Ce(e.target.value)}),[Ce]),we=(0,u.useCallback)((function(e){ae(e.target.value),Ce(void 0,e.target.value)}),[Ce]),Se=(0,u.useCallback)((function(){Ce()}),[Ce]),Ze=(0,u.useCallback)((function(){$(!1),B&&B.getTracks().forEach((function(e){e.stop()})),P.current.srcObject=null,H(null),D()}),[B,H,D]);X&&["failed","closed"].includes(X.connectionState);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{sx:{display:"flex",height:{xs:300,md:500},justifyContent:"center",alignItems:"center",backgroundColor:"black"},ref:A,children:K?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("video",{ref:P,className:"jsx-7277f7b6d5b1021c "+((i?"video-hflip":"")||"")}),(0,a.jsx)("canvas",{style:{position:"absolute"},id:"predictions",ref:z,className:"jsx-7277f7b6d5b1021c"})]}):(0,a.jsx)(d.Z,{})}),(0,a.jsxs)(s.Z,{sx:{mt:1},children:[K?(0,a.jsx)(f.Z,{variant:"outlined",color:"error",onClick:Ze,startIcon:(0,a.jsx)(x.Z,{}),children:"Stop Live"}):(0,a.jsx)(f.Z,{variant:"contained",color:"error",onClick:Se,startIcon:(0,a.jsx)(g.Z,{}),children:"GO LIVE"}),K&&(0,a.jsx)(h.Z,{"aria-label":"settings",onClick:function(){Y(!Q&&K)},children:(0,a.jsx)(p.Z,{color:Q?"primary":"inherit"})})]}),Q&&""!=oe&&(0,a.jsx)(s.Z,{sx:{minWidth:120,my:2},children:(0,a.jsxs)(v.Z,{fullWidth:!0,children:[(0,a.jsx)(m.Z,{id:"select-camera-source-label",children:"Camera source"}),(0,a.jsx)(b.Z,{labelId:"select-camera-source-label",id:"select-camera-source",value:oe,label:"Select Camera",onChange:ye,children:be})]})}),Q&&""!=ce&&(0,a.jsx)(s.Z,{sx:{minWidth:120,my:2},children:(0,a.jsxs)(v.Z,{fullWidth:!0,children:[(0,a.jsx)(m.Z,{id:"select-audio-source-label",children:"Audio source"}),(0,a.jsx)(b.Z,{labelId:"select-audio-source-label",id:"select-audio-source",value:ce,label:"Select audio",onChange:we,children:me})]})}),F&&P.current&&(0,a.jsxs)(s.Z,{sx:{minWidth:120,my:2},children:["Current resolution (w:h): ",P.current.videoWidth,"x",P.current.videoHeight]}),(0,a.jsx)(o(),{id:"7277f7b6d5b1021c",children:'video.jsx-7277f7b6d5b1021c{width:100%;\nheight:100%}\n.video-hflip.jsx-7277f7b6d5b1021c{-webkit-transform:scaleX(-1);\n-webkit-transform:scaleX(-1);\n-moz-transform:scaleX(-1);\n-ms-transform:scaleX(-1);\ntransform:scaleX(-1)}\n.brokenvideo.jsx-7277f7b6d5b1021c{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}},7256:function(){},2578:function(){},2980:function(){},4862:function(){},7958:function(){},5410:function(){},8628:function(){},5042:function(){}}]);