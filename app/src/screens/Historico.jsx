import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Historico() {
  const [isHistorico, setHistorico] = useState([]);

  useEffect(() => {
    GerarHistorico();
  }, []);

 const GerarHistorico = async () => {
    try {
      const localToken = await AsyncStorage.getItem('tokens');
      if (localToken) {
        const tokenArray = JSON.parse(localToken);
        setHistorico(tokenArray.reverse());
      }
    } catch (error) {
      console.error('Erro');
    }
  };


  return (
    <View style={styles.container}>
          <Text style={styles.titulo}>Token Salvo</Text>
      
        <FlatList
          data={isHistorico}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (

            <View style={styles.item}>
                <View >  
               <Text >Data do login: {item.data}</Text>
             </View>
             
              <Text>
                {item.token}
              </Text>
              
            </View>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#009dff",
  },

  item:{
    marginVertical:5,
  }
 
});

export default Historico;