export interface IScore {
  title: string;
  score: number|undefined;
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


export interface ScoreDetails {
  info: string;
  level: number;
}

export interface IScoreResponse {
  "connection-score": number;
  "website-score": number;
  "average-score": number;
  details: ScoreDetails[];
}



