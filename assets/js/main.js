const text = 'Olá, eu me chamo Felipe Gonçales';
let index = 0;
const textoDigitar = document.getElementById('textoDigitar');

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
        setTimeout(digitarTexto, 70);
    }
}

document.addEventListener('DOMContentLoaded', digitarTexto);

console.log(projetos)

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