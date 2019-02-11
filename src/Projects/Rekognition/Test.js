import React, { useContext } from 'react';
import { UserContext } from '../../App';
import useUserFiles from './hooks/useUserFiles';

export default function Test() {
  const user = useContext(UserContext);
  const { S3Files, getUserObjects } = useUserFiles(user.id);

  console.log('logging user context', S3Files.length);

  return (
    <div>
      {S3Files.map(f => (
        <li key={f.id}>{f.name}</li>
      ))}
      <button onClick={() => getUserObjects()}>Load More</button>
    </div>
  );
}
