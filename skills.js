const skills = document.querySelectorAll('.skill');
const skillWheel = document.getElementById('skillWheel');
const skillDescription = document.getElementById('skillDescription');
fetch('./skills.json')
  .then(response => response.json())
  .then(skills => {
    console.log(skills);
    const skillWheel = document.getElementById('skillWheel');
    skillWheel.innerHTML = ''; // vide le contenu actuel

    skills.forEach(skill => {
      const div = document.createElement('div');
      div.classList.add('skill');
      div.dataset.index = skill.index;
      div.dataset.color = skill.color;
      div.dataset.text = skill.text;
      div.style.color = skill.color;

      const icon = document.createElement('i');
      skill.iconClass.split(' ').forEach(cls => icon.classList.add(cls));

      div.appendChild(icon);
      skillWheel.appendChild(div);
    });
  })
  .catch(err => console.error('Erreur chargement JSON:', err));

const totalSkills = skills.length;
let currentOffset = 0; // combien on a tourné la roue

let typingTimeout; // variable globale pour stocker le timeout en cours

function typeWriter(element, text, delay = 50) {
  if (typingTimeout) {
    clearTimeout(typingTimeout); // stop l’ancienne animation si elle existe
  }
  element.textContent = '';
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      typingTimeout = setTimeout(typing, delay);
    } else {
      typingTimeout = null; // animation terminée
    }
  }

  typing();
}


// Fonction pour positionner les skills sur le cercle avec un offset dynamique
function positionSkills(offset) {
  const angleStep = 360 / totalSkills;

  skills.forEach((skill, i) => {
    const angle = ((i + offset) % totalSkills) * angleStep;
    // Positionnement autour du cercle
    const radians = (angle * Math.PI) / 180;
    const radius = 120;

    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    // Appliquer la position et rotation inverse pour garder l’icône droite
    skill.style.transform = `translate(${x}px, ${y}px) rotate(${-angle}deg)`;
  });
}

// Au clic, faire tourner la roue pour que l'élément cliqué soit à la position "droite" (0°)
skills.forEach((skill, i) => {
  skill.addEventListener('click', () => {
    // On calcule l’offset pour que ce skill soit en position 0 (droite)
    currentOffset = totalSkills - i;
    positionSkills(currentOffset);

    // Afficher la description
    const text = skill.getAttribute('data-text') || 'Pas de description disponible.';
    const color = skill.getAttribute('data-color') || '#8e44ad';
    typeWriter(skillDescription, text, 40);

    // Optionnel : effet visuel sur le skill sélectionné
    skills.forEach(s => s.style.color = '#8e44ad');
    skill.style.color = color;
  });
});

// Initialisation : on positionne les skills sans offset
positionSkills(currentOffset);
