import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Deletar = ({ route, navigation }) => {
    const { produto, fetchProducts } = route.params; 

    const handleDeletar = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.');
            return;
        }

        try {
            await axios.delete(`https://backend-aula.vercel.app/app/produtos`, {
                data: { id: produto._id }, 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Sucesso', 'Produto excluído com sucesso');
            fetchProducts();
            navigation.navigate('Listar'); 
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Erro ao excluir produto');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir o produto ${produto.nome}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: handleDeletar },
            ]
        );
    };

    return (
        <View style={{ padding: 10 }}>
            <Text>Você está prestes a excluir o produto: {produto.nome}</Text>
            <View style={{ marginBottom: 5, marginTop: 5 }}>
                <Button title="Excluir Produto" onPress={confirmDelete} color="#4CAF50" />
            </View>
            <Button title="Voltar" onPress={() => navigation.goBack()} color="#4CAF50" />
        </View>
    );
};

export default Deletar;
