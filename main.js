var distButton, githubButton, keysButton, aboutButton, mainButton;
var exitButton;

var open = require('open');
var keysJS = require('./myJS/keys');
var fs = require('fs');
var deployKeys = require('./myJS/distribute');


function openGithub() { open("http://www.github.com/johanberglind"); }

function parseFile(viewName) {
	fs.readFile(viewName, 'utf8', function (error,data) {
		if (error) {
			return console.log(error);
		}
		displayView(data);
		});
}


function deploy() {
	var ip = document.getElementById("ipfield").value;
	var username = document.getElementById("usernamefield").value
	var password = document.getElementById("passwordfield").value

	/*
		Here we should check that it really exists...
	*/

	var publicKeyEntire = keysJS.getPublicKeyEntire();

	/*
		Here we should check that the key not already exists on the server..
	*/

	deployKeys.deployToServer(ip, username, password, publicKeyEntire);

}

function promptDelete() {
	if (confirm("Are you sure you want to remove the selected key?")) {
		keysJS.removeKeys();
		startKey();
	} else {
		// Do nothing
	}
}


function displayView(content) {
	document.getElementById("contentTab").innerHTML = content;
}


function changeView(viewName) {
	parseFile(viewName);
}

/*
Below are the functions that delegate the content displayed.
*/

function distributeNewKey() {changeView('./views/sendKey.view'); }
function showInstructionPane() { changeView('./views/manual.view'); }
function startAbout() { changeView('./views/about.view'); }
function mainPane() { changeView ('./views/main.view'); }
function startDist() { changeView ('./views/dist.view'); }
function startKey() {

	if (keysJS.checkForKey()) {
		var pubKeyInfo = keysJS.getPublicKeyInfo();
		var generatedContent = keysJS.generateKeysPage(pubKeyInfo);
		displayView(generatedContent);
	}

	else { changeView('./views/nokeys.view'); }
}

function delegateGenerator() {
	keysJS.createSSHKeyPair();
	startKey();
}

function exitWindow() { require('nw.gui').Window.get().close(); }

onload = function() {

	mainPane();

	githubButton = document.getElementById("githubButton");
	keysButton = document.getElementById("keysButton");
	aboutButton = document.getElementById("aboutButton");
	mainButton = document.getElementById("mainButton");
	distButton = document.getElementById("distButton");
	exitButton = document.getElementById("exitButton");

	githubButton.addEventListener("click", openGithub);
	keysButton.addEventListener("click", startKey);
	aboutButton.addEventListener("click", startAbout);
	mainButton.addEventListener("click", mainPane);
	distButton.addEventListener("click", startDist);
	exitButton.addEventListener("click", exitWindow);
};
