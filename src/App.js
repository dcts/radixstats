import { useEffect, useState } from 'react';
import './App.css';

import { formatNumberWithApostrophes } from "./utils/utils";
import { fetchTokenInfo, fetchTokenHolders, radixResourceAddress } from "./utils/fetchData";

function getResource() {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('resource');
  }
  return radixResourceAddress;
}

function App() {
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    async function loadData() {
      const resource = getResource();
      const [tokenInfo, tokenHolders] = await Promise.all([
        fetchTokenInfo(resource),
        fetchTokenHolders(resource),
      ]);
      setTokenHolders(tokenHolders);
      setTokenInfo(tokenInfo);
      console.log({tokenInfo, tokenHolders});
    }
    loadData();
  }, [])
  return (
    <div>
      <h1>TOKEN xxxYYYzzz?</h1>
      Total Holders: {tokenHolders?.length}
      <p>Coin: {tokenInfo.name}</p>
      <p>description: {tokenInfo.description}</p>
      <p>address: {tokenInfo.address}</p>
      <p>iconUrl: {tokenInfo.iconUrl}</p>
      <p>website: {tokenInfo.website}</p>
      <img src={tokenInfo.iconUrl} alt="token icon" width={80}/>
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
