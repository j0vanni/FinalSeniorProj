
import { Alert, Appearance, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Polyline, Circle } from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';
//import { request, PERMISSIONS } from 'react-native-permissions';
import { Component } from 'react';
import { decode, encode } from "@googlemaps/polyline-codec";

export default class Map extends Component {

  // state = {
  //   coordinates: [
  //     { name: '1', latitude:  , longitude: },
  //     { name: '2', latitude:  , longitude: },
  //     { name: '3', latitude:  , longitude: },
  //     { name: '4', latitude:  , longitude: },
  //   ]
  // }

  //var polyline = require('@mapbox/polyline');

  // polyline.decode('qzswFzjxaMj@r@T|@tAdHTf@TfAVnAj@jC|@hEbBnIbA~ELt@Bn@Z~AfAnFvAxG^lBBAr@StAc@dBc@~A@n@Ql@c@NMV~BW~@]xAw@xDmEvTg@jBm@~As@tAy@jAA~@eAt@kAj@}Q~H}@f@w@h@m@n@eGzIa@v@aAlBm@nAu@bB}DdK[bAub@trAaSfn@cAxCmEnL{KlZ}AfEMZ[x@aGtO[pAOjAEhAHdARA^z@p@v@xEpDjDhCTPbR|MX\V\d@dANf@Ff@PrAThDH|NJpRJjBRfBZ~Ad@zAn@rAt@lA~@jAGtG^j@Xr@Tt@|D~OH~@?~@Ez@Mv@Yr@@n@i@l@wElEQLe@Ti@Hm@?uDEi@@e@Jc@Na@V_@[@k@rAqFlPea@dkAya@pqAGTARCRJjCFdCIf@_J~XGf@Eb@D@F^N\RZ\V|HfFwCmAMIa@_@iApDgAfDeAfDMd@i@[k@@YSe@YUQCFMP[PWFW?YGYOSUGME?Y?]?cAAsA@', 6);
  // polyline.toGeoJSON()

  // showNYITMessage = () => {
  //     Alert.alert(
  //       'NYIT',
  //       [{
  //         text: 'OK',
  //         // onPress={}
  //       }]
        
  //     )
  //   }

  //decodeURI = ('qzswFzjxaMj@r@T|@tAdHTf@TfAVnAj@jC|@hEbBnIbA~ELt@Bn@Z~AfAnFvAxG^lBBAr@StAc@dBc@~A@n@Ql@c@NMV~BW~@]xAw@xDmEvTg@jBm@~As@tAy@jAA~@eAt@kAj@}Q~H}@f@w@h@m@n@eGzIa@v@aAlBm@nAu@bB}DdK[bAub@trAaSfn@cAxCmEnL{KlZ}AfEMZ[x@aGtO[pAOjAEhAHdARA^z@p@v@xEpDjDhCTPbR|MX\V\d@dANf@Ff@PrAThDH|NJpRJjBRfBZ~Ad@zAn@rAt@lA~@jAGtG^j@Xr@Tt@|D~OH~@?~@Ez@Mv@Yr@@n@i@l@wElEQLe@Ti@Hm@?uDEi@@e@Jc@Na@V_@[@k@rAqFlPea@dkAya@pqAGTARCRJjCFdCIf@_J~XGf@Eb@D@F^N\RZ\V|HfFwCmAMIa@_@iApDgAfDeAfDMd@i@[k@@YSe@YUQCFMP[PWFW?YGYOSUGME?Y?]?cAAsA@')
  //Appearance

  // componentDidMount(){
  //   this.requestLocationPermission();
  // };

  // requestLocationPermission = async () => {
  //   var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //   console.log('Android: ' + response);

  //   if(response === 'granted'){
  //     this.locateCurrentPosition();
  //   }
  // }
  

  getpolylines = () => {
      this.path
  }

  // locateCurrentPosition = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(JSON.stringify(position));
  //     }
  //   )
  // }

  


render() {

    const encoded ="qzswFzjxaMj@r@T|@tAdHTf@TfAVnAj@jC|@hEbBnIbA~ELt@Bn@Z~AfAnFvAxG^lBBAr@StAc@dBc@~A@n@Ql@c@NMV~BW~@]xAw@xDmEvTg@jBm@~As@tAy@jAA~@eAt@kAj@}Q~H}@f@w@h@m@n@eGzIa@v@aAlBm@nAu@bB}DdK[bAub@trAaSfn@cAxCmEnL{KlZ}AfEMZ[x@aGtO[pAOjAEhAHdARA^z@p@v@xEpDjDhCTPbR|MX\V\d@dANf@Ff@PrAThDH|NJpRJjBRfBZ~Ad@zAn@rAt@lA~@jAGtG^j@Xr@Tt@|D~OH~@?~@Ez@Mv@Yr@@n@i@l@wElEQLe@Ti@Hm@?uDEi@@e@Jc@Na@V_@[@k@rAqFlPea@dkAya@pqAGTARCRJjCFdCIf@_J~XGf@Eb@D@F^N\RZ\V|HfFwCmAMIa@_@iApDgAfDeAfDMd@i@[k@@YSe@YUQCFMP[PWFW?YGYOSUGME?Y?]?cAAsA@";
  //console.log(decode(encoded, 5));

    const path = decode(encoded, 5)
    console.log(path)

  return (
      <MapView provider={PROVIDER_GOOGLE} 
      showsUserLocation = {true}
      style = {styles.map}
      scrollEnabled = {true}
      region={{
          latitude: 40.769842,
          longitude: -73.980846,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>

        <Circle 
        center={{ latitude: 40.767965, longitude:-73.981929 }}
        radius= {10}
        fillColor={'rgba(200, 300, 200, 0.5)'}>

        </Circle>
        {/* coordinates={[
            
			{ latitude: 37.8025259, longitude: -122.4351431 }, */}
          <Polyline 
          
          coordinates={[{latitude: path[0][0], longitude:path[0][1]}]}>

          </Polyline>
        <Marker
        coordinate={{latitude:40.769699 , longitude:-73.982567}}
        title = {'NYIT'}>

          <Callout   /*onPress={this.showNYITMessage}/>*/ >
            <Text>
              New York Institute of Technology
            </Text>
          </Callout>
        </Marker>

      </MapView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    
  }
});
