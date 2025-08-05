// Analytics utility functions for Google Analytics event tracking via GTM dataLayer

export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Track a Google Analytics event through GTM dataLayer
 */
export const trackGAEvent = (eventName: string, params: GAEventParams = {}) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params
    });
    console.log(`GA Event tracked via GTM: ${eventName}`, params);
  } else {
    console.warn('GTM dataLayer not available');
  }
};

/**
 * Track when a user sends their first message
 */
export const trackFirstMessage = (pseudonym: string, messageLength: number) => {
  trackGAEvent('chat_with_venn_initiated', {
    event_category: 'engagement',
    event_label: 'user_first_interaction',
    pseudonym,
    message_length: messageLength,
    value: 10
  });
};

/**
 * Track when a user sends any message
 */
export const trackMessageSent = (isFirstMessage: boolean, messageLength: number) => {
  trackGAEvent('message_sent', {
    event_category: 'engagement',
    event_label: 'user_interaction',
    is_first_message: isFirstMessage,
    message_length: messageLength,
    value: 1
  });
};


/**
 * Track when user completes the chat and shows results
 */
export const trackChatCompletion = (pseudonym: string, messageCount: number) => {
  trackGAEvent('survey_chat_completed', {
    event_category: 'conversion',
    event_label: 'chat_completion',
    pseudonym,
    message_count: messageCount,
    value: 50 // High value for completion
  });
};

/**
 * Track contact form submission from chat
 */
export const trackChatContactFormSubmit = (name: string, email: string, company: string) => {
  trackGAEvent('chat_contact_form_submit', {
    event_category: 'conversion',
    event_label: 'contact_form_from_chat',
    name,
    email,
    company,
    value: 100 // Highest value for lead generation
  });
};

/**
 * Track when user clicks "View as HR" button
 */
export const trackSeeHRViewClick = (pseudonym: string) => {
  trackGAEvent('see_hr_view_clicked', {
    event_category: 'navigation',
    event_label: 'hr_dashboard_access',
    pseudonym,
    value: 25 // High value for advanced feature usage
  });
};