import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
} 

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

html,
body {
  width: 100%;
min-height: 100%;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 1);
 overflow-x: hidden;
  color: #000000;
}
`;
