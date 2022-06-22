describe('Add task to sprint', () => {

  it('can log in', () => {
    cy.visit('http://localhost:4200/');

    cy.get('#userMenu').click();
    cy.get('#loginButton').click();

    cy.url().should('include', 'login');

    cy.get('input[name=email]').type('test@test.nl');
    cy.get('input[name=password]').type('test123');
    cy.get('button[type=submit]').click();

    cy.url().should('include', 'home');
    cy.get('#userMenu').click();
    cy.contains('Logout');
  });

  it('can create project', () => {
    let projectName = 'Test Project';
    cy.visit('http://localhost:4200/projects');

    cy.get('#addProject').click();

    cy.get('input[name=title]').type(projectName);
    cy.get('input[name=username]').type('cypress :)');
    cy.get('input[name=description]').type('cypress test project');
    cy.get('button[name=add]').click();

    cy.contains(projectName);
  });

  it('can log out', () => {
    cy.visit('http://localhost:4200/');

    cy.get('#userMenu').click();
    cy.get('#logoutButton').click();

    cy.url().should('include', 'home');
    cy.get('#userMenu').click();
    cy.contains('Login');
  });
})
