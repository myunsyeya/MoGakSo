import { useState } from 'react';

interface Props {
  storeId: string;
  variantId: string;
}

export default function CustomCheckoutForm({ storeId, variantId }: Props) {
  const [amount, setAmount] = useState<number>(290);
  const [email, setEmail]   = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch('/api/create-checkout', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ amount, store_id: storeId, variant_id: variantId, email })
    });
    const data = await resp.json();
    if (data.checkout_url) window.location.href = data.checkout_url;
    else alert('체크아웃 생성 실패');
  };

  return (
    <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #eee', paddingTop: 8 }}>
      <input
        type="number" min={1} value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="금액" style={{ marginRight: 8 }}
      />
      <input
        type="email" value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="이메일" required style={{ marginRight: 8 }}
      />
      <button type="submit">커스텀 체크아웃</button>
    </form>
  );
}