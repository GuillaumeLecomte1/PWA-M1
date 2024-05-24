describe('OTPComponent', () => {
    it('should display OTP code when received', () => {
      // Visiter la page contenant le composant OTP
      cy.visit('/sms');
  
      // Simuler l'OTP
      cy.window().then((win) => {
        const mockOtp = { code: '123456' };
        cy.stub(win.navigator.credentials, 'get').resolves(mockOtp);
      });
  
      // Vérifier que le code OTP est affiché
      cy.contains('Votre code OTP est : 123456').should('be.visible');
    });
  });
  