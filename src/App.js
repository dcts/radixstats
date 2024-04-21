import { useEffect, useState } from 'react';
import './App.css';

import { formatNumberWithApostrophes, chartOptions, getChartData, trunc } from "./utils/utils";
import { fetchTokenInfo, fetchTokenHolders, dexterAddress, calculateTop100own, calculateTop100totalTokens } from "./utils/fetchData";

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
  const [top100own, setTop100own] = useState(0);
  const [top100totalTokens, setTop100totalTokens] = useState(0);

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
      setTop100own(calculateTop100own(tokenHoldersResult.addresses, tokenInfo.totalSupply));
      setTop100totalTokens(calculateTop100totalTokens(tokenHoldersResult.addresses));
      setTokenInfo(tokenInfoResult);
      setIsLoading(false);
    }
    loadData();
  }, []);

  function renderTokenHeader() {
    return <div className="tokenHeader">
      <div className="flex space-between">
        <div className="flex w-full items-center">
          <div>
            <img className="tokenLogo" src={tokenInfo.iconUrl} width={64} alt="token icon" />
          </div>
          <div className="tokenName">{tokenInfo.name} ({tokenInfo.symbol?.toUpperCase()})</div>
          <div className="badge">
            <p>{trunc(tokenInfo.address, 3, 6)}</p>
            <div className="flex justify-center align-center">
              <img className="copyIcon" src="/copy-to-clipboard.svg" alt="copy icon" />
            </div>
          </div>
        </div>
        <div className="websiteBttnContainer pointer flex justify-center align-center">
          <div className="websiteBttn flex">
            <img src="/website.svg" alt="website icon" />
            <a className="pointer" href={tokenInfo.website} target="_blank" rel="noreferrer">Website</a>
          </div>
        </div>
      </div>
      <div className="description">{tokenInfo.description}</div>
    </div>;
  }
  function renderTokenInfo() {
    return <div className="tokenInfo">
      <div className="card shadow-md">
        <div>
          <p className="key">TOTAL SUPPLY</p>
          <p className="value">{formatNumberWithApostrophes(tokenInfo.totalSupply)} {tokenInfo.symbol?.toUpperCase()}</p>
        </div>
        <div>
          <p className="key">MARKET CAP</p>
          <p className="value">{formatNumberWithApostrophes(tokenInfo.marketcap)} {"USD"}</p>
        </div>
        <div>
          <p className="key">HOLDERS</p>
          <p className="value">{totalHolders}</p>
        </div>
      </div>
    </div>;
  }
  function renderChart() {
    return <div className="chart relative">
      <div className="chartTitle absolute center">
        <p className="title">HOLDERS</p>
        <p className="sub1">The top 100 holders collectively own {(top100own*100).toFixed(2)}</p>
        <p className="sub2">({formatNumberWithApostrophes(top100totalTokens)} {tokenInfo.symbol?.toUpperCase()})</p>
      </div>
      <Chart
        chartType="PieChart"
        data={getChartData(holdersList, totalHolders, tokenInfo.totalSupply)}
        options={chartOptions}
        width={"100%"}
        height={"400px"}
      />
    </div>;
  }
  function renderTable() {
    const holders = holdersList.slice(0, 100);
    console.log(holders);
    return <>
      <div className="w-full ">
        {holders.map(({ account_id, balance }, indx) => {
          return <div className="flex w-full space-between" key={indx}>
            <p>{account_id}</p>
            <p>{balance.toFixed(2)}</p>
          </div>
        })}
      </div>
    </>;
  }
  function renderFooter() {
    return <></>;
  }

  function renderPage() {
    return <>
      <div className="narrowContainer">
        {renderTokenHeader()}
        {renderTokenInfo()}
        {renderChart()}
        {renderTable()}
        {renderFooter()}
      </div>
    </>
  }

  function renderLoadingState() {
    return <>
      <h1>Loading...</h1>
    </>
  }

  function renderFakeChart() {
    return <div style={{ opacity: 0, visibility: "hidden" }}>
      <Chart
        chartType="PieChart"
        data={[["Account", "Balance"], ["Adam", 12], ["Alice", 124]]}
        options={chartOptions}
        width={"100%"}
        height={"400px"}
      />
    </div>
  }

  function renderNavbar() {
    return <div className="navbar w-full align-center shadow-light">
      <div className="flex space-around w-full h-full items-center">
        <div className="start">
          <img className="radix-dashboard-logo" src="/radix-dashboard.svg" alt="radix dashboard logo" />
        </div>
        {/* <div className="mid">Search Bar</div> */}
        <div className="end">
          <img className="menu" src="/menu.svg" alt="menu icon" />
        </div>
      </div>
    </div>
  }

  return (
    <div>
      {renderNavbar()}

      {isLoading ? renderLoadingState() : renderPage()}
      {/* DO NOT REMOVE: this chart is unneccessary */}
      {/* but removal leads to breaking the chart history */}
      {renderFakeChart()}
    </div>
  );
}

export default App;
