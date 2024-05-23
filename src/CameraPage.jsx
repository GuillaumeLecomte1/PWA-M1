// import './App.css';
// import Webcam from 'react-webcam';
// import React, { useRef } from 'react';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import GeolocationPage from './GeolocationPage'; // Un nouveau composant pour la page de géolocalisation
// import CameraPage from './CameraPage'; // Un nouveau composant pour la page de la caméra

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// serviceWorkerRegistration.register();

// function App() {
//   const webcamRef = useRef(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     // Enregistrer l'image capturée dans le localStorage
//     if (imageSrc) {
//       localStorage.setItem('capturedPhoto', imageSrc);
      
//       if ('Notification' in window && Notification.permission === 'granted') {
//         new Notification('Photo Capturée', {
//           body: 'Votre photo a été capturée avec succès!',
//           icon: imageSrc,
//         });
//       }
//     }
//   };

//    // Configurer les écouteurs pour détecter le changement de statut de connexion
//    useEffect(() => {
//     const updateOnlineStatus = () => setIsOnline(navigator.onLine);

//     window.addEventListener('online', updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);

//     if ('Notification' in window && Notification.permission !== 'granted') {
//       Notification.requestPermission();
//     }

//     return () => {
//       window.removeEventListener('online', updateOnlineStatus);
//       window.removeEventListener('offline', updateOnlineStatus);
//     };
//   }, []);


//   React.useEffect(() => {
//     if ('Notification' in window && Notification.permission !== 'granted') {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div className="App">
//  <Router>
  
//         <nav className="navbar">
//           <ul className="navbar-nav">
//             <li className="nav-item"><Link to="/">Accueil</Link></li>
//             <li className="nav-item"><Link to="/geolocalisation">Géolocalisation</Link></li>
//             <li className="nav-item"><Link to="/camera">Camera</Link></li>
//             {/* Autres liens de navigation */}
//           </ul>
//         </nav>

//         {/* Utilisation de Routes au lieu de Switch */}
//         {/* <Routes>
//           <Route path="/geolocalisation" element={<GeolocationPage />} />
//           <Route path="/camera" element={<CameraPage/>} />
//         </Routes> */}
     
//     </Router>
// <header className="App-header">
        
// {/* Création de la webcam */}
//  <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <br />
//       <button onClick={capture}>Capture Photo</button>
//     </div>

//     {/* Affichage de la photo stockée */}
//     <div className="captured-photo">
//       {localStorage.getItem('capturedPhoto') && (
//         <img src={localStorage.getItem('capturedPhoto')} alt="Captured" />
//       )}
//     </div>
// $
//       </header>
//     </div>
//   );
// }

// export default App;
