"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';

// Figma 이미지 URL 상수
const imgImage = "https://www.figma.com/api/mcp/asset/5385dc12-05d0-419a-83d7-3de2c92ce30a";
const imgImage1 = "https://www.figma.com/api/mcp/asset/163e019a-7a08-4930-8fae-f69f23a516cb";
const imgImage2 = "https://www.figma.com/api/mcp/asset/cd41fd14-78f2-4d56-bb72-3c21bc5175a5";
const imgImage3 = "https://www.figma.com/api/mcp/asset/f8cb806c-7aec-44b8-8595-5f4365e9c43d";
const imgCustomerPhoto = "https://www.figma.com/api/mcp/asset/2fe2b63a-bd5e-4ea7-9a45-fad6a0723c78";
const imgCustomerPhoto1 = "https://www.figma.com/api/mcp/asset/6b3d65d6-cd56-44a5-8c88-1fdc243194ce";
const imgCustomerPhoto2 = "https://www.figma.com/api/mcp/asset/527c6bcf-2c4d-4658-be31-a6dac29e7bba";
const imgIcon = "https://www.figma.com/api/mcp/asset/b6edfa13-136a-429a-a6d8-8128b49d0ae5";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/0eac86ed-1a8c-45e3-b24b-84fdc5af82eb";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/9bbbea3a-54a8-417f-acc0-49cbea055b3a";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/f505c127-e650-416a-96cf-0d9f3e3d9532";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/f044becd-5c7f-4ea7-830e-85cdb1bf12b3";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/d9fa8923-6aa3-4f18-99a4-d93ce5660c15";

