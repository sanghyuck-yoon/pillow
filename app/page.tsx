"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import type { ReactNode } from 'react';

// Figma 이미지 URL 상수
const heroImage = "/image/Hero.png";
const founderImage = "/image/founder.jpg";
const productImage1 = "/image/product1.jpg";
const productImage2 = "/image/product_explain.jpg";
const feature1 = "/image/5.png";
const feature1_2 = "/image/6.png";
const feature2 = "/image/7.png";
const feature2_2 = "/image/8.png";
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
    answer: (<>はい。側面のフェイスホールが頬の圧力を逃し、<br className="block md:hidden"/>横向きでも跡がつきにくい構造になっています。</>),
  },
  {
    id: 2,
    question: '仰向けでも快適に使えますか？',
    answer: (<>中央のくぼみが頭を安定させ、<br className="block md:hidden"/>首への負担をやわらげます。<br></br>仰向けでも自然な姿勢を保ちやすい形状です。</>),
  },
  {
    id: 3,
    question: 'すでにある首のシワは薄くなりますか？',
    answer:
      (<>医療的にシワを改善するものではありません。<br></br>ただし、摩擦と圧力を抑えることで、<br className="block md:hidden"/>これ以上深くならない環境づくりをサポートします。<br></br>※効果には個人差があります。</>),
  },
  {
    id: 4,
    question: 'どのような方におすすめですか？',
    answer:
      (<>横向き寝が多い方、<br className="block md:hidden"/>首元の跡が気になる方、<br className="block md:hidden"/>肌への摩擦を減らしたい方におすすめです。</>),
  },
  {
    id: 5,
    question: '枕の高さが合わないことはありますか？',
    answer:
      (<>首を支える「6cm設計」で、<br className="block md:hidden"/>多くの方に合いやすい高さになっています。<br></br>また、付属の調整パッドで微調整も可能です。</>),
  },
  {
    id: 6,
    question: 'カバーは洗濯できますか？',
    answer:
      (<>はい。カバーは取り外して洗えます。<br></br>デリケートなシルク素材のため、<br className="block md:hidden"/>洗濯ネットのご使用をおすすめします。</>),
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
    <section className="mx-auto max-w-[90%] px-6 md:px-12 lg:px-48">
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
      console.error('予約者数の取得に失敗しました：', error);
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
        setTimeLeft('予約終了！');
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
        setSubmitMessage('予約完了です！');
        setEmail('');
        setShowPopup(true);
        fetchReservations();
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

  const scrollToEmailSection = () => {
    const section = document.getElementById('email-signup-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-start relative w-full min-h-screen">
      {/* Header - Sticky */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[rgba(246,247,248,0.8)]">
        <div className="flex items-center justify-between p-2 max-w-screen-2xl mx-auto w-full">
          <img
            src={brandlogo}
            alt="Yaware 로고"
            className="max-h-[70px] md:h-auto max-w-[150px] md:w-auto object-cover"
          />
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
      <section className="flex flex-col bg-box md:flex-row items-center justify-between gap-10 px-4 md:px-12 lg:px-48 py-10 md:py-20 w-full">
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
            現在の予約者数:{' '}
              <span className="ty-body font-bold">
                {totalReservations ? totalReservations.toLocaleString() : 0}人
              </span>
            </p>
            <p>
            予約終了まで:{' '}
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

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          わたしたちがYawaréを作った理由
          </h2>
        </div>

        {/* 브랜드 히스토리 Section */}
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
        <section className="py-12 md:py-16 w-full bg-box">
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
            「Yawaréの3つの&quot;物理的アプローチ&quot;」
            </h2>
            <p className='ty-body text-left'>
              肌への負担をやさしく整えるために。
            </p>
            <p className='ty-body text-left'>
            1. むくみに配慮したCカーブ設計  <br></br>
            2. 頬への圧を抑えるフェイスホール構造  <br></br>
            3. 肌との摩擦を減らすシルクカバー
            </p>
            <div className="flex items-start justify-center py-8 w-full">
                <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                  <img alt="Yawaré 프로덕트 이미지" className="block h-auto w-auto object-cover mx-auto" src={productImage2} />
                </div>
            </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          FEATURES / 特徴
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
                  1. 設計段階で導き出した、&quot;ちょうどいい高さ 6cm&quot;
                  </h2>
                </div>
                <p className="ty-body leading-relaxed">
                首もとに負担がかかりにくい、<br className="block md:hidden"/>
                自然な角度を保ちやすい高さです。<br></br><br></br>
                高すぎる枕は首が持ち上がり、<br className="block md:hidden"/>
                筋まわりがこわばりやすくなります。<br></br>
                逆に低すぎる枕は、体液が頭に集まりやすく、<br className="block md:hidden"/>
                朝のむくみにつながりやすいとされています。<br></br><br></br>
                その中間である<b>&quot;約6cm&quot;</b>は、<br className="block md:hidden"/>
                首のカーブをやさしく支え、<br className="block md:hidden"/>
                無理のない姿勢をサポートしやすい高さです。<br></br>
                <br></br>
                ※感じ方には個人差があります。
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
                  <h2 className="ty-keyline">
                  2. 横向きでも頬に跡がつきにくい、フェイスホール構造
                  </h2>
                </div>
                <p className="ty-body leading-relaxed">
                日本の女性の約6割は横向きで眠るといわれています。
                </p>
                <div className="flex items-start justify-center py-8 w-full">
                    <div className="inset-0 h-auto rounded-lg w-full max-w-[896px] w-full">
                      <img alt="피쳐2_그래프" className="block h-auto w-auto object-cover mx-auto" src={feature2} />
                    </div>
                </div>
                <p className="ty-body leading-relaxed">
                日本の女性の約6割は横向きで眠るといわれています。
                </p>
                <div className="flex items-start justify-center py-8 w-full">
                  <div className="inset-0 h-auto rounded-lg w-full max-w-[896px] w-full">
                    <img alt="피쳐2_논문" className="block h-auto w-auto object-cover mx-auto" src={feature2_2} />
                  </div>
                </div>
                <div>
                  <p className="ty-body leading-relaxed">
                  そこで Yawaré は、<br className="block md:hidden"/>
                  頬が直接押されにくい&quot;フェイスホール構造&quot; を採用しました。<br></br><br className="block md:hidden"/>

                  横向きになっても圧力が分散しやすく、<br className="block md:hidden"/>
                  肌への接触をやさしく整える設計です。<br></br><br className="block md:hidden"/>

                  どんな姿勢でも、<br className="block md:hidden"/>
                  あなたの横顔をそっと守りやすいように配慮しています。
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
                  <h2 className="ty-keyline">
                  3. 肌との摩擦を最小限にする、シルクカバー
                  </h2>
                </div>
                <div className="pb-2">
                  <p className="ty-body leading-relaxed">
                  寝返りを打つたびに生じる小さな摩擦は、
                  肌にとっては負担となり、敏感さを招く原因にもなります。

                  そこでYawaréは、
                  その&quot;こすれ&quot;をシルクでやさしく包み込み、
                  肌への刺激をできるだけ抑えることを目指しました。
                  </p>
                <p className='ty-keyline leading-relaxed'>摩擦試験で実証された、究極のやさしさ。</p>
                </div>
                <div className="inset-0 h-auto rounded-lg w-full  max-w-[896px] w-full">
                  <img alt="피쳐3_소재" className="block h-auto w-auto object-cover mx-auto" src={feature3} />
                </div>
                <p className="ty-body leading-relaxed pt-6">
                  タオル・天然コットン・シルクを比較した摩擦テストでは、<br className="block md:hidden"/>
                  シルクだけが化粧コットンの乱れがほとんどなく、<br className="block md:hidden"/>
                  肌に触れる際の負担が小さいことが確認されています。
                </p>
              </div>
          </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          Yawaré — 体験モニターによるリアルレビュー
          </h2>
        </div>

        {/* Customer Reviews Section */}
        <section className="w-full py-16 bg-box">
          {/* 가운데 정렬용 컨테이너 */}
          <div className="mx-auto flex w-full max-w-[960px] flex-col px-4 md:px-8">

            {/* 2x2 카드 그리드 (모바일 1열, md 이상 2열) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* ▷ 카드 1: 상단 왼쪽 - 이미지 */}
              <article className="flex items-center justify-center rounded-3xl bg-box p-4">
                <img
                  src={review1}
                  alt="편안하게 잠자는 모습"
                  className="h-auto w-full rounded-3xl object-cover"
                />
              </article>

              {/* ▷ 카드 2: 상단 오른쪽 - 텍스트 리뷰 */}
              <article className="flex flex-col justify-between rounded-3xl border border-[#e0d8c8] bg-box p-6 md:p-8">
                <p className="mb-4 text-lg font-semibold text-[#a06840] md:text-xl">
                  「朝起きても、ほとんど跡が残りませんでした。」
                </p>
                <p className="mb-4 text-sm leading-relaxed ty-keyline">
                一晩中寝返りをしても、<br className="block md:hidden"/>やわらかく支えてくれるので、<br className="block md:hidden"/>顔まわりがとてもラクです。<br></br>
                朝のつっぱり感も少なくなりました。
                </p>
                <div className="space-y-1 text-xs ty-body">
                  <p>会社員・40代女性</p>
                  <p>睡眠満足度 ★★★★☆（4.6/5）</p>
                  <p>肌ストレス軽減を実感 90%</p>
                </div>
              </article>

              {/* ▷ 카드 3: 하단 왼쪽 - 텍스트 리뷰 */}
              <article className="order-4 md:order-3 flex flex-col justify-between rounded-3xl border border-[#e0d8c8] bg-box p-6 md:p-8">
                <p className="mb-4 text-lg font-semibold text-[#a06840] md:text-xl">
                「シルクのような肌ざわりで、肌がとてもラクになりました。」
                </p>
                <p className="mb-4 text-sm leading-relaxed ty-keyline">
                頬が枕に張りつく感じが少なくなり、<br className="block md:hidden"/>朝のむくみも軽くなった気がします。
                </p>
                <div className="space-y-1 text-xs ty-body">
                  <p>ビューティサロン運営・30代女性</p>
                  <p>睡眠満足度 ★★★★☆（4.8/5）</p>
                  <p>肌ストレス軽減 実感 75%</p>
                </div>
              </article>

              {/* ▷ 카드 4: 하단 오른쪽 - 이미지 */}
              <article className="order-3 md:order-4 flex items-center justify-center rounded-3xl bg-box p-4">
                <img
                  src={review2}
                  alt="숙면 중인 고객 모습"
                  className="h-auto w-full rounded-3xl object-cover"
                />
              </article>
            </div>
          </div>
        </section>

        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
          <h2 className="ty-keyline tracking-[0.15em]">
          SIZE SPEC / サイズ仕様
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
                    素材
                    </th>
                    <td className="px-4 py-2 text-center">
                    ドイツ BASF 社製 メモリーフォーム
                    </td>
                  </tr>
                  <tr className="border-y">
                    <th className="bg-gray-50 px-4 py-2 text-center font-semibold border-r">
                    カバー
                    </th>
                    <td className="px-4 py-2 text-center">
                    100% マルベリーシルク
                    </td>
                  </tr>
                  <tr className="border-y">
                    <th className="bg-gray-50 px-4 py-2 text-center font-semibold border-r">
                    サイズ
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


        <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
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
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start max-w-2xl mx-auto w-full">
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
                className="bg-[#F9CAD4] ty-body h-12 px-5 py-0 rounded-[12px] min-w-[84px] flex items-center justify-center hover:bg-[#F7BCC9] transition-colors"
                disabled={isSubmitting}
              >
                <span className="ty-keyline mt-0 tracking-[0.24px] whitespace-nowrap">
                  {isSubmitting ? '予約中...' : '特別予約'}
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
              <p className="text-sm ty-body">
                Yawaré
              </p>
            </div>
          </div>
        </footer>
      </div>

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
    </div>
  );
}