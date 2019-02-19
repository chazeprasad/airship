
import * as request from 'supertest';
import app from './App';
import { Status } from '../src';


describe('Airship', () => {

    test('It should response the Get Method', async () => {
        const response: any = await request(app).get('/todo');
        await expect(response.statusCode).toBe(200);
    })

    test('It should response the Post Method', async () => {
        const response: any = await request(app).post('/todo').send({name: 'john'}).set('Accept', 'application/json');
        await expect(response.statusCode).toBe(Status.CREATED);
    })

    test('It should response the Put Method', async () => {
        const response: any = await request(app).put('/todo/1111').send({name: 'john'}).set('Accept', 'application/json');
        await expect(response.statusCode).toBe(Status.NO_CONTENT);
    })

})