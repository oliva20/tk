import React, { PureComponent } from 'react'; 
import style from 'styled-components';
import  { 
    View,
    Text,
    } from 'react-native';

class TransportModal extends React.Component {

    render() {
        return (
            <Container>
                <Header />
                <Body />
            </Container>
        );
    }
}

const Container = styled.View {
        position: absolute,
        background: white,
        width: 100%,
        height: 100%,
        z-index: 100,
} 

const Header = styled.View {
        background: #333,
        height: 150px,
}   

const Body = styled.View {
        background: #eaeaea, 
        height: 900px,
}

export default TransportModal;
