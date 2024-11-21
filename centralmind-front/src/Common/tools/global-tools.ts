import { RcFile } from "antd/es/upload";
import { Children, ReactNode } from "react";

export const debounce = (func: (...args: any[]) => void, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
    return args;
  };
};

export const buildFindQuery = (data: any) => {
  return Object.keys(data).reduce((acc, k) => {
    const value = data[k];
    if (Array.isArray(value) && value.length) {
      value.forEach((v) => {
        acc += `${k}=${v}&`;
      });
    } else if (value !== null && value !== undefined && value !== "") {
      acc += `${k}=${value}&`;
    }
    return acc;
  }, "");
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const urlParamsToObject = (urlParams: URLSearchParams): any => {
  return Array.from(urlParams).reduce((acc, param) => {
    if (param[1] !== "") acc[param[0]] = param[1];
    return acc;
  }, {} as any);
};

export function enumToMap(enumType: any): Array<{ key: any; value: any }> {
  return Object.keys(enumType)
    .filter((k: any) => isNaN(k * 1))
    .map((item) => ({ key: item, value: enumType[item] }));
}

export function generateRandomNumberId() {
  return Math.floor(Math.random() * 1000000);
}

export function findSlotOfType(children: ReactNode, slotType: any) {
  return Children.toArray(children).find(
    (child) => (child as any).type === slotType
  );
}