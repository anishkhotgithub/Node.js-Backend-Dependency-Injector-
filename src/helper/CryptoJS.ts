import CryptoJS from "crypto-js";
import FormData from "form-data";

// Encryption
const Encript = (plainData: unknown, isEncrypt: number): string | unknown => {
  if (isEncrypt === 0) {
    return plainData;
  }

  const randomIV = randomString(16);
  const key = CryptoJS.enc.Utf8.parse(process.env.ENCRYPTION_KEY || "");
  const iv = CryptoJS.enc.Utf8.parse(randomIV);

  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(plainData), key, {
    keySize: 128 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const cipherText = encrypted.toString() + randomIV;
  return cipherText.replace(/\\/g, "/");
};

// Decryption
const Decrypt = async (
  cipherData: string,
  isEncrypt: number,
  req?: any
): Promise<any> => {
  try {
    if (isEncrypt === 0) {
      return cipherData;
    }

    const key = CryptoJS.enc.Utf8.parse(process.env.ENCRYPTION_KEY || "");
    const iv = CryptoJS.enc.Utf8.parse(
      cipherData.slice(cipherData.length - 16)
    );

    cipherData = cipherData.slice(0, cipherData.length - 16);

    const decrypted = CryptoJS.AES.decrypt(cipherData, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

    if (jsonString.includes("_base64")) {
      const data = JSON.parse(jsonString);
      const newData: Record<string, any> = {};
      let file: FileData | undefined;
      const files: FileData[] = [];

      for (const [key, value] of Object.entries(data)) {
        if (key.endsWith("_base64") && typeof value === "string") {
          const originalKey = key.slice(0, -7);
          if (req) {
            files.push(await base64tofile(value, originalKey));
          } else {
            if (file) {
              if (files.length === 0) {
                files.push(file);
              }
              files.push(await base64tofile(value, originalKey));
            } else {
              file = await base64tofile(value, originalKey);
            }
          }
        } else {
          newData[key] = value;
        }
      }

      if (!req && files.length > 0) {
        file = undefined;
      }

      return { file, files, body: newData };
    }

    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Decrypt error:", err);
    throw err;
  }
};

// File type definition
interface FileData {
  name: string;
  fieldname: string;
  originalname: string;
  mimetype: string;
  buffer: Uint8Array;
  size: number;
}

// Convert base64 → file
async function base64tofile(file: string, fileName: string): Promise<FileData> {
  if (file && file.includes("data:")) {
    const arr = file.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream";

    const bstr = Buffer.from(arr[arr.length - 1], "base64");
    const u8arr = new Uint8Array(bstr);

    return {
      name: fileName,
      fieldname: fileName,
      originalname: fileName,
      mimetype: mime,
      buffer: u8arr,
      size: u8arr.byteLength,
    };
  }

  throw new Error("Invalid base64 file string");
}

// Random IV
const randomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+/,.:;|";

  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export { Encript, Decrypt };
