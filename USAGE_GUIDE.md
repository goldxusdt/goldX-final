# Gold X Usdt Security & Style Guide

Welcome to the administrative security and design guide. This document provides step-by-step instructions for using the Security Audit, Security Center, and Style Guide features.

---

## 1. Security Center Page
**Purpose**: Real-time monitoring of application perimeter security, firewall status, and live threat detection.

### 🛡️ How to use:
1. **Navigate**: Log in as an Admin/Super Admin and go to `Admin -> Security Center`.
2. **Overview Tab**: 
   - View real-time KPIs: MFA Protection status, Active IP Blocks, WAF Alerts (24h), and Unique Threat Origins.
   - Analyze the **Traffic & Threat Trends** chart for historical attack patterns.
   - Check the **Event Distribution** pie chart to see which types of attacks are most frequent.
3. **Firewall Rules Tab**: 
   - View active blocks (IP, CIDR, or Geo-country).
   - To add a rule: Click **"Deploy New Rule"**, select the type (e.g., `Geo Block`), enter the value (e.g., `CN`), and provide a reason. Click **"Confirm Deployment"**.
   - To remove a rule: Click the trash icon next to any active rule.
4. **WAF Events Tab**:
   - Inspect granular logs of blocked requests, including IP address, user agent, endpoint targeted, and severity level.
5. **Rate Limits Tab**:
   - Monitor users or IPs that have been throttled for exceeding request thresholds on sensitive endpoints (e.g., login, withdrawals).
6. **MFA Logs Tab**:
   - Track when administrators enabled/disabled MFA or used backup recovery codes.

---

## 2. Security Audit Page
**Purpose**: Automated compliance scanning against OWASP Top 10, PCI-DSS, and GDPR standards.

### 📋 How to use:
1. **Navigate**: Go to `Admin -> Security Audit`.
2. **Running a Scan**: 
   - Click the **"Run Security Scan"** button (Lightning icon).
   - This triggers an automated Edge Function that evaluates the database, RLS policies, and system configuration.
3. **Reviewing Reports**:
   - Once the scan is complete (status: `COMPLETED`), click on the scan name in the **Audit History** table.
   - Check the **Score (X/100)** to see overall health.
4. **Fixing Vulnerabilities**:
   - Scroll down to the **Detected Vulnerabilities** section.
   - Read the **Remediation Guide** for step-by-step technical instructions on how to resolve each finding.
5. **Exporting for Compliance**:
   - For external auditors (PCI/GDPR), click the **Download (PDF)** icon in the Audit History table.
   - This generates a formal report including executive summary, vulnerability details, and remediation recommendations.

---

## 3. Style Guide
**Purpose**: Maintaining consistent branding and premium visual identity.

### ✨ Design Principles:
1. **Color Palette**: 
   - **Primary**: Gold (`#D4AF37`) for accents, gradients, and primary actions.
   - **Background**: Deep black/dark grey (`#0a0a0a`) with glassmorphism effects.
   - **Foreground**: Clean white (`#ffffff`) for primary text, muted grey (`#a3a3a3`) for secondary.
2. **UI Components**:
   - Always use `v56-glass` class for cards to maintain the signature premium feel.
   - Use `v56-gradient-text` for headings to apply the gold-to-light-gold transition.
   - Use `premium-border` for card containers to add the subtle 1px border with golden highlights.
3. **Typography**:
   - Headings should use `font-black` and `tracking-tight` for a bold, impactful look.
   - Labels and small text should use `uppercase` and `tracking-widest` for a professional, technical aesthetic.
4. **Responsiveness**:
   - All layouts must use `flex-col sm:flex-row` patterns.
   - Buttons must be at least `h-12` on mobile to ensure touch accessibility.

---

## 4. Admin MFA & Recovery
### 🔑 Setup MFA:
1. Navigate to your Profile or the Security Center and click **"Configure MFA"**.
2. Scan the QR code using Google Authenticator or Authy.
3. Enter the 6-digit verification code.
4. **CRITICAL**: Copy and save the provided **Backup Codes** in a safe place.

### 🩹 Recovery Workflow:
1. If you lose your phone, go to the Admin Login page.
2. Enter your email and password.
3. On the MFA screen, click **"Use Backup Code"**.
4. Enter one of your 8-character backup codes.
5. Once logged in, immediately reset your MFA in the Security Center to generate a new secret.

---

*Last Updated: 2026-03-13*
