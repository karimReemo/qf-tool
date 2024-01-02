export interface IScore {
  title: string;
  score: number;
}

export interface IInDepthResult {
  title: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  detailedDescription: string;
}

export interface ITestResults {
  overallScores: IScore[];
  inDepthResults: IInDepthResult[];
}


export interface IWapitiResults {
  result: Array<{
    info: string;
    level: number;
  }>;
}

export interface ISslyzeResults {
  record: {
    uuid: number;
    ssl2: boolean;
    ssl3: boolean;
    tls0: boolean;
    tls1: boolean;
    tls2: boolean;
    tls3: boolean;
    heartbleed: boolean;
    dos: boolean;
    hsts: boolean;
  };
}


