
# 📘 PROJECT MASTER: ProConnect Egypt
**Version:** 3.0.0 (The "Event Economy" Pivot)
**Status:** Beta / Investor Ready
**Maintainer:** CTO & Engineering Team

---

## 1. 🧠 THE CORE PHILOSOPHY (PIVOT STRATEGY)
### 1.1 From "Job Board" to "Gig OS"
ProConnect has evolved beyond a static recruitment platform into a **High-Velocity Operational System (OS)** for the Egyptian Event & Gig Economy. 

**The Market Gap:**
Major events (Cairo ICT, Sahara Expo, Cityscape) require mobilizing hundreds of temporary staff (ushers, sales, tech support) in days. The current process is chaotic (WhatsApp groups, cash payments, high no-show rates).

**The Solution:**
We treat "Staffing" like "Uber".
*   **For Talent:** "Gig-in-a-Box". Apply once, work multiple events, get paid instantly.
*   **For Organizers:** "Command Center". Real-time tracking, automated replacements, and instant bulk payouts.

### 1.2 The "Concierge" Standard (Retained)
We maintain our strict data policy. No free text. All inputs (Skills, Locations, Roles) are validated against `src/data/referenceData.ts` to ensure high-fidelity AI matching.

---

## 2. 🏗️ ARCHITECTURE & TECH STACK

### 2.1 Technology Stack
*   **Frontend:** React 18 + Vite (High-performance rendering).
*   **Styling:** Tailwind CSS (Utility-first, Mobile-First).
*   **State:** React Context API (`AuthContext`, `DemoContext`).
*   **AI Engine:** Google Gemini (via `@google/genai`) for profile parsing and performance analysis.
*   **Visuals:** Lucide React (Iconography) + CSS-in-JS Animations.

### 2.2 Directory Structure (Domain Driven)
```text
src/
├── features/
│   ├── events/       # The Unified Pool & Expo Logic
│   ├── shifts/       # QR Scanning, Panic Protocol, Zone Management
│   ├── squads/       # Group Application Logic
│   ├── wallet/       # Fintech & Asset Locking Logic
│   ├── reviews/      # AI Bulk Analysis
│   └── hiring/       # Smart Re-Book & Cloning
├── data/             # Mock Database (Hyper-real Egyptian context)
├── context/          # Global State (Auth, Demo Mode)
└── components/       # Atomic UI Library
```

---

## 3. 🎪 THE EVENT GIG ENGINE (CORE ENGINE)

### 3.1 The Unified Pool Logic
Instead of applying to 50 individual company booths, candidates apply to the **Event Pool** (e.g., "Cairo ICT 2026 Pool").
*   **Mechanism:** `EventHub.tsx`
*   **Flow:** User -> Apply to Event -> Added to `appliedEvents[]` -> Visible to ALL 450+ attending companies.
*   **Benefit:** Maximizes utilization. A user rejected by Vodafone can be instantly picked up by Etisalat within the same venue.

### 3.2 Squad Mode (Social Accountability)
To combat the high "No-Show" rate in the gig economy, we introduced **Squads**.
*   **Concept:** Users form teams (3-5 friends) and apply together.
*   **Logic:** `features/squads/SquadBuilder.tsx` calculates a **Squad Reliability Score**.
    *   `Squad_Score = AVG(Member_Reliability_Scores)`
*   **Incentive:** Higher reliability squads get priority access to VIP shifts. If one member ghosts, the whole squad's score drops.

### 3.3 Operational Tools (The Command Center)
*   **Venue Map (`features/zones`):**
    *   Interactive coordinate-based map (`x`, `y` percentages).
    *   Real-time "Pin" indicators showing zone capacity (e.g., "Gate 4: 2/5 Staff").
*   **Event Chat (`features/chat`):**
    *   Role-based broadcasting.
    *   **Admin:** Sends "Priority Broadcasts" (e.g., "Gate 4 Overwhelmed").
    *   **User:** Read-only for broadcasts, write-access for local team coordination.

---

## 4. 🛡️ TRUST & SAFETY ARCHITECTURE

### 4.1 Reliability Score Algorithm
The currency of the platform is not EGP, but **Reliability**.
*   **Formula:** `(Shifts_Completed / Shifts_Booked) * 100`
*   **Tiers:**
    *   **Elite (95%+):** Instant payouts, VIP access.
    *   **Reliable (80-94%):** Standard access.
    *   **Risk (<80%):** Requires "Squad Backing" to get hired.

### 4.2 The "Panic Button" Protocol
Automated handling of absenteeism during live events.
*   **Trigger:** Supervisor marks user as "No-Show" in `ShiftManager`.
*   **Sequence:**
    1.  **Status Change:** User flagged, Reliability Score penalized.
    2.  **Surge Pricing:** The shift rate is instantly increased by 1.5x (e.g., 500 EGP -> 750 EGP).
    3.  **Standby Alert:** Push notification sent to the **Standby Pool** (users geofenced near the venue).
    4.  **Race Condition:** First to accept via `UrgentGigCard` gets the QR code.

### 4.3 Asset Security & Payout Locking
Prevents theft of uniforms, badges, or tablets.
*   **Logic:** `WalletDashboard.tsx` checks `ASSETS` array.
*   **Condition:** `IF (Asset.assignedTo === User.id AND Asset.status === 'ASSIGNED')`
*   **Action:** Withdrawal button is **DISABLED**.
*   **Resolution:** Supervisor must mark asset as `RETURNED` via `AssetManager` to unlock funds.

---

## 5. 💰 FINTECH & MONETIZATION

### 5.1 ProWallet Ledger
A simulated double-entry ledger system.
*   **Pending Balance:** Earnings from completed shifts not yet cleared (Asset check pending).
*   **Available Balance:** Cleared funds ready for withdrawal.
*   **Methods:** Vodafone Cash, InstaPay, Fawry (Simulated via `PaymentModal`).

### 5.2 Smart Re-Book (Retention)
Allows companies to "Clone" high-performing teams from past events.
*   **Component:** `EventCloningModal.tsx`.
*   **Logic:**
    1.  Select Source Event (e.g., "Cairo ICT 2025").
    2.  Filter: `Rating >= 4.0` AND `No-Show == False`.
    3.  Action: Bulk send "Direct Offers" to target users for "Sahara Expo 2026".

---

## 6. 🧪 QA & DEMO PROTOCOLS

### 6.1 Demo Mode (`DemoContext`)
Designed for fail-safe investor presentations.
*   **Activation:** Toggle via `RoleSwitcher` (Bottom Right).
*   **Overrides:**
    *   Forces `Wallet Balance` to 4,500 EGP.
    *   Forces `Reliability` to 98% (Elite Status).
    *   Injects 5 "Urgent Notifications" to demonstrate activity.
*   **Purpose:** Ensures the "Happy Path" is always demonstrable, regardless of local storage state.

### 6.2 Role Switcher
*   **Admin:** Full access to `ShiftManager`, `AssetManager`, `BulkReview`.
*   **Company:** Access to `Hiring`, `My Events`.
*   **Seeker:** Access to `Feed`, `Wallet`, `QR Scanner`.

---

*This document serves as the technical source of truth for the ProConnect v3.0 architecture.*
