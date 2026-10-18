(() => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const page = document.body.dataset.page;
  const links = [
    ['index.html', 'Accueil', 'home'],
    ['annonces.html', 'Annonces', 'annonces'],
    ['contact.html', 'Contact', 'contact']
  ];
  if (header) {
    header.innerHTML = `<a class="skip-link" href="#main">Aller au contenu</a><nav class="site-nav" aria-label="Navigation principale"><a class="brand" href="index.html" aria-label="Mawjoud Market, accueil"><span class="brand-mark"><i data-lucide="store"></i></span><span>Mawjoud<span>.</span></span></a><div class="nav-links" id="primary-nav">${links.map(([href,label,key])=>`<a href="${href}"${page===key?' aria-current="page"':''}>${label}</a>`).join('')}</div><div class="nav-actions"><a class="button button-soft" href="ajouter-annonce.html"><i data-lucide="plus"></i> Déposer une annonce</a><button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Ouvrir le menu"><i data-lucide="menu"></i></button></div></nav>`;
    header.querySelector('.mobile-toggle').addEventListener('click', event => {
      const button = event.currentTarget;
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      header.querySelector('.nav-links').classList.toggle('is-open', open);
    });
    header.addEventListener('click', event => {
      if (event.target.closest('.nav-links a')) header.querySelector('.nav-links').classList.remove('is-open');
    });
  }
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="footer-inner"><div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark"><i data-lucide="store"></i></span><span>Mawjoud<span>.</span></span></a><p>Tout ce que vous cherchez, au même endroit. La marketplace qui rapproche les belles trouvailles et les bonnes personnes.</p></div><div class="footer-column"><strong>Découvrir</strong><a href="annonces.html">Toutes les annonces</a><a href="annonces.html?category=Immobilier">Immobilier</a><a href="annonces.html?category=Véhicules">Véhicules</a><a href="annonces.html?category=Maison">Maison &amp; déco</a></div><div class="footer-column"><strong>Participer</strong><a href="ajouter-annonce.html">Déposer une annonce</a><a href="paiement.html">Mise en avant · démo</a><a href="contact.html">Nous contacter</a></div><div class="footer-column"><strong>À propos</strong><a href="contact.html#faq-list">Conseils de sécurité</a><a href="contact.html">Questions fréquentes</a><a href="contact.html">Une idée ? Parlons-en</a></div></div><div class="footer-bottom"><span>© 2026 Mawjoud Market · Projet de démonstration</span><span>Fait avec soin au Maroc <i data-lucide="heart"></i></span></div>`;
  }
  document.body.insertAdjacentHTML('beforeend', '<div class="toast-region" aria-live="polite" aria-atomic="false"></div>');
  window.Mawjoud = {
    escape(value) {
      return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    },
    money(value) {
      return Number(value).toLocaleString('fr-MA') + ' MAD';
    },
    toast(message, type = 'success') {
      const region = document.querySelector('.toast-region');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.setAttribute('role', 'status');
      toast.textContent = message;
      region.append(toast);
      window.setTimeout(() => toast.remove(), 3600);
    },
    favoriteIds() {
      try { return JSON.parse(localStorage.getItem('mawjoud-favorites') || '[]'); }
      catch (error) { console.error('Impossible de lire les favoris locaux.', error); return []; }
    },
    renderCard(item) {
      const favorite = this.favoriteIds().includes(item.id);
      return `<article class="listing-card"><div class="listing-image"><img src="${this.escape(item.image)}" alt="${this.escape(item.title)}" loading="lazy"><span class="listing-category">${this.escape(item.category)}</span><button class="favorite-button${favorite?' is-favorite':''}" type="button" data-favorite="${this.escape(item.id)}" aria-label="${favorite?'Retirer des favoris':'Ajouter aux favoris'}" aria-pressed="${favorite}"><i data-lucide="heart"></i></button></div><div class="listing-info"><a class="listing-title" href="contact.html" aria-label="Contacter au sujet de : ${this.escape(item.title)}">${this.escape(item.title)}</a><div class="listing-price">${item.price ? this.money(item.price) : 'À discuter'}</div><div class="listing-meta"><span><i data-lucide="map-pin"></i>${this.escape(item.city)}</span><span><i data-lucide="calendar-days"></i>${new Date(`${item.date}T12:00:00`).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</span></div></div></article>`;
    },
    refreshIcons() {
      if (window.lucide) window.lucide.createIcons();
    }
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-favorite]');
    if (!button) return;
    const id = button.dataset.favorite;
    const favorites = Mawjoud.favoriteIds();
    const isFavorite = favorites.includes(id);
    const updated = isFavorite ? favorites.filter(value => value !== id) : [...favorites, id];
    try { localStorage.setItem('mawjoud-favorites', JSON.stringify(updated)); }
    catch (error) { console.error('Impossible de sauvegarder les favoris locaux.', error); Mawjoud.toast('Les favoris ne peuvent pas être sauvegardés sur cet appareil.', 'error'); return; }
    button.classList.toggle('is-favorite', !isFavorite);
    button.setAttribute('aria-pressed', String(!isFavorite));
    button.setAttribute('aria-label', isFavorite ? 'Ajouter aux favoris' : 'Retirer des favoris');
    Mawjoud.toast(isFavorite ? 'Annonce retirée de vos favoris.' : 'Annonce ajoutée à vos favoris.');
  });
  if (page === 'home') {
    const target = document.getElementById('featured-listings');
    if (target) target.innerHTML = window.MAWJOUD_LISTINGS.slice(0, 4).map(item => Mawjoud.renderCard(item)).join('');
  }
  window.addEventListener('load', () => Mawjoud.refreshIcons(), {once:true});
})();
