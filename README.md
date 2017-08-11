# hemera-plugin
clone Url
=========================
https://github.com/tittoxavier/hemera-plugin.git

Prerequisties
============================
1. install "hemera-cli" globally.
2. Set a  "NATS Server".  

Steps
=======================

	Open a tab in terminal
	-------------------------
	1. Run the command "npm install" (Creating node modules).
	2. Run the command "node service.js" (To start the file having the code).

	Open another tab in terminal
	-----------------------------
	1. Run the command "hemera-cli".
	2. Run the command "connect".
	3. Enter the nats server Url.
	4. Enter the username.
	5. Enter the  password.
	4. Run the command "act --pattern topic:api,cmd:playerInfo,name:m4jes".
	
Result
===================
	Check the result in first tab.
