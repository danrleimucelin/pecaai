import { createGlobalStyle } from 'styled-components'
import { myColors } from './colors'

import 'react-toastify/dist/ReactToastify.css'

const CreateGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    /* user-select: none; */

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  }

  *:focus{
    outline: 0,
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: ${myColors.background};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  label {
    color: #111;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  strong {
    cursor: default;
  }

  select {
    background: #e2e2e2ff;
    border-radius: 3px;
  }
`
export default CreateGlobalStyle
