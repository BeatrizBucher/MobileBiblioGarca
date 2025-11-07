import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Deletar = ({ navigation }) => {
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3002/deletar/${id}`)

      console.log(response.status)

      if (response.status === 204) {
        setMensagem('Registro deletado com sucesso.');
        setId('');
      }
    }
    catch (error) {
      if (error.response || error.response.status === 404) {
        setMensagem('O ID não existe na base de dados');
      } else {
        setMensagem('Erro ao deletar o registro.');
      }
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          placeholder="ID do registro"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.customButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mensagem}>{mensagem}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#F6502E',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  mensagem: {
    color: 'white',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  customButton: {
    backgroundColor: '#F6502E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Deletar;