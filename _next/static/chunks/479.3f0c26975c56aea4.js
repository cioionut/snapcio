"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[479],{7479:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var n=a(5893),r=a(5988),c=a(7294),i=a(5819),l=a(7357),o=a(8456),s=a(3321),d=a(4054),u=a(3841),v=a(4917),f=a(7658);function h(e){console.log("navigator.MediaDevices.getUserMedia error: ",e.message,e.name)}function m(){var e=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];m(e);var a=g.current;return a.srcObject=e,a.volume=t?0:1,a.onloadedmetadata=function(){return a.play()},navigator.mediaDevices.enumerateDevices()},t=(0,c.useContext)(f.F),a=t.localStream,m=t.setLocalStream,g=(0,c.useRef)(null),b=(0,c.useState)(!1),x=b[0],j=b[1],k=(0,c.useState)([]),C=(k[0],k[1]),p=(0,c.useState)(""),Z=p[0],S=p[1],I=(0,c.useState)(""),y=I[0],D=I[1],Y=(0,c.useState)([]),w=Y[0],_=Y[1],E=(0,c.useState)([]),W=E[0],M=E[1],N=w.map((function(e){return(0,n.jsx)(i.Z,{value:e.deviceId,children:e.label},e.deviceId)})),z=W.map((function(e){return(0,n.jsx)(i.Z,{value:e.deviceId,children:e.label},e.deviceId)})),F=function(e){C(e)},O=(0,c.useCallback)((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Z;a&&a.getTracks().forEach((function(e){e.stop()}));var r={audio:{deviceId:n?{exact:n}:void 0},video:{deviceId:t?{exact:t}:void 0}};navigator.mediaDevices.getUserMedia(r).then(e).then(F).catch(h)}),[a,Z,y,F]),T=(0,c.useCallback)((function(e){D(e.target.value),O(e.target.value)}),[O]),U=(0,c.useCallback)((function(e){S(e.target.value),O(void 0,e.target.value)}),[O]),A=(0,c.useCallback)((function(){var e,t;navigator.mediaDevices.enumerateDevices().then((function(a){C(a);var n=a.filter((function(e){return"audioinput"===e.kind})),r=a.filter((function(e){return"videoinput"===e.kind}));_(n),M(r),n.length>0&&(t=n[0].deviceId,S(t)),r.length>0&&(e=r[0].deviceId,D(e))})).catch(h),O(e,t),j(!0)}),[O]),L=(0,c.useCallback)((function(){j(!1),a&&a.getTracks().forEach((function(e){e.stop()})),g.current.srcObject=null,m(null)}),[a,m]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.Z,{sx:{display:"flex",my:3,height:300,justifyContent:"center",alignItems:"center",backgroundColor:"black"},children:x?(0,n.jsx)("video",{ref:g,className:"jsx-21692c2f1b6e7001"}):(0,n.jsx)(o.Z,{})}),(0,n.jsx)(l.Z,{children:x?(0,n.jsx)(s.Z,{variant:"outlined",color:"error",onClick:L,children:"Stop Camera"}):(0,n.jsx)(s.Z,{variant:"outlined",onClick:A,children:"Start Camera"})}),x&&(0,n.jsx)(l.Z,{sx:{minWidth:120,my:2},children:(0,n.jsxs)(d.Z,{fullWidth:!0,children:[(0,n.jsx)(u.Z,{id:"select-camera-source-label",children:"Camera source"}),(0,n.jsx)(v.Z,{labelId:"select-camera-source-label",id:"select-camera-source",value:y,label:"Select Camera",onChange:T,children:z})]})}),x&&(0,n.jsx)(l.Z,{sx:{minWidth:120,my:2},children:(0,n.jsxs)(d.Z,{fullWidth:!0,children:[(0,n.jsx)(u.Z,{id:"select-audio-source-label",children:"Audio source"}),(0,n.jsx)(v.Z,{labelId:"select-audio-source-label",id:"select-audio-source",value:Z,label:"Select audio",onChange:U,children:N})]})}),(0,n.jsx)(r.default,{id:"21692c2f1b6e7001",children:'video.jsx-21692c2f1b6e7001{max-width:100%;\nmax-height:100%}\n.video-hflip.jsx-21692c2f1b6e7001{-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg);\n-ms-transform:rotateY(180deg);\ntransform:rotateY(180deg);\n-webkit-transform:rotateY(180deg);\n-moz-transform:rotateY(180deg)}\n.brokenvideo.jsx-21692c2f1b6e7001{background-image:url("/broken_stream.gif");\nbackground-repeat:no-repeat;\nbackground-color:#cccccc;\nmargin-bottom:15px}'})]})}}}]);