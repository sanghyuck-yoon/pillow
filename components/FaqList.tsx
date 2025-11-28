"use client";

import { useState } from 'react';
import type { ReactNode } from 'react';

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

export default function FaqList() {
  // 複数開けるように、開いている項目のidを配列で管理
  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id)
        ? prev.filter(openId => openId !== id) // すでに開いていれば閉じる
        : [...prev, id]                        // 閉じていれば開く
    );
  };

  return (
    <>
      <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
        <h2 className="ty-keyline tracking-[0.15em]">
        よくあるご質問
        </h2>
      </div>

      <section className="py-12 md:py-16 w-full">
        <section className="mx-auto max-w-[90%] px-6 md:px-12 lg:px-48">
          {faqItems.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`border-b border-gray-300`}
              >
                {/* 質問ボタン */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 ty-keyline"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="ty-keyline">{item.question}</span>
                  <span className="text-xl leading-none">
                    {isOpen ? '−' : '＋'}
                  </span>
                </button>

                {/* 回答エリア */}
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
      </section>
    </>
  );
}
