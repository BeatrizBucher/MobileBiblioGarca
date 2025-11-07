import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fazerLogin = async () => {

        try {
            if(!email || !senha){
                alert("Falha no login", "Por favor preencha todos os campos")
            }
            else{
                 const response = await fetch('http://10.0.2.2:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigation.replace('Home', {
                    screen: 'Home',
                    params: { loginToken: data.token },
                });
              
            }
            else {
                Alert.alert('Falha no login', 'Email ou senha incorretos');
            }
            }
           
        } catch (error) {
            Alert.alert('Erro');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    {/* <Icon name="person" size={200} color="#009dff" style={styles.icone_login} /> */}
                    <View>
                        <Text style={styles.texto}>Bem-Vindo!</Text>
                        <Text style={styles.subTitulo}>Faça login para continuar</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#fff"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <View style={styles.btn}>
                        <Button title="Entrar" color='#F6502E' onPress={fazerLogin} />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB900',
        justifyContent: 'center',
        padding: 20,
    },
    // icone_login: {
    //     alignSelf: 'center',
    //     marginBottom: 30,
    // },
    texto: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    },

    subTitulo: {
        color: '#F6502E',
        fontSize: 20,
        marginBottom: 60,

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
    btn: {
        marginVertical: 20,
        borderRadius: 10,
    },
    link: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
    },
});









