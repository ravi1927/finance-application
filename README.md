# Financial App Mobile Demo — V4

This version focuses on Manager, Collection Boy and Customer mobile roles. Admin remains a separate React web application.

## Collection proof rules

- **Cash:** customer confirmation/signature photo is mandatory before the boy can confirm the collection.
- **UPI:** UTR / UPI transaction ID **and** payment screenshot/photo are mandatory.
- **Bank:** bank reference / UTR **and** transaction proof photo are mandatory.
- Every confirmed collection creates one receipt and updates the shared customer outstanding balance.
- The customer login only sees its own confirmed payment slips.
- Each slip contains receipt ID, customer, amount, method, reference/UTR where applicable, date/time, collector/login, area, principal/interest and proof type.

## Demo login

Password: `123456`

- Manager: `M001`
- Boys: `B001`, `B002`, ...
- Customers: `C001`, `C002`, ...

## Run

```bash
npm install
npx expo-doctor
npx expo start
```

Expo SDK 57 is used. The project already includes `expo-image-picker` for company logo selection and payment proof capture.

## Production note

This demo uses local React state. A production deployment must move customer balances and proof files to a backend/database and enforce atomic transactions, server-side outstanding validation, authorization, idempotency, immutable audit history and secure proof storage. A photo/screenshot is supporting evidence; business policy should define whether manager verification is required before final settlement.


## Manager V5 additions
- Create areas from Manager login.
- Create collection-boy profiles with mobile numbers.
- Assign, move and unassign boys from areas.
- Enter any area and record a collection as Manager; the receipt records M001 as the source login.
- Manager Leave Management: create, approve and reject boy leave records.
- Shared customer ledger remains the source of the demo balance across boys.
- Production note: area, boy, leave and collection synchronization must be moved to the backend/database before commercial use.
