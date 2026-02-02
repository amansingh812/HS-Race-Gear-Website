/**
 * Next.js Image Loader for Cloudinary
 * Use this with Next.js Image component for automatic optimization
 */

import { imageConfig, cloudinaryImages } from './imageConfig';

/**
 * Custom image loader for Next.js Image component
 * @param {Object} params - Next.js loader parameters
 * @param {string} params.src - Image source
 * @param {number} params.width - Requested width
 * @param {number} params.quality - Image quality (1-100)
 * @returns {string} - Optimized image URL
 */
export function cloudinaryLoader({ src, width, quality }) {
  // Check if we should use CDN
  if (imageConfig.source !== 'cdn') {
    return src;
  }

  // Get Cloudinary ID for this image
  const cloudinaryId = cloudinaryImages[src];
  
  // If no Cloudinary ID, return original
  if (!cloudinaryId) {
    return src;
  }

  // Build Cloudinary URL with width and quality transformations
  const params = [
    'f_auto',
    'q_' + (quality || 'auto'),
    'w_' + width,
    'c_limit',
  ].join(',');

  const { baseUrl } = imageConfig.cloudinary;
  return `${baseUrl}/${params}/${cloudinaryId}.png`;
}

/**
 * Get Cloudinary URL for responsive images with srcset
 */
export function getResponsiveCloudinaryUrl(localPath, width, quality = 'auto') {
  const cloudinaryId = cloudinaryImages[localPath];
  
  if (!cloudinaryId || imageConfig.source !== 'cdn') {
    return localPath;
  }

  const params = `f_auto,q_${quality},w_${width},c_limit`;
  const { baseUrl } = imageConfig.cloudinary;
  return `${baseUrl}/${params}/${cloudinaryId}.png`;
}

export default cloudinaryLoader;
