import { useState } from 'react';
import { useRouter } from 'next/router'


export default function NameInput() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [micAccess, setMicAccess] = useState(false);


  function requestMicAccess() {
    navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(function(stream) {
        setMicAccess('granted')
      })
      .catch(function(err) {
        setMicAccess('denied')
      })
  };

  function createRoom() {
    router.push(`/cast/${userName}`)
  };

  return (
    <>
      <div>
        <label>Your name:</label>
        <input placeholder="Your Name" onChange={e => setUserName(e.target.value)} />
      </div>
      <div style={{marginTop: 20}}>
        <button success={micAccess === 'granted'} disabled={micAccess === 'granted'} fullWidth onClick={requestMicAccess}>Allow Microphone Access</button>
      </div>
      <div style={{marginTop: 20}}>
        <button outline={micAccess !== 'granted'} disabled={micAccess !== 'granted'} big fullWidth onClick={createRoom}>Create Room</button>
      </div>
    </>
  )
}