import {APIService} from '../../../src/services';


describe('APIService', () => {
    describe('getPostCodeByPoint', () => {
        it('should return a postcode', async () => {
            const result = await APIService.getPostCodeByPoint(53.457321, -2.262773) as any;
            expect(result.result.postcode).toEqual('M15 5BR');
        });

        it('should return a error', async () => {
            try {
                const result = await APIService.getPostCodeByPoint(80.923454, -80.474217) as any;
            } catch (error: any) {
                expect(error.status).toEqual(404);
            }
            
        })
    });

    describe('getNearestPostCode', () => {
        it('should return a postcode', async () => {
            const result = await APIService.getNearestPostCode('M15 5BR') as any;
            expect(result.result.postcode).not.toEqual('M15 5BR');
        });

        it('should return a error', async () => {
            try {
                const result = await APIService.getNearestPostCode('Santander') as any;
            } catch (error: any) {
                expect(error.status).toEqual(404);
            }
            
        })
    });
});