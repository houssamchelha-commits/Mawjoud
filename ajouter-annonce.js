(() => {
  const form = document.getElementById('listing-wizard');
  if (!form) return;
  const steps = [...form.querySelectorAll('.wizard-step')];
  const stepIndicators = [...document.querySelectorAll('.stepper-step')];
  const prev = document.getElementById('wizard-prev');
  const next = document.getElementById('wizard-next');
  const imageInput = document.getElementById('listing-images');
  const previewGrid = document.getElementById('image-previews');
  const draftKey = 'mawjoud-listing-draft';
  let current = 0;
  let imageFiles = [];

  try {
    const draft = JSON.parse(localStorage.getItem(draftKey) || '{}');
    Object.entries(draft).forEach(([name,value])=>{
      const controls = [...form.querySelectorAll(`[name="${CSS.escape(name)}"]`)];
      const control = controls.find(entry=>entry.type === 'radio' || entry.type === 'checkbox')
        ? controls.find(entry=>entry.value === value) : controls[0];
      if (control && control.type === 'radio') control.checked = true;
      else if (control && control.type !== 'file') control.value = value;
    });
  } catch (error) {
    console.error('Impossible de restaurer le brouillon local.',error);
    Mawjoud.toast('Le brouillon local n’a pas pu être restauré.','error');
  }
  function saveDraft() {
    const data = {};
    new FormData(form).forEach((value,key)=>{
      if (typeof value === 'string' && value) data[key] = value;
    });
    try { localStorage.setItem(draftKey,JSON.stringify(data)); }
    catch (error) { console.error('Impossible de sauvegarder le brouillon local.',error); }
  }
  form.addEventListener('input',saveDraft);
  form.addEventListener('change',saveDraft);

  function updateStep() {
    steps.forEach((step,index)=>step.classList.toggle('is-active',index===current));
    stepIndicators.forEach((indicator,index)=>{
      indicator.classList.toggle('is-active',index===current);
      indicator.classList.toggle('is-done',index<current);
    });
    prev.disabled = current === 0;
    next.innerHTML = current === steps.length-1 ? 'Publier mon annonce <i data-lucide="send"></i>' : 'Continuer <i data-lucide="arrow-right"></i>';
    Mawjoud.refreshIcons();
    if(current===steps.length-1)renderReview();
  }
  function showError(id,show) {
    const error = document.getElementById(id);
    error.style.display = show ? 'block' : 'none';
  }
  function validateStep() {
    if(current===0) {
      const selected = form.querySelector('[name="category"]:checked');
      showError('category-error',!selected);
      if(!selected)form.querySelector('[name="category"]').focus();
      return Boolean(selected);
    }
    if(current===1) {
      const title = document.getElementById('listing-title');
      const description = document.getElementById('listing-description');
      const titleField = title.closest('.form-field');
      const descriptionField = description.closest('.form-field');
      const titleValid = title.value.trim().length>=5;
      const descriptionValid = description.value.trim().length>=20;
      titleField.classList.toggle('has-error',!titleValid);
      descriptionField.classList.toggle('has-error',!descriptionValid);
      if(!titleValid)title.focus(); else if(!descriptionValid)description.focus();
      return titleValid&&descriptionValid;
    }
    if(current===2) {
      const price = document.getElementById('listing-price');
      const city = document.getElementById('listing-city');
      const priceValid = price.value!==''&&Number(price.value)>=0&&Number.isFinite(Number(price.value));
      const cityValid = Boolean(city.value);
      price.closest('.form-field').classList.toggle('has-error',!priceValid);
      city.closest('.form-field').classList.toggle('has-error',!cityValid);
      if(!priceValid)price.focus();else if(!cityValid)city.focus();
      return priceValid&&cityValid;
    }
    if(current===3) {
      const valid = imageFiles.length<=5 && imageFiles.every(file=>['image/jpeg','image/png','image/webp'].includes(file.type)&&file.size<=5*1024*1024);
      showError('image-error',!valid);
      return valid;
    }
    return true;
  }
  function renderReview() {
    const category = form.querySelector('[name="category"]:checked')?.value || '';
    const title = document.getElementById('listing-title').value.trim();
    const description = document.getElementById('listing-description').value.trim();
    const price = Number(document.getElementById('listing-price').value);
    const city = document.getElementById('listing-city').value;
    const imageSummary = imageFiles.length ? `${imageFiles.length} photo${imageFiles.length>1?'s':''} ajoutée${imageFiles.length>1?'s':''}` : 'Aucune photo ajoutée';
    document.getElementById('listing-review').innerHTML = `<h3>${Mawjoud.escape(title||'Votre annonce')}</h3><p><strong>${Mawjoud.escape(category)}</strong> · ${Mawjoud.escape(city)}</p><p class="review-price">${Mawjoud.money(price)}</p><p>${Mawjoud.escape(description)}</p><p>${imageSummary}</p>`;
  }
  function updatePreviews() {
    previewGrid.innerHTML = '';
    imageFiles.forEach((file,index)=>{
      const url=URL.createObjectURL(file);
      const item=document.createElement('div');
      item.className='preview-item';
      item.innerHTML=`<img src="${url}" alt="Aperçu ${index+1}"><button type="button" aria-label="Retirer la photo ${index+1}" data-remove-image="${index}"><i data-lucide="x"></i></button>`;
      const preview=item.querySelector('img');
      const revokeUrl=()=>URL.revokeObjectURL(url);
      preview.addEventListener('load',revokeUrl,{once:true});
      preview.addEventListener('error',revokeUrl,{once:true});
      previewGrid.append(item);
    });
    Mawjoud.refreshIcons();
  }
  imageInput.addEventListener('change',()=>{
    const added=[...imageInput.files];
    const candidate=[...imageFiles,...added];
    if(candidate.length>5||candidate.some(file=>!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024)) {
      showError('image-error',true);
      imageInput.value='';
      return;
    }
    imageFiles=candidate;
    showError('image-error',false);
    updatePreviews();
    imageInput.value='';
  });
  previewGrid.addEventListener('click',event=>{
    const button=event.target.closest('[data-remove-image]');
    if(!button)return;
    imageFiles.splice(Number(button.dataset.removeImage),1);
    updatePreviews();
  });
  prev.addEventListener('click',()=>{if(current>0){current--;updateStep();}});
  next.addEventListener('click',()=>{
    if(!validateStep())return;
    if(current<steps.length-1){current++;updateStep();return;}
    const featured=form.querySelector('[name="promotion"]:checked').value==='featured';
    const submittedTitle=document.getElementById('listing-title').value.trim();
    saveDraft();
    if(featured) {
      const draft=JSON.parse(localStorage.getItem(draftKey)||'{}');
      draft.promotion='featured';
      try{localStorage.setItem(draftKey,JSON.stringify(draft));}catch(error){console.error('Impossible de sauvegarder le brouillon local.',error);}
      location.href=`paiement.html?listing=${encodeURIComponent(document.getElementById('listing-title').value.trim())}`;
      return;
    }
    try{localStorage.removeItem(draftKey);}catch(error){console.error('Impossible d’effacer le brouillon local.',error);}
    form.innerHTML=`<section class="confirmation-panel"><div class="confirmation-icon"><i data-lucide="check"></i></div><span class="eyebrow">Merci pour votre confiance</span><h2>Votre annonce est en attente de validation.</h2><p>Cette publication est simulée dans votre navigateur. Elle n'est envoyée à aucun serveur.</p><p class="confirmation-code">${Mawjoud.escape(submittedTitle)}</p><p style="margin-top:22px"><a class="button button-primary" href="annonces.html">Explorer les annonces <i data-lucide="arrow-right"></i></a> <a class="button button-outline" href="index.html">Accueil</a></p></section>`;
    Mawjoud.refreshIcons();
    Mawjoud.toast('Annonce enregistrée en démo : en attente de validation.');
  });
  updateStep();
})();
