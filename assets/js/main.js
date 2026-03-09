// Texto que será digitado na tela
const text = 'Olá, eu me chamo ';
const textNome = 'Felipe Gonçales';

const titleMaxLength = 12;
const descMaxLength = 40;

// Índices para controlar a digitação letra por letra
let index = 0;
let indexNome = 0;

// Elemento onde o texto será exibido
const textoDigitar = document.getElementById('textoDigitar');

// Variáveis de controle
let nomeDigitar = '';
let spanCreated = false;

// Função responsável pelo efeito de digitação
function digitarTexto() {

    // Digita a primeira parte do texto
    if (index < text.length) {

        // Faz uma pausa maior quando encontra vírgula
        if (text.charAt(index) == ',') {
            setTimeout(() => {
                textoDigitar.innerHTML += ',';
                index++;
                digitarTexto();
            }, 700);
            return;
        }

        // Adiciona uma letra por vez
        textoDigitar.innerHTML += text.charAt(index);
        index++;

        // Delay entre cada letra
        setTimeout(digitarTexto, 100);

        // Quando termina o primeiro texto, cria um span para digitar o nome
    } else if (index >= text.length && !spanCreated) {
        const span = document.createElement('span');
        textoDigitar.append(span);
        span.id = 'nomeDigitar';

        spanCreated = true;

        nomeDigitar = document.getElementById('nomeDigitar');

        digitarTexto();

        // Digita o nome letra por letra dentro do span
    } else if (indexNome < textNome.length) {
        nomeDigitar.innerHTML += textNome.charAt(indexNome);
        indexNome++;

        setTimeout(digitarTexto, 100);
    }
}

// Inicia o efeito de digitação quando a página carrega
window.onload = setTimeout(digitarTexto, 500);

// ===============================
// TOGGLE DARK / LIGHT MODE
// ===============================

const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('change', function () {

    // Root do CSS para alterar variáveis
    let root = document.documentElement;

    // Tema claro
    if (toggleBtn.checked) {
        root.style.setProperty('--cor-texto', '#110031');
        root.style.setProperty('--cor-bg', '#f0f0f0');
        root.style.setProperty('--sec-bg', '#ddc9e3ff');
        root.style.setProperty('--cor-texto', '#110031');

        // Tema escuro
    } else {
        root.style.setProperty('--cor-texto', '#ffffff');
        root.style.setProperty('--cor-bg', '#110031');
        root.style.setProperty('--sec-bg', '#212121');
        root.style.setProperty('--cor-texto', '#ffffffff');
    }
});


// ===============================
// SCROLL SUAVE DO MENU
// ===============================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (event) {

        // Impede o comportamento padrão do link
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        // Ajuste especial para a seção de projetos
        if (targetId === 'projetos') {
            window.scrollTo({
                top: targetSection.offsetTop - 130,
                behavior: "smooth"
            });
            return;
        }

        // Centraliza a seção na tela
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - (window.innerHeight / 2) + (targetSection.clientHeight / 2),
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// REQUISIÇÃO À API DO GITHUB
// ===============================

// URL da API para pegar os repositórios do usuário
const url = 'https://api.github.com/users/FelipeGoncales/repos';

// Faz a requisição HTTP
fetch(url, {
    headers: {
        'Accept': 'application/vnd.github+json'
    },
    method: 'GET'
})
    .then(response => {
        return response.json()
    })
    .then(data => {

        // Variável dos projetos do github
        let projetosGithub = data;

        // =====================================================
        // CRIAÇÃO DINÂMICA DOS PROJETOS OBTIDOS PELA API GITHUB
        // =====================================================

        // Div que contém todos os projetos
        const divProjetos = document.getElementById('div-projetos');

        // Percorre o array "projetos" criando cada card
        projetosGithub.forEach(async (projeto) => {

            // Div principal do projeto
            let div = document.createElement('div');
            div.classList.add('projeto');

            // Título do projeto
            let title = document.createElement('p');

            // Formata o título
            let titleText = projeto.name.length > titleMaxLength ? projeto.name.substr(0,titleMaxLength) + "..." : projeto.name;

            title.innerText = `<${titleText}/>`;
            title.classList.add('titulo');
            div.append(title);

            // Descrição do projeto
            let desc = document.createElement('p');

            // Formata a descriçaõ (max length)
            let descText;
            
            if (projeto.description) {
                descText = projeto.description.length > descMaxLength ? projeto.description.substr(0,descMaxLength) + "..." : projeto.description;
            } else {
                descText = "Esse repositório ainda não tem descrição."
            }

            desc.innerText = descText;
            desc.classList.add('desc');
            div.append(desc);

            // Container dos ícones das tecnologias
            let divIcons = document.createElement('div');
            divIcons.classList.add('divIcons');

            let iconsArray;
            
            console.log(projeto.languages_url)

            await fetch(projeto.languages_url, {
                headers: {
                    'Accept': 'application/vnd.github+json'
                },
                method: 'GET'
            })
            .then(response => response.json())
            .then(icons => {
                iconsArray = Object.keys(icons);
            })

            console.log(iconsArray)

            // Adiciona ícones conforme as tecnologias usadas
            for (icon of iconsArray) {

                if (icon === 'HTML') {
                    divIcons.innerHTML += '<i class="fa-brands fa-html5"></i>';
                }

                if (icon === 'CSS') {
                    divIcons.innerHTML += '<i class="fa-brands fa-css"></i>';
                }

                if (icon === 'JavaScript') {
                    divIcons.innerHTML += '<i class="fa-brands fa-js"></i>';
                }

                if (icon === 'Python') {
                    divIcons.innerHTML += '<i class="fa-brands fa-python"></i>';
                }
            }

            div.append(divIcons);

            // Botão para o repositório
            if (projeto.html_url) {
                let repo = document.createElement('a');
                repo.href = projeto.html_url;
                repo.innerText = 'Ver Repositório';
                repo.target = '_blank';
                repo.classList.add('btn');
                div.append(repo);
            }

            // Botão para acessar o projeto online
            if (projeto.homepage) {
                let homepage = document.createElement('a');
                homepage.href = projeto.homepage;
                homepage.innerText = 'Ver Projeto';
                homepage.target = '_blank';
                homepage.classList.add('btn');
                div.append(homepage);
            }

            // Adiciona o projeto na página
            divProjetos.append(div);
        });

    });
