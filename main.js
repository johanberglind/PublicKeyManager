var distButton, githubButton, keysButton, aboutButton, mainButton;
var exitButton;

var open = require('open');
var keysJS = require('./myJS/keys');
var fs = require('fs');


function openGithub() { open("http://www.github.com/johanberglind"); }

function parseFile(viewName) {
	fs.readFile(viewName, 'utf8', function (error,data) {
		if (error) {
			return console.log(error);
		}
		displayView(data);
		});
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

function showInstructionPane() { changeView('./views/manual.view'); }
function startAbout() { changeView('./views/about.view'); }
function mainPane() { changeView ('./views/main.view'); }
function startDist() { changeView ('./views/dist.view'); }
function startKey() {
	
	if (keysJS.checkForKey()) {
		var pubKeyInfo = keysJS.getPublicKeyInfo();
		var generatedContent = keysJS.generateKeysPage(pubKeyInfo);
		process.stdout.write(generatedContent);
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