// "Backend" for handling the keys

module.exports = {

	checkForKey: function () {

		var publicFilePath = process.env['HOME'] + "/.ssh/id_rsa.pub";

		var fs = require('fs');
		if (fs.existsSync(publicFilePath)) {
			process.stdout.write("It exists!");
			return true;
		} else {
			process.stdout.write("Public-key not found");
			return false;
		}
	},


	/**
	The function createSSHKeyPair generates a Public/Private keypair using RSA with 4096 bit encryption.
	For now it defaults to the standard path (~/.ssh/id_rsa.pub).
	*/
	createSSHKeyPair: function() {
		var runShell = require('shelljs');
		runShell.exec('ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa', {silent:true});
		process.stdout.write("Key has been successfully created!");
	},


	getPublicKeyEntire: function() {

		var publicFilePath = process.env['HOME'] + "/.ssh/id_rsa.pub";
		var fs = require('fs');

		return fs.readFileSync(publicFilePath).toString();

	},



	getPublicKeyInfo: function() {
	
		var publicFilePath = process.env['HOME'] + "/.ssh/id_rsa.pub";

		var runShell = require('shelljs');
		var shellString = "ssh-keygen -l -f " + publicFilePath;
		var result = runShell.exec(shellString, {silent:true}).output;

		var resultArray = result.split(" ");
		return [resultArray[0], resultArray[4], resultArray[3]];


	},

	generateKeysPage: function(resultArray) {

		var keyView = parseKeysFile();

		var resultString = (resultArray[2] + " - " + resultArray[0] + " bit" + " - " + resultArray[1] + '<button onclick="promptDelete()" style="position:relative;left:20px;" class="button danger">Remove</button>');
		var listOfKey = '<div class="listview-outlook"><a href="#" class="list"><div class="list-content">abc</div></a></div>'.replace(/abc/g, resultString);

		// <button class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Small modal</button>

		var content = (keyView + listOfKey)

		return content; 

	},


	removeKeys: function() {

		var publicFilePath = process.env['HOME'] + "/.ssh/id_rsa.pub";
		var privateFilePath = publicFilePath.replace(".pub", "");

		var fs = require('fs');
		fs.unlinkSync(publicFilePath);
		fs.unlinkSync(privateFilePath);

	} 

};



function parseKeysFile() {
	var fs = require('fs');
	return fs.readFileSync('./views/keys.view').toString();
}