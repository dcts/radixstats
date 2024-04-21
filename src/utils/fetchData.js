import axios from "axios";

export const radixResourceAddress = "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd";

export async function fetchTokenInfo(resource = radixResourceAddress) {
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

export async function fetchTokenHolders(resource = radixResourceAddress) {
  const result = await axios.get(`https://gettokenholderscors-rvn75v2dcq-uc.a.run.app/?resource=${resource}`);
  return result.data.data.data;
}