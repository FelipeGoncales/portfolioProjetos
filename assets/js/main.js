const text = 'Olá, eu me chamo ';
const textNome = 'Felipe Gonçales';
let index = 0;
let indexNome = 0;
const textoDigitar = document.getElementById('textoDigitar');
let nomeDigitar = '';
let spanCreated = false;

function digitarTexto() {
    if (index < text.length) {    
        if (text.charAt(index) == ',') {
            setTimeout(() => {
                textoDigitar.innerHTML += ',';
                index++;
                digitarTexto();
            }, 700);
            return;
        }
        textoDigitar.innerHTML += text.charAt(index);
        index++;
        setTimeout(digitarTexto, 100);
    } else if (index >= text.length && !spanCreated) {
        const span = document.createElement('span');
        textoDigitar.append(span);
        span.id = 'nomeDigitar';
        spanCreated = true;
        nomeDigitar = document.getElementById('nomeDigitar');
        digitarTexto();
    } else if (indexNome < textNome.length) { 
        nomeDigitar.innerHTML += textNome.charAt(indexNome);
        indexNome++;
        setTimeout(digitarTexto, 100);
    }
}

window.onload = setTimeout(digitarTexto, 500);

const divProjetos = document.getElementById('div-projetos');

projetos.forEach((projeto) => {
    let div = document.createElement('div');
    div.classList.add('projeto');

    let title = document.createElement('p');
    title.innerText = `<${projeto.nome}/>`;
    title.classList.add('titulo');
    div.append(title);

    let desc = document.createElement('p');
    desc.innerText = projeto.desc;
    desc.classList.add('desc');
    div.append(desc);

    let divIcons = document.createElement('div');
    divIcons.classList.add('divIcons');

    for (icon of projeto.lng) {
        if (icon === 'HTML') {
            divIcons.innerHTML += '<i class="fa-brands fa-html5"></i>';
        }
        if (icon === 'CSS') {
            divIcons.innerHTML += '<i class="fa-brands fa-css"></i>';
        }
        if (icon === 'JS') {
            divIcons.innerHTML += '<i class="fa-brands fa-js"></i>';
        }
        if (icon === 'Python') {
            divIcons.innerHTML += '<i class="fa-brands fa-python"></i>';
        }
        if (icon === 'SQL') {
            divIcons.innerHTML += '<i class="fa-solid fa-database"></i>';
        }
    }

    div.append(divIcons);

    if (projeto.port) {
        let port = document.createElement('a');
        port.href = projeto.port;
        port.innerText = 'Ver Repositório'; 
        port.target = '_blank';
        port.classList.add('btn');
        div.append(port);
    }

    if (projeto.link) {
        let link = document.createElement('a');
        link.href = projeto.link;
        link.innerText = 'Ver Projeto'; 
        link.target = '_blank';
        link.classList.add('btn');
        div.append(link);
    }
    
    divProjetos.append(div);
});

const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('change', function() {

    let root =  document.documentElement;

    if (toggleBtn.checked) {
        root.style.setProperty('--cor-texto', '#110031');
        root.style.setProperty('--cor-bg', '#f0f0f0');
        return;
    } else {
        root.style.setProperty('--cor-texto', '#ffffff');
        root.style.setProperty('--cor-bg', '#110031');
    }
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o comportamento padrão
        
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetId === 'projetos') {
            window.scrollTo({
                top: targetSection.offsetTop - 130,
                behavior: "smooth"
            });
            return;
        }
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - (window.innerHeight / 2) + (targetSection.clientHeight / 2),
                behavior: "smooth"
            });
        }
    });
});


const url = 'https://api.github.com/user/repos';

let projetosData = '';

fetch(url, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
    }
  })
  .then(response => {
    response.json()
})
  .then(data => {
    projetosData = data
    console.log(projetosData);
});
  