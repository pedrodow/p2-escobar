import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adicionar = ({ navigation, route }) => {
    const { fetchProducts } = route.params;
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');

    const handleAdicionar = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error("Token de autenticação não encontrado. Faça login novamente.");

            const response = await axios.post(
                "https://backend-aula.vercel.app/app/produtos",
                {
                    nome,
                    quantidade: parseInt(quantidade, 10),
                    preco: parseFloat(preco),
                    descricao,
                    imagem,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Produto adicionado com sucesso:", response.data);
            fetchProducts();
            navigation.navigate('Listar');
        } catch (error) {
            console.error("Erro ao adicionar produto:", error.message);
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome do Produto"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
                style={styles.input}
            />
            <TextInput
                placeholder="Preço"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <TextInput
                placeholder="Imagem (URL ou Base64)"
                value={imagem}
                onChangeText={setImagem}
                style={styles.input}
            />
            <Button title="Adicionar Produto" onPress={handleAdicionar} color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default Adicionar;
