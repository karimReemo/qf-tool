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
