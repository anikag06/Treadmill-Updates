export interface IProofEvidences {
  getEvidences(id: number, type: string): any;
  postEvidences(id: number, type: string, data: any): any;
  deleteEvidence(id: number, type: string): any;
}
