import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Editar = ({ route, navigation }) => {
    const { produto, fetchProducts } = route.params;

    const [nome, setNome] = useState(produto.nome);
    const [quantidade, setQuantidade] = useState(String(produto.quantidade));
    const [preco, setPreco] = useState(String(produto.preco));
    const [descricao, setDescricao] = useState(produto.descricao);
    const [imagem, setImagem] = useState(produto.imagem);

    const handleEditar = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error("Token de autenticação não encontrado. Faça login novamente.");
            }

            const response = await axios.put(
                "https://backend-aula.vercel.app/app/produtos",
                {
                    id: produto._id,
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

            console.log("Produto atualizado com sucesso:", response.data);
            Alert.alert("Sucesso", "Produto atualizado com sucesso.");
            fetchProducts();
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao editar produto:", error.message);
            Alert.alert("Erro", error.response?.data?.error || 'Erro ao atualizar produto');
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
            <Button title="Salvar Alterações" onPress={handleEditar} color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
    },
});

export default Editar;
