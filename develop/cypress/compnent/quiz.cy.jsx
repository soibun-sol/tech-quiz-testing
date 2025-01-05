import React from 'react';
import  Quiz  from 'components/Quiz';

describe("Quiz Component", () => {
    it("should render the quiz component correctly", () => {
        cy.mount(<Quiz/>); 
    });

});
    
    it("should have a start button", () => {
        cy.mount(<Quiz/>);
        cy.get('button').should("have.text", "Start Quiz");
    });

    it("should render quiz questions when button is clicked", () => {
        cy.mount(<Quiz/>);
        cy.get('button').click();
        cy.wait(600)
        cy.get("div")
        cy.eq(0)
        cy.get(",card h2")
        cy.should("exist");
    });

    it("should render answers for the quiz questions", () => {
        cy.mount(<Quiz/>);
        cy.get('button').contains("start quiz").click();
        cy.wait(600);
        cy.get(".card")
        cy.children()
        cy.eq(1)
        cy.should("have.length", 4);
        cy.should("be.visible");
    });

    it("should have a total of 10 questions", () => {
        cy.mount(<Quiz/>);
        cy.log("intercepting request");
        cy.intercept({
            method: "GET",
            url: "/api/questions/random"
        }, {
            fixture: "questions.json"
        }).as("mockedQuestions");

        cy.contains("Start Quiz").click();

        cy.wait("@mockedQuestions").then((interception) => {
            expect(interception.response.body.results).to.equal(10);
        });

        cy.get("div")
        cy.eq(0)
        cy.get(".card h2")
        cy.should("have,text");
    });

    it("should display the final score when the quiz is completed", () => {
        cy.mount(<Quiz/>);
        cy.intercept({
            method: "GET",
            url: "/api/questions/random"
        }, {
            fixture: "questions.json"
        }).as("mockedQuestions");

        cy.contains("Start Quiz").click();

        cy.wait("@mockedQuestions").then((interception) => {
            expect(interception.response.body.results).to.equal(10);
        });

        for(let i = 0; i < 10; i++) {
            cy.get("button").eq(0).first().click();
        }

        cy.get(".alert-success").contains("score:");
    });

   it("should have a retry button", () => {
       cy.mount(<Quiz/>);
       cy.intercept({
           method: "GET",
           url: "/api/questions/random"
       }, {
           fixture: "questions.json"
       }).as("mockedQuestions");

       cy.get("button").click();

       cy.wait("@mockedQuestions").then((interception) => {
           expect(interception.response.body.results).to.equal(10);
       });

       for(let i = 0; i < 10; i++) {
           cy.get("button").eq(0).first().click();
       }

       cy.get("button").contains("Take New Quiz").click();
       cy.get(".card h2").should("Start Quiz").should("exist");
   });