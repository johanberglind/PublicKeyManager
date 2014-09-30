#PublicKeyManager

Public Key Manager is a simple way of managing, creating and distributing your public-key to a server to enable password-less authentication.
PBM is built with Node.js and node-webkit. For now it's not completely asynchronous, but that will improve over time.

![](https://raw.githubusercontent.com/johanberglind/PublicKeyManager/master/sc.png) 

**Please do not use PBM currently, it's missing a lot of features and have not been tested properly.**

###Current version: 0.0.1

##TODO:
* Implement transfer of public-key to a user-specified server.
* Implement storage backend using web-sql for storing server info.
* Implement build scripts for all major platforms (perhaps installer for Windows, deb/aur/rpm-package)
* Create releases page.
* ...

##Dependencies:
* node-open
* shell-js

These are only required if you are not using a binary version of PKM, since the binary version includes these.

**If you discover any bugs (which you probably will) or have any suggestions, please report these using Github's issues page.** 

## License: 
MIT License (see LICENSE-file)
