let musicas = [
    {titulo:'Till The Wheels Fall Off', artista:'Chris Brown', source:'musicas/01. Till The Wheels Fall Off feat. Lil Durk & Capella Grey.mp3', img:'imagens/un.png'},
    {titulo:'Dream', artista:'Chris Brown', source:'musicas/19. Dream.mp3', img:'imagens/image1.jpeg'},
    {titulo:'Sleep At Night', artista:'Chris Brown', source:'musicas/13. Sleep At Night.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Pitch Blank', artista:'Chris Brown', source:'musicas/03.Pitch Blank.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Possessive feat. Lil Wayne & Yung Bleu', artista:'Chris Brown', source:'musicas/04. Possessive feat. Lil Wayne & Yung Bleu.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Closure feat. H.E.R', artista:'Chris Brown', source:'musicas/07. Closure feat. H.E.R.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Passing Time', artista:'Chris Brown', source:'musicas/14. Passing Time.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Call Me Every Day feat. WizKid', artista:'Chris Brown', source:'musicas/06. Call Me Every Day feat. WizKid.mp3', img:'imagens/image2.jpeg'},
    {titulo:'Addicted feat. Lil Baby', artista:'Chris Brown', source:'musicas/05. Addicted feat. Lil Baby.mp3', img:'imagens/image2.jpeg'}
];


let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

nomeMusica.textContent = musicas[musicaIndex].titulo;
nomeArtista.textContent = musicas[musicaIndex].artista;
imagem.setAttribute('src', musicas[musicaIndex].img);
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));


document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    musicaIndex--; 
    if (musicaIndex < 0){
        musicaIndex = 2;
    }
    renderizarMusica(musicaIndex);
});

document.querySelector('.proximo').addEventListener('click', () => {
    musicaIndex++;
    if (musicaIndex > 2){
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
});



function renderizarMusica(musicaIndex){
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;
    
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    document.body.append(musica);
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = '0'+ campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration)*100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}