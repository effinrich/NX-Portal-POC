describe('shared-ui: RoutesWithSubRoutes component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=routeswithsubroutes--primary'))

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to RoutesWithSubRoutes!')
  })
})
