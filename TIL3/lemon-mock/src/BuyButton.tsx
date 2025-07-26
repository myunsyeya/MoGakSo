import { useEffect } from 'react';

export default function BuyButton({ variantUrl }: { variantUrl: string }) {
  useEffect(() => {
    // 스크립트 중복 삽입 방지
    if (!document.querySelector('script[src="https://app.lemonsqueezy.com/js/lemon.js"]')) {
      const script = document.createElement('script');
      script.src   = 'https://app.lemonsqueezy.com/js/lemon.js';
      script.defer = true;
      document.body.appendChild(script);

      // cleanup ─ unmount 시 스크립트 제거
      return () => {
        document.body.removeChild(script);
      };
    }

    // 이미 스크립트가 존재한다면 cleanup 불필요
    return () => {};
  }, []);

  return (
    <a href={variantUrl} className="lemonsqueezy-button" style={{ marginRight: 12 }}>
      기본 구매
    </a>
  );
}