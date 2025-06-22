
const colors = ['#8e44ad', '#3498db'];
const numLights = 10;

const container = document.querySelector('.parallax-background');

const lights = [];

for (let i = 0; i < numLights; i++) {
const light = document.createElement('div');
light.classList.add('light');
light.style.backgroundColor = colors[i % colors.length];
light.dataset.speed = (0.2 + Math.random() * 1).toFixed(2);
light.style.top = `${Math.random() * 100}%`;

let left = (Math.random()-.5) * 20;
if (left >0){
    light.style.left = `${left}%`;

} else{

    light.style.right = `${left * -1}%`;
}
container.appendChild(light);
lights.push(light);
}

document.addEventListener("scroll", () => {
const scrollY = window.scrollY;
lights.forEach(light => {
    const speed = parseFloat(light.dataset.speed);
    light.style.transform = `translateY(${scrollY * speed}px)`;
});
});