const ip = ["2", "6", "3", "1", "4", "8", "5", "7"];
const p10 = ["3", "5", "2", "7", "4", "10", "1", "9", "8", "6"];
const p8 = ["6", "3", "7", "4", "8", "5", "10", "9"];
const p4 = ["2", "4", "3", "1"];
const ep = ["4", "1", "2", "3", "2", "3", "4", "1"];
const ipinverse = ["4", "1", "3", "5", "7", "2", "8", "6"];
const S0 = [
  ["01", "00", "11", "10"],
  ["11", "10", "01", "00"],
  ["00", "10", "01", "11"],
  ["11", "01", "11", "10"],
];
const S1 = [
  ["00", "01", "10", "11"],
  ["10", "00", "01", "11"],
  ["11", "00", "01", "00"],
  ["10", "01", "00", "11"],
];
// key generation functions
const convertToKeyArray = (key) => {
  const key_array = [];
  for (let value of key) {
    key_array.push(value);
  }
  return key_array;
};

const applyp10 = (value) => {
  const convertedToP10Array = [];
  for (let index of p10) {
    convertedToP10Array.push(value[index - 1]);
  }
  return convertedToP10Array;
};

const divideIntoN = (value, N) => {
  const arr1 = [];
  const arr2 = [];

  for (let i = 0; i < N; i++) {
    arr1.push(value[i]);
  }
  for (let i = N; i < value.length; i++) {
    arr2.push(value[i]);
  }
  return [arr1, arr2];
};

const LS1 = (value) => {
  const shiftedArray = [];
  for (let i = 1; i < value.length; i++) {
    shiftedArray.push(value[i]);
  }
  shiftedArray.push(value[0]);
  return shiftedArray;
};

const applyp8 = (value) => {
  const convertedToP8Array = [];
  for (let index of p8) {
    convertedToP8Array.push(value[index - 1]);
  }
  return convertedToP8Array;
};
const LS2 = (value) => {
  const shiftedArray = [];
  for (let i = 2; i < value.length; i++) {
    shiftedArray.push(value[i]);
  }
  shiftedArray.push(value[0]);

  shiftedArray.push(value[1]);
  return shiftedArray;
};

const keyGeneration = (main_key) => {
  // convert key  to array
  const convertedKey = convertToKeyArray(main_key);
  // apply p10
  const appliedP10 = applyp10(convertedKey);
  //divide applied p10 to 2 arrays of 5 elements
  const dividedArray = divideIntoN(appliedP10, 5);
  // now applying LS-1
  const LSa = LS1(dividedArray[0]);
  const LSb = LS1(dividedArray[1]);
  const mergeLeftShiftedArray = [...LSa, ...LSb];
  // now apply p8 and key1  is generated
  const key1 = applyp8(mergeLeftShiftedArray);

  // now apply LS-2 on leftshiftedArray
  const secondLeftShiftedArraya = LS2(LSa);
  const secondLeftShiftedArrayb = LS2(LSb);
  const mergeSecondLeftShiftedArray = [
    ...secondLeftShiftedArraya,
    ...secondLeftShiftedArrayb,
  ];
  // now again apply p8 on secondLeftShiftedArrays  and key2 is generated
  const key2 = applyp8(mergeSecondLeftShiftedArray);

  return [key1, key2];
};

// Round1 functions for cipher generations
const applyIP = (value) => {
  const convertedToIPArray = [];
  for (let index of ip) {
    convertedToIPArray.push(value[index - 1]);
  }
  return convertedToIPArray;
};
const applyEp = (value) => {
  const convertedToEPArray = [];
  for (let index of ep) {
    convertedToEPArray.push(value[index - 1]);
  }
  return convertedToEPArray;
};

const XOR = (value1, value2) => {
  const newArray = [];
  for (let i = 0; i < value1.length; i++) {
    value1[i] === value2[i] ? newArray.push("0") : newArray.push("1");
  }
  return newArray;
};

const applyP4 = (value) => {
  const convertedToP4Array = [];
  for (let index of p4) {
    convertedToP4Array.push(value[index - 1]);
  }
  return convertedToP4Array;
};

const applySMatrix = (matrix, value) => {
  const rowNumber = parseInt(value[0] + value[3], 2);
  const colNumber = parseInt(value[1] + value[2], 2);
  return matrix[rowNumber][colNumber];
};

