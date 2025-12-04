# Tax Year Summary Viewer - Design Guidelines

## Design Approach
**System Selected:** Material Design-inspired with modern utility focus  
**Rationale:** Information-dense application requiring clear data hierarchy, excellent form handling, and professional table presentation for parsing and displaying tax records.

**Key Principles:**
- Data clarity and scanability over decoration
- Clear visual separation between input and output zones
- Professional, trustworthy aesthetic for financial data
- Immediate visual feedback for parsing states

---

## Typography

**Font Stack:** Inter or Roboto via Google Fonts CDN

**Hierarchy:**
- Page Title: 32px/36px, font-weight 700
- Section Headers: 20px/24px, font-weight 600  
- Data Labels: 14px/20px, font-weight 500
- Body/Table Text: 15px/22px, font-weight 400
- Helper Text: 13px/18px, font-weight 400

---

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Margin between major sections: mb-8 or mb-12

**Container Structure:**
- Max width: max-w-5xl
- Centered container with appropriate horizontal padding
- Single column layout (no multi-column needed for this utility)

---

## Component Library

### Input Section
**JSON Textarea:**
- Monospace font (font-mono) for JSON visibility
- Minimum height: 200px (h-48 to h-64)
- Border with subtle shadow when focused
- Clear placeholder text: "Paste your Assembly custom field JSON array here..."
- Character count indicator below textarea

**Action Button:**
- Primary button: "Parse & Summarize"
- Full width on mobile, auto width on desktop
- Prominent placement below textarea with mt-6

### Results Display

**Summary Table:**
- Three columns: Tax Year | Status | Last Updated
- Header row with stronger font-weight and subtle background treatment
- Alternating row background for scanability
- Right-align numerical data (tax year)
- Left-align text data (status)
- Tax year column: 20% width
- Status column: 40% width  
- Last Updated column: 40% width
- Generous cell padding (px-6 py-4)
- Clean borders using border-collapse

**Status Indicators:**
- Use subtle badge/pill design for status values
- Inline with text, not overly prominent
- Rounded corners (rounded-full or rounded-lg)
- Compact padding (px-3 py-1)

### State Handling

**Empty State:**
- Centered message when no data parsed yet
- Icon (from Heroicons): DocumentTextIcon
- Helpful text: "Paste your JSON data above and click Parse & Summarize"

**Error State:**
- Alert box with error icon (ExclamationTriangleIcon from Heroicons)
- Red/warning treatment
- Clear error message about malformed JSON
- Positioned above table area

**Loading State:**
- Spinner icon during parsing (if async)
- Disable parse button while processing

---

## Page Structure

**Single-Page Layout:**

1. **Header Section** (pt-8 pb-6)
   - Page title: "Tax Year Summary Viewer"
   - Subtitle: "Parse Assembly custom field data to view tax year summaries"

2. **Input Zone** (mb-12)
   - Section label: "Assembly Custom Field JSON"
   - Textarea component
   - Parse button

3. **Results Zone**
   - Section label: "Summary by Tax Year"
   - Display table or appropriate state (empty/error/data)
   - Small helper text below: Shows most recent status per tax year, sorted by year descending

---

## Icons
**Library:** Heroicons via CDN (outline style)
- DocumentTextIcon for empty state
- ExclamationTriangleIcon for errors
- CheckCircleIcon for successful parse (optional feedback)

---

## Visual Hierarchy

**Emphasis Strategy:**
- Input section has slightly stronger visual weight (border/shadow)
- Results table is clean and minimal, letting data speak
- Tax years in descending order ensure most recent/relevant data appears first
- Status badges provide quick visual scanning without overwhelming

**Spacing Rhythm:**
- Tight spacing within components (gap-2, gap-4)
- Generous breathing room between major sections (mb-8, mb-12)
- Consistent internal padding across all card-like elements (p-6 or p-8)

---

## Responsive Behavior

**Mobile (< 768px):**
- Stack table rows as cards if table becomes cramped
- Full-width textarea and buttons
- Reduce horizontal padding to p-4

**Desktop (>= 768px):**
- Comfortable max-width container
- Table maintains three-column layout
- Parse button returns to natural width (not full-width)

---

## Images
**No images required** - This is a pure utility application focused on data processing and display.