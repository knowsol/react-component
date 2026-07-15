# React Component / Design System

React + Vite + styled-components로 만든 디자인 시스템 연습 프로젝트입니다.
컬러, 타이포그래피, 컴포넌트(Input, Card, Table 등) 가이드를 한곳에 모았습니다.

## 기술 스택

- React 19
- Vite
- styled-components (테마 토큰 기반 스타일링)
- react-router-dom (페이지 라우팅)

## 가이드 프로젝트 실행

> Node.js가 설치되어 있어야 합니다. (LTS 버전 권장)

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

실행하면 터미널에 주소가 표시됩니다. 브라우저에서 열어 확인하세요.

```
➜  Local:   http://localhost:5173/
```

같은 네트워크의 다른 기기에서 보려면 `Network` 주소를 사용하면 됩니다.

## 사용 가능한 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (HMR 지원) |
| `npm run build` | 프로덕션 빌드 생성 (`dist/`) |
| `npm run build:lib` | 공용 컴포넌트 패키지 빌드 (`dist-lib/`) |
| `npm run pack:local` | 로컬 설치용 `.tgz` 패키지 생성 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

## 로컬 패키지 사용

`npm run pack:local`은 디자인 시스템을 사용하는 사람이 아니라 **이 저장소에서 컴포넌트를 개발하는 사람**이 실행합니다. GitHub/GitLab에 배포하기 전에는 개발자가 패키지 파일을 생성해 사용하는 프로젝트에 전달할 수 있습니다.

```bash
# 디자인 시스템 저장소에서 실행
npm run pack:local
```

프로젝트 루트에 `react-component-0.0.11.tgz`가 생성됩니다. **컴포넌트를 사용하는 프로젝트**에서는 `pack:local`을 실행하지 않고 전달받은 파일만 설치합니다.

```bash
# 컴포넌트를 사용하는 프로젝트에서 실행
npm install ../react-component/react-component-0.0.11.tgz
```

### 새 React 프로젝트에서 사용

같은 PC에서 새 Vite React 프로젝트를 만든다면 다음 순서로 설치합니다.

```bash
npm create vite@latest my-project -- --template react
cd my-project
npm install
npm install styled-components react-router-dom
npm install C:\Users\MIN\git\react-component\react-component-0.0.11.tgz
```

다른 PC에서 사용한다면 `C:\Users\...` 경로를 사용할 수 없으므로 `.tgz` 파일을 새 PC나 프로젝트 폴더로 전달한 뒤 해당 위치에서 설치합니다.

```bash
npm install ./packages/react-component-0.0.11.tgz
```

새 프로젝트의 `src/main.jsx`에 ThemeProvider와 공통 전역 스타일을 연결합니다.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "react-component";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </StrictMode>,
);
```

그다음 필요한 페이지에서 컴포넌트만 가져옵니다.

```jsx
import { Button, Input, PaginatedTableContent } from "react-component";
```

새 프로젝트의 페이지, API, 라우팅은 새 프로젝트에서 별도로 작성합니다. 설치 패키지는 기존 가이드 페이지를 추가하거나 변경하지 않습니다.

사이드 팝업은 본체, 공통 레이어 팝업, 기본 설정을 패키지에서 함께 가져옵니다.

```jsx
import { useState } from "react";
import {
    Button,
    LayerPopup,
    SidebarLayerPopupContent,
    sidebarLayerPopupProps,
} from "react-component";

function SidebarPopupExample() {
    const [open, setOpen] = useState(false);
    const closePopup = () => setOpen(false);

    return (
        <>
            <Button variant="secondary" kind="solid" onClick={() => setOpen(true)}>
                사이드 팝업 열기
            </Button>
            <LayerPopup
                open={open}
                {...sidebarLayerPopupProps}
                onClose={closePopup}
            >
                <SidebarLayerPopupContent onClose={closePopup} />
            </LayerPopup>
        </>
    );
}
```

`GlobalStyle`은 Pretendard가 이미 설치된 환경에서는 별도 설정 없이 사용할 수 있습니다. 폰트 파일을 프로젝트의 `public/assets/fonts`에서 제공한다면 다음과 같이 경로를 전달합니다.

```jsx
<GlobalStyle $fontBaseUrl="/assets/fonts" />
```

패키지를 수정한 뒤에는 `npm run pack:local`을 다시 실행하고 사용하는 프로젝트에서 새 `.tgz`를 재설치합니다.

### 배포 주소 없이 다른 프로젝트에서 사용

`/design-system` 같은 URL은 가이드 사이트를 배포할 때만 필요합니다. 공용 컴포넌트 패키지를 다른 React 프로젝트에서 사용하는 데는 홈페이지 주소가 필요하지 않습니다.

현재 로컬 패키지에는 `src/index.js`에서 공개한 다음 항목만 빌드됩니다.

- Theme와 GlobalStyle
- Button, Input, Dropbox 등 공용 입력 컴포넌트
- Table, Pagination, LayerPopup 등 공용 UI 컴포넌트
- 컴포넌트에서 사용하는 아이콘

`src/pages`, `src/router`, 가이드용 데이터는 패키지에 포함되지 않으므로 설치한 프로젝트의 페이지 내용에는 영향을 주지 않습니다.

컴포넌트 폴더를 직접 복사하는 것도 가능하지만 `@` alias, 공통 Theme, 아이콘 경로와 의존성까지 함께 관리해야 하고 프로젝트마다 코드가 달라질 수 있어 권장하지 않습니다. URL이 정해지기 전에는 `.tgz` 설치 방식을 사용하고, 저장소가 정해진 뒤 Git 또는 사내 npm 패키지 설치 방식으로 전환합니다.

## GitHub/GitLab 저장소에서 설치

GitHub/GitLab 저장소 주소로 직접 설치할 때는 사용하는 프로젝트에서 다음과 같이 실행합니다.

```bash
# GitHub 예시
npm install git+https://github.com/<organization>/<repository>.git#<tag>

# GitLab 예시
npm install git+https://gitlab.com/<group>/<repository>.git#<tag>
```

Git 저장소에서 설치하면 `prepare` 스크립트가 `dist-lib`을 자동으로 생성하므로 사용하는 사람이 `npm run pack:local`을 실행할 필요가 없습니다. 안정적인 설치를 위해 브랜치 이름보다 `v1.0.0` 같은 Git tag를 지정하는 방식을 권장합니다.

저장소에 소스 코드를 push하거나 clone해서 가이드 프로젝트를 실행하는 것도 현재 구조에 영향을 주지 않습니다. `dist-lib`과 `.tgz`는 생성물이므로 Git에는 포함하지 않고 필요할 때 다시 생성합니다.

단, GitHub Pages/GitLab Pages의 하위 경로에 가이드 사이트 자체를 배포하는 경우에는 패키지 설치와 별개로 Vite `base`와 React Router 경로 설정이 필요합니다.

## 폴더 구조

```
src/
  components/   # 재사용 컴포넌트 (Box, Card, Input, Table ...)
  pages/        # 라우트 페이지 (Main, Color, Typography, Component)
  layouts/      # 공통 레이아웃 (Header / Footer)
  router/       # 라우팅 설정
  styles/       # 테마(Theme), 전역 스타일, 공통 styled (Common)
```

## 주요 경로

- `/admin` — 관리자 화면 통합 예시
- `/main` — 메인 (카드 메뉴)
- `/color` — 컬러 시스템
- `/typography` — 타이포그래피
- `/component` — 입력, 선택, 피커 등 폼 컴포넌트
- `/buttons` — 버튼 상태와 조합
- `/table` — 테이블, 헤더, 페이지네이션
- `/gnb` — GNB와 사이드바
- `/tab` — 탭 컴포넌트
- `/layerpop` — 레이어 팝업
