import {testUser} from "../../src/environments/environment";

describe('logging in/out', () => {

  it('can log in', () => {
    cy.logout();
    cy.visit('http://localhost:4200/');

    cy.get('#userMenu').click();
    cy.get('#loginButton').click();

    cy.url().should('include', 'login');

    cy.get('input[name=email]').type('test@test.nl');
    cy.get('input[name=password]').type('test123');
    cy.get('button[type=submit]').click();

    cy.wait(1000);

    cy.url().should('include', 'home');
    cy.get('#userMenu').click();
    cy.contains('Logout');
  });

  it('can log out', () => {
    cy.visit('http://localhost:4200/');
    cy.wait(500);

    cy.get('#userMenu').click();
    cy.get('#logoutButton').click();

    cy.wait(1000);

    cy.url().should('include', 'home');
    cy.get('#userMenu').click();
    cy.contains('Login');
  });
})

describe('adding project/requirements', () => {
  let projectName = 'Test project';
  let userName = 'robot :)';
  let taskName = 'test task';
  let sprintName = 'test sprint';

  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.login(testUser);
    cy.visit('http://localhost:4200/projects');
    cy.wait(500);
  })

  it('can create project', () => {
    cy.get('#addProject').click();

    cy.get('input[name=title]').type(projectName);
    cy.get('input[name=username]').type(userName);
    cy.get('input[name=description]').type('cypress test project');
    cy.get('button[name=add]').click();

    cy.wait(1000);

    cy.contains(projectName);
  });

  it('can add tasks', () => {
    cy.get('#open-Test\\ project').click();
    cy.get('#addTask').click();

    cy.get('input[name=title]').type(taskName);
    cy.get('input[name=description]').type('cypress test task');
    cy.get('input[name=points]').type('{selectAll}6');
    cy.get('#selectOwner').click().get('mat-option').contains(userName).click();
    cy.get('button[name=add]').click();

    cy.wait(1000);

    cy.contains(taskName);
  });

  it('can add sprint', () => {
    cy.get('#open-Test\\ project').click();
    cy.get('#sprints-link').click();
    cy.get('#add-sprint-button').click();

    cy.get('input[name=title]').type(sprintName);
    cy.get('input[name=description]').type('cypress test sprint');
    cy.get('#startDate').type('12/24/3050');
    cy.get('#endDate').type('12/24/4050');
    cy.get('button[name=add]').click();

    cy.wait(1000);
    cy.contains(sprintName);
  });

  it('can assign tasks to sprint', () => {
    cy.get('#open-Test\\ project').click();
    cy.get('#sprints-link').click();
    cy.get('#open-sprint-test\\ sprint').click();

    cy.get('#addTask').click();
    cy.wait(1000);
    cy.get('mat-list-option.mat-list-item:nth-child(1) > div:nth-child(1) > mat-pseudo-checkbox:nth-child(2)').click();
    cy.get('#add').click();

    cy.wait(1000);
    cy.contains(taskName);
  });

  // it('can drag task to board', () => {
  //   cy.visit('http://localhost:4200/projects');
  //
  //   cy.get('mat-row.mat-row:nth-child(2) > mat-cell:nth-child(5) > button:nth-child(1)').click();
  //   cy.get('#sprints-link').click();
  //   cy.get('#open-sprint-test\\ sprint').click();
  //
  //   cy.wait(1000);
  //
  //   cy.get('#backlog > mat-card:nth-child(1)').drag('#cdk-drop-list-1');
  //
  //   cy.wait(1000);
  // });
})
