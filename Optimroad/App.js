import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View,Modal ,TextInput,Image,KeyboardAvoidingView, Touchable, TouchableOpacity} from 'react-native';
import React, { useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";



export default function App() {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [zindex1, setZindex1] = useState(1);
 
  


  return (
    <View style={styles.container}  >
    
      <Pressable style={{height:'10%',width:'95%',zIndex: zindex1 ,backgroundColor:'white',marginTop:40,flexDirection:'row' ,borderRadius:25}} onPress={() => {setModalVisible(!modalVisible); setZindex1(0)}}  >
        <View style={{flexDirection:'column'}}>
        <Image source={require('./assets/2.png')} style={{marginTop:22,marginLeft:22}}  />
        <Text style={{fontWeight:'bold',fontSize:10,marginLeft:12,marginTop:2}}>
          optimRoad
        </Text>
        </View>
        <TextInput style={{height: 40,margin: 12,padding: 10}} placeholder="trouvez votre OPTIMROAD" onPressIn={() => {setModalVisible(!modalVisible); setZindex1(0)}} editable={false} />
      </Pressable>


      <View style={styles.centeredView}>
      <Modal
        
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        <Pressable style={{flex: 1,justifyContent: "flex-end",alignItems: "center"}} onPress={()=>{setModalVisible(!modalVisible); setZindex1(1)}}>
          <View style={styles.modalView}>


            <Text style={styles.modalText}>Definir votre iteneraire</Text>
            <View style={{flexDirection:'row'}}>
              <TextInput style={{height: 52,width:250,margin: 12,padding: 10,borderRadius:15,backgroundColor:'#00000020'}} placeholder="Votre depart ?" />
              <View style={{flexDirection:'column'}}>
                <Image source={require('./assets/Loction.png')} style={{marginTop:17,marginLeft:17}}/>
                <Text style={{marginTop:5}}>
                  Ma position
                </Text>
              </View>
            </View>

            <TextInput style={{height: 52,width:328,margin: 12,padding: 10,borderRadius:15,backgroundColor:'#00000020'}} placeholder="Votre Destination ?"  />
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={()=>{setModalVisible(!modalVisible);setModalVisible2(!modalVisible2)}}
            >
              <Text style={styles.textStyle} >Demarrer</Text>

            </Pressable>
            <Text style={{marginRight:190,marginTop:15}}>
              Localisations recentes
            </Text>
            <TouchableOpacity style={{width:328,height:54,backgroundColor:'#00000020',borderRadius:15,marginTop:10,flexDirection:'row'}}>
                <Image source={require('./assets/Work.png')} style={{margin:15}}/>
                <View style={{flexDirection:'column',marginTop:9}}>
                  <Text style={{fontWeight:'bold'}}>
                    HIS
                  </Text>
                  <Text style={{color:'#47B5FF'}}>
                    heure d'arrivee prevue : 40min
                  </Text>

                </View>
            </TouchableOpacity>
            
          </View>
        </Pressable>
      </Modal>
    </View>


    <View style={styles.centeredView}>
      <Modal
        
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >

        <Pressable style={{flex: 1,justifyContent: "flex-end",alignItems: "center"}} onPress={()=>{setModalVisible2(!modalVisible2); setZindex1(1)}}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Navigation</Text>
          <View style={{flexDirection:'column',alignItems:'flex-start'}}>
            <Text style={{fontSize:20,fontWeight:'bold',marginTop:10}}>Temps restant estime :</Text>
            <Text style={{fontSize:30,fontWeight:'bold',marginTop:5}}>42 minutes</Text>
            <Text style={{fontSize:20,color:'grey',marginTop:100}}>Sur rue Mirod,</Text>
            <Text style={{fontSize:20,color:'grey'}}>Cite Bellaire.</Text>
            <TouchableOpacity style={{height:41,width:280,backgroundColor:'#FC4747',justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:20}} onPress={()=>{setModalVisible2(!modalVisible2); setZindex1(1)}}>
              <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Arreter la navigation</Text>
            </TouchableOpacity>
          </View>
          


          </View>
        </Pressable>
      </Modal>
    </View>




      <MapView style={styles.map}>
        <Marker coordinate={{
      latitude: 35.67714827145542,
      longitude: 139.6551462687416,
    }} 
    />
      </MapView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    
    backgroundColor: "white",
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    padding: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height:'60%',
    width:'100%',
    flexDirection:'column'

  },
  button: {
    height:41,
    width:128,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginLeft:230,
    marginTop:7,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#47B5FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:17
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:25,
    fontWeight:'bold'

  }
});
