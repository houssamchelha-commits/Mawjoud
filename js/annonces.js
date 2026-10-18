(() => {
  const form = document.getElementById('listing-filters');
  if (!form) return;
  const query = document.getElementById('filter-query');
  const category = document.getElementById('filter-category');
  const city = document.getElementById('filter-city');
  const minimum = document.getElementById('filter-min');
  const maximum = document.getElementById('filter-max');
  const sort = document.getElementById('filter-sort');
  const grid = document.getElementById('all-listings');
  const count = document.getElementById('results-count');
  const chips = document.getElementById('active-filters');
  const loadMoreWrap = document.getElementById('load-more-wrap');
  let visibleLimit = 8;
  const params = new URLSearchParams(window.location.search);
  category.innerHTML += window.MAWJOUD_CATEGORIES.map(value=>`<option>${Mawjoud.escape(value)}</option>`).join('');
  [...new Set(window.MAWJOUD_LISTINGS.map(item => item.city))].sort((a,b)=>a.localeCompare(b,'fr')).forEach(value => city.add(new Option(value, value)));
  query.value = params.get('q') || '';
  if (window.MAWJOUD_CATEGORIES.includes(params.get('category'))) category.value = params.get('category');
  if ([...city.options].some(option => option.value === params.get('city'))) city.value = params.get('city');

  function render() {
    const q = query.value.trim().toLocaleLowerCase('fr');
    const filtered = window.MAWJOUD_LISTINGS.filter(item => {
      const searchText = `${item.title} ${item.description} ${item.category} ${item.city}`.toLocaleLowerCase('fr');
      const matchesPrice = (!minimum.value || item.price >= Number(minimum.value)) && (!maximum.value || item.price <= Number(maximum.value));
      return (!q || searchText.includes(q)) && (!category.value || item.category === category.value) && (!city.value || item.city === city.value) && matchesPrice;
    });
    filtered.sort((a,b) => sort.value === 'price-asc' ? a.price-b.price : sort.value === 'price-desc' ? b.price-a.price : b.date.localeCompare(a.date));
    count.textContent = `${filtered.length} annonce${filtered.length === 1 ? '' : 's'}`;
    const active = [['Recherche', query.value.trim(), () => {query.value='';}],['Catégorie',category.value,()=>{category.value='';}],['Ville',city.value,()=>{city.value='';}],['Min.',minimum.value,()=>{minimum.value='';}],['Max.',maximum.value,()=>{maximum.value='';}]];
    chips.innerHTML = active.filter(([,value])=>value).map(([label,value])=>`<span class="filter-chip">${label} : ${Mawjoud.escape(value)} <button type="button" aria-label="Retirer le filtre ${label}" data-clear-filter="${label}"><i data-lucide="x"></i></button></span>`).join('');
    const current = filtered.slice(0, visibleLimit);
    grid.innerHTML = current.length ? current.map(item=>Mawjoud.renderCard(item)).join('') : `<div class="empty-state" style="grid-column:1/-1"><i data-lucide="search-x"></i><h3>Aucune annonce pour l'instant</h3><p>Essayez d'autres mots ou élargissez vos filtres.</p><button class="button button-soft" type="button" id="empty-clear">Effacer les filtres</button></div>`;
    loadMoreWrap.hidden = filtered.length <= visibleLimit;
    Mawjoud.refreshIcons();
  }
  form.addEventListener('submit', event => {event.preventDefault();visibleLimit=8;render();});
  [category,city,minimum,maximum,sort].forEach(control => control.addEventListener('change',()=>{visibleLimit=8;render();}));
  query.addEventListener('input',()=>{visibleLimit=8;render();});
  document.getElementById('load-more').addEventListener('click',()=>{visibleLimit+=8;render();});
  document.getElementById('clear-filters').addEventListener('click',()=>{form.reset();visibleLimit=8;render();});
  chips.addEventListener('click',event=>{const button=event.target.closest('[data-clear-filter]');if(!button)return;const entry=activeControl(button.dataset.clearFilter);entry.value='';render();});
  grid.addEventListener('click',event=>{if(event.target.closest('#empty-clear')){form.reset();render();}});
  function activeControl(label){return ({Recherche:query,'Catégorie':category,'Ville':city,'Min.':minimum,'Max.':maximum})[label];}
  render();
})();
