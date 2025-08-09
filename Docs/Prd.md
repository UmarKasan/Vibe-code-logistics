# 📄 Product Requirements Document (PRD)

## Project Title: Terminal Management System (TMS)

### 🧭 Overview
The Terminal Management System is a web-based dashboard designed to streamline the process of managing and sorting **Air Way Bills (AWBs)** and **House Air Way Bills (HAWBs)** that arrive by air freight in Singapore. The system provides real-time visibility, notifications, and updates to **freight managers**, **ground handlers**, and **truckers**.

---

### 👥 Target Users
- Freight Company Management  
- Ground Handling Teams  
- Truckers assigned to specific shipments  

---

### 🎯 Objectives
- Notify relevant users when AWBs have arrived in Singapore.
- Identify and display which HAWBs belong to which freight company.
- Enable smooth handover of goods from air terminal to trucking logistics.
- Reduce reliance on manual matching, phone calls, and paperwork.

---

### ✅ Success Criteria
- Ground handlers can clearly identify and assign each HAWB to the right freight company.
- Truckers get notified as soon as their shipments are ready for collection.
- Reduced miscommunication and delays in shipment handling.
- High system uptime and real-time responsiveness.

---

### 📦 Features Table

| Feature Name             | Description                                                                 | Status         |
|--------------------------|-----------------------------------------------------------------------------|----------------|
| Dashboard View           | Overview of inbound AWBs with filters and quick stats                       | Not Started    |
| AWB/HAWB List Page       | Searchable and filterable table showing airway bills                        | Not Started    |
| AWB Detail Page          | Timeline and full metadata of a specific AWB/HAWB                           | Not Started    |
| Status Tracking UI       | Visual indicators for shipment status (e.g., Arrived, Ready, Collected)     | Not Started    |
| Notification System      | Toast alerts for new arrivals or status updates                             | Not Started    |
| Role-Based Views         | Different interfaces based on user role (Trucker, Handler, Manager)         | Not Started    |
| API Integration Layer    | Fetch AWB data and statuses from backend                                    | Not Started    |
| Data Refreshing Logic    | Polling or WebSocket support for live updates                               | Not Started    |
| User Authentication UI   | Basic login flow with role recognition                                      | Not Started    |
| Mobile Responsive Design | Fully responsive layout for tablet/phone access                             | Not Started    |

---

### 🖥️ Frontend Tech Stack

| Area                | Technology                     |
|---------------------|--------------------------------|
| Frontend Framework  | React.js (with Vite or Next.js)|
| Styling             | Tailwind CSS                   |
| UI Components       | ShadCN UI / Headless UI        |
| State Management    | Zustand                        |
| Data Fetching       | React Query or SWR             |
| Notifications       | Sonner or React Toastify       |
| Routing             | React Router / Next.js Routing |
| Real-time Updates   | Polling (MVP), WebSocket-ready |

---

### 🧩 Must-Have Functionalities
- Extract AWB and HAWB data via API
- Display, track, and update airway bill status
- Notify users of changes in status
- Show only relevant HAWBs to specific companies
- Role-based access and interface customization

---

### 🚫 Out of Scope
- Customs clearance or documentation workflows  
- Route planning or truck GPS tracking  
- Invoicing and payment systems  
- Airline backend system integration  
- Native mobile apps (iOS/Android)  
- AI/ML-based sorting or prediction  

---

### 🎨 UI/UX Styling Guide

#### Color Palette
- **Primary Blue**: `#0066FF` (Main actions, buttons, highlights)
- **Dark Blue**: `#001A33` (Headings, important text)
- **Light Gray**: `#F8F9FA` (Section backgrounds)
- **White**: `#FFFFFF` (Background, text on dark)
- **Text Gray**: `#666666` (Secondary text)
- **Success Green**: `#22C55E` (Positive actions, success states)
- **Warning Yellow**: `#F59E0B` (Warnings, pending states)
- **Error Red**: `#EF4444` (Errors, destructive actions)

#### Typography
- **Font Family**: 'Inter', -apple-system, sans-serif
- **Headings**:
  - H1: 2.5rem (40px), 700 weight
  - H2: 2rem (32px), 700 weight
  - H3: 1.5rem (24px), 600 weight
  - H4: 1.25rem (20px), 600 weight
- **Body Text**:
  - Large: 1.125rem (18px), 1.75 line height
  - Regular: 1rem (16px), 1.5 line height
  - Small: 0.875rem (14px), 1.5 line height

#### Components
- **Buttons**:
  - Primary: Blue background, white text, 8px border radius
  - Secondary: White background, blue border, blue text
  - Size: 48px height, 16px horizontal padding
  - Hover: Slight darken with transition

- **Input Fields**:
  - Height: 48px
  - Border: 1px solid #E0E0E0
  - Border Radius: 8px
  - Focus: 2px solid #0066FF
  - Padding: 0 16px

- **Cards**:
  - Background: White
  - Border Radius: 12px
  - Shadow: 0px 2px 8px rgba(0, 0, 0, 0.05)
  - Hover: Shadow elevation increase

#### Spacing
- Base Unit: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- X-Large: 32px
- XX-Large: 48px

#### Icons
- Size: 20x20px (standard), 24x24px (large)
- Color: Inherit text color or primary blue
- Stroke Width: 1.5px for outlined icons

#### Status Indicators
- **Success**: Green (#22C55E)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Blue (#0066FF)

#### Animations
- Hover: 150ms ease-in-out
- Modal/Overlay: 200ms ease-in-out
- Toast Notifications: 300ms ease-in-out

#### Breakpoints
- Mobile: < 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

#### Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Focus states clearly visible
- Keyboard navigation support
- ARIA labels where applicable
