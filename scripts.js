// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgtPpDuHCLppJxrHUeLnyBDbhCOsq6QTA",
  authDomain: "hitung-so2.firebaseapp.com",
  projectId: "hitung-so2",
  storageBucket: "hitung-so2.appspot.com",
  messagingSenderId: "945221839072",
  appId: "1:945221839072:web:a3354b470090122b534885",
  measurementId: "G-012ZG1NG61"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elements
const saveConstantsBtn = document.getElementById('saveConstants');
const calculateBtn = document.getElementById('calculate');
const viewResultsBtn = document.getElementById('viewResults');

saveConstantsBtn.addEventListener('click', saveConstants);
calculateBtn.addEventListener('click', calculateSO2);
viewResultsBtn.addEventListener('click', () => {
    window.location.href = 'results.html';
});

function saveConstants() {
    const C = document.getElementById('C').value;
    const V = document.getElementById('V').value;
    const Pt = document.getElementById('Pt').value;
    
    localStorage.setItem('C', C);
    localStorage.setItem('V', V);
    localStorage.setItem('Pt', Pt);
    
    alert('Konstanta disimpan!');
}

function calculateSO2() {
    const C = parseFloat(localStorage.getItem('C') || document.getElementById('C').value);
    const V = parseFloat(localStorage.getItem('V') || document.getElementById('V').value);
    const Pt = parseFloat(localStorage.getItem('Pt') || document.getElementById('Pt').value);
    const time = document.getElementById('time').value;
    const V1 = parseFloat(document.getElementById('V1').value);
    
    const SO2 = (C * V * 10945) / (Pt * V1 + (C * V * 10945)) * 100;
    
    db.collection("results").add({
        time,
        V1,
        Pt,
        SO2
    }).then(() => {
        document.getElementById('result').innerText = `Kadar SO2: ${SO2.toFixed(2)}%`;
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}