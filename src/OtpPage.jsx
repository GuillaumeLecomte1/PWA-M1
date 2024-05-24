import React, { useState, useEffect } from 'react';

const OTPComponent = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Vérifie si l'API WebOTP est disponible
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal
      }).then(otp => {
        if (otp && otp.code) {
          setOtp(otp.code);
        }
      }).catch(err => {
        setMessage('Impossible de lire l\'OTP via SMS');
        console.error(err);
      });

      // Nettoyage en cas de démontage du composant
      return () => ac.abort();
    } else {
      setMessage('L\'API WebOTP n\'est pas supportée par ce navigateur');
    }
  }, []);

  return (
    <div>
      <h1>Validation par SMS</h1>
      {otp ? (
        <div>
          <p>Votre code OTP est : {otp}</p>
        </div>
      ) : (
        <p>En attente de réception du SMS...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPComponent;
