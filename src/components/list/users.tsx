import { useContext, MouseEvent } from 'react';

import { MyAppContext } from '../../contexts/MyAppContext';


export default function UserList({ users }) {
  const { callUser } = useContext(MyAppContext);

  let usersDisp = users.map((socketID, idx) => {    
    return (
        <li key={idx} onClick={ (event: MouseEvent<HTMLLIElement>) => {
          event.preventDefault();
          callUser(socketID);
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