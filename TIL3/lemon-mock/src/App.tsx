import { useEffect, useState } from 'react';
import axios from 'axios';
import BuyButton from './BuyButton';
import CustomCheckoutForm from './CustomCheckoutForm';

type Product = { id: string; attributes: any };
type Variant = { id: string; attributes: any; relationships: any };

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    axios.get('/api/products').then(r => setProducts(r.data.data || []));
    axios.get('/api/variants').then(r => setVariants(r.data.data || []));
  }, []);

  // product-id → variants 배열 매핑
  const variantsByProduct: Record<string, Variant[]> = {};
  variants.forEach(v => {
    const productId = v.relationships.product.data.id;
    (variantsByProduct[productId] = variantsByProduct[productId] || []).push(v);
  });

  return (
    <div>
      <h1>상품 & 커스텀 결제 데모</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(p => {
          const storeId = String(p.attributes.store_id);
          const vList   = variantsByProduct[p.id] || [];

          return (
            <li key={p.id} style={{ margin: '24px 0', border: '1px solid #ccc', padding: 16 }}>
              <h2>{p.attributes.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: p.attributes.description }} />
              <BuyButton variantUrl={p.attributes.buy_now_url} />

              {vList.length > 0 && (
                <>
                  <button onClick={() => setExpanded(e => ({ ...e, [p.id]: !e[p.id] }))}>
                    {expanded[p.id] ? '옵션 닫기 ▲' : '옵션 보기 ▼'}
                  </button>

                  {expanded[p.id] && (
                    <ul style={{ paddingLeft: 12 }}>
                      {vList.map(v => (
                        <li key={v.id} style={{ marginTop: 8 }}>
                          <b>{v.attributes.name}</b> ({v.attributes.price_formatted})
                          <CustomCheckoutForm storeId={storeId} variantId={String(v.id)} />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}