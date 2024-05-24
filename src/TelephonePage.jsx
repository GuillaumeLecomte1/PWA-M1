import React, { useState } from 'react';
import './layout.css';

const TelephonePage = () => {
  const [number, setNumber] = useState('');

  const handleNumberClick = (num) => {
    setNumber(number + num);
  };

  const handleCall = () => {
    if (number.length > 0) {
      window.location.href = `tel:${number}`;
    } else {
      alert('Veuillez entrer un numéro de téléphone valide.');
    }
  };

  const handleHangUp = () => {
    alert('Appel terminé');
    setNumber('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.display}>{number}</div>
      <div style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
          <button
            key={num}
            style={styles.button}
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div style={styles.actions}>
        <button style={styles.callButton} onClick={handleCall}>
          Appeler
        </button>
        <button style={styles.hangUpButton} onClick={handleHangUp}>
          Raccrocher
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  display: {
    width: '200px',
    height: '50px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  button: {
    width: '60px',
    height: '60px',
    fontSize: '24px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  actions: {
    marginTop: '20px',
  },
  callButton: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
    marginRight: '10px',
  },
  hangUpButton: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
  },
};

export default TelephonePage;
