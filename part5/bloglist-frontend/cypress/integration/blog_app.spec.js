describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Admin Admin',
      username: 'admin',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user).then(body => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()

      cy.contains('Admin Admin logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Admin Admin logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ 'username': 'admin', 'password': 'admin' })
    })

    it('A blog can be created', function() {
      cy.contains('create new note').click()
      cy.get('.title').type('a blog created by cypress')
      cy.get('.author').type('cypress')
      cy.get('.url').type('www.cypress.com')
      cy.get('#save').click()

      cy.contains('a blog created by cypress')
    })

    it('can be liked', function() {
      cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'www.cypress.com' })

      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('update a blog a blog created by cypress by cypress')
    })
  })
})
