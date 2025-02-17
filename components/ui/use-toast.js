"use client";
import * as React from "react";

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    setToasts((currentToasts) => [...currentToasts, toast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.slice(1));
    }, 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg p-4"
          >
            <h3 className="font-semibold">{toast.title}</h3>
            <p className="text-sm text-gray-600">{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}