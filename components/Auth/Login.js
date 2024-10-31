import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://backend-aula.vercel.app/app/login', {
                usuario,
                senha,
            });

            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
                console.log("Token armazenado com sucesso:", response.data.token);
                navigation.navigate('Listar');
            } else {
                Alert.alert("Erro", response.data.error);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            Alert.alert("Erro", "Falha ao realizar o login. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Usuário"
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" color="green" onPress={handleLogin} />
            <Button title="Registrar" color="green" onPress={() => navigation.navigate('Registrar')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});

export default Login;
