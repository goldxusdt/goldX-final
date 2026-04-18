# Requirements Document

## 1. Application Overview

### 1.1 Application Name

Gold X Usdt

### 1.2 Application Description

A multi-level marketing (MLM) platform focused on Gold USDT investment, featuring automated ROI distribution, 15-level referral commission tracking (with performance-based unlocking mechanism), wallet management, secure payment processing, coupon code system, investment and return calculator (with interactive animated charts via Recharts showing ROI growth trends and referral commission breakdown), referral level calculator, team growth simulator in user dashboard (projecting network earnings across all 15 referral levels with compound ROI toggle and multi-year projection charts), PDF export and email sharing of simulation results, network leader leaderboard on dashboard (ranking top members by unlocked referral levels), unified wealth building projection dashboard accessible from earnings analysis page (syncing personal investment calculator with team growth simulator), comprehensive admin control panel for managing user performance metrics and ROI configuration, advanced admin settings (SEO, branding, analytics, site configuration, social media URL configuration), SMTP credential management (with real-time backend propagation), TRC-20/BEP-20 auto-confirmation API configuration, professionally designed transactional email templates (registration OTP verification and password reset), calculator results export to PDF and email sharing, post-development code audit and quality assurance process, complete deployment configuration for Netlify, Vercel and other compatible platforms, Supabase native backend using PostgreSQL as primary database, complete backend documentation service (outputting all data, functions, tables, SQL definitions and export values in CSV file format), automated backend compound ROI service calculating and crediting compound ROI to user wallets based on reinvestment settings, downline analysis page, network analysis page integrated as dedicated tab within referral page, floating social share component on blog and events pages, dynamic social media URLs fetched from admin settings, multi-language toggle supporting English, Spanish, Arabic, Tamil, Hindi and French (auto-detecting language based on IP on first visit), automated OCR system on KYC document upload page, enhanced admin KYC management page (AI-extracted OCR text displayed side-by-side with uploaded documents), comprehensive security hardening layer, dedicated INR/USDT currency exchange subdomain page (automatically managing market rates via Supabase Edge Function cron job), admin-side exchange rate monitoring and alerts, enhanced user exchange and deposit process (with target wallet username input and admin-confirmed fund transfer), automated platform rate update settings, browser push notifications for admin exchange rate fluctuation alerts, security center with real-time refresh, super admin role with full platform audit log access and admin management capabilities, enhanced admin audit log detail view (side-by-side JSON diff comparison), multi-language content support for dynamic sections (blog posts and investment plans) with database schema and API updates, locale-specific SEO metadata optimization, enhanced two-factor authentication system for admin accounts (supporting both Email OTP and Google Authenticator with user-selectable verification method), enhanced input sanitization and injection protection, HTTPS-only enforcement (with HTTP 301 redirect), frontend performance optimization, FAQ section, systematic documentation upload failure troubleshooting and resolution, admin security log section tracking MFA events (enable, disable, recovery via backup codes, method selection), PDF export functionality for weekly security audit reports, security audit page, security center page and style guide step-by-step user guide documentation, comprehensive anti-hacking security framework (protecting against all major attack vectors including SQL injection, XSS, CSRF, SSRF, RCE, insecure deserialization, business logic vulnerabilities, API abuse, malicious file uploads, DoS attacks, dependency vulnerabilities and emerging threats), advanced referral dashboard displaying 15-level referral network tree view and detailed commission statistics, comprehensive transaction history page for users to track all deposits, withdrawals and ROI records in one place, complete Edge Function error handling mechanism (with comprehensive capture and friendly prompts for network errors, timeout errors, HTTP errors, response format errors, etc.), admin security dashboard (visualizing 2FA attempt distribution over the past 24 hours and potential brute force attacks), browser push notification system for website users (including automatic notifications for specific system events such as balance reaching threshold or ROI arrival), enhanced Telegram notification system for routing administrative alerts to a designated Telegram account (with interactive functionality allowing administrators to directly reply to support tickets or approve withdrawal requests via Telegram).

---

## 2. Users and Use Cases

### 2.1 Target Users

- Investors: Individuals seeking passive income through Gold USDT investment
- Referrers: Users who want to earn commissions by referring others to join the platform
- Admins: Administrators responsible for platform operations, user management, KYC review, exchange rate monitoring and security monitoring
- Super Admins: Administrators with the highest privileges, responsible for managing other admin accounts and accessing complete platform audit logs
- Website Users: General visitors who can opt-in to receive browser push notifications for updates and announcements

### 2.2 Core Use Cases

- Users register and complete KYC verification before making investments
- Users invite others to join the platform through referral links, building a multi-level referral network
- Users view referral dashboard to see 15-level referral network structure in tree view and detailed commission statistics
- Users view all deposits, withdrawals and ROI records on transaction history page
- Users use investment calculator and team growth simulator to predict earnings
- Users perform currency exchange through INR/USDT exchange page
- Website users opt-in to receive browser push notifications for new blog posts, system announcements, user-specific alerts, balance threshold alerts and ROI arrival notifications
- Admins complete primary credential authentication (username and password) and then select preferred MFA verification method (Email OTP or Google Authenticator)
- Admins review KYC documents, manage user accounts, monitor exchange rate fluctuations, review security logs and audit logs
- Admins view 2FA attempt distribution over the past 24 hours and potential brute force attacks on security dashboard
- Admins compose and send browser push notifications to subscribed users
- Admins receive Telegram alerts for critical system events (new user registration, failed login attempts, system errors, form submissions, etc.)
- Admins directly reply to support tickets or approve withdrawal requests via Telegram
- Super admins manage other admin accounts and access complete platform audit logs

---

## 3. Page Structure and Functional Description

### 3.1 Page Structure

```
├── Public Pages
│   ├── Home Page
│   ├── Registration Page
│   ├── Login Page
│   ├── Blog Page
│   ├── Events Page
│   ├── FAQ Page
│   └── INR/USDT Exchange Subdomain Page
├── User Pages (Authentication Required)
│   ├── User Dashboard
│   │   ├── Overview Panel
│   │   ├── Wallet Management
│   │   ├── Network Leader Leaderboard
│   │   └── Team Growth Simulator
│   ├── Investment Page
│   │   ├── Investment Plan List
│   │   └── Investment and Return Calculator
│   ├── Referral Page
│   │   ├── Referral Link Generation
│   │   ├── Referral Level Calculator
│   │   ├── Downline Analysis Tab
│   │   └── Network Analysis Tab
│   ├── Advanced Referral Dashboard
│   │   ├── 15-Level Referral Network Tree View
│   │   └── Detailed Commission Statistics Panel
│   ├── Transaction History Page
│   │   ├── Deposit Records
│   │   ├── Withdrawal Records
│   │   └── ROI Records
│   ├── Earnings Analysis Page
│   │   └── Unified Wealth Building Projection Dashboard
│   ├── KYC Document Upload Page
│   ├── Security Center Page
│   ├── Personal Settings Page
│   └── Notification Preferences Page
└── Admin Pages (Admin Authentication Required)
    ├── Admin Login Page
    │   ├── Primary Credentials Form
    │   ├── MFA Method Selection Screen
    │   └── MFA Verification Screen
    ├── Admin Dashboard
    ├── User Management Page
    ├── KYC Management Page
    ├── INR/USDT Exchange Management Page
    ├── Exchange Rate Monitoring Panel
    ├── Security Audit Page
    ├── Security Dashboard Page
    ├── Admin Security Log Page
    ├── Platform Audit Log Page (Super Admin Only)
    ├── Admin Management Page (Super Admin Only)
    ├── MFA Settings Page
    ├── Notification Management Dashboard
    ├── Telegram Alert Configuration Page
    ├── Telegram Interactive Management Page
    └── Advanced Admin Settings Page
        ├── SEO Settings
        ├── Branding Settings
        ├── Analytics Settings
        ├── Site Configuration
        ├── Social Media URL Configuration
        ├── Language Settings
        └── SMTP Credential Management
```

### 3.2 Public Pages

#### 3.2.1 Home Page

- Display platform introduction, core feature highlights and investment plan overview
- Include registration and login entry points
- Display Gold X Usdt brand logo and favicon
- Include multi-language toggle control
- Footer displays dynamic social media links
- Display browser push notification opt-in prompt for first-time visitors

#### 3.2.2 Registration Page

- User inputs email, password and referral code (optional)
- Send OTP verification code to user email
- User inputs OTP to complete registration
- Auto-login and redirect to user dashboard after successful registration

#### 3.2.3 Login Page

- User inputs email and password to login
- Support password reset functionality

#### 3.2.4 Blog Page

- Display blog post list
- Each post displays corresponding translated content based on user current language
- Include floating social share component

#### 3.2.5 Events Page

- Display platform event information
- Include floating social share component

#### 3.2.6 FAQ Page

- Display frequently asked questions and answers
- Content displays corresponding translation based on user current language
- Support search functionality

#### 3.2.7 INR/USDT Exchange Subdomain Page

- Display real-time USDT/INR market rate
- Provide buy USDT and sell USDT panels
- User inputs exchange amount, selects transaction method, inputs target wallet username
- Display platform fee and final credited amount
- After user submits exchange request, transaction status is set to Pending Admin Approval
- Admin confirms and completes fund transfer

### 3.3 User Pages

#### 3.3.1 User Dashboard

- Overview Panel: Display key metrics such as user total investment, total earnings, available balance, pending withdrawals
- Wallet Management: Display wallet balance, support deposit and withdrawal operations
- Network Leader Leaderboard: Display top members ranked by unlocked referral levels
- Team Growth Simulator:
  - Support selection of projection years (1-10 years)
  - Provide compound ROI toggle switch
  - When compound is enabled, display global reinvestment rate slider and 15 independent per-level reinvestment rate sliders
  - Unlocked performance level sliders are locked and non-interactive
  - Adjusting any slider immediately triggers recalculation of all 15 levels and re-renders charts
  - Support PDF export and email sharing

#### 3.3.2 Investment Page

- Investment Plan List: Display all available investment plans, showing corresponding translated content based on user current language
- Investment and Return Calculator:
  - User inputs investment amount and investment period
  - Display interactive animated charts via Recharts showing ROI growth trends and referral commission breakdown
  - Support PDF export and email sharing

#### 3.3.3 Referral Page

- Referral Link Generation: Display user exclusive referral link and QR code
- Referral Level Calculator: Calculate user current referral level and unlock conditions
- Downline Analysis Tab: Display list and statistics of users directly referred downlines
- Network Analysis Tab:
  - Display overall statistics of user referral network
  - Include charts, tables and statistics panels
  - Data limited to current user referral network

