
let champions;
let championsList = []
let url = 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json'
function getHeroes(urlTemp) {
    fetch(urlTemp)
        .then(promise => {return promise.json();
        }).then(data => {
            //console.log(data)
            heroes = data.data;
            //console.log(heroes);
            //getKeys(heroes)
            let chapionNames = Object.keys(heroes)
            champions = Object.values(heroes)
            //console.log("tuka",champions)
            showHeroes(champions);
        });
    
}

let keys = [];



getHeroes(url);
let container = document.getElementById('heroes-container');


function showHeroes(champions){
    //console.log(heroes);
    //console.log(heroes.Aatrox.tags);
    //console.log(heroes.Aatrox.name);
    //console.log(keys[1]);
    for(let i=0; i<champions.length; i++){
        let championCard = document.createElement('div');
        championCard.classList.add('championCard');
        championCard.innerHTML = `
            <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions[i].id}_0.jpg" alt="${champions[i].name}">
            <p class="champ-name">${champions[i].name}</p>
            <p class="champ-tags">${champions[i].tags}</p>
            <button class="like-button" onclick="likeHero(${i})">Like</button>
        `
        let tempObject = {
            idPrime: i,
            name: champions[i].name,
            tags: champions[i].tags,
            img: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champions[i].id}_0.jpg`
        }
        championsList.push(tempObject)
        container.appendChild(championCard);
        tempObject = {};

    }
//console.log(championsList)
}

let likedChampionsList = [];
function likeHero(id){
    let button = document.getElementsByClassName('like-button')[id];
    console.log(button.innerHTML);
    if(button.innerHTML==="Like"){
        button.innerHTML="Dislike";
    }else if(button.innerHTML==="Dislike"){
        button.innerHTML="Like";
    }
    let findChamp = championsList[id];
    //console.log(findChamp)
    if(!likedChampionsList.find(findChamp => findChamp.idPrime === id)){
        likedChampionsList.push(championsList[id]);
    }else {
        let tempPosition = likedChampionsList.indexOf(findChamp);
        console.log(tempPosition);
        likedChampionsList.splice(tempPosition,1);
    }
    console.log(likedChampionsList); 
    showLikedChampions();  
}

let likedChampionsContainer = document.getElementById('liked-heroes-container');
function showLikedChampions(){
    likedChampionsContainer.innerHTML = ""
    for(let i=0;i<likedChampionsList.length;i++){
        let likedChampionCard = document.createElement('div');
        likedChampionCard.classList.add('likedChampionCard');
        likedChampionCard.innerHTML = `
            <img src="${likedChampionsList[i].img}" alt="${likedChampionsList[i].name}">
            <p class="liked-champ-name">${likedChampionsList[i].name}</p>
            <p class="liked-champ-tags">${likedChampionsList[i].tags}</p>
        `
        likedChampionsContainer.appendChild(likedChampionCard);
    }
}







