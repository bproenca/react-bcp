import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }

    render() {
        if (this.setState.hasError) {
            return <h3>{this.state.errorMessage}</h3>;
        } else {
            this.props.children;
        }
        
    }
}

export default ErrorBoundary;