#### 3.3.4 Advanced Referral Dashboard

- 15-Level Referral Network Tree View:
  - Visualize user 15-level referral network in tree structure
  - Each node displays referred member basic information (username, join date, current level)
  - Support node expand/collapse functionality
  - Support filtering display by level
  - Support searching specific members
- Detailed Commission Statistics Panel:
  - Display total commission for each referral level
  - Display number of active members for each referral level
  - Display commission rate for each referral level
  - Display historical commission trend chart (by month or by week)
  - Support filtering statistics by time range
  - Support PDF export and email sharing

#### 3.3.5 Transaction History Page

- Deposit Records:
  - Display all deposit transaction records
  - Include transaction date, amount, transaction method, status and other information
  - Support filtering by date range, transaction method, status
- Withdrawal Records:
  - Display all withdrawal transaction records
  - Include transaction date, amount, target wallet, status and other information
  - Support filtering by date range, status
- ROI Records:
  - Display all ROI records (including automatically distributed ROI and compound ROI)
  - Include record date, amount, source investment plan, type (Simple ROI / Compound ROI) and other information
  - Support filtering by date range, source investment plan, type
- Unified Transaction List View:
  - Display all deposits, withdrawals and ROI records in a single list
  - Support filtering by transaction type (Deposit / Withdrawal / ROI)
  - Support filtering by date range
  - Support export as CSV or PDF

#### 3.3.6 Earnings Analysis Page

- Unified Wealth Building Projection Dashboard:
  - Sync data from personal investment calculator and team growth simulator
  - Display comprehensive earnings projection chart
  - Support adjusting investment parameters and reinvestment rates
  - Support PDF export and email sharing

#### 3.3.7 KYC Document Upload Page

- User uploads identity proof document (supports image formats)
- Automated OCR system extracts key fields from document and pre-fills form
- User can review and edit OCR extracted field values
- User submits KYC application and waits for admin review

#### 3.3.8 Security Center Page

- Display user account security status indicators
- Include real-time refresh functionality
- Display recent security events and alerts

#### 3.3.9 Personal Settings Page

- User can modify personal information, password, language preference, etc.
- User can enable or disable MFA (if applicable)

#### 3.3.10 Notification Preferences Page

- User can manage browser push notification subscription status
- User can select notification categories to receive (e.g., new blog posts, system announcements, account alerts, balance threshold alerts, ROI arrival notifications)
- User can enable or disable notifications for each category
- User can configure balance threshold for balance alert notifications
- Display current subscription status and last notification received time
- Provide test notification button to verify notification functionality

### 3.4 Admin Pages

#### 3.4.1 Admin Login Page

**Phase 1: Primary Credentials Form**
- Display standard login form with Username and Password input fields
- Include Remember Me checkbox (optional)
- Include Forgot Password link
- Submit button labeled Sign In
- Upon successful validation of username and password, proceed to Phase 2

**Phase 2: MFA Method Selection Screen**
- Display screen title: Verify Your Identity
- Display two verification method options as selectable cards:
  - **Email OTP Card:**
    - Icon: Envelope icon
    - Title: Email Verification
    - Description: Get a 6-digit code sent to your registered email address
    - Select button
  - **Google Authenticator Card:**
    - Icon: Smartphone icon with authenticator app symbol
    - Title: Authenticator App
    - Description: Use your Google Authenticator app to generate a verification code
    - Select button
- Include Back to Login link to return to Phase 1
- Include optional Remember this device for 30 days checkbox
- User must select one method to proceed to Phase 3

**Phase 3: MFA Verification Screen**

**If Email OTP is selected:**
- Display screen title: Enter Email Verification Code
- Display message: A 6-digit code has been sent to [masked email address]
- Display large, clearly visible code input field (6 digits, auto-focus)
- Display countdown timer showing code validity period (10 minutes)
- Include Resend Code link (with rate limiting)
- Include Verify button to submit code
- Include Choose a different method link to return to Phase 2
- Display clear error message for invalid code: Invalid verification code. Please try again.
- Clear input field after failed attempt

**If Google Authenticator is selected:**
- Display screen title: Enter Authenticator Code
- Display helper text: Open your Google Authenticator app and enter the 6-digit code for Gold X Usdt
- Display large, clearly visible code input field (6 digits, auto-focus)
- Include Verify button to submit code
- Include Choose a different method link to return to Phase 2
- Display clear error message for invalid code: Invalid verification code. Please try again.
- Clear input field after failed attempt

**Phase 4: Login Completion**
- Upon successful verification, display success message: Verification successful. Redirecting...
- Redirect admin to admin dashboard
- Establish secure admin session

#### 3.4.2 Admin Dashboard

- Display overall platform operational data (total users, total investment, total earnings, etc.)
- Display number of pending KYC applications and exchange requests
- Display recent security alerts and audit log summary
- Display quick access to notification management dashboard
- Display pending support tickets and withdrawal requests requiring action

#### 3.4.3 User Management Page

- Display all user list
- Support search, filter and sort
- Admin can view and edit user detailed information
- Admin can manually adjust user referral level unlock targets (batch sync functionality)
- Admin can suspend or activate user accounts

#### 3.4.4 KYC Management Page

- Display all KYC application list
- Admin can view KYC documents and OCR extracted text (side-by-side display)
- Admin can approve or reject KYC applications

#### 3.4.5 INR/USDT Exchange Management Page

- Display all exchange transaction list
- Admin can view transaction details
- Admin can approve or reject pending exchange requests
- System automatically executes fund transfer after approval

#### 3.4.6 Exchange Rate Monitoring Panel

- Display real-time USDT/INR market rate
- Display platform rate and configured fee percentage
- Display exchange rate historical trend chart
- Admin can manually refresh rate
- Admin can configure exchange rate fluctuation alert threshold
- Admin can enable or disable auto-update platform rate setting
- Admin can configure profit margin percentage for auto-update

#### 3.4.7 Security Audit Page

- Display platform security event log
- Support filtering by event type, date range
- Support exporting weekly security audit report as PDF

#### 3.4.8 Security Dashboard Page

- Visualize 2FA attempt distribution over the past 24 hours:
  - Number of successful 2FA verifications
  - Number of failed 2FA verifications
  - Time series chart grouped by hour
  - Statistics grouped by admin account
- Potential brute force attack detection and display:
  - Identify multiple failed 2FA attempts in short time (default threshold: 5 failures within 5 minutes)
  - Display list of admin accounts suspected of brute force attacks
  - Display detailed information for each suspected attack (time range, number of failures, IP address)
  - Provide one-click lock functionality for suspected attacked accounts
- Real-time refresh functionality (default auto-refresh every 30 seconds)
- Support filtering by time range (last 1 hour, 6 hours, 12 hours, 24 hours)
- Support exporting security report as PDF

#### 3.4.9 Admin Security Log Page

- Display all admin account MFA related events (enable, disable, recovery via backup codes, method selection)
- Display all 2FA verification attempt records (successful and failed)
- Support filtering by admin, event type, date range

#### 3.4.10 Platform Audit Log Page (Super Admin Only)

- Display audit logs for all platform operations
- Support viewing audit log detailed information (side-by-side JSON diff comparison)
- Support filtering by operation type, admin, date range

#### 3.4.11 Admin Management Page (Super Admin Only)

- Display all admin account list
- Super admin can create, edit, suspend or delete admin accounts
- Super admin can assign or revoke super admin role
- Display MFA setup status for each admin account

#### 3.4.12 MFA Settings Page

- Display current MFA configuration status
- Admin can view and manage Email OTP settings:
  - Display registered email address
  - Option to update email address
  - Test Email OTP functionality
- Admin can view and manage Google Authenticator settings:
  - Display QR code and key text for initial setup
  - Option to re-bind Google Authenticator (generates new QR code and key, old binding immediately invalidated)
  - Display backup codes section
  - Generate and download backup codes functionality
- Admin can set preferred default MFA method
- Admin can enable or disable Remember this device functionality
- Display MFA activity log (recent verification attempts and method selections)

#### 3.4.13 Notification Management Dashboard

- Display browser push notification composition interface:
  - Title input field (required, max 50 characters)
  - Message body input field (required, max 200 characters)
  - Target audience selector (All Users / Specific User Groups / Individual Users)
  - Notification icon upload (optional, default platform logo)
  - Action URL input (optional, redirect URL when user clicks notification)
  - Schedule send toggle (optional, select date and time for scheduled delivery)
- Display notification templates section:
  - Pre-defined templates for common notification types (New Blog Post, System Announcement, Account Alert, etc.)
  - Admin can select template and customize content
  - Admin can create and save custom templates
- Display notification history section:
  - List of all sent notifications with timestamp, title, target audience, delivery status
  - Support filtering by date range, target audience, delivery status
  - Display delivery statistics (total sent, successfully delivered, failed, clicked)
- Display real-time notification preview panel:
  - Show how notification will appear on different browsers and devices
  - Update preview in real-time as admin edits notification content
- Provide send test notification button:
  - Admin can send test notification to own browser to verify appearance and functionality
- Display notification sending confirmation dialog:
  - Confirm target audience, notification content and schedule before sending
  - Display estimated number of recipients
  - Provide cancel and confirm buttons

#### 3.4.14 Telegram Alert Configuration Page

- Display Telegram Bot setup guide:
  - Step-by-step instructions for creating Telegram Bot via BotFather
  - Instructions for obtaining Bot Token and Chat ID
- Display Telegram Bot configuration section:
  - Bot Token input field (required, securely stored as environment variable)
  - Chat ID input field (required, securely stored as environment variable)
  - Test connection button to verify Bot Token and Chat ID validity
- Display alert trigger configuration section:
  - List of system events that can trigger Telegram alerts:
    - New user registration
    - Failed login attempts (threshold configurable, default 3 consecutive failures)
    - System errors or critical warnings
    - Form submissions (contact form, support ticket, etc.)
    - KYC application submitted
    - Exchange request submitted
    - Withdrawal request submitted
    - Exchange rate fluctuation exceeds threshold
    - Potential brute force attack detected
    - Admin account locked
    - SMTP credential validation failed
    - Edge Function call failed
  - Each event has enable/disable toggle
  - Each event has customizable message template with placeholders for dynamic data
- Display alert message format configuration section:
  - Default message format: [System Alert] - Title: [Event Title] | Details: [Event Details] | Time: [Timestamp]
  - Admin can customize message format and placeholders
  - Provide message preview panel showing sample alert with actual data
