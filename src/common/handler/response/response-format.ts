export interface ApiResponse {
  status: number;
  message: string;
  data: any;
  meta: any; // No change here
}

export const formatResponse = (
  status: number,
  message: string,
  data: any,
  meta: any = {} // No change here
): ApiResponse => { 
  return { status, message, data, meta }; 
};
