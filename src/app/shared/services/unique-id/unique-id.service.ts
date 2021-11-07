import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {
    private numberOfGeneratedIds = 0;

    private validId = /^[A-Za-z]+[\w\-\:\.]*$/;
    
    generateUniqueIdWithPrefix(prefix: string): string{

        if(!this.validId.test(prefix) || !prefix){ throw Error('Prefix can not to be empty.') }

        const uniqueId = this.generateUniqueId();
        this.numberOfGeneratedIds++;
        return `${prefix}-${uniqueId}`;
    } 
    
    getNumberOfGeneratedUniqueIds(): number {
        return this.numberOfGeneratedIds;
    }

    private generateUniqueId(): string {
        return uuidv4();
    }

}