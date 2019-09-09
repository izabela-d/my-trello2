//zmienne do komunikacji z serwerem
var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '4356',
  	'X-Auth-Token': '9f3f6455a13b307d232b14b32a8e6846'
};
var fullUrl = prefix + baseUrl;

//funkcja odpytująca serwer o zasób tablicy
fetch(fullUrl + '/board', { headers: myHeaders })
	.then(function(resp) {
    	return resp.json();
  	})
  	.then(function(resp) {
    	setupColumns(resp.columns);
});

//funkcja tworząca tyle kolumn, ile dostaliśmy w odpowiedzi z serwera, następnie każdą z nich przypina do tablicy (tej, którą widzimy na stronie)
function setupColumns(columns) {
  	columns.forEach(function(column) {
  		//Potrzebujemy ID dlatego, że jest tworzone za nas przez serwer za każdym razem, gdy tworzymy nowy element. Nie musimy więc generować losowego ID tak jak do tej pory
		var col = new Column(column.id, column.name);
    	board.addColumn(col);
    	setupCards(col, column.cards);
  	});
}

//Do funkcji przekazujemy kolumnę, do której mają zostać przyczepione karty
function setupCards(col, cards) {
	cards.forEach(function (card) {
    	var cardObj = new Card(card.id, card.name);
  		col.addCard(cardObj);
	});
}

// OGÓLNA FUNKCJA

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');

  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);

  	return element;
}
