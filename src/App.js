import { useEffect, useState } from 'react';
import './App.css';

import { formatNumberWithApostrophes } from "./utils/utils";
import { fetchTokenInfo, fetchTokenHolders, dexterAddress } from "./utils/fetchData";

import { Chart } from "react-google-charts";

const options = {
  title: "My Daily Activities",
};

function getResource() {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    const resourceFromUrl = urlParams.get('resource') || dexterAddress;
    console.log("resourceFromUrl");
    console.log(resourceFromUrl);
    return resourceFromUrl;
  }
  return dexterAddress;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});

  const data = [["Address", "Token Quantity"], ["1", 123], ["2", 13]];
  // console.log("tokenHolders.addesses");
  // console.log(tokenHolders.addesses);
  // tokenHolders.addesses?.slice(0,12).forEach(obj => {
  //   const dataRow = [obj.addresses.account_id, obj.addresses.balance];
  //   console.log("dataRow");
  //   console.log(dataRow);
  // });
  // console.log(data);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const resource = getResource();
      const [tokenInfoResult, tokenHoldersResult] = await Promise.all([
        fetchTokenInfo(resource),
        fetchTokenHolders(resource),
      ]);
      setTokenHolders(tokenHoldersResult);
      setTokenInfo(tokenInfoResult);
      setIsLoading(false);
      console.log({ tokenInfo, tokenHolders });
    }
    loadData();
  }, [])

  function renderTokenInfo() {
    return <> <h1>TOKEN xxxYYYzzz?</h1>
      Total Holders: {tokenHolders.holders}
      <p>Coin: {tokenInfo.name}</p>
      <p>description: {tokenInfo.description}</p>
      <p>address: {tokenInfo.address}</p>
      <p>iconUrl: {tokenInfo.iconUrl}</p>
      <p>website: {tokenInfo.website}</p>
      <img src={tokenInfo.iconUrl} alt="token icon" width={80} />
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
      {tokenHolders.addesses?.slice(0, 100).map((obj, indx) => {
        return <div className="flex asd" key={indx}>
          <div className="truncate">{obj.account_id}</div>
          <div>{formatNumberWithApostrophes(obj.balance.toFixed(2))}</div>
        </div>
      })}
    </>
  }

  function renderLoadingState() {
    return <>
      <h1>Loading...</h1>
    </>
  }

  return (
    <div>
      {isLoading ? renderLoadingState() : renderTokenInfo()}
    </div>
  );
}

export default App;
