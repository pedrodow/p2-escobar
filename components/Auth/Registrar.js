import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Registrar = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirma, setConfirma] = useState('');

    const handleRegistrar = async () => {
        try {
            const response = await axios.post('https://backend-aula.vercel.app/app/registrar', {
                usuario,
                senha,
                confirma: senha, 
            });

            Alert.alert('Sucesso', 'Usuário registrado com sucesso');
            navigation.navigate('Login'); 
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.response ? error.response.data : error);
            Alert.alert('Erro', error.response?.data?.error || 'Erro ao registrar usuário');
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
            <TextInput
                placeholder="Confirmação de Senha"
                value={confirma}
                onChangeText={setConfirma}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Registrar" onPress={handleRegistrar} color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default Registrar;
