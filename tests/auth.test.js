const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management-test');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth API', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                userName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'Admin'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.userName).toEqual('Test User');
    });

    it('should login an existing user', async () => {
        await User.create({
            userName: 'Test User',
            email: 'test@example.com',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'Admin'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
         await User.create({
            userName: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'Admin'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });
});
