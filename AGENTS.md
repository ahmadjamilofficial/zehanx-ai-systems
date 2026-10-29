<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# SEO Configuration

## Meta Tags

### Root Meta Tags (src/routes/__root.tsx)
- Title: "ZehanX Tech — Full-Stack ML Solutions | Data Infrastructure, Model Development & Applied AI"
- Description: Enterprise ML solutions messaging
- Theme color: #000000
- Robots: index, follow with advanced directives
- Open Graph tags with image dimensions and alt text
- Twitter Card tags with image and site handle

### Page-Specific Meta Tags (src/routes/index.tsx)
- Canonical URL: https://zehanxtech.com
- Enhanced structured data (Organization, BreadcrumbList, FAQPage)
- Service catalog in schema.org format

## Structured Data

### Organization Schema
- Name: ZehanX Tech (alternate: ZehanX Technologies)
- Legal name and contact information
- Geographic service area (Karachi, Pakistan with 1000km radius)
- Service catalog with detailed descriptions
- Contact point for sales inquiries

### BreadcrumbList Schema
- Simple breadcrumb for homepage

### FAQPage Schema
- Three core questions about services, enterprise focus, and industries

## Technical SEO Files

### robots.txt (public/robots.txt)
- Allows all user-agents
- Disallows API, admin, and internal routes
- Includes crawl-delay for rate limiting
- References sitemap.xml

### sitemap.xml (public/sitemap.xml)
- Homepage entry with priority 1.0
- Weekly changefreq for regular updates
- Lastmod date for freshness

### .htaccess (public/.htaccess)
- Gzip compression for text-based assets
- Long cache headers for static assets (1 year)
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- HTTPS enforcement
- Canonical URL handling (www to non-www)

## Performance Optimizations

### Resource Hints
- Preconnect to Google Fonts
- DNS prefetch for custom font CDN
- Font loading with display:swap strategy

### Image SEO
- Descriptive alt text for all images
- Hero video with aria-label
- Project images with detailed descriptions
- About section image with ML-specific description

### Semantic HTML
- ARIA-labelledby for all section headings
- Proper heading hierarchy (h1, h2, h3)
- Semantic sections for better content structure
- Accessible media elements

## Content Strategy

### Positioning
- Full-stack ML solutions provider (not just chatbots)
- Enterprise-focused with production deployments
- Scale AI-inspired 4-pillar structure:
  1. ML Data Solutions
  2. Model Development & Evaluation
  3. Applied AI Systems
  4. ZehanX ML Platform

### Keywords
- Primary: machine learning solutions, ML data infrastructure, model development
- Secondary: model evaluation, applied AI systems, enterprise ML consulting
- Long-tail: dataset engineering, data annotation, synthetic data generation

### Target Audience
- Enterprises needing production ML systems
- AI startups requiring ML engineering capacity
- Businesses with document-heavy workflows
- Organizations across 8 major industries

## Social Media

### Open Graph
- Site name, title, description
- Image URL (1200x630) with alt text
- Website type
- Locale: en_US

### Twitter Cards
- Summary large image card
- Image with alt text
- Site handle: @zehanxtech

## Next Steps for SEO

1. **Create og-image.jpg** (1200x630px) for social sharing
2. **Set up Google Search Console** with sitemap submission
3. **Verify domain ownership** for structured data testing
4. **Monitor Core Web Vitals** for performance
5. **Add Schema markup validation** in Google Rich Results Test
6. **Set up analytics** (Google Analytics 4 or alternative)
7. **Claim social media handles** (@zehanxtech)
8. **Submit to relevant directories** (Clutch, GoodFirms, etc.)
9. **Build backlinks** through technical content and case studies
10. **Monitor rankings** for target keywords