- Display alert history section:
  - List of all sent Telegram alerts with timestamp, event type, message content, delivery status
  - Support filtering by date range, event type, delivery status
  - Display delivery statistics (total sent, successfully delivered, failed)
- Display alert testing section:
  - Admin can send test alert to configured Telegram account to verify functionality
  - Provide sample event data for testing

#### 3.4.15 Telegram Interactive Management Page

- Display pending support tickets section:
  - List all support tickets awaiting admin response
  - Each ticket displays ticket ID, user information, submission time, ticket content and current status
  - Admin can view ticket details and reply directly via Telegram
  - System sends admin reply to user via email or browser push notification
  - Support filtering by ticket status (Pending / In Progress / Resolved)
  - Support searching by ticket ID or user information
- Display pending withdrawal requests section:
  - List all withdrawal requests awaiting admin approval
  - Each request displays request ID, user information, withdrawal amount, target wallet, submission time and current status
  - Admin can approve or reject withdrawal request directly via Telegram
  - System sends approval or rejection notification to user via email or browser push notification
  - After approval, system automatically executes fund transfer
  - Support filtering by request status (Pending / Approved / Rejected)
  - Support searching by request ID or user information
- Display Telegram command configuration section:
  - List all supported Telegram commands and their functions
  - Admin can enable or disable specific commands
  - Admin can customize command response templates
- Display Telegram interaction history section:
  - List all Telegram interactions (admin replies to support tickets, approval of withdrawal requests, etc.)
  - Display interaction timestamp, admin information, action type, target object and result
  - Support filtering by date range, admin, action type
- Display Telegram Bot status indicator:
  - Display Bot connection status (Connected / Disconnected)
  - Display last interaction time
  - Provide manual reconnect button

#### 3.4.16 Advanced Admin Settings Page

- SEO Settings: Configure default page title template and meta description for each locale
- Branding Settings: Upload logo and favicon
- Analytics Settings: Configure Google Analytics or other analytics tools
- Site Configuration: Configure site basic information and feature toggles
- Social Media URL Configuration: Configure URLs for various social media platforms
- Language Settings: Enable or disable supported languages, set platform default language, manage IP language detection mapping table
- SMTP Credential Management: Configure SMTP server information, real-time propagation to backend

---

## 4. Business Rules and Logic

### 4.1 Referral Network and Commission Rules

- Referral network has 15 levels: first 4 levels are basic levels, last 11 levels are performance-based unlocked levels
- Commission rate for each level is configured by admin in backend
- After user refers new member to join, referral relationship takes effect immediately
- Commission is automatically calculated based on downline member investment amount and corresponding level commission rate and distributed to referrer wallet
- Unlock conditions for performance levels are configured by admin, usually based on team size, team investment amount or personal performance

### 4.2 ROI Distribution Rules

- After user invests, system automatically calculates and periodically distributes ROI to user wallet based on investment plan ROI configuration
- Support simple ROI and compound ROI modes
- In compound ROI mode, user can set reinvestment ratio, system automatically reinvests that ratio of ROI into original investment plan
- All ROI distribution records are recorded in transaction history

### 4.3 KYC Verification Rules

- User must complete KYC verification before making investments and exchange operations
- OCR extracted field values are only pre-fill suggestions, user can freely edit
- Admin can view uploaded documents and OCR extracted text when reviewing KYC applications
- After admin approves or rejects KYC application, user receives notification

### 4.4 INR/USDT Exchange Rules

- Exchange rate is based on real-time market rate, obtained through external API
- Buy effective rate = Market rate × (1 + Platform fee percentage / 100)
- Sell effective rate = Market rate × (1 − Platform fee percentage / 100)
- Default platform fee is 7%, configurable by admin
- When user submits exchange request, rate is locked
- User must input target wallet username, system verifies username exists before submission
- After transaction is submitted, status is set to Pending Admin Approval
- After admin approves, system atomically executes fund transfer; if transfer fails, status is set to Transfer Failed
- User and admin both receive transaction status change notifications

### 4.5 Exchange Rate Monitoring and Auto-Update Rules

- Supabase Edge Function cron job syncs USDT/INR market rate every 15 minutes
- Each sync attempt is recorded in rate_sync_logs table
- If obtained rate is invalid, zero or negative, system rejects update
- When market rate deviates beyond configured threshold (default ±2%), triggers admin exchange rate fluctuation alert
- After enabling auto-update platform rate setting, platform rate is automatically updated on each cron sync: Platform rate = Real-time market rate × (1 + Configured profit margin percentage / 100)
- Configured profit margin percentage defaults to 7%, independently configurable by admin
- Auto-update is recorded in rate_sync_logs table and marked as auto-update

### 4.6 Security and Access Control Rules

- All user passwords are encrypted using bcrypt or Argon2 for storage
- All state change requests must verify Anti-CSRF token
- All database interactions use parameterized queries or prepared statements
- File uploads must validate type, size and MIME type on server side
- Admin accounts must complete two-factor authentication during login process
- Admin login requires two phases: primary credential validation (username and password) followed by MFA verification
- Admin must select one of two MFA methods: Email OTP or Google Authenticator
- Super admin is the highest privilege role, only super admin can assign or revoke super admin role
- All admin operations are recorded in platform audit log
- Complete platform audit log is only accessible to super admin

### 4.7 Multi-Language and Localization Rules

- Platform default language is English
- On first visit, if no stored language preference, system detects user geographic location via IP address and sets corresponding language
- If IP geolocation detection fails, default to English
- User can manually select language via language toggle control at any time
- Manually selected language has higher priority than auto-detection and is persistently stored
- Authenticated user language preference is stored in backend user configuration; unauthenticated user language preference is stored in local storage
- When Arabic is selected, entire platform layout switches to RTL (right-to-left)
- All static UI text, form labels, validation messages, navigation items, button labels, tooltips and aria-labels display corresponding translation based on current language
- Missing translation keys fall back to English
- Blog post and investment plan content displays corresponding translation based on user current language; if no translation, display English version and prompt user

### 4.8 Advanced Referral Dashboard Rules

- Tree view only displays current user 15-level referral network
- Tree view nodes are organized by referral relationship hierarchy
- Each node displays referred member username, join date and current referral level
- Support filtering display by level (e.g., only display levels 1-5)
- Support searching specific members (by username or email)
- Detailed commission statistics panel data is limited to current user referral network
- Commission statistics are grouped and displayed by referral level
- Historical commission trend chart supports display by month or by week
- Support filtering statistics by time range (e.g., last 30 days, last 90 days, custom date range)

### 4.9 Transaction History Page Rules

- Transaction history page only displays current user transaction records
- Deposit records include all deposit transactions made through platform
- Withdrawal records include all withdrawal transactions made through platform
- ROI records include all automatically distributed ROI and compound ROI
- Unified transaction list view displays all transactions in reverse chronological order
- Support filtering by transaction type, date range, status
- Support export as CSV or PDF format

### 4.10 Edge Function Error Handling Rules

#### 4.10.1 General Error Handling Mechanism

- All Edge Function calls must implement complete error capture and handling mechanism
- Frontend must capture all possible call errors, including but not limited to:
  - Network connection failure
  - Request timeout
  - HTTP error status codes (4xx, 5xx)
  - Edge Function internal errors
  - Response format errors or parsing failures
- All errors must display friendly error messages to users, avoiding exposure of technical details
- Error logging rules:
  - Development environment: Log to browser console
  - Production environment: Send to backend logging system

#### 4.10.2 Error Message Classification and Prompts

- Network error: Network connection failed, please check your network connection and retry
- Timeout error: Request timeout, please retry later
- Server error: Service temporarily unavailable, please retry later or contact support team
- Unknown error: Operation failed, please retry later or contact support team

#### 4.10.3 Retry Mechanism

- Critical operations (such as MFA verification, payment processing, data submission, etc.) must implement automatic retry
- Retry rules:
  - Maximum 3 retries
  - Retry interval increases with each attempt (2 seconds, 4 seconds, 8 seconds)
  - Display loading indicator and retry prompt during retry
  - After all retries fail, display final error message and provide manual retry option

#### 4.10.4 Timeout Settings

- All Edge Function calls must set reasonable timeout (default 30 seconds)

#### 4.10.5 Response Validation

- Frontend must validate Edge Function response integrity and validity:
  - Check response status code
  - Validate response data format
  - Validate required fields exist
  - Validate data types are correct
- When response validation fails, must:
  - Reject processing that response
  - Display error message to user
  - Log detailed validation failure information

#### 4.10.6 Additional Security Validation for Sensitive Operations

- Edge Function calls involving sensitive operations (such as authentication, payment, etc.) must implement additional validation:
  - Validate response signature or token
  - Check response timestamp to prevent replay attacks
  - Validate response source to ensure from trusted Edge Function

#### 4.10.7 MFA Verification Error Handling Rules

- When admin attempts to verify MFA code (Email OTP or Google Authenticator), system calls backend API or Edge Function to validate code
- When API call fails, system must capture error and display friendly error message to admin: Verification failed, please retry later or contact support team
- System must log detailed API call failure log, including:
  - Request timestamp
  - Admin ID
  - MFA method (Email OTP or Google Authenticator)
  - Request parameters
  - Response status code
  - Error message
  - Failure reason (network timeout, service unavailable, invalid code, etc.)
- When API call fails due to network timeout or service unavailable, system should implement retry mechanism:
  - Maximum 3 retries
  - Retry interval increases with each attempt (2 seconds, 4 seconds, 8 seconds)
  - Display loading indicator and retry prompt to admin during retry
- After retry still fails, system should:
  - Record error to admin security log
  - Trigger admin alert (via email or browser push notification)
  - Display final error message to admin
- Admin can view all MFA verification failure records in admin security log page, including:
  - Failure time
  - Admin information
  - MFA method
  - Failure reason
  - Retry count
  - Detailed error log
- When admin attempts to verify MFA code multiple times unsuccessfully (5 consecutive times), system should:
  - Temporarily lock admin account (lock duration 30 minutes)
  - Display message to admin: You have entered incorrect verification code multiple times, account has been temporarily locked, please retry later or contact support team
  - Record lock event to admin security log
  - Trigger admin alert

#### 4.10.8 Edge Function Request Failure Diagnosis and Repair Rules

