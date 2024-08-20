import {app, sequelize} from "../express";
import request from "supertest"

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product1",
                price: 10,
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product1");
        expect(response.body.price).toBe(10);

    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "",
            });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product1",
                price: 10,
            });
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product2",
                print: 20,
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);

    })
});