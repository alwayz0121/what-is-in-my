import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, X-EXPIRYCHECK',
}

serve(async (req) => {
  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // HTTP 메서드 확인
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  // HTTP 헤더 확인
  const header = req.headers.get('X-EXPIRYCHECK')
  if (!header || header !== 'X-EXPIRYCHECK') {
    return new Response(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    console.log('🕐 [CRON] 유통기한 만료 체크 시작...')
    
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식
    
    // Supabase 클라이언트 초기화
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    // 만료된 아이템들을 찾아서 is_expired = true로 업데이트
    const { data: expiredItems, error: updateError } = await fetch(`${supabaseUrl}/rest/v1/items`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        is_expired: true,
        updated_at: new Date().toISOString()
      })
    }).then(res => res.json())

    if (updateError) {
      throw new Error(`아이템 업데이트 실패: ${updateError.message}`)
    }

    // 만료된 아이템들 조회
    const { data: items, error: fetchError } = await fetch(`${supabaseUrl}/rest/v1/items?select=id,name,storage_id,expiry_date&is_expired=eq.true&expiry_date=lt.${today}`, {
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      }
    }).then(res => res.json())

    if (fetchError) {
      throw new Error(`아이템 조회 실패: ${fetchError.message}`)
    }

    console.log(`✅ [CRON] ${items.length}개의 만료된 아이템을 업데이트했습니다.`)
    
    // 만료된 아이템들의 저장소 통계 업데이트
    const updatedStorages = new Set<string>()
    for (const item of items) {
      updatedStorages.add(item.storage_id)
    }

    // 각 저장소의 통계 업데이트
    for (const storageId of updatedStorages) {
      await updateStorageStats(storageId, supabaseUrl, supabaseServiceKey)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `${items.length}개의 만료된 아이템을 업데이트했습니다.`,
        expiredItems: items.map((item: any) => ({
          id: item.id,
          name: item.name,
          expiry_date: item.expiry_date,
          storage_id: item.storage_id
        })),
        updatedStorages: Array.from(updatedStorages)
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('❌ [CRON] 유통기한 만료 체크 중 오류:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        message: '유통기한 만료 체크 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

/**
 * 저장소 통계 업데이트 헬퍼 함수
 */
async function updateStorageStats(storageId: string, supabaseUrl: string, serviceKey: string) {
  try {
    // 아이템 개수 계산
    const { count: itemCount } = await fetch(`${supabaseUrl}/rest/v1/items?storage_id=eq.${storageId}&select=count`, {
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey
      }
    }).then(res => res.json())

    // 섹션 개수 계산
    const { count: sectionCount } = await fetch(`${supabaseUrl}/rest/v1/sections?storage_id=eq.${storageId}&select=count`, {
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey
      }
    }).then(res => res.json())

    // 만료 예정 아이템 개수 계산 (3일 내)
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)
    const expiryDate = threeDaysFromNow.toISOString().split('T')[0]
    
    const { count: expiringCount } = await fetch(`${supabaseUrl}/rest/v1/items?storage_id=eq.${storageId}&is_expired=eq.false&is_consumed=eq.false&expiry_date=gte.${new Date().toISOString().split('T')[0]}&expiry_date=lt.${expiryDate}&select=count`, {
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey
      }
    }).then(res => res.json())

    // 저장소 통계 업데이트
    await fetch(`${supabaseUrl}/rest/v1/storages?id=eq.${storageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'apikey': serviceKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item_count: itemCount || 0,
        section_count: sectionCount || 0,
        expiring_count: expiringCount || 0,
        last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })

    console.log(`📊 저장소 ${storageId} 통계 업데이트 완료: 아이템 ${itemCount || 0}개, 섹션 ${sectionCount || 0}개, 만료예정 ${expiringCount || 0}개`)

  } catch (error) {
    console.error(`❌ 저장소 ${storageId} 통계 업데이트 중 오류:`, error)
  }
}
