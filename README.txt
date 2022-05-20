Install the following Libraries 

expo install firebase
npm install axios
npm install expo-splash-screen
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-maps
npm install @react-native-community/geolocation
npm install react-native-location
npm install @react-native-async-storage/async-storage
npm install @googlemaps/polyline-codec

To have everything in check run the command "npm update" this will check and download any missing libraries that you missed.

To start the Project just simply have your android studio running and type in the terminal
expo start

In the Firebase folder there is a firebase file that would require you to add your own key and values for the application to work. 
Our key is confidential so it would not be exported out with the application.

You would also need to add your own Google API key in the following file Android > App > SRC > MAIN > AndroidManifest.XML 
