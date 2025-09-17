#!/usr/bin/env tsx

/**
 * expiry-check CRON 작업 테스트 스크립트
 * 
 * 사용법:
 * npm run test:expiry-check
 */

import dotenv from "dotenv";

// 환경 변수 로드
dotenv.config();

async function testExpiryCheck() {
  // 로컬 개발 서버 우선 사용
  const baseUrl = 'http://localhost:5173';
  const apiUrl = `${baseUrl}/api/cron/expiry-check`;
  
  console.log('🧪 expiry-check CRON 작업 테스트 시작...');
  console.log(`📡 API URL: ${apiUrl}`);
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-EXPIRYCHECK': 'X-EXPIRYCHECK'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ CRON 작업 성공!');
      console.log(`📊 결과: ${data.message}`);
      console.log(`🔄 업데이트된 아이템 수: ${data.expiredItems?.length || 0}`);
      console.log(`📦 업데이트된 저장소 수: ${data.updatedStorages?.length || 0}`);
      
      if (data.expiredItems && data.expiredItems.length > 0) {
        console.log('\n📋 만료된 아이템 목록:');
        data.expiredItems.forEach((item: any, index: number) => {
          console.log(`  ${index + 1}. ${item.name} (만료일: ${item.expiry_date})`);
        });
      }
    } else {
      console.error('❌ CRON 작업 실패!');
      console.error(`상태 코드: ${response.status}`);
      console.error(`오류 메시지: ${data.message || '알 수 없는 오류'}`);
    }
    
  } catch (error) {
    console.error('❌ 네트워크 오류:', error);
  }
}

async function testSupabaseFunction() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const functionUrl = `${supabaseUrl}/functions/v1/expiry-check`;
  
  if (!supabaseUrl) {
    console.log('⚠️ Supabase URL이 설정되지 않았습니다. 로컬 API를 테스트합니다.');
    return;
  }
  
  console.log('\n🧪 Supabase Edge Function 테스트 시작...');
  console.log(`📡 Function URL: ${functionUrl}`);
  
  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-EXPIRYCHECK': 'X-EXPIRYCHECK'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Supabase Function 성공!');
      console.log(`📊 결과: ${data.message}`);
      console.log(`🔄 업데이트된 아이템 수: ${data.expiredItems?.length || 0}`);
      console.log(`📦 업데이트된 저장소 수: ${data.updatedStorages?.length || 0}`);
    } else {
      console.error('❌ Supabase Function 실패!');
      console.error(`상태 코드: ${response.status}`);
      console.error(`오류 메시지: ${data.message || '알 수 없는 오류'}`);
    }
    
  } catch (error) {
    console.error('❌ Supabase Function 네트워크 오류:', error);
  }
}

async function main() {
  console.log('🚀 CRON 작업 테스트를 시작합니다...\n');
  
  // 로컬 API 테스트
  await testExpiryCheck();
  
  // Supabase Function 테스트 (선택사항)
  await testSupabaseFunction();
  
  console.log('\n✅ 테스트 완료!');
}

main().catch((error) => {
  console.error('❌ 테스트 실행 중 오류 발생:', error);
  process.exit(1);
});
