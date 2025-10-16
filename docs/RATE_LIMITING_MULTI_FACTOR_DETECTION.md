# Multi-Factor Rate Limiting & Abuse Detection

**Status**: ✅ Implemented (2025-01-16)  
**Edge Function**: `conversation-rate-limiter`  
**Client Services**: `conversationLimitService.ts`, `useVisitorTracking.ts`, `genieAnalyticsService.ts`

## Overview

Enhanced rate limiting with multi-factor abuse detection to prevent conversation spam and API abuse.

## ✅ What Was Fixed

### 1. **CORS/429 Errors Eliminated**
- ❌ **Before**: Client-side calls to `ipapi.co` caused CORS and 429 rate limit errors
- ✅ **After**: Removed all client-side geo lookups
  - `useVisitorTracking.ts`: Removed `ipapi.co/json/` calls
  - `genieAnalyticsService.ts`: Removed `ipapi.co/${ip}/json/` calls
  - Geo data is now **optional** and server-side only

### 2. **IP Caching Retained**
- ✅ `api.ipify.org` still works (no CORS issues)
- ✅ IP cached in `sessionStorage` for performance
- ✅ 5-second timeout with fallback to `0.0.0.0`

---

## 🛡️ Multi-Factor Abuse Detection (Option A)

### Detection Layers

#### 1. **IP-Based Limiting** (Primary)
```typescript
const DAILY_IP_LIMIT = 10   // Reduced to 3 if suspicious
const HOURLY_IP_LIMIT = 5   // Reduced to 2 if suspicious
```
- Tracks all conversations from same IP address
- **Same IP = counted together** regardless of session ID or email

#### 2. **Email-Based Limiting** (Secondary)
```typescript
const DAILY_EMAIL_LIMIT = 20  // Reduced to 5 if suspicious
const HOURLY_EMAIL_LIMIT = 10 // Reduced to 3 if suspicious
```
- Tracks conversations per email address
- **Same email = counted together** across all IPs

#### 3. **IP + Email Combo Limiting** (New!)
```typescript
const IP_EMAIL_COMBO_LIMIT = 8 // Daily limit for specific IP+email pairs
```
- Stricter limit for **specific IP+email combinations**
- Prevents single user from spamming from one location

#### 4. **Browser Fingerprinting** (New!)
```typescript
const browserFingerprint = crypto.subtle.digest('SHA-256', user_agent)
```
- Hashes user agent string for tracking
- Helps detect automated bots vs real users
- Stored for audit purposes

#### 5. **Suspicious Activity Detection** (New!)
Flags and blocks when:
- ✅ **Email used from 5+ different IPs in 24 hours**
  - Abuse flag: `"Email used from X IPs in 24h"`
- ✅ **Rapid-fire requests (3+ in 5 minutes)**
  - Abuse flag: `"Rapid-fire requests detected"`

When suspicious activity detected:
- 🔒 Limits reduced to **3 daily / 2 hourly** (IP)
- 🔒 Limits reduced to **5 daily / 3 hourly** (Email)
- 🚫 Access temporarily blocked until reset

---

## 📊 Tracking Tables

### `conversation_tracking` (Main)
Stores every conversation with:
- `ip_address` - User's IP
- `user_email` - User's email (if provided)
- `session_id` - Unique conversation session
- `started_at` - Conversation start timestamp
- `message_count` - Number of messages exchanged

### `conversation_sessions` (Metadata)
Stores session metadata with:
- `session_id` - Unique session identifier
- `ip_address` - User's IP
- `user_email` - User's email
- `conversation_count` - Total conversations from this session
- `last_conversation_at` - Last activity timestamp

---

## 🔄 How It Works

### Step 1: User Starts Conversation
```typescript
conversationLimitService.startConversation(context, email, name)
```

**Edge Function Checks**:
1. Count IP daily/hourly conversations
2. Count email daily/hourly conversations (if provided)
3. Count IP+email combo conversations
4. Check for suspicious patterns:
   - Email from multiple IPs?
   - Rapid-fire requests?
5. Generate browser fingerprint hash
6. **Block if ANY limit exceeded OR suspicious activity**

### Step 2: Rate Limit Response
```json
{
  "allowed": false,
  "restriction_reason": "Suspicious activity detected: Email used from 7 IPs in 24h",
  "limits": {
    "daily_count": 3,
    "daily_limit": 3,
    "ip_email_combo_count": 9,
    "ip_email_combo_limit": 8,
    "suspicious_activity": true,
    "abuse_flags": ["Email used from 7 IPs in 24h"]
  },
  "reset_time": "2025-01-17T15:56:22.736Z"
}
```

### Step 3: User Sees Modal
```tsx
<ConversationLimitModal 
  show={showLimitModal}
  limits={conversationLimits}
/>
```

---

## 🎯 Why Geo Cache is NOT Needed

