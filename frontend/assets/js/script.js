"use strict";
document.addEventListener('DOMContentLoaded', init);
function init() {
    fetchWandelingen()

  const form = document.getElementById('wandeling-form');
  const formWrapper = document.getElementById('form-wrapper');
  const openFormBtn = document.getElementById('open-form');


  openFormBtn.addEventListener('click', () => {
    formWrapper.classList.remove('hidden');
    form.scrollIntoView({ behavior: 'smooth' });
    resetForm();
  });

  // Formulierverzending afhandelen
  form.addEventListener('submit', handleFormSubmit);
}
function fetchWandelingen(){
    fetch("http://localhost:3333/wandelingen")
        .then(response => response.json())
        .then(data => {
            renderWandelingen(data);
        });
}

function renderWandelingen(wandelingen){
    const list = document.getElementById('wandeling-list');
  list.innerHTML = '';

  wandelingen.forEach(wandeling => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${wandeling.titel}</td>
      <td>${wandeling.bestemming}</td>
      <td>${wandeling.moeilijkheidsgraad}</td>
      <td>${wandeling.afstand_km}</td>
      <td>${wandeling.duur}</td>
      <td>${wandeling.beschrijving}</td>
      <td>
        <button class="edit-btn" data-id="${wandeling.id}">✏️ Wijzig</button>
        <button class="delete-btn" data-id="${wandeling.id}">🗑️ Verwijder</button>
      </td>
    `;

    // Voeg event listeners toe aan knoppen
    row.querySelector('.edit-btn').addEventListener('click', () => editWandeling(wandeling.id));
    row.querySelector('.delete-btn').addEventListener('click', () => deleteWandeling(wandelingen.id));

    list.appendChild(row);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('absence-id').value;
  const wandeling = {
    titel: document.getElementById('titel').value,
    bestemming: document.getElementById('bestemming').value,
    moeilijkheidsgraad: document.getElementById('moeilijkheidsgraad').value,
    afstand: document.getElementById('afstand').value,
    tijdsduur: document.getElementById('tijdsduur').value,
    beschrijving: document.getElementById('beschrijving').value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id
      ? `http://localhost:3333/updateWandeling/${id}`
      : 'http://localhost:3333/nieuweWandeling';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(absence)
  })
      .then(() => {
        showAlert(id ? '✏️ Afwezigheid bijgewerkt!' : '✅ Afwezigheid toegevoegd!', 'success');
        resetForm();
        fetchWandelingen();
        document.getElementById('form-wrapper').classList.add('hidden')
      })
      .catch(() => showAlert('❌ Er ging iets mis.', 'error'));
}

function editWandeling(id) {
  fetch(`http://localhost:3333/updateWandeling/${id}`)
      .then(res => res.json())
      .then(wandeling => {
        document.getElementById('wandeling-id').value = wandeling.id;
        document.getElementById('titel').value = wandeling.titel;
        document.getElementById('bestemming').value = wandeling.bestemming;
        document.getElementById('moeilijkheidsgraad').value = wandeling.moeilijkheidsgraad;
        document.getElementById('tijdsduur').value = wandeling.tijdsduur;
        document.getElementById('afstand').value = wandeling.afstand;
        document.getElementById('beschrijving').value = wandeling.beschrijving;
        document.getElementById('form-wrapper').classList.remove('hidden');
        document.getElementById('absence-form').scrollIntoView({ behavior: 'smooth' });
      });
}

// Verwijder een afwezigheid
function deleteWandeling(id) {
  fetch(`http://localhost:3333/deleteWandeling/${id}`, { method: 'DELETE' })
      .then(() => {
        showAlert('🗑️ wandeling verwijderd.', 'success');
        fetch();
      })
      .catch(() => showAlert('❌ Verwijderen mislukt.', 'error'));
}

function resetForm(){
  document.getElementById('wandeling-id').value = '';
  document.getElementById('wandeling-form').reset();
}

function showAlert(message, type = 'success') {
  const alertBox = document.getElementById("alert");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.classList.remove('hidden');
  setTimeout(() => alertBox.classList.add('hidden'), 3000);
}