// Serie A Teams Data
export const teams = [
  {
    id: 1,
    name: "AC Milan",
    shortName: "Milan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    founded: 1899,
    stadium: "San Siro",
    capacity: 80018,
    coach: "Stefano Pioli",
    website: "https://www.acmilan.com",
    colors: ["Red", "Black"],
    history: "AC Milan is one of the most successful clubs in Italy, having won 19 domestic league titles, 7 UEFA Champions League trophies, and many other honors. Founded in 1899, the club has been home to many legendary players including Paolo Maldini, Franco Baresi, and Kaká.",
    rivals: ["Inter", "Juventus"],
  },
  {
    id: 2,
    name: "Inter",
    shortName: "Inter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    founded: 1908,
    stadium: "San Siro",
    capacity: 80018,
    coach: "Simone Inzaghi",
    website: "https://www.inter.it",
    colors: ["Blue", "Black"],
    history: "Internazionale Milano, commonly referred to as Inter, was founded in 1908. The club has won 19 Serie A titles, 3 European Cups/Champions League trophies, and is the only Italian club to have never been relegated from the top flight of Italian football.",
    rivals: ["Milan", "Juventus"],
  },
  {
    id: 3,
    name: "Juventus",
    shortName: "Juventus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    founded: 1897,
    stadium: "Allianz Stadium",
    capacity: 41507,
    coach: "Massimiliano Allegri",
    website: "https://www.juventus.com",
    colors: ["Black", "White"],
    history: "Juventus is the most successful club in Italian football history, having won 36 official league titles, 14 Coppa Italia titles, and 9 Supercoppa Italiana titles. Founded in 1897, the club has also won 2 Champions League/European Cup trophies.",
    rivals: ["Inter", "Milan", "Torino"],
  },
  {
    id: 4,
    name: "Napoli",
    shortName: "Napoli",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg",
    founded: 1926,
    stadium: "Stadio Diego Armando Maradona",
    capacity: 54726,
    coach: "Luciano Spalletti",
    website: "https://www.sscnapoli.it",
    colors: ["Blue"],
    history: "SSC Napoli was founded in 1926 and rose to prominence in the 1980s when Diego Maradona led the club to two Serie A titles, one Coppa Italia, and one UEFA Cup. The club has experienced resurgence in recent years, becoming a consistent challenger for the Scudetto.",
    rivals: ["Roma", "Juventus"],
  },
  {
    id: 5,
    name: "Roma",
    shortName: "Roma",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    founded: 1927,
    stadium: "Stadio Olimpico",
    capacity: 72698,
    coach: "José Mourinho",
    website: "https://www.asroma.com",
    colors: ["Burgundy", "Orange", "Yellow"],
    history: "AS Roma was founded in 1927 following a merger of three clubs. The club has won Serie A three times, most recently in 2000-01, and has won the Coppa Italia nine times. Roma has a strong youth academy and passionate fan base.",
    rivals: ["Lazio", "Napoli"],
  },
  {
    id: 6,
    name: "Lazio",
    shortName: "Lazio",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
    founded: 1900,
    stadium: "Stadio Olimpico",
    capacity: 72698,
    coach: "Maurizio Sarri",
    website: "https://www.sslazio.it",
    colors: ["Sky Blue", "White"],
    history: "SS Lazio was founded in 1900 and is one of the oldest sports clubs in Italy. The club has won Serie A twice, most recently in 1999-2000, and has won seven Coppa Italia titles. Lazio shares the Stadio Olimpico with city rivals AS Roma.",
    rivals: ["Roma", "Napoli"],
  },
  {
    id: 7,
    name: "Atalanta",
    shortName: "Atalanta",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg",
    founded: 1907,
    stadium: "Gewiss Stadium",
    capacity: 21747,
    coach: "Gian Piero Gasperini",
    website: "https://www.atalanta.it",
    colors: ["Blue", "Black"],
    history: "Atalanta BC was founded in 1907 and has traditionally been a mid-table club in Serie A. In recent years, under the management of Gian Piero Gasperini, the club has achieved remarkable success, qualifying for the Champions League and becoming known for their attacking style of play.",
    rivals: ["Brescia"],
  },
  {
    id: 8,
    name: "Fiorentina",
    shortName: "Fiorentina",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/2022_ACF_Fiorentina_logo.svg",
    founded: 1926,
    stadium: "Stadio Artemio Franchi",
    capacity: 43147,
    coach: "Vincenzo Italiano",
    website: "https://www.acffiorentina.com",
    colors: ["Purple"],
    history: "ACF Fiorentina was founded in 1926 and has won Serie A twice, in 1955-56 and 1968-69. The club has a strong tradition and passionate fan base, with their distinctive purple kit being recognized throughout football.",
    rivals: ["Juventus"],
  },
  {
    id: 9,
    name: "Bologna",
    shortName: "Bologna",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5b/Bologna_F.C._1909_logo.svg",
    founded: 1909,
    stadium: "Stadio Renato Dall'Ara",
    capacity: 38279,
    coach: "Thiago Motta",
    website: "https://www.bolognafc.it",
    colors: ["Red", "Blue"],
    history: "Bologna FC was founded in 1909 and is one of the most successful Italian clubs, having won 7 Serie A titles, although their most recent was in 1963-64. The club has a rich history and tradition in Italian football.",
    rivals: ["Parma", "Fiorentina"],
  },
  {
    id: 10,
    name: "Torino",
    shortName: "Torino",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg",
    founded: 1906,
    stadium: "Stadio Olimpico Grande Torino",
    capacity: 28177,
    coach: "Ivan Jurić",
    website: "https://www.torinofc.it",
    colors: ["Maroon"],
    history: "Torino FC was founded in 1906 and is one of Italy's most historic clubs. The club's greatest period came in the 1940s with the legendary Grande Torino team, which tragically perished in the Superga air disaster of 1949. Torino has won Serie A 7 times.",
    rivals: ["Juventus"],
  },
  {
    id: 11,
    name: "Udinese",
    shortName: "Udinese",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg",
    founded: 1896,
    stadium: "Bluenergy Stadium",
    capacity: 25144,
    coach: "Andrea Sottil",
    website: "https://www.udinese.it",
    colors: ["Black", "White"],
    history: "Udinese Calcio is one of Italy's oldest clubs, founded in 1896. The club has never won the Serie A title but has been a consistent top-flight team, known for their excellent scouting network and player development, particularly from South America.",
    rivals: ["Hellas Verona", "Triestina"],
  },
  {
    id: 12,
    name: "Monza",
    shortName: "Monza",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_of_A.C._Monza.svg",
    founded: 1912,
    stadium: "Stadio Brianteo",
    capacity: 18568,
    coach: "Raffaele Palladino",
    website: "https://www.acmonza.com",
    colors: ["Red", "White"],
    history: "AC Monza was founded in 1912 and spent most of its history in the lower divisions of Italian football. The club was acquired by former AC Milan president Silvio Berlusconi in 2018, and subsequently achieved its first-ever promotion to Serie A in 2022.",
    rivals: ["Como", "Milan"],
  },
  {
    id: 13,
    name: "Genoa",
    shortName: "Genoa",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/46/Genoa_C.F.C._logo.svg",
    founded: 1893,
    stadium: "Stadio Luigi Ferraris",
    capacity: 36599,
    coach: "Alberto Gilardino",
    website: "https://www.genoacfc.it",
    colors: ["Red", "Blue"],
    history: "Genoa Cricket and Football Club is Italy's oldest football club, founded in 1893. They have won 9 Serie A titles, although the most recent was in 1923-24. Despite their historical importance, they have spent much of the modern era alternating between Serie A and Serie B.",
    rivals: ["Sampdoria"],
  },
  {
    id: 14,
    name: "Lecce",
    shortName: "Lecce",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/U.S._Lecce_logo.svg",
    founded: 1908,
    stadium: "Stadio Via del Mare",
    capacity: 31533,
    coach: "Luca Gotti",
    website: "https://www.uslecce.it",
    colors: ["Red", "Yellow"],
    history: "US Lecce was founded in 1908 and represents the city of Lecce in southern Italy. The club has traditionally bounced between Serie A and the lower divisions, but has developed a reputation for discovering talented players and playing attractive football.",
    rivals: ["Bari", "Taranto"],
  },
  {
    id: 15,
    name: "Cagliari",
    shortName: "Cagliari",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/ea/Cagliari_Calcio_logo.svg",
    founded: 1920,
    stadium: "Unipol Domus",
    capacity: 16416,
    coach: "Claudio Ranieri",
    website: "https://www.cagliaricalcio.com",
    colors: ["Red", "Blue"],
    history: "Cagliari Calcio was founded in 1920 and represents Sardinia in Serie A. The club's golden era came in 1969-70 when, led by striker Gigi Riva, they won their only Serie A title. The club has fluctuated between Serie A and Serie B in recent decades.",
    rivals: ["Sassari Torres"],
  },
  {
    id: 16,
    name: "Empoli",
    shortName: "Empoli",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a4/Empoli_F.C._logo.svg",
    founded: 1920,
    stadium: "Stadio Carlo Castellani",
    capacity: 16800,
    coach: "Paolo Zanetti",
    website: "https://www.empolifc.com",
    colors: ["Blue"],
    history: "Empoli FC was founded in 1920 and is known for its strong youth academy and ability to develop players. The club has never won major honors but has established itself as a respectable Serie A club, often punching above its weight despite being from a small town in Tuscany.",
    rivals: ["Fiorentina", "Pisa"],
  },
  {
    id: 17,
    name: "Hellas Verona",
    shortName: "Verona",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/92/Hellas_Verona_FC_logo.svg",
    founded: 1903,
    stadium: "Stadio Marcantonio Bentegodi",
    capacity: 39211,
    coach: "Marco Baroni",
    website: "https://www.hellasverona.it",
    colors: ["Yellow", "Blue"],
    history: "Hellas Verona FC was founded in 1903 and achieved its greatest success in 1984-85 when it won its only Serie A title. The club has a passionate fan base and maintains a rivalry with Chievo Verona, another club from the same city.",
    rivals: ["Chievo", "Vicenza"],
  },
  {
    id: 18,
    name: "Salernitana",
    shortName: "Salernitana",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/79/U.S._Salernitana_1919_logo.svg",
    founded: 1919,
    stadium: "Stadio Arechi",
    capacity: 37180,
    coach: "Davide Nicola",
    website: "https://www.ussalernitana1919.it",
    colors: ["Maroon", "Light Blue"],
    history: "US Salernitana 1919 represents the city of Salerno and has spent most of its history in the lower divisions of Italian football. The club achieved promotion to Serie A in 2021, returning to the top flight after a 23-year absence.",
    rivals: ["Napoli", "Avellino"],
  },
  {
    id: 19,
    name: "Venezia",
    shortName: "Venezia",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a0/Venezia_FC_logo.svg",
    founded: 1907,
    stadium: "Stadio Pier Luigi Penzo",
    capacity: 11150,
    coach: "Paolo Vanoli",
    website: "https://www.veneziafc.it",
    colors: ["Orange", "Black", "Green"],
    history: "Venezia FC represents the historic city of Venice and has experienced a recent resurgence after years in the lower divisions. The club has gained international attention for its stylish kits and unique stadium, which is accessible by boat.",
    rivals: ["Padova", "Verona"],
  },
  {
    id: 20,
    name: "Como",
    shortName: "Como",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3c/Como_1907_logo.svg",
    founded: 1907,
    stadium: "Stadio Giuseppe Sinigaglia",
    capacity: 8320,
    coach: "Cesc Fàbregas",
    website: "https://www.comofootball.com",
    colors: ["Blue", "White"],
    history: "Como 1907 represents the picturesque city of Como in northern Italy. After being declared bankrupt in 2016, the club has been rebuilt and recently returned to Serie A after a notable investment that brought in former World Cup winner Cesc Fàbregas as player and later coach.",
    rivals: ["Varese", "Lecco"],
  },
];

