(() => {
  const content = document.getElementById('product-content');
  if (!content) return;

  const params = new URLSearchParams(window.location.search);
  const listingId = params.get('id');
  const listing = window.MAWJOUD_LISTINGS.find(item => item.id === listingId);
  const breadcrumbCategory = document.getElementById('product-breadcrumb-category');

  if (!listing) {
    document.title = 'Annonce introuvable — Mawjoud Market';
    content.innerHTML = `<section class="empty-state product-not-found"><i data-lucide="search-x"></i><h1>Cette annonce est introuvable</h1><p>Elle n’existe pas ou n’est plus disponible. Parcourez les autres annonces pour trouver votre bonheur.</p><a class="button button-primary" href="annonces.html">Voir les annonces <i data-lucide="arrow-right"></i></a></section>`;
    Mawjoud.refreshIcons();
    return;
  }

  const escape = Mawjoud.escape;
  const formattedDate = new Date(`${listing.date}T12:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const contactUrl = `contact.html?annonce=${encodeURIComponent(listing.id)}`;
  const relatedListings = window.MAWJOUD_LISTINGS
    .filter(item => item.id !== listing.id && item.category === listing.category)
    .slice(0, 4);

  document.title = `${listing.title} — Mawjoud Market`;
  breadcrumbCategory.textContent = listing.category;
  content.innerHTML = `
    <article class="product-detail">
      <div class="product-photo"><img src="${escape(listing.image)}" alt="${escape(listing.title)}"></div>
      <div class="product-summary glass-panel">
        <span class="eyebrow">${escape(listing.category)}</span>
        <h1>${escape(listing.title)}</h1>
        <p class="product-price">${listing.price ? Mawjoud.money(listing.price) : 'À discuter'}</p>
        <div class="product-facts">
          <span><i data-lucide="map-pin"></i>${escape(listing.city)}</span>
          <span><i data-lucide="calendar-days"></i>Publiée le ${escape(formattedDate)}</span>
          <span><i data-lucide="tag"></i>Réf. ${escape(listing.id)}</span>
        </div>
        <a class="button button-primary product-contact" href="${contactUrl}">Poser une question <i data-lucide="arrow-right"></i></a>
        <p class="product-demo-note">Cette annonce est présentée dans une démonstration. Vérifiez toujours les informations avant tout échange.</p>
      </div>
      <section class="product-description glass-panel">
        <span class="eyebrow">À propos de cette annonce</span>
        <h2>Description</h2>
        <p>${escape(listing.description)}</p>
      </section>
    </article>
    ${relatedListings.length ? `<section class="product-related"><div class="section-heading"><div><span class="eyebrow">À découvrir aussi</span><h2>Dans la catégorie ${escape(listing.category)}</h2></div><a class="text-link" href="annonces.html?category=${encodeURIComponent(listing.category)}">Toutes les annonces <i data-lucide="arrow-right"></i></a></div><div class="listing-grid">${relatedListings.map(item => Mawjoud.renderCard(item)).join('')}</div></section>` : ''}
  `;
  Mawjoud.refreshIcons();
})();
