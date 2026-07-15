import { ThemeProvider } from "styled-components";
import theme from "@/styles/Theme";
import RoutePage from "@/router/RoutePage";
import GlobalStyle from "@/styles/GlobalStyle";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle $fontBaseUrl="/assets/fonts" />
            <RoutePage />
        </ThemeProvider>
    );
}

export default App;
