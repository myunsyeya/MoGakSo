const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const fetch   = require('node-fetch');

dotenv.config();
const LEMON_API = process.env.LEMON_API;

const app = express();
app.use(cors());
app.use(express.json());

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// 상품 목록
app.get('/api/products', async (req, res) => {
  try {
    const resp = await fetch('https://api.lemonsqueezy.com/v1/products', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${LEMON_API}`
      }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'API 호출 실패', details: err });
  }
});

// 옵션(variants) 목록
app.get('/api/variants', async (req, res) => {
  try {
    const resp = await fetch('https://api.lemonsqueezy.com/v1/variants', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${LEMON_API}`
      }
    });
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'API 호출 실패', details: err });
  }
});

// 커스텀 체크아웃 생성
app.post('/api/create-checkout', async (req, res) => {
  try {
    const { amount, variant_id, store_id, email } = req.body;

    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          custom_price: amount,
          product_options: { enabled_variants: [variant_id] },
          checkout_options: {
            button_color: '#7047EB',
            logo: true,
            desc: true,
            discount: true
          },
          checkout_data: {
            email,
            custom: {}
          }
        },
        relationships: {
          store  : { data: { type: 'stores',   id: String(store_id)   } },
          variant: { data: { type: 'variants', id: String(variant_id) } }
        }
      }
    };

    const resp = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        Accept       : 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization : `Bearer ${LEMON_API}`
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (data.data?.attributes?.url) {
      res.json({ checkout_url: data.data.attributes.url });
    } else {
      res.status(500).json({ error: '체크아웃 생성 실패', details: data });
    }
  } catch (err) {
    res.status(500).json({ error: 'API 호출 실패', details: err });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log('API 서버 실행:', PORT));