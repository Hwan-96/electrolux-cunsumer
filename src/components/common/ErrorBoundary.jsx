import React, { Component } from 'react';
import { API_ERROR_MESSAGES } from '@/constants/api';
import styled from 'styled-components';

const ErrorDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ErrorDialogContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorDialogTitle = styled.h2`
  margin: 0 0 16px;
  color: #333;
  font-size: 24px;
`;

const ErrorDialogMessage = styled.div`
  margin-bottom: 24px;
  
  p {
    margin: 0;
    color: #666;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const ErrorDetails = styled.div`
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #d32f2f;

  pre {
    margin: 8px 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const ErrorDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ErrorDialogButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#1976d2' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.primary ? '#1565c0' : '#e0e0e0'};
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // 에러 로깅
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleClose = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.response?.status 
        ? API_ERROR_MESSAGES[this.state.error.response.status] 
        : '알 수 없는 오류가 발생했습니다.';

      return (
        <ErrorDialog>
          <ErrorDialogContent>
            <ErrorDialogTitle>오류 발생</ErrorDialogTitle>
            <ErrorDialogMessage>
              <p>{errorMessage}</p>
              {import.meta.env.MODE === 'development' && (
                <ErrorDetails>
                  <pre>{this.state.error?.toString()}</pre>
                  <pre>{this.state.errorInfo?.componentStack}</pre>
                </ErrorDetails>
              )}
            </ErrorDialogMessage>
            <ErrorDialogActions>
              <ErrorDialogButton onClick={this.handleClose}>
                닫기
              </ErrorDialogButton>
              <ErrorDialogButton 
                onClick={() => window.location.reload()} 
                primary
              >
                페이지 새로고침
              </ErrorDialogButton>
            </ErrorDialogActions>
          </ErrorDialogContent>
        </ErrorDialog>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 