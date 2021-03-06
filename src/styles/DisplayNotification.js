import styled from 'styled-components';

const DisplayError = styled.div`
  
  margin: 16px 0;
  
  .inner {
    background-color: #fae7e8;
    padding: 16px;
    border-radius: 4px;
    border-left: 5px solid #e45460;
    color: #e45460;
    
    h3 {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      text-align: left;
    }
  }
`;

const DisplaySuccess = styled.div`
  
  margin: 16px 0;
  
  .inner {
    background-color: #dff0d8;
    padding: 16px;
    border-radius: 4px;
    border-left: 5px solid #3c763d;
    color: #3c763d;
    
    h3 {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      text-align: left;
    }
  }
`;

export  {DisplayError, DisplaySuccess};