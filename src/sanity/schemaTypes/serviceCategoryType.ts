import { FolderIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceCategoryType = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Computer Desktop', value: 'ComputerDesktopIcon' },
          { title: 'Cloud', value: 'CloudIcon' },
          { title: 'Shield Check', value: 'ShieldCheckIcon' },
          { title: 'Globe Alt', value: 'GlobeAltIcon' },
          { title: 'Device Phone Mobile', value: 'DevicePhoneMobileIcon' },
          { title: 'Circle Stack', value: 'CircleStackIcon' },
          { title: 'Code Bracket', value: 'CodeBracketIcon' },
          { title: 'Chart Bar', value: 'ChartBarIcon' },
          { title: 'Cpu Chip', value: 'CpuChipIcon' },
          { title: 'Arrow Path', value: 'ArrowPathIcon' },
          { title: 'Light Bulb', value: 'LightBulbIcon' },
          { title: 'Building Office', value: 'BuildingOfficeIcon' },
          { title: 'Rocket Launch', value: 'RocketLaunchIcon' },
          {
            title: 'Clipboard Document List',
            value: 'ClipboardDocumentListIcon',
          },
          { title: 'Users', value: 'UsersIcon' },
          { title: 'Device Tablet', value: 'DeviceTabletIcon' },
          { title: 'Map', value: 'MapIcon' },
          { title: 'Bolt', value: 'BoltIcon' },
          { title: 'Document Check', value: 'DocumentCheckIcon' },
          { title: 'Eye', value: 'EyeIcon' },
        ],
      },
      description: 'Select a Heroicon that represents this service category',
      initialValue: 'ComputerDesktopIcon',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'bg-blue-100 text-blue-800' },
          { title: 'Green', value: 'bg-green-100 text-green-800' },
          { title: 'Yellow', value: 'bg-yellow-100 text-yellow-800' },
          { title: 'Red', value: 'bg-red-100 text-red-800' },
          { title: 'Purple', value: 'bg-purple-100 text-purple-800' },
          { title: 'Gray', value: 'bg-gray-100 text-gray-800' },
        ],
      },
      initialValue: 'bg-blue-100 text-blue-800',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
