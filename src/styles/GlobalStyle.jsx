import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  :root {
    font: ${({ theme }) => theme.font.size.large}/${({ theme }) => theme.font.lineHeight} ${({ theme }) => theme.font.sans};
    color: ${({ theme }) => theme.color.neutral[900]};
    background: ${({ theme }) => theme.color.pure.white};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media (max-width: 1024px) {
      font-size: ${({ theme }) => theme.font.size.medium};
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
	margin: 0;
	padding:0;
  }

  body {
    font-family: ${({ theme }) => theme.font.sans};
  }
  ol,
  ul,
  li {
    list-style: none;
  }

  p,
  span {
    word-break: keep-all;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
  }
`;

export default GlobalStyle;
