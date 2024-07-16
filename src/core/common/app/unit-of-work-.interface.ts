/* eslint-disable prettier/prettier */
export interface UnitOfWorkInterface {
    beginTransaction(): Promise<void>;
    completeTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    runTransaction<T>(callback: () => Promise<T>): Promise<T>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}