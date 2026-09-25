// English copy is the lookup key; each entry must include both translations.
export const translations: Record<string, { fr: string; es: string }> = {
  "Born in": {
    "fr": "Né en",
    "es": "Nacido en"
  },
  "France, Spanish roots": {
    "fr": "France, racines espagnoles",
    "es": "Francia, raíces españolas"
  },
  "Speaks": {
    "fr": "Langues",
    "es": "Idiomas"
  },
  "French, English, Spanish": {
    "fr": "Français, anglais, espagnol",
    "es": "Francés, inglés, español"
  },
  "Trained in": {
    "fr": "Formation",
    "es": "Formación"
  },
  "Systems & networks": {
    "fr": "Systèmes et réseaux",
    "es": "Sistemas y redes"
  },
  "Scan orchestration": {
    "fr": "Orchestration des scans",
    "es": "Orquestación de análisis"
  },
  "Audits are split into background tasks with Huey and Redis. Each task tracks its dependencies, progress, and timeout, so one failing tool does not stop the whole audit.": {
    "fr": "Les audits sont répartis en tâches de fond avec Huey et Redis. Chaque tâche suit ses dépendances, son avancement et son délai maximal, pour qu’un outil en échec ne bloque pas tout l’audit.",
    "es": "Los análisis se dividen en tareas en segundo plano con Huey y Redis. Cada tarea controla sus dependencias, su progreso y su tiempo límite, para que el fallo de una herramienta no detenga toda la auditoría."
  },
  "Tool integration": {
    "fr": "Intégration d’outils",
    "es": "Integración de herramientas"
  },
  "I integrate external security tools and normalize their JSON, XML, plain-text, and proprietary outputs into one consistent findings format.": {
    "fr": "J’intègre des outils de sécurité externes et je normalise leurs sorties JSON, XML, texte et propriétaires dans un format de résultats commun.",
    "es": "Integro herramientas de seguridad externas y normalizo sus resultados en JSON, XML, texto y formatos propietarios en un formato común de hallazgos."
  },
  "Client API": {
    "fr": "API client",
    "es": "API para clientes"
  },
  "Secure APIs built with Django Ninja give clients direct access to their audits, results, and reports.": {
    "fr": "Des API sécurisées, développées avec Django Ninja, donnent aux clients un accès direct à leurs audits, résultats et rapports.",
    "es": "Las API seguras desarrolladas con Django Ninja dan a los clientes acceso directo a sus auditorías, resultados e informes."
  },
  "Automated reports": {
    "fr": "Rapports automatisés",
    "es": "Informes automatizados"
  },
  "PDF, DOCX, and XLSX deliverables are generated automatically, with LLM-assisted summaries, instead of being assembled by hand.": {
    "fr": "Les livrables PDF, DOCX et XLSX sont générés automatiquement, avec des synthèses assistées par un LLM, plutôt qu’assemblés à la main.",
    "es": "Los documentos PDF, DOCX y XLSX se generan automáticamente, con resúmenes asistidos por un LLM, en lugar de prepararse a mano."
  },
  "Modular architecture": {
    "fr": "Architecture modulaire",
    "es": "Arquitectura modular"
  },
  "A modular Django and Python codebase that I designed and have kept evolving since 2023.": {
    "fr": "Une base de code modulaire en Django et Python que j’ai conçue et que je fais évoluer depuis 2023.",
    "es": "Una base de código modular en Django y Python que diseñé y que sigo desarrollando desde 2023."
  },
  "Deployment & operations": {
    "fr": "Déploiement et exploitation",
    "es": "Despliegue y operaciones"
  },
  "I deploy and run the platform on Linux with Docker Compose, Gunicorn, and MariaDB/MySQL, and keep its services healthy in production.": {
    "fr": "Je déploie et j’exploite la plateforme sous Linux avec Docker Compose, Gunicorn et MariaDB/MySQL, et je veille au bon fonctionnement des services en production.",
    "es": "Despliego y mantengo la plataforma en Linux con Docker Compose, Gunicorn y MariaDB/MySQL, y me encargo del buen funcionamiento de sus servicios en producción."
  },
  "Active Directory, Group Policy, DNS and DHCP, file servers and access rights, remote access, WSUS updates, and application services.": {
    "fr": "Active Directory, stratégies de groupe, DNS et DHCP, serveurs de fichiers et droits d’accès, accès distant, mises à jour WSUS et services applicatifs.",
    "es": "Active Directory, directivas de grupo, DNS y DHCP, servidores de archivos y permisos de acceso, acceso remoto, actualizaciones WSUS y servicios de aplicaciones."
  },
  "Level-3 support": {
    "fr": "Support de niveau 3",
    "es": "Soporte de nivel 3"
  },
  "Diagnosing and fixing escalated incidents on workstations and servers, user accounts and access, Microsoft 365 and Exchange, and business apps.": {
    "fr": "Diagnostic et résolution d’incidents escaladés sur les postes et serveurs, les comptes et accès, Microsoft 365 et Exchange, ainsi que les applications métier.",
    "es": "Diagnóstico y resolución de incidencias escaladas en equipos y servidores, cuentas y accesos, Microsoft 365 y Exchange, y aplicaciones empresariales."
  },
  "Backups and restores, instance maintenance, planned updates and restarts, then checking that the applications behind them still worked.": {
    "fr": "Sauvegardes et restaurations, maintenance des instances, mises à jour et redémarrages planifiés, puis vérification du bon fonctionnement des applications associées.",
    "es": "Copias de seguridad y restauraciones, mantenimiento de instancias, actualizaciones y reinicios planificados, y comprobación posterior de que las aplicaciones seguían funcionando."
  },
  "Home": {
    "fr": "Accueil",
    "es": "Inicio"
  },
  "About": {
    "fr": "À propos",
    "es": "Sobre mí"
  },
  "Experience": {
    "fr": "Parcours",
    "es": "Experiencia"
  },
  "Apps": {
    "fr": "Projets",
    "es": "Proyectos"
  },
  "Contact": {
    "fr": "Contact",
    "es": "Contacto"
  },
  "Interactive game": {
    "fr": "Jeu interactif",
    "es": "Juego interactivo"
  },
  "A browser game that teaches programming through a busy robot café.": {
    "fr": "Un jeu sur navigateur pour apprendre à programmer dans un café animé par des robots.",
    "es": "Un juego de navegador para aprender a programar en una concurrida cafetería de robots."
  },
  "Over 32 shifts, you program three café robots with instruction blocks such as IF, loops, and functions, then run the service and watch every order play out. Each solution is checked against several scenarios, so it has to work every time, not just once.": {
    "fr": "Au fil de 32 services, vous programmez trois robots avec des blocs d’instructions : conditions IF, boucles et fonctions. Lancez ensuite le service et observez chaque commande. Chaque solution est testée dans plusieurs scénarios : elle doit fonctionner à tous les coups, pas une seule fois.",
    "es": "A lo largo de 32 turnos, programas tres robots con bloques de instrucciones como condiciones IF, bucles y funciones. Después, pones en marcha el servicio y ves cómo se prepara cada pedido. Cada solución se comprueba en varios escenarios: tiene que funcionar siempre, no solo una vez."
  },
  "Explore repository": {
    "fr": "Voir le dépôt",
    "es": "Ver repositorio"
  },
  "Realtime platform": {
    "fr": "Plateforme temps réel",
    "es": "Plataforma en tiempo real"
  },
  "Board games with friends, each person playing from their own phone.": {
    "fr": "Des jeux de société entre amis, chacun depuis son téléphone.",
    "es": "Juegos de mesa con amigos, cada uno desde su propio teléfono."
  },
  "A host opens a private room and friends join from their phones. The first game is Werewolf: a narrator guides the game through its phases in real time, while the server enforces the rules and gives each player a private view, so nobody sees a role they shouldn't.": {
    "fr": "Un hôte ouvre un salon privé et ses amis le rejoignent depuis leur téléphone. Le premier jeu est le Loup-Garou : un narrateur anime les différentes phases en temps réel, tandis que le serveur applique les règles et fournit une vue privée à chaque joueur, sans révéler les rôles secrets.",
    "es": "Un anfitrión abre una sala privada y sus amigos se unen desde sus teléfonos. El primer juego es el Hombre Lobo: un narrador guía las fases en tiempo real, mientras el servidor aplica las reglas y muestra una vista privada a cada jugador, sin revelar los roles secretos."
  },
  "Ask for a walkthrough": {
    "fr": "Demander une démo",
    "es": "Solicitar una demo"
  },
  "Windows utility": {
    "fr": "Utilitaire Windows",
    "es": "Utilidad para Windows"
  },
  "A Zoom camera that switches between your webcam and your presentation on its own.": {
    "fr": "Une caméra Zoom qui bascule automatiquement entre votre webcam et votre présentation.",
    "es": "Una cámara para Zoom que alterna automáticamente entre tu webcam y tu presentación."
  },
  "StageSwap watches the screen used for presentations and compares it with a reference picture. When media starts, Zoom receives the screen; when it stops, the webcam comes back with a smooth transition. It runs entirely on the Windows computer.": {
    "fr": "StageSwap surveille l’écran de présentation et le compare à une image de référence. Quand un média démarre, Zoom reçoit l’écran ; quand il s’arrête, la webcam revient avec une transition fluide. Tout fonctionne localement sur l’ordinateur Windows.",
    "es": "StageSwap observa la pantalla de presentación y la compara con una imagen de referencia. Cuando empieza un contenido multimedia, Zoom recibe la pantalla; cuando termina, vuelve la webcam con una transición suave. Todo se ejecuta en el ordenador Windows."
  },
  "Download app": {
    "fr": "Télécharger l’app",
    "es": "Descargar app"
  },
  "Source code": {
    "fr": "Code source",
    "es": "Código fuente"
  },
  "SaaS product": {
    "fr": "Produit SaaS",
    "es": "Producto SaaS"
  },
  "A dashboard that helps businesses understand and manage their online reviews.": {
    "fr": "Un tableau de bord pour aider les entreprises à comprendre et gérer leurs avis en ligne.",
    "es": "Un panel que ayuda a las empresas a entender y gestionar sus reseñas en línea."
  },
  "Teams connect their Google Business Profile locations, collect customer feedback through QR codes, and follow reviews and trends for each site from one place.": {
    "fr": "Les équipes connectent leurs établissements Google Business Profile, recueillent les retours clients via des QR codes et suivent les avis et tendances de chaque site depuis un seul endroit.",
    "es": "Los equipos conectan sus establecimientos de Google Business Profile, recogen opiniones mediante códigos QR y siguen las reseñas y tendencias de cada ubicación desde un solo lugar."
  },
  "macOS app": {
    "fr": "App macOS",
    "es": "App para macOS"
  },
  "Private voice dictation for the Mac: hold a key, speak, and your words appear at the cursor.": {
    "fr": "Une dictée vocale privée sur Mac : maintenez une touche, parlez, et vos mots apparaissent au curseur.",
    "es": "Dictado de voz privado para Mac: mantén pulsada una tecla, habla y tus palabras aparecen en el cursor."
  },
  "Speech recognition runs on the Mac with whisper.cpp and MLX, then a small local model cleans up punctuation, formatting, and obvious recognition errors. No audio or text ever leaves the machine.": {
    "fr": "La reconnaissance vocale s’exécute sur le Mac avec whisper.cpp et MLX. Un petit modèle local corrige ensuite la ponctuation, la mise en forme et les erreurs de reconnaissance évidentes. Aucun audio ni texte ne quitte la machine.",
    "es": "El reconocimiento de voz se ejecuta en el Mac con whisper.cpp y MLX. Después, un pequeño modelo local corrige la puntuación, el formato y los errores de reconocimiento evidentes. Ningún audio ni texto sale del equipo."
  },
  "Technologies": {
    "fr": "Technologies",
    "es": "Tecnologías"
  },
  "Skip to content": {
    "fr": "Aller au contenu",
    "es": "Saltar al contenido"
  },
  "Section navigation": {
    "fr": "Navigation par section",
    "es": "Navegación por secciones"
  },
  "Scroll to About me": {
    "fr": "Aller à la section À propos",
    "es": "Ir a la sección Sobre mí"
  },
  "SCROLL": {
    "fr": "DÉFILER",
    "es": "BAJAR"
  },
  "Software Engineer": {
    "fr": "Ingénieur logiciel",
    "es": "Ingeniero de software"
  },
  "01 / ABOUT ME": {
    "fr": "01 / À PROPOS",
    "es": "01 / SOBRE MÍ"
  },
  "I build what I need.": {
    "fr": "Je crée ce qu’il me faut.",
    "es": "Creo lo que necesito."
  },
  "Then I make it better.": {
    "fr": "Puis je l’améliore.",
    "es": "Después lo mejoro."
  },
  "I started coding at 12, making small websites for problems I ran into. When video converters failed or hid larger files behind a paywall, I made my own.": {
    "fr": "J’ai commencé à coder à 12 ans, en créant de petits sites pour résoudre les problèmes que je rencontrais. Quand les convertisseurs vidéo ne fonctionnaient pas ou rendaient les gros fichiers payants, j’ai créé le mien.",
    "es": "Empecé a programar a los 12 años, creando pequeñas webs para resolver problemas que encontraba. Cuando los conversores de vídeo fallaban o exigían pagar por archivos grandes, creé el mío."
  },
  "That habit led me to systems and support at SCC France, then to backend engineering at Cyberesist. Along the way I learned to be patient with problems: find the real cause, try another route when the first fix fails, and check that the result actually helps someone.": {
    "fr": "Cette habitude m’a mené aux systèmes et au support chez SCC France, puis au développement backend chez Cyberesist. J’ai appris à être patient face aux problèmes : trouver la vraie cause, essayer une autre voie si la première échoue, et vérifier que le résultat aide vraiment quelqu’un.",
    "es": "Esa costumbre me llevó a sistemas y soporte en SCC France, y después al desarrollo backend en Cyberesist. Por el camino aprendí a tener paciencia con los problemas: encontrar la causa real, probar otra vía si la primera falla y comprobar que el resultado ayuda a alguien."
  },
  "I still build things in my own time. Once something works, I start wondering how to make it simpler, faster, or nicer to use.": {
    "fr": "Je continue à créer sur mon temps libre. Dès que quelque chose fonctionne, je me demande comment le rendre plus simple, plus rapide ou plus agréable à utiliser.",
    "es": "Sigo creando cosas en mi tiempo libre. En cuanto algo funciona, empiezo a pensar cómo hacerlo más sencillo, más rápido o más agradable de usar."
  },
  "02 / EXPERIENCE": {
    "fr": "02 / PARCOURS",
    "es": "02 / EXPERIENCIA"
  },
  "The work": {
    "fr": "Le travail",
    "es": "El trabajo"
  },
  "behind the work.": {
    "fr": "en coulisses.",
    "es": "entre bastidores."
  },
  "From keeping critical systems running to building the software behind a cybersecurity platform, I care about how a product behaves in real use.": {
    "fr": "Du maintien de systèmes critiques au développement d’une plateforme de cybersécurité, je m’intéresse à la façon dont un produit fonctionne au quotidien.",
    "es": "Desde mantener sistemas críticos en marcha hasta desarrollar una plataforma de ciberseguridad, me importa cómo funciona un producto en el uso diario."
  },
  "2023 — NOW": {
    "fr": "2023 — AUJOURD’HUI",
    "es": "2023 — ACTUALIDAD"
  },
  "FREELANCE": {
    "fr": "INDÉPENDANT",
    "es": "AUTÓNOMO"
  },
  "Backend Engineer": {
    "fr": "Ingénieur backend",
    "es": "Ingeniero backend"
  },
  "CYBERSECURITY SAAS": {
    "fr": "SAAS DE CYBERSÉCURITÉ",
    "es": "SAAS DE CIBERSEGURIDAD"
  },
  "I design and build the backend of": {
    "fr": "Je conçois et développe le backend de",
    "es": "Diseño y desarrollo el backend de"
  },
  ", a SaaS platform where security teams launch": {
    "fr": ", une plateforme SaaS où les équipes de sécurité lancent des",
    "es": ", una plataforma SaaS donde los equipos de seguridad lanzan"
  },
  "internal and external audits": {
    "fr": "audits internes et externes",
    "es": "auditorías internas y externas"
  },
  ", follow them while they run, and deliver the results to their clients.": {
    "fr": ", suivent leur avancement et livrent les résultats à leurs clients.",
    "es": ", siguen su progreso y entregan los resultados a sus clientes."
  },
  "THE PROJECT": {
    "fr": "LE PROJET",
    "es": "EL PROYECTO"
  },
  "An audit starts from a scope: the": {
    "fr": "Un audit commence par un périmètre : les",
    "es": "Una auditoría parte de un alcance: los"
  },
  "subdomains and IP addresses": {
    "fr": "sous-domaines et adresses IP",
    "es": "subdominios y las direcciones IP"
  },
  "a client wants checked. The platform discovers the servers, open ports, and services behind them, then runs the right security tools against each one. Every tool reports in its own way, so the results are brought together as one list of findings that analysts review before a": {
    "fr": "qu’un client souhaite vérifier. La plateforme découvre les serveurs, ports ouverts et services associés, puis lance les outils de sécurité adaptés. Chaque outil produit ses propres résultats, qui sont réunis dans une liste de constats à examiner par les analystes avant qu’un",
    "es": "que el cliente quiere comprobar. La plataforma descubre los servidores, puertos abiertos y servicios asociados, y ejecuta las herramientas de seguridad adecuadas. Cada herramienta presenta sus resultados de forma distinta, así que se reúnen en una lista de hallazgos que los analistas revisan antes de que el"
  },
  "client report": {
    "fr": "rapport client",
    "es": "informe para el cliente"
  },
  "is produced.": {
    "fr": "soit produit.",
    "es": "se genere."
  },
  "THE HARD PART": {
    "fr": "LE DÉFI",
    "es": "EL RETO"
  },
  "Audits are long and unpredictable. One audit can run many tools for a long time; some time out or fail halfway, and others depend on results that are not ready yet. The backend has to keep going anyway: track the progress of every step, record what failed, and still give analysts": {
    "fr": "Les audits sont longs et imprévisibles. Certains outils dépassent leur délai ou échouent en cours de route ; d’autres attendent des résultats qui ne sont pas encore prêts. Le backend doit continuer malgré tout : suivre chaque étape, enregistrer les échecs et fournir aux analystes",
    "es": "Las auditorías son largas e impredecibles. Algunas herramientas agotan su tiempo o fallan a mitad de camino; otras dependen de resultados que aún no están listos. El backend debe seguir adelante: controlar cada paso, registrar los fallos y proporcionar a los analistas"
  },
  "usable findings and a report": {
    "fr": "des résultats exploitables et un rapport",
    "es": "hallazgos útiles y un informe"
  },
  "WHAT I BUILT": {
    "fr": "CE QUE J’AI DÉVELOPPÉ",
    "es": "LO QUE DESARROLLÉ"
  },
  "APPRENTICESHIP": {
    "fr": "ALTERNANCE",
    "es": "FORMACIÓN DUAL"
  },
  "Systems & Network Admin": {
    "fr": "Administrateur systèmes et réseaux",
    "es": "Administrador de sistemas y redes"
  },
  "INFRASTRUCTURE & DBA": {
    "fr": "INFRASTRUCTURE ET DBA",
    "es": "INFRAESTRUCTURA Y DBA"
  },
  "During my apprenticeship, I looked after the": {
    "fr": "Pendant mon alternance, je m’occupais des",
    "es": "Durante mi formación dual, me ocupaba de los"
  },
  "Windows servers, accounts, and databases": {
    "fr": "serveurs Windows, comptes et bases de données",
    "es": "servidores Windows, las cuentas y las bases de datos"
  },
  "people relied on every day, and handled the support cases that needed deeper investigation.": {
    "fr": "utilisés au quotidien, ainsi que des demandes de support nécessitant une investigation approfondie.",
    "es": "que se utilizaban a diario, y atendía los casos de soporte que requerían una investigación más profunda."
  },
  "THE ROLE": {
    "fr": "LE POSTE",
    "es": "EL PUESTO"
  },
  "I joined SCC France while studying for my BTS in systems and networks, working as a": {
    "fr": "J’ai rejoint SCC France pendant mon BTS en systèmes et réseaux, au poste de",
    "es": "Me incorporé a SCC France mientras cursaba un BTS en sistemas y redes, como"
  },
  "system and network administrator and DBA": {
    "fr": "administrateur systèmes et réseaux et DBA",
    "es": "administrador de sistemas y redes y DBA"
  },
  ". My work covered Windows Server administration, level-3 support for workstations, servers, Microsoft 365, and business applications, and the maintenance of SQL Server instances.": {
    "fr": ". Mon travail couvrait l’administration Windows Server, le support de niveau 3 sur les postes, serveurs, Microsoft 365 et applications métier, ainsi que la maintenance des instances SQL Server.",
    "es": ". Mi trabajo abarcaba la administración de Windows Server, el soporte de nivel 3 para equipos, servidores, Microsoft 365 y aplicaciones empresariales, y el mantenimiento de instancias de SQL Server."
  },
  "The visible problem was often far from its cause. A user who could not open an app might have a permission, network, or database issue behind it. I learned to trace issues across each layer, plan updates and restarts carefully, and check that the": {
    "fr": "Le problème visible était souvent loin de sa cause. Une application inaccessible pouvait cacher un souci de droits, de réseau ou de base de données. J’ai appris à remonter chaque couche, à planifier soigneusement les mises à jour et redémarrages, et à vérifier que",
    "es": "El problema visible a menudo estaba lejos de su causa. Una aplicación que no se abría podía esconder un problema de permisos, red o base de datos. Aprendí a rastrear los fallos en cada capa, planificar las actualizaciones y los reinicios con cuidado y comprobar que"
  },
  "application itself worked again": {
    "fr": "l’application elle-même fonctionnait à nouveau",
    "es": "la propia aplicación volvía a funcionar"
  },
  "after an intervention, not just the server.": {
    "fr": "après une intervention, pas seulement le serveur.",
    "es": "tras una intervención, no solo el servidor."
  },
  "WHAT I LOOKED AFTER": {
    "fr": "CE QUE JE GÉRAIS",
    "es": "LO QUE GESTIONABA"
  },
  "03 / THINGS I'VE MADE": {
    "fr": "03 / MES CRÉATIONS",
    "es": "03 / MIS CREACIONES"
  },
  "A little practical.": {
    "fr": "Un peu pratique.",
    "es": "Un poco práctico."
  },
  "A little playful.": {
    "fr": "Un peu ludique.",
    "es": "Un poco lúdico."
  },
  "My projects move between tools that solve specific problems and ideas I wanted to explore. Each one taught me something different.": {
    "fr": "Mes projets oscillent entre des outils qui résolvent des problèmes précis et des idées que je voulais explorer. Chacun m’a appris quelque chose de différent.",
    "es": "Mis proyectos van desde herramientas que resuelven problemas concretos hasta ideas que quería explorar. Cada uno me enseñó algo diferente."
  },
  "MORE IN THE WORKS": {
    "fr": "D’AUTRES PROJETS EN COURS",
    "es": "MÁS PROYECTOS EN CAMINO"
  },
  "Browse all repositories": {
    "fr": "Voir tous les dépôts",
    "es": "Ver todos los repositorios"
  },
  "04 / CONTACT": {
    "fr": "04 / CONTACT",
    "es": "04 / CONTACTO"
  },
  "Questions or ideas?": {
    "fr": "Des questions, des idées ?",
    "es": "¿Preguntas o ideas?"
  },
  "My inbox is open.": {
    "fr": "Écrivez-moi.",
    "es": "Escríbeme."
  },
  "For projects, opportunities, or just a hello, feel free to reach out.": {
    "fr": "Un projet, une opportunité ou juste un bonjour : n’hésitez pas à me contacter.",
    "es": "Para proyectos, oportunidades o simplemente saludar, no dudes en contactar conmigo."
  },
  "Send an email": {
    "fr": "Envoyer un e-mail",
    "es": "Enviar un correo"
  },
  "Connect professionally": {
    "fr": "Échangeons côté pro",
    "es": "Conectemos profesionalmente"
  },
  "Explore my projects": {
    "fr": "Explorer mes projets",
    "es": "Explorar mis proyectos"
  },
  "BACK TO TOP ↑": {
    "fr": "RETOUR EN HAUT ↑",
    "es": "VOLVER ARRIBA ↑"
  },
  "ports & services": {
    "fr": "ports et services",
    "es": "puertos y servicios"
  },
  "needs Tool B": {
    "fr": "attend l’outil B",
    "es": "requiere la herramienta B"
  },
  "CYBERESIST / HOW AN AUDIT RUNS": {
    "fr": "CYBERESIST / DÉROULEMENT D’UN AUDIT",
    "es": "CYBERESIST / CÓMO SE EJECUTA UNA AUDITORÍA"
  },
  "EXAMPLE AUDIT · RUNNING": {
    "fr": "AUDIT D’EXEMPLE · EN COURS",
    "es": "AUDITORÍA DE EJEMPLO · EN CURSO"
  },
  "01 · SCOPE": {
    "fr": "01 · PÉRIMÈTRE",
    "es": "01 · ALCANCE"
  },
  "Targets": {
    "fr": "Cibles",
    "es": "Objetivos"
  },
  "The subdomains and IP addresses the client wants checked.": {
    "fr": "Les sous-domaines et adresses IP que le client souhaite vérifier.",
    "es": "Los subdominios y las direcciones IP que el cliente quiere comprobar."
  },
  "02 · RUN": {
    "fr": "02 · EXÉCUTION",
    "es": "02 · EJECUCIÓN"
  },
  "Background tasks": {
    "fr": "Tâches de fond",
    "es": "Tareas en segundo plano"
  },
  "Huey workers, queued in Redis, each with a timeout.": {
    "fr": "Des workers Huey, en file dans Redis, avec chacun un délai maximal.",
    "es": "Workers de Huey en una cola de Redis, cada uno con un tiempo límite."
  },
  "One timeout is recorded. The rest of the audit keeps going.": {
    "fr": "Un dépassement de délai est enregistré. Le reste de l’audit continue.",
    "es": "Se registra un tiempo agotado. El resto de la auditoría continúa."
  },
  "03 · NORMALIZE": {
    "fr": "03 · NORMALISATION",
    "es": "03 · NORMALIZACIÓN"
  },
  "One findings format": {
    "fr": "Un format de résultats commun",
    "es": "Un formato común de hallazgos"
  },
  "Every tool reports differently. Parsers turn each output into the same record.": {
    "fr": "Chaque outil rend ses résultats différemment. Les parseurs les convertissent en un format commun.",
    "es": "Cada herramienta presenta sus resultados de forma distinta. Los analizadores los convierten al mismo formato."
  },
  "04 · DELIVER": {
    "fr": "04 · LIVRAISON",
    "es": "04 · ENTREGA"
  },
  "Review & report": {
    "fr": "Relecture et rapport",
    "es": "Revisión e informe"
  },
  "Analysts check the findings, then the report is generated.": {
    "fr": "Les analystes vérifient les résultats, puis le rapport est généré.",
    "es": "Los analistas comprueban los hallazgos y después se genera el informe."
  },
  "Analyst review": {
    "fr": "Relecture par un analyste",
    "es": "Revisión del analista"
  },
  "LLM-assisted summary": {
    "fr": "Synthèse assistée par LLM",
    "es": "Resumen asistido por LLM"
  },
  "Client API · Django Ninja": {
    "fr": "API client · Django Ninja",
    "es": "API para clientes · Django Ninja"
  },
  "Technologies used": {
    "fr": "Technologies utilisées",
    "es": "Tecnologías utilizadas"
  },
  "Caffeine Protocol robot holding coffee, wearing glasses, and occasionally winking": {
    "fr": "Robot de Caffeine Protocol avec un café et des lunettes, qui fait parfois un clin d’œil",
    "es": "Robot de Caffeine Protocol con café y gafas, que guiña un ojo de vez en cuando"
  },
  "Back to top": {
    "fr": "Retour en haut",
    "es": "Volver arriba"
  },
  "Language": {
    "fr": "Langue",
    "es": "Idioma"
  },
  "MAIN TECHNOLOGIES": {
    "fr": "TECHNOLOGIES PRINCIPALES",
    "es": "TECNOLOGÍAS PRINCIPALES"
  },
  "ALSO USED": {
    "fr": "ÉGALEMENT UTILISÉES",
    "es": "TAMBIÉN UTILIZADAS"
  },
  "Discovery": {
    "fr": "Découverte",
    "es": "Descubrimiento"
  },
  "Tool A": {
    "fr": "Outil A",
    "es": "Herramienta A"
  },
  "Tool B": {
    "fr": "Outil B",
    "es": "Herramienta B"
  },
  "Tool C": {
    "fr": "Outil C",
    "es": "Herramienta C"
  },
  "Tool D": {
    "fr": "Outil D",
    "es": "Herramienta D"
  },
  "DONE": {
    "fr": "TERMINÉ",
    "es": "TERMINADO"
  },
  "RUNNING": {
    "fr": "EN COURS",
    "es": "EN CURSO"
  },
  "WAITING": {
    "fr": "EN ATTENTE",
    "es": "EN ESPERA"
  },
  "TIMED OUT": {
    "fr": "DÉLAI DÉPASSÉ",
    "es": "TIEMPO AGOTADO"
  },
  "TEXT": {
    "fr": "TEXTE",
    "es": "TEXTO"
  },
  "CUSTOM": {
    "fr": "PROPRIÉTAIRE",
    "es": "PROPIO"
  },
  "asset": {
    "fr": "actif",
    "es": "activo"
  },
  "severity": {
    "fr": "sévérité",
    "es": "gravedad"
  },
  "high": {
    "fr": "élevée",
    "es": "alta"
  },
  "source": {
    "fr": "source",
    "es": "origen"
  },
  "status": {
    "fr": "statut",
    "es": "estado"
  },
  "to review": {
    "fr": "à vérifier",
    "es": "por revisar"
  },
  "Group Policy": {
    "fr": "Stratégies de groupe",
    "es": "Directivas de grupo"
  },
  "Natan Salvador — Backend engineer & product builder": {
    "fr": "Natan Salvador — Ingénieur backend et créateur de produits",
    "es": "Natan Salvador — Ingeniero backend y creador de productos"
  },
  "Natan Salvador is a backend engineer building reliable systems and thoughtful products. Explore apps, selected work, and experience.": {
    "fr": "Natan Salvador est ingénieur backend et conçoit des systèmes fiables et des produits soignés. Découvrez ses applications, projets et expériences.",
    "es": "Natan Salvador es ingeniero backend y crea sistemas fiables y productos cuidados. Descubre sus aplicaciones, proyectos y experiencia."
  },
  "Reliable systems. Thoughtful products. Explore the apps and work of Natan Salvador.": {
    "fr": "Des systèmes fiables. Des produits soignés. Découvrez les applications et le travail de Natan Salvador.",
    "es": "Sistemas fiables. Productos cuidados. Descubre las aplicaciones y el trabajo de Natan Salvador."
  }
}
