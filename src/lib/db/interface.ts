export type DataRequest = Request & {
  data: {
    [index: string]: any;
    userId?: string;
    username?: string;
    passwrod?: string;
  };
};
