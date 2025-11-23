"use client";

import { useState } from 'react';

interface SubscriptionFormProps {
  onSuccess?: () => void;
}

export default function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const [email, setEmail] = useState('');
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');

    if (!isConsentGiven) {
      setSubmitMessage('メールアドレスの収集に同意してください。');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitMessage('予約完了です！');
        setEmail('');
        setIsConsentGiven(false);
        setShowPopup(true);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setSubmitMessage(data.message || '予約に失敗しました。');
      }
    } catch (error) {
      console.error('メール送信中にエラーが発生しました：', error);
      setSubmitMessage('ネットワークエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section id="email-signup-section" className="bg-white py-16 md:py-20 px-4 md:px-12 lg:px-48 w-full">
        <div className="h-auto max-w-[1536px] mx-auto">
          <div className="flex flex-col mb-2">
            <h2 className="ty-keyline">
            真の美しさのスリップを最初に体験してください。
            </h2>
            <p className="text-left ty-body mt-2">
              20%OFF 特別予約権利を取得する <br></br>
              ※費用は一切かかりません。正式な開始時に通知します<br></br><br></br>
              最高の睡眠の美しさを最初にあなたのものにしてください。
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-start max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="consent-checkbox"
                className="w-4 h-4 text-[#3A3A3A] bg-gray-100 border-gray-300 rounded focus:ring-[#3A3A3A]"
                checked={isConsentGiven}
                onChange={(e) => setIsConsentGiven(e.target.checked)}
              />
              <label htmlFor="consent-checkbox" className="ty-body text-sm text-gray-700 cursor-pointer select-none">
                プライバシーポリシーに同意し、メールアドレスの収集を許可します。
              </label>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="email"
                placeholder="メールアドレスを入力してください"
                className="bg-white border border-[#d1d5db] flex-1 min-w-0 rounded-lg px-4 py-3 ty-body w-full focus:outline-none focus:ring-2 focus:ring-[#3A3A3A]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`bg-[#F9CAD4] ty-body h-12 px-5 py-0 rounded-[12px] min-w-[84px] flex items-center justify-center transition-colors ${
                  !isConsentGiven || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F7BCC9]'
                }`}
                disabled={!isConsentGiven || isSubmitting}
              >
                <span className="ty-keyline mt-0 tracking-[0.24px] whitespace-nowrap">
                  {isSubmitting ? '予約中...' : '特別予約'}
                </span>
              </button>
            </div>
          </form>
          {submitMessage && (
            <p className="mt-4 text-center text-[#333333]">{submitMessage}</p>
          )}
        </div>
      </section>

      {/* Reservation Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
            <h3 className="ty-hero-headline mb-4" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
              予約完了！
            </h3>
            <p className="text-[#3A3A3A] mb-6" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
              予約が正常に完了しました。ありがとうございます！
            </p>
            <button
              className="bg-[#F9CAD4] text-[#3A3A3A] px-6 py-3 rounded-lg font-semibold hover:bg-[#F7BCC9] transition-colors"
              onClick={() => setShowPopup(false)}
            >
              確認
            </button>
          </div>
        </div>
      )}
    </>
  );
}
