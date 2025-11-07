import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Cadastro from '../../screens/Cadastro';
import Home from '../../screens/Home';
import CadastrarLivro from '../../screens/CadastrarLivros';
import Deletar from '../../screens/Deletar';
import ListarLivros from '../../screens/ListarLivros';
import Atualizar from '../../screens/Atualizar';

export default function Navigation() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}  />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Cadastrar" component={CadastrarLivro} options={{ headerShown: false }} />
                <Stack.Screen name="Deletar" component={Deletar} options={{ headerShown: false }} />
                <Stack.Screen name="Atualizar" component={Atualizar} options={{ headerShown: false }} />
                <Stack.Screen name="ListarLivros" component={ListarLivros} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
