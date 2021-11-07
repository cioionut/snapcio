import { useContext, MouseEvent } from 'react';

import { MyAppContext } from '../../contexts/MyAppContext';


export default function UserList({ users, invite }) {
  const { callUser } = useContext(MyAppContext);

  if (!invite)
    invite = callUser

  let usersDisp = users.map((socketID, idx) => {    
    return (
        <li key={idx} onClick={ (event: MouseEvent<HTMLLIElement>) => {
          event.preventDefault();
          invite(socketID);
        } }>{ socketID }</li>
    )
  });

  return (
    <>
        <ul>
            { usersDisp }
        </ul>
    </>
  )
}