describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user1 = {
      name: 'Gussy',
      username: 'tester',
      password: 'testing'
    }
    const user2 = {
      name: 'Tinku',
      username: 'cat',
      password: 'meow'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user1)
    cy.request('POST', 'http://localhost:3000/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  describe('Login', function() {
    it('login form is shown', function () {
      cy.contains('Log in to application')
      cy.get('#username').should('be.empty')
      cy.get('#password').should('be.empty')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()
      cy.contains('Gussy is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('whatever')
      cy.get('#login-button').click()

      cy.get('#error')
        .contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'testing' })
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.contains('Author')
      cy.get('#title').type('test blog for cypress')
      cy.get('#author').type('Gussy')
      cy.get('#url').type('www.gusTheBlogger.com')
      cy.get('#create-button').click()

      cy.contains('blog for cypress')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'test blog for cypress', author: 'Gussy', url: 'www.gusTheCat.com' })
        cy.visit('http://localhost:3000')
      })

      it('A blog can be liked', function() {
        cy.get('#view').click()
        cy.get('#like').click()
      })

      it('another user cannot remove blog', function () {
        cy.contains('logout').click()
        cy.login({ username: 'cat', password: 'meow' })
        cy.contains('blog for cypress')
          .parent().contains('View').click()
        cy.contains('blog for cypress').parent().should('not.contain', 'remove')
      })

      it('user who created the blog can remove it', function () {
        cy.contains('blog for cypress')
          .parent().contains('View').click()
        cy.contains('remove').click()
        cy.wait(1000)
        cy.visit('http://localhost:3000')
      })

      describe('when more than one blog exists', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'second blog for cypress', author: 'Gussy', url: 'www.gusTheCat.com' })
          cy.createBlog({ title: 'third blog for cypress', author: 'Gussy', url: 'www.gusTheCat.com' })
          cy.visit('http://localhost:3000')
        })
        it('checks if the blogs are ordered ', function() {
          cy.contains('second blog for cypress')
            .parent().contains('View').click()
          for (let i = 0; i < 6; i++) {
            cy.get('#like').click()
            cy.wait(500)
          }
          cy.contains('second blog for cypress')
            .parent().contains('hide').click()
          cy.contains('third blog for cypress')
            .parent().contains('View').click()
          for (let i = 0; i < 4; i++) {
            cy.get('#like').click()
            cy.wait(500)
          }
          cy.contains('third blog for cypress')
            .parent().contains('hide').click()
          cy.contains('test blog for cypress')
            .parent().contains('View').click()
          cy.get('#like').click()
          cy.wait(500)
          cy.contains('second blog for cypress')
            .parent().contains('View').click()
          cy.contains('third blog for cypress')
            .parent().contains('View').click()
          cy.get('.detailedView').then((blogs) => console.log(typeof(blogs)))
        })
      })
    })
  })
})