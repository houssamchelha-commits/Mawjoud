(() => {
  const photos = {
    home: 'photo-1600210492486-724fe5c67fb0',
    apartment: 'photo-1600607687939-ce8a6c25118c',
    villa: 'photo-1600585154340-be6161a56a0c',
    car: 'photo-1503376780353-7e6692767b70',
    scooter: 'photo-1558981806-ec527fa84c39',
    phone: 'photo-1511707171634-5f897ff02aa9',
    camera: 'photo-1516035069371-29a1b244cc32',
    chair: 'photo-1503602642458-232111445657',
    lamp: 'photo-1507473885765-e6ed057f782c',
    fashion: 'photo-1483985988355-763728e1935b',
    jacket: 'photo-1551028719-00167b16eac5',
    work: 'photo-1521737711867-e3b97375f902',
    books: 'photo-1513258496099-48168024aec0',
    plant: 'photo-1485955900006-10f4d324d411'
  };
  const image = (id, width = 760) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
  window.MAWJOUD_CATEGORIES = ['Immobilier', 'Véhicules', 'Électronique', 'Maison', 'Mode', 'Emploi', 'Formation', 'Services'];
  window.MAWJOUD_LISTINGS = [
    {id:'mm-01',title:'Appartement lumineux avec terrasse',category:'Immobilier',price:890000,city:'Tanger',date:'2026-10-16',image:image(photos.apartment),description:'Bel appartement traversant avec terrasse ensoleillée, deux chambres et vue dégagée. Quartier calme et proche des commodités.'},
    {id:'mm-02',title:'Citadine élégante, très bon état',category:'Véhicules',price:98500,city:'Casablanca',date:'2026-10-15',image:image(photos.car),description:'Véhicule bien entretenu, carnet à jour, consommation économique. Visible sur rendez-vous à Casablanca.'},
    {id:'mm-03',title:'Smartphone récent · 128 Go',category:'Électronique',price:4200,city:'Rabat',date:'2026-10-14',image:image(photos.phone),description:'Téléphone en très bon état, écran protégé depuis le premier jour. Vendu avec boîte et accessoires.'},
    {id:'mm-04',title:'Fauteuil design en bois clair',category:'Maison',price:1850,city:'Marrakech',date:'2026-10-13',image:image(photos.chair),description:'Fauteuil confortable au style scandinave, tissu écru et structure en bois massif. Quelques mois d’utilisation.'},
    {id:'mm-05',title:'Veste en cuir, coupe intemporelle',category:'Mode',price:780,city:'Tétouan',date:'2026-10-12',image:image(photos.jacket),description:'Veste en cuir souple, portée quelques fois seulement. Taille M, belle finition et fermeture en parfait état.'},
    {id:'mm-06',title:'Studio meublé près du centre',category:'Immobilier',price:3900,city:'Rabat',date:'2026-10-11',image:image(photos.home),description:'Studio meublé et bien agencé, lumineux, idéal pour étudiant ou jeune actif. Disponible immédiatement.'},
    {id:'mm-07',title:'Appareil photo pour vos escapades',category:'Électronique',price:5600,city:'Marrakech',date:'2026-10-10',image:image(photos.camera),description:'Appareil photo hybride en excellent état, objectif polyvalent inclus. Une belle occasion pour débuter la photo.'},
    {id:'mm-08',title:'Vélo urbain prêt à rouler',category:'Véhicules',price:2400,city:'Tanger',date:'2026-10-09',image:image(photos.scooter),description:'Vélo de ville robuste, freins récemment révisés, panier avant et éclairage inclus. Visible à Tanger.'},
    {id:'mm-09',title:'Lampe artisanale en céramique',category:'Maison',price:620,city:'Fès',date:'2026-10-08',image:image(photos.lamp),description:'Lampe de table façonnée à la main, abat-jour en lin naturel. Une pièce pleine de caractère pour votre intérieur.'},
    {id:'mm-10',title:'Collection de tenues de saison',category:'Mode',price:450,city:'Casablanca',date:'2026-10-07',image:image(photos.fashion),description:'Sélection de vêtements en excellent état, plusieurs tailles et styles. Prix à partir de 450 MAD.'},
    {id:'mm-11',title:'Opportunité : assistant(e) commercial(e)',category:'Emploi',price:0,city:'Casablanca',date:'2026-10-06',image:image(photos.work),description:'Équipe chaleureuse recherche un profil organisé et curieux. Première expérience appréciée, accompagnement prévu.'},
    {id:'mm-12',title:'Atelier créatif pour apprendre la photo',category:'Formation',price:350,city:'Tétouan',date:'2026-10-05',image:image(photos.books),description:'Atelier d’initiation en petit groupe : cadrage, lumière et pratique en extérieur. Matériel prêté.'},
    {id:'mm-13',title:'Joli cactus en pot artisanal',category:'Maison',price:180,city:'Agadir',date:'2026-10-04',image:image(photos.plant),description:'Cactus facile à vivre dans un pot en terre cuite fait main. Parfait pour apporter une touche de verdure.'},
    {id:'mm-14',title:'Appartement familial avec jardin',category:'Immobilier',price:1280000,city:'Marrakech',date:'2026-10-03',image:image(photos.villa),description:'Appartement spacieux et calme avec petit jardin privatif, trois chambres et place de parking.'}
  ];
})();
