import Image from 'next/image';

interface HeroProps {
  totalReservations: number;
  timeLeft: string;
  onScrollToEmail: () => void;
}

export default function Hero({ totalReservations, timeLeft, onScrollToEmail }: HeroProps) {
  const heroImage = "/image/Hero.png";
  const brandlogo = "/image/브랜드명.png";

  return (
    <>
      {/* Header - Sticky */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[rgba(246,247,248,0.8)]">
        <div className="flex items-center justify-between p-2 max-w-screen-2xl mx-auto w-full">
          <img
            src={brandlogo}
            alt="Yaware 로고"
            className="max-h-[70px] md:h-auto max-w-[150px] md:w-auto object-cover"
          />
          <button
            onClick={onScrollToEmail}
            className="bg-[#F9CAD4] text-[#3A3A3A] px-4 py-2 text-sm rounded-full font-semibold tracking-[0.21px] hover:bg-[#F7BCC9] transition-colors"
            style={{ fontFamily: 'var(--font-noto-sans-jp)' }}
          >
            特別予約
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col bg-box md:flex-row items-center justify-between gap-10 px-4 md:px-12 lg:px-48 pt-24 pb-10 md:pt-32 md:pb-20 w-full">
        {/* 左カラム: テキスト + 予約情報 + CTAボタン */}
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
          
          {/* ✅ モバイル専用背景画像レイヤー */}
          <div className="block md:hidden">
            <Image
              src={heroImage}
              alt="Yawaré ベ개"
              className="h-auto w-auto object-cover"
              width={600}
              height={400}
            />
          </div>

          {/* 予約情報 */}
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

          {/* CTAボタン */}
          <button
            onClick={onScrollToEmail}
            className="bg-[#F9CAD4] text-[#3A3A3A] px-[20px] py-[16px] rounded-[12px] max-w-[480px] w-full md:w-auto flex items-center justify-center hover:bg-[#F7BCC9] transition-colors"
          >
            【先着100名様限定】
            <br className="block md:hidden" />
            20％OFFでご予約いただけます
          </button>
        </div>

        {/* 右カラム: 画像 */}
        <div className="hidden w-full md:block md:w-1/2">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              alt="Yawaré ベ개"
              src={heroImage}
              className="block h-full w-full object-cover"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>
    </>
  );
}
