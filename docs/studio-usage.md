# Sanity Studio Usage Guide

## Overview
Sanity Studio (`/studio`) is our content management interface where content editors can create, edit, and manage all website content including job listings, blog posts, team members, and more. This document explains how to use Sanity Studio effectively.

## Accessing Sanity Studio

### Studio URL
- **Production**: `https://yourdomain.com/studio`
- **Development**: `http://localhost:3000/studio`

### Authentication
- Studio access is controlled through Sanity project settings
- Users must have appropriate permissions assigned in Sanity dashboard
- Studio can be configured with additional authentication layers if needed

## Studio Interface

### Main Navigation
The studio provides a structured interface for content management:

#### Structure Tool
- **Documents**: View and manage all content types
- **Media**: Manage images, files, and other assets
- **Settings**: Configure studio preferences and project settings

#### Vision Tool
- **GROQ Query**: Test and explore content with GROQ queries
- **API Explorer**: Understand how content is structured
- **Real-time Updates**: See content changes as they happen

### Content Types Available

#### 1. Job Listings (`jobListing`)
Manage all job postings and career opportunities.

**Fields:**
- **Title**: Job position title
- **Category**: Job category reference
- **Description**: Detailed job description (rich text)
- **Requirements**: Array of required skills/qualifications
- **Location**: Job location (remote, office, etc.)
- **Employment Type**: Full-time, part-time, contract
- **Active Status**: Whether the job is currently accepting applications

**Usage:**
1. Navigate to "Job Listings" in the structure
2. Click "Create" to add a new job
3. Fill in all required fields
4. Use the rich text editor for descriptions
5. Set employment type and location
6. Toggle active status as needed
7. Click "Publish" to make the job live

#### 2. Blog Posts (`post`)
Manage blog content and articles.

**Fields:**
- **Title**: Article title
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Author**: Reference to author document
- **Main Image**: Featured image with hotspot support
- **Categories**: Array of category references
- **Published Date**: Publication timestamp
- **Body**: Article content (rich text with blocks)

**Usage:**
1. Go to "Posts" in the structure
2. Create new post with descriptive title
3. Upload and configure main image
4. Select appropriate categories
5. Write content using the rich text editor
6. Set publication date
7. Publish when ready

#### 3. Team Members (`teamMember`)
Manage team information and profiles.

**Fields:**
- **Name**: Full name of team member
- **Position**: Job title/role
- **Bio**: Professional biography
- **Image**: Profile photo with hotspot
- **LinkedIn**: Professional social media link
- **Order**: Display order for team page

**Usage:**
1. Navigate to "Team Members"
2. Create new team member profile
3. Upload professional photo
4. Write compelling bio
5. Set display order for team page
6. Publish profile

#### 4. Services (`service`)
Manage company services and offerings.

**Fields:**
- **Title**: Service name
- **Description**: Service description
- **Category**: Service category reference
- **Image**: Service illustration or icon
- **Features**: Array of service features

#### 5. Technologies (`technology`)
Manage technology stack and tools.

**Fields:**
- **Name**: Technology name
- **Description**: Technology description
- **Logo**: Technology logo or icon
- **Category**: Technology category

## Content Creation Workflow

### Step 1: Planning
- Determine content type and purpose
- Gather necessary information and assets
- Plan content structure and flow

### Step 2: Creation
1. Navigate to appropriate content type in structure
2. Click "Create" button
3. Fill in required fields first
4. Add optional fields and metadata
5. Upload and configure images/media

### Step 3: Review and Editing
1. Preview content using studio preview
2. Check all links and references
3. Verify image quality and positioning
4. Review content for accuracy and completeness

### Step 4: Publishing
1. Click "Publish" button
2. Verify content appears correctly on website
3. Check for any display issues
4. Monitor for any errors

## Rich Text Editing

### Block Content
Many fields use the block content editor for rich text:

#### Text Blocks
- **Normal**: Regular paragraph text
- **H1-H6**: Heading levels for structure
- **Quote**: Highlighted quote blocks
- **Code**: Code snippets with syntax highlighting

#### Media Blocks
- **Image**: Inline images with caption support
- **Video**: Embedded video content
- **File**: Document attachments

#### Interactive Elements
- **Call to Action**: Button-style elements
- **Custom Components**: Specialized content blocks

### Image Management

#### Uploading Images
1. Click image field in content form
2. Drag and drop or click to select file
3. Wait for upload to complete
4. Configure image settings

#### Image Configuration
- **Hotspot**: Set focal point for responsive cropping
- **Crop**: Adjust image dimensions
- **Alt Text**: Add accessibility descriptions
- **Caption**: Add descriptive text below image

#### Image Optimization
- Studio automatically optimizes images
- Multiple sizes generated for responsive design
- WebP format support for modern browsers
- Lazy loading implemented automatically

## Content Relationships

### References
Content types can reference each other to create relationships:

#### One-to-One References
```typescript
// Job listing references a category
{
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{ type: 'jobCategory' }]
}
```

#### One-to-Many References
```typescript
// Blog post references multiple categories
{
  name: 'categories',
  title: 'Categories',
  type: 'array',
  of: [{ type: 'reference', to: { type: 'category' } }]
}
```

### Managing References
1. **Creating References**: Select from existing content or create new
2. **Updating References**: Change references as needed
3. **Deleting References**: Remove broken or outdated references
4. **Reference Validation**: Studio ensures reference integrity

## Content Validation

