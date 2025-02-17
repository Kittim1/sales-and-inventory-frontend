"use client";
import * as React from "react";
import { Toast, ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { Button } from "./button";

export function Toaster({ title, description, open, onOpenChange }) {
  return (
    <ToastProvider>
      <Toast open={open} onOpenChange={onOpenChange}>
        <div className="bg-white border rounded-lg shadow-lg p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}