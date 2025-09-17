import { type RouteConfig } from "@react-router/dev/routes";
import { sql, eq, and, lt } from "drizzle-orm";
import { items } from "~/routes/storage/[id]/item/[itemId]/schema";
import { storages } from "~/routes/storage/schema";
import db from "~/db";

export const config: RouteConfig = {
  method: "POST",
};

export async function action({ request }: { request: Request }) {
  // HTTP 메서드 확인
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  // HTTP 헤더 확인
  const header = request.headers.get("X-EXPIRYCHECK");
  if (!header || header !== "X-EXPIRYCHECK") {
    return new Response(null, { status: 404 });
  }

  try {
    console.log("🕐 [CRON] 유통기한 만료 체크 시작...");
    
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
    
    // 만료된 아이템들을 찾아서 is_expired = true로 업데이트
    const expiredItems = await db
      .update(items)
      .set({ 
        is_expired: true,
        updated_at: new Date()
      })
      .where(
        and(
          eq(items.is_expired, false),
          lt(items.expiry_date, today)
        )
      )
      .returning({ 
        id: items.id, 
        name: items.name, 
        storage_id: items.storage_id,
        expiry_date: items.expiry_date
      });

    console.log(`✅ [CRON] ${expiredItems.length}개의 만료된 아이템을 업데이트했습니다.`);
    
    // 만료된 아이템들의 저장소 통계 업데이트
    const updatedStorages = new Set<string>();
    for (const item of expiredItems) {
      updatedStorages.add(item.storage_id);
    }

    // 각 저장소의 통계 업데이트
    for (const storageId of updatedStorages) {
      await updateStorageStats(storageId);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `${expiredItems.length}개의 만료된 아이템을 업데이트했습니다.`,
      expiredItems: expiredItems.map(item => ({
        id: item.id,
        name: item.name,
        expiry_date: item.expiry_date,
        storage_id: item.storage_id
      })),
      updatedStorages: Array.from(updatedStorages)
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("❌ [CRON] 유통기한 만료 체크 중 오류:", error);
    
    return new Response(JSON.stringify({
      success: false,
      message: "유통기한 만료 체크 중 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "알 수 없는 오류"
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

/**
 * 저장소 통계 업데이트 헬퍼 함수
 */
async function updateStorageStats(storageId: string) {
  try {
    // 아이템 개수 계산
    const itemCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(items)
      .where(eq(items.storage_id, storageId));
    
    const itemCount = itemCountResult[0]?.count || 0;

    // 섹션 개수 계산
    const sectionCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(storages)
      .where(eq(storages.id, storageId));
    
    const sectionCount = sectionCountResult[0]?.count || 0;

    // 만료 예정 아이템 개수 계산 (3일 내)
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    const expiryDate = threeDaysFromNow.toISOString().split('T')[0];
    
    const expiringCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(items)
      .where(
        and(
          eq(items.storage_id, storageId),
          eq(items.is_expired, false),
          eq(items.is_consumed, false),
          sql`${items.expiry_date} >= ${new Date().toISOString().split('T')[0]}`,
          sql`${items.expiry_date} < ${expiryDate}`
        )
      );
    
    const expiringCount = expiringCountResult[0]?.count || 0;

    // 저장소 통계 업데이트
    await db
      .update(storages)
      .set({
        item_count: itemCount,
        section_count: sectionCount,
        expiring_count: expiringCount,
        last_updated: new Date(),
        updated_at: new Date()
      })
      .where(eq(storages.id, storageId));

    console.log(`📊 저장소 ${storageId} 통계 업데이트 완료: 아이템 ${itemCount}개, 섹션 ${sectionCount}개, 만료예정 ${expiringCount}개`);

  } catch (error) {
    console.error(`❌ 저장소 ${storageId} 통계 업데이트 중 오류:`, error);
  }
}
