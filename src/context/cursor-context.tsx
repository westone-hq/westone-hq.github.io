import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { CursorType, type CursorTypeValue, type CursorContextType } from '../types';

// 커스텀 커서 타입 전역 상태 (default / drag / play / view)
const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [cursorType, setCursorType] = useState<CursorTypeValue>(CursorType.Default);

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
};
