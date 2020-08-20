export interface IDataService<T> {
    create: (obj: Omit<T, "id">) => Promise<Partial<T>>;
    update: (obj: Omit<T, "id">, id: any) => Promise<Partial<T>>;
    get: (pattern?: string, limit?: number) => Promise<Partial<T>[]>;
    getById: (id: any) => Promise<Partial<T>>;
    delete: (id: any) => Promise<Partial<T>>;
}