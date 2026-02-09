export const DEFAULT_USER_ID = 'demo-user-123';
const USER_ID_KEY = 'gw_user_id';
const FB_PAGE_KEY = 'gw_selected_facebook_page_id';

export function getCurrentUserId(): string {
  if (typeof window === 'undefined') return DEFAULT_USER_ID;
  return localStorage.getItem(USER_ID_KEY) || DEFAULT_USER_ID;
}

export function setCurrentUserId(userId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_ID_KEY, userId);
}

export function getSelectedFacebookPageId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(FB_PAGE_KEY);
}

export function setSelectedFacebookPageId(pageId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FB_PAGE_KEY, pageId);
}
