"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[985],{7985:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var r=t(4051),a=t.n(r),o=t(5893),c=t(5988),i=t.n(c),s=t(7294),u=t(8158),l=t(7357),d=t(3321),f=t(7948);function p(e,n,t,r,a,o,c){try{var i=e[o](c),s=i.value}catch(u){return void t(u)}i.done?n(s):Promise.resolve(s).then(r,a)}function g(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function c(e){p(o,r,a,c,i,"next",e)}function i(e){p(o,r,a,c,i,"throw",e)}c(void 0)}))}}var h={iceServers:[{urls:"stun:".concat("turn.gcp1.ionkom.com:3478")},{urls:"turn:".concat("turn.gcp1.ionkom.com:3478"),username:"ionkom",credential:"mgzvolNHkyEjW7KvXuPe"}]};function b(e){var n=new Date;console.log("["+n.toLocaleTimeString()+"] "+e)}function v(e){var n=new Date;console.trace("["+n.toLocaleTimeString()+"] "+e)}function m(e){v("Error ".concat(e.name,": ").concat(e.message))}function x(e,n,t){n.srcObject=e,n.volume=t?0:1,n.onloadedmetadata=function(){return n.play()}}var k={audio:!0,video:{aspectRatio:{ideal:1.333333}}};function w(){return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(C,{})})}function C(){var e=(0,s.useRef)(null),n=(0,s.useRef)(null),t=(0,s.useState)(null),r=t[0],c=t[1],p=(0,s.useState)(null),w=(p[0],p[1],(0,s.useState)([])),C=w[0],y=w[1],S=function(){var e=(0,s.useState)(null),n=e[0],t=e[1],r=(0,s.useState)("https://signaling.gcp1.ionkom.com"),a=r[0];return r[1],(0,s.useEffect)((function(){var e=(0,u.ZP)(a);return t(e),function(){e.disconnect()}}),[a]),n}(),j=(0,s.useState)(null),E=j[0],T=j[1],D=(0,s.useState)(null),R=D[0],I=D[1],N=(0,s.useState)(null),P=N[0],Y=N[1],Z=(0,s.useState)([null]),_=(Z[0],Z[1],(0,s.useCallback)((function(e){b("Sending '"+e.type+"' message: "+e),S.emit(e.type,e)}),[S])),L=(0,s.useCallback)((function(){b("Closing the call"),P&&(b("--\x3e Closing the peer connection"),P.ontrack=null,P.onnicecandidate=null,P.oniceconnectionstatechange=null,P.onsignalingstatechange=null,P.onicegatheringstatechange=null,P.onnotificationneeded=null,P.getTransceivers().forEach((function(e){e.stop()})),P.close(),Y(null)),I(null)}),[P]),U=(0,s.useCallback)((function(){L(),_({name:E,target:R,type:"hang-up"}),I(null)}),[L,_,E,R]),z=(0,s.useCallback)((function(e){switch(v(e),e.name){case"NotFoundError":alert("Unable to open your call because no camera and/or microphonewere found.");break;case"SecurityError":case"PermissionDeniedError":break;default:alert("Error opening your camera and/or microphone: "+e.message)}L()}),[L]),A=(0,s.useCallback)((function(e){e.candidate&&(b("*** Outgoing ICE candidate: "+e.candidate.candidate),_({type:"new-ice-candidate",target:R,candidate:e.candidate}))}),[_,R]),F=(0,s.useCallback)((function(e){switch(b("*** ICE connection state changed to "+P.iceConnectionState),P.iceConnectionState){case"closed":case"failed":case"disconnected":L()}}),[P,L]),O=(0,s.useCallback)((function(e){b("*** ICE gathering state changed to: "+P.iceGatheringState)}),[P]),M=(0,s.useCallback)((function(e){switch(b("*** WebRTC signaling state changed to: "+P.signalingState),P.signalingState){case"closed":L()}}),[P,L]),W=(0,s.useCallback)(g(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b("*** Negotiation needed"),e.prev=1,b("---\x3e Creating offer"),e.next=5,P.createOffer();case 5:if(n=e.sent,"stable"==P.signalingState){e.next=9;break}return b("     -- The connection isn't stable yet; postponing..."),e.abrupt("return");case 9:return b("---\x3e Setting local description to the offer"),e.next=12,P.setLocalDescription(n);case 12:b("---\x3e Sending the offer to the remote peer"),_({name:E,target:R,type:"video-offer",sdp:P.localDescription}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),b("*** The following error occurred while handling the negotiationneeded event:"),m(e.t0);case 20:case"end":return e.stop()}}),e,null,[[1,16]])}))),[P,E,R,_]),q=(0,s.useCallback)((function(e){b("*** Track event: show remote stream"),x(e.streams[0],n.current,!1)}),[n]),B=(0,s.useCallback)(g(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b("Setting up a connection..."),n=new RTCPeerConnection(h),Y(n),e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),[]);(0,s.useEffect)((function(){P&&(P.onicecandidate=A,P.oniceconnectionstatechange=F,P.onicegatheringstatechange=O,P.onsignalingstatechange=M,P.onnegotiationneeded=W,P.ontrack=q)}),[P,A,F,O,M,W,q]);var G=(0,s.useCallback)(function(){var n=g(a().mark((function n(t){var r,o,i;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(b("Starting to prepare an invitation"),!P){n.next=5;break}alert("You can't start a call because you already have one open!"),n.next=28;break;case 5:if((r=t)!==E){n.next=9;break}return alert("I'm afraid I can't let you talk to yourself. That would be weird."),n.abrupt("return");case 9:return I(r),b("Inviting user "+r),b("Setting up connection to invite user: "+r),n.next=14,B();case 14:return o=n.sent,n.prev=15,n.next=18,navigator.mediaDevices.getUserMedia(k);case 18:(i=n.sent).getTracks().forEach((function(e){return o.addTransceiver(e,{streams:[i]})})),x(i,e.current,!0),c(i),n.next=28;break;case 24:return n.prev=24,n.t0=n.catch(15),z(n.t0),n.abrupt("return");case 28:case"end":return n.stop()}}),n,null,[[15,24]])})));return function(e){return n.apply(this,arguments)}}(),[P,E,B,z]);(0,s.useEffect)((function(){var n=function(e){b("*** Received hang up notification from other peer"),L()};if(S){var t=function(e){var n=e.users;console.log("updateUserList::ids: ".concat(n)),y(n.filter((function(e){return e!=S.id})))},o=function(e){var n=e.socketId;console.log("removeUser::ids: ".concat(n)),y(C.filter((function(e){return e!=n})))},i=function(e){var n=e.target;n?G(n):alert("No other users available")};return S.on("connect",(function(){T(S.id)})),S.on("update-user-list",t),S.on("remove-user",o),S.on("receive-a-match",i),S.on("video-offer",s),S.on("video-answer",l),S.on("new-ice-candidate",f),S.on("hang-up",n),function(){S.off("update-user-list",t),S.off("remove-user",o),S.off("receive-a-match",i),S.off("video-offer",s),S.off("video-answer",l),S.off("new-ice-candidate",f),S.off("hang-up",n)}}function s(e){return u.apply(this,arguments)}function u(){return(u=g(a().mark((function n(t){var o,i,s,u;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=t.name,I(o),i=P,b("Received video chat offer from "+o),P){n.next=8;break}return n.next=7,B();case 7:i=n.sent;case 8:if(s=new RTCSessionDescription(t.sdp),"stable"==i.signalingState){n.next=16;break}return b("  - But the signaling state isn't stable, so triggering rollback"),n.next=13,Promise.all([i.setLocalDescription({type:"rollback"}),i.setRemoteDescription(s)]);case 13:return n.abrupt("return");case 16:return b("  - Setting remote description"),n.next=19,i.setRemoteDescription(s);case 19:if(r){n.next=33;break}return n.prev=20,n.next=23,navigator.mediaDevices.getUserMedia(k);case 23:(u=n.sent).getTracks().forEach((function(e){return i.addTransceiver(e,{streams:[u]})})),x(u,e.current,!0),c(u),n.next=33;break;case 29:return n.prev=29,n.t0=n.catch(20),z(n.t0),n.abrupt("return");case 33:return i.getTransceivers().length<=2&&r.getTracks().forEach((function(e){return i.addTransceiver(e,{streams:[r]})})),b("---\x3e Creating and sending answer to caller"),n.t1=i,n.next=38,i.createAnswer();case 38:return n.t2=n.sent,n.next=41,n.t1.setLocalDescription.call(n.t1,n.t2);case 41:_({name:E,target:o,type:"video-answer",sdp:i.localDescription});case 42:case"end":return n.stop()}}),n,null,[[20,29]])})))).apply(this,arguments)}function l(e){return d.apply(this,arguments)}function d(){return(d=g(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b("*** Call recipient has accepted our call"),t=new RTCSessionDescription(n.sdp),e.next=4,P.setRemoteDescription(t).catch(m);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){return p.apply(this,arguments)}function p(){return(p=g(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new RTCIceCandidate(n.candidate),b("*** Adding received ICE candidate: "+JSON.stringify(t)),e.prev=2,e.next=5,P.addIceCandidate(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),m(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})))).apply(this,arguments)}}),[S,P,B,E,R,r,C,_,L,z,G]);var H=(0,s.useCallback)((function(){R&&U(),S.emit("request-a-match",{name:E})}),[S,E,R,U]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(f.Z,{children:[(0,o.jsx)(l.Z,{children:(0,o.jsx)("video",{ref:n,className:"jsx-31493858784bb139 brokenvideo"})}),(0,o.jsx)(l.Z,{children:(0,o.jsx)("video",{ref:e,className:"jsx-31493858784bb139 "+"video-hflip ".concat(r?"":"brokenvideo")})}),(0,o.jsx)(l.Z,{children:(0,o.jsx)(d.Z,{variant:"contained",onClick:H,children:"Skip"})}),(0,o.jsxs)(l.Z,{children:["Available Users: ",C.length]})]}),(0,o.jsx)(i(),{id:"31493858784bb139",children:'video.jsx-31493858784bb139{max-width:100%;\nheight:auto}\n.video-hflip.jsx-31493858784bb139{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.container.jsx-31493858784bb139{display:-webkit-box;\ndisplay:-webkit-flex;\ndisplay:-ms-flexbox;\ndisplay:flex}\n.container__half.jsx-31493858784bb139{-webkit-flex:1;\n-ms-flex:1;\nflex:1;\n-webkit-justify-content:center;\njustify-content:center}\n.brokenvideo.jsx-31493858784bb139{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}\n.button.jsx-31493858784bb139{background-color:blue;\nborder:none;\nborder-radius:5px;\ncolor:white;\npadding:15px 32px;\ntext-align:center;\n-webkit-text-decoration:none;\ntext-decoration:none;\ndisplay:inline-block;\nfont-size:16px;\nfont-weight:600;\ntransition-duration:0.4s;\ncursor:pointer}\n.button.jsx-31493858784bb139:hover{background-color:#4CAF50;\ncolor:white}'})]})}}}]);