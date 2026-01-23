import nodemailer from 'nodemailer';
import { logger } from '@/lib/utils';

/**
 * Email Utility Functions
 * Handles all email sending functionality
 * 
 * Frontend Perspective:
 * - Like sending SMS but for emails
 * - Used for password resets, order confirmations, etc.
 * - Runs on server-side only (can't send emails from browser)
 */

/**
 * Create email transporter
 * Configures connection to email server (SMTP)
 */
function createTransporter() {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_PORT === '465', // true for port 465, false for others
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  });
}

/**
 * Send password reset email
 * @param {string} to - Recipient email address
 * @param {string} name - User's name
 * @param {string} resetUrl - Password reset URL with token
 */
export async function sendPasswordResetEmail(to, name, resetUrl) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"H&S Race Gear" <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Reset Your Password - H&S Race Gear',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #e74c3c;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #e74c3c;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">H&S Racegear</div>
            </div>
            
            <h2>Password Reset Request</h2>
            
            <p>Hi ${name},</p>
            
            <p>We received a request to reset your password for your H&S Race Gear account. Click the button below to create a new password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666; font-size: 12px;">${resetUrl}</p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0;">
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} H&S Race Gear. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${name},

We received a request to reset your password for your H&S Race Gear account.

Click this link to reset your password: ${resetUrl}

This link will expire in 1 hour.

If you didn't request this reset, please ignore this email.

© ${new Date().getFullYear()} H&S Race Gear
      `.trim()
    };

    await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent successfully', { to });
    
    return true;
  } catch (error) {
    logger.error('Failed to send password reset email:', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Send welcome email to new users
 * @param {string} to - Recipient email address
 * @param {string} name - User's name
 */
export async function sendWelcomeEmail(to, name) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"H&S Race Gear" <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Welcome to H&S Race Gear! 🏁',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #e74c3c;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #e74c3c;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏁 H&S Racegear</div>
            </div>
            
            <h2>Welcome to the Team, ${name}! 🎉</h2>
            
            <p>Thank you for joining H&S Race Gear - your premier destination for professional racing equipment.</p>
            
            <p>Your account has been successfully created. You can now:</p>
            
            <ul>
              <li>Browse our complete racing gear catalog</li>
              <li>Save items to your wishlist</li>
              <li>Track your orders</li>
              <li>Manage your addresses and preferences</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL}/products" class="button">Start Shopping</a>
            </div>
            
            <p>Need help? Our support team is always here to assist you.</p>
            
            <p>Best regards,<br>The H&S Race Gear Team</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center;">
              <p>© ${new Date().getFullYear()} H&S Race Gear. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Welcome email sent successfully', { to });
    
    return true;
  } catch (error) {
    logger.error('Failed to send welcome email:', error);
    // Don't throw error for welcome email - it's not critical
    return false;
  }
}

/**
 * Send order confirmation email
 * @param {string} to - Recipient email address
 * @param {string} name - User's name
 * @param {Object} order - Order details
 */
export async function sendOrderConfirmationEmail(to, name, order) {
  try {
    const transporter = createTransporter();

    const itemsHtml = order.items.map(item => `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"H&S Race Gear" <${process.env.EMAIL_FROM}>`,
      to,
      subject: `Order Confirmation #${order.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .total { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Order Confirmation</h1>
            <p>Hi ${name},</p>
            <p>Thank you for your order! Order #${order.orderNumber} has been confirmed.</p>
            
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total">
                  <td colspan="2">Total</td>
                  <td>$${order.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <p>We'll send you another email when your order ships.</p>
            
            <p>Best regards,<br>H&S Race Gear</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Order confirmation email sent', { to, orderNumber: order.orderNumber });
    
    return true;
  } catch (error) {
    logger.error('Failed to send order confirmation email:', error);
    return false;
  }
}