import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
    position: relative;
  }
  h2 {
    font-family: 'Nunito', sans-serif;
    color: #1c1c1c;
  }
  .inner-container {
    padding: 20px 0;
  }
  .two-half {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
  input,
  textarea,
  select {
    width: 96%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    background-color: #ffffff;
    padding: 11px 9px 7px;
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 35px;
    //background-image: url();
    background-repeat: no-repeat;
    background-position: 12px;
    &:focus {
      outline: 2px solid #f9d132;
      outline-radius: 4px;
    }
  }
  button,
  input[type='submit'] {
    background-color: #f9d132;
	border-radius: 5px;
	border: none;
	cursor:pointer;
	color: black;
	font-family: 'Nunito', sans-serif;
	font-size: 16px;
	padding:15px;
	min-width: 268px;
	text-decoration:none;
	position: relative;
	margin-top: 35px;
	z-index: 2;
	transition: color 0.5s;
	
	&:hover {
	  color: white;
	}
	
	&:focus {
	  outline: none;
	}
  }
  
  .card-type {
    font-family: 'Nunito',sans-serif;
    position: absolute;
    top: 44px;
    right: 0px;
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
  }
   
  
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #c7c6c6 0%, #f9d132 50%, #c7c6c6 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
