import { faker } from '@faker-js/faker';


describe("Testing CRUD Operation", () => {
    it("GET /Users", () => {
        cy.request("https://serverest.dev/usuarios")
            .then((respose) => {
                expect(respose.status).to.be.eq(200);
            });
    });

    it("GET /Users", () => {
        let user = {
            "nome": "Fulano da Silva",
            "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
        }


        let options = {
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: false,
            body: user,
            headers:
            {
                'Authorization': 'bearer dXNlckB1c2VyOnVzZXI='
            }
        }

        // cy.request("POST", "https://serverest.dev/usuarios", user)
        //     .then((respose) => {
        //         expect(respose.status).to.be.eq(201);
        //         expect(respose.body.message).to.be.eq("Cadastro realizado com sucesso");
        //     });

        cy.request(options)
            .then((respose) => {
                expect(respose.status).to.be.eq(201);
                expect(respose.body.message).to.be.eq("Cadastro realizado com sucesso");
            });
    });
});