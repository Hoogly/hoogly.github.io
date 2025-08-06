// Analytics utility functions for Google Analytics event tracking via GTM dataLayer

export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Check if GTM is properly loaded and ready
 */
export const isGTMReady = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const dataLayer = (window as any).dataLayer;
  const gtm = (window as any).google_tag_manager;
  
  return !!(dataLayer && gtm);
};

/**
 * Wait for GTM to be ready before tracking events
 */
export const waitForGTM = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isGTMReady()) {
      resolve();
      return;
    }
    
    // Check every 100ms for up to 10 seconds
    let attempts = 0;
    const maxAttempts = 100;
    
    const checkGTM = () => {
      attempts++;
      if (isGTMReady()) {
        console.log('✅ GTM is ready for tracking');
        resolve();
      } else if (attempts < maxAttempts) {
        setTimeout(checkGTM, 100);
      } else {
        console.warn('⚠️ GTM not ready after 10 seconds, proceeding anyway');
        resolve();
      }
    };
    
    checkGTM();
  });
};

/**
 * Track a Google Analytics event through GTM dataLayer
 */
export const trackGAEvent = async (eventName: string, params: GAEventParams = {}) => {
  // Wait for GTM to be ready
  await waitForGTM();
  
  if (typeof window !== 'undefined') {
    // Ensure dataLayer exists
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }
    
    const eventData = {
      event: eventName,
      ...params
    };
    
    // Push to dataLayer
    (window as any).dataLayer.push(eventData);
    
    // Debug logging
    console.log('GA Event tracked via GTM:', eventName, eventData);
    
    // Verify dataLayer push
    setTimeout(() => {
      const dataLayer = (window as any).dataLayer;
      const lastEvent = dataLayer[dataLayer.length - 1];
      if (lastEvent && lastEvent.event === eventName) {
        console.log('✅ Event successfully pushed to dataLayer:', eventName);
      } else {
        console.warn('⚠️ Event may not have been pushed correctly:', eventName);
      }
    }, 100);
  } else {
    console.warn('GTM dataLayer not available - window object not found');
  }
};

/**
 * Track when a user sends their first message
 */
export const trackFirstMessage = async (pseudonym: string, messageLength: number) => {
  await trackGAEvent('chat_with_venn_initiated', {
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
export const trackMessageSent = async (isFirstMessage: boolean, messageLength: number) => {
  await trackGAEvent('message_sent', {
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
export const trackChatCompletion = async (pseudonym: string, messageCount: number) => {
  await trackGAEvent('survey_chat_completed', {
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
export const trackChatContactFormSubmit = async (name: string, email: string, company: string) => {
  await trackGAEvent('chat_contact_form_submitted', {
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
export const trackSeeHRViewClick = async (pseudonym: string) => {
  await trackGAEvent('see_hr_view_clicked', {
    event_category: 'navigation',
    event_label: 'hr_dashboard_access',
    pseudonym,
    value: 25 // High value for advanced feature usage
  });
};