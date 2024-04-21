import axios from "axios";

export const dexterAddress = "resource_rdx1tkktjr0ew96se7wpsqxxvhp2vr67jc8anq04r5xkgxq3f0rg9pcj0c";

export async function fetchTokenInfo(resource = dexterAddress) {
  const result = await axios.get(`https://api.ociswap.com/tokens/${resource}`);
  return {
    name: result.data.name,
    symbol: result.data.symbol,
    iconUrl: result.data.icon_url,
    description: result.data.description,
    website: result.data.info_url,
    address: result.data.address,
  }
}

export async function fetchTokenHolders(resource = dexterAddress, limit = 1000) {
  const result = await axios.get(`https://gettokenholders-rvn75v2dcq-uc.a.run.app/?resource=${resource}&limit=${limit}`);
  return {
    addresses: result.data.addresses,
    holders: result.data.holders,
  };
}


