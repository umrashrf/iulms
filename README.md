# Introduction

The source code has two parts where you can contribute. One is front end (*www* folder) and other is back end (*service* folder). Front end uses JavaScript and Sencha Touch SDK to draw controls and views on screen whereas back end is written in PHP to call iqra.edu.pk to get student data. You can select among these based on what you're fluent with.

# Installation

I developed this application on windows (windows 7) and if you're on windows, you can use WAMP server software to get the source code running on your computer.

1. You need to (http://www.wampserver.com/en/ "download wamp") software first of all but if you already have it, this means you have **C:\wamp\www** folder on your hard drive.

2. You can download source code by forking on this github repository. How this is done is out of the scope of this guide but you can read about how can you get git working on windows reading here http://kylecordes.com/2008/git-windows-go and to clone the repository.

3. Once cloned/downloaded the source, you can create a new folder under **C:\wamp\www** of name **iu** and copy the **www** and **service** folders from source folder to this wamp folder.

4. Start wamp if it's not already running and hit this URL http://localhost/iu/www/ in your browser (Chrome or Safari) and see it working.