"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[851],{3851:function(e,n,t){t.r(n),t.d(n,{WebRTCContext:function(){return d},WebRTCContextProvider:function(){return h}});var a=t(4051),r=t.n(a),c=t(5893),o=t(7294),i=t(8158),s=t(7658);function u(e,n,t,a,r,c,o){try{var i=e[c](o),s=i.value}catch(u){return void t(u)}i.done?n(s):Promise.resolve(s).then(a,r)}function l(e){return function(){var n=this,t=arguments;return new Promise((function(a,r){var c=e.apply(n,t);function o(e){u(c,a,r,o,i,"next",e)}function i(e){u(c,a,r,o,i,"throw",e)}o(void 0)}))}}var f={iceServers:[{urls:"stun:".concat("15.161.216.220:3478")},{urls:"turn:".concat("15.161.216.220:3478"),username:"ciousr",credential:"T3mTypEIYYYBT473Lz6g"}]},d=(0,o.createContext)({nextUser:function(){},hangUpCall:function(){},availableUsers:[],myUsername:void 0,peerConnection:null});function p(e){var n=new Date;console.log("["+n.toLocaleTimeString()+"] "+e)}function g(e){!function(e){var n=new Date;console.trace("["+n.toLocaleTimeString()+"] "+e)}("Error ".concat(e.name,": ").concat(e.message))}var h=function(e){var n=e.children,t=function(){var e=(0,o.useState)(null),n=e[0],t=e[1],a=(0,o.useState)("https://signaling.ionkom.com"),r=a[0];return a[1],(0,o.useEffect)((function(){var e=(0,i.ZP)(r);return t(e),function(){e.disconnect()}}),[r]),n}(),a=(0,o.useContext)(s.F),u=a.localStream,h=a.remoteStream,v=a.setRemoteStream,m=(0,o.useState)(null),C=m[0],b=m[1],k=(0,o.useState)([]),w=k[0],x=k[1],S=(0,o.useState)(null),T=S[0],y=S[1],E=(0,o.useState)(void 0),R=E[0],D=E[1],I=(0,o.useCallback)((function(e){p("Sending '"+e.type+"' message: "+e),t.emit(e.type,e)}),[t]),U=(0,o.useCallback)((function(){p("Closing the call"),C&&(p("--\x3e Closing the peer connection"),C.ontrack=null,C.onnicecandidate=null,C.oniceconnectionstatechange=null,C.onsignalingstatechange=null,C.onicegatheringstatechange=null,C.onnotificationneeded=null,"close"!=C.connectionState&&C.getTransceivers().forEach((function(e){e.stop()})),h&&h.srcObject&&(h.pause(),h.srcObject.getTracks().forEach((function(e){e.stop()}))),v(null),C.close(),b(null))}),[C]),P=(0,o.useCallback)((function(){R&&(p("*** Hang up the call"),U(),I({name:T,target:R,type:"hang-up"}),D(null))}),[U,I,T,R]),L=(0,o.useCallback)((function(){P(),t.emit("request-a-match",{name:T})}),[t,T,R,P]),N=(0,o.useCallback)((function(e){e.candidate&&(p("*** Outgoing ICE candidate: "+e.candidate.candidate),I({type:"new-ice-candidate",target:R,candidate:e.candidate}))}),[I,R]),O=(0,o.useCallback)((function(e){switch(p("*** ICE connection state changed to "+C.iceConnectionState),C.iceConnectionState){case"closed":case"failed":U()}}),[C,U]),A=(0,o.useCallback)((function(e){p("*** ICE gathering state changed to: "+C.iceGatheringState)}),[C]),Y=(0,o.useCallback)((function(e){switch(p("*** WebRTC signaling state changed to: "+C.signalingState),C.signalingState){case"closed":U()}}),[C,U]),_=(0,o.useCallback)(l(r().mark((function e(){var n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p("*** Negotiation needed"),e.prev=1,p("---\x3e Creating offer"),e.next=5,C.createOffer();case 5:if(n=e.sent,"stable"==C.signalingState){e.next=9;break}return p("     -- The connection isn't stable yet; postponing..."),e.abrupt("return");case 9:return p("---\x3e Setting local description to the offer"),e.next=12,C.setLocalDescription(n);case 12:p("---\x3e Sending the offer to the remote peer"),I({name:T,target:R,type:"video-offer",sdp:C.localDescription}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),p("*** The following error occurred while handling the negotiationneeded event:"),g(e.t0);case 20:case 21:case"end":return e.stop()}}),e,null,[[1,16]])}))),[C,T,R,I]),j=(0,o.useCallback)((function(e){p("*** Track event: show remote stream"),v(e.streams[0])}),[]);(0,o.useEffect)((function(){C&&(C.onicecandidate=N,C.oniceconnectionstatechange=O,C.onicegatheringstatechange=A,C.onsignalingstatechange=Y,C.onnegotiationneeded=_,C.ontrack=j)}),[C,N,O,A,Y,_,j]);var W=(0,o.useCallback)(l(r().mark((function e(){var n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p("Setting up a connection..."),n=new RTCPeerConnection(f),b(n),e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),[]),B=(0,o.useCallback)(function(){var e=l(r().mark((function e(n){var t,a;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p("Starting to prepare an invitation"),!C){e.next=5;break}alert("You can't start a call because you already have one open!"),e.next=17;break;case 5:if((t=n)!==T){e.next=9;break}return alert("I'm afraid I can't let you talk to yourself. That would be weird."),e.abrupt("return");case 9:return D(t),p("Inviting user "+t),p("Setting up connection to invite user: "+t),e.next=14,W();case 14:a=e.sent,u&&(p("Add the local camera stream to the RTCPeerConnection"),u.getTracks().forEach((function(e){return a.addTransceiver(e,{streams:[u]})})));case 17:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[C,T,u,W,I,D]);return(0,o.useEffect)((function(){var e=function(e){p("*** Received hang up notification from other peer"),U()};if(t){var n=function(e){var n=e.users;p("usr::updateUserList::ids: ".concat(n)),x(n.filter((function(e){return e!=t.id})))},a=function(e){var n=e.socketId;p("usr::removeUser::ids: ".concat(n)),x(w.filter((function(e){return e!=n})))},c=function(e){var n=e.target;n?(p("inviteToCall: ".concat(n)),B(n)):alert("No other users available")};return t.on("connect",(function(){return y(t.id)})),t.on("update-user-list",n),t.on("remove-user",a),t.on("receive-a-match",c),t.on("video-offer",o),t.on("video-answer",s),t.on("new-ice-candidate",d),t.on("hang-up",e),function(){t.off("update-user-list",n),t.off("remove-user",a),t.off("receive-a-match",c),t.off("video-offer",o),t.off("video-answer",s),t.off("new-ice-candidate",d),t.off("hang-up",e)}}function o(e){return i.apply(this,arguments)}function i(){return(i=l(r().mark((function e(n){var t,a,c;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.name,D(t),a=C,p("Received video chat offer from "+t),C){e.next=8;break}return e.next=7,W();case 7:a=e.sent;case 8:if(c=new RTCSessionDescription(n.sdp),"stable"==a.signalingState){e.next=16;break}return p("  - But the signaling state isn't stable, so triggering rollback"),e.next=13,Promise.all([a.setLocalDescription({type:"rollback"}),a.setRemoteDescription(c)]);case 13:return e.abrupt("return");case 16:return p("  - Setting remote description"),e.next=19,a.setRemoteDescription(c);case 19:return a.getTransceivers().length<=2&&u&&(p("Add the local camera stream to the RTCPeerConnection"),u.getTracks().forEach((function(e){return a.addTransceiver(e,{streams:[u]})}))),p("---\x3e Creating and sending answer to caller"),e.t0=a,e.next=25,a.createAnswer();case 25:return e.t1=e.sent,e.next=28,e.t0.setLocalDescription.call(e.t0,e.t1);case 28:I({name:T,target:t,type:"video-answer",sdp:a.localDescription});case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(e){return f.apply(this,arguments)}function f(){return(f=l(r().mark((function e(n){var t;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p("*** Call recipient has accepted our call"),t=new RTCSessionDescription(n.sdp),e.next=4,C.setRemoteDescription(t).catch(g);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return h.apply(this,arguments)}function h(){return(h=l(r().mark((function e(n){var t;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new RTCIceCandidate(n.candidate),p("*** Adding received ICE candidate: "+JSON.stringify(t)),e.prev=2,e.next=5,C.addIceCandidate(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),g(e.t0);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})))).apply(this,arguments)}}),[t,C,T,R,u,w,I,U]),(0,c.jsx)(d.Provider,{value:{nextUser:L,hangUpCall:P,availableUsers:w,myUsername:T,peerConnection:C},children:n})}}}]);