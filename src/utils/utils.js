export function formatNumberWithApostrophes(num) {
  if (!num) {
    return num;
  }
  // Convert the number to a string
  let numStr = num.toString();
  // Split into integer and decimal parts
  let parts = numStr.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '';
  // Reverse the integer part to facilitate insertion of apostrophes
  let reversedInt = integerPart.split('').reverse().join('');
  // Insert apostrophes every three characters
  let formattedInt = [];
  for (let i = 0; i < reversedInt.length; i += 3) {
    formattedInt.push(reversedInt.substr(i, 3));
  }
  // Join chunks with apostrophes, reverse back to the original order
  formattedInt = formattedInt.join("'").split('').reverse().join('');
  // Concatenate with the decimal part if it exists
  return decimalPart ? formattedInt + '.' + decimalPart : formattedInt;
}

export const chartOptions = {
  title: "",
  legend: {
    position: 'right', // or 'top', 'bottom', 'left' depending on your layout needs
    maxLines: 20 // Set a high number to try and accommodate all items without pagination
  },
  backgroundColor: '#F4F5F9', // Setting background color here
  colors: [
    '#003057',
    '#060F8F',
    '#20E4FF',
    '#015844',
    '#00AB84',
    '#21FFBE',
    '#5F0A47',
    '#CE0D98',
    '#8A8FA4',
  ]
};

export function getChartData(holdersList, totalHolders, totalSupply = 0) {
  const nWhales = 8;
  if (totalSupply === 0) {
    totalSupply = holdersList.map(holder => holder.balance).reduce((a,b) => a + b, 0);
  }
  const data = [["Address", "Token Quantity"]];
  holdersList.slice(0,nWhales).forEach(holder => {
    data.push([
      holder.account_id,
      holder.balance
    ]
  )});
  const balanceWhales = holdersList.slice(0,nWhales)
    .map(holder => holder.balance || 0)
    .reduce((a,b) => a + b, 0);
  data.push([`Rest (${totalHolders - nWhales} Accounts)`, totalSupply - balanceWhales])
  return data;
}

export function trunc(str, takeFromStart, takeFromEnd) {
  if (typeof str !== 'string' || str.length < takeFromStart) {
    return "";
  }
  const firstThree = str.substring(0, takeFromStart);
  const lastN = str.substring(str.length - takeFromEnd);
  return `${firstThree}...${lastN}`;
}