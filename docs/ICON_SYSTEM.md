# Icon System for Service Categories

## Overview

The service category system uses predefined Heroicons (solid variant) instead of free text input. This ensures consistent icon rendering across the website and provides a better user experience, matching the style used in other parts of the application like the job listings page.

## Available Icons

When editing a service category in Sanity Studio, you'll see a dropdown with 20 predefined Heroicons:

### 🖥️ Computer & Hardware

- **Computer Desktop** (`ComputerDesktopIcon`) - General IT services, computer support
- **Device Phone Mobile** (`DevicePhoneMobileIcon`) - Mobile development, mobile solutions
- **Device Tablet** (`DeviceTabletIcon`) - App development, tablet solutions

### ☁️ Cloud & Infrastructure

- **Cloud** (`CloudIcon`) - Cloud services, cloud migration
- **Globe Alt** (`GlobeAltIcon`) - Networking, infrastructure
- **Circle Stack** (`CircleStackIcon`) - Database services, data management

### 🔒 Security & Compliance

- **Shield Check** (`ShieldCheckIcon`) - Cybersecurity, security consulting
- **Document Check** (`DocumentCheckIcon`) - Compliance, regulatory services
- **Eye** (`EyeIcon`) - Monitoring, surveillance systems

### 🔧 Development & Technology

- **Code Bracket** (`CodeBracketIcon`) - Software development, coding
- **Cpu Chip** (`CpuChipIcon`) - Artificial intelligence, machine learning
- **Arrow Path** (`ArrowPathIcon`) - System integration, API development

### 📊 Business & Consulting

- **Chart Bar** (`ChartBarIcon`) - Data analytics, business intelligence
- **Light Bulb** (`LightBulbIcon`) - IT consulting, strategy
- **Building Office** (`BuildingOfficeIcon`) - Enterprise solutions, corporate services

### 🚀 Digital Transformation

- **Rocket Launch** (`RocketLaunchIcon`) - Digital transformation, modernization
- **Clipboard Document List** (`ClipboardDocumentListIcon`) - Project management, PMO
- **Users** (`UsersIcon`) - Team collaboration, communication tools

### 🌍 Global & Performance

- **Map** (`MapIcon`) - International services, global reach
- **Bolt** (`BoltIcon`) - Performance optimization, speed improvements

## How to Use

1. **In Sanity Studio**: When editing a service category, look for the "Icon" field
2. **Select Icon**: Choose from the dropdown list of available Heroicons
3. **Icon Preview**: Each option shows the icon name for easy selection
4. **Automatic Rendering**: The icon will automatically render on the website

## Icon Display

Icons are displayed in various sizes throughout the website:

- **Navbar**: Small icons (16x16px) in the services dropdown
- **Service Cards**: Medium icons (24x24px) in service listings
- **Category Headers**: Large icons (32x32px) on category pages
- **Individual Services**: Medium icons (24x24px) on service detail pages

## Fallback System

If an icon is not selected or the icon name is invalid:

- The system will display the first letter of the category name
- This ensures the UI remains functional even without icons

## Best Practices

1. **Choose Relevant Icons**: Select icons that clearly represent the service category
2. **Consistent Theming**: Use the color theme field to match the icon with your brand
3. **Visual Hierarchy**: Icons help users quickly identify service types
4. **Accessibility**: Icons are paired with text labels for screen readers

## Technical Details

- **Icon Library**: Uses Heroicons (solid style) from @heroicons/react/24/solid
- **Component**: Icons are rendered through the `Icon` component in `src/components/ui/icon.tsx`
- **Style Consistency**: Matches the icon style used in job listings and other parts of the application
- **Responsive**: Icons scale appropriately for different screen sizes
- **Performance**: Icons are optimized and bundled with the application

## Adding New Icons

To add new icons to the system:

1. Import the icon from `@heroicons/react/24/solid`
2. Add it to the `iconMap` in `src/components/ui/icon.tsx`
3. Add the icon option to the Sanity schema in `src/sanity/schemaTypes/serviceCategoryType.ts`

## Example Usage

```typescript
// In Sanity Studio, select:
// Icon: "Cloud" (CloudIcon)
// Color Theme: "Blue" (bg-blue-100 text-blue-800)

// This will render as a blue cloud icon throughout the website
```

## Icon Style Consistency

The service category icons now use the same solid Heroicon style as:

- Job listing page icons (BriefcaseIcon, MapPinIcon, CurrencyDollarIcon)
- Other UI elements throughout the application
- This creates a cohesive visual experience across the entire website
