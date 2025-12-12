/**
 * Detects the device type based on user agent and screen size
 * @returns 'Desktop' | 'Mobile' | 'Tablet'
 */
export function detectDeviceType(): string {
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;

  // Check for tablet
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
    (width >= 768 && width <= 1024);

  // Check for mobile
  const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua) ||
    (width < 768);

  if (isTablet) {
    return 'Tablet';
  } else if (isMobile) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
}

