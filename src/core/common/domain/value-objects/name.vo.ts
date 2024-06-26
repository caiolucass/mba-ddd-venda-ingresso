/* eslint-disable prettier/prettier */
import { ValueObject } from "../value-objects";


export class Name extends ValueObject<string> {
    constructor(name: string){
        super(name)
    }

    isValid(){
        return this.value.length >= 3;
    }
}