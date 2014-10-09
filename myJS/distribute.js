module.exports = {

	deployToServer: function(ip, username, password, publicKey) {

		var Connection = require('ssh2');

		var conn = new Connection();
		conn.on('ready', function() {
		  console.log('Connection :: ready');
		  var command = 'echo ' + '"' + publicKey + '"' + ' >> ~/.ssh/authorized_keys' 
		  process.stdout.print(command);
		  conn.exec(command, function(err, stream) {
		    if (err) throw err;
		    stream.on('exit', function(code, signal) {
		      console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
		    }).on('close', function() {
		      console.log('Stream :: close');
		      conn.end();
		    }).on('data', function(data) {
		      console.log('STDOUT: ' + data);
		    }).stderr.on('data', function(data) {
		      console.log('STDERR: ' + data);
		    });
		  });
		}).connect({
		  host: ip,
		  port: 22,
		  username: username,
		  password: password
		});


	}


};