import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from "@react-native-vector-icons/ionicons";
import axios from 'axios';

const ListarLivros = ({ navigation }) => {
  const [data, setData] = useState([]);

  const carregarDados = () => {
    axios.get('http://10.0.2.2:3002/listarUsuario')
      .then(response => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setData(sortedData);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleAtualizar = (id) => {
    navigation.navigate('Atualizar', { id });
  };

  const handleDeletar = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://10.0.2.2:3002/deletar/${id}`)
              .then(() => {
                Alert.alert('Sucesso', 'Usuário excluído com sucesso.');
                carregarDados();
              })
              .catch(error => {
                console.log(error);
                Alert.alert('Erro', 'Erro ao excluir usuário.');
                console.log(error);
              });
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.id}</Text>
      <Text style={styles.itemText}>{item.titulo}</Text>
      <Text style={styles.itemText}>{item.categoria}</Text>
       <Text style={styles.itemText}>{item.autor}</Text>
        <Text style={styles.itemText}>{item.editora}</Text>
        <Text style={styles.itemText}>{item.ano}</Text>
        <Text style={styles.itemText}>{item.quantidade}</Text>
        <Text style={styles.itemText}>{item.isbn}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleAtualizar(item.id)}
        >
       <Ionicons name="exit" size={16} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDeletar(item.id)}
        >
          <Ionicons name="trash-bin" size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livros</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Titulo</Text>
        <Text style={styles.headerText}>Categoria</Text>
        <Text style={styles.headerText}>Autor</Text>
        <Text style={styles.headerText}>Editora</Text>
        <Text style={styles.headerText}>Ano</Text>
        <Text style={styles.headerText}>Quantidade</Text>
        <Text style={styles.headerText}>ISBN</Text>
        <Text style={[styles.headerText, { flex: 1.5 }]}>Ações</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.navButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#FFB900',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#fff',
  },
  tableHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#F6502E', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFB900',
  },
  headerText: { 
    flex: 1, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 8,
    color: '#fff',
  },
  list: { 
    width: '100%' 
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  itemText: { 
    color: 'black', 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 10,
  },
  actionButtons: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '60%', 
    marginBottom: 20
  },
  navButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListarLivros;