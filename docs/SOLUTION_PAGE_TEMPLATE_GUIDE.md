# Universal Solution Page Template Guide

## Overview

The Universal Solution Page Template is a reusable Astro component designed to create consistent, high-converting landing pages for different Hoogly solutions. It follows the "Empowerment is key" theme and uses the same design language as the homepage.

## Template Structure

The template includes 7 main sections:

1. **Hero Section** - Problem/solution positioning with AI chat demo
2. **Core Pain Section** - Validates the problem and creates urgency
3. **Solution Section** - Introduces Hoogly's Listen, Understand, Act framework
4. **Proof Section** - Visual demonstration of the product
5. **CTA Section** - Low-friction call-to-action for PLG conversion
6. **Supporting Pillars** - Key features that build trust
7. **FAQ Section** - Addresses common objections and questions

## How to Use

### 1. Create a New Solution Page

Create a new `.astro` file in the `src/pages/solutions/` directory:

```astro
---
import SolutionPageTemplate from "../../components/SolutionPageTemplate.astro";
---

<SolutionPageTemplate
  title="Your Page Title | Hoogly.ai"
  description="Your meta description for SEO"
  primaryKeyword="your target keyword"
  slug="solutions/your-page-slug"
  heroHeadline="Your compelling headline"
  heroSubheadline="Your subheadline that validates pain and introduces solution"
  // ... all other props
/>
```

### 2. Required Props

All props are required. Here's the complete list:

#### SEO & Page Data
- `title` - Page title for SEO
- `description` - Meta description
- `primaryKeyword` - Target keyword for SEO
- `slug` - URL slug

#### Hero Section
- `heroHeadline` - Main headline (follows "[Benefit], Not [Problem]. The New Standard for [Solution]")
- `heroSubheadline` - Single sentence validating pain and introducing philosophy
- `heroImage` - Hero image (optional, defaults to dashboard image)

#### Core Pain Section
- `painHeadline` - Question or statement about the problem
- `painBody` - 2-3 sentences explaining the "downward spiral"

#### Solution Section
- `solutionHeadline` - "The Shift from [Old Way] to [New Way]"
- `solutionBody` - Brief introduction to the framework
- `listenText` - Description of the Listen phase
- `understandText` - Description of the Understand phase
- `actText` - Description of the Act phase

#### Proof Section
- `proofHeadline` - "See It In Action"
- `proofImage` - Image for proof section (optional, defaults to Section 1)

#### CTA Section
- `ctaHeadline` - "Ready to [Action]?"
- `ctaSubtext` - Supporting text for the CTA
- `ctaButtonText` - Button text (e.g., "Start Listening for Free")
- `ctaButtonLink` - Link to get-started page with tracking

#### Supporting Pillars
- `pillarsHeadline` - "Everything You Need to [Outcome]"
- `pillarsBody` - Brief description of the pillars
- `pillar1Title` - First pillar title
- `pillar1Description` - First pillar description
- `pillar2Title` - Second pillar title
- `pillar2Description` - Second pillar description
- `pillar3Title` - Third pillar title
- `pillar3Description` - Third pillar description

#### FAQ Section
- `faqHeadline` - "Frequently Asked Questions"
- `faq1Question` - First FAQ question
- `faq1Answer` - First FAQ answer
- `faq2Question` - Second FAQ question
- `faq2Answer` - Second FAQ answer
- `faq3Question` - Third FAQ question
- `faq3Answer` - Third FAQ answer

## Content Guidelines

### Headlines
- Follow the formula: "[Benefit], Not [Problem]. The New Standard for [Solution]"
- Examples:
  - "More Listening, Less 'Meh.' The New Standard for Employee Engagement."
  - "Real Insights, Not Just Data. The New Standard for People Analytics."

### Subheadlines
- Validate the pain point
- Introduce Hoogly's unique approach
- Keep to one sentence
- Use italics for emphasis

### Pain Section
- Frame as a question or bold statement
- Explain the "downward spiral" specific to the topic
- Make it relatable and urgent

### Solution Section
- Use "The Shift from [Old Way] to [New Way]" format
- Tailor the Listen, Understand, Act framework to the specific topic
- Keep language empowering and action-oriented

### CTA Section
- Use "Ready to [Action]?" format
- Make the ask specific and low-commitment
- Include microcopy: "No credit card required. See your first insights in minutes."

### Supporting Pillars
- Focus on empowerment and control
- Use action-oriented language
- Highlight unique value propositions

### FAQ Section
- Address the most common objections
- Keep answers concise but comprehensive
- Use empowering language that positions the reader as capable

## Examples

See the following example pages:
- `/solutions/employee-engagement` - Employee engagement focus
- `/solutions/people-analytics` - People analytics focus  
- `/solutions/pulse-survey-alternative` - Pulse survey alternative focus

## Design Features

- Reuses homepage design language and components
- Responsive design for all screen sizes
- Smooth scroll animations and interactions
- Interactive FAQ accordion
- AI chat demo integration
- Consistent typography and spacing

## SEO Considerations

- Each page targets a specific primary keyword
- Meta descriptions are optimized for click-through
- Headlines include target keywords naturally
- Internal linking opportunities to other solution pages
- Clear URL structure with `/solutions/` prefix

## Customization

The template is designed to be flexible while maintaining consistency. You can:

- Customize images for different sections
- Adjust the CTA button text and links
- Modify the supporting pillars based on the solution
- Add or remove FAQ items (requires template modification)
- Adjust the Listen, Understand, Act framework descriptions

## Maintenance

- Keep content updated with latest product features
- Monitor conversion rates and A/B test different headlines
- Update FAQ based on customer questions
- Refresh proof images with latest product screenshots
- Ensure all links are working and tracking properly
