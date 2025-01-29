export default interface IPaginatedResponse<T> {
    data: T[];
    totalCount: number;
    totalPage: number;
}
