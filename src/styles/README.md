# Hoogly Design System

A comprehensive, scalable CSS design system built with modern CSS custom properties (CSS variables) for consistent styling across the Hoogly site.

## Structure

### 🎨 CSS Custom Properties (Variables)
- **Colors**: Primary, secondary, accent, and neutral color palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale from 4px to 128px
- **Border Radius**: Consistent border radius values
- **Shadows**: Elevation system for depth
- **Transitions**: Consistent animation timing

### 🔤 Typography System
- Responsive heading hierarchy (h1-h6)
- Consistent font sizing with rem units
- Proper line height and font weight scales
- Mobile-responsive typography

### 🧩 Layout Utilities
- Container system with max-width and auto-centering
- Flexbox utilities for layout
- Text alignment classes
- Spacing utilities for margins and padding

### 🎯 Component Styles
- `.site-header` and `.site-title` for page headers
- Button components with hover states
- Ready for expansion with new components

### 📱 Responsive Design
- Mobile-first approach
- Breakpoint-based responsive typography
- Consistent spacing adjustments across devices

## Usage Examples

### Typography
```html
<h1 class="site-title">Page Title</h1>
<h2>Section Heading</h2>
<p>Body text content</p>
```

### Layout
```html
<div class="container">
  <div class="flex items-center justify-center">
    <h1 class="text-center">Centered Content</h1>
  </div>
</div>
```

### Spacing
```html
<div class="mt-8 mb-4 px-4">Content with spacing</div>
```

### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
```

## Benefits

1. **Consistency**: All styling uses the same design tokens
2. **Maintainability**: Changes to variables update across the entire site
3. **Scalability**: Easy to add new components following the same patterns
4. **Performance**: Single CSS file with minimal redundancy
5. **Accessibility**: Proper contrast ratios and responsive design built-in

## Extending the System

To add new components or utilities:

1. Use existing CSS custom properties when possible
2. Follow the established naming conventions
3. Add new variables to the `:root` selector if needed
4. Maintain responsive design principles
5. Document new components in this README 