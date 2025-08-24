# Testimonials Setup Guide

This guide explains how to manage testimonials through Sanity CMS for the Maxsoft AG website.

## Overview

The testimonials system allows you to dynamically manage client testimonials that appear on the homepage. The system includes:

- **Dynamic Content Management**: Add, edit, and remove testimonials through Sanity Studio
- **Smart Display**: Testimonials section only appears when testimonials are added
- **Professional Design**: Maintains the existing design language with image overlays and gradient text
- **Responsive Layout**: Horizontal scrolling with navigation dots

## Sanity Schema Fields

### Testimonial Document

- **Quote**: The testimonial text (max 500 characters)
- **Author Information**:
  - Name (required)
  - Job Title (required)
  - Company (required)
  - Photo (optional, with alt text)
- **Rating**: 1-5 star rating (defaults to 5)
- **Featured**: Mark as featured testimonial
- **Display Order**: Control the order of appearance
- **Active Status**: Enable/disable testimonials
- **Date Added**: Automatically tracked

## How to Add Testimonials

### 1. Access Sanity Studio

Navigate to your Sanity Studio (typically at `/studio`)

### 2. Create New Testimonial

1. Click "Create" → "Testimonial"
2. Fill in the required fields:
   - **Quote**: Enter the client's testimonial
   - **Author Name**: Client's full name
   - **Job Title**: Their position/role
   - **Company**: Company name
   - **Photo**: Upload client photo (recommended 400x400px)

### 3. Optional Settings

- **Rating**: Set 1-5 stars (defaults to 5)
- **Featured**: Check if this should be prominently displayed
- **Display Order**: Lower numbers appear first
- **Active**: Ensure this is checked to display

### 4. Save and Publish

Click "Publish" to make the testimonial live on the website

## Content Guidelines

### Quote Guidelines

- **Length**: Keep under 500 characters for best display
- **Content**: Focus on specific benefits or results
- **Tone**: Professional and authentic
- **Examples**:
  - "Maxsoft AG transformed our IT infrastructure, improving efficiency by 40%"
  - "The cloud migration saved us 60% on infrastructure costs"

### Photo Requirements

- **Format**: JPG or PNG
- **Size**: Minimum 400x400px (square aspect ratio)
- **Quality**: High resolution, professional headshot
- **Alt Text**: Include descriptive text for accessibility

### Author Information

- **Name**: Use full professional name
- **Title**: Include specific job title
- **Company**: Full company name (avoid abbreviations)

## Display Behavior

### Homepage Integration

- Testimonials appear in a horizontal scrolling section
- Each testimonial shows as a card with photo background
- Quote overlays the photo with gradient background
- Author info displays with company branding colors

### Smart Hiding

- If no testimonials are added, the entire section is hidden
- Section automatically appears when first testimonial is published
- No empty states or placeholder content

### Responsive Design

- Desktop: Horizontal scroll with navigation dots
- Mobile: Touch-friendly scrolling
- Cards maintain aspect ratio across devices

## Management Tips

### Organization

- Use **Display Order** to control sequence
- Set **Featured** for most important testimonials
- Use **Active** status to temporarily hide testimonials

### Content Strategy

- Aim for 4-8 testimonials for optimal display
- Mix different industries/company sizes
- Update regularly with fresh testimonials
- Include specific metrics when possible

### Photo Management

- Maintain consistent photo style/quality
- Ensure you have permission to use client photos
- Consider placeholder image for testimonials without photos

## Technical Notes

### Fallback Handling

- Missing photos use placeholder image
- Empty testimonials array hides entire section
- Graceful handling of missing author information

### Performance

- Images are optimized through Sanity's CDN
- Lazy loading for better page performance
- Responsive image sizing

### SEO Benefits

- Testimonials improve social proof
- Author names and companies provide relevant keywords
- Structured data for better search visibility

## Troubleshooting

### Testimonials Not Appearing

1. Check if testimonials are marked as "Active"
2. Verify testimonials are published (not just saved as draft)
3. Ensure at least one testimonial exists

### Photo Issues

1. Check image format (JPG/PNG supported)
2. Verify image size (minimum 400x400px)
3. Ensure alt text is provided for accessibility

### Display Order Issues

1. Use "Display Order" field (lower numbers = first)
2. Check that multiple testimonials don't have same order number
3. Save and republish after order changes

## Best Practices

1. **Quality Over Quantity**: Better to have fewer high-quality testimonials
2. **Regular Updates**: Refresh testimonials periodically
3. **Permission**: Always get client permission before publishing
4. **Diversity**: Include testimonials from various client types
5. **Specificity**: Include concrete results and metrics when possible

This system provides a professional, manageable way to showcase client success stories while maintaining the site's design integrity.
