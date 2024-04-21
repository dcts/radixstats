import { useEffect, useState } from 'react';
import './App.css';

import { formatNumberWithApostrophes, chartOptions, getChartData } from "./utils/utils";
import { fetchTokenInfo, fetchTokenHolders, dexterAddress } from "./utils/fetchData";

import { Chart } from "react-google-charts";

function getResource() {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('resource') || dexterAddress;
  }
  return dexterAddress;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [holdersList, setHoldersList] = useState([]);
  const [totalHolders, setTotalHolders] = useState(0);
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const resource = getResource();
      const [tokenInfoResult, tokenHoldersResult] = await Promise.all([
        fetchTokenInfo(resource),
        fetchTokenHolders(resource),
      ]);
      setHoldersList(tokenHoldersResult.addresses);
      setTotalHolders(tokenHoldersResult.holders);
      setTokenInfo(tokenInfoResult);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // function renderTokenInfo() {
  //   return 
  // }

  function renderLoadingState() {
    return <>
      <h1>Loading...</h1>
    </>
  }

  return (
    <div>
      {isLoading ? renderLoadingState() : <>
        <h1>TOKEN xxxYYYzzz?</h1>
        Total Holders: {totalHolders}
        <p>Coin: {tokenInfo.name}</p>
        <p>description: {tokenInfo.description}</p>
        <p>address: {tokenInfo.address}</p>
        <p>iconUrl: {tokenInfo.iconUrl}</p>
        <p>website: {tokenInfo.website}</p>
        <img src={tokenInfo.iconUrl} alt="token icon" width={80} />
        <Chart
          chartType="PieChart"
          data={getChartData(holdersList, totalHolders, tokenInfo.totalSupply)}
          options={chartOptions}
          width={"100%"}
          height={"400px"}
        />
        {holdersList.slice(0, 100).map((obj, indx) => {
          return <div className="flex asd" key={indx}>
            <div className="truncate">{obj.account_id}</div>
            <div>{formatNumberWithApostrophes(obj.balance.toFixed(2))}</div>
          </div>
        })}
      </>}
      <Chart
        chartType="PieChart"
        data={getChartData(holdersList, totalHolders, tokenInfo.totalSupply)}
        options={chartOptions}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default App;
