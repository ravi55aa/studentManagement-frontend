export interface TableColumn<T> {
    header: string;
    accessor?: keyof T | string; 
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T, index: number) => React.ReactNode;
    format?: (value: unknown, row: T) => React.ReactNode;
}


export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    keyField: keyof T;
    loading?: boolean;
    emptyMessage?: string;
}