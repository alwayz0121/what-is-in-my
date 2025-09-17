# 🕐 Supabase CRON 작업 설정 가이드

이 문서는 Supabase를 사용하여 매일 오전 9시에 만료된 아이템 상태를 업데이트하는 CRON 작업을 설정하는 방법을 설명합니다.

## 📋 구현된 기능

### 1. **API 엔드포인트** (`/api/cron/expiry-check`)
- **HTTP 메서드**: POST
- **헤더**: `X-EXPIRYCHECK: X-EXPIRYCHECK`
- **기능**: 만료된 아이템들을 `is_expired = true`로 업데이트

### 2. **Supabase Edge Function** (`expiry-check`)
- **경로**: `/functions/v1/expiry-check`
- **HTTP 메서드**: POST
- **헤더**: `X-EXPIRYCHECK: X-EXPIRYCHECK`
- **기능**: 동일한 기능을 Supabase Edge Function으로 구현

## 🚀 설정 방법

### 1. **Supabase Edge Function 배포**

```bash
# Supabase CLI 설치 (이미 설치되어 있다면 생략)
npm install -g supabase

# Supabase 프로젝트에 로그인
supabase login

# Edge Function 배포
supabase functions deploy expiry-check
```

### 2. **Supabase에서 CRON 작업 설정**

#### 방법 1: Supabase Dashboard 사용
1. [Supabase Dashboard](https://supabase.com/dashboard) 로그인
2. 프로젝트 선택
3. **Database** → **Cron Jobs** 이동
4. **New Cron Job** 클릭
5. 다음 설정 입력:
   - **Name**: `expiry-check`
   - **Schedule**: `0 9 * * *` (매일 오전 9시)
   - **Function**: `expiry-check`
   - **Headers**: `{"X-EXPIRYCHECK": "X-EXPIRYCHECK"}`

#### 방법 2: SQL로 직접 설정
```sql
-- Supabase SQL Editor에서 실행
SELECT cron.schedule(
  'expiry-check',
  '0 9 * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://your-project-ref.supabase.co/functions/v1/expiry-check',
      headers := '{"Content-Type": "application/json", "X-EXPIRYCHECK": "X-EXPIRYCHECK"}'::jsonb,
      body := '{}'::jsonb
    ) as request_id;
  $$
);
```

### 3. **환경 변수 설정**

Supabase Edge Function에서 사용할 환경 변수를 설정합니다:

```bash
# Supabase CLI로 환경 변수 설정
supabase secrets set SUPABASE_URL=https://your-project-ref.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🧪 테스트 방법

### 1. **로컬 테스트**
```bash
# 개발 서버 실행
npm run dev

# 다른 터미널에서 테스트 실행
npm run test:expiry-check
```

### 2. **API 엔드포인트 직접 테스트**
```bash
curl -X POST http://localhost:3000/api/cron/expiry-check \
  -H "Content-Type: application/json" \
  -H "X-EXPIRYCHECK: X-EXPIRYCHECK"
```

### 3. **Supabase Edge Function 테스트**
```bash
curl -X POST https://your-project-ref.supabase.co/functions/v1/expiry-check \
  -H "Content-Type: application/json" \
  -H "X-EXPIRYCHECK: X-EXPIRYCHECK"
```

## 📊 CRON 작업 모니터링

### 1. **Supabase Dashboard에서 확인**
- **Database** → **Cron Jobs**에서 실행 상태 확인
- **Functions** → **Logs**에서 실행 로그 확인

### 2. **로그 확인**
```bash
# Supabase CLI로 로그 확인
supabase functions logs expiry-check
```

### 3. **수동 실행**
```bash
# Supabase CLI로 수동 실행
supabase functions invoke expiry-check --data '{}'
```

## 🔧 문제 해결

### 1. **권한 오류**
- `SUPABASE_SERVICE_ROLE_KEY`가 올바르게 설정되었는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 2. **네트워크 오류**
- Supabase URL이 올바른지 확인
- 방화벽 설정 확인

### 3. **스케줄 오류**
- CRON 표현식이 올바른지 확인 (`0 9 * * *`)
- 시간대 설정 확인

## 📈 성능 최적화

### 1. **배치 처리**
```typescript
// 대용량 데이터 처리 시 배치 크기 제한
const BATCH_SIZE = 1000;
for (let i = 0; i < totalItems; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  await processBatch(batch);
}
```

### 2. **인덱스 최적화**
```sql
-- 만료일 기준 조회 최적화
CREATE INDEX idx_items_expiry_date ON items(expiry_date);
CREATE INDEX idx_items_storage_id ON items(storage_id);
```

### 3. **통계 업데이트 최적화**
```typescript
// 저장소별로 통계를 한 번에 업데이트
const storageStats = new Map();
for (const item of expiredItems) {
  const stats = storageStats.get(item.storage_id) || { count: 0, expiring: 0 };
  stats.count++;
  storageStats.set(item.storage_id, stats);
}
```

## 🎯 추가 CRON 작업 확장

### 1. **만료 예정 알림** (`expiry-notification`)
```typescript
// 3일 내 만료 예정 아이템에 대한 알림 생성
const threeDaysFromNow = new Date();
threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
```

### 2. **데이터 정리** (`cleanup`)
```typescript
// 30일 이상 된 읽지 않은 알림 정리
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
```

### 3. **통계 업데이트** (`stats-update`)
```typescript
// 모든 저장소의 통계 업데이트
const allStorages = await db.select({ id: storages.id }).from(storages);
```

이제 Supabase를 사용하여 안정적이고 확장 가능한 CRON 작업 시스템이 구축되었습니다! 🎉
