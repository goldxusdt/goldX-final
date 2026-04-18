# 🔒 Security Features Quick Reference

## How to Use Security Features

### 1. Rate Limiting
```typescript
import { rateLimit } from '@/lib/security';

// In your component
if (!rateLimit(`action-${identifier}`, maxAttempts, windowMs)) {
  return; // User is rate limited
}
```

**Examples**:
- Login: `rateLimit('login-${email}', 5, 300000)` - 5 attempts per 5 minutes
- Signup: `rateLimit('signup-${email}', 3, 600000)` - 3 attempts per 10 minutes

### 2. Input Validation
```typescript
import { 
  validateEmail, 
  validatePhone, 
  validatePasswordStrength,
  sanitizeInput 
} from '@/lib/security';

// Validate email
if (!validateEmail(email)) {
  toast.error('Invalid email address');
  return;
}

// Validate password
const passwordCheck = validatePasswordStrength(password);
if (!passwordCheck.isValid) {
  toast.error(passwordCheck.errors[0]);
  return;
}

// Sanitize input
const cleanInput = sanitizeInput(userInput);
```

### 3. Attack Detection
```typescript
import { 
  detectAttackPattern, 
  preventSQLInjection 
} from '@/lib/security';

// Check for attack patterns
if (detectAttackPattern(input)) {
  toast.error('Invalid input detected');
  return;
}

// Prevent SQL injection
if (!preventSQLInjection(input)) {
  toast.error('Invalid characters detected');
  return;
}
```

### 4. Account Lockout
```typescript
import { 
  trackFailedLogin, 
  resetFailedLogins 
} from '@/lib/security';

// Track failed login
const lockoutStatus = trackFailedLogin(email);
if (lockoutStatus.isLocked) {
  toast.error(`Account locked. Try again in ${lockoutStatus.lockoutTime}s`);
  return;
}

// On successful login
resetFailedLogins(email);
```

### 5. Secure Storage
```typescript
import { secureStorage } from '@/lib/security';

// Store data securely
secureStorage.set('key', { data: 'value' });

// Retrieve data
const data = secureStorage.get('key');

// Remove data
secureStorage.remove('key');

// Clear all
secureStorage.clear();
```

### 6. Transaction Validation
```typescript
import { validateTransactionHash } from '@/lib/security';

if (!validateTransactionHash(hash)) {
  toast.error('Invalid transaction hash');
  return;
}
```

---

## 🎯 SEO Features Quick Reference

### 1. Add SEO to Any Page
```typescript
import { SEOHead } from '@/lib/seo';

export default function MyPage() {
  return (
    <>
      <SEOHead
        title="Page Title"
        description="Page description for search engines"
        keywords={['keyword1', 'keyword2', 'keyword3']}
        type="website"
        noindex={false} // Set true for private pages
      />
      {/* Your page content */}
    </>
  );
}
```

### 2. Add Structured Data
```typescript
import { Helmet } from 'react-helmet-async';
import { 
  organizationSchema, 
  websiteSchema,
  generateArticleSchema 
} from '@/lib/seo';

export default function MyPage() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {organizationSchema}
        </script>
        <script type="application/ld+json">
          {generateArticleSchema({
            title: 'Article Title',
            description: 'Article description',
            image: '/images/article.jpg',
            author: 'Author Name',
            publishedDate: '2026-03-19'
          })}
        </script>
      </Helmet>
      {/* Your page content */}
    </>
  );
}
```

### 3. Generate Breadcrumbs
```typescript
import { generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Dashboard', url: '/dashboard' },
  { name: 'Profile', url: '/profile' }
];

<Helmet>
  <script type="application/ld+json">
    {generateBreadcrumbSchema(breadcrumbs)}
  </script>
</Helmet>
```

### 4. Generate FAQ Schema
```typescript
import { generateFAQSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'What is the minimum investment?',
    answer: 'The minimum investment is 100 USDT.'
  },
  {
    question: 'What is the monthly ROI?',
    answer: 'We offer 10% monthly ROI on all investments.'
  }
];

<Helmet>
  <script type="application/ld+json">
    {generateFAQSchema(faqs)}
  </script>
</Helmet>
```

---

## 🚨 Security Alerts

### What Gets Blocked Automatically
1. **XSS Attempts**: `<script>`, `javascript:`, `onclick=`
2. **SQL Injection**: `SELECT`, `DROP`, `INSERT`, `--`, `;`
3. **Code Injection**: `eval()`, `import`, `document.`, `window.`
4. **Brute Force**: More than 5 login attempts in 5 minutes
5. **Spam**: More than 3 signup attempts in 10 minutes

### User Notifications
- **Rate Limited**: "Too many attempts. Please try again in X seconds."
- **Account Locked**: "Account temporarily locked. Try again in X seconds."
- **Invalid Input**: "Invalid input detected" or "Invalid characters detected"
- **Weak Password**: Specific error message about requirements

---

## 📊 Security Monitoring

### What to Monitor
1. **Failed Login Attempts**: Check for patterns
2. **Account Lockouts**: Investigate frequent lockouts
3. **Invalid Input Attempts**: Potential attack attempts
4. **Transaction Validation Failures**: Suspicious activity
5. **Rate Limit Hits**: Possible bot activity

### How to Monitor
- Check application logs
- Review user activity
- Monitor error rates
- Track failed authentications
- Review transaction patterns

---

## 🎓 Best Practices

### For Developers
1. Always validate user input
2. Sanitize before storing
3. Use rate limiting on sensitive endpoints
4. Implement proper error handling
5. Log security events
6. Keep dependencies updated
7. Review security regularly

### For Users
1. Use strong, unique passwords
2. Don't share credentials
3. Verify transaction details
4. Report suspicious activity
5. Keep account information updated

### For Admins
1. Monitor security logs daily
2. Review failed login attempts
3. Investigate suspicious patterns
4. Keep security measures updated
5. Train staff on security
6. Backup data regularly
7. Test security features

---

## 🔧 Troubleshooting

### "Too many attempts" Error
- **Cause**: Rate limiting triggered
- **Solution**: Wait for the specified time period
- **Prevention**: Don't retry failed actions immediately

### "Account temporarily locked" Error
- **Cause**: 5 failed login attempts
- **Solution**: Wait 15 minutes or contact admin
- **Prevention**: Use correct credentials

### "Invalid input detected" Error
- **Cause**: Input contains suspicious patterns
- **Solution**: Remove special characters or scripts
- **Prevention**: Use normal text input

### "Invalid characters detected" Error
- **Cause**: SQL injection patterns detected
- **Solution**: Remove SQL keywords from input
- **Prevention**: Use standard text without SQL syntax

---

## 📞 Emergency Procedures

### If Account is Compromised
1. Lock the account immediately
2. Reset password
3. Review recent activity
4. Check transaction history
5. Notify affected users
6. Update security measures

### If Attack Detected
1. Enable additional rate limiting
2. Review security logs
3. Block suspicious IPs (if applicable)
4. Patch vulnerabilities
5. Monitor closely
6. Document incident

---

## ✅ Security Checklist

### Daily
- [ ] Review failed login attempts
- [ ] Check for unusual activity
- [ ] Monitor error logs

### Weekly
- [ ] Review security logs
- [ ] Check rate limit effectiveness
- [ ] Verify backup integrity
- [ ] Test security features

### Monthly
- [ ] Security audit
- [ ] Update dependencies
- [ ] Review RLS policies
- [ ] Train staff on new threats
- [ ] Test incident response

---

**Quick Help**: See SECURITY_SEO_GUIDE.md for detailed documentation
**Version**: 1.0.0
**Last Updated**: 2026-03-19
