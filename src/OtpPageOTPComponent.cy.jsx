import React from 'react'
import OTPComponent from './OtpPage'

describe('<OTPComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OTPComponent />)
  })
})