const applyIP_Inverse = (value) => {
  const convertedToIP_InverseArray = [];
  for (let index of ipinverse) {
    convertedToIP_InverseArray.push(value[index - 1]);
  }
  return convertedToIP_InverseArray;
};

const round1 = (plainText, key) => {
  const plainTextConvertedToArray = convertToKeyArray(plainText);

  // applying ip on plaintext
  const appliedIP = applyIP(plainTextConvertedToArray);

  // now dividing it into 4,4 elements array
  const [arr1, arr2] = divideIntoN(appliedIP, 4);
  //apply ep on arr2
  const appliedEP = applyEp(arr2);
  // take XOR with  key1 and appliedEP
  const XOREDValue = XOR(appliedEP, key);
  // now divide it into 2 arrays of 4 elements
  const [xoredA, xoredB] = divideIntoN(XOREDValue, 4);
  const appliedS0 = applySMatrix(S0, xoredA);
  const appliedS1 = applySMatrix(S1, xoredB);
  const mergeSMatrices = [...appliedS0, ...appliedS1];
  // now apply p4 on mergeSmatrices
  const appliedP4 = applyP4(mergeSMatrices);
  // take Xor with the left part (arr1)
  const xoredWithLeftPart = XOR(appliedP4, arr1);

  return [arr2, xoredWithLeftPart];
};

const round2 = (data, key) => {
  const [arr1, arr2] = data;

  //apply ep on arr2
  const appliedEP = applyEp(arr2);
  // take XOR with  key2 and appliedEP
  const XOREDValue = XOR(appliedEP, key);
  // now divide it into 2 arrays of 4 elements
  const [xoredA, xoredB] = divideIntoN(XOREDValue, 4);
  const appliedS0 = applySMatrix(S0, xoredA);
  const appliedS1 = applySMatrix(S1, xoredB);
  const mergeSMatrices = [...appliedS0, ...appliedS1];
  // now apply p4 on mergeSmatrices
  const appliedP4 = applyP4(mergeSMatrices);
  // take Xor with the left part (arr1)
  const xoredWithLeftPart = XOR(appliedP4, arr1);
  const concatWithRightPart = [...xoredWithLeftPart, ...arr2];

  return concatWithRightPart;
};

const sdes_encryption = (key, plainText) => {
  //generate keys
  const [key1, key2] = keyGeneration(key);
  // complete Round1
  const arr1 = round1(plainText, key1);
  // complete round2

  const arr2 = round2(arr1, key2);

  // apply IP inverse
  const cipher = applyIP_Inverse(arr2);

  return cipher;
};
const sdes_decryption = (key, cipher) => {
  //generate keys
  const [key1, key2] = keyGeneration(key);
  // complete Round1
  const arr1 = round1(cipher, key2);
  //complete round2

  const arr2 = round2(arr1, key1);
  // apply IP inverse
  const plainText = applyIP_Inverse(arr2);

  return plainText;
};

export const sdesForEncryption = (key, plainText) => {
  const ptLength = plainText.length;
  if (ptLength.length <= 0) {
    return;
  }
  if (ptLength % 8 !== 0) {
    const numberOfZeros = 8 - (ptLength % 8);
    for (let i = 0; i < numberOfZeros; i++) {
      plainText += "0";
    }
  }
  const elementsArray = [];
  for (let i = 0; i < plainText.length; i += 8) {
    elementsArray.push(plainText.slice(i, i + 8));
  }
  let cipherString = "";
  for (let items of elementsArray) {
    const temp = sdes_encryption(key, items);
    cipherString += temp.join("");
  }
  return cipherString;
};

export const sdesForDecryption = (key, plainText) => {
  const ptLength = plainText.length;
  if (ptLength.length <= 0) {
    return;
  }
  if (ptLength % 8 !== 0) {
    const numberOfZeros = 8 - (ptLength % 8);
    for (let i = 0; i < numberOfZeros; i++) {
      plainText += "0";
    }
  }
  const elementsArray = [];
  for (let i = 0; i < plainText.length; i += 8) {
    elementsArray.push(plainText.slice(i, i + 8));
  }
  let cipherString = "";
  for (let items of elementsArray) {
    const temp = sdes_decryption(key, items);
    cipherString += temp.join("");
  }
  return cipherString;
};

// console.log(sdesForEncryption('1010000010','01110010'))
// console.log(sdesForDecryption('1010000010','01110111'))
