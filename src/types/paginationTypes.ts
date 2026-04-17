export type TPaginationQuery = {
    page: number;
    limit: number;
};

export type TPaginationResult<T> = {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
} ;



//useHook
export type TPaginationState = {
    page: number;
    total: number;
    totalPages: number;
};

export type FetchFn = (params: TPaginationQuery) => Promise<void>;