// League Table Data
export const leagueTable = [
  {
    position: 1,
    team: "Inter",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    played: 25,
    won: 20,
    drawn: 3,
    lost: 2,
    goalDifference: 42,
    points: 63
  },
  {
    position: 2,
    team: "Juventus",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    played: 25,
    won: 16,
    drawn: 6,
    lost: 3,
    goalDifference: 23,
    points: 54
  },
  {
    position: 3,
    team: "Milan",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    played: 25,
    won: 16,
    drawn: 3,
    lost: 6,
    goalDifference: 19,
    points: 51
  },
  {
    position: 4,
    team: "Atalanta",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg",
    played: 24,
    won: 15,
    drawn: 3,
    lost: 6,
    goalDifference: 21,
    points: 48
  },
  {
    position: 5,
    team: "Bologna",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/5/5b/Bologna_F.C._1909_logo.svg",
    played: 25,
    won: 12,
    drawn: 9,
    lost: 4,
    goalDifference: 12,
    points: 45
  },
  {
    position: 6,
    team: "Roma",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    played: 25,
    won: 12,
    drawn: 6,
    lost: 7,
    goalDifference: 12,
    points: 42
  },
  {
    position: 7,
    team: "Lazio",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
    played: 25,
    won: 12,
    drawn: 4,
    lost: 9,
    goalDifference: 6,
    points: 40
  },
  {
    position: 8,
    team: "Fiorentina",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/2022_ACF_Fiorentina_logo.svg",
    played: 25,
    won: 11,
    drawn: 5,
    lost: 9,
    goalDifference: 8,
    points: 38
  }
];

