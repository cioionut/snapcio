"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[985],{7985:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var r=t(4051),a=t.n(r),o=t(5893),c=t(5988),i=t(7294),s=t(8158),u=t(7357),l=t(3321),d=t(7948);function f(e,n,t,r,a,o,c){try{var i=e[o](c),s=i.value}catch(u){return void t(u)}i.done?n(s):Promise.resolve(s).then(r,a)}function p(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function c(e){f(o,r,a,c,i,"next",e)}function i(e){f(o,r,a,c,i,"throw",e)}c(void 0)}))}}var g={iceServers:[{urls:"stun:".concat("15.161.216.220:3478")},{urls:"turn:".concat("15.161.216.220:3478"),username:"ciousr",credential:"T3mTypEIYYYBT473Lz6g"}]};function h(e){var n=new Date;console.log("["+n.toLocaleTimeString()+"] "+e)}function b(e){var n=new Date;console.trace("["+n.toLocaleTimeString()+"] "+e)}function v(e){b("Error ".concat(e.name,": ").concat(e.message))}function m(e,n,t){n.srcObject=e,n.volume=t?0:1,n.onloadedmetadata=function(){return n.play()}}var x={audio:!0,video:{aspectRatio:{ideal:1.333333}}};function k(){return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(w,{})})}function w(){var e=(0,i.useRef)(null),n=(0,i.useRef)(null),t=(0,i.useState)(null),r=t[0],f=t[1],k=(0,i.useState)(null),w=(k[0],k[1],(0,i.useState)([])),C=w[0],y=w[1],S=function(){var e=(0,i.useState)(null),n=e[0],t=e[1],r=(0,i.useState)("https://signaling.ionkom.com"),a=r[0];return r[1],(0,i.useEffect)((function(){var e=(0,s.ZP)(a);return t(e),function(){e.disconnect()}}),[a]),n}(),j=(0,i.useState)(null),T=j[0],E=j[1],D=(0,i.useState)(null),R=D[0],I=D[1],Y=(0,i.useState)(null),N=Y[0],L=Y[1],Z=(0,i.useState)([null]),_=(Z[0],Z[1],(0,i.useCallback)((function(e){h("Sending '"+e.type+"' message: "+e),S.emit(e.type,e)}),[S])),P=(0,i.useCallback)((function(){h("Closing the call"),N&&(h("--\x3e Closing the peer connection"),N.ontrack=null,N.onnicecandidate=null,N.oniceconnectionstatechange=null,N.onsignalingstatechange=null,N.onicegatheringstatechange=null,N.onnotificationneeded=null,N.getTransceivers().forEach((function(e){e.stop()})),N.close(),L(null)),I(null)}),[N]),U=(0,i.useCallback)((function(){P(),_({name:T,target:R,type:"hang-up"}),I(null)}),[P,_,T,R]),z=(0,i.useCallback)((function(e){switch(b(e),e.name){case"NotFoundError":alert("Unable to open your call because no camera and/or microphonewere found.");break;case"SecurityError":case"PermissionDeniedError":break;default:alert("Error opening your camera and/or microphone: "+e.message)}P()}),[P]),A=(0,i.useCallback)((function(e){e.candidate&&(h("*** Outgoing ICE candidate: "+e.candidate.candidate),_({type:"new-ice-candidate",target:R,candidate:e.candidate}))}),[_,R]),F=(0,i.useCallback)((function(e){switch(h("*** ICE connection state changed to "+N.iceConnectionState),N.iceConnectionState){case"closed":case"failed":case"disconnected":P()}}),[N,P]),O=(0,i.useCallback)((function(e){h("*** ICE gathering state changed to: "+N.iceGatheringState)}),[N]),B=(0,i.useCallback)((function(e){switch(h("*** WebRTC signaling state changed to: "+N.signalingState),N.signalingState){case"closed":P()}}),[N,P]),M=(0,i.useCallback)(p(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("*** Negotiation needed"),e.prev=1,h("---\x3e Creating offer"),e.next=5,N.createOffer();case 5:if(n=e.sent,"stable"==N.signalingState){e.next=9;break}return h("     -- The connection isn't stable yet; postponing..."),e.abrupt("return");case 9:return h("---\x3e Setting local description to the offer"),e.next=12,N.setLocalDescription(n);case 12:h("---\x3e Sending the offer to the remote peer"),_({name:T,target:R,type:"video-offer",sdp:N.localDescription}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),h("*** The following error occurred while handling the negotiationneeded event:"),v(e.t0);case 20:case"end":return e.stop()}}),e,null,[[1,16]])}))),[N,T,R,_]),q=(0,i.useCallback)((function(e){h("*** Track event: show remote stream"),m(e.streams[0],n.current,!1)}),[n]),G=(0,i.useCallback)(p(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("Setting up a connection..."),n=new RTCPeerConnection(g),L(n),e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),[]);(0,i.useEffect)((function(){N&&(N.onicecandidate=A,N.oniceconnectionstatechange=F,N.onicegatheringstatechange=O,N.onsignalingstatechange=B,N.onnegotiationneeded=M,N.ontrack=q)}),[N,A,F,O,B,M,q]);var J=(0,i.useCallback)(function(){var n=p(a().mark((function n(t){var r,o,c;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(h("Starting to prepare an invitation"),!N){n.next=5;break}alert("You can't start a call because you already have one open!"),n.next=28;break;case 5:if((r=t)!==T){n.next=9;break}return alert("I'm afraid I can't let you talk to yourself. That would be weird."),n.abrupt("return");case 9:return I(r),h("Inviting user "+r),h("Setting up connection to invite user: "+r),n.next=14,G();case 14:return o=n.sent,n.prev=15,n.next=18,navigator.mediaDevices.getUserMedia(x);case 18:(c=n.sent).getTracks().forEach((function(e){return o.addTransceiver(e,{streams:[c]})})),m(c,e.current,!0),f(c),n.next=28;break;case 24:return n.prev=24,n.t0=n.catch(15),z(n.t0),n.abrupt("return");case 28:case"end":return n.stop()}}),n,null,[[15,24]])})));return function(e){return n.apply(this,arguments)}}(),[N,T,G,z]);(0,i.useEffect)((function(){var n=function(e){h("*** Received hang up notification from other peer"),P()};if(S){var t=function(e){var n=e.users;console.log("updateUserList::ids: ".concat(n)),y(n.filter((function(e){return e!=S.id})))},o=function(e){var n=e.socketId;console.log("removeUser::ids: ".concat(n)),y(C.filter((function(e){return e!=n})))},c=function(e){var n=e.target;n?J(n):alert("No other users available")};return S.on("connect",(function(){E(S.id)})),S.on("update-user-list",t),S.on("remove-user",o),S.on("receive-a-match",c),S.on("video-offer",i),S.on("video-answer",u),S.on("new-ice-candidate",d),S.on("hang-up",n),function(){S.off("update-user-list",t),S.off("remove-user",o),S.off("receive-a-match",c),S.off("video-offer",i),S.off("video-answer",u),S.off("new-ice-candidate",d),S.off("hang-up",n)}}function i(e){return s.apply(this,arguments)}function s(){return(s=p(a().mark((function n(t){var o,c,i,s;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=t.name,I(o),c=N,h("Received video chat offer from "+o),N){n.next=8;break}return n.next=7,G();case 7:c=n.sent;case 8:if(i=new RTCSessionDescription(t.sdp),"stable"==c.signalingState){n.next=16;break}return h("  - But the signaling state isn't stable, so triggering rollback"),n.next=13,Promise.all([c.setLocalDescription({type:"rollback"}),c.setRemoteDescription(i)]);case 13:return n.abrupt("return");case 16:return h("  - Setting remote description"),n.next=19,c.setRemoteDescription(i);case 19:if(r){n.next=33;break}return n.prev=20,n.next=23,navigator.mediaDevices.getUserMedia(x);case 23:(s=n.sent).getTracks().forEach((function(e){return c.addTransceiver(e,{streams:[s]})})),m(s,e.current,!0),f(s),n.next=33;break;case 29:return n.prev=29,n.t0=n.catch(20),z(n.t0),n.abrupt("return");case 33:return c.getTransceivers().length<=2&&r.getTracks().forEach((function(e){return c.addTransceiver(e,{streams:[r]})})),h("---\x3e Creating and sending answer to caller"),n.t1=c,n.next=38,c.createAnswer();case 38:return n.t2=n.sent,n.next=41,n.t1.setLocalDescription.call(n.t1,n.t2);case 41:_({name:T,target:o,type:"video-answer",sdp:c.localDescription});case 42:case"end":return n.stop()}}),n,null,[[20,29]])})))).apply(this,arguments)}function u(e){return l.apply(this,arguments)}function l(){return(l=p(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h("*** Call recipient has accepted our call"),t=new RTCSessionDescription(n.sdp),e.next=4,N.setRemoteDescription(t).catch(v);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return g.apply(this,arguments)}function g(){return(g=p(a().mark((function e(n){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new RTCIceCandidate(n.candidate),h("*** Adding received ICE candidate: "+JSON.stringify(t)),e.prev=2,e.next=5,N.addIceCandidate(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),v(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})))).apply(this,arguments)}}),[S,N,G,T,R,r,C,_,P,z,J]);var W=(0,i.useCallback)((function(){R&&U(),S.emit("request-a-match",{name:T})}),[S,T,R,U]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(d.Z,{children:[(0,o.jsx)(u.Z,{children:(0,o.jsx)("video",{ref:n,className:"jsx-31493858784bb139 brokenvideo"})}),(0,o.jsx)(u.Z,{children:(0,o.jsx)("video",{ref:e,className:"jsx-31493858784bb139 "+"video-hflip ".concat(r?"":"brokenvideo")})}),(0,o.jsx)(u.Z,{children:(0,o.jsx)(l.Z,{variant:"contained",onClick:W,children:"Skip"})}),(0,o.jsxs)(u.Z,{children:["Available Users: ",C.length]})]}),(0,o.jsx)(c.default,{id:"31493858784bb139",children:'video.jsx-31493858784bb139{max-width:100%;\nheight:auto}\n.video-hflip.jsx-31493858784bb139{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.container.jsx-31493858784bb139{display:-webkit-box;\ndisplay:-webkit-flex;\ndisplay:-ms-flexbox;\ndisplay:flex}\n.container__half.jsx-31493858784bb139{-webkit-flex:1;\n-ms-flex:1;\nflex:1;\n-webkit-justify-content:center;\njustify-content:center}\n.brokenvideo.jsx-31493858784bb139{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}\n.button.jsx-31493858784bb139{background-color:blue;\nborder:none;\nborder-radius:5px;\ncolor:white;\npadding:15px 32px;\ntext-align:center;\n-webkit-text-decoration:none;\ntext-decoration:none;\ndisplay:inline-block;\nfont-size:16px;\nfont-weight:600;\ntransition-duration:0.4s;\ncursor:pointer}\n.button.jsx-31493858784bb139:hover{background-color:#4CAF50;\ncolor:white}'})]})}}}]);