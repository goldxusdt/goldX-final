# Supabase Setup Guide for Gold X Usdt

This document provides a step-by-step guide to setting up the Supabase backend for the Gold X Usdt platform on a new Supabase project.

## 1. Project Initialization
1. Create a new project on [Supabase](https://supabase.com).
2. Note your `Project URL` and `Anon Public Key` from **Project Settings > API**.
3. Add these to your hosting platform's environment variables as:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 2. Database Schema Setup
Run the following SQL in the **SQL Editor** of your Supabase dashboard to create the necessary tables:

```sql
-- Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  role TEXT DEFAULT 'user',
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallet Balances Table
CREATE TABLE public.wallets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  deposit_balance DECIMAL(20, 2) DEFAULT 0,
  roi_balance DECIMAL(20, 2) DEFAULT 0,
  bonus_balance DECIMAL(20, 2) DEFAULT 0,
  withdrawal_balance DECIMAL(20, 2) DEFAULT 0,
  total_invested DECIMAL(20, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount DECIMAL(20, 2) NOT NULL,
  type TEXT NOT NULL, -- 'deposit', 'withdrawal', 'roi', 'referral'
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'rejected'
  wallet_type TEXT NOT NULL,
  description TEXT,
  tx_hash TEXT,
  network TEXT, -- 'BEP20', 'TRC20'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings Table
CREATE TABLE public.settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auth Links & Pending Signups
CREATE TABLE public.auth_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  token UUID NOT NULL,
  purpose TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE public.pending_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  referral_code TEXT,
  token UUID NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
```

## 3. Storage Buckets
Create a public bucket named `kyc-documents` in **Storage** for user verification uploads.

## 4. Edge Functions Deployment
The following Edge Functions must be deployed using the Supabase CLI:
1. `send-auth-link`: Handles email dispatch for signup and password reset.
2. `activate-account`: Converts pending signups to real users.
3. `reset-password-token`: Updates user passwords via secure tokens.

Set the following secrets in Supabase:
```bash
supabase secrets set SITE_URL="https://your-domain.com"
supabase secrets set ZOHO_SMTP_HOST="smtp.zoho.com"
supabase secrets set ZOHO_SMTP_PORT="465"
supabase secrets set ZOHO_SMTP_USER="info@your-domain.com"
supabase secrets set ZOHO_SMTP_PASS="your-password"
```

## 5. Authentication Settings
1. Go to **Authentication > Providers > Email**.
2. Enable "Confirm Email" if using standard Supabase auth.
3. Configure the **Site URL** to match your deployment domain.