- When Edge Function call returns Failed to send a request to the Edge Function error, system must execute following diagnostic steps:
  - Verify Edge Function URL configuration is correct
  - Verify Edge Function is deployed and in active state
  - Verify frontend request HTTP method, request headers and request body format meet Edge Function expectations
  - Verify Edge Function CORS configuration allows frontend domain access
  - Verify Supabase project API key and service role key are valid
  - Verify network connection is normal, whether firewall or proxy blocks request
- System must implement following repair measures on frontend:
  - Validate all required parameters exist and format is correct before calling Edge Function
  - Include correct Content-Type in request headers (usually application/json)
  - Include valid Authorization token in request headers (if required)
  - Set reasonable request timeout (default 30 seconds)
  - Implement retry mechanism (maximum 3 retries, interval increases)
  - Capture all possible network errors and HTTP errors, display friendly error messages to users
- System must implement following repair measures on backend:
  - Ensure Edge Function correctly handles all expected request formats
  - Ensure Edge Function returns standard HTTP response (including correct status code and response body)
  - Ensure Edge Function CORS configuration is correct (allows frontend domain access)
  - Ensure Edge Function error handling logic is complete (captures all possible exceptions and returns friendly error messages)
  - Ensure Edge Function logging is complete (logs all requests and responses for debugging)
- System must provide Edge Function diagnostic tool in admin settings page:
  - Display Edge Function deployment status and last deployment time
  - Provide manual test Edge Function functionality (send test request and display response)
  - Display recent Edge Function call logs (including request parameters, response status code, error messages, etc.)
  - Provide redeploy Edge Function functionality (if needed)
- When Edge Function call fails, system must log detailed diagnostic information to backend logging system, including:
  - Request timestamp
  - Admin ID
  - Edge Function URL
  - Request method, request headers and request body
  - Response status code and response body (if any)
  - Error message and stack trace (if any)
  - Network diagnostic information (such as DNS resolution result, TCP connection status, etc.)
- Admin can view all Edge Function call failure records in admin security log page, and can filter by time, admin, Edge Function name, failure reason

### 4.11 Enhanced Admin MFA Login Flow Rules

#### 4.11.1 Primary Credential Validation (Phase 1)

- Admin inputs username and password on standard login form
- System validates credentials against database
- If credentials are invalid, display error message: Invalid username or password and allow retry
- If credentials are valid, system creates temporary authentication session and proceeds to Phase 2
- System logs successful primary credential validation event

#### 4.11.2 MFA Method Selection (Phase 2)

- System displays MFA method selection screen with two options: Email OTP and Google Authenticator
- Admin must select one method to proceed
- If admin has previously selected Remember this device for 30 days and device is recognized, system automatically uses last selected method and skips to Phase 3
- System logs MFA method selection event (including selected method and device recognition status)

#### 4.11.3 Email OTP Verification (Phase 3A)

- When admin selects Email OTP method:
  - System generates 6-digit random numeric code
  - System sends code to admin registered email address via SMTP
  - Code is valid for 10 minutes
  - System displays verification screen with code input field and countdown timer
  - Admin inputs received code and clicks Verify button
  - System validates code against stored value
  - If code is valid and not expired, proceed to Phase 4
  - If code is invalid or expired, display error message: Invalid verification code. Please try again. and clear input field
  - Admin can click Resend Code link to request new code (rate limited to 1 request per minute)
  - Admin can click Choose a different method link to return to Phase 2
- System logs all Email OTP verification attempts (successful and failed)

#### 4.11.4 Google Authenticator Verification (Phase 3B)

- When admin selects Google Authenticator method:
  - System displays verification screen with code input field
  - Admin opens Google Authenticator app and retrieves 6-digit TOTP code
  - Admin inputs code and clicks Verify button
  - System validates code using TOTP algorithm and shared secret key
  - If code is valid, proceed to Phase 4
  - If code is invalid, display error message: Invalid verification code. Please try again. and clear input field
  - Admin can click Choose a different method link to return to Phase 2
- System logs all Google Authenticator verification attempts (successful and failed)

#### 4.11.5 Login Completion (Phase 4)

- Upon successful MFA verification, system:
  - Establishes full admin session with appropriate permissions
  - If Remember this device for 30 days was selected, stores device identifier and selected MFA method in secure cookie
  - Displays success message: Verification successful. Redirecting...
  - Redirects admin to admin dashboard
  - Logs successful admin login event

#### 4.11.6 Security and Rate Limiting Rules

- All MFA verification attempts are rate limited:
  - Maximum 5 failed attempts per admin account within 5 minutes
  - After 5 failed attempts, account is temporarily locked for 30 minutes
  - Locked account displays message: You have entered incorrect verification code multiple times, account has been temporarily locked, please retry later or contact support team
  - Lock event is logged to admin security log and triggers admin alert
- Email OTP code generation is rate limited:
  - Maximum 3 code requests per admin account within 10 minutes
  - After limit is reached, display message: Too many code requests, please wait and retry later
- All MFA sessions are server-side validated and secured:
  - Temporary authentication session expires after 10 minutes if MFA is not completed
  - Device recognition cookie is HttpOnly, Secure and SameSite=Strict
  - Device recognition cookie expires after 30 days
- All MFA verification requests include Anti-CSRF token validation

#### 4.11.7 MFA Settings Management Rules

- Admin can access MFA Settings Page to manage MFA configuration
- Admin can update registered email address for Email OTP:
  - System sends verification code to new email address
  - Admin must verify new email before update takes effect
- Admin can re-bind Google Authenticator:
  - System generates new QR code and secret key
  - Old binding is immediately invalidated
  - Admin must complete new binding before it takes effect
- Admin can generate and download backup codes:
  - System generates 10 one-time backup codes
  - Backup codes are displayed on screen and available for download as text file
  - Each backup code can only be used once
  - Used backup codes are immediately invalidated
- Admin can set preferred default MFA method:
  - Default method is automatically selected on MFA method selection screen
  - Admin can still choose alternative method during login
- Admin can enable or disable Remember this device functionality:
  - When disabled, admin must select MFA method on every login
  - When enabled, recognized devices automatically use last selected method

#### 4.11.8 Backup Code Recovery Rules

- When admin loses access to both Email OTP and Google Authenticator:
  - Admin can use backup code to complete MFA verification
  - Backup code input field is accessible via Lost access to your verification methods? link on verification screen
  - Admin inputs backup code and clicks Verify button
  - System validates backup code against stored values
  - If backup code is valid, admin successfully logs in and is prompted to re-configure MFA methods
  - Used backup code is immediately invalidated
  - If all backup codes are used, admin must contact super admin for manual account recovery

### 4.12 Security Dashboard Rules

- Security dashboard is only accessible to admins
- Security dashboard displays 2FA attempt distribution over the past 24 hours and potential brute force attacks
- 2FA attempt distribution includes:
  - Number of successful 2FA verifications
  - Number of failed 2FA verifications
  - Time series chart grouped by hour
  - Statistics grouped by admin account
  - Statistics grouped by MFA method (Email OTP and Google Authenticator)
- Potential brute force attack detection rules:
  - Identify multiple failed 2FA attempts in short time (default threshold: 5 failures within 5 minutes)
  - Display list of admin accounts suspected of brute force attacks
  - Display detailed information for each suspected attack (time range, number of failures, IP address, MFA method)
- Admin can one-click lock suspected attacked accounts on security dashboard
- Locked accounts require super admin manual unlock
- Security dashboard supports real-time refresh (default auto-refresh every 30 seconds)
- Admin can manually refresh security dashboard data
- Security dashboard supports filtering by time range (last 1 hour, 6 hours, 12 hours, 24 hours)
- Security dashboard supports exporting security report as PDF
- All 2FA verification attempts (successful and failed) are recorded in admin security log
- All suspected brute force attack events are recorded in admin security log and trigger admin alert

### 4.13 Browser Push Notification Rules

- Browser push notifications use Web Push API and Service Workers
- Users must explicitly opt-in to receive push notifications
- Permission request prompt is displayed on home page for first-time visitors
- Users can manage notification subscription status and preferences on notification preferences page
- Admins can compose and send notifications via notification management dashboard
- Notification content includes title (max 50 characters) and message body (max 200 characters)
- Admins can target notifications to all users, specific user groups, or individual users
- Admins can schedule notifications for future delivery
- System tracks notification delivery status (sent, delivered, failed, clicked)
- Notification icon defaults to platform logo, admins can upload custom icon
- Notifications can include action URL for redirect when user clicks
- System provides notification templates for common notification types
- Admins can create and save custom notification templates
- System displays real-time notification preview showing how notification will appear on different browsers and devices
- Admins can send test notifications to own browser before sending to users
- System displays notification sending confirmation dialog before sending
- All sent notifications are recorded in notification history with delivery statistics
- System implements notification rate limiting to prevent spam (max 10 notifications per user per day)
- Notifications are automatically cleared after 7 days if not clicked
- System supports notification categories (new blog posts, system announcements, account alerts, balance threshold alerts, ROI arrival notifications, etc.)
- Users can enable or disable notifications for each category
- System ensures cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Notification subscription data is securely stored and encrypted
- System implements proper error handling for notification failures
- Failed notifications are logged and admins are alerted

### 4.14 Automatic Browser Push Notification for System Events Rules

- System automatically sends browser push notifications to users when specific system events occur
- Supported automatic notification events:
  - Balance Threshold Alert: When user wallet balance reaches or exceeds configured threshold, system automatically sends notification
  - ROI Arrival Notification: When ROI is distributed to user wallet, system automatically sends notification
- Balance threshold configuration:
  - Users can configure balance threshold on notification preferences page
  - Default threshold is 0 (disabled)
  - Users can set custom threshold amount
  - System validates threshold is positive number
- Automatic notification triggering rules:
  - Balance threshold alert triggers when wallet balance reaches or exceeds threshold after any transaction (deposit, withdrawal, ROI distribution, etc.)
  - ROI arrival notification triggers immediately after ROI is distributed to user wallet
  - Each event triggers notification only once per occurrence
  - System respects user notification preferences (if user disabled specific category, notification is not sent)
- Automatic notification content:
  - Balance threshold alert: Title: Balance Alert, Message: Your wallet balance has reached [threshold amount] USDT
  - ROI arrival notification: Title: ROI Received, Message: You have received [ROI amount] USDT from [investment plan name]
- Automatic notification delivery:
  - System uses same delivery mechanism as manual notifications
  - Automatic notifications are subject to same rate limiting rules (max 10 notifications per user per day)
  - Automatic notifications are logged in notification history
- Automatic notification error handling:
  - If notification delivery fails, system logs error and retries (max 3 retries)
  - If all retries fail, system logs failure and triggers admin alert

