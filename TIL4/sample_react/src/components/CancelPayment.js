import React, { useState } from 'react';
import axios from 'axios';

const CancelPayment = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // 취소할 결제 정보 (사용자가 제공한 정보 + 필수 파라미터)
    const paymentInfo = {
        PCD_PAY_OID: 'ItHomePayment-2025751751696999951',    // 주문번호 (정확한 번호)
        PCD_PAY_DATE: '20250705',                           // 결제일자
        PCD_REFUND_TOTAL: 38987,                            // 환불금액
        PCD_REFUND_TAXTOTAL: 0,                             // 환불 부가세
        PCD_PAYER_NAME: '뿌데-이',                           // 결제자명
        PCD_PAYER_NO: 'test_user_001',                      // 가맹점 회원번호 (테스트용)
        PCD_PAY_GOODS: 'ItHome FOHO 케어 - 생활 관리 자동화',  // 상품명
        PCD_PAYER_EMAIL: 'test@test.com'                    // 결제자 이메일 (테스트용)
    };

    const handleCancel = async () => {
        if (!window.confirm('정말로 이 결제를 취소하시겠습니까?')) {
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:3002/api/cancel', paymentInfo);
            setResult(response.data);
            alert('결제 취소가 완료되었습니다.');
        } catch (err) {
            console.error('취소 오류:', err);
            setError(err.response?.data?.message || '결제 취소 중 오류가 발생했습니다.');
            alert('결제 취소에 실패했습니다: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>결제 취소</h2>
            
            <div style={{ 
                border: '1px solid #ddd', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                backgroundColor: '#f9f9f9'
            }}>
                <h3>취소할 결제 정보</h3>
                <p><strong>주문번호:</strong> {paymentInfo.PCD_PAY_OID}</p>
                <p><strong>결제일:</strong> {paymentInfo.PCD_PAY_DATE}</p>
                <p><strong>결제금액:</strong> {paymentInfo.PCD_REFUND_TOTAL.toLocaleString()}원</p>
                <p><strong>상품명:</strong> ItHome FOHO 케어 - 생활 관리 자동화</p>
                <p><strong>결제자명:</strong> 뿌데-이</p>
                <p><strong>결제수단:</strong> 신용카드(토스뱅크카드)</p>
            </div>

            <button 
                onClick={handleCancel}
                disabled={loading}
                style={{
                    backgroundColor: loading ? '#ccc' : '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                {loading ? '취소 처리 중...' : '결제 취소하기'}
            </button>

            {error && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: '#ffe6e6', 
                    border: '1px solid #ff9999',
                    borderRadius: '4px',
                    color: '#d00'
                }}>
                    <strong>오류:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: '#e6ffe6', 
                    border: '1px solid #99ff99',
                    borderRadius: '4px',
                    color: '#060'
                }}>
                    <h4>취소 완료</h4>
                    <p><strong>메시지:</strong> {result.message}</p>
                    {result.data && (
                        <details style={{ marginTop: '10px' }}>
                            <summary>상세 정보</summary>
                            <pre style={{ fontSize: '12px', marginTop: '10px' }}>
                                {JSON.stringify(result.data, null, 2)}
                            </pre>
                        </details>
                    )}
                </div>
            )}
        </div>
    );
};

export default CancelPayment; 