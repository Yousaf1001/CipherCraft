export function encryptOrDecryptUsingRC4(secretKey, message) {
  // Initialize the state array `stateArray` of 256 values
  let stateArray = [];
  for (let i = 0; i < 256; i++) {
    stateArray[i] = i;
  }

  // Key-scheduling algorithm
  let jIndex = 0;
  for (let i = 0; i < 256; i++) {
    jIndex =
      (jIndex + stateArray[i] + secretKey.charCodeAt(i % secretKey.length)) %
      256;
    [stateArray[i], stateArray[jIndex]] = [stateArray[jIndex], stateArray[i]];
  }

  // Stream generation algorithm
  let iIndex = 0;
  jIndex = 0;
  let encryptedOrDecryptedMessage = "";
  for (let x = 0; x < message.length; x++) {
    iIndex = (iIndex + 1) % 256;
    jIndex = (jIndex + stateArray[iIndex]) % 256;
    [stateArray[iIndex], stateArray[jIndex]] = [
      stateArray[jIndex],
      stateArray[iIndex],
    ];
    let keyStream = stateArray[(stateArray[iIndex] + stateArray[jIndex]) % 256];
    encryptedOrDecryptedMessage += String.fromCharCode(
      message.charCodeAt(x) ^ keyStream
    );
  }

  // Return the encrypted or decrypted message
  return encryptedOrDecryptedMessage;
}
