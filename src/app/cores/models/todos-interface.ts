export interface TodoItem{
    _id?: string;
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    status?: boolean;
    important?: boolean;
}
