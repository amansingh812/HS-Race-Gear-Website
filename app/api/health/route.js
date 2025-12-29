import connectDB from '@/lib/mongodb';
import { logger } from '@/lib/utils';

export async function GET() {
  try {
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        api: 'healthy',
        database: 'checking...'
      }
    };

    // Test database connection
    try {
      await connectDB();
      healthData.services.database = 'connected';
      logger.info('Health check - Database connected');
    } catch (dbError) {
      healthData.services.database = 'disconnected';
      healthData.warnings = ['Database connection failed - Check MongoDB credentials'];
      logger.warning('Health check - Database connection failed:', dbError.message);
    }

    logger.info('Health check completed', healthData);

    return Response.json({
      success: true,
      data: healthData,
      message: 'H&S Race Gear API is running successfully'
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    
    return Response.json({
      success: false,
      error: 'Health check failed',
      details: error.message
    }, { status: 500 });
  }
}