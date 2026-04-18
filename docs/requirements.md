# Gold X Usdt MLM Platform Requirements Document

## 1. Application Overview

### 1.1 Application Name

Gold X Usdt

### 1.2 Application Description

A Multi-Level Marketing (MLM) platform focused on Gold USDT investments, featuring automated ROI distribution, referral commission tracking, wallet management, and secure payment processing. The platform integrates with Supabase for backend services and database management.

### 1.3 Core Functionality

- User registration and authentication with OTP verification and Google login
- Investment management (deposit/withdrawal)
- Automated ROI calculation and distribution (10% monthly)
- Multi-level referral commission system (4 levels: 8%, 4%, 2%, 1%)
- Wallet system with multiple balance types
- Admin panel for user and transaction management
- KYC document upload and verification
- Real-time notifications and activity tracking
- Support ticket system

## 2. Technical Integration

### 2.1 Supabase Configuration

- Project ID: gtbptywlxhleadgabivi
- Anon Public Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0YnB0eXdseGhsZWFkZ2FiaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjM4NjQsImV4cCI6MjA4ODk5OTg2NH0.NGN6s3utBiD1Xrin2rifVsWOH7GT6OXXqzG6SIYvOT0
- Database and server hosted on Supabase (disable Lovable cloud)

## 3. Page Structure

### 3.1 Home Page (Landing)

- Investment plan information
- Platform features and benefits
- Testimonials section
- Sign-up call-to-action
- Footer with Privacy Policy, Terms & Conditions, Contact links

### 3.2 Authentication Pages

#### Sign Up

- Email registration
- OTP verification step
- Google login support
- Email confirmation

#### Login

- Email/password login
- OTP verification
- Google login option
- Password reset flow

### 3.3 User Dashboard

- Current balance display (Deposit, ROI, Bonus, Withdrawal wallets)
- Deposit button
- Withdrawal button
- Referral details
- Income details (ROI and referral earnings)
- Transaction history table
- Activity log
- Referral stats summary

### 3.4 Deposit Page

- USDT wallet address display (BEP-20 and TRC-20 options)
- Minimum deposit: 100 USDT compulsory,
- Deposit fee: 5%
- Transaction hash verification
- Deposit confirmation page

### 3.5 Withdrawal Page

- Withdrawal request form
- Minimum withdrawal amount display
- Withdrawal fee: 5%
- Withdrawal cooling period: 48 hours for normal withdrawals, 30 days for referral bonus
- Send payment request to admin for approval

### 3.6 Referral Level Income Page

- Referral link display
- Level-wise commission breakdown:
  - Level 1: 8%
  - Level 2: 4%
  - Level 3: 2%
  - Level 4: 1%
- Referral tree visualization
- Commission earnings history
- 30-day lock period on referral bonus withdrawals
- Auto credit on referral's completed deposit

### 3.7 Profile Page

- User information display and editing
- KYC document upload section
- KYC verification status
- Privacy settings
- Password change option

### 3.8 Admin Panel

- Customer management (view/edit email, mobile number, password, address)
- Deposit request approval/rejection
- Withdrawal request approval/rejection
- ROI management and adjustments
- Referral income changes
- Terms & Conditions editing
- Privacy Policy editing
- KYC verification management
- User activity monitoring
- Analytics dashboard

### 3.9 Additional Pages

- Terms & Conditions
- Privacy Policy
- Contact/Support
- Events page (show coming soon message)

## 4. Investment Plan Details

### 4.1 Investment Parameters

- Minimum Investment: 100 USDT (compulsory without fee)
- Maximum Investment: Unlimited
- Deposit Fee: 5%
- Withdrawal Fee: 5%
- Monthly ROI: 10%
- Compounding: NO

### 4.2 Referral Commission Structure

- Level 1: 8%
- Level 2: 4%
- Level 3: 2%
- Level 4: 1%

## 5. Wallet System

### 5.1 Wallet Types

- Deposit Wallet: For investment deposits
- ROI Wallet: For monthly ROI earnings
- Bonus Wallet: For referral commissions
- Withdrawal Wallet: For processed withdrawals

### 5.2 Payment Integration

- USDT payment support (BEP-20 and TRC-20 networks)
- Secure payment gateway integration
- Transaction hash verification

## 6. Features & Functionality

### 6.1 User Features

- OTP-based email verification
- Google login support
- Real-time balance updates
- In-app notifications (toast and real-time)
- Email notifications for deposits, withdrawals, referrals, and ROI
- Transaction history tracking
- Referral system with automatic commission crediting
- Support chat/ticket system
- Dark/light mode toggle
- PWA support
- Loading spinners and error toasts

### 6.2 Admin Features

- User management (view, edit, delete)
- Deposit approval/rejection
- Withdrawal approval/rejection
- ROI calculation and distribution management
- Referral commission adjustments
- KYC verification
- Content management (T&C, Privacy Policy)
- Analytics tracking
- Activity monitoring

### 6.3 Security Features

- Rate limiting
- CAPTCHA integration
- Secure authentication flow
- Password reset functionality
- Activity logging

## 7. Design Requirements

### 7.1 Theme

- Gold-themed color scheme (relevant to Gold USDT branding)
- Dark theme as default
- Unique and modern UI design
- Responsive layout for all devices

### 7.2 Branding

- Application name: Gold X Usdt
- Create custom logo
- Create favicon

### 7.3 UI Components

- Balance display cards
- Transaction history tables
- Referral tree visualization
- Admin dashboard with statistics
- Form inputs with validation
- Modal dialogs for confirmations
- Toast notifications
- Loading states

## 8. Email Interfaces

### 8.1 Email Notifications

- Registration confirmation
- OTP verification codes
- Deposit confirmation
- Withdrawal request confirmation
- Withdrawal approval/rejection
- ROI credit notification
- Referral commission credit
- KYC verification status updates
- Password reset links

## 9. Admin Credentials

### 9.1 Admin Access

- Username: (to be configured)
- Password: (to be configured)
- Full access to admin panel features

## 10. Withdrawal Rules

### 10.1 Cooling Periods

- Normal withdrawals: 48-hour cooling period
- Referral bonus withdrawals: 30-day lock period from credit date

### 10.2 Processing

- All withdrawal requests require admin approval
- 5% withdrawal fee applied
- Minimum withdrawal amount enforced

## 11. Other Requirements

- Automatic ROI payout calculation and processing (10% monthly)
- Referral commission auto-credit upon referral's completed deposit
- Transaction history with filtering and search
- Real-time balance updates across all wallet types
- Secure payment processing with transaction verification
- Mobile-responsive design
- PWA capabilities for app-like experience
- Analytics integration for tracking user behavior
- Error handling with user-friendly messages
- Loading states for all async operations
