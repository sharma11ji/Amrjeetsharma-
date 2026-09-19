# BookFlow — WhatsApp Booking MVP

A mobile-friendly frontend MVP for a WhatsApp-first appointment booking product for local businesses.

## Included now

- Owner dashboard
- Today's bookings and upcoming appointments
- Availability view
- Customer WhatsApp conversation simulator
- Book → date → time → confirmation flow
- Booking records stored in frontend demo state
- Reschedule/cancel flow placeholders
- Reminder architecture notes
- Responsive mobile UI

## Production architecture

Customer WhatsApp → Meta Cloud API → Backend webhook → Booking service → Supabase/Postgres → Google Calendar

The frontend intentionally contains no WhatsApp access token, database secret, or API credential.

## Run

Node.js is required.

```bash
npm install
npm run dev
```

Then open the Vite URL.

## Next production work

1. Create Meta WhatsApp Business app and webhook.
2. Add Node.js API with webhook verification and message routing.
3. Add Supabase/Postgres tables and transactional slot locking.
4. Add Google Calendar OAuth and event sync.
5. Add a scheduler/queue for 24-hour and 2-hour utility reminders.
6. Add owner authentication and business onboarding.
7. Add consent, opt-out and data-retention controls appropriate to the deployment.
8. Replace the demo state with API calls.

Do not put Meta tokens or Supabase service-role keys in browser code.
