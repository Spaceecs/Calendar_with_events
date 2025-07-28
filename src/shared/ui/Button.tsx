import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

export function Button({ children, onClick, type = "button", disabled = false }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                bg-blue-600 text-white px-4 py-2 rounded mt-3 
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}
            `}
        >
            {children}
        </button>
    );
}
