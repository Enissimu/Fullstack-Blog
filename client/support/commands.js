// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
    cy.visit('')
  })
})

Cypress.Commands.add('createUser', (newUser) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
  cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, newUser)
  cy.visit('')
})

Cypress.Commands.add('createBlog', (newBLog) => {
  const token = `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    body: newBLog,
    headers: {
      Authorization: token,
      'Access-Control-Allow-Headers': 'Authorization',
      'Content-Type': 'application/json',
    },
  })
  cy.visit('')
})
