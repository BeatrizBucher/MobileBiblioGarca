import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={require('../../img/senai.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Home</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Cadastrar')}
        >
          <Text style={styles.buttonText}>Cadastrar Livro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('ListarLivros')}
        >
          <Text style={styles.buttonText}>Listar Livros</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Deletar')}
        >
          <Text style={styles.buttonText}>Deletar Livros</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB900',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '80%',
  },
  customButton: {
    backgroundColor: '#F6502E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:5
  },
   logo: {
    width: 150,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default HomeScreen;