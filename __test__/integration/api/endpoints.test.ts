import request  from "supertest";


describe('API end points', () => {
    it('test /postcodes/points/:lon/:lat', async () => {
        const response = await request('http://127.0.0.1:4000').get('/api/postcodes/point/-1.685956/53.865335');
        expect(response.status).toBe(200);
        expect(response.body.postcode.postcode).toBe('LS19 7RE');
        expect(response.body.nearest.postcode).not.toBe('LS19 7RE');
    });

    it('fail test /postcodes/points/:lon/:lat', async () => {
        const response = await request('http://127.0.0.1:4000').get('/api/postcodes/point/-60.262773/1.457321');
        expect(response.status).not.toBe(200);
        expect(response.status).toBe(404);
    });
});