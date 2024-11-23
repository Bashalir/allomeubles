import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color-white: #FFFFFF;
    --color-light-gray: #F5F5F5;
    --color-dark-gray: #333333;
    --color-accent-yellow: #FFCC00;
    --color-accent-blue: #0077BE;
    
    --font-primary: 'Inter', sans-serif;
  }

  body {
    font-family: var(--font-primary), sans-serif;
    background-color: var(--color-light-gray);
    color: var(--color-dark-gray);
    line-height: 1.6;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Debug styles */
  body::before {
    content: 'Debug: Application Loaded';
    position: fixed;
    top: 10px;
    left: 10px;
    background: red;
    color: white;
    padding: 5px;
    z-index: 9999;
  }
`
