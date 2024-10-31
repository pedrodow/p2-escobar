import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Listar = ({ navigation }) => {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('https://backend-aula.vercel.app/app/produtos', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProdutos(response.data);
            setFilteredProducts(response.data); 
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const filtered = produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.nome}</Text>
            <Image
                source={{ uri: item.imagem }}
                style={styles.productImage}
            />
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Editar" onPress={() => navigation.navigate('Editar', { produto: item, fetchProducts })} color="#4CAF50" />
                <Button title="Excluir" onPress={() => navigation.navigate('Deletar', { produto: item, fetchProducts })} color="#F44336" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar produto pelo nome"
                value={searchTerm}
                onChangeText={handleSearch}
                style={styles.searchInput}
            />
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            <Button title="Adicionar Produto" onPress={() => navigation.navigate('Adicionar', { fetchProducts })} color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    productContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default Listar;