### 4.15 Telegram Alert Rules

- Telegram alerts use Telegram Bot API
- Admins must create Telegram Bot via BotFather and obtain Bot Token
- Admins must obtain Chat ID for designated Telegram account to receive alerts
- Bot Token and Chat ID are securely stored as environment variables
- Admins configure alert triggers and message templates on Telegram alert configuration page
- System supports following alert triggers:
  - New user registration
  - Failed login attempts (threshold configurable, default 3 consecutive failures)
  - System errors or critical warnings
  - Form submissions (contact form, support ticket, etc.)
  - KYC application submitted
  - Exchange request submitted
  - Withdrawal request submitted
  - Exchange rate fluctuation exceeds threshold
  - Potential brute force attack detected
  - Admin account locked
  - SMTP credential validation failed
  - Edge Function call failed
- Each alert trigger can be enabled or disabled independently
- Each alert trigger has customizable message template with placeholders for dynamic data
- Default message format: [System Alert] - Title: [Event Title] | Details: [Event Details] | Time: [Timestamp]
- Admins can customize message format and placeholders
- System displays message preview panel showing sample alert with actual data
- System sends alerts to configured Telegram account via Telegram Bot API
- All sent alerts are recorded in alert history with delivery status
- System tracks alert delivery statistics (total sent, successfully delivered, failed)
- Admins can send test alerts to verify functionality
- System implements proper error handling for alert failures
- Failed alerts are logged and admins are notified via alternative channel (email or browser push notification)
- System implements alert rate limiting to prevent spam (max 50 alerts per hour)
- System ensures secure transmission of alert data
- Bot Token and Chat ID are validated on configuration page before saving
- System provides test connection button to verify Bot Token and Chat ID validity
- System implements retry mechanism for failed alert deliveries (max 3 retries)
- System logs all alert activities for audit purposes

### 4.16 Enhanced Telegram Bot Interactive Functionality Rules

- Telegram Bot supports interactive commands allowing admins to perform actions directly via Telegram
- Supported interactive actions:
  - Reply to support tickets
  - Approve or reject withdrawal requests
- Support ticket reply workflow:
  - When new support ticket is submitted, system sends Telegram alert to admin with ticket details (ticket ID, user information, ticket content)
  - Admin can reply to ticket directly via Telegram by sending message in format: /reply [ticket ID] [reply content]
  - System validates ticket ID exists and admin has permission to reply
  - System records admin reply and updates ticket status to In Progress
  - System sends admin reply to user via email or browser push notification
  - Admin can view all pending support tickets on Telegram interactive management page
- Withdrawal request approval workflow:
  - When new withdrawal request is submitted, system sends Telegram alert to admin with request details (request ID, user information, withdrawal amount, target wallet)
  - Admin can approve request directly via Telegram by sending command: /approve [request ID]
  - Admin can reject request directly via Telegram by sending command: /reject [request ID] [rejection reason]
  - System validates request ID exists and admin has permission to approve or reject
  - System records admin action and updates request status
  - After approval, system automatically executes fund transfer
  - System sends approval or rejection notification to user via email or browser push notification
  - Admin can view all pending withdrawal requests on Telegram interactive management page
- Telegram command validation:
  - System validates all commands follow correct format
  - System validates admin has permission to execute command
  - System validates target object (ticket or request) exists and is in valid state
  - If validation fails, system sends error message to admin via Telegram
- Telegram interaction logging:
  - All Telegram interactions are logged in Telegram interaction history
  - Logs include timestamp, admin information, action type, target object, command content and result
  - Admin can view interaction history on Telegram interactive management page
- Telegram Bot security:
  - System validates all incoming Telegram messages are from authorized admin accounts
  - System implements rate limiting to prevent command spam (max 20 commands per admin per minute)
  - System logs all unauthorized access attempts and triggers admin alert
- Telegram Bot error handling:
  - If command execution fails, system sends error message to admin via Telegram
  - System logs all command execution errors
  - System implements retry mechanism for transient errors (max 3 retries)

---

## 5. Exception and Boundary Cases

