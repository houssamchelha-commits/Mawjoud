(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('contact-status');
  const fields = [...form.querySelectorAll('.form-field')];
  function validate(field) {
    const input = field.querySelector('input,select,textarea');
    const valid = input.checkValidity() && (input.type !== 'text' || input.value.trim().length >= 2) && (input.name !== 'message' || input.value.trim().length >= 10);
    field.classList.toggle('has-error', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    return valid;
  }
  fields.forEach(field=>field.querySelector('input,select,textarea').addEventListener('blur',()=>validate(field)));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      status.textContent = 'Vérifiez les champs indiqués avant d’envoyer.';
      status.style.color = '#b64050';
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.innerHTML = 'Envoi en cours…';
    status.textContent = '';
    window.setTimeout(() => {
      form.reset();
      fields.forEach(field=>field.classList.remove('has-error'));
      submit.disabled = false;
      submit.innerHTML = 'Envoyer mon message <i data-lucide="send"></i>';
      status.textContent = 'Merci pour votre message ! Cette démo ne l’envoie pas à un serveur.';
      status.style.color = '#16845c';
      Mawjoud.refreshIcons();
      Mawjoud.toast('Message simulé avec succès.');
    }, 850);
  });
  document.querySelectorAll('.accordion-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded',String(!open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = open;
  }));
})();
