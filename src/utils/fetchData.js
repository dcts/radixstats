import axios from "axios";

import coinsJSON from "./coins.json";

export const coinsData = coinsJSON;
export const dexterAddress = "resource_rdx1tkktjr0ew96se7wpsqxxvhp2vr67jc8anq04r5xkgxq3f0rg9pcj0c";
export const ociswapAddress = "resource_rdx1t52pvtk5wfhltchwh3rkzls2x0r98fw9cjhpyrf3vsykhkuwrf7jg8";
export const earlyAddress = "resource_rdx1t5xv44c0u99z096q00mv74emwmxwjw26m98lwlzq6ddlpe9f5cuc7s";

export async function fetchTokenInfo(resource = dexterAddress) {
  const result = await axios.get(`https://api.ociswap.com/tokens/${resource}`);
  return {
    name: result.data.name,
    symbol: result.data.symbol,
    iconUrl: result.data.icon_url,
    description: result.data.description,
    website: result.data.info_url,
    address: result.data.address,
    totalSupply: result.data.supply?.total,
    marketcap: Math.round(result.data.market_cap?.circulating?.usd?.now), 
  }
}

export async function fetchTokenHolders(resource = dexterAddress, limit = 1000) {
  const result = await axios.get(`https://gettokenholders-rvn75v2dcq-uc.a.run.app/?resource=${resource}&limit=${limit}`);
  return {
    addresses: result.data.addresses,
    holders: result.data.holders,
  };
}

export function calculateTop100own(addresses, totalSupply) {
  const totalSupplyComputed = addresses.map(obj => obj.balance).reduce((a,b) => a + b, 0);
  const top100totalTokens = calculateTop100totalTokens(addresses);
  console.log({totalSupply, top100totalTokens});
  const maxTotalSupply = Math.max(totalSupplyComputed, totalSupply);
  // console.log("{top100totalTokens, maxTotalSupply}");
  // console.log({top100totalTokens, maxTotalSupply});
  // console.log(top100totalTokens / maxTotalSupply);
  return top100totalTokens / maxTotalSupply;
}

export function calculateTop100totalTokens(addresses) {
  let top100totalTokens = 0;
  addresses.slice(0,100).forEach(holder => {
    top100totalTokens += holder.balance;
  })
  return top100totalTokens;
} 
