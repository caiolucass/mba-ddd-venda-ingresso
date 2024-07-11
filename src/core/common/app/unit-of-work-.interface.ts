/* eslint-disable prettier/prettier */
export interface UnitOfWorkInterface {
    commit(): Promise<void>;
    rollback(): Promise<void>;
}