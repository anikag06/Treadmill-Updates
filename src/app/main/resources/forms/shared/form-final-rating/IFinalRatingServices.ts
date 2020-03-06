export interface IFinalRatingServices {
  getFinalRating(id: number): any;
  postFinalRating(id: number, finalrating: number): any;
  putFinalRating(id: number, finalRating: any): any;
  getRealistic(id: number): any;
  putRealistic(id: number, realistic: string): any;
  postRealistic(id: number, realistic: string): any;
}
