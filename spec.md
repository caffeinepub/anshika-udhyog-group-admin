# Anshika Udhyog Group - Full Platform

## Current State
- Splash screen with logo animation → Login → Admin-only dashboard
- Admin dashboard: Letter Generator, Gallery Management, Document Management
- Backend: Letter CRUD, Gallery CRUD, Document CRUD, Stats
- Auth: hardcoded admin login (ID: admin, PW: 504560@AUC)

## Requested Changes (Diff)

### Add

**Admin Dashboard (new tabs/sections):**
- User Management tab: Create/edit/delete users with ID, password, profile photo, role
- Letter tab enhancement: Upload logo, seal, signature image from gallery into letterhead
- Gallery: already has upload; ensure it's accessible for letter assets
- B2B Marketing Plan management (edit/update content, upload photos per product)
- Income Plan management (edit tiers, amounts, descriptions)
- Branch/Center/Downteam management (tree view, CRUD)
- Machine, Raw Material, Sales, Marketing details management with photo upload
- Products/Services management with description and photo
- Notifications management (send notifications to users)
- Loan Applications management (view, approve, reject)
- Franchise Applications management (view, approve, reject)
- Shopping/Utilities product catalog management
- Official Documents: ID Card, Certificate, Official Letter, Official Order issue/manage

**User Dashboard (new role: regular user):**
After login with user credentials, show a separate user-facing dashboard with:
- Home/Overview with wallet balance, notifications
- Loan Apply (form with full details)
- Franchise Apply (form with full details)
- About Us (company info, editable by admin)
- Services (list, admin-managed)
- Multiple Income (income plan display)
- Wallet (balance, transaction history)
- Withdrawal (request withdrawal form)
- KYC (upload documents for verification)
- ID Card (view issued ID card)
- Certificate (view issued certificates)
- Official Letter (view issued letters)
- Official Order (view official orders)
- Official Access (access credentials/documents)
- Work (work assignments/tasks)
- Notifications (inbox)
- Shopping (product catalog with cart)
- Utilities (utility services)
- B2B Marketing Plan (view plan)
- Income Plan (view income tiers)
- Branch/Center/Downteam Tree (view own team tree)
- Machine/Raw Material/Sales/Marketing details with photos and loop animation icons

### Modify
- App.tsx: add role-based routing (admin → AdminDashboard, user → UserDashboard)
- Login: authenticate against stored users (admin hardcoded + dynamic users)
- Backend: expand with user management, loan applications, franchise applications, wallet, KYC, notifications, products, B2B plan, income plan, branch/center/team tree, company content (about, services)
- Letter generator: allow uploading/selecting logo, seal, signature from gallery

### Remove
- Nothing removed

## Implementation Plan
1. Expand Motoko backend: User type, LoanApplication, FranchiseApplication, Wallet/Transaction, KYC, Notification, Product, B2BPlan, IncomePlan, BranchNode, CompanyContent types and CRUD
2. Select blob-storage component (already selected)
3. Build Admin Dashboard with all management tabs
4. Build User Dashboard with all user modules
5. Role-based routing in App.tsx based on logged-in user role
6. Letter tab: add logo/seal/signature image picker from gallery
7. Animated loop icons on machine/raw material/sales/marketing pages
