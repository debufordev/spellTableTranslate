var req = new XMLHttpRequest();
req.addEventListener("readystatechange",returnJson);

function serch(cardName) {
  var url;
  url = "https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=true&q=name:/^"+cardName+"$/+(in:ja+lang:ja+or+-in:ja)&unique=cards";
  req.open("GET", url, false);
  req.send(null);
}

function returnJson() {
  if(req.readyState == 4){
    if(req.status == 200){
      imageChange(JSON.parse(req.responseText));
    }
    else if(req.status == 404){
      console.log("存在しないカード名です。");   
    }
  }
}

function imageChange(cardInfo){
  document.querySelector('img[src^="https://c1.scryfall.com/file/scryfall-cards/"]').setAttribute('src',cardInfo['data'][0]['image_uris']['large']);
}

var observer1 = new MutationObserver(function(){
  if(document.querySelector('img[src^="https://c1.scryfall.com/file/scryfall-cards/"]')){
    observer1.disconnect()
    serch(document.querySelector('img[src^="https://c1.scryfall.com/file/scryfall-cards/"]').getAttribute('alt'));
    var elem2 = document.querySelector('img[src^="https://c1.scryfall.com/file/scryfall-cards/"]').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    observer2.observe(elem2, config2);
  }
});

var observer2 = new MutationObserver(function(){
  serch(document.querySelector('img[src^="https://c1.scryfall.com/file/scryfall-cards/"]').getAttribute('alt'));
});

const elem1 = document.getElementById('root');
const config1 = { 
  attributes: true, 
  childList: true, 
  characterData: true,
  subtree: true 
};

const config2 = { 
  childList: true, 
  subtree: true 
};

observer1.observe(elem1, config1);