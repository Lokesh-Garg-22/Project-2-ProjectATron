export type DataRequest = Request & {
  data: {
    [index: string]: any;
    userID?: string;
    username?: string;
    passwrod?: string;
  };
};
