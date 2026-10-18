(() => {
  const translations = {
    fr: {home:'Accueil', listings:'Annonces', contact:'Contact', post:'Déposer une annonce', skip:'Aller au contenu', nav:'Navigation principale', open:'Ouvrir le menu', close:'Fermer le menu', language:'Langue', theme:'Apparence', light:'Clair', dark:'Sombre', welcome:'Bienvenue chez Mawjoud', intro:'Les belles trouvailles sont tout près. Choisissez votre langue et votre apparence pour commencer.', start:'Découvrir Mawjoud', dismiss:'Fermer la fenêtre de bienvenue', discover:'Découvrir', all:'Toutes les annonces', participate:'Participer', about:'À propos', footer:'Tout ce que vous cherchez, au même endroit. La marketplace qui rapproche les belles trouvailles et les bonnes personnes.', made:'Fait avec soin au Maroc'},
    en: {home:'Home', listings:'Listings', contact:'Contact', post:'Post a listing', skip:'Skip to content', nav:'Main navigation', open:'Open menu', close:'Close menu', language:'Language', theme:'Appearance', light:'Light', dark:'Dark', welcome:'Welcome to Mawjoud', intro:'Great finds are closer than you think. Choose your language and appearance to get started.', start:'Explore Mawjoud', dismiss:'Close welcome window', discover:'Discover', all:'All listings', participate:'Get involved', about:'About', footer:'Everything you are looking for, all in one place. A marketplace bringing great finds and good people together.', made:'Made with care in Morocco'},
    de: {home:'Startseite', listings:'Anzeigen', contact:'Kontakt', post:'Anzeige aufgeben', skip:'Zum Inhalt springen', nav:'Hauptnavigation', open:'Menü öffnen', close:'Menü schließen', language:'Sprache', theme:'Darstellung', light:'Hell', dark:'Dunkel', welcome:'Willkommen bei Mawjoud', intro:'Dein nächster guter Fund ist ganz in der Nähe. Wähle Sprache und Darstellung, um loszulegen.', start:'Mawjoud entdecken', dismiss:'Willkommensfenster schließen', discover:'Entdecken', all:'Alle Anzeigen', participate:'Mitmachen', about:'Über uns', footer:'Alles, was du suchst, an einem Ort. Ein Marktplatz, der besondere Fundstücke und Menschen zusammenbringt.', made:'Mit Sorgfalt in Marokko gemacht'},
    ar: {home:'الرئيسية', listings:'الإعلانات', contact:'اتصل بنا', post:'أضف إعلانًا', skip:'انتقل إلى المحتوى', nav:'التنقل الرئيسي', open:'افتح القائمة', close:'أغلق القائمة', language:'اللغة', theme:'المظهر', light:'فاتح', dark:'داكن', welcome:'مرحبًا بك في موجود', intro:'عروض مميزة بالقرب منك. اختر اللغة والمظهر للبدء.', start:'اكتشف موجود', dismiss:'إغلاق نافذة الترحيب', discover:'اكتشف', all:'كل الإعلانات', participate:'شارك', about:'حول المنصة', footer:'كل ما تبحث عنه في مكان واحد. سوق يجمع بين العروض المميزة والأشخاص.', made:'صُنع بعناية في المغرب'}
  };
  const names = {fr:'Français', en:'English', de:'Deutsch', ar:'العربية'};
  const pagePhrases = [
    ['La marketplace qui vous rapproche','The marketplace that brings you closer','Der Marktplatz, der Menschen verbindet','سوق يجمعكم'],
    ['Tout ce que vous cherchez,','Everything you are looking for,','Alles, was du suchst,','كل ما تبحث عنه'],
    ['au même endroit.','all in one place.','an einem Ort.','في مكان واحد'],
    ['Des bonnes affaires, des rencontres locales et de nouvelles opportunités. Découvrez le meilleur du Maroc, simplement.','Great deals, local connections and new opportunities. Discover the best of Morocco, simply.','Gute Angebote, lokale Kontakte und neue Möglichkeiten. Entdecke Marokko ganz einfach.','صفقات مميزة وفرص جديدة بالقرب منك. اكتشف أفضل ما في المغرب بسهولة.'],
    ['Que recherchez-vous ?','What are you looking for?','Wonach suchst du?','ما الذي تبحث عنه؟'],
    ['Toutes les catégories','All categories','Alle Kategorien','كل الفئات'],
    ['Ville','City','Stadt','المدينة'],
    ['Rechercher','Search','Suchen','بحث'],
    ['Explorer les annonces','Explore listings','Anzeigen entdecken','تصفح الإعلانات'],
    ['Explorer par catégorie','Explore by category','Nach Kategorie entdecken','اكتشف حسب الفئة'],
    ['À vous de choisir','Your choice','Du hast die Wahl','اختر ما يناسبك'],
    ['Explorez par catégorie','Explore by category','Nach Kategorie entdecken','تصفح حسب الفئة'],
    ['Toutes les annonces','All listings','Alle Anzeigen','كل الإعلانات'],
    ['Les trouvailles du moment','Featured finds','Aktuelle Fundstücke','عروض مميزة'],
    ['À découvrir près de vous','Discover near you','In deiner Nähe entdecken','اكتشف بالقرب منك'],
    ['Des annonces choisies avec soin par la communauté.','Listings carefully selected by the community.','Sorgfältig von der Community ausgewählte Anzeigen.','إعلانات اختارها المجتمع بعناية.'],
    ['Simple comme bonjour','Simple as can be','Ganz einfach','بكل سهولة'],
    ['Une bonne trouvaille,','A great find,','Ein guter Fund,','اكتشاف رائع،'],
    ['en trois étapes.','in three steps.','in drei Schritten.','في ثلاث خطوات'],
    ['Trouvez votre bonheur','Find what you love','Finde, was du suchst','اعثر على ما يناسبك'],
    ['Échangez simplement','Connect with ease','Einfach austauschen','تواصل بسهولة'],
    ['Concluez en confiance','Make a confident deal','Sicher abschließen','أتمم بثقة'],
    ['La confiance, avant tout','Trust comes first','Vertrauen steht an erster Stelle','الثقة أولاً'],
    ['On est à votre écoute','We are listening','Wir sind für dich da','نحن هنا للاستماع إليك'],
    ['Parlons de ce qui compte.','Let’s talk about what matters.','Lass uns über das sprechen, was wichtig ist.','لنتحدث عما يهمك.'],
    ['Restons en contact','Keep in touch','Bleib in Kontakt','لنبقَ على تواصل'],
    ['Envoyez-nous un message','Send us a message','Schreib uns eine Nachricht','أرسل لنا رسالة'],
    ['Votre nom','Your name','Dein Name','اسمك'],
    ['Votre adresse e-mail','Your email address','Deine E-Mail-Adresse','بريدك الإلكتروني'],
    ['Votre message','Your message','Deine Nachricht','رسالتك'],
    ['Envoyer mon message','Send my message','Nachricht senden','أرسل رسالتي'],
    ['Questions fréquentes','Frequently asked questions','Häufige Fragen','الأسئلة الشائعة'],
    ['La bonne trouvaille est tout près','Your next great find is nearby','Dein nächster Fund ist ganz in der Nähe','اكتشافك القادم قريب منك'],
    ['Explorez les annonces','Explore listings','Anzeigen entdecken','تصفح الإعلانات'],
    ['Rechercher une annonce','Search listings','Anzeigen suchen','ابحث عن إعلان'],
    ['Un vélo, un appartement, une belle trouvaille…','A bike, an apartment, a great find…','Ein Fahrrad, eine Wohnung, ein echter Fund…','دراجة أو شقة أو اكتشاف مميز…'],
    ['Toutes les villes','All cities','Alle Städte','كل المدن'],
    ['Trier les annonces','Sort listings','Anzeigen sortieren','ترتيب الإعلانات'],
    ['Min. MAD','Min. MAD','Min. MAD','الحد الأدنى'],
    ['Max. MAD','Max. MAD','Max. MAD','الحد الأقصى'],
    ['Trouvez votre prochain coup de cœur','Find your next favorite','Finde deinen nächsten Favoriten','اعثر على ما يعجبك'],
    ['Plus récentes','Newest','Neueste','الأحدث'],
    ['Prix croissant','Price: low to high','Preis aufsteigend','السعر تصاعديًا'],
    ['Prix décroissant','Price: high to low','Preis absteigend','السعر تنازليًا'],
    ['Effacer les filtres','Clear filters','Filter löschen','مسح عوامل التصفية'],
    ['Afficher plus d’annonces','Show more listings','Mehr Anzeigen laden','عرض المزيد من الإعلانات'],
    ['Une annonce, de belles rencontres','A listing, new connections','Eine Anzeige, neue Kontakte','إعلان واحد، فرص جديدة'],
    ['Votre prochaine histoire commence ici.','Your next story starts here.','Deine nächste Geschichte beginnt hier.','قصتك القادمة تبدأ هنا.'],
    ['Catégorie','Category','Kategorie','الفئة'],
    ['Description','Description','Beschreibung','الوصف'],
    ['Prix & lieu','Price & location','Preis & Ort','السعر والموقع'],
    ['Photos','Photos','Fotos','الصور'],
    ['Vérification','Review','Prüfen','المراجعة'],
    ['Dans quelle catégorie ?','Which category?','Welche Kategorie?','ما الفئة المناسبة؟'],
    ['Présentez votre annonce','Describe your listing','Beschreibe deine Anzeige','قدّم إعلانك'],
    ['Prix et localisation','Price and location','Preis und Standort','السعر والموقع'],
    ['Ajoutez quelques photos','Add a few photos','Füge Fotos hinzu','أضف بعض الصور'],
    ['Un dernier coup d’œil','One last look','Ein letzter Blick','نظرة أخيرة'],
    ['Choisir des images','Choose images','Bilder auswählen','اختر الصور'],
    ['Choisir une ville','Choose a city','Stadt auswählen','اختر مدينة'],
    ['Continuer','Continue','Weiter','متابعة'],
    ['Précédent','Back','Zurück','السابق'],
    ['Donnez plus de visibilité.','Get more visibility.','Erreiche mehr Menschen.','احصل على مزيد من الظهور'],
    ['Choisissez votre mise en avant','Choose your promotion','Wähle deine Hervorhebung','اختر طريقة الترويج'],
    ['Vos informations','Your details','Deine Angaben','معلوماتك'],
    ['Nom complet','Full name','Vollständiger Name','الاسم الكامل'],
    ['Adresse e-mail','Email address','E-Mail-Adresse','البريد الإلكتروني'],
    ['Mode de paiement','Payment method','Zahlungsmethode','طريقة الدفع'],
    ['Carte de démonstration','Demo card','Demo-Karte','بطاقة تجريبية'],
    ['Continuer la simulation','Continue demo','Demo fortsetzen','متابعة التجربة'],
    ['À discuter','Negotiable','Verhandelbar','قابل للتفاوض'],
    ['Immobilier','Real estate','Immobilien','العقارات'],
    ['Véhicules','Vehicles','Fahrzeuge','المركبات'],
    ['Électronique','Electronics','Elektronik','الإلكترونيات'],
    ['Maison','Home','Wohnen','المنزل'],
    ['Mode','Fashion','Mode','الأزياء'],
    ['Emploi','Jobs','Jobs','الوظائف'],
    ['Formation','Education','Bildung','التكوين'],
    ['Services','Services','Dienstleistungen','الخدمات'],
    ['Découvrir','Discover','Entdecken','اكتشف'],
    ['Participer','Get involved','Mitmachen','شارك'],
    ['À propos','About','Über uns','حول المنصة'],
    ['Maison & déco','Home & decor','Wohnen & Deko','المنزل والديكور'],
    ['Mise en avant · démo','Featured · demo','Hervorgehoben · Demo','مميز · تجريبي'],
    ['Nous contacter','Contact us','Kontaktiere uns','اتصل بنا'],
    ['Conseils de sécurité','Safety tips','Sicherheitstipps','نصائح الأمان'],
    ['Questions fréquentes','Frequently asked questions','Häufige Fragen','الأسئلة الشائعة'],
    ['Une idée ? Parlons-en','Have an idea? Let’s talk','Eine Idee? Sprich mit uns','لديك فكرة؟ تحدث معنا']
  ];
  const originals = new WeakMap();
  const phraseMaps = Object.fromEntries(['en', 'de', 'ar'].map((locale, index) => [locale, new Map(pagePhrases.map(row => [row[0], row[index + 1]]))]));
  const storage = window.localStorage;
  let language = storage.getItem('mawjoud-language') || 'fr';
  let theme = storage.getItem('mawjoud-theme') || 'light';
  if (!translations[language]) language = 'fr';
  if (!['light', 'dark'].includes(theme)) theme = 'light';
  const t = key => translations[language][key];

  function translatePageContent(root = document.querySelector('main')) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const source = originals.get(node) ?? node.nodeValue;
      if (!originals.has(node)) originals.set(node, source);
      const trimmed = source.trim();
      const translated = phraseMaps[language]?.get(trimmed) || (language === 'fr' ? trimmed : null);
      if (translated !== null && translated !== undefined) node.nodeValue = source.replace(trimmed, translated);
    }
    root.querySelectorAll('[placeholder], [aria-label], [title]').forEach(element => {
      for (const attribute of ['placeholder', 'aria-label', 'title']) {
        if (!element.hasAttribute(attribute)) continue;
        let originalValues = originals.get(element);
        if (!originalValues) {
          originalValues = {};
          originals.set(element, originalValues);
        }
        originalValues[attribute] ??= element.getAttribute(attribute);
        const source = originalValues[attribute];
        const translated = phraseMaps[language]?.get(source) || (language === 'fr' ? source : null);
        if (translated !== null && translated !== undefined) element.setAttribute(attribute, translated);
      }
    });
  }

  function applyTheme(value) {
    theme = value;
    document.documentElement.dataset.theme = theme;
    storage.setItem('mawjoud-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#101820' : '#f4f8fc';
    const icon = document.querySelector('[data-theme-toggle] i');
    if (icon && window.lucide) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      window.lucide.createIcons();
    }
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.classList.toggle('is-selected', button.dataset.themeChoice === theme));
  }

  function applyLanguage(value) {
    if (!translations[value]) return;
    language = value;
    storage.setItem('mawjoud-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    translatePageContent();
    const header = document.querySelector('#site-header');
    if (header) {
      const nav = header.querySelector('.site-nav');
      if (nav) nav.setAttribute('aria-label', t('nav'));
      header.querySelector('.skip-link')?.replaceChildren(document.createTextNode(t('skip')));
      header.querySelectorAll('.nav-links a').forEach((link, index) => link.textContent = [t('home'), t('listings'), t('contact')][index] || link.textContent);
      const menuButton = header.querySelector('.mobile-toggle');
      if (menuButton) menuButton.setAttribute('aria-label', menuButton.getAttribute('aria-expanded') === 'true' ? t('close') : t('open'));
      const post = header.querySelector('.nav-actions .button-soft');
      if (post) post.lastChild.textContent = ` ${t('post')}`;
      const select = header.querySelector('[data-language]');
      if (select) {
        select.value = language;
        select.setAttribute('aria-label', t('language'));
        select.previousElementSibling.textContent = t('language');
      }
      const themeButton = header.querySelector('[data-theme-toggle]');
      if (themeButton) {
        themeButton.title = t('theme');
        themeButton.setAttribute('aria-label', `${t('theme')}: ${t(theme === 'dark' ? 'dark' : 'light')}`);
      }
    }
    const footer = document.querySelector('#site-footer');
    if (footer) {
      translatePageContent(footer);
      const headings = footer.querySelectorAll('.footer-column strong');
      [t('discover'), t('participate'), t('about')].forEach((label, index) => { if (headings[index]) headings[index].textContent = label; });
      const tagline = footer.querySelector('.footer-brand p');
      if (tagline) tagline.textContent = t('footer');
      const bottom = footer.querySelector('.footer-bottom span:last-child');
      if (bottom) bottom.firstChild.textContent = t('made') + ' ';
    }
    document.querySelectorAll('[data-language], [data-welcome-language]').forEach(select => select.value = language);
    const dialog = document.querySelector('.welcome-dialog');
    if (dialog) {
      dialog.querySelector('[data-welcome-title]').textContent = t('welcome');
      dialog.querySelector('[data-welcome-copy]').textContent = t('intro');
      dialog.querySelector('[data-welcome-start]').textContent = t('start');
      dialog.querySelector('[data-language-label]').textContent = t('language');
      dialog.querySelector('[data-theme-label]').textContent = t('theme');
      dialog.querySelector('[data-theme-choice="light"] span').textContent = t('light');
      dialog.querySelector('[data-theme-choice="dark"] span').textContent = t('dark');
      dialog.querySelector('.welcome-close').setAttribute('aria-label', t('dismiss'));
    }
  }

  const headerActions = document.querySelector('.nav-actions');
  if (headerActions) {
    const languageControl = document.createElement('label');
    languageControl.className = 'language-control';
    languageControl.innerHTML = `<span class="sr-only">${t('language')}</span><select data-language aria-label="${t('language')}">${Object.entries(names).map(([code, name]) => `<option value="${code}">${name}</option>`).join('')}</select>`;
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.type = 'button';
    themeButton.dataset.themeToggle = '';
    themeButton.title = t('theme');
    themeButton.setAttribute('aria-label', t('theme'));
    themeButton.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
    headerActions.prepend(themeButton);
    headerActions.prepend(languageControl);
    languageControl.querySelector('select').addEventListener('change', event => applyLanguage(event.target.value));
    themeButton.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'welcome-backdrop';
  backdrop.hidden = storage.getItem('mawjoud-welcome-seen') === 'true';
  backdrop.innerHTML = `<section class="welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><button class="welcome-close" type="button" aria-label="${language === 'ar' ? 'إغلاق' : language === 'de' ? 'Schließen' : language === 'en' ? 'Close' : 'Fermer'}" data-welcome-close><i data-lucide="x"></i></button><div class="welcome-brand"><span class="brand-mark"><i data-lucide="store"></i></span><span>Mawjoud<span>.</span></span></div><span class="welcome-kicker">MAWJOUD MARKET</span><h2 id="welcome-title" data-welcome-title>${t('welcome')}</h2><p data-welcome-copy>${t('intro')}</p><label class="welcome-label"><span data-language-label>${t('language')}</span><select data-welcome-language>${Object.entries(names).map(([code, name]) => `<option value="${code}"${code === language ? ' selected' : ''}>${name}</option>`).join('')}</select></label><div class="welcome-label"><span data-theme-label>${t('theme')}</span><div class="theme-choices"><button type="button" data-theme-choice="light"><i data-lucide="sun"></i><span>${t('light')}</span></button><button type="button" data-theme-choice="dark"><i data-lucide="moon"></i><span>${t('dark')}</span></button></div></div><button class="button button-primary welcome-start" type="button" data-welcome-close data-welcome-start>${t('start')} <i data-lucide="arrow-right"></i></button></section>`;
  document.body.append(backdrop);
  const closeWelcome = () => {
    backdrop.hidden = true;
    document.body.classList.remove('welcome-open');
    storage.setItem('mawjoud-welcome-seen', 'true');
  };
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop || event.target.closest('[data-welcome-close]')) closeWelcome();
  });
  backdrop.querySelector('[data-welcome-language]').addEventListener('change', event => applyLanguage(event.target.value));
  backdrop.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !backdrop.hidden) closeWelcome(); });
  if (!backdrop.hidden) document.body.classList.add('welcome-open');
  applyTheme(theme);
  applyLanguage(language);
  const contentObserver = new MutationObserver(records => {
    if (records.some(record => record.addedNodes.length)) translatePageContent();
  });
  const mainContent = document.querySelector('main');
  if (mainContent) contentObserver.observe(mainContent, {childList:true, subtree:true});
  if (window.lucide) window.lucide.createIcons();
})();
