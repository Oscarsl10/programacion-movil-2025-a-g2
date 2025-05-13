export interface ApiResponseDto <T>{
    status: boolean;
    message: string;
    data: T;
    sucess: boolean;
}