### Current Geo Cache Usage
- ❌ **Not used for rate limiting** (IP address is sufficient)
- ❌ **Only for analytics** (visitor location tracking)
- ❌ **Causes CORS/429 errors** (client-side API calls blocked)

### What We Use Instead
✅ **IP Address** (`api.ipify.org`)
- Works without CORS issues
- Cached in sessionStorage
- Sufficient for rate limiting

✅ **Browser Fingerprint** (user agent hash)
- Detects bots vs real users
- No external API needed

✅ **Behavioral Analysis** (multi-IP detection, rapid-fire)
- Tracks patterns over time
- No geo data needed

### If You Need Geo Data (Optional)
**Option**: Add server-side geo lookup in edge function
```typescript
// In conversation-rate-limiter edge function (optional)
if (action === 'start') {
  // Optionally fetch geo for analytics
  const geoResponse = await fetch(`https://ipapi.co/${ip_address}/json/`)
  const geoData = await geoResponse.json()
  // Store in conversation_tracking.metadata
}
```

---

## 🚀 Benefits

### Security
- 🛡️ **Multi-layer protection** (5 detection methods)
- 🚫 **Blocks suspicious patterns** before abuse escalates
- 🔒 **Dynamic limits** (stricter when suspicious)

### Performance
- ⚡ **No client-side geo calls** (eliminates CORS/429)
- 💾 **Session caching** (IP cached, no repeated lookups)
- 🎯 **Targeted blocking** (only abusers affected)

### User Experience
- ✅ **Legitimate users unaffected** (generous limits)
- 📊 **Clear error messages** (explains why blocked)
- ⏰ **Reset time shown** (24-hour rolling window)

---

## 📝 Example: Abuse Detection Flow

### Scenario: Attacker with Multiple IPs
1. User `attacker@example.com` starts conversation from IP `1.2.3.4`
2. Repeats from IPs `5.6.7.8`, `9.10.11.12`, `13.14.15.16`, `17.18.19.20`, `21.22.23.24`
3. **After 6th IP**: System detects `"Email used from 6 IPs in 24h"`
4. **Response**:
   ```json
   {
     "allowed": false,
     "suspicious_activity": true,
     "abuse_flags": ["Email used from 6 IPs in 24h"],
     "restriction_reason": "Suspicious activity detected: Email used from 6 IPs in 24h. Access temporarily restricted."
   }
   ```
5. **All future requests blocked** until 24-hour reset

---

## 🧪 Testing

### Test Legitimate User
```typescript
// Should pass all checks
await conversationLimitService.startConversation(
  'technology',
  'user@example.com',
  'John'
)
// ✅ allowed: true
```

### Test Rapid-Fire Abuse
```typescript
// 4 requests in 5 minutes from same IP+email
for (let i = 0; i < 4; i++) {
  await conversationLimitService.startConversation(...)
}
// 🚫 4th request blocked: "Rapid-fire requests detected"
```

### Test Multi-IP Abuse
```typescript
// Same email from 6 different IPs
for (let ip of ['1.1.1.1', '2.2.2.2', ..., '6.6.6.6']) {
  // Mock different IPs
  await conversationLimitService.startConversation(...)
}
// 🚫 6th request blocked: "Email used from 6 IPs in 24h"
```

---

## ⚙️ Configuration

### Adjust Limits (in edge function)
```typescript
// supabase/functions/conversation-rate-limiter/index.ts

// Normal limits
const DAILY_IP_LIMIT = 10
const HOURLY_IP_LIMIT = 5
const DAILY_EMAIL_LIMIT = 20
const HOURLY_EMAIL_LIMIT = 10
const IP_EMAIL_COMBO_LIMIT = 8

// Suspicious activity thresholds
const MULTI_IP_THRESHOLD = 5  // Email from 5+ IPs = suspicious
const RAPID_FIRE_THRESHOLD = 3 // 3+ requests in 5 min = suspicious
```

---

## 📌 Summary

| Feature | Status | Notes |
|---------|--------|-------|
| IP-based limiting | ✅ Working | 10 daily, 5 hourly (normal) |
| Email-based limiting | ✅ Working | 20 daily, 10 hourly (normal) |
| IP+Email combo limiting | ✅ New | 8 daily (strict) |
| Browser fingerprinting | ✅ New | SHA-256 hash of user agent |
| Multi-IP detection | ✅ New | Blocks if email from 5+ IPs |
| Rapid-fire detection | ✅ New | Blocks if 3+ in 5 minutes |
| Geo cache | ❌ Removed | Not needed (caused CORS/429) |
| CORS errors | ✅ Fixed | Removed client-side geo calls |
| 429 errors | ✅ Fixed | No more ipapi.co rate limits |

**Result**: Robust multi-factor abuse protection without geo data or CORS/429 errors.
