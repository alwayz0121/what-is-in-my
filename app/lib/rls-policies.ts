import { sql } from "drizzle-orm";
import { db } from "~/supa-client";

/**
 * RLS 정책을 데이터베이스에 적용하는 함수들
 */

// RLS 활성화 함수
export async function enableRLS(tableName: string) {
  return await db.execute(sql.raw(`ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;`));
}

// RLS 정책 생성 함수
export async function createRLSPolicy(
  tableName: string,
  policyName: string,
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
  usingClause: string,
  withCheckClause?: string
) {
  const withCheck = withCheckClause ? ` WITH CHECK (${withCheckClause})` : '';
  const query = `
    CREATE POLICY "${policyName}" ON ${tableName}
    FOR ${operation} USING (${usingClause})${withCheck};
  `;
  
  return await db.execute(sql.raw(query));
}

// RLS 정책 삭제 함수
export async function dropRLSPolicy(tableName: string, policyName: string) {
  return await db.execute(sql.raw(`DROP POLICY IF EXISTS "${policyName}" ON ${tableName};`));
}

// 모든 RLS 정책 적용
export async function applyAllRLSPolicies() {
  try {
    // 1. users 테이블
    await enableRLS('users');
    await createRLSPolicy('users', 'Users can view own data', 'SELECT', 'auth.uid() = id');
    await createRLSPolicy('users', 'Users can insert own data', 'INSERT', 'auth.uid() = id', 'auth.uid() = id');
    await createRLSPolicy('users', 'Users can update own data', 'UPDATE', 'auth.uid() = id');

    // 2. profiles 테이블
    await enableRLS('profiles');
    await createRLSPolicy('profiles', 'Users can view own profile', 'SELECT', 'auth.uid() = id');
    await createRLSPolicy('profiles', 'Users can insert own profile', 'INSERT', 'auth.uid() = id', 'auth.uid() = id');
    await createRLSPolicy('profiles', 'Users can update own profile', 'UPDATE', 'auth.uid() = id');

    // 3. storages 테이블
    await enableRLS('storages');
    await createRLSPolicy('storages', 'Users can view own storages', 'SELECT', 'auth.uid() = user_id');
    await createRLSPolicy('storages', 'Users can insert own storages', 'INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
    await createRLSPolicy('storages', 'Users can update own storages', 'UPDATE', 'auth.uid() = user_id');
    await createRLSPolicy('storages', 'Users can delete own storages', 'DELETE', 'auth.uid() = user_id');

    // 4. sections 테이블
    await enableRLS('sections');
    const sectionsPolicy = `
      EXISTS (
        SELECT 1 FROM storages 
        WHERE storages.id = sections.storage_id 
        AND storages.user_id = auth.uid()
      )
    `;
    await createRLSPolicy('sections', 'Users can view sections in own storages', 'SELECT', sectionsPolicy);
    await createRLSPolicy('sections', 'Users can insert sections in own storages', 'INSERT', sectionsPolicy, sectionsPolicy);
    await createRLSPolicy('sections', 'Users can update sections in own storages', 'UPDATE', sectionsPolicy);
    await createRLSPolicy('sections', 'Users can delete sections in own storages', 'DELETE', sectionsPolicy);

    // 5. items 테이블
    await enableRLS('items');
    const itemsPolicy = `
      EXISTS (
        SELECT 1 FROM storages 
        WHERE storages.id = items.storage_id 
        AND storages.user_id = auth.uid()
      )
    `;
    await createRLSPolicy('items', 'Users can view items in own storages', 'SELECT', itemsPolicy);
    await createRLSPolicy('items', 'Users can insert items in own storages', 'INSERT', itemsPolicy, itemsPolicy);
    await createRLSPolicy('items', 'Users can update items in own storages', 'UPDATE', itemsPolicy);
    await createRLSPolicy('items', 'Users can delete items in own storages', 'DELETE', itemsPolicy);

    // 6. item_history 테이블
    await enableRLS('item_history');
    const itemHistoryPolicy = `
      EXISTS (
        SELECT 1 FROM items 
        JOIN storages ON storages.id = items.storage_id
        WHERE items.id = item_history.item_id 
        AND storages.user_id = auth.uid()
      )
    `;
    await createRLSPolicy('item_history', 'Users can view item history in own storages', 'SELECT', itemHistoryPolicy);
    await createRLSPolicy('item_history', 'Users can insert item history in own storages', 'INSERT', itemHistoryPolicy, itemHistoryPolicy);

    // 7. notifications 테이블
    await enableRLS('notifications');
    await createRLSPolicy('notifications', 'Users can view own notifications', 'SELECT', 'auth.uid() = user_id');
    await createRLSPolicy('notifications', 'Users can insert own notifications', 'INSERT', 'auth.uid() = user_id', 'auth.uid() = user_id');
    await createRLSPolicy('notifications', 'Users can update own notifications', 'UPDATE', 'auth.uid() = user_id');
    await createRLSPolicy('notifications', 'Users can delete own notifications', 'DELETE', 'auth.uid() = user_id');

    console.log('✅ 모든 RLS 정책이 성공적으로 적용되었습니다.');
    return true;
  } catch (error) {
    console.error('❌ RLS 정책 적용 중 오류 발생:', error);
    return false;
  }
}

// RLS 정책 제거
export async function removeAllRLSPolicies() {
  const tables = ['users', 'profiles', 'storages', 'sections', 'items', 'item_history', 'notifications'];
  
  try {
    for (const table of tables) {
      await db.execute(sql.raw(`ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`));
    }
    console.log('✅ 모든 RLS 정책이 제거되었습니다.');
    return true;
  } catch (error) {
    console.error('❌ RLS 정책 제거 중 오류 발생:', error);
    return false;
  }
}

// RLS 정책 상태 확인
export async function checkRLSStatus() {
  const query = `
    SELECT 
      schemaname,
      tablename,
      rowsecurity as rls_enabled
    FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename IN ('users', 'profiles', 'storages', 'sections', 'items', 'item_history', 'notifications')
    ORDER BY tablename;
  `;
  
  try {
    const result = await db.execute(sql.raw(query));
    console.log('📊 RLS 상태:', result);
    return result;
  } catch (error) {
    console.error('❌ RLS 상태 확인 중 오류 발생:', error);
    return null;
  }
}
