describe('shared-ui: UserProfile component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userprofile--primary'))

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to UserProfile!')
  })
})
