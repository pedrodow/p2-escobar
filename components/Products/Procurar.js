import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Procurar = ({ navigation }) => {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProdutos = async () => {
        const token = await AsyncStorage.getItem('userToken');

        try {
            const response = await axios.get('https://backend-aula.vercel.app/app/produtos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProdutos(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.response.data.error || 'Erro ao buscar produtos');
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const filteredProdutos = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View>
            <TextInput
                placeholder="Buscar produto"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} 
            />
            <FlatList
                data={filteredProdutos}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.preco}</Text>
                    </View>
                )}
            />
            <Button title="Voltar" onPress={() => navigation.goBack()} color="#4CAF50" />
        </View>
    );
};

export default Procurar;
