MAGNOLIAS PAGEANT SIGNUP / LUXURY UPDATE — SINGLE DEPLOYMENT ZIP

Mac Terminal:
  cd ~/Downloads/magnolias-formal-wear
  # Press q first if your terminal currently says (END).
  git pull --rebase origin main
  unzip -o ~/Downloads/Magnolias_Pageants_Complete_Deploy.zip -d .
  python3 deploy.py
  git add -A
  git commit -m "Launch seven Magnolias pageants and luxury styling"
  git push origin main

WHAT THIS DOES:
  - Replaces events.html with the 7 announced pageants and registration form
  - Adds pageant-registration.js and CSS, plus existing luxury stylesheet
  - Does NOT touch any JPG/PNG/image or other photo assets
  - Keeps existing sitewide HTML and navigation except changing events.html
  - Stores submitted parent/guardian registrations in a private Cloudflare D1 database
  - December 2026 has posted pricing; 2027 entries are interest only
  - Submitting does NOT process payments or confirm entry

OWNER VERIFICATION:
  - Confirm processing of test submission using Cloudflare D1 -> magnolias-pageant-registrations
  - Confirm all prices, event names, rules, and deadline with Shannon
  - Connect a real card processor for checkout (not integrated yet)
  - Supply verified Cash App/Venmo handles and check-payee/mailing details
  - Set up staff notifications and administrative workflow before widespread launch
  - Privacy notice/retention rules should be reviewed before promotion
