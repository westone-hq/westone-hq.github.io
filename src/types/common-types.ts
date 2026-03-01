// 공통 유틸리티 타입 정의 — 제네릭/색상/Result 타입

// ID 브랜드 타입 — 타입 안전한 ID 구분
export type ID<T extends string = string> = string & { __brand: T };

// 모든 프로퍼티를 재귀적으로 optional로 변환
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 지정된 프로퍼티를 required로 강제
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// 모든 프로퍼티를 nullable로 변환
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// null/undefined 제거 유틸리티
export type NonNullableType<T> = T extends null | undefined ? never : T;

// 색상 타입
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type HexColor = `#${string}`;
export type Color = RGBColor | HexColor | string;

export type URL = string;
export type DateString = string;

// Result 타입 — 함수형 에러 핸들링 (Success | Failure)
export interface Success<T> {
  success: true;
  data: T;
}

export interface Failure {
  success: false;
  error: Error;
}

export type Result<T> = Success<T> | Failure;
