import { useState } from 'react';
import './App.css';
import UserForm from './UserForm';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h3>Hello world</h3>
        <UserForm onUserAdd={onUserAdd} />
        <hr />
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;
