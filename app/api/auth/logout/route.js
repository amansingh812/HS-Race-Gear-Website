import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/utils';

/**
 * POST /api/auth/logout
 * 
 * User Logout Endpoint
 * Invalidates the current session
 * 
 * Note: With JWT, logout is primarily client-side (removing token)
 * This endpoint logs the logout event and can be extended for token blacklisting
 * 
 * Frontend Usage:
 * await fetch('/api/auth/logout', {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${token}`
 *   }
 * });
 * localStorage.removeItem('token');
 * router.push('/login');
 */
async function handleLogout(request) {
  try {
    // User is already verified by requireAuth middleware
    const user = request.user;

    logger.info('User logged out', { 
      userId: user._id,
      email: user.email 
    });

    // Optional: Implement token blacklisting here
    // This would require storing invalidated tokens in Redis or database
    // For now, we rely on client-side token removal

    return Response.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    logger.error('Logout error:', error);
    return Response.json(
      { 
        success: false,
        error: 'Logout failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Export with authentication middleware
export const POST = requireAuth(handleLogout);