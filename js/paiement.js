(() => {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  const packageInfo = {
    basic: {name:'À la une · 7 jours',price:49},
    premium: {name:'Vedette · 30 jours',price:99}
  };
  const listingTitle = new URLSearchParams(location.search).get('listing');
  if (listingTitle) document.getElementById('checkout-listing').textContent = `Mise en avant : ${listingTitle}`;
  const radios = [...form.querySelectorAll('[name="package"]')];
  const cardFields = document.getElementById('demo-card-fields');
  const cardInputs = [...cardFields.querySelectorAll('input')];
  const billingFields = [...form.querySelectorAll('.checkout-main > .form-row .form-field')];
  const cardNumber = document.getElementById('demo-card-number');
  const expiry = document.getElementById('demo-expiry');
  const cvc = document.getElementById('demo-cvc');
  let processing = false;

  function selectedMethod() { return form.querySelector('[name="method"]:checked').value; }
  function updateSummary() {
    const selected = packageInfo[form.querySelector('[name="package"]:checked').value];
    document.getElementById('summary-package').textContent = selected.name;
    document.getElementById('summary-price').textContent = Mawjoud.money(selected.price);
    document.getElementById('summary-total').textContent = Mawjoud.money(selected.price);
  }
  radios.forEach(radio=>radio.addEventListener('change',updateSummary));
  form.querySelectorAll('[name="method"]').forEach(radio=>radio.addEventListener('change',()=>{
    const useCard = selectedMethod() === 'demo-card';
    cardFields.hidden = !useCard;
    cardInputs.forEach(input=>input.required = useCard);
  }));
  cardNumber.addEventListener('input',()=>{
    const digits = cardNumber.value.replace(/\D/g,'').slice(0,16);
    cardNumber.value = digits.replace(/(\d{4})(?=\d)/g,'$1 ');
  });
  expiry.addEventListener('input',()=>{
    const digits = expiry.value.replace(/\D/g,'').slice(0,4);
    expiry.value = digits.length > 2 ? `${digits.slice(0,2)}/${digits.slice(2)}` : digits;
  });
  cvc.addEventListener('input',()=>{cvc.value=cvc.value.replace(/\D/g,'').slice(0,4);});

  function validateField(field, valid) {
    field.classList.toggle('has-error',!valid);
    const input = field.querySelector('input');
    input.setAttribute('aria-invalid',String(!valid));
    return valid;
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if (processing) return;
    const nameField = billingFields[0];
    const emailField = billingFields[1];
    const checks = [
      validateField(nameField,nameField.querySelector('input').value.trim().length >= 2),
      validateField(emailField,emailField.querySelector('input').validity.valid)
    ];
    if (selectedMethod() === 'demo-card') {
      const numberField = cardNumber.closest('.form-field');
      const expiryField = expiry.closest('.form-field');
      const cvcField = cvc.closest('.form-field');
      const match = expiry.value.match(/^(\d{2})\/(\d{2})$/);
      const month = match ? Number(match[1]) : 0;
      const year = match ? 2000 + Number(match[2]) : 0;
      const now = new Date();
      const dateValid = Boolean(match && month >= 1 && month <= 12 && (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth()+1)));
      checks.push(validateField(numberField,/^\d{4}( \d{4}){3}$/.test(cardNumber.value)));
      checks.push(validateField(expiryField,dateValid));
      checks.push(validateField(cvcField,/^\d{3,4}$/.test(cvc.value)));
    }
    const terms = document.getElementById('terms');
    document.getElementById('terms-error').style.display = terms.checked ? 'none' : 'block';
    terms.setAttribute('aria-invalid',String(!terms.checked));
    checks.push(terms.checked);
    if (checks.some(check=>!check)) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      Mawjoud.toast('Vérifiez les informations de démonstration.', 'error');
      return;
    }
    processing = true;
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = 'Simulation en cours…';
    window.setTimeout(()=>{
      const reference = `DEMO-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
      document.getElementById('checkout-content').innerHTML = `<section class="confirmation-panel glass-panel"><div class="confirmation-icon"><i data-lucide="check"></i></div><span class="eyebrow">Simulation terminée</span><h2>Votre annonce est prête à briller !</h2><p>Aucun paiement réel n'a été effectué. Il s'agit uniquement d'une confirmation fictive de cette démonstration.</p><p>Référence de démonstration</p><div class="confirmation-code">${reference}</div><p style="margin-top:22px"><a class="button button-primary" href="annonces.html">Retour aux annonces <i data-lucide="arrow-right"></i></a></p></section>`;
      Mawjoud.refreshIcons();
    },1000);
  });
  updateSummary();
})();
