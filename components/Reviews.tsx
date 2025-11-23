import Image from 'next/image';

export default function Reviews() {
  const review1 = "/image/후기사진1.png";
  const review2 = "/image/후기사진2.png";

  return (
    <>
      <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
        <h2 className="ty-keyline tracking-[0.15em]">
        Yawaré — 体験モニターによるリアルレビュー
        </h2>
      </div>

      {/* Customer Reviews Section */}
      <section className="w-full py-16 bg-box">
        {/* 中央揃え用コンテナ */}
        <div className="mx-auto flex w-full max-w-[960px] flex-col px-4 md:px-8">

          {/* 2x2 カードグリッド (モバイル1列, md以上2列) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* ▷ カード 1: 上段左 - 画像 */}
            <article className="flex items-center justify-center rounded-3xl bg-box p-4">
              <Image
                src={review1}
                alt="快適に眠る様子"
                className="h-auto w-full rounded-3xl object-cover"
                width={400}
                height={300}
              />
            </article>

            {/* ▷ カード 2: 上段右 - テキストレビュー */}
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

            {/* ▷ カード 3: 下段左 - テキストレビュー */}
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

            {/* ▷ カード 4: 下段右 - 画像 */}
            <article className="order-3 md:order-4 flex items-center justify-center rounded-3xl bg-box p-4">
              <Image
                src={review2}
                alt="熟睡中の顧客の様子"
                className="h-auto w-full rounded-3xl object-cover"
                width={400}
                height={300}
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
