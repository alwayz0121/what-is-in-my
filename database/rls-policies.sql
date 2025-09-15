-- RLS (Row Level Security) 정책 설정
-- 모든 테이블에 대해 RLS 활성화 및 정책 생성

-- 1. users 테이블 RLS 정책
-- 사용자는 자신의 데이터만 조회/수정 가능
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 2. profiles 테이블 RLS 정책
-- 사용자는 자신의 프로필만 조회/수정 가능
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. storages 테이블 RLS 정책
-- 사용자는 자신의 저장소만 조회/수정/삭제 가능
ALTER TABLE storages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own storages" ON storages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own storages" ON storages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own storages" ON storages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own storages" ON storages
  FOR DELETE USING (auth.uid() = user_id);

-- 4. sections 테이블 RLS 정책
-- 사용자는 자신의 저장소에 속한 섹션만 조회/수정/삭제 가능
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view sections in own storages" ON sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = sections.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert sections in own storages" ON sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = sections.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update sections in own storages" ON sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = sections.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete sections in own storages" ON sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = sections.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

-- 5. items 테이블 RLS 정책
-- 사용자는 자신의 저장소에 속한 아이템만 조회/수정/삭제 가능
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view items in own storages" ON items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = items.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert items in own storages" ON items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = items.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update items in own storages" ON items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = items.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items in own storages" ON items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM storages 
      WHERE storages.id = items.storage_id 
      AND storages.user_id = auth.uid()
    )
  );

-- 6. item_history 테이블 RLS 정책
-- 사용자는 자신의 저장소에 속한 아이템의 히스토리만 조회 가능
ALTER TABLE item_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view item history in own storages" ON item_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM items 
      JOIN storages ON storages.id = items.storage_id
      WHERE items.id = item_history.item_id 
      AND storages.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert item history in own storages" ON item_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM items 
      JOIN storages ON storages.id = items.storage_id
      WHERE items.id = item_history.item_id 
      AND storages.user_id = auth.uid()
    )
  );

-- 7. notifications 테이블 RLS 정책
-- 사용자는 자신의 알림만 조회/수정 가능
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- RLS 정책 확인을 위한 뷰 생성 (선택사항)
CREATE OR REPLACE VIEW user_storage_summary AS
SELECT 
  s.id as storage_id,
  s.name as storage_name,
  s.type,
  s.item_count,
  s.section_count,
  s.expiring_count,
  s.last_updated,
  s.created_at
FROM storages s
WHERE s.user_id = auth.uid();

-- 뷰에 대한 RLS 정책
ALTER VIEW user_storage_summary SET (security_invoker = true);
