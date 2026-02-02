/**
 * Image Configuration
 * Manages image sources for local development and production
 */

// Cloudinary base URL
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drygcfes5/image/upload";

// Image source configuration
export const imageConfig = {
  // Set to 'cdn' for Cloudinary, 'local' for local images
  source: process.env.NEXT_PUBLIC_IMAGE_SOURCE || 'cdn',
  
  // Cloudinary configuration
  cloudinary: {
    baseUrl: CLOUDINARY_BASE_URL,
    // Add transformations if needed (e.g., quality, format)
    defaultParams: 'f_auto,q_auto',
  },
};

/**
 * Get image URL based on configuration
 * @param {string} localPath - Local path (e.g., "/images/slider/fashion/slider-main.png")
 * @param {string} cloudinaryId - Cloudinary public ID (e.g., "v1770052882/slider-Hs-1_w1uozn")
 * @returns {string} - Final image URL
 */
export function getImageUrl(localPath, cloudinaryId = null) {
  // If no Cloudinary ID provided, use local path
  if (!cloudinaryId || imageConfig.source === 'local') {
    return localPath;
  }

  // Build Cloudinary URL with transformations
  const { baseUrl, defaultParams } = imageConfig.cloudinary;
  return `${baseUrl}/${defaultParams}/${cloudinaryId}.png`;
}

/**
 * Cloudinary Image IDs mapping
 * Map local paths to Cloudinary public IDs
 */
export const cloudinaryImages = {
  // Hero Slides
  '/images/slider/fashion/slider-main.png': 'v1770052882/slider-Hs-1_w1uozn',
  '/images/slider/fashion/hero_girl.png': null, // Add Cloudinary ID when uploaded
  '/images/slider/fashion/hero_cars.png': null,
  
  // Fashion Slides
  '/images/banner/body.png': null,
  '/images/banner/shose.png': null,
  '/images/banner/globes.png': null,
  
  // Electric Access
  '/images/slider/electric-access/cleaned-walk_hero.png': null,
  '/images/slider/electric-access/hero_2.png': null,
  
  // Add more mappings as you upload images to Cloudinary
};

/**
 * Get optimized image URL
 * Automatically uses Cloudinary if available, falls back to local
 */
export function getOptimizedImageUrl(localPath) {
  const cloudinaryId = cloudinaryImages[localPath];
  return getImageUrl(localPath, cloudinaryId);
}

export default imageConfig;
