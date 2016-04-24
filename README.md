# house-automation
House automation

This project is a small JS application for simulating house automation.
Technologies used: HTML, CSS, JavaScript, jQuery, Grunt

The applications consists of:
 - a room which visually shows the actions you are performing to the house.
 - a control panel where you can update automated systems in the house, these buttons trigger the animations and the http HTTP to update the modified state.

 The room initially communicates with the server to find out the status of the home.
 Functionalities:
 - Turn light on/off
 - Water plant
 - Curtains on/off
 - Temperature increase/decrease
 - Photo slideshow on/off
 - TODO Disco mode

 * The application is responsive and was tested on Chrome and Safari

 How to run the app (2 options):

 1. Run a plain HTTP server in the 'app' folder of the application

 2. If you are using Node, you can run:
 -> npm install
 -> grunt server

 This second mode was used at development time because as configured in 'Gruntfile.js' it starts a server at http://localhost:3000 and live reloads at file changes.
