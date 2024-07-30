/* eslint-disable prettier/prettier */

export interface IntegrationInterfaceEvent<T = any> {
    event_name: string;
    payload: T;
    event_version: number;
    occurred_on: Date;
}