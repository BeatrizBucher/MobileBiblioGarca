import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Atualizar = ({ navigation, route }) => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [editora, setEditora] = useState('');
    const [ano, setAno] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [isbn, setIsbn] = useState('');

    const id = route.params.id;

    const handleAtualizar = () => {
        if (!titulo || !categoria || !autor || !editora || !ano || !quantidade || !isbn) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            titulo,
            categoria,
            autor,
            editora,
            ano,
            quantidade,
            isbn
        };

        axios.put(`http://10.0.2.2:3002/atualizar/${id}`, data)
            .then(response => {
                Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
                setTitulo('');
                setCategoria('');
                setAutor('');
                setEditora('');
                setAno('');
                setQuantidade('');
                setIsbn('');

                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    
                    Alert.alert('Erro', 'ID de usuário não encontrado na base de dados.');
                } else {
                    Alert.alert('Erro', 'Ocorreu um erro ao atualizar o usuário. Por favor, tente novamente.');
                    console.log(error);
                }
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#fff"
                value={titulo}
                onChangeText={setTitulo}
            />
            <TextInput
                style={styles.input}
                placeholder="Autor"
                placeholderTextColor="#fff"
                value={autor}
                onChangeText={setAutor}
            />
            <TextInput
                style={styles.input}
                placeholder="Categoria"
                placeholderTextColor="#fff"
                value={categoria}
                onChangeText={setCategoria}
            />    
            <TextInput
                style={styles.input}
                placeholder="Editora"
                placeholderTextColor="#fff"
                value={editora}
                onChangeText={setEditora}
            />
            <TextInput
                style={styles.input}
                placeholder="Ano de Publicação"
                placeholderTextColor="#fff"
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                placeholderTextColor="#fff"
                value={quantidade}
                onChangeText={setQuantidade}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="ISBN"
                placeholderTextColor="#fff"
                value={isbn}
                onChangeText={setIsbn}
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <Button title="Atualizar" onPress={handleAtualizar} />
                <View style={styles.buttonSpacer} />
                <Button title="Voltar" onPress={() => navigation.goBack()} />
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        width: '85%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonSpacer: {
        width: 20,
    },
});

export default Atualizar;
