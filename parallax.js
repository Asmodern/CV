
const colors = ['#8e44ad', '#3498db','#9f55be', '#45a9ec', '#56bafd'];
const numLights = 50;

const container = document.querySelector('.parallax-background');

const lights = [];

for (let i = 0; i < numLights; i++) {
const light = document.createElement('div');
light.classList.add('light');
light.style.backgroundColor = colors[i % colors.length];
light.dataset.speed = (Math.random() * .3).toFixed(2);
light.style.top = `${Math.random() * 100}%`;
light.style.filter = `blur(${20 + Math.random() * 400}px)`;

const width = `${20 + Math.random() * 200}px`;
light.style.width = width;
light.style.height = width;
let left = (Math.random()-.5) * 40;
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