# house-automation
House automation

This project is a small JS application for simulating house automation.
Technologies used: HTML, CSS, FontAwesome(CDN), JavaScript, jQuery(CDN), Grunt

The applications consists of:
 - a room which visually shows the actions you are performing to the house.
 - a control panel where you can update automated systems in the house, these buttons trigger the animations and the HTTP call to update the modified state.

 # DEMO

 The room initially communicates with the server to find out some statuses (light, temperature, curtains).
 Functionalities:

 - Turn light on/off (Simple switcher - gets data from the server, then updates with changed value)
 - Curtains on/off (Simple switcher - same as light on/off)
 - Water plant (Sends call to the server to water plant)
 - Temperature increase/decrease (Gets initial temperature then, when temperature changed, it sends update to the server and also manipulates DOM accordingly)
 - Photo slideshow on/off (Gets list of Photos from server (National Geographic Urls) and slideshows them in the 7 photo frames of the room)
 - Party mode on/off (Plays music, randomly switches colors in the photo frames, animates other room objects)

 > The application is desktop first but responsive.
 > It was tested on Chrome and Safari (Desktop) and also mobile: Chrome on Android and Safari on iOS.
 > Grunt profile was created to obtain a minified version. ( Run 'grunt dist' to get the minified version in 'dist' folder )

 # How to run the app (2 options):

 1. Run a plain HTTP server in the 'app' folder of the application

 2. If you are using Node, you can run:
 -> npm install
 -> grunt server

 > This second mode was used at development time because as configured in 'Gruntfile.js' it starts a server at http://localhost:3000 and live reloads at file changes.


 Assets (images and audio) were found with Google search and modified to fit the desired behaviors.
 The code is written entirely by me except a few lines where the source was specified.
