const request = require("supertest");
const server = require("../../server");
const pool = require("../../database/ConnectionString");

describe("/api/register", () => {



    describe("User exists", () => {
        it("Should return 400 if user exists", async () => {
          
        });
    });
    describe("User created", () => {
        it("Should return 200 if new user is created", async () => {
            const user = {
              socket_auth_username: "Josshuaz",
              socket_auth_useremail: "jayson@gmail.com",
              socket_auth_userpassword: "Joshua isaac"
            };
            const response = await request(server).post('/api/registration/v1').send(user);
            expect(response.status).toBe(200);
        });
    });
    describe("User validation", () => {
        it("Should return 400 if validation fails", async () => {
            const user = {
                socket_auth_username: "1",
                socket_auth_useremail: "jayson@gmail.com",
                socket_auth_userpassword: "Joshua isaac"
              };
              const response = await request(server).post('/api/registration/v1').send(user);
              expect(response.status).toBe(400);
        });
    });

});
