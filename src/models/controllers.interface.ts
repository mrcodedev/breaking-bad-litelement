interface MyFetchData {
  method: string;
  headers: HeadersInit;
  signal: AbortSignal;
  body?: string;
}

export {MyFetchData};
