# Figma Design Prompt - FSU Capstone Frontend Wireframes

## Project Overview
Create an interactive wireframe/prototype for "Fullstack University" - a web application for browsing academic departments and faculty, with an admin panel for managing content.

**Target Audience:** University visitors, potential students, faculty, administrators
**Platform:** Web (responsive design: mobile 375px, tablet 768px, desktop 1440px)
**Color Scheme:** Professional university colors (suggest navy blue, light gray, white, accent color like teal or orange)
**Typography:** Clean sans-serif (Inter, Roboto, or similar)

---

## Navigation Header (All Pages)

Create a persistent navigation bar at the top of every page with:
- Logo/text "FSU" on the left
- Centered space for page title
- Navigation links on the right: [Departments] [Faculty] [Admin]
- Sticky to top, subtle shadow

---

## Page 1: Homepage - Department List

**Layout:** Grid of department cards
**Responsive:** 
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Components:**
- Hero section at top with title "Fullstack University" and subtitle "Department & Faculty Directory"
- Below hero: Grid of department cards

**Department Card (repeating):**
- Banner image placeholder (16:9 ratio, 300x169px)
- Department name (heading)
- Short description (2-3 lines of text)
- Contact email
- Contact phone
- Card has hover effect (slight shadow increase, cursor pointer)
- Entire card is clickable

**Card Content:**
1. Computer Science
2. Business Administration
3. Fine Arts
4. Biology
5. History

**Interactions:**
- Clicking a card navigates to that department's detail page
- Hover state shows subtle lift/shadow effect

---

## Page 2: Department Detail

**Layout:** Vertical stack

**Components (top to bottom):**
1. Back button/arrow with text "< Back to Departments"
2. Large banner image (1200x400px placeholder)
3. Department info section:
   - Department name (large heading)
   - Email and phone (secondary text)
4. Department description (body text, 3-4 paragraphs)
5. Faculty section heading "Faculty Members (count)"
6. Faculty grid (same as homepage: responsive 3-2-1 columns)

**Faculty Card (in grid):**
- Profile image placeholder (circular, 120x120px)
- Faculty name
- Email
- Short bio (1-2 lines)
- Card is clickable

**Interactions:**
- Back button navigates to department list
- Clicking a faculty card navigates to faculty detail page

---

## Page 3: Faculty List

**Layout:** Vertical stack with search

**Components (top to bottom):**
1. Page title "Faculty Directory"
2. Search/filter box with placeholder "Search by name or department"
3. Faculty list (vertical cards)

**Faculty List Item (repeating, full-width card):**
- Left side: Profile image placeholder (circular, 80x80px)
- Right side: 
  - Faculty name (heading)
  - Email
  - Department name
  - Short bio excerpt (1-2 lines, truncated)
- Card has divider line between items
- Entire card is clickable

**Interactions:**
- Search box filters list in real-time
- Clicking a faculty card navigates to faculty detail page
- List is scrollable

---

## Page 4: Faculty Detail

**Layout:** Vertical stack, centered content

**Components (top to bottom):**
1. Back button "< Back to Faculty List"
2. Large profile image placeholder (circular, 250x250px)
3. Faculty info section:
   - Name (large heading)
   - Department name (secondary, as a link/button)
   - Email
4. Divider line
5. "About" section heading
6. Bio text (3-4 paragraphs)
7. Button/link "View Department →" (clickable, styled differently)

**Interactions:**
- Back button navigates to faculty list
- Department name/link navigates to department detail
- Page is centered with max-width container (600px)

---

## Page 5: Admin Dashboard - Manage Departments

**Layout:** Two-column section layout with tabs/navigation

**Top Navigation:**
- Two buttons/tabs: [Manage Departments] [Manage Faculty]
- Manage Departments is active/highlighted

**Components (under Manage Departments tab):**
1. Page title "Admin Panel"
2. "Add New Department" button (prominent, green or accent color)
3. List of departments below

**Department Item (repeating card):**
- Department name (heading)
- Contact email and phone
- Right side: Two buttons [Edit] [Delete] (gray background)
- Card has border and padding
- Slight hover effect

**Interactions:**
- Clicking [Add New Department] navigates to create form
- Clicking [Edit] navigates to edit form with pre-filled data
- Clicking [Delete] shows confirmation modal/dialog
- Confirming delete removes card from list and shows success message

---

## Page 6: Admin Panel - Create/Edit Department Form

**Layout:** Centered form on page

**Components:**
1. Page title "Add New Department" or "Edit Department"
2. Form container with white background

**Form Fields (vertical stack):**
1. "Department Name *" label
   - Text input field
   - Required indicator (*)
2. "Description" label
   - Textarea field (4 rows)
3. "Contact Email" label
   - Email input field
4. "Contact Phone" label
   - Text input field
5. "Banner Image URL" label
   - Text input field
   - Helper text: "Enter image URL (JPG/PNG)"
6. Button group at bottom:
   - [Cancel] button (gray)
   - [Save Department] button (green/accent, prominent)

**Validation:**
- Required fields show red border if empty on submit attempt
- Error message appears below field if validation fails

**Interactions:**
- Cancel button clears form and navigates back to admin dashboard
- Save button validates, submits to API, shows success message, redirects to admin dashboard
- Form is max-width 500px, centered

---

## Page 7: Admin Dashboard - Manage Faculty

**Layout:** Two-column section layout with tabs/navigation

**Top Navigation:**
- Two buttons/tabs: [Manage Departments] [Manage Faculty]
- Manage Faculty is active/highlighted