| Scenario | Expected Behavior |
|---|---|
| Advanced referral dashboard tree view loads when user has no referred members | Display empty state message prompting user to start referring to build network |
| Advanced referral dashboard tree view node count exceeds 1000 | Implement pagination or virtual scrolling to optimize performance and avoid page lag |
| User searches for non-existent member on advanced referral dashboard | Display No matching members found message |
| Advanced referral dashboard detailed commission statistics panel has no data | Display empty state message prompting user has no commission records yet |
| Advanced referral dashboard PDF export triggered while data is loading | Wait for data loading to complete before generating PDF to avoid exporting incomplete data |
| Transaction history page loads when user has no transaction records | Display empty state message prompting user has no transaction records yet |
| Transaction history page filter conditions have no matching results | Display No matching transactions found message |
| Transaction history page exports CSV or PDF when data exceeds 10000 records | Limit single export to maximum 10000 records or prompt user to narrow filter range |
| Transaction history page opens on portrait mobile (320px) | Table rearranges to card-style layout with all fields stacked vertically and no horizontal overflow |
| Advanced referral dashboard opens on portrait mobile (320px) | Tree view and commission statistics panel stack vertically, tree view supports horizontal scrolling to display complete hierarchy structure |
| User attempts to export empty data on transaction history page | Display inline error message prompting no data available for export |
| Advanced referral dashboard tree view node expand/collapse triggers multiple clicks | Debounce processing to avoid repeated expand/collapse operations |
| Transaction history page ROI record type filter selects Compound ROI but user never enabled compound | Display empty state message prompting user has no compound ROI records yet |
| Advanced referral dashboard commission statistics panel time range filter selects future date | Inline validation error blocking selection of future dates |
| Transaction history page exports PDF with Arabic content | PDF content correctly renders in RTL direction |
| Advanced referral dashboard tree view opens in Arabic (RTL) mode | Tree structure mirrors to RTL layout with nodes expanding from right to left |
| User rapidly switches filter conditions on transaction history page | Debounce processing to avoid frequent data loading requests |
| Advanced referral dashboard detailed commission statistics panel chart rendering fails | Display error message prompting user to refresh page or contact support |
| Transaction history page CSV export filename contains special characters | Filename automatically cleans special characters using safe filename format |
| Advanced referral dashboard tree view node information incomplete (missing username or join date) | Display placeholder text (such as Unknown User or Date Unavailable) |
| Transaction history page loads in low bandwidth network environment | Display loading indicator with data loading in batches to optimize performance |
| Advanced referral dashboard PDF export includes more than 15 levels of referral network (theoretically should not occur) | Only export first 15 levels of data and log exception |
| Transaction history page user attempts to export data exceeding system limit | Display inline error message prompting user to narrow filter range or export in batches |
| Admin inputs incorrect username or password on login page | Display inline error message: Invalid username or password and allow retry |
| Admin successfully validates primary credentials but network fails before MFA selection screen loads | Display error message: Network connection failed, please retry and provide Retry button |
| Admin selects Email OTP method but email delivery fails | Display error message: Failed to send verification code, please retry or choose a different method and log email delivery failure |
| Admin selects Email OTP method and requests code but does not receive email | Admin can click Resend Code link (rate limited to 1 request per minute) or choose Google Authenticator method |
| Admin inputs incorrect Email OTP code | Display inline error message: Invalid verification code. Please try again., clear input field and allow retry |
| Admin inputs expired Email OTP code | Display inline error message: Verification code has expired, please request a new code and provide Resend Code link |
| Admin selects Google Authenticator method but has not set up authenticator app | Display error message: Google Authenticator not set up, please choose Email OTP method or contact support team |
| Admin inputs incorrect Google Authenticator code | Display inline error message: Invalid verification code. Please try again., clear input field and allow retry |
| Admin inputs incorrect MFA code 5 consecutive times | Temporarily lock admin account for 30 minutes, display message: You have entered incorrect verification code multiple times, account has been temporarily locked, please retry later or contact support team, log lock event and trigger admin alert |
| Admin closes browser or navigates away during MFA verification | Temporary authentication session expires after 10 minutes, admin must restart login process from Phase 1 |
| Admin completes MFA verification but network fails before redirect to dashboard | Display error message: Login successful but redirect failed, please manually navigate to dashboard or refresh page |
| Admin has Remember this device enabled but device cookie is deleted or expired | System does not recognize device, admin must select MFA method on MFA selection screen |
| Admin attempts to access admin pages without completing MFA verification | System redirects admin to login page with message: Please complete login to access this page |
| Admin attempts to use backup code but all backup codes are already used | Display error message: All backup codes have been used, please contact super admin for account recovery |
| Admin attempts to update email address on MFA settings page but new email is already registered | Display inline error message: This email address is already registered, please use a different email |
| Admin attempts to re-bind Google Authenticator but does not complete binding process | Old binding remains active until new binding is successfully completed |
| Admin generates backup codes but does not download or save them | Display warning message: Please download and securely store your backup codes, you will not be able to view them again |
| Super admin attempts to unlock locked admin account but account does not exist | Display inline error message: Admin account not found |
| Security dashboard displays 2FA attempt distribution but no data available | Display empty state message: No 2FA attempts recorded in selected time range |
| Security dashboard detects potential brute force attack but admin account is already locked | Display account status as Locked and provide Unlock button for super admin |
| Admin attempts to one-click lock suspected attacked account but does not have permission | Display error message: You do not have permission to lock this account |
| MFA verification API call fails due to network timeout | Implement retry mechanism (max 3 retries with increasing intervals), display loading indicator during retry, if all retries fail display error message and log failure |
| MFA verification API call returns unexpected response format | Frontend validates response format failure, displays error message: Service response format error, please retry later or contact support team and logs detailed error |
| Admin attempts to verify MFA code but SMTP credentials are invalid (for Email OTP) | System logs SMTP credential error, displays error message: Failed to send verification code due to configuration error, please contact support team and triggers admin alert |
| Admin attempts to verify MFA code but Edge Function is not deployed or inactive | System logs Edge Function deployment error, displays error message: Service temporarily unavailable, please retry later or contact support team and triggers admin alert |
| Admin selects Email OTP method and requests code multiple times within short period (exceeds rate limit) | Display message: Too many code requests, please wait and retry later and enforce rate limit (max 3 requests per 10 minutes) |
| Admin completes MFA verification successfully but session creation fails | Display error message: Login verification successful but session creation failed, please retry or contact support team and log session creation failure |
| Admin has both Email OTP and Google Authenticator set up but prefers to use backup code | Admin can access backup code input via Lost access to your verification methods? link on verification screen |
| Admin inputs valid backup code but account is locked due to previous failed attempts | Display message: Account is temporarily locked, backup code cannot be used at this time, please wait or contact support team |
| Admin attempts to access MFA settings page but has not completed MFA setup | System redirects admin to MFA setup wizard with message: Please complete MFA setup to access settings |
| Admin updates preferred default MFA method but setting fails to save | Display error message: Failed to save settings, please retry and log save failure |
| Admin enables Remember this device but device cookie fails to set | Display warning message: Failed to remember device, you will need to select MFA method on next login and log cookie setting failure |
| Admin disables Remember this device but device cookie fails to delete | Display warning message: Failed to update device settings, please clear browser cookies manually and log cookie deletion failure |
| Admin views MFA activity log but no activity records exist | Display empty state message: No MFA activity recorded yet |
| Admin attempts to download backup codes but download fails | Display error message: Failed to download backup codes, please retry and provide Retry button |
| Admin generates new backup codes but old codes are not invalidated due to system error | System logs backup code invalidation failure, triggers admin alert and displays warning message: Backup code generation may have failed, please contact support team |
| Admin attempts to test Email OTP functionality on MFA settings page but email delivery fails | Display error message: Test email failed to send, please check SMTP configuration and log email delivery failure |
| Admin re-binds Google Authenticator but QR code fails to generate | Display error message: Failed to generate QR code, please retry and log QR code generation failure |
| Admin scans QR code with Google Authenticator app but app fails to add account | Display troubleshooting message: If QR code scan fails, please manually enter the key provided below and display key text |
| Admin completes Google Authenticator binding but verification code validation fails | Display error message: Failed to verify authenticator binding, please retry and ensure code is entered correctly |
| Admin attempts to access admin pages from unrecognized device without completing MFA | System enforces MFA verification and does not allow access until verification is completed |
| Admin completes MFA verification on recognized device but device recognition fails on next login | System treats device as unrecognized and requires MFA method selection |
| Admin has Remember this device enabled but logs in from different browser on same device | System treats browser as new device and requires MFA method selection |
| Admin has Remember this device enabled but device cookie is blocked by browser privacy settings | System cannot set device cookie, displays warning message: Device recognition is disabled due to browser settings, you will need to select MFA method on each login |
| Admin attempts to verify MFA code but rate limit is exceeded (5 failed attempts within 5 minutes) | Temporarily lock admin account for 30 minutes, display message and log lock event |
| Super admin attempts to unlock admin account but unlock operation fails | Display error message: Failed to unlock account, please retry and log unlock failure |
| Admin views admin security log but log data fails to load | Display error message: Failed to load security log, please refresh page or contact support team |
| Admin filters admin security log by date range but no records match filter | Display empty state message: No security events found in selected date range |
| Admin exports security report as PDF but export fails | Display error message: Failed to export security report, please retry and log export failure |
| Security dashboard auto-refreshes but data fetch fails | Display error message: Failed to refresh data, please manually refresh page and log data fetch failure |
| Admin manually refreshes security dashboard but refresh operation fails | Display error message: Failed to refresh data, please retry and log refresh failure |
| Admin filters security dashboard by time range but selected range is invalid | Display inline validation error: Invalid time range, please select a valid range |
| Security dashboard displays potential brute force attack but attack details are incomplete | Display available details and log incomplete data warning |
| Admin one-click locks suspected attacked account but lock operation fails | Display error message: Failed to lock account, please retry and log lock failure |
| Admin views platform audit log (super admin only) but audit log data fails to load | Display error message: Failed to load audit log, please refresh page or contact support team |
| Admin views audit log detailed information but JSON diff comparison fails to render | Display raw JSON data and log rendering failure |
| Admin filters platform audit log but no records match filter | Display empty state message: No audit log entries found matching filter criteria |
| Admin attempts to access platform audit log but does not have super admin role | Display error message: Access denied, this page is only accessible to super admins and redirect to admin dashboard |
| Admin attempts to manage other admin accounts but does not have super admin role | Display error message: Access denied, admin management is only accessible to super admins and redirect to admin dashboard |
| Super admin creates new admin account but account creation fails | Display error message: Failed to create admin account, please retry and log account creation failure |
| Super admin assigns super admin role to admin but role assignment fails | Display error message: Failed to assign super admin role, please retry and log role assignment failure |
| Super admin revokes super admin role from admin but role revocation fails | Display error message: Failed to revoke super admin role, please retry and log role revocation failure |
| Super admin deletes admin account but deletion fails | Display error message: Failed to delete admin account, please retry and log deletion failure |
| Admin views MFA setup status for other admin accounts but status data fails to load | Display error message: Failed to load MFA setup status, please refresh page |
| Edge Function call fails due to network timeout | Implement retry mechanism (max 3 retries with increasing intervals), display loading indicator during retry, if all retries fail display error message and log failure |
| Edge Function call returns unexpected response format | Frontend validates response format failure, displays error message: Service response format error, please retry later or contact support team and logs detailed error |
| Browser blocks request during Edge Function call (CORS error) | Frontend captures CORS error, displays error message: Request blocked, please contact support team and logs detailed error log to backend |
| User cancels request during Edge Function call | Frontend captures cancel event, stops loading indicator, does not display error message |
| Unknown error occurs during Edge Function call | Frontend captures unknown error, displays generic error message: Operation failed, please retry later or contact support team and logs detailed error log |
| User leaves page during Edge Function call retry | Frontend cancels all pending retry requests to avoid resource waste |
| Edge Function call succeeds but response data incomplete | Frontend validates response data integrity failure, displays error message: Data incomplete, please retry later or contact support team and logs detailed error log |
| Edge Function call succeeds but response data type incorrect | Frontend validates response data type failure, displays error message: Data format error, please retry later or contact support team and logs detailed error log |
| Edge Function call returns Failed to send a request to the Edge Function error | System executes complete diagnostic steps, logs detailed diagnostic information to backend log, displays friendly error message to user and provides diagnostic tool in admin settings page |
| Edge Function URL configuration error | System displays warning message in admin settings page: Edge Function URL configuration error, please check and update and provides manual test functionality |
| Edge Function not deployed or in inactive state | System displays warning message in admin settings page: Edge Function not deployed or in inactive state, please redeploy and provides redeploy functionality |
| Edge Function CORS configuration does not allow frontend domain access | System displays warning message in admin settings page: Edge Function CORS configuration error, please check and update and provides CORS configuration guide |
| Supabase API key or service role key invalid | System displays warning message in admin settings page: Supabase API key invalid, please check and update and provides key validation functionality |
| Network connection abnormal or firewall blocks request | System displays error message to user: Network connection abnormal, please check your network settings or contact support team and logs network diagnostic information to backend log |
| User has not opted-in to browser push notifications | System does not send notifications to user and logs opt-out status |
| User browser does not support Web Push API | System displays message prompting browser does not support push notifications and suggests upgrading browser |
| User denies browser push notification permission | System respects user choice and does not display permission prompt again, provides instructions in notification preferences page for manually enabling permissions |
| Admin sends notification to user who has unsubscribed | System skips sending to unsubscribed user and logs skip event |
| Notification delivery fails due to network error | System logs failure and retries delivery (max 3 retries), if still fails logs to admin security log and triggers admin alert |
| User clicks notification with invalid action URL | System displays error message prompting invalid link and logs error |
| Admin attempts to send notification exceeding character limit | System displays inline validation error and prevents sending |
| Admin attempts to send notification without selecting target audience | System displays inline validation error prompting to select target audience |
| Admin attempts to schedule notification for past date | System displays inline validation error blocking selection of past dates |
| Notification rate limit exceeded (more than 10 notifications per user per day) | System blocks sending and displays message to admin: Notification rate limit exceeded for this user, please retry tomorrow |
| Notification history displays more than 1000 records | Implement pagination to optimize performance |
| Admin attempts to send test notification but browser blocks permission | System displays message prompting to enable browser notification permission in browser settings |
| User configures balance threshold as negative number | System displays inline validation error: Balance threshold must be positive number |
| User configures balance threshold as non-numeric value | System displays inline validation error: Balance threshold must be valid number |
| Balance threshold alert triggers but user has disabled balance alert category | System does not send notification and logs disabled category event |
| ROI arrival notification triggers but user has disabled ROI notification category | System does not send notification and logs disabled category event |
| Automatic notification delivery fails due to network error | System logs failure and retries delivery (max 3 retries), if still fails logs to admin security log and triggers admin alert |
| Automatic notification rate limit exceeded (more than 10 notifications per user per day) | System blocks sending automatic notification and logs rate limit event |
| User wallet balance reaches threshold multiple times in short period | System sends notification only once per threshold crossing, subsequent crossings within 1 hour do not trigger new notifications |
| ROI distribution fails but notification already sent | System logs inconsistency and triggers admin alert for manual review |
| User changes balance threshold after notification already sent | New threshold takes effect immediately, previous notifications are not affected |
| Telegram Bot Token or Chat ID invalid | System displays error message on configuration page: Invalid Bot Token or Chat ID, please check and update and prevents saving |
| Telegram alert delivery fails due to network error | System logs failure and retries delivery (max 3 retries), if still fails logs to admin security log and triggers admin alert via alternative channel |
| Telegram alert rate limit exceeded (more than 50 alerts per hour) | System queues alerts and sends in next hour, logs rate limit event |
| Admin attempts to send test alert but Bot Token not configured | System displays inline error message prompting to configure Bot Token first |
| Telegram alert message exceeds Telegram API character limit (4096 characters) | System truncates message to fit limit and appends See full details in admin panel note |
| Admin disables alert trigger but system event still occurs | System does not send alert and logs disabled trigger event |
| Telegram alert history displays more than 1000 records | Implement pagination to optimize performance |
| Admin attempts to customize message template with invalid placeholders | System displays inline validation error and provides list of valid placeholders |
| Telegram Bot API returns error response | System logs error response, displays friendly error message to admin and provides troubleshooting guide |
| Admin deletes Telegram Bot after configuration | System detects invalid Bot Token on next alert attempt, displays error message to admin and prompts to reconfigure |
| Multiple admins configure different Telegram accounts | System supports multiple Chat IDs and sends alerts to all configured accounts |
| Telegram alert contains sensitive information | System ensures secure transmission and logs all alert activities for audit purposes |
| Admin sends Telegram command with incorrect format | System sends error message to admin via Telegram: Invalid command format, please check and retry |
| Admin sends Telegram command for non-existent ticket or request | System sends error message to admin via Telegram: Ticket or request not found, please check ID and retry |
| Admin attempts to approve already approved withdrawal request via Telegram | System sends error message to admin via Telegram: Request already approved, no action needed |
| Admin attempts to reject already rejected withdrawal request via Telegram | System sends error message to admin via Telegram: Request already rejected, no action needed |
| Admin sends Telegram command but does not have permission | System sends error message to admin via Telegram: You do not have permission to execute this command |
| Telegram command execution fails due to system error | System sends error message to admin via Telegram: Command execution failed, please retry later or contact support team and logs error |
| Admin sends too many Telegram commands in short period (exceeds rate limit) | System blocks commands and sends message to admin via Telegram: Command rate limit exceeded, please wait and retry |
| Unauthorized user attempts to send commands to Telegram Bot | System ignores commands, logs unauthorized access attempt and triggers admin alert |
| Telegram Bot connection lost | System detects connection loss, displays warning on Telegram interactive management page and provides manual reconnect button |
| Admin replies to support ticket via Telegram but ticket already resolved | System sends error message to admin via Telegram: Ticket already resolved, no action needed |
| Admin approves withdrawal request via Telegram but fund transfer fails | System logs transfer failure, updates request status to Transfer Failed, sends notification to user and admin |
| Telegram interaction history displays more than 1000 records | Implement pagination to optimize performance |
| Admin attempts to view pending support tickets but none exist | Display empty state message on Telegram interactive management page: No pending support tickets |
| Admin attempts to view pending withdrawal requests but none exist | Display empty state message on Telegram interactive management page: No pending withdrawal requests |

