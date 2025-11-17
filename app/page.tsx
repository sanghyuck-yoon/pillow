"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import type { ReactNode } from 'react';

// Figma 이미지 URL 상수
const heroImage = "/image/Hero.png";
const founderImage = "/image/founder.jpg";
const productImage1 = "/image/product1.jpg";
const productImage2 = "/image/product2.png";
const feature1 = "/image/feature1.jpg";
const feature1_2 = "/image/feature1_2.jpg";
const feature2 = "/image/feature2.png";
const feature2_2 = "/image/feature2_2.jpg";
const feature2_3 = "/image/feature2_3.jpg";
const feature3 = "/image/feature3.jpg";
const sizeSpec = "/image/size.png";
const brandlogo = "/image/브랜드명.png";
const brandImg = "/image/brandImg.png";
const review1 = "/image/후기사진1.png";
const review2 = "/image/후기사진2.png";


type FaqItem = {
  id: number;
  question: string;
  answer: ReactNode;
};


const faqItems: FaqItem[] = [
  {
    id: 1,
    question: '横向き寝でも使えますか？',
    answer: (<>はい。側面のフェイスホールで頬の圧を抑え、<br className="block md:hidden"/> 横向きでも跡がつきにくい形状です。</>),
  },
  {
    id: 2,
    question: '仰向けでも快適に使えますか？',
    answer: (<>中央のくぼみが頭を安定させ、<br className="block md:hidden"/>首への負担をやわらげます。<br></br>仰向けでも自然な姿勢を保てます。</>),
  },
  {
    id: 3,
    question: 'すでにある首のシワは薄くなりますか？',
    answer:
      (<>医療的にシワを改善するものではありません。<br></br>ただ、摩擦と圧力を減らし、<br className="block md:hidden"/>これ以上深くならない環境を整えます。<br></br>※効果には個人差があります。</>),
  },
  {
    id: 4,
    question: 'どのような方におすすめですか？',
    answer:
      (<>横向きが多い方、<br className="block md:hidden"/>首元の跡が気になる方、<br className="block md:hidden"/>肌への摩擦を減らしたい方におすすめです。</>),
  },
  {
    id: 5,
    question: '枕の高さは合わないことがありますか？',
    answer:
      (<>首を支える6cm設計で、<br className="block md:hidden"/>多くの方に合いやすい高さです。<br></br>付属の調整パッドで微調整も可能です。</>),
  },
  {
    id: 6,
    question: 'カバーは洗濯できますか？',
    answer:
      (<>はい。カバーは取り外して洗えます。<br></br>デリケートな素材のため、<br className="block md:hidden"/>洗濯ネットの使用をおすすめします。</>),
  },
];


