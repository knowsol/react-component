# React Component / Design System

React + Vite + styled-components로 만든 디자인 시스템 연습 프로젝트입니다.
컬러, 타이포그래피, 컴포넌트(Input, Card, Table 등) 가이드를 한곳에 모았습니다.

## 기술 스택

- React 19
- Vite
- styled-components (테마 토큰 기반 스타일링)
- react-router-dom (페이지 라우팅)

## 시작하기

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
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

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

- `/main` — 메인 (카드 메뉴)
- `/color` — 컬러 시스템
- `/typography` — 타이포그래피
- `/component` — 컴포넌트 (Input 등)
