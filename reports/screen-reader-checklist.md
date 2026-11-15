# Screen Reader Test Checklist

Use NVDA (Windows) or VoiceOver (macOS/iOS) to test **dist/index.html** served locally.  
Open the page, then follow each step below. Record PASS / FAIL and any notes.

## How to start
- **NVDA (Windows):** Press Insert+F5 to open the elements list. Press Insert+F7 for landmarks.
- **VoiceOver (Mac):** Press VO+U to open the rotor; use left/right arrows to switch between Landmarks, Headings, Links, Form Controls.

---

## 1. Landmarks
Open the landmarks list (NVDA: Insert+F7 > Landmarks; VoiceOver: Rotor > Landmarks).

| Expected landmark        | Announced? (Y/N) | Notes |
|--------------------------|-------------------|-------|
| banner (header)          |                   |       |
| navigation "Main"        |                   |       |
| main                     |                   |       |
| contentinfo (footer)     |                   |       |
| region "Why people love us" |                |       |
| region "Our story"       |                   |       |
| region "Our menu"        |                   |       |
| region "What guests say" |                   |       |
| region "Book a table"    |                   |       |

**Result:** PASS / FAIL

---

## 2. Headings list
Open the headings list (NVDA: Insert+F7 > Headings; VoiceOver: Rotor > Headings).

| Expected heading                          | Level | Announced? (Y/N) |
|-------------------------------------------|-------|-------------------|
| Fresh coffee, made with care              | h1    |                   |
| Why people love us                        | h2    |                   |
| Locally sourced                           | h3    |                   |
| Baked every morning                       | h3    |                   |
| Made for everyone                         | h3    |                   |
| Our story                                 | h2    |                   |
| Our menu                                  | h2    |                   |
| Hot drinks                                | h3    |                   |
| Bakery                                    | h3    |                   |
| Light meals                               | h3    |                   |
| Teas and cold drinks                      | h3    |                   |
| What guests say                           | h2    |                   |
| Book a table                              | h2    |                   |
| Green Leaf Cafe (footer)                  | h2    |                   |
| Opening hours                             | h2    |                   |
| Quick links                               | h2    |                   |

**Result:** PASS / FAIL

---

## 3. Form labels
Tab into the booking form or use the form controls list.

| Form control      | Expected accessible name           | Announced correctly? (Y/N) |
|--------------------|------------------------------------|-----------------------------|
| Name text field    | "Name *"                           |                             |
| Email text field   | "Email *" + hint about booking     |                             |
| Date field         | "Date *"                           |                             |
| Guests dropdown    | "Guests *"                         |                             |
| Special requests   | "Special requests"                 |                             |
| Submit button      | "Send request"                     |                             |

**Result:** PASS / FAIL

---

## 4. Image alt text
Browse through the page or use the images list.

| Image                  | Expected alt text                                              | Read correctly? (Y/N) |
|------------------------|----------------------------------------------------------------|-----------------------|
| Hero image             | "A steaming cup of coffee on a saucer, in warm green light"    |                       |
| Coffee card            | "A white cup of cappuccino with a brown crema top"             |                       |
| Bakery card            | "A plate of five golden croissants"                            |                       |
| Salad card             | "A white bowl of colourful garden salad"                       |                       |
| Tea card               | "A cup of golden herbal tea on a saucer"                       |                       |
| Decorative SVG icons   | Should be SKIPPED (not announced)                              |                       |

**Result:** PASS / FAIL

---

## 5. Menu button state (mobile view)
Resize the browser to < 768px width so the mobile menu button appears.

| Action                              | Expected behaviour                                  | Correct? (Y/N) |
|--------------------------------------|-----------------------------------------------------|-----------------|
| Focus on "Menu" button               | Announced as "Menu, button, collapsed"               |                 |
| Press Enter/Space                    | Menu opens; announced as "expanded"                  |                 |
| Press Escape                         | Menu closes; focus returns to button; "collapsed"    |                 |

**Result:** PASS / FAIL

---

## 6. Form confirmation (live region)
Fill in the booking form and submit.

| Action                              | Expected behaviour                                                    | Correct? (Y/N) |
|--------------------------------------|-----------------------------------------------------------------------|-----------------|
| Fill Name, Email, Date, Guests       | Fields accept input normally                                          |                 |
| Press "Send request"                 | Confirmation message is announced automatically without page reload   |                 |
| Confirmation text                    | "Thank you, [name]. We have received your request..."                 |                 |

**Result:** PASS / FAIL

---

## 7. Skip link
Press Tab as the first action after the page loads.

| Action                              | Expected behaviour                           | Correct? (Y/N) |
|--------------------------------------|-----------------------------------------------|-----------------|
| First Tab press                      | "Skip to main content" link is announced      |                 |
| Press Enter on skip link             | Focus moves to the main content area          |                 |

**Result:** PASS / FAIL

---

## Summary

| Test area          | Result (PASS/FAIL) | Notes |
|--------------------|---------------------|-------|
| Landmarks          |                     |       |
| Headings           |                     |       |
| Form labels        |                     |       |
| Image alt text     |                     |       |
| Menu button state  |                     |       |
| Form confirmation  |                     |       |
| Skip link          |                     |       |

**Tested by:** ________________  
**Screen reader + version:** ________________  
**Browser + version:** ________________  
**Date:** ________________
