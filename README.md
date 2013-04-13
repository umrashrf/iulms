# Introduction

The source code has two major parts where you can contribute. One is frontend (*sencha* folder) and other is backend (*service* folder). Other parts are derived from sencha like android, ios, chrome, etc. Frontend uses JavaScript and Sencha Touch SDK to draw controls and views on screen whereas backend is written in PHP to call iulms.edu.pk to get student data. You can select among these based on what you're fluent with.

# Installation

I initially developed this application on windows (windows 7) and if you're on windows, you can use WAMP server software to get the source code running on your computer.

1. You need to [download wamp](http://www.wampserver.com/en/) software first of all but if you already have it, this means you have **C:\wamp\www** folder on your hard drive.

2. You can download source code by forking on this github repository or just download zip file. How this is done is out of the scope of this guide but you can read about how can you get git working on windows reading here [http://kylecordes.com/2008/git-windows-go](http://kylecordes.com/2008/git-windows-go) and to clone the repository.

3. Once cloned/downloaded the source, you can create a new folder under **C:\wamp\www** of name **iu** and copy the **sencha** and **service** folders from source folder to this wamp folder.

4. Start wamp if it's not already running and hit this URL [http://localhost/iu/sencha/](http://localhost/iu/sencha/) in your browser (Chrome or Safari) and see it working.

# Current Development

I am now maintaining and developing this app on Ubuntu 12.04 so if you are on Ubuntu you can use Apache server with PHP to run this. Make sure PHP has CURL installed.

Apache on Ubuntu has document root at **/var/www** which is Windows equivalent of **C:\wamp\www** and that's where you will create **iu** folder and then follow Step 3 and Step 4 from above windows guide.

Happy Hacking!