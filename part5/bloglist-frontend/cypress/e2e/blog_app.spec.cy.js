describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('.blogFormTitle').find('input').type('a blog created by cypress')
      cy.get('.blogFormAuthor').find('input').type('cypress')
      cy.get('.blogFormURL').find('input').type('www.cypress.com')
      cy.get('#create-btn').click()
      cy.contains('a blog created by cypress')

      cy.request('GET', 'http://localhost:3003/api/blogs/').then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body[0]).to.have.property(
          'title',
          'a blog created by cypress'
        ) // true
      })
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress1',
          url: 'www.cypress1.com',
        })
      })

      it('it can be liked', function () {
        cy.contains('another blog cypress').contains('view').click()
        cy.get('.blogLikes').contains('likes 0')
        cy.get('.like-btn').click()
        cy.get('.blogLikes').contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.contains('another blog cypress').contains('view').click()
        cy.contains('remove').click()
        cy.get('.blog-list').should('not.contain', 'another blog cypress')
      })
    })
  })
})
