import { supabase } from '@/lib/supabase';

export async function GET() {
  const { count, error } = await supabase
    .from('applicant')
    .select('id', { count: 'exact' });

  if (error) {
    console.error('예약자 수 조회 중 오류 발생:', error);
    return new Response(JSON.stringify({ message: '데이터베이스 오류가 발생했습니다.' }), { status: 500 });
  }

  return Response.json({ totalReservations: count || 0 });
}
