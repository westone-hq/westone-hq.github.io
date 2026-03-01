import React from 'react';
import type { InputProps, TextAreaProps, SelectProps } from '../../../types';

// 공통 폼 인풋 컴포넌트 — TextInput / TextAreaInput / SelectInput, 에러 시 하단 메시지 표시
const baseLabelStyles = "block text-sm font-medium text-neutral-500 mb-1 transition-colors duration-300 group-focus-within:text-white";
const baseInputStyles = "w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors duration-300";

export const TextInput: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    return (
        <div className={`group relative mb-8 ${className || ''}`}>
            <label htmlFor={props.id} className={baseLabelStyles}>
                {label}
            </label>
            <input
                {...props}
                className={`${baseInputStyles} ${error ? 'border-red-500' : ''}`}
            />
            {error && <span className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export const TextAreaInput: React.FC<TextAreaProps> = ({ label, error, className, ...props }) => {
    return (
        <div className={`group relative mb-8 ${className || ''}`}>
            <label htmlFor={props.id} className={baseLabelStyles}>
                {label}
            </label>
            <textarea
                {...props}
                className={`${baseInputStyles} resize-none min-h-[100px] ${error ? 'border-red-500' : ''}`}
            />
            {error && <span className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export const SelectInput: React.FC<SelectProps> = ({ label, options, error, className, ...props }) => {
    return (
        <div className={`group relative mb-8 ${className || ''}`}>
            <label htmlFor={props.id} className={baseLabelStyles}>
                {label}
            </label>
            <div className="relative">
                <select
                    {...props}
                    className={`${baseInputStyles} appearance-none cursor-pointer ${error ? 'border-red-500' : ''}`}
                >
                    <option value="" disabled className="bg-neutral-900 text-neutral-500">선택해주세요</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* 커스텀 화살표 아이콘 */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500 group-focus-within:text-white transition-colors">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            {error && <span className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</span>}
        </div>
    );
};
