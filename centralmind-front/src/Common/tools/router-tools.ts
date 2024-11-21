import { createSearchParams } from "react-router-dom";
import { defaultPagination } from "../app-constants";

export const buildSearchParams = (
  params: Record<string, string | number>,
  searchParams: URLSearchParams
) => {
  const newSearchParams = createSearchParams(searchParams);
  Object.keys(params).forEach((param) =>
    newSearchParams.set(param, params[param].toString())
  );
  return newSearchParams.toString();
};

export const searchParamsToObject = (searchParams: URLSearchParams) => {
  const pagination = getPaginationParams(searchParams);
  return Array.from(searchParams)
    .filter(
      (param) => param[1] !== undefined && param[1] !== null && param[1] !== ""
    )
    .reduce((acc, param) => {
      const [key, value] = param;
      if (Object.keys(pagination).includes(key)) return acc;
      else if (value !== undefined && value !== "") {
        if(/\[\]$/.test(key)){
          if(acc[key] === undefined){
            acc[key] = [];
          }
          acc[key].push(value)
        }
        else {
          acc[key] = value;
        }
      }
      return acc;
    }, {} as any);
};

export type PaginationType = { page: number; limit: number; skip: number };

export const getPaginationParams = (
  searchParams: URLSearchParams
): PaginationType => {
  const page = Number(searchParams.get("page") ?? defaultPagination.page);
  const limit = Number(searchParams.get("limit") ?? defaultPagination.pageSize);
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
};
