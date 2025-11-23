import Image from 'next/image';

export default function ProductSpecs() {
  const sizeSpec = "/image/size.png";

  return (
    <>
      <div className="w-full bg-[#f3f1e4] border-y border-[#222222] px-6 md:px-12 lg:px-48 py-4">
        <h2 className="ty-keyline tracking-[0.15em]">
        SIZE SPEC / サイズ仕様
        </h2>
      </div>

      {/* Size Spec */}
      <section className="bg-white py-12 md:py-16 w-full">
        <div className="flex flex-col gap-8 items-start max-w-[1536px] px-4 md:px-12 lg:px-48 mx-auto w-full">
          <div className="flex flex-col gap-6 md:gap-8 items-start justify-center relative w-full">
            {/* Spec Image */}
            <div className="inset-0 h-auto rounded-lg w-full max-w-[896px]">
              <Image alt="sizeSpec" className="block h-auto w-auto object-cover mx-auto" src={sizeSpec} width={896} height={500} />
            </div>
            {/* Spec Table */}
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
    </>
  );
}
