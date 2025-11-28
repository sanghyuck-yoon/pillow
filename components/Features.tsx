import Image from 'next/image';

export default function Features() {
  const feature1 = "/image/5.png";
  const feature1_2 = "/image/6번.png";
  const feature2 = "/image/7.png";
  const feature2_2 = "/image/8.png";
  const feature2_3 = "/image/feature2_3.jpg";
  const feature3 = "/image/feature3.jpg";

  return (
    <>
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
                <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                    <Image alt="Yawaré Feature 1" className="block h-auto w-auto object-cover mx-auto" src={feature1} width={896} height={500} />
                </div>
                <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                  <Image alt="Yawaré Feature 1_1" className="block h-auto w-auto object-cover mx-auto" src={feature1_2} width={896} height={500} />
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
                  <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                    <Image alt="Feature 2 Graph" className="block h-auto w-auto object-cover mx-auto" src={feature2} width={896} height={500} />
                  </div>
              </div>
              <p className="ty-body leading-relaxed">
              日本の女性の約6割は横向きで眠るといわれています。
              </p>
              <div className="flex items-start justify-center py-8 w-full">
                <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                  <Image alt="Feature 2 Paper" className="block h-auto w-auto object-cover mx-auto" src={feature2_2} width={896} height={500} />
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
                  <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                      <Image alt="Feature 2 Sleeping" className="block h-auto w-auto object-cover mx-auto" src={feature2_3} width={896} height={500} />
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
              <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
                <Image alt="Feature 3 Material" className="block h-auto w-auto object-cover mx-auto" src={feature3} width={896} height={500} />
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
    </>
  );
}
