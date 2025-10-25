"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';

export default function Home() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const targetDate = useMemo(() => new Date('2025-11-10T00:00:00'), []); // 예약 종료 날짜 설정 (예시)

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      setTotalReservations(data.totalReservations);
    } catch (error) {
      console.error('예약자 수를 가져오는 데 실패했습니다:', error);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, [fetchReservations]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('예약 종료!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`D-${days} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

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
        setSubmitMessage('사전 예약이 완료되었습니다!');
        setEmail(''); // 성공 시 이메일 입력 필드 초기화
        setShowPopup(true);
        fetchReservations(); // 예약자 수 업데이트
      } else {
        setSubmitMessage(data.message || '사전 예약에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 제출 중 오류 발생:', error);
      setSubmitMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Yawaré 랜딩 페이지</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <section className="hero-section bg-blue-600 text-white p-10 md:p-20 rounded-lg shadow-lg">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">당신의 수면을 혁신할 Yawaré</h2>
          <p className="text-lg md:text-xl mb-8">사전 예약하고 특별한 혜택을 받으세요!</p>
          <div className="mb-8 text-base md:text-lg">
            <p>현재 예약자 수: <span className="font-bold">{totalReservations.toLocaleString()}명</span></p>
            <p>예약 종료까지: <span className="font-bold">{timeLeft}</span></p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-gray-200 transition duration-300">
            지금 사전 예약하기
          </button>
        </section>

        {/* 문제 제기 및 제품 개발 배경 섹션 */}
        <section className="problem-background-section w-full max-w-4xl py-20 px-4 bg-white rounded-lg shadow-lg mt-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">기존 베개의 문제점과 Yawaré의 탄생 배경</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">문제 1: 불편한 수면 자세</h3>
              <p className="text-gray-600 leading-relaxed">
                대부분의 베개는 사용자의 수면 자세를 고려하지 않아 목과 어깨에 불필요한 부담을 줍니다. 이는 장기적으로 목 통증과 불편함을 유발하며 숙면을 방해합니다.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image src="/images/problem1.jpg" alt="불편한 수면 자세" width={500} height={300} className="rounded-lg shadow-md w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2">
              <Image src="/images/background.jpg" alt="제품 개발 배경" width={500} height={300} className="rounded-lg shadow-md w-full" />
            </div>
            <div className="order-1">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Yawaré의 탄생: 더 나은 수면을 위한 혁신</h3>
              <p className="text-gray-600 leading-relaxed">
                수면의 질은 우리 삶의 중요한 부분입니다. Yawaré는 이러한 문제점을 해결하고, 사용자가 가장 편안하고 건강한 수면을 경험할 수 있도록 오랜 연구와 개발 끝에 탄생했습니다. 당신의 아침을 상쾌하게 만들어 줄 Yawaré를 경험해보세요.
              </p>
            </div>
          </div>
        </section>

        {/* 본 제품 차별점 요약 섹션 */}
        <section className="differentiation-summary-section w-full max-w-4xl py-20 px-4 bg-gray-50 rounded-lg shadow-lg mt-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Yawaré의 차별점</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">1. 인체공학적 디자인</h3>
              <p className="text-gray-600 leading-relaxed">
                Yawaré는 수면 전문가들과의 협력을 통해 개발된 인체공학적 디자인으로, 어떤 수면 자세에서도 목과 척추를 올바르게 지지하여 최적의 수면 환경을 제공합니다.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image src="/images/differentiation1.jpg" alt="인체공학적 디자인" width={500} height={300} className="rounded-lg shadow-md w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">2. 수면 주름 방지 기술</h3>
              <p className="text-gray-600 leading-relaxed">
                혁신적인 소재와 구조를 통해 수면 중 발생하는 얼굴 압력을 최소화하여 수면 주름 생성을 효과적으로 방지합니다. 이제 아름다운 아침을 맞이하세요.
              </p>
            </div>
            <div className="order-2">
              <Image src="/images/differentiation2.jpg" alt="수면 주름 방지 기술" width={500} height={300} className="rounded-lg shadow-md w-full" />
            </div>
          </div>
        </section>

        {/* 제품 상세 설명 섹션 */}
        <section className="product-detail-section w-full max-w-4xl py-20 px-4 bg-white rounded-lg shadow-lg mt-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Yawaré 상세 설명</h2>

          {/* How to Use Yawaré */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-700 text-center mb-10">How to Use Yawaré</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Image src="/images/step1.jpg" alt="Yawaré 사용 스텝 1" width={300} height={200} className="rounded-lg shadow-md mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">Step 1: 편안하게 눕기</p>
                <p className="text-gray-600">Yawaré 베개에 머리를 편안하게 기대세요. 인체공학적 디자인이 당신의 자세를 즉시 잡아줄 것입니다.</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/step2.jpg" alt="Yawaré 사용 스텝 2" width={300} height={200} className="rounded-lg shadow-md mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">Step 2: 숙면 취하기</p>
                <p className="text-gray-600">Yawaré의 혁신적인 소재가 밤새도록 편안함을 제공하며, 수면 주름 없이 깊은 잠에 빠지게 합니다.</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/step3.jpg" alt="Yawaré 사용 스텝 3" width={300} height={200} className="rounded-lg shadow-md mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">Step 3: 상쾌한 아침 맞이</p>
                <p className="text-gray-600">개운하게 일어나는 아침, 거울 속 당신의 얼굴에 수면 주름이 없음을 확인하세요.</p>
              </div>
            </div>
          </div>

          {/* Research on Sleep Wrinkles */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-700 text-center mb-10">Research on Sleep Wrinkles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image src="/images/research.jpg" alt="수면 주름 연구" width={500} height={300} className="rounded-lg shadow-md w-full" />
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  수면 중 얼굴에 가해지는 압력은 미세한 주름을 유발하며, 이는 시간이 지남에 따라 깊은 주름으로 발전할 수 있습니다. Yawaré는 이러한 수면 주름의 발생 메커니즘을 심층적으로 연구하여, 피부에 가해지는 압력을 최소화하는 독자적인 기술을 개발했습니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  수많은 실험과 임상 테스트를 통해 Yawaré 베개가 수면 주름 방지에 탁월한 효과가 있음을 입증했습니다. 이제 당신의 피부를 밤새도록 보호하세요.
                </p>
              </div>
            </div>
          </div>

          {/* Expected Effects of Yawaré */}
          <div>
            <h3 className="text-3xl font-bold text-gray-700 text-center mb-10">Expected Effects of Yawaré</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Yawaré 베개를 사용하면 단순히 수면 주름을 방지하는 것 이상의 효과를 기대할 수 있습니다. 최적의 자세 유지로 목과 어깨의 긴장이 완화되어 만성 통증이 줄어들고, 더욱 깊고 편안한 수면을 경험할 수 있습니다.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  개선된 수면의 질은 전반적인 건강과 활력 증가로 이어집니다. 매일 아침 상쾌하게 일어나 하루를 시작하며, 더 젊고 생기 넘치는 피부를 유지하세요.
                </p>
              </div>
              <div>
                <Image src="/images/effects.jpg" alt="Yawaré 예상 효과" width={500} height={300} className="rounded-lg shadow-md w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 이메일 입력란 및 CTA 버튼 섹션 */}
        <section id="email-signup-section" className="email-signup-section w-full py-20 px-4 bg-blue-700 text-white text-center mt-16">
          <h2 className="text-4xl font-bold mb-6">지금 사전 예약하고 Yawaré를 가장 먼저 만나보세요!</h2>
          <p className="text-xl mb-8">이메일 주소를 입력하고 새로운 수면의 시작을 함께하세요.</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="w-full md:w-2/3 p-4 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full md:w-1/3 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? '예약 중...' : '사전 예약하기'}
            </button>
          </form>
          {submitMessage && <p className="mt-4 text-white text-lg font-medium">{submitMessage}</p>}
        </section>
      </main>
      {/* Floating Button */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
        onClick={() => {
          const section = document.getElementById('email-signup-section');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
      </button>
      
      {/* Reservation Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">사전 예약 완료!</h3>
            <p className="text-gray-600 mb-6">성공적으로 사전 예약이 완료되었습니다. 감사합니다!</p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={() => setShowPopup(false)}
            >
              확인
            </button>
        </div>
        </div>
      )}
      <footer className="w-full py-4 text-center text-gray-600 text-sm md:text-base">
        <p>&copy; 2025 Yawaré. All rights reserved.</p>
      </footer>
    </div>
  );
}
