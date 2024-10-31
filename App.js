import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registrar from './components/Auth/Registrar';
import Login from './components/Auth/Login';
import Listar from './components/Products/Listar';
import Adicionar from './components/Products/Adicionar';
import Editar from './components/Products/Editar';
import Deletar from './components/Products/Deletar';
import Procurar from './components/Products/Procurar';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Listar" 
                    component={Listar} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Registrar" 
                    component={Registrar} 
                    options={{ headerShown: true }} />
                <Stack.Screen 
                    name="Adicionar" 
                    component={Adicionar} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Editar" 
                    component={Editar} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Deletar" 
                    component={Deletar} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Procurar" 
                    component={Procurar} 
                    options={{ headerShown: true }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
