# GTM + GA4 Setup Guide for First Message Tracking

## ✅ Current Implementation Status
- **Layout.astro**: Clean GTM-only setup (no duplicate GA4 script)
- **Analytics.ts**: Using dataLayer.push() for GTM compatibility
- **ChatApp.vue**: Event tracking implemented
- **GTM Container**: `GTM-TXHXQ8NW` (already loaded)

## 🎯 GTM Configuration Steps

### 1. GA4 Configuration Tag
**Go to GTM → Tags → New**
- **Tag Type**: `Google Tag`
- **Tag ID**: Your GA4 Measurement ID (G-XXXXXXXXXX)
- **Trigger**: All Pages
- **Tag Name**: "GA4 - Configuration"

### 2. Create Event Tags

#### A. First Message Sent Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Configuration Tag**: [Select your GA4 Configuration tag]
- **Event Name**: `chat_with_venn_initiated` (matches your code)
- **Event Parameters**:
  ```
  event_category: {{DLV - event_category}}
  event_label: {{DLV - event_label}}  
  pseudonym: {{DLV - pseudonym}}
  message_length: {{DLV - message_length}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `chat_with_venn_initiated`

#### B. Message Sent Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Configuration Tag**: [Select your GA4 Configuration tag]
- **Event Name**: `message_sent`
- **Event Parameters**:
  ```
  event_category: {{DLV - event_category}}
  event_label: {{DLV - event_label}}
  is_first_message: {{DLV - is_first_message}}
  message_length: {{DLV - message_length}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `message_sent`

#### C. Chat Session Start Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Event Name**: `chat_session_start`
- **Event Parameters**:
  ```
  event_category: {{DLV - event_category}}
  event_label: {{DLV - event_label}}
  pseudonym: {{DLV - pseudonym}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `chat_session_start`

#### D. Chat Completed Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Event Name**: `survey_chat_completed` (matches your code)
- **Event Parameters**:
  ```
  event_category: {{DLV - event_category}}
  event_label: {{DLV - event_label}}
  pseudonym: {{DLV - pseudonym}}
  message_count: {{DLV - message_count}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `survey_chat_completed`

#### E. Contact Form Submit Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Event Name**: `chat_contact_form_submitted`
- **Event Parameters**:
  ```
  event_category: {{DLV - event_category}}
  event_label: {{DLV - event_label}}
  name: {{DLV - name}}
  email: {{DLV - email}}
  company: {{DLV - company}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `chat_contact_form_submit`

#### F. See HR View Clicked Event
**Tags → New**
- **Tag Type**: `GA4 Event`
- **Event Name**: `see_hr_view_clicked`
- **Event Parameters**:
  ```
  event_category: {{DLV - event_label}}
  event_label: {{DLV - event_label}}
  pseudonym: {{DLV - pseudonym}}
  value: {{DLV - value}}
  ```
- **Trigger**: Custom Event = `see_hr_view_clicked`

### 3. Create Data Layer Variables

**Variables → New** (Create one for each parameter):

| Variable Name | Data Layer Variable Name |
|---------------|--------------------------|
| DLV - event_category | event_category |
| DLV - event_label | event_label |
| DLV - pseudonym | pseudonym |
| DLV - message_length | message_length |
| DLV - value | value |
| DLV - is_first_message | is_first_message |
| DLV - message_count | message_count |
| DLV - name | name |
| DLV - email | email |
| DLV - company | company |

### 4. Create Triggers

**Triggers → New** (Create one for each event):

| Trigger Name | Event Name |
|--------------|------------|
| CE - First Message Sent | chat_with_venn_initiated |
| CE - Message Sent | message_sent |
| CE - Chat Session Start | chat_session_start |
| CE - Chat Completed | survey_chat_completed |
| CE - Contact Form Submit | chat_contact_form_submit |
| CE - See HR View Clicked | see_hr_view_clicked |

**Configuration for each trigger**:
- **Trigger Type**: Custom Event
- **Event Name**: [Use the specific event name]
- **This trigger fires on**: All Custom Events

## 🧪 Testing Your Setup

### 1. GTM Preview Mode
1. Click **Preview** in GTM
2. Enter your website URL  
3. Open chat and send a message
4. Check GTM preview panel for fired events

### 2. Browser Console
- Open DevTools → Console
- Look for: `"GA Event tracked via GTM: chat_with_venn_initiated"`
- Verify dataLayer contains your events

### 3. GA4 DebugView
1. Install GA Debugger extension
2. GA4 → Configure → DebugView
3. Send test messages
4. Verify events appear in real-time

## 📊 Expected dataLayer Events

When a user sends their first message, this gets pushed to dataLayer:
```javascript
{
  event: "chat_with_venn_initiated",
  event_category: "engagement",
  event_label: "user_first_interaction", 
  pseudonym: "Alex",
  message_length: 25,
  value: 10
}
```

## 🚀 Final Steps
1. **Test** in Preview mode
2. **Submit** changes in GTM
3. **Publish** container
4. **Monitor** GA4 reports

Your events will now flow: **Code → GTM dataLayer → GA4** 🎯