**Components (under Manage Faculty tab):**
1. Page title "Admin Panel"
2. "Add New Faculty Member" button (prominent)
3. List of faculty below

**Faculty Item (repeating card):**
- Faculty name (heading)
- Email
- Department name
- Right side: Two buttons [Edit] [Delete]
- Card has border and padding
- Slight hover effect

**Interactions:**
- Clicking [Add New Faculty Member] navigates to create form
- Clicking [Edit] navigates to edit form with pre-filled data
- Clicking [Delete] shows confirmation modal
- Confirming delete removes card and shows success message

---

## Page 8: Admin Panel - Create/Edit Faculty Form

**Layout:** Centered form on page

**Components:**
1. Page title "Add New Faculty Member" or "Edit Faculty Member"
2. Form container with white background

**Form Fields (vertical stack):**
1. "Name *" label
   - Text input field
2. "Email *" label
   - Email input field
3. "Department *" label
   - Dropdown/select field
   - Options: Computer Science, Business Administration, Fine Arts, Biology, History
4. "Bio" label
   - Textarea field (4 rows)
5. "Profile Image URL" label
   - Text input field
6. Button group at bottom:
   - [Cancel] button (gray)
   - [Save Faculty Member] button (green/accent)

**Validation:**
- Required fields (*) show red border if empty
- Error message appears below field on validation failure
- Email must be valid format and unique

**Interactions:**
- Cancel button clears form and navigates back to admin dashboard
- Save button validates, submits to API, shows success message, redirects to admin dashboard
- Form is max-width 500px, centered

---

## Confirmation Modal / Dialog

Used for delete operations across all pages.

**Components:**
1. Title "Confirm Deletion"
2. Message: "Are you sure you want to delete [item name]? This action cannot be undone."
3. Two buttons:
   - [Cancel] (gray)
   - [Confirm Delete] (red, destructive action)

**Interactions:**
- Clicking Cancel closes modal without action
- Clicking Confirm Delete calls API to delete item, shows success toast message, closes modal, updates page

---

## Toast Messages (Notifications)

Use for success/error feedback.

**Types:**
1. Success (green): "Department created successfully" / "Department updated" / "Department deleted" / "Faculty added" / etc.
2. Error (red): "Failed to save. Please try again." / "Department name already exists." / "Email already in use." / etc.
3. Info (blue): "Loading..." / "Processing..."

**Position:** Top-right corner, auto-dismiss after 4 seconds

---

## Color Palette Suggestions

- **Primary:** #1e40af (Navy Blue)
- **Accent:** #0891b2 (Teal) or #ea580c (Orange)
- **Background:** #ffffff (White)
- **Surface:** #f8fafc (Light Gray)
- **Text Primary:** #1e293b (Dark Gray)
- **Text Secondary:** #64748b (Medium Gray)
- **Border:** #e2e8f0 (Light Border)
- **Success:** #22c55e (Green)
- **Danger:** #ef4444 (Red)
- **Error:** #ef4444 (Red)

---

## Responsive Design Breakpoints

- **Mobile:** 375px - 767px
  - Single column layouts
  - Stacked buttons
  - Larger touch targets (48px minimum)
  
- **Tablet:** 768px - 1023px
  - 2-column grids
  - Medium spacing
  
- **Desktop:** 1024px+
  - 3-column grids
  - Full layouts
  - Max-width containers (1200px)

---

## Interactive Elements

**Buttons:**
- Primary buttons: Accent color background, white text
- Secondary buttons: Gray background, dark text
- Hover: Slight background color shift, pointer cursor
- Active: Darker background color
- Disabled: Gray background, reduced opacity

**Links:**
- Color: Accent color
- Hover: Underline, darker shade
- Visited: Slightly darker shade

**Inputs:**
- Border on focus: 2px solid accent color
- Border otherwise: 1px solid light border color
- Padding: 10px 12px
- Border radius: 4px

**Cards:**
- Border radius: 8px
- Box shadow on hover: 0 4px 12px rgba(0,0,0,0.1)
- Padding: 16px - 20px
- Transition: smooth 200ms

---

## Design System Notes

- Use consistent spacing scale (4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px)
- Border radius: 4px for inputs/buttons, 8px for cards, 50% for avatars
- Font sizes: H1=32px, H2=24px, H3=18px, body=14px, small=12px
- Line height: 1.5 for body text, 1.2 for headings
- Images: Use placeholder.com for all image placeholders
- Keep mobile-first approach: design mobile first, then expand to larger screens

---

## Design Assets Needed

- Create a component library with:
  - Button component (primary, secondary, danger)
  - Input component (text, email, textarea)
  - Card component
  - Modal/Dialog component
  - Toast notification component
  - Navigation bar component
  - Avatar/Image placeholder component

---

## File Structure in Figma

```
FSU Capstone
├── Wireframes
│   ├── 01-Homepage (Department List)
│   ├── 02-Department Detail
│   ├── 03-Faculty List
│   ├── 04-Faculty Detail
│   ├── 05-Admin Dashboard (Departments)
│   ├── 06-Department Form (Create/Edit)
│   ├── 07-Admin Dashboard (Faculty)
│   └── 08-Faculty Form (Create/Edit)
├── Components
│   ├── Navigation Bar
│   ├── Department Card
│   ├── Faculty Card
│   ├── Button
│   ├── Input
│   ├── Form
│   ├── Modal
│   └── Toast
├── Color Palette
├── Typography
└── Interactions & Flows
```