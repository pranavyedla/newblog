// Utility function to get image URL from MongoDB GridFS
export const getImageUrl = (imageId, baseUrl = '') => {
    if (!imageId) {
        return null;
    }
    
    // If it's already a full URL, return as is
    if (typeof imageId === 'string' && imageId.startsWith('http')) {
        return imageId;
    }
    
    // If it's an ObjectId or string ID, construct the API URL
    return `${baseUrl}/image/${imageId}`;
};

// Default profile image
const DEFAULT_PROFILE_IMAGE = '/default-avatar.svg';

// Default story image
const DEFAULT_STORY_IMAGE = '/default-story.svg';

// Helper function to get profile image URL
export const getProfileImageUrl = (photo, baseUrl = '') => {
    if (!photo) {
        return DEFAULT_PROFILE_IMAGE;
    }
    
    return getImageUrl(photo, baseUrl);
};

// Helper function to get story image URL
export const getStoryImageUrl = (image, baseUrl = '') => {
    if (!image) {
        return DEFAULT_STORY_IMAGE;
    }
    
    return getImageUrl(image, baseUrl);
};

