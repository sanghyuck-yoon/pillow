import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ message: '이메일 주소를 입력해주세요.' }), { status: 400 });
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ message: '유효한 이메일 주소를 입력해주세요.' }), { status: 400 });
  }

  // 중복 이메일 체크
  const { data: existingApplicant, error: checkError } = await supabase
    .from('applicant')
    .select('id')
    .eq('email', email)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('중복 이메일 체크 중 오류 발생:', checkError);
    return new Response(JSON.stringify({ message: '데이터베이스 오류가 발생했습니다.' }), { status: 500 });
  }

  if (existingApplicant) {
    return new Response(JSON.stringify({ message: '이미 사전 예약된 이메일 주소입니다.' }), { status: 409 });
  }

  // 이메일 데이터베이스 저장 (UTC+9 기준 시간 저장)
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // 밀리초 단위의 UTC와의 차이
  const KST_offset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const KST_time = new Date(now.getTime() - offset + KST_offset);

  const { error } = await supabase
    .from('applicant')
    .insert([
      { email, created_at: KST_time.toISOString() },
    ]);

  if (error) {
    console.error('이메일 저장 중 오류 발생:', error);
    return new Response(JSON.stringify({ message: '데이터베이스 저장에 실패했습니다.' }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: '성공적으로 구독되었습니다!' }), { status: 200 });
}
