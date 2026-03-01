// 폼 관련 타입 정의 — ContactFormData 및 인풋 컴포넌트 Props
import type React from 'react';

// 연락처 폼 데이터
export interface ContactFormData {
  name: string;
  email: string;
  source: string;
  stage: string;
  message: string;
  newsletter: boolean;
}

// TextInput 컴포넌트 Props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// TextAreaInput 컴포넌트 Props
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

// SelectInput 컴포넌트 Props
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}
