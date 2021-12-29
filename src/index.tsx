import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './globalStyle';
import { dartTheme } from './theme';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={dartTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