function FaqList() {
  // 여러 개를 동시에 열 수 있도록, 열린 항목들의 id를 배열로 관리
  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id)
        ? prev.filter(openId => openId !== id) // 이미 열려 있으면 닫기
        : [...prev, id]                        // 닫혀 있으면 열기
    );
  };

  return (
    <section className="mx-auto max-w-[90%] text-sm text-gray-900">
      {faqItems.map((item, index) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`border-b border-gray-300`}
          >
            {/* 질문 버튼 */}
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 ty-keyline"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="text-xl leading-none">
                {isOpen ? '−' : '＋'}
              </span>
            </button>

            {/* 답변 영역 */}
            <div
              className={`leading-relaxed ty-body ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function Home() {
  const [totalReservations, setTotalReservations] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const targetDate = useMemo(() => new Date('2025-12-10T00:00:00'), []);

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
            <img
              src={brandlogo}
              alt="Yaware 로고"
              className="relative max-h-[70px] max-w-[150px] object-cover"
            />
            {/* <h1 className="text-lg font-bold text-[#333333] tracking-[-0.27px]" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
              Yawaré
            </h1> */}
          </div>
          <button
            onClick={scrollToEmailSection}
            className="bg-[#F9CAD4] text-[#3A3A3A] px-4 py-2 rounded-full font-semibold tracking-[0.21px] hover:bg-[#F7BCC9] transition-colors"
            style={{ fontFamily: 'var(--font-noto-sans-jp)' }}
          >
            特別予約
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pt-16 bg-background">
        {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-12 lg:px-48 py-10 md:py-20 w-full">
        {/* 왼쪽 컬럼: 텍스트 + 예약 정보 + CTA 버튼 */}
        <div className="flex flex-col gap-6 items-start w-full md:w-1/2">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="ty-hero-headline md:text-4xl lg:text-[48px] leading-none tracking-[-1.584px] w-full">
              肌にかかる圧力の多くは、
              <br className="block md:hidden" />
              寝姿勢によって生まれて
              <br className="block md:hidden" />
              います。
            </h2>

            <p className="ty-body leading-none tracking-[-1.584px] w-full">
              毎晩、顔や首には想像以上の圧力と摩擦がか
              <br className="block md:hidden" />
              かっています。
              その積み重ねが、寝跡やむくみ、
              <br className="block md:hidden" />
              首元のラインに影響しやすくなります。
            </p>

            <p className="ty-keyline leading-none tracking-[-1.584px] w-full">
              小さな負担を見直すだけで、
              <br className="block md:hidden" />
              翌朝の跡が変わってきます。
            </p>
          </div>
          
          {/* ✅ 모바일 전용 배경 이미지 레이어 */}
          <div className="block md:hidden">
            <img
              src={heroImage}
              alt="Yawaré 베개"
              className="h-auto w-auto object-cover"
            />
          </div>

          {/* 예약 정보 */}
          <div className="ty-body">
            <p>
              현재 예약자 수:{' '}
              <span className="ty-body font-bold">
                {totalReservations ? totalReservations.toLocaleString() : 0}명
              </span>
            </p>
            <p>
              예약 종료까지:{' '}
              <span className="ty-body font-bold">{timeLeft}</span>
            </p>
          </div>

          {/* CTA 버튼 */}
          <button
            onClick={scrollToEmailSection}
            className="bg-[#F9CAD4] text-[#3A3A3A] px-[20px] py-[16px] rounded-[12px] max-w-[480px] w-full md:w-auto flex items-center justify-center hover:bg-[#F7BCC9] transition-colors"
          >
            【先着100名様限定】
            <br className="block md:hidden" />
            20％OFFでご予約いただけます
          </button>
        </div>

        {/* 오른쪽 컬럼: 이미지 */}
        <div className="hidden w-full md:block md:w-1/2">
          <div className="relative w-full overflow-hidden rounded-lg">
            <img
              alt="Yawaré 베개"
              src={heroImage}
              className="block h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          わたしたちがYawaréを作った理由
          </h2>
        </div>

        {/* 노화의 보이지 않는 원인 Section */}
        <section className="bg-white px-6 py-12 md:py-16 w-full">
          <div className="flex flex-col items-center max-w-xl mx-auto space-y-6">
            <div className="flex flex-col max-w-[672px]">
              <p className="ty-body leading-relaxed">
              高価な施術やクリームに頼っても、<br className="block md:hidden"/>
              その変化は長く続きませんでした。<br></br>
              </p>
              <p className="ty-body leading-relaxed">
              毎晩8時間、枕による圧が肌にかかり続けている——<br className="block md:hidden"/>
              その事実に気づいたとき、<br className="block md:hidden"/>
              わたしたちは&quot;睡眠環境そのもの&quot;を見直すことにしました。
              </p>
            </div>
            <div className="flex items-start justify-center py-8 w-full">
              <img alt="창업자의 생각" className="block h-40 w-40 mx-auto rounded-md opacity-80" src={founderImage} />
            </div>
          </div>
        </section>

        {/* Yawaré의 인체공학적 솔루션 Section */}
        <section className="py-12 md:py-16 w-full" style={{background: 'var(--foreground)'}}>
          <div className="flex flex-col px-4 md:px-12 lg:px-48">
            <div className="flex flex-col items-center max-w-[672px] mb-8">
              <p className="ty-keyline">
              Yawaréは、肌のこわばりをやさしく受け流すために生まれた枕です。<br></br>
              ただ眠るだけではなく、<br className="block md:hidden"/>
              肌のための物理的なケアを始めるという新しい選択です。
              </p>
            </div>
            <div className="flex items-start justify-center py-8 w-full">
              <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                  <img alt="Yawaré 브랜드 이미지" className="block h-auto w-auto object-cover mx-auto" src={brandImg} />
              </div>
            </div>
            <h2 className="ty-keyline mb-6 md:mb-8">
             「Yawaré の 3つの物理学的真実: <br className="block md:hidden"/>
              なぜ、この枕がシワを予防できるのか」
            </h2>
            <div className="flex items-start justify-center py-8 w-full">
                <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                  <img alt="Yawaré 프로덕트 이미지" className="block h-auto w-auto object-cover mx-auto" src={productImage2} />
                </div>
            </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          FEATURE
          </h2>
        </div>

        {/* Features Section */}
        <section className="bg-white py-12 md:py-16 w-full">
          <div className="flex flex-col gap-8 items-start max-w-[1536px] px-4 md:px-12 lg:px-48 mx-auto w-full">
            <div className="flex flex-col gap-6 md:gap-8 items-start justify-center relative w-full">
              {/* Feature 1 */}
              <div className="flex flex-col pb-6 pt-6 px-6 rounded-xl self-stretch w-full">
                <div className="pb-2">
                  <h2 className="ty-keyline">
                  과학적으로 증명된 최적 높이 6cm
                  </h2>
                </div>
                <p className="ty-body leading-relaxed">
                  枕が高すぎても、低すぎても、朝の顔に違いが出ます。<br></br>
                  体液の流れまで考えた、最適な高さ「6 cm」設計。<br></br>
                  むくみにくく、首筋がすっきり整う、科学的バランスです。
                </p>
                <div className="flex flex-col items-start justify-center py-8 w-full">
                  <div className="inset-0 h-auto rounded-lg w-full max-w-[896px] w-full">
                      <img alt="Yawaré 피쳐1" className="block h-auto w-auto object-cover mx-auto" src={feature1} />
                  </div>
                  <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                    <img alt="Yawaré 피쳐1_1" className="block h-auto w-auto object-cover mx-auto" src={feature1_2} />
                  </div>
                </div>
              </div>

              <hr className="border-t w-full border-gray-300 dark:border-white"></hr>

              {/* Feature 2 */}
              <div className="flex flex-col pb-6 pt-6 px-6 rounded-xl self-stretch w-full">
                <div className="pb-2">
                  <h3 className="ty-keyline">
                  横向き寝でも、顔に跡を残さない構造。
                  </h3>
                </div>
                <p className="ty-body leading-relaxed">
                みなさんも横向きで寝ていますか？<br></br>
                女性の約7割は「横向き」で眠るといわれています。<br></br>
                でもその姿勢、あなたの顔と首を静かに押しつぶしているかもしれません。    
                </p>
                <div className="flex items-start justify-center py-8 w-full">
                    <div className="inset-0 h-auto rounded-lg w-full max-w-[896px] w-full">
                      <img alt="피쳐2_그래프" className="block h-auto w-auto object-cover mx-auto" src={feature2} />
                    </div>
                </div>
                <div className="flex items-start justify-center py-8 w-full">
                  <div className="inset-0 h-auto rounded-lg w-full max-w-[896px] w-full">
                    <blockquote className="ty-hero-headline text-center my-8">
                    &quot;압력이 누적되면, 주름은 물론 얼굴의 변형을 일으킵니다.&quot;
                    </blockquote>
                    <img alt="피쳐2_논문" className="block h-auto w-auto object-cover mx-auto" src={feature2_2} />
                  </div>
                </div>
                <div>
                  <p className="ty-body leading-relaxed">
                  Yawaré의 페이스 홀 설계는 옆으로 자더라도 <br></br>
                  볼이 베개에 직접 닳지 않도록 설계되어, <br></br>
                  어떤 자세에서도 당신의 아름다움을 지킬 수 있습니다. 
                  </p>
                </div>
                <div className="flex items-start justify-center py-8 w-full">
                    <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                        <img alt="피쳐2_눕는모습습" className="block h-auto w-auto object-cover mx-auto" src={feature2_3} />
                    </div>
                  </div>
              </div>

              <hr className="border-t w-full border-gray-300 dark:border-white"></hr>

              {/* Feature 3 */}
              <div className="flex flex-col pb-11 pt-6 px-6 rounded-xl self-stretch w-full">
                <div className="pb-5">
                  <h3 className="ty-keyline">
                    3) 베개와 피부의 마찰 최소화 - 실크
                  </h3>
                </div>
                <div className="pb-2">
                  <p className="ty-body leading-relaxed">
                  寝返りのたびに起こる小さな摩擦が、肌を敏感にしていきます。<br></br>
                  だからこそ、Yawaréはその摩擦をSILKでやさしく包みました。<br></br>
                  </p>
                  <p className="ty-body leading-relaxed">
                  摩擦試験で実証された究極の滑らかさ。
                  </p>
                </div>
                  <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                    <img alt="피쳐3_소재" className="block h-auto w-auto object-cover mx-auto" src={feature3} />
                  </div>
              </div>
          </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          Yawaré — 体験モニターによるリアルレビュー
          </h2>
        </div>

        {/* Customer Reviews Section */}
        <section className="w-full py-16" style={{background: 'var(--foreground)'}}>
          {/* 가운데 정렬용 컨테이너 */}
          <div className="mx-auto flex w-full max-w-[960px] flex-col px-4 md:px-8">

            {/* 2x2 카드 그리드 (모바일 1열, md 이상 2열) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* ▷ 카드 1: 상단 왼쪽 - 이미지 */}
              <article className="flex items-center justify-center rounded-3xl bg-[#fefaf4] p-4">
                <img
                  src={review1}
                  alt="편안하게 잠자는 모습"
                  className="h-auto w-full rounded-3xl object-cover"
                />
              </article>

              {/* ▷ 카드 2: 상단 오른쪽 - 텍스트 리뷰 */}
              <article className="flex flex-col justify-between rounded-3xl border border-[#e0d8c8] bg-[#fefaf4] p-6 md:p-8">
                <p className="mb-4 text-lg font-semibold text-[#a06840] md:text-xl">
                &quot;아침에 베개 자국이 거의 남지 않아요.&quot;
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[#333333]">
                  부드럽게 받쳐줘서 밤새 뒤척여도 얼굴이 편안합니다. 피부가 덜
                  당기는 느낌이에요.
                </p>
                <div className="space-y-1 text-xs text-[#555555]">
                  <p>회사원 · 40대 여성</p>
                  <p>수면 만족도 ★★★★☆ (4.6/5)</p>
                  <p>피부 스트레스 감소 체감 90%</p>
                </div>
              </article>

              {/* ▷ 카드 3: 하단 왼쪽 - 텍스트 리뷰 */}
              <article className="order-4 md:order-3 flex flex-col justify-between rounded-3xl border border-[#e0d8c8] bg-[#fefaf4] p-6 md:p-8">
                <p className="mb-4 text-lg font-semibold text-[#a06840] md:text-xl">
                  &quot;실크 촉감 덕분에 피부가 편안해졌어요.&quot;
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[#333333]">
                  얼굴이 베개에 붙는 느낌이 줄어들고, 아침에 붓기가 덜한 것 같아요.
                </p>
                <div className="space-y-1 text-xs text-[#555555]">
                  <p>뷰티샵 운영 · 30대 여성</p>
                  <p>수면 만족도 ★★★★☆ (4.8/5)</p>
                  <p>피부 스트레스 완화 체감 75%</p>
                </div>
              </article>

              {/* ▷ 카드 4: 하단 오른쪽 - 이미지 */}
              <article className="order-3 md:order-4 flex items-center justify-center rounded-3xl bg-[#fefaf4] p-4">
                <img
                  src={review2}
                  alt="숙면 중인 고객 모습"
                  className="h-auto w-full rounded-3xl object-cover"
                />
              </article>
            </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          SIZE SPEC
          </h2>
        </div>

        {/* Size Spec */}
        <section className="bg-white py-12 md:py-16 w-full">
          <div className="flex flex-col gap-8 items-start max-w-[1536px] px-4 md:px-12 lg:px-48 mx-auto w-full">
            <div className="flex flex-col gap-6 md:gap-8 items-start justify-center relative w-full">
              {/* Feature 1 */}
              <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                <img alt="sizeSpec" className="block h-auto w-auto object-cover mx-auto" src={sizeSpec} />
              </div>
              {/* 스펙 테이블 */}
              <table className="w-full max-w-[896px] border-collapse ty-body">
                <tbody>
                  <tr className="border-y">
                    <th className="w-1/3 bg-gray-50 px-4 py-2 text-center font-semibold border-r">
                      소재
                    </th>
                    <td className="px-4 py-2 text-center">
                      독일 BASF 메모리폼
                    </td>
                  </tr>
                  <tr className="border-y">
                    <th className="bg-gray-50 px-4 py-2 text-center font-semibold border-r">
                      커버
                    </th>
                    <td className="px-4 py-2 text-center">
                      100% Mulberry Silk
                    </td>
                  </tr>
                  <tr className="border-y">
                    <th className="bg-gray-50 px-4 py-2 text-center font-semibold border-r">
                      크기
                    </th>
                    <td className="px-4 py-2 text-center">
                      58cm x 36cm x 6cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          よくあるご質問
          </h2>
        </div>

        {/* FAQ */}
        <section className="py-12 md:py-16 w-full">
          <FaqList />
        </section>

        {/* CTA Section */}
        <section id="email-signup-section" className="bg-white py-16 md:py-20 px-4 md:px-12 lg:px-48 w-full">
          <div className="h-auto max-w-[1536px] mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl md:text-[30px] font-bold text-[#333333] text-center mb-4" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
                진정한 뷰티 슬립을 가장 먼저 경험하세요.
              </h2>
            </div>
            <div className="flex flex-col items-center mb-4">
              <p className="text-base text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}>
                수량 한정 · 사전 예약 시 특별 할인
              </p>
            </div>
            <div className="flex flex-col items-center mb-8">
              <p className="text-base text-[#333333] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}>
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
                style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}
              />
              <button
                type="submit"
                className="bg-[#197fe6] text-white h-12 px-5 py-0 rounded-lg min-w-[84px] flex items-center justify-center hover:bg-[#1565c0] transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                <span className="text-base font-bold tracking-[0.24px] whitespace-nowrap" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
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
            {/* <div className="flex gap-6 items-start justify-center relative w-full">
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}>
                이용약관
              </a>
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}>
                개인정보처리방침
              </a>
              <a href="#" className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-noto-sans-jp)', fontWeight: 350 }}>
                문의하기
              </a>
            </div>
            <div className="flex flex-col items-center relative w-full">
              <p className="text-sm text-[#637588] text-center" style={{ fontFamily: 'var(--font-manrope)' }}>
                © 2024 Yawaré. All Rights Reserved.
              </p>
            </div> */}
          </div>
        </footer>
      </div>

      {/* Floating Button */}
      {/* <button
        className="fixed bottom-8 right-8 bg-[#197fe6] text-white p-4 rounded-full shadow-lg hover:bg-[#1565c0] transition-colors z-50"
        onClick={scrollToEmailSection}
        aria-label="예약 섹션으로 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button> */}

      {/* Reservation Completion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
            <h3 className="text-3xl font-bold text-[#333333] mb-4" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
              사전 예약 완료!
            </h3>
            <p className="text-[#333333] mb-6" style={{ fontFamily: 'var(--font-noto-sans-jp)' }}>
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