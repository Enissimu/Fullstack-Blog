describe('Blog app', () => {
  beforeEach(() => {
    const newUser = {
      name: 'Testeroglu',
      username: 'Tester',
      password: '123456',
    }
    cy.createUser(newUser)
  })

  it('front page can be opened', () => {
    cy.contains('BLOGS')
  })

  describe('can you login succesfully?', () => {
    it('Can you login with correct info?', () => {
      cy.get('#UsernameInput').type('Tester')
      cy.get('#PasswordInput').type('123456')
      cy.get('#loginButton').click()
      cy.contains('welcome back Testeroglu')
    })

    it('you cannot login with wrong info?', () => {
      cy.get('#UsernameInput').type('Testerson')
      cy.get('#PasswordInput').type('123456')
      cy.get('#loginButton').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', () => {
    describe('When there is only one blog', () => {
      beforeEach(() => {
        const newBlog = {
          title: 'AGA',
          url: 'www.bombaboma.com',
          author: 'agbuna',
        }
        cy.login('Tester', '123456')
        cy.createBlog(newBlog)
        cy.intercept('PUT', '/api/blogs/*').as('didYouSendit')
      })

      it('A blog can be created', () => {
        cy.get('.input-title').type('Narnia')
        cy.get('.input-author').type('Janjanken')
        cy.get('.input-url').type('www.google.com')
        cy.get('.createBlog').click()
        cy.contains('Narnia')
      })
      xit('You can like blogs', () => {
        cy.get('.BlogButton').click()

        cy.get('.LikeButton').click()
        cy.wait('@didYouSendit').its('response.url').should('include', 'blogs')

        cy.get('#likeNumber').invoke('text').should('eq', 'likes 1')
      })

      it('You can delete your own post', () => {
        cy.get('.BlogButton').click()
        cy.get('.DeleteButton').click()
        cy.contains('Narnia').should('not.exist')
      })
      describe('When there are multiple blogs from other users', () => {
        beforeEach(() => {
          const newUser2 = {
            name: 'Testerkizi',
            username: 'Tester2',
            password: '1234567',
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, newUser2)
          cy.visit('')
          const newBlog2 = {
            title: 'IKINCIBLOG',
            url: 'ZORTORT',
            author: 'agabune',
          }
          cy.login('Tester2', '1234567')
          cy.createBlog(newBlog2)
        })
        it('Can you see other people`s delete button?', () => {
          cy.get('.BlogButton').then((blogs) => {
            cy.get(blogs[0]).parent().contains('delete').should('not.exist')
          })
        })
        xit('Is the most liked on the top', () => {
          cy.get('.BlogButton').eq('1').click()
          cy.intercept('PUT', '/api/blogs/*').as('didYouSendit')
          cy.get('.LikeButton').eq('1').click()
          cy.wait('@didYouSendit').its('request.url').should('include', 'blogs')
          cy.intercept('GET', '/api/blogs').as('didYouGetit')
          cy.visit('')
          cy.wait('@didYouGetit').its('request.url').should('include', 'blogs')
          cy.get('.Blog').eq('1').contains('likes 1')
          cy.get('.Blog').eq('0').contains('likes 0')
          cy.reload()
          cy.get('.Blog').eq('1').contains('IKINCIBLOG')
          cy.get('.Blog').eq('0').contains('AGA')
        })
      })
    })
  })
})
