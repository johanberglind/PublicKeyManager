module.exports = {

	deployToServer: function(ip, user_name, pass_word, publicKey) {

		var Connection = require("ssh2");

		var conn = new Connection();

		function to_utf8(string) { return unescape(encodeURIComponent(string)); }

		console.log("I am here");
		var exec_string = 'echo "' + publicKey + '" >> .ssh/authorized_keys'.replace("\n", "")
		conn.on('ready', function() {
		  conn.exec(exec_string, function(err, stream) {
		    if (err) throw err;
		    stream.on('exit', function() {
		      conn.end();
		    });
		  });
		});

		conn.connect({
		  host: ip,
		  port: 22,
		  username: to_utf8(user_name),
			password: to_utf8(pass_word)
		});


		}


};