// Top Scorers Data
export const topScorers = [
  {
    position: 1,
    player: "Lautaro Martinez",
    team: "Inter",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    goals: 22,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    position: 2,
    player: "Dusan Vlahovic",
    team: "Juventus",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    goals: 16,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    position: 3,
    player: "Victor Osimhen",
    team: "Napoli",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg",
    goals: 14,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    position: 4,
    player: "Olivier Giroud",
    team: "Milan",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    goals: 13,
    image: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    position: 5,
    player: "Paulo Dybala",
    team: "Roma",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    goals: 12,
    image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
  }
];

// Live Matches Data
export const liveMatches = [
  {
    id: 1,
    homeTeam: "Milan",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    homeTeamScore: 2,
    awayTeam: "Inter",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    awayTeamScore: 1,
    minute: 67,
    status: "LIVE"
  },
  {
    id: 2,
    homeTeam: "Juventus",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    homeTeamScore: 0,
    awayTeam: "Roma",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    awayTeamScore: 0,
    minute: 34,
    status: "LIVE"
  },
  {
    id: 3,
    homeTeam: "Napoli",
    homeTeamLogo: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg",
    homeTeamScore: 3,
    awayTeam: "Lazio",
    awayTeamLogo: "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
    awayTeamScore: 1,
    minute: 90,
    status: "FT"
  }
];

// Latest News Data
export const latestNews = [
  {
    id: 1,
    title: "Roma Stuns Juventus with Last-Minute Winner in Thrilling Comeback",
    excerpt: "A dramatic night at the Stadio Olimpico saw Roma overturn a two-goal deficit to claim victory against title-chasing Juventus.",
    date: "February 16, 2024",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "MATCH REPORT",
    categoryColor: "bg-serie-blue"
  },
  {
    id: 2,
    title: "Napoli Coach Opens Up About Title Hopes: \"We're Still in the Race\"",
    excerpt: "After three consecutive victories, Napoli's manager believes his team can still challenge for the Scudetto despite a difficult start to the season.",
    date: "February 15, 2024",
    image: "https://images.unsplash.com/photo-1624880357913-a6de2f010f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "INTERVIEW",
    categoryColor: "bg-serie-red"
  },
  {
    id: 3,
    title: "Milan Close to Signing French Wonderkid in Summer Transfer Coup",
    excerpt: "The Rossoneri are reportedly finalizing terms with the 19-year-old midfielder who has impressed in Ligue 1 this season.",
    date: "February 14, 2024",
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "TRANSFER NEWS",
    categoryColor: "bg-serie-green"
  },
  {
    id: 4,
    title: "Inter's Defensive Wall: The Secret Behind Their Title Push",
    excerpt: "With just 15 goals conceded in 25 matches, Inter's defense has been the foundation of their impressive campaign.",
    date: "February 13, 2024",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "ANALYSIS",
    categoryColor: "bg-serie-blue"
  },
  {
    id: 5,
    title: "Serie A to Implement New VAR Protocol Next Season",
    excerpt: "The league has announced changes to the Video Assistant Referee system following consultations with clubs and officials.",
    date: "February 12, 2024",
    image: "https://images.unsplash.com/photo-1575211436639-96c6fca2eb1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "LEAGUE NEWS",
    categoryColor: "bg-serie-navy"
  },
  {
    id: 6,
    title: "Rising Star: The Teenager Taking Serie A by Storm",
    excerpt: "At just 18 years old, Bologna's midfielder has become one of the most exciting prospects in Italian football.",
    date: "February 11, 2024",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
    category: "PLAYER PROFILE",
    categoryColor: "bg-serie-light-blue"
  }
];

