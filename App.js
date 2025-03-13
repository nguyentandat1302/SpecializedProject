import { NavigationContainer } from '@react-navigation/native';
import MainRouter from './router/customer/MainRouter';

const App = () => {
    return (
        <NavigationContainer>
            <MainRouter />
        </NavigationContainer>
    );
};

export default App;
