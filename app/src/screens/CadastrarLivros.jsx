import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const CadastrarLivro = ({ navigation }) => {
    const [mensagem, setMensagem] = useState('');
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        categoria: '',
        editora: '',
        ano: '',
        quantidade: '',
        isbn: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastrar = async () => {
        if (!formData.titulo || !formData.categoria || !formData.autor || !formData.editora || !formData.ano || !formData.quantidade || !formData.isbn) {
            setMensagem('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await axios.post('http://10.0.2.2:3002/cadastrar', formData)

            if (response.status === 201) {
                setFormData('')
                setMensagem('Cadastro efetuado com sucesso!!!');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setMensagem('Erro de autenticação ao cadastrar!');
                } else {
                    console.log(error)
                    setMensagem('Erro ao cadastrar');
                }
            } else if (error.request) {
                setMensagem('Não foi possível conectar-se ao servidor. Verifique sua conexão ou se a API está ativa.');
            } else {
                setMensagem('Erro inesperado: ' + error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>

            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('titulo', text)}
                value={formData.titulo}
            />
            <TextInput
                style={styles.input}
                placeholder="Autor"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('autor', text)}
                value={formData.autor}
            />

            <TextInput
                style={styles.input}
                placeholder="Editora"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('editora', text)}
                value={formData.editora}
            />

            <TextInput
                style={styles.input}
                placeholder="Ano de Publicação"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('ano', text)}
                value={formData.ano}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Categoria"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('categoria', text)}
                value={formData.categoria}
            />

            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('quantidade', text)}
                value={formData.quantidade}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="ISBN"
                placeholderTextColor="#fff"
                onChangeText={(text) => handleInputChange('isbn', text)}
                value={formData.isbn}
                keyboardType="numeric"
            />

            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={handleCadastrar}
                    >
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFB900',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
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
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%',
        marginTop: 20,
    },
    button: {
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    customButton: {
        backgroundColor: '#F6502E',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    mensagem: {
        color: 'red',
        marginTop: 10,
    },
});

export default CadastrarLivro;