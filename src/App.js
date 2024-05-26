import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Notes from './Notes';

function App() {
  const [notes, setNotes] = useState([
    {
      id:1,
      text:'Complete React Coding question'
    },
    {
      id:2,
      text:'Leetcode easy question done'
    }
  ])
  return (
    <div className="App">
     <Notes notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