// Featured Products Data
export const featuredProducts = [
  {
    id: 1,
    name: "Inter Home Jersey 2023/24",
    team: "Inter",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1571736444983-5b7a4a01730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
    badge: "NEW",
    badgeColor: "bg-serie-red"
  },
  {
    id: 2,
    name: "AC Milan Premium Scarf",
    team: "Milan",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: 3,
    name: "Juventus Sports Backpack",
    team: "Juventus",
    teamLogo: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
    badge: "SALE",
    badgeColor: "bg-serie-green"
  },
  {
    id: 4,
    name: "AS Roma Retro Jersey 2001/02",
    team: "Roma",
    teamLogo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1587290413476-b7e966729c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
    badge: "LIMITED",
    badgeColor: "bg-serie-blue"
  }
];

// Media Highlights Data
export const mediaHighlights = [
  {
    id: 1,
    title: "Rafael Leão's Stunning Volley in Milan Derby",
    description: "A moment of pure brilliance from Milan's Portuguese star secured victory in the Derby della Madonnina.",
    views: "4.2M",
    thumbnail: "https://images.unsplash.com/photo-1540866225557-9e4a10a19a9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "GOAL OF THE WEEK",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Top 5 Goalkeeper Saves - Matchday 25",
    description: "Spectacular diving stops and lightning-fast reflexes from Serie A's best shot-stoppers this weekend.",
    views: "2.8M",
    thumbnail: "https://images.unsplash.com/photo-1624526267942-70d7a98aa0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "TOP SAVES",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Skill of the Week: Kvaratskhelia's Magic Dribble",
    description: "Napoli's Georgian winger left defenders in his wake with this incredible piece of skill.",
    views: "3.5M",
    thumbnail: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "SKILLS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

// Quiz Questions Data
export const quizQuestions = [
  {
    id: 1,
    question: "Which player holds the record for most goals in a single Serie A season?",
    options: [
      "Cristiano Ronaldo",
      "Gonzalo Higuaín",
      "Ciro Immobile",
      "Gunnar Nordahl"
    ],
    correctAnswer: "Gonzalo Higuaín",
    explanation: "Gonzalo Higuaín scored 36 goals for Napoli in the 2015-16 season, setting the record for most goals in a single Serie A season."
  },
  {
    id: 2,
    question: "Which team has won the most Serie A titles?",
    options: [
      "AC Milan",
      "Inter",
      "Juventus",
      "Roma"
    ],
    correctAnswer: "Juventus",
    explanation: "Juventus has won 36 Serie A titles, making them the most successful club in Italian league history."
  },
  {
    id: 3,
    question: "Which of these players has never played for both Inter and Milan?",
    options: [
      "Zlatan Ibrahimović",
      "Andrea Pirlo",
      "Alessandro Nesta",
      "Ronaldo"
    ],
    correctAnswer: "Alessandro Nesta",
    explanation: "Alessandro Nesta played for Lazio and AC Milan but never for Inter."
  }
];