export default function Home() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const targetDate = useMemo(() => new Date('2025-11-10T00:00:00'), []);

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
    const interval = setInterval(fetchReservations, 30000);
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
    const interval = setInterval(calculateTimeLeft, 1000);
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
        setEmail('');
        setShowPopup(true);
        fetchReservations();
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

  const scrollToEmailSection = () => {
    const section = document.getElementById('email-signup-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-start relative w-full min-h-screen" style={{ backgroundImage: "linear-gradient(90deg, rgba(246, 247, 248, 1) 0%, rgba(246, 247, 248, 1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)" }}>
      {/* Header - Sticky */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[rgba(246,247,248,0.8)]">
        <div className="flex items-center justify-between p-4 px-4 md:px-16 lg:px-48 max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#333333] tracking-[-0.27px]" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
              Yawaré
            </h1>
          </div>
          <button
            onClick={scrollToEmailSection}
            className="bg-[#197fe6] text-white px-4 py-2 rounded-full text-sm font-bold tracking-[0.21px] hover:bg-[#1565c0] transition-colors"
            style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
          >
            예약하기
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pt-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-12 lg:px-48 py-10 md:py-20 relative w-full">
          <div className="flex flex-col gap-6 items-start justify-center relative z-10 w-full md:w-auto">
            <div className="flex flex-col gap-2 items-start relative w-full">
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-black text-[#333333] leading-none tracking-[-1.584px] w-full" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                잠자는 동안의 '수면 주름', 관리하고 계신가요?
              </h2>
              <p className="text-base md:text-lg text-[#333333] leading-6 mt-4" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                매일 밤 무의식적인 압박이 당신의 얼굴과 목의 주름을 깊게 만듭니다. 과학적으로 설계된 베개로 아름다움을 지켜보세요.
              </p>
            </div>
            
            {/* 예약 정보 표시 */}
            <div className="mb-4 text-sm md:text-base text-[#333333]">
              <p>현재 예약자 수: <span className="font-bold">{totalReservations.toLocaleString()}명</span></p>
              <p>예약 종료까지: <span className="font-bold">{timeLeft}</span></p>
            </div>

            <button
              onClick={scrollToEmailSection}
              className="bg-[#197fe6] text-white h-12 px-5 py-0 rounded-lg min-w-[84px] max-w-[480px] w-full md:w-auto flex items-center justify-center hover:bg-[#1565c0] transition-colors"
            >
              <span className="text-base font-bold tracking-[0.24px] whitespace-nowrap" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                우선 예약 리스트에 등록하기
              </span>
            </button>
          </div>
          <div className="h-[200px] md:h-[252px] max-w-full md:max-w-[448px] relative rounded-lg w-full md:w-[448px] z-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img alt="Yawaré 베개" className="absolute h-full w-full object-cover" src={imgImage} />
            </div>
          </div>
        </section>

        {/* 노화의 보이지 않는 원인 Section */}
        <section className="bg-white py-12 md:py-16 w-full">
          <div className="flex flex-col items-center px-4 md:px-12 lg:px-48">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#333333] text-center mb-6 md:mb-8" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
              노화의 보이지 않는 원인
            </h2>
            <div className="flex flex-col items-center max-w-[672px] mb-8">
              <p className="text-base md:text-lg text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                일반 베개는 옆으로 누웠을 때 목이 꺾이고 얼굴이 압박되어 수면 중에 주름이 깊어집니다.
              </p>
            </div>
            <div className="flex items-start justify-center py-8 w-full">
              <div className="flex-1 h-full min-h-[200px] relative rounded-lg max-w-[896px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <img alt="일반 베개의 문제점" className="absolute h-full w-full object-cover" src={imgImage1} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yawaré의 인체공학적 솔루션 Section */}
        <section className="bg-[#f6f7f8] py-12 md:py-16 w-full">
          <div className="flex flex-col items-center px-4 md:px-12 lg:px-48">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#333333] text-center mb-6 md:mb-8" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
              'Yawaré'의 인체공학적 솔루션
            </h2>
            <div className="flex flex-col items-center max-w-[672px] mb-8">
              <p className="text-base md:text-lg text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                Yawaré는 얼굴과 베개의 접촉을 최소화하고 목을 자연스러운 곡선으로 유지하여 수면 중 압박으로부터 당신을 보호합니다.
              </p>
            </div>
            <div className="flex items-start justify-center py-8 w-full">
              <div className="flex-1 h-full min-h-[200px] relative rounded-lg max-w-[896px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <img alt="Yawaré 인체공학적 솔루션" className="absolute h-full w-full object-cover" src={imgImage2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-12 md:py-16 w-full">
          <div className="flex flex-col gap-8 items-start max-w-[1536px] px-4 md:px-12 lg:px-48 mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-center relative w-full">
              {/* Feature 1 */}
              <div className="bg-[#f6f7f8] flex flex-col items-center pb-6 pt-6 px-6 rounded-xl self-stretch w-full md:w-[480px]">
                <div className="pb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-1]">
                      <div className="h-11 w-9">
                        <img alt="아이콘" className="block w-full h-full" src={imgIcon} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    얼굴 접촉 방지 설계
                  </h3>
                </div>
                <div className="px-2">
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    독자적인 사이드 슬로프 설계로, 옆으로 누웠을 때 얼굴이 베개에 직접 닿는 것을 방지하여 압박으로 인한 주름을 예방합니다.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#f6f7f8] flex flex-col items-center pb-6 pt-6 px-6 rounded-xl self-stretch w-full md:w-[480px]">
                <div className="pb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-1]">
                      <div className="h-11 w-9">
                        <img alt="아이콘" className="block w-full h-full" src={imgIcon1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    높이 조절 기능
                  </h3>
                </div>
                <div className="px-1">
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    아시아인 체형 맞춤 6cm 기본 높이에 2cm 높이 조절 패드가 포함되어, 최적의 높이로 목을 지지합니다.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#f6f7f8] flex flex-col items-center pb-11 pt-6 px-6 rounded-xl self-stretch w-full md:w-[480px]">
                <div className="pb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-1]">
                      <div className="h-11 w-9">
                        <img alt="아이콘" className="block w-full h-full" src={imgIcon2} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    수면 과학 연구 기반
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    수면 과학 연구 기반으로 피부 압력 감소 데이터가 효과를 증명합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Graph Image */}
            <div className="flex items-start justify-center py-8 w-full">
              <div className="flex-1 h-full min-h-[200px] relative rounded-lg max-w-[896px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <img alt="연구 데이터" className="absolute h-full w-full object-cover" src={imgImage3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="bg-[#f6f7f8] py-12 md:py-16 w-full">
          <div className="flex flex-col gap-8 items-start max-w-[1536px] px-4 md:px-12 lg:px-48 mx-auto w-full">
            <div className="flex flex-col items-center relative w-full">
              <h2 className="text-2xl md:text-[30px] font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                만족한 고객들의 후기
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-center relative w-full">
              {/* Review 1 */}
              <div className="bg-white overflow-hidden relative rounded-xl shadow-md self-stretch w-full md:w-[480px] pb-32">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-20 h-20">
                  <div className="rounded-full w-full h-full relative">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="고객 사진" className="absolute left-0 top-0 w-full h-full object-cover" src={imgCustomerPhoto} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-28 flex gap-1">
                  {[imgIcon3, imgIcon4, imgIcon3, imgIcon3, imgIcon4].map((icon, idx) => (
                    <div key={idx} className="flex-none scale-y-[-1]">
                      <div className="h-7 w-6">
                        <img alt="별" className="block w-full h-full" src={icon} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-6 right-6 top-36">
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    "Yawaré 베개를 사용한 후로 아침에 목이 훨씬 편안해요. 피부에 자국도 남지 않아서 정말 만족합니다."
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-52">
                  <p className="text-sm font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    김민지, 서울
                  </p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white overflow-hidden relative rounded-xl shadow-md self-stretch w-full md:w-[480px] pb-32">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-20 h-20">
                  <div className="rounded-full w-full h-full relative">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="고객 사진" className="absolute left-0 top-0 w-full h-full object-cover" src={imgCustomerPhoto1} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-28 flex gap-1">
                  {[imgIcon3, imgIcon4, imgIcon3, imgIcon3, imgIcon4].map((icon, idx) => (
                    <div key={idx} className="flex-none scale-y-[-1]">
                      <div className="h-7 w-6">
                        <img alt="별" className="block w-full h-full" src={icon} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-6 right-6 top-36">
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    "디자인도 예쁘고, 기능도 완벽해요. 옆으로 누워도 얼굴이 눌리지 않아서 주름 걱정을 덜었어요."
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-52">
                  <p className="text-sm font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    이서연, 부산
                  </p>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white overflow-hidden relative rounded-xl shadow-md self-stretch w-full md:w-[480px] pb-32">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-20 h-20">
                  <div className="rounded-full w-full h-full relative">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="고객 사진" className="absolute left-0 top-0 w-full h-full object-cover" src={imgCustomerPhoto2} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-28 flex gap-1">
                  {[imgIcon3, imgIcon4, imgIcon3, imgIcon3, imgIcon5].map((icon, idx) => (
                    <div key={idx} className="flex-none scale-y-[-1]">
                      <div className="h-7 w-6">
                        <img alt="별" className="block w-full h-full" src={icon} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-6 right-6 top-36">
                  <p className="text-sm text-[#333333] text-center leading-5" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                    "높이 조절 패드가 있어서 제 몸에 딱 맞게 사용할 수 있는 점이 가장 마음에 듭니다. 추천해요!"
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-52">
                  <p className="text-sm font-bold text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                    박준서, 인천
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="email-signup-section" className="bg-white py-16 md:py-20 px-4 md:px-12 lg:px-48 w-full">
          <div className="h-auto max-w-[1536px] mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl md:text-[30px] font-bold text-[#333333] text-center mb-4" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                진정한 뷰티 슬립을 가장 먼저 경험하세요.
              </h2>
            </div>
            <div className="flex flex-col items-center mb-4">
              <p className="text-base text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                수량 한정 · 사전 예약 시 특별 할인
              </p>
            </div>
            <div className="flex flex-col items-center mb-8">
              <p className="text-base text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                최고의 수면 뷰티를 가장 먼저 당신의 것으로 만드세요.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start justify-center max-w-2xl mx-auto w-full">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="bg-white border border-[#d1d5db] flex-1 min-w-0 rounded-lg px-4 py-3 text-base text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#197fe6]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}
              />
              <button
                type="submit"
                className="bg-[#197fe6] text-white h-12 px-5 py-0 rounded-lg min-w-[84px] flex items-center justify-center hover:bg-[#1565c0] transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                <span className="text-base font-bold tracking-[0.24px] whitespace-nowrap" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                  {isSubmitting ? '예약 중...' : '지금 예약하기'}
                </span>
              </button>
            </form>
            {submitMessage && (
              <p className="mt-4 text-center text-[#333333]">{submitMessage}</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white px-4 md:px-12 lg:px-48 py-8 w-full">
          <div className="flex flex-col gap-4 items-start max-w-[1536px] mx-auto">
            <div className="flex flex-col items-center relative w-full">
              <p className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-manrope)' }}>
                Yawaré
              </p>
            </div>
            <div className="flex gap-6 items-start justify-center relative w-full">
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                이용약관
              </a>
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                개인정보처리방침
              </a>
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)', fontWeight: 350 }}>
                문의하기
              </a>
            </div>
            <div className="flex flex-col items-center relative w-full">
              <p className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-manrope)' }}>
                © 2024 Yawaré. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Button */}
      <button
        className="fixed bottom-8 right-8 bg-[#197fe6] text-white p-4 rounded-full shadow-lg hover:bg-[#1565c0] transition-colors z-50"
        onClick={scrollToEmailSection}
        aria-label="예약 섹션으로 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
      </button>

      {/* Reservation Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
            <h3 className="text-3xl font-bold text-[#333333] mb-4" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
              사전 예약 완료!
            </h3>
            <p className="text-[#333333] mb-6" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
              성공적으로 사전 예약이 완료되었습니다. 감사합니다!
            </p>
            <button
              className="bg-[#197fe6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1565c0] transition-colors"
              onClick={() => setShowPopup(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}