### Built-in Validation
Sanity provides automatic validation for:
- Required fields
- Field type matching
- Reference integrity
- Format validation (email, URL, etc.)

### Custom Validation Rules
```typescript
// Example custom validation
{
  name: 'title',
  title: 'Title',
  type: 'string',
  validation: Rule => Rule
    .required()
    .min(10)
    .max(100)
    .warning()
}
```

### Validation Messages
- Clear error messages for validation failures
- Warnings for potential issues
- Suggestions for improvement

## Content Publishing

### Draft vs Published
- **Drafts**: Work-in-progress content (not visible on website)
- **Published**: Live content visible to website visitors
- **Unpublish**: Remove content from website while keeping in studio

### Publishing Workflow
1. **Save Draft**: Save work without publishing
2. **Preview**: Check how content will appear
3. **Publish**: Make content live on website
4. **Unpublish**: Remove from website if needed

### Bulk Operations
- Select multiple content items
- Bulk publish/unpublish
- Bulk delete (with confirmation)
- Bulk move to different categories

## Content Organization

### Structure and Ordering
- **Manual Ordering**: Drag and drop to reorder content
- **Automatic Ordering**: Sort by date, title, or custom field
- **Grouping**: Organize content by categories or tags

### Categories and Tags
- **Categories**: Main organizational structure
- **Tags**: Flexible labeling system
- **Hierarchical Organization**: Nested category structures

### Search and Filtering
- **Global Search**: Find content across all types
- **Type Filtering**: Filter by content type
- **Status Filtering**: Show published, draft, or all content
- **Date Filtering**: Filter by creation or modification date

## Media Management

### Asset Library
- **Images**: Photos, icons, and graphics
- **Documents**: PDFs, Word docs, and other files
- **Videos**: Embedded video content
- **Audio**: Podcasts and audio content

### Asset Organization
- **Folders**: Organize assets by type or project
- **Tags**: Label assets for easy finding
- **Metadata**: Add descriptions and usage information
- **Usage Tracking**: See where assets are used

### Asset Optimization
- **Automatic Resizing**: Multiple sizes generated
- **Format Conversion**: WebP and other modern formats
- **Compression**: Optimized file sizes
- **CDN Delivery**: Fast global delivery

## Collaboration Features

### Real-time Editing
- **Live Updates**: See changes as they happen
- **Conflict Resolution**: Handle simultaneous edits
- **Change History**: Track all modifications
- **User Presence**: See who's editing what

### User Management
- **Role-based Access**: Different permission levels
- **Content Ownership**: Track who created what
- **Approval Workflows**: Multi-step publishing process
- **Activity Logs**: Monitor user actions

### Communication
- **Comments**: Add notes to content
- **Mentions**: Notify team members
- **Notifications**: Stay updated on changes
- **Shared Workspaces**: Collaborate on projects

## Advanced Features

### Custom Input Components
- **React Components**: Custom field types
- **Validation Logic**: Advanced validation rules
- **Conditional Fields**: Show/hide fields based on conditions
- **Custom Widgets**: Specialized input interfaces

### API Integration
- **Webhooks**: Trigger external actions
- **Custom Endpoints**: Extend API functionality
- **Third-party Services**: Integrate with external tools
- **Data Import/Export**: Bulk data operations

### Performance Optimization
- **CDN Caching**: Fast content delivery
- **Image Optimization**: Automatic image processing
- **Query Optimization**: Efficient data retrieval
- **Real-time Updates**: Instant content synchronization

## Troubleshooting

### Common Issues

#### Content Not Publishing
1. Check for validation errors
2. Verify all required fields are filled
3. Check for broken references
4. Verify user permissions

#### Images Not Loading
1. Check image upload completion
2. Verify image format support
3. Check file size limits
4. Verify CDN configuration

#### Performance Issues
1. Optimize image sizes
2. Reduce content complexity
3. Use proper pagination
4. Implement caching strategies

### Getting Help

#### Studio Documentation
- Built-in help system
- Field descriptions and examples
- Validation rule explanations
- Best practice suggestions

#### Support Resources
- Sanity documentation
- Community forums
- Support tickets
- Video tutorials

## Best Practices

### Content Creation
1. **Plan Ahead**: Structure content before creation
2. **Use Templates**: Create reusable content patterns
3. **Optimize Images**: Use appropriate sizes and formats
4. **Write Clear Content**: Use descriptive titles and descriptions

### Organization
1. **Consistent Naming**: Use clear, descriptive names
2. **Proper Categorization**: Organize content logically
3. **Regular Cleanup**: Remove outdated content
4. **Version Control**: Keep track of content changes

### Collaboration
1. **Clear Communication**: Use comments and notes
2. **Role Definition**: Understand user permissions
3. **Workflow Consistency**: Follow established processes
4. **Quality Assurance**: Review content before publishing

### Performance
1. **Optimize Images**: Use appropriate sizes
2. **Efficient Queries**: Use specific field selection
3. **Content Caching**: Implement proper caching
4. **Regular Maintenance**: Clean up unused assets

## Future Enhancements

### Planned Features
- **Advanced Analytics**: Content performance metrics
- **AI-powered Suggestions**: Content optimization recommendations
- **Enhanced Workflows**: Multi-step approval processes
- **Mobile Studio**: Studio access from mobile devices

### Customization Options
- **Custom Themes**: Personalized studio appearance
- **Advanced Permissions**: Granular access control
- **Integration APIs**: Extended third-party integrations
- **Custom Workflows**: Tailored publishing processes