---

## 6. Acceptance Criteria

- Advanced referral dashboard page created and accessible via user navigation
- Advanced referral dashboard tree view correctly displays current user 15-level referral network structure
- Tree view nodes display referred member username, join date and current referral level
- Tree view supports node expand/collapse functionality
- Tree view supports filtering display by level
- Tree view supports searching specific members (by username or email)
- Detailed commission statistics panel correctly displays total commission, number of active members and commission rate for each referral level
- Detailed commission statistics panel displays historical commission trend chart (by month or by week)
- Detailed commission statistics panel supports filtering statistics by time range
- Advanced referral dashboard supports PDF export and email sharing functionality
- Transaction history page created and accessible via user navigation
- Transaction history page correctly displays all deposits, withdrawals and ROI records for current user
- Transaction history page supports filtering by transaction type (Deposit / Withdrawal / ROI)
- Transaction history page supports filtering by date range
- Transaction history page supports filtering by status (applicable to deposits and withdrawals)
- Transaction history page supports filtering by source investment plan (applicable to ROI records)
- Transaction history page supports filtering by ROI type (Simple ROI / Compound ROI)
- Transaction history page supports export as CSV or PDF format
- Advanced referral dashboard and transaction history page correctly rearrange to single column layout on portrait mobile (320px and above) with no horizontal overflow
- Advanced referral dashboard and transaction history page correctly mirror layout in Arabic (RTL) mode
- Advanced referral dashboard tree view performs well with large number of nodes with no noticeable lag
- Transaction history page performs well with large data volume, supports pagination or virtual scrolling
- All UI text on advanced referral dashboard and transaction history page displays corresponding translation based on user current language
- All functionality on advanced referral dashboard and transaction history page works normally on all supported browsers and devices
- All existing functionality (including comprehensive anti-hacking security framework defined in Section 2) remains unchanged and operates normally
- All security controls implemented and verified
- All mobile layout optimizations completed and tested
- All multi-language functionality implemented and tested
- All SEO metadata and localization tags configured and verified
- All admin functionality (including KYC management, exchange rate monitoring, security audit, audit logs, admin management) implemented and tested
- All user functionality (including investment, referral, wallet management, KYC upload, security center) implemented and tested
- All PDF export and email sharing functionality works normally
- All floating social share components work normally and only display on blog and events pages
- All branding elements (logo and favicon) display correctly
- All security testing (SAST, DAST, dependency scanning, penetration testing) completed and documented
- All identified vulnerabilities tracked, prioritized and remediated according to defined SLA
- All security-related configurations documented and version controlled
- All development and operations team members received security training
- Enhanced admin MFA login flow implemented with four phases: primary credentials, MFA method selection, MFA verification and login completion
- Admin login page displays standard username and password form in Phase 1
- System validates primary credentials and proceeds to Phase 2 upon successful validation
- MFA method selection screen displays two options: Email OTP and Google Authenticator with clear icons, titles and descriptions
- Admin can select one MFA method and proceed to Phase 3
- Email OTP verification screen displays code input field, countdown timer, Resend Code link and Choose a different method link
- System sends 6-digit code to admin registered email address when Email OTP is selected
- Email OTP code is valid for 10 minutes
- System validates Email OTP code and proceeds to Phase 4 upon successful verification
- Google Authenticator verification screen displays code input field, helper text and Choose a different method link
- System validates Google Authenticator TOTP code and proceeds to Phase 4 upon successful verification
- System displays success message and redirects admin to admin dashboard upon successful MFA verification
- System displays clear error messages for invalid or expired codes and clears input field after failed attempt
- System implements rate limiting for MFA verification attempts (max 5 failed attempts within 5 minutes)
- System temporarily locks admin account for 30 minutes after 5 failed MFA verification attempts
- System logs all MFA verification attempts (successful and failed) to admin security log
- System implements rate limiting for Email OTP code requests (max 3 requests within 10 minutes)
- System supports Remember this device for 30 days functionality with secure HttpOnly cookie
- System automatically uses last selected MFA method for recognized devices
- MFA Settings Page created and accessible via admin navigation
- Admin can update registered email address for Email OTP on MFA Settings Page
- Admin can re-bind Google Authenticator on MFA Settings Page
- Admin can generate and download backup codes on MFA Settings Page
- Admin can set preferred default MFA method on MFA Settings Page
- Admin can enable or disable Remember this device functionality on MFA Settings Page
- System displays MFA activity log on MFA Settings Page
- System supports backup code recovery when admin loses access to both Email OTP and Google Authenticator
- Backup codes are one-time use and immediately invalidated after use
- System prompts admin to re-configure MFA methods after using backup code
- All MFA related events (method selection, verification attempts, backup code usage, etc.) logged to admin security log
- Security dashboard correctly displays 2FA attempt distribution grouped by MFA method (Email OTP and Google Authenticator)
- Security dashboard correctly detects potential brute force attacks and displays MFA method used in attack
- All MFA verification error handling logic implemented including network errors, timeout errors, API errors and response format errors
- All MFA verification errors display friendly error messages to admins
- All MFA verification errors logged with detailed diagnostic information
- System implements retry mechanism for transient MFA verification errors (max 3 retries)
- All MFA related functionality verified through unit tests and integration tests
- All MFA related user interface interactions verified through end-to-end tests
- All Edge Function calls implemented complete error handling mechanism including network errors, timeout errors, HTTP errors, response format errors, etc.
- All Edge Function call errors display friendly error messages to users avoiding exposure of technical details
- All Edge Function call errors log detailed error logs (development environment logs to browser console, production environment sends to backend logging system)
- All critical operation Edge Function calls implemented retry mechanism (max 3 retries with increasing intervals)
- All Edge Function calls set reasonable timeout (default 30 seconds)
- All Edge Function responses implemented integrity and validity validation (status code, data format, required fields, data types)
- All Edge Function calls involving sensitive operations implemented additional security validation (response signature, timestamp, source validation)
- All Edge Function error handling logic verified through unit tests and integration tests
- All Edge Function error handling related user interface interactions verified through end-to-end tests
- System implemented complete diagnostic steps and logged detailed diagnostic information when Edge Function call returns Failed to send a request to the Edge Function error
- Admin settings page provides Edge Function diagnostic tool including deployment status display, manual test functionality, call log viewing and redeploy functionality
- All Edge Function call failure records logged to admin security log and can filter by time, admin, Edge Function name, failure reason
- Frontend implemented all necessary repair measures (parameter validation, request header configuration, timeout settings, retry mechanism, error capture)
- Backend implemented all necessary repair measures (request format handling, standard response return, CORS configuration, error handling, logging)
- All Edge Function request failure diagnosis and repair related logic verified through unit tests and integration tests
- All Edge Function request failure diagnosis and repair related user interface interactions verified through end-to-end tests
- Notification preferences page created and accessible via user navigation
- Users can manage browser push notification subscription status on notification preferences page
- Users can select notification categories to receive (new blog posts, system announcements, account alerts, balance threshold alerts, ROI arrival notifications, etc.)
- Users can enable or disable notifications for each category
- Users can configure balance threshold for balance alert notifications on notification preferences page
- Notification preferences page displays current subscription status and last notification received time
- Notification preferences page provides test notification button to verify notification functionality
- Browser push notification permission request prompt displays on home page for first-time visitors
- System correctly handles user opt-in and opt-out actions
- Notification management dashboard created and accessible via admin navigation
- Notification management dashboard displays notification composition interface with all required fields (title, message body, target audience, icon upload, action URL, schedule send)
- Notification management dashboard displays notification templates section with pre-defined templates and custom template creation
- Notification management dashboard displays notification history section with filtering and delivery statistics
- Notification management dashboard displays real-time notification preview panel
- Notification management dashboard provides send test notification button
- Notification management dashboard displays notification sending confirmation dialog
- System correctly sends browser push notifications to subscribed users
- System correctly tracks notification delivery status (sent, delivered, failed, clicked)
- System implements notification rate limiting (max 10 notifications per user per day)
- System automatically clears notifications after 7 days if not clicked
- System ensures cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- All browser push notification functionality verified through unit tests and integration tests
- All browser push notification related user interface interactions verified through end-to-end tests
- System automatically sends balance threshold alert when user wallet balance reaches or exceeds configured threshold
- System automatically sends ROI arrival notification when ROI is distributed to user wallet
- Balance threshold alert notification content correctly displays threshold amount
- ROI arrival notification content correctly displays ROI amount and investment plan name
- Automatic notifications respect user notification preferences (disabled categories do not trigger notifications)
- Automatic notifications are subject to same rate limiting rules (max 10 notifications per user per day)
- Automatic notifications are logged in notification history
- System correctly handles automatic notification delivery failures (logs error, retries, triggers admin alert if all retries fail)
- Balance threshold alert triggers only once per threshold crossing, subsequent crossings within 1 hour do not trigger new notifications
- System validates balance threshold is positive number when user configures threshold
- All automatic notification functionality verified through unit tests and integration tests
- All automatic notification related user interface interactions verified through end-to-end tests
- Telegram alert configuration page created and accessible via admin navigation
- Telegram alert configuration page displays Telegram Bot setup guide
- Telegram alert configuration page displays Telegram Bot configuration section with Bot Token and Chat ID input fields and test connection button
- Telegram alert configuration page displays alert trigger configuration section with all supported triggers and enable/disable toggles
- Telegram alert configuration page displays alert message format configuration section with customizable message format and preview panel
- Telegram alert configuration page displays alert history section with filtering and delivery statistics
- Telegram alert configuration page displays alert testing section with test alert functionality
- System correctly sends Telegram alerts to configured Telegram account
- System correctly tracks alert delivery status (sent, delivered, failed)
- System implements alert rate limiting (max 50 alerts per hour)
- System implements retry mechanism for failed alert deliveries (max 3 retries)
- System logs all alert activities for audit purposes
- All Telegram alert functionality verified through unit tests and integration tests
- All Telegram alert related user interface interactions verified through end-to-end tests
- Bot Token and Chat ID securely stored as environment variables
- System validates Bot Token and Chat ID on configuration page before saving
- System provides test connection button to verify Bot Token and Chat ID validity
- All alert triggers correctly trigger Telegram alerts when corresponding system events occur
- All alert message templates correctly format alert messages with dynamic data
- System correctly handles alert delivery failures and logs errors
- Failed alerts trigger admin notification via alternative channel (email or browser push notification)
- All security measures for browser push notifications and Telegram alerts implemented and verified
- All documentation for browser push notifications and Telegram alerts completed and reviewed
- Telegram interactive management page created and accessible via admin navigation
- Telegram interactive management page displays pending support tickets section with ticket list and filtering functionality
- Telegram interactive management page displays pending withdrawal requests section with request list and filtering functionality
- Telegram interactive management page displays Telegram command configuration section
- Telegram interactive management page displays Telegram interaction history section with filtering functionality
- Telegram interactive management page displays Telegram Bot status indicator
- Admin can reply to support tickets directly via Telegram using /reply command
- Admin can approve withdrawal requests directly via Telegram using /approve command
- Admin can reject withdrawal requests directly via Telegram using /reject command
- System validates all Telegram commands follow correct format
- System validates admin has permission to execute Telegram commands
- System validates target object (ticket or request) exists and is in valid state
- System sends error message to admin via Telegram when command validation fails
- System records all Telegram interactions in interaction history
- System validates all incoming Telegram messages are from authorized admin accounts
- System implements rate limiting for Telegram commands (max 20 commands per admin per minute)
- System logs all unauthorized access attempts and triggers admin alert
- System sends error message to admin via Telegram when command execution fails
- System implements retry mechanism for transient Telegram command execution errors (max 3 retries)
- After admin approves withdrawal request via Telegram, system automatically executes fund transfer
- System sends approval or rejection notification to user via email or browser push notification after admin action via Telegram
- All Telegram interactive functionality verified through unit tests and integration tests
- All Telegram interactive functionality related user interface interactions verified through end-to-end tests
- All Telegram command validation logic verified through unit tests
- All Telegram interaction logging functionality verified through integration tests
- All Telegram Bot security measures implemented and verified
- All Telegram Bot error handling logic verified through unit tests and integration tests
- All MFA login flow documentation completed including technical flow diagrams, API request/response sequences and security considerations
- All MFA login flow wireframes or mockups created for key screens (primary credentials form, MFA method selection screen, Email OTP verification screen, Google Authenticator verification screen)
- All MFA login flow best practices documented and reviewed

