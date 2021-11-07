import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {

    let service: UniqueIdService;

    beforeEach(()=> {
        service = new UniqueIdService();
    }) 

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
    should be success when called with prefix`, () => {
        const id = service.generateUniqueIdWithPrefix('app');
        expect(id.startsWith('app-')).toBeTrue();
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
    should not generate duplicate IDs when called multiple times`, () => {
        const ids = new Set();
        for(let i =  0 ; i < 50 ; i++){
            ids.add(service.generateUniqueIdWithPrefix('app'))
        }
        expect(ids.size).toEqual(50);
    });

    it(`${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} 
    should return number of genareted ids`, () => {
        for(let i =  0 ; i < 3 ; i++){
            service.generateUniqueIdWithPrefix('app');
        }
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(3);
    })

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} 
    should throws error when called with invalid prefix`, () => {
        const emptyValueToPrefix = [null, undefined, '', '0', '1'];
        emptyValueToPrefix.forEach( emptyValue => {
            expect( () => service.generateUniqueIdWithPrefix(emptyValue))
                         .withContext(`emptyValue: ${emptyValue}`)
                         .toThrow()
        })
    });

});