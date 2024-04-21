import { useEffect, useState } from 'react';
import './App.css';

import { formatNumberWithApostrophes } from "./utils/utils";

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
    <div>
      <h1>TOKEN xxxYYYzzz?</h1>
      Total Holders: {tokenHolders?.length}
      {tokenHolders?.map(obj => {
        return <div className="flex asd">
          <div className="truncate">{obj.account_id}</div>
          <div>{formatNumberWithApostrophes(obj.balance.toFixed(2))}</div>
        </div>
      })}
    </div>
  );
}

export default App;
