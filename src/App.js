import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


function getResource() {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('resource');
  }
  return "";
}

function App() {
  const [tokenHolders, setTokenHolders] = useState([]);

  useEffect(() => {
    function loadTokenHolders() {
      
      fetch(`https://gettokenholderscors-rvn75v2dcq-uc.a.run.app/?resource=${getResource()}`)
        .then(res => res.json())
        .then(data => {
          setTokenHolders(data.data.data);
          console.log(data.data.data);
        });
    }
    loadTokenHolders();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>TOKEN xxxYYYzzz?</h1>
        Total Holders: {tokenHolders?.length}
        {tokenHolders?.map(obj => {
          return <div className="flex asd">
            <div className="truncate">{obj.account_id}</div>
            <div>{obj.balance}</div>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;
