describe("quiz", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:3001/");
    })

    it("the quiz start button is rendered", () => {
        cy.get("button", { name : "start quiz" }).should("exist");
    });

    it("the quiz button is clickable", () => {
        cy.visit("http://localhost:3001/");
        cy.get("button", { name : "start quiz" }).click();
    });

    it("should featch quiz questions", () => {
        cy.intercept("GET", "/api/questions/random",).as("getQuestions");
        cy.get("button", { name : "start quiz" }).click();
        cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);
    });

    it("should render quiz questions when button is clicked", () => {
        cy.get("button", { name : "start quiz" }).click();
        cy.get("h2").should("exist");
    });

    it("should render answers for the quiz questions", () => {
        cy.get("button", { name : "start quiz" }).click();
        for (let i = 0; i < 10; i++) {
            cy.get("button", { name: `${i}`}).should("be.visible");
        }
    });

    it("should be able to select an answer", () => {
        cy.get("button", { name : "start quiz" }).click();
        cy.get("button").first().click();
    });

    it("should move to the next question after selecting an answer", () => {
        cy.get("button", { name : "start quiz" }).click();
        cy.get("button").first().click();
        cy.get("h2").should(exist);
    });

    it("should render the final score after aswering all questions", () => {
        cy.get("button", { name : "start quiz" }).click();
        for (let i = 0; i < 10; i++) {
            cy.get("button").eq(0).first().click();
        }
        cy.get("h2", { name: "quiz complete"}).should("exist");
        cy,get(".aler-sucess").conatins("your score:");
    });

    it("should start a new quiz after clicking Take New Quiz", () => {
        cy.get("button", { name: "Start Quiz" }).click();
        for (let i = 0; i < 10; i++) {
            cy.get("button").first().click();
        }
        cy.get("button").should("have.text", "Take New Quiz").click();
        cy.get("h2").should("exist");
    });
});