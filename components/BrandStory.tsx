import Image from 'next/image';

export default function BrandStory() {
  const founderImage = "/image/founder.jpg";
  const brandImg = "/image/brandImg.png";
  const productImage2 = "/image/product_explain.jpg";

  return (
    <>
      <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
        <h2 className="ty-keyline tracking-[0.15em]">
        わたしたちがYawaréを作った理由
        </h2>
      </div>

      {/* ブランドヒストリー Section */}
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
            <Image alt="創業者の想い" className="block h-40 w-40 mx-auto rounded-md opacity-80" src={founderImage} width={160} height={160} />
          </div>
        </div>
      </section>

      {/* Yawaréの人間工学ソリューション Section */}
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
            <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                <Image alt="Yawaré ブランドイメージ" className="block h-auto w-auto object-cover mx-auto" src={brandImg} width={896} height={500} />
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
              <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                <Image alt="Yawaré プロダクトイメージ" className="block h-auto w-auto object-cover mx-auto" src={productImage2} width={896} height={500} />
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
