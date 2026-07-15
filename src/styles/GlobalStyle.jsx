import { createGlobalStyle, css } from "styled-components";

const fontFaces = (fontBaseUrl) =>
    fontBaseUrl &&
    css`
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-ExtraLight.woff2") format("woff2");
            font-weight: 200;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-Light.woff2") format("woff2");
            font-weight: 300;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-Regular.woff2") format("woff2");
            font-weight: 400;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-Medium.woff2") format("woff2");
            font-weight: 500;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-SemiBold.woff2") format("woff2");
            font-weight: 600;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-Bold.woff2") format("woff2");
            font-weight: 700;
            font-style: normal;
        }
        @font-face {
            font-family: "Pretendard";
            src: url("${fontBaseUrl}/Pretendard-ExtraBold.woff2") format("woff2");
            font-weight: 800;
            font-style: normal;
        }
    `;

const GlobalStyle = createGlobalStyle`
  ${({ $fontBaseUrl }) => fontFaces($fontBaseUrl)}

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
    font-family: ${({ theme }) => theme.font.sans};
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

  /* Air Datepicker 캘린더 기본 테두리색 → #888 (팝업·인라인 모두).
     캘린더는 body에 붙어 컴포넌트 밖이라 여기 글로벌에서 CSS 변수를 덮는다.
     .air-datepicker를 두 번 겹쳐 specificity를 올려 라이브러리 기본값(단일 클래스)을 확실히 이긴다. */
  .air-datepicker.air-datepicker {
    --adp-border-color: #888;
    --adp-border-color-inline: #888;
  }
`;

export default GlobalStyle;
