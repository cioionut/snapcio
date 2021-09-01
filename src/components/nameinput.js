import { useState } from 'react';
import { useRouter } from 'next/router'


export default function NameInput() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  // const [micAccess, setMicAccess] = useState(false);


  // function requestMicAccess() {
  //   navigator.mediaDevices.getUserMedia({
  //     video: true, audio: true
  //   })
  //     .then(function(stream) {
  //       console.log('Stream received in NameInput')
  //       setMicAccess('granted')
  //     })
  //     .catch(function(err) {
  //       console.log(err)
  //       setMicAccess('denied')
  //     })
  // };

  function createRoom() {
    router.push(`/room?user=${userName}`)
  };

  return (
    <>
      <div>
        <label>Your name:</label>
        <input placeholder="Your Name" onChange={e => setUserName(e.target.value)} />
      </div>
      {/* <div style={{marginTop: 20}}>
        <button disabled={micAccess === 'granted'} onClick={requestMicAccess}>Allow Microphone Access</button>
      </div> */}
      <div style={{marginTop: 20}}>
        <button onClick={createRoom}>Create Room</button>
      </div>
    </>
  )
}