// =============================
// PAGE COURS - S1 + S2 COMPLET
// =============================

const coursesData = [
  {
    semester: 1,
    ue: [
      {
        name: "UE11 - Homogénéisation en sciences pour l'Ingénieur",
        ecues: [
          "ECUE111 - Mathématiques appliquées",
          "ECUE112 - Physique et Applications",
          "ECUE113 - Modélisation pour la conception (UML)",
          "ECUE114 - Algorithmique",
          "ECUE115 - Initiation aux systèmes : Linux & shell"
        ]
      },
      {
        name: "UE12 - Sciences pour l'ingénieur I",
        ecues: [
          "ECUE121 - Physique numérique",
          "ECUE122 - Introduction à la programmation"
        ]
      },
      {
        name: "UE13 - Ouverture Scientifique Pluridisciplinaire I",
        ecues: [
          "ECUE131 - Le monde de la santé et sa sémantique",
          "ECUE132 - Histoire des sciences et de l'industrie"
        ]
      },
      {
        name: "UE14 - Technologies I",
        ecues: [
          "ECUE141 - Initiation réseau (protocoles et services)",
          "ECUE142 - Introduction aux réseaux hospitaliers (architectures)",
          "ECUE143 - Métrologie, capteurs et signaux physiologiques",
          "ECUE144 - Méthodes de représentation pour le contrôle/commande"
        ]
      },
      {
        name: "UE15 - Communication et professionnalisation I",
        ecues: [
          "ECUE151 - Anglais : Communication at work / Presenting Scientific contents",
          "ECUE152 - Dynamique de groupe et communication",
          "ECUE153 - Les entreprises dans leur écosystème"
        ]
      },
      {
        name: "UE16 - Activité en entreprise",
        ecues: [
          "UE161 - Activité en entreprise"
        ]
      }
    ]
  },

  {
    semester: 2,
    ue: [
      {
        name: "UE21 - Sciences pour l'ingénieur II",
        ecues: [
          "ECUE211 - Mathématiques pour l'ingénieur",
          "ECUE212 - Acquisition, Traitement et Modélisation statistique des données physiologiques"
        ]
      },
      {
        name: "UE22 - Ouverture Scientifique Pluridisciplinaire II",
        ecues: [
          "ECUE221 - Approche biosociologique du monde de la santé",
          "ECUE222 - Philosophie des sciences : Imaginaire et société / Sociologie de la Technologie"
        ]
      },
      {
        name: "UE23 - Technologies II",
        ecues: [
          "ECUE231 - Administration des services et systèmes",
          "ECUE232 - Interconnexion et réseaux d'accès",
          "ECUE233 - Initiation aux technologies réseaux sans fil pour la santé",
          "ECUE234 - Introduction à la programmation objet",
          "ECUE235 - Conception des interfaces homme-machine pour les systèmes d'aide",
          "ECUE236 - Introduction aux bases de données pour la santé (SQL)"
        ]
      },
      {
        name: "UE24 - Communication et professionnalisation II",
        ecues: [
          "ECUE241 - Anglais : Science and Healthcare relationships & company organisation",
          "ECUE242 - Le risque sociétal dans le métier de l'ingénieur",
          "ECUE243 - Conduite et Optimisation",
          "ECUE244 - Méthodologie scientifique & Innovations (1)"
        ]
      },
      {
        name: "UE25 - Expérience en entreprise",
        ecues: [
          "UE251 - Rapport semestriel activités en entreprise",
          "UE252 - Rapports alternances entreprise"
        ]
      }
    ]
  }
];


// =============================
// RENDER PAGE COURS
// =============================

function renderCoursesPage() {
  const container = document.getElementById("courses-list");
  if (!container) return;

  container.innerHTML = coursesData.map(sem => `
    <div class="semester-block">
      <h2 class="semester-title">Semestre ${sem.semester}</h2>

      ${sem.ue.map(ue => `
        <div class="ue-block">
          <h3 class="ue-title">${ue.name}</h3>
          <ul class="ecue-list">
            ${ue.ecues.map(e => `<li class="ecue-item">${e}</li>`).join("")}
          </ul>
        </div>
      `).join("")}

    </div>
  `).join("");
}
