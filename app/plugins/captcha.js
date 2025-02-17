'use client';

import { useEffect, useRef, useState } from 'react';
import { generateCaptchaText, drawCaptcha } from '@/lib/captcha';

export const Captcha = ({ onCaptchaChange }) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    onCaptchaChange(newCaptcha);
    
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, newCaptcha);
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <canvas
        ref={canvasRef}
        width={150}
        height={50}
        className="border border-gray-300 rounded-md"
      />
      <button
        type="button"
        onClick={refreshCaptcha}
        className="p-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
};
