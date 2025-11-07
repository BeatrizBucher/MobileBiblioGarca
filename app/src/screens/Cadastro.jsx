
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";
import axios from 'axios';

export default function Cadastro({ navigation }) {

    const [mensagem, setMensagem] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastrar = async () => {
        if (!formData.nome || !formData.email || !formData.senha) {
            setMensagem('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await axios.post('http://10.0.2.2:3002/cadastrarUser', formData)

            if (response.status === 201) {
                setFormData('')
                setMensagem('Cadastro efetuado com sucesso!!!');
                navigation.navigate('Login');
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
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.titulo}>Cadastrar</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => handleInputChange('nome', text)}
                            value={formData.nome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => handleInputChange('email', text)}
                            value={formData.email}

                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => handleInputChange('senha', text)}
                            value={formData.senha}
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
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={styles.buttonText}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFB900',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,

    },
    input: {
        borderColor: '#fff',
        placeholderTextColor: '#fff',
        borderWidth: 3,
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        fontSize: 16,
    },
  buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
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