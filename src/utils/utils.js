export function formatNumberWithApostrophes(num) {
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