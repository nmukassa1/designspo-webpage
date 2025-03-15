
import React, { createContext, useContext, useReducer, useState } from 'react';

interface HamburgerMenuState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const HamburgerMenuContext = createContext<HamburgerMenuState | undefined>(undefined);


export function useHamburgerMenu() {
    if (!HamburgerMenuContext) {
        throw new Error('useHamburgerMenu must be used within a HamburgerMenuProvider');
    }
    return useContext(HamburgerMenuContext);
}

export function HamburgerMenuProvider({ children } : { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <HamburgerMenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </HamburgerMenuContext.Provider>
    );
}