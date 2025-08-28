# Dynamic Contact Management Setup

## What's New

Your contact page now uses Sanity CMS for **complete dynamic management** of:

- ✅ Contact information (phone, email, addresses)
- ✅ Office locations with Google Maps integration
- ✅ External links and booking forms
- ✅ All content, links, and integrations

## How to Use

### 1. Access Sanity Studio

- Go to `/studio` on your site
- You'll see three new sections: "Contact Information", "Office Location", and "External Link"

### 2. Create Contact Entries

Create entries for each contact method:

#### Main Office Example:

- **Title**: Zürich Headquarters
- **Contact Type**: Main Office
- **Icon**: Map Pin
- **Address**: Bahnhofstrasse 123, 8001 Zürich, Switzerland
- **Description**: Main Office & Consulting Hub
- **Order**: 1
- **Active**: ✓

#### Phone Example:

- **Title**: Main Phone
- **Contact Type**: Phone
- **Icon**: Phone
- **Phone**: +41 44 123 45 67
- **Description**: Mon-Fri: 9:00 AM - 6:00 PM CET
- **Order**: 2
- **Active**: ✓

#### Email Example:

- **Title**: General Inquiries
- **Contact Type**: Email
- **Icon**: Envelope
- **Email**: info@maxsoft.ch
- **Description**: For general questions and support
- **Order**: 3
- **Active**: ✓

### 3. Create Office Locations

Set up your physical office locations:

#### Zürich Headquarters Example:

- **Office Title**: Zürich - Headquarters
- **Location Type**: Headquarters
- **Address**: Bahnhofstrasse 123, 8001 Zürich, Switzerland
- **City**: Zürich
- **Country**: Switzerland
- **Description**: Main Office & Consulting Hub
- **Google Maps Embed URL**: [Get from Google Maps share/embed]
- **Order**: 1
- **Active**: ✓

#### Geneva Office Example:

- **Office Title**: Geneva - Regional Office
- **Location Type**: Regional Office
- **Address**: Rue du Rhône 45, 1204 Geneva, Switzerland
- **City**: Geneva
- **Country**: Switzerland
- **Description**: International Business & Partnerships
- **Google Maps Embed URL**: [Get from Google Maps share/embed]
- **Order**: 2
- **Active**: ✓

### 4. Create External Links

Set up your booking forms and other integrations:

#### Microsoft 365 Booking Example:

- **Link Title**: Microsoft 365 Booking
- **Link Type**: Booking
- **URL**: https://outlook.office365.com/owa/calendar/MaxsoftAG@maxsoft.ch/bookings/
- **Description**: Use our integrated booking system to schedule a consultation at your convenience.
- **Button Text**: Book Your Consultation
- **Icon**: Globe
- **Order**: 1
- **Active**: ✓

#### Support Portal Example:

- **Link Title**: Client Support Portal
- **Link Type**: Support
- **URL**: https://support.maxsoft.ch
- **Description**: Access our comprehensive support system and knowledge base.
- **Button Text**: Access Support
- **Icon**: Document
- **Order**: 2
- **Active**: ✓

### 5. Google Maps Integration

To get the embed URL for each office:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your office address
3. Click "Share" → "Embed a map"
4. Copy the full iframe src URL
5. Paste it into the "Google Maps Embed URL" field in Sanity

### 6. Features

- **Dynamic Icons**: Automatically maps to appropriate Heroicons
- **Conditional Fields**: Only shows relevant fields based on type
- **Ordering**: Control display order with the order field
- **Active/Inactive**: Toggle any item on/off
- **Responsive**: Automatically adapts to different screen sizes
- **Fallback Handling**: Shows appropriate messages when content isn't available

### 7. Benefits

- ✅ **No Code Changes**: Update everything without touching code
- ✅ **Real-time Updates**: Changes appear immediately on your site
- ✅ **Flexible**: Add/remove/modify any content easily
- ✅ **Consistent**: Maintains your design language automatically
- ✅ **Scalable**: Easy to add new offices, contact methods, or integrations
- ✅ **Professional**: Dynamic content management for all contact-related content

## Current Content Types Supported

### Contact Information

- **Main Office**: Physical address with description
- **Regional Office**: Secondary office locations
- **Phone**: Phone numbers with optional description
- **Email**: Email addresses with optional description
- **Other**: Custom contact methods

### Office Locations

- **Headquarters**: Main office location
- **Regional Office**: Secondary office locations
- **Branch Office**: Smaller satellite offices

### External Links

- **Booking Form**: Consultation booking systems
- **Support Portal**: Client support access
- **Client Portal**: Client dashboard access
- **Documentation**: Knowledge base and guides
- **Other**: Custom integrations

## Icon Options

- Map Pin (for offices)
- Phone (for phone numbers)
- Envelope (for email)
- Globe (for websites/other)
- Calendar (for booking systems)
- Document (for support/documentation)
- User (for client portals)

## What Happens Automatically

1. **Contact Info Section**: Displays all active contact methods in order
2. **Office Locations Section**: Shows all active office locations
3. **Map Section**: Uses the first active office's Google Maps embed
4. **Booking Section**: Finds and displays the first active booking link
5. **Fallback Messages**: Shows appropriate messages when content isn't available

Your contact page is now **100% dynamic** and will automatically display all active content in the order you specify through Sanity Studio!