---

## 7. Out of Scope for This Release

- Native mobile applications (iOS/Android)
- Automatic remediation of identified vulnerabilities (vulnerability identification and reporting in scope; remediation is manual)
- Batch sync for inactive or suspended user groups
- Team growth simulator projections beyond 10 years
- Real-time collaborative simulation sessions
- Comparison mode displaying compound vs simple projection lines simultaneously (deferred to future version)
- Procurement, licensing or billing management for commercial WAF or NGFW solutions
- Security Operations Center (SOC) or Managed Security Service Provider (MSSP) integration
- Penetration testing by third-party security companies (internal or automated penetration testing in scope)
- Real-time threat intelligence feed integration
- Automated incident response or self-healing security controls
- Custom logo asset design or creation (if official assets not provided, use placeholders)
- Social share analytics or click tracking for floating social share component
- Custom per-page social share message or image configuration
- Machine translation or AI-generated translations
- Languages other than the six specified languages (English, Spanish, Arabic, Tamil, Hindi, French) in this version
- RTL layout support for languages other than Arabic
- Automated KYC approval based solely on OCR extraction results
- OCR confidence scores or quality ratings displayed to end users
- Liveness detection or biometric verification as part of KYC process
- Government identity verification APIs or third-party KYC compliance platform integration beyond OCR document extraction
- Cryptocurrency wallet integration or on-chain USDT transfer processing
- Automated fiat settlement or bank API integration for bank account transfers or UPI methods
- Multi-currency exchange beyond INR and USDT
- Peer-to-peer (P2P) exchange matching between users
- Admin manual override of base exchange rate
- Automatic retry for failed fund transfers (failed transfers require manual admin intervention)
- Native mobile push notifications via iOS APNs or Android FCM SDK
- Push notifications to standard user accounts (only browser push notifications for website users)
- Wireframes, UI mockups or sequence diagrams as standalone deliverables
- Technical implementation plan as separate document
- Per-feature granular permission configuration for super admin role (beyond defined permission set)
- Editing or deleting audit log entries via UI
- Automated audit log archival or purge policy (retention policy defined but automated execution not in scope for this version)
- Real-time collaborative audit log review sessions
- Export network analysis data from referral tab (CSV or PDF)
- Cross-user network analysis comparison view
- Automated execution of IP-based language detection mapping updates (mapping table changes made manually via admin settings)
- Multi-language content support for dynamic sections beyond blog posts and investment plans in this version
- Automated translation quality assurance or translation memory tools
- Sitemap submission to search engine consoles for each locale (sitemap generation in scope; submission not in scope)
- SMS-based OTP delivery for admin accounts
- Biometric authentication for admin accounts (fingerprint, facial recognition)
- Automated malware scanning for file uploads (manual or third-party integration not in scope for this version)
- Real-time performance monitoring dashboard for end users
- A/B testing framework for FAQ content or other dynamic sections
- Automated FAQ content generation based on user support tickets
- Blockchain-based security features (e.g., immutable audit logs on blockchain)
- Hardware Security Module (HSM) integration for encrypted key storage
- Post-quantum cryptography implementation
- Zero-trust network architecture implementation
- Advanced Persistent Threat (APT) detection and response
- Security Information and Event Management (SIEM) system integration
- Compliance certification (e.g., SOC 2, ISO 27001, PCI DSS) preparation or audit support
- Real-time collaborative editing or annotation functionality for advanced referral dashboard tree view
- Real-time transaction status push updates for transaction history page (users need to manually refresh page to view latest status)
- 3D visualization or interactive graphic rendering for advanced referral dashboard tree view
- Advanced data analytics or predictive functionality for transaction history page (e.g., future earnings prediction)
- Custom theme or color scheme configuration for advanced referral dashboard and transaction history page
- Bulk operation functionality for transaction history page (e.g., bulk export or bulk delete)
- Node drag-and-drop rearrangement functionality for advanced referral dashboard tree view
- Transaction dispute or appeal functionality for transaction history page
- Automated root cause analysis or intelligent diagnosis for MFA verification failures
- Real-time user notification for MFA verification failures (beyond error messages)
- Automated remediation measures for MFA verification failures (such as auto-reset SMTP credentials)
- Automated root cause analysis or intelligent diagnosis for Edge Function call errors
- Real-time admin notification for Edge Function call errors (beyond logging and alerts)
- Automated remediation measures for Edge Function call errors (such as auto-switch to backup service)
- Automated repair for Edge Function request failures (diagnosis and manual repair in scope; automated repair not in scope)
- Support for TOTP apps other than Google Authenticator (such as Authy, Microsoft Authenticator)
- Real-time collaborative analysis or annotation functionality for security dashboard
- Advanced data analytics or predictive functionality for security dashboard (e.g., future attack trend prediction)
- Custom alert threshold configuration for security dashboard (uses default threshold: 5 failures within 5 minutes)
- Automated response measures for security dashboard (such as auto-lock accounts, auto-ban IPs, etc.)
- Cross-platform data aggregation or multi-tenancy support for security dashboard
- Advanced analytics or user behavior tracking for browser push notifications
- A/B testing for notification content or delivery timing
- Notification personalization based on user preferences or behavior
- Integration with third-party notification services (e.g., OneSignal, Firebase Cloud Messaging)
- Native mobile app push notifications (only browser push notifications for website users)
- Push notification support for browsers that do not support Web Push API
- Automated notification content generation based on user activity or system events (beyond balance threshold and ROI arrival)
- Real-time notification delivery status tracking dashboard for admins
- Notification analytics dashboard showing open rates, click rates, conversion rates, etc.
- Advanced Telegram Bot features beyond reply to support tickets and approve withdrawal requests (e.g., interactive buttons, inline keyboards, custom bot commands)
- Integration with multiple Telegram Bots for different alert categories
- Telegram group or channel broadcasting (only direct messages to configured Chat ID)
- Automated alert escalation based on severity or response time
- Integration with incident management systems (e.g., PagerDuty, Opsgenie)
- Advanced alert filtering or routing based on admin roles or permissions
- Real-time alert delivery status tracking dashboard for admins
- Alert analytics dashboard showing delivery rates, response times, etc.
- Automated alert content generation based on system events or user activity
- Support for alert delivery via other messaging platforms (e.g., Slack, Discord, WhatsApp)
- Automated support ticket categorization or priority assignment
- Automated withdrawal request risk assessment or fraud detection
- Real-time collaborative ticket resolution or multi-admin ticket assignment
- Support ticket escalation workflow or SLA tracking
- Withdrawal request batch approval or bulk operations
- Custom Telegram command creation or scripting functionality
- Telegram Bot analytics dashboard showing command usage statistics
- Integration with external ticketing systems or CRM platforms
- Forced Google Authenticator setup on admin first login (replaced by user-selectable MFA method)
- Email OTP based admin login method completely replaced by Google Authenticator (both methods now supported)
- Backup code functionality limited to Google Authenticator only (now available for both MFA methods)

---

## 8. Reference Files

None