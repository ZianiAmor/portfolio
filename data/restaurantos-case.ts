// ============================================================================
// RestaurantOS — Case Study Content
// ----------------------------------------------------------------------------
// Four-stage guided narrative for the fullscreen viewer:
//   1. Hook        — what is this, in 10 seconds
//   2. Planning    — the thinking before the code
//   3. Roles       — inside the system, per role (Customer is the default tab)
//   4. Retrospective — what was deferred, what carries forward
//
// Every fact below comes from the RestaurantOS project record: real stack,
// metrics, design decisions, and edge cases. Media paths are the *intended*
// final locations — the viewer renders labeled placeholders until real
// screenshots/mp4s are dropped into /public/images.
// ============================================================================

export interface CaseStudySection {
  title: string
  media: string[] // intended screenshot/mp4 paths; placeholder until assets exist
  caption: string
}

export type RoleKey = 'customer' | 'cook' | 'service' | 'delivery' | 'admin'

export interface RoleNamespace {
  label: string
  sections: CaseStudySection[]
}

export interface RestaurantOSCaseStudy {
  liveDemoUrl: string

  hook: {
    positioning: string
    description: string
    stats: { value: string; label: string }[]
    ctaLabel: string
    ctaUrl: string
    brand: {
      name: string
      tagline: string
      palette: { name: string; hex: string }[]
      typography: { display: string; body: string }
      logoDescription: string
      uiNote: string
    }
  }

  planning: {
    title: string
    problemFraming: string
    stack: {
      frontend: string[]
      backend: string[]
      realtime: string[]
      infra: string[]
    }
    architectureImage: string
    architectureCaption: string
    decisions: { title: string; reasoning: string }[]
  }

  roles: {
    title: string
    defaultRole: RoleKey
    order: RoleKey[]
    customer: RoleNamespace
    cook: RoleNamespace
    service: RoleNamespace
    delivery: RoleNamespace
    admin: RoleNamespace
  }

  retrospective: {
    title: string
    intro: string
    limitations: string[]
    forwardLessons: string[]
    closingLine: string
  }
}

export const restaurantOSCase: RestaurantOSCaseStudy = {
  liveDemoUrl: 'https://restaurantos-neon.vercel.app',

  hook: {
    positioning:
      'A real-time restaurant management system built for five roles working the same shift — at the same time.',
    description:
      "A restaurant runs on coordination: cooks, servers, drivers, and customers all need the same live truth, but with different permissions and different stakes. RestaurantOS delivers that truth in real time — orders route themselves to the right worker, stock is deducted atomically so two customers can never sell the same last burger, and wages are computed from actual shift behavior instead of a spreadsheet. It's a production system, not a CRUD demo: 28+ database models, 60+ API endpoints, a background job engine, and a brand — built solo in two months.",
    stats: [
      { value: '5', label: 'Roles in Sync' },
      { value: '60+', label: 'API Endpoints' },
      { value: '28+', label: 'Database Models' },
      { value: '2 mo', label: 'Solo Build' },
    ],
    ctaLabel: 'View Live Demo',
    ctaUrl: 'https://restaurantos-neon.vercel.app',
    brand: {
      name: 'Ember',
      tagline: 'Fire-crafted food, shared with warmth.',
      palette: [
        { name: 'Copper', hex: '#d4884a' },
        { name: 'Amber', hex: '#fbbf24' },
        { name: 'Charcoal', hex: '#150f0b' },
        { name: 'Cream', hex: '#f3ece1' },
      ],
      typography: { display: 'Fraunces', body: 'Inter' },
      logoDescription: 'Custom SVG logo — a flame transitioning into a fork through negative space.',
      uiNote: 'Glass-morphism, dark theme, soft shadows, warm amber accents.',
    },
  },

  planning: {
    title: 'Planning & Requirements',
    problemFraming:
      "Five roles — customer, cook, service, delivery, admin — all need the same live truth, but with different permissions, views, and stakes. A kitchen order queue isn't interesting; an order that routes itself to the right cook, deducts stock atomically, notifies a server the moment it's READY, and later pays someone's wage based on how the shift actually went — that's a system. The constraints that shaped this build: real-time integrity under concurrency, a fair-assignment rule nobody can argue with, and a two-month solo deadline at three hours a day. Every design decision below came out of those constraints.",
    stack: {
      frontend: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
      realtime: ['Pusher', 'Private channels', 'Custom authorizer'],
      infra: ['Vercel', 'Render', 'Supabase', 'Cloudinary', 'Brevo', 'cron-job.org', 'Leaflet + OSM'],
    },
    architectureImage: '/images/architecture.png',
    architectureCaption:
      'Five roles, one API. The Next.js client talks to a single Express API behind role-guarded middleware; Prisma owns PostgreSQL; Pusher pushes state down private channels the moment a transaction commits. Cloudinary, Brevo, and cron-job.org hang off the edges — none of them touch the core loop.',
    decisions: [
      {
        title: 'Atomic inventory — stock can never go negative',
        reasoning:
          "Two customers ordering the same burger shouldn't be able to sell the same last one. Instead of check-then-update (which races under concurrency), the update itself carries the guard: quantityOnHand: { gte: requiredQty }. When the condition fails, Prisma throws P2025 and we return 'insufficient stock'. Negative stock becomes logically impossible — no locks, no extra queries.",
      },
      {
        title: 'Private Pusher channels for assignment-targeted events',
        reasoning:
          "Global broadcast channels were too noisy and too public for order payloads. Each user gets private-user-{userId}, so assignment and status events land exactly where they belong — role-specific toasts, badge counts, customer tracking. Less traffic, fewer leaks, and reconnect handling that actually matters (stale connections were a real bug we had to reset on logout).",
      },
      {
        title: 'Instance-based shift templates',
        reasoning:
          "One template — 'Weekday Standard' — applies to August and November independently. Each application creates an instance, so editing one month never mutates the other. Blocks carry COOK, SERVICE, and DELIVERY roles, and bulk-assigning a whole crew to a block is a single action.",
      },
      {
        title: 'UTC everywhere, convert only for display',
        reasoning:
          "Timezone bugs don't throw errors — they silently corrupt salary months and shift boundaries. The entire backend stores and compares UTC (getUTCMonthBoundary, TZ=UTC in production, every cron aligned). It removed a whole class of data corruption before it could exist.",
      },
    ],
  },

  roles: {
    title: 'Inside the System',
    defaultRole: 'customer',
    order: ['customer', 'cook', 'service', 'delivery', 'admin'],

    customer: {
      label: 'Customer',
      sections: [
        {
          title: 'Menu & Real-Time Inventory',
          media: [
            '/images/customer-menu.png',
            '/images/customer-real-time-menu.mp4', // ← this shows the disabling/re-enabling
          ],
          caption:
            "Every menu item is linked to its ingredients. When an ingredient drops below the low‑stock threshold, all items using it become unavailable instantly — the button greys out, the item can't be added to cart. No refresh, no polling. Restock the ingredient, and the items reappear. This happens across every customer's screen in real time via Pusher.",
        },
        {
          title: 'Cart & Checkout (1/2) — Cart View',
          media: ['/images/customer-cart.png'],
          caption:
            "The cart rides in a bottom sheet on mobile and a sticky sidebar on desktop. Items, quantities, and total are always visible — the page never refreshes, so the order context survives the whole way through.",
        },
        {
          title: 'Cart & Checkout (2/2) — Dine-In vs Delivery',
          media: ['/images/customer-mode.png'],
          caption:
            "Two clear options: Dine-in (table selection) or Delivery (address picker). The UI adapts to the choice instantly — no page reload, just a seamless transition.",
        },
        {
          title: 'Delivery Map',
          media: ['/images/customer-map.png'],
          caption:
            "A Leaflet + OpenStreetMap picker with browser geolocation and reverse-geocoding. Drop a pin or hit 'Use My Location' and get a readable address back — no typing city names from memory.",
        },
        {
          title: 'Order Tracking',
          media: ['/images/customer-tracking.mp4'],
          caption:
            "Orders stream through PENDING → PREPARING → READY → ON_THE_WAY → DELIVERED (or SERVED) over a private Pusher channel dedicated to that customer. Status flips in real time; there is no polling.",
        },
        {
          title: 'Cancellation',
          media: ['/images/customer-cancel.png'],
          caption:
            "Customers can cancel a PENDING order in one click. The backend runs a single Prisma transaction that restores every ingredient, frees the table, and notifies the assigned cook — all atomically, so nothing desyncs.",
        },{
          title: 'Reporting',
          media: [
            '/images/customer-report.png',
            '/images/customer-report-resolution.png',
          ],
          caption:
            "Customers can report an order in one click. They can leave the title empty for an auto-generated title from the order ID, then fill the description and even upload an image to describe the situation. The report is then resolved or rejected by an admin — and the customer sees the outcome instantly.",
        },
        {
          title: 'Table Selection (PhotoView)',
          media: [
            '/images/real-time-tables.mp4',
          ],
          caption:
            "Tables are placed as percentage-based coordinates on real photos of the restaurant — not pixels — so the layout stays accurate on every screen size. FREE tables are clickable; OCCUPIED and RESERVED are locked. When a table changes state, the PhotoView updates across every client in real time via Pusher.",
        },
      ],
    },

  cook: {
    label: 'Cook',
    sections: [
      {
        title: 'Order Queue',
        media: ['/images/cook-queue.mp4'],
        caption:
          'Cooks see only their assigned orders, priority‑ordered with elapsed time and table or delivery context in realtime, no need to refresh. Orders are never broadcast to the whole kitchen – less noise, clear accountability. PENDING orders appear first, followed by PREPARING orders.',
      },
      {
        title: 'Status Updates',
        media: ['/images/cook-status.mp4'],
        caption:
          'One click advances PENDING → PREPARING → READY. The moment an order hits READY, the assignment engine automatically hands it to a SERVICE or DELIVERY worker based on order type – no one has to remember to do it. The video shows the entire flow, including the real‑time update on the customer side via Pusher.',
      },
      {
        title: 'Fair Assignment Algorithm',
        media: [
          '/images/cook-assignment-context.png',  // Cook 1 has 1 order
          '/images/cook-assignment.mp4',           // Cook 2 gets order in real-time
        ],
        caption:
          'Orders are assigned to the cook with the fewest active orders. In this example, Cook 1 already has 3 orders. When a new order arrives, the system assigns it to Cook 2, who has 1 active order – ensuring workload is balanced fairly and no one is overloaded. The video shows the real-time assignment: Cook 2\'s dashboard updates instantly via Pusher, without a page refresh.',
      },
      {
        title: 'Shift Dependency',
        media: ['/images/cook-shift-blocked.mp4'],
        caption:
          'Cooks cannot update order status unless they have an active, also cannot get assigned new orders by the fair assignement algorithm, un‑paused shift. If the shift is missing or paused, a warning banner appears, and the action buttons are disabled. This enforces accountability – status changes are tied to actual working hours.',
      },
      {
        title: 'Shifts & Salary',
        media: [
          '/images/cook-shifts.mp4',
          '/images/cook-salary-breakdown.png',
        ],
        caption:
          'Workers can view their weekly schedule, start/end shifts (via the ShiftStatus component), and submit justifications for missed shifts directly from the calendar. The salary breakdown modal shows per‑shift scores, deductions, bonuses, and the final estimated salary – all updated in real time as shifts are completed.',
      },
    ],
  },

  service: {
    label: 'Service',
    sections: [
      {
        title: 'Ready Orders',
        media: ['/images/service-queue.mp4'],
        caption:
          'Service staff see all READY dine‑in orders, sorted by time‑since‑ready (oldest first). Each card shows the table number, items, and elapsed time – so the oldest plate surfaces first. No hunting through a cluttered list.',
      },
      {
        title: 'Serve Table',
        media: ['/images/service-serve.mp4'],
        caption:
          'One click marks the order as SERVED and updates the table status to OCCUPIED in real time. The PhotoView updates across all clients instantly via Pusher – customers see the table as OCCUPIED, and other staff know the table is now in use. The video shows the full serve flow, including the toast notification.',
      },
      {
        title: 'PhotoView (Staff Side)',
        media: ['/images/service-photoview.mp4'],
        caption:
          'The same photo canvas customers use, but staff dots carry live state – OCCUPIED, RESERVED, FREE – with order details on hover. One glance at the room replaces walking the floor to find out what is happening. Staff can also see which tables have active orders and what items are pending.',
      },
      {
        title: 'Create Order (Walk‑in / Phone)',
        media: ['/images/service-create-order.mp4'],
        caption:
          'Service staff can create orders on behalf of customers – for walk‑ins, phone orders, or email orders. The modal allows searching the menu, building a cart, choosing dine‑in (with table selection) or delivery (with a map picker), and placing the order. This fills the gap for non‑self‑service orders.',
      },
      {
        title: 'Stale Order Rotation',
        media: ['/images/service-rotation.mp4'],
        caption:
          'A cron job runs every minute and finds READY orders that have sat unserved for 8+ minutes, then rotates them to the best available SERVICE worker. No customer waits on a plate that has gone cold in a queue. The video shows the rotation event and the notification received by the new worker.',
      },
      {
        title: 'Shifts & Salary',
        media: [
          '/images/service-shifts.png',
          '/images/service-salary-breakdown.png',
        ],
        caption:
          'Service workers can view their weekly schedule, start/end shifts, and submit justifications for missed shifts. The salary breakdown modal shows per‑shift scores, deductions, bonuses, and final estimated salary – all in real time.',
      },
    ],
  },

  delivery: {
    label: 'Delivery',
    sections: [
      {
        title: 'Delivery Map/Start delivery',
        media: ['/images/delivery-map.mp4'],
        caption:
          'Every READY and ON_THE_WAY order appears as a marker on a Leaflet map with day/night tint and a status summary. A sidebar lists pending deliveries with address, total, and a "Start Delivery" button – updates in real time. Clicking "Navigate" on any marker opens Google Maps and marks the order ON_THE_WAY in one click, eliminating the most common delivery failure mode.',
      },
      {
        title: 'Pending Deliveries',
        media: ['/images/delivery-queue.png'],
        caption:
          'Alongside the map, a sidebar lists all pending deliveries with address, order total, and a "Start Delivery" button. Drivers can quickly see what is ready and prioritise by distance or time. The list updates in real time as new orders become READY.',
      },
      {
        title: 'Shifts & Salary',
        media: [
          '/images/service-shifts.png',
          '/images/service-salary-breakdown.png',
        ],
        caption:
          'Delivery workers can view their weekly schedule, start/end shifts, and submit justifications for missed shifts. The salary breakdown modal shows per‑shift scores, deductions, bonuses, and final estimated salary – all updated in real time.',
      },
    ],
  },


  admin: {
    label: 'Admin',
    sections: [
      {
        title: 'Dashboard – Live Operations',
        media: [
          '/images/admin-dashboard-realtime.mp4','/images/admin-dashboard-map.mp4', '/images/admin-dashboard-realtime-map.mp4',// ← Show a new order appearing on the dashboard in real time
        ],
        caption:
          "Nine modules, zero polling. Today's revenue, orders in progress (donut chart), active staff with pause status, delivery map with time‑based tint, top‑selling items, ingredient spend, critical low‑stock alerts, recent activity feed, and a 7‑day revenue trend — all updating via Pusher events. The video shows a new order arriving and the dashboard updating instantly without a refresh.",
      },
      {
        title: 'Menu – Full CRUD with Soft Delete & Restore',
        media: [
          '/images/admin-menu-restore.mp4', // ← Show deleting an item, then restoring it
        ],
        caption:
          "Full menu management with image uploads, category filtering, and ingredient linking. Soft delete preserves order history while hiding items from customers. The video shows the delete → restore flow: an item is removed from the menu, then restored with one click and reappears immediately.",
      },
      {
        title: 'Inventory – Real‑Time Stock Adjustments',
        media: [
          '/images/admin-inventory-adjust.mp4', // ← Show opening adjust modal, adding stock, seeing low‑stock warning disappear
        ],
        caption:
          "Ingredient list with low‑stock warnings and cost‑tracked adjustments. Admin can add or remove stock with unit or total cost tracking — the monthly spend report is built from these records. The video shows an ingredient going from low‑stock to well‑stocked, and the warning disappearing in real time.",
      },
      {
        title: 'Shifts – Templates → Instances → Shifts',
        media: [
          '/images/admin-shifts-generate.mp4', // ← Show applying a template → shifts appear in the list
        ],
        caption:
          "Reusable templates with role blocks for COOK, SERVICE, and DELIVERY. Apply a template to a date range to generate an instance — which creates all scheduled shifts in one action. The video shows the flow: selecting a template, setting a date range, and watching shifts populate the schedule instantly.",
      },
      {
        title: 'Salary – Scoring, Weights & Month Closure',
        media: [
          '/images/admin-salary-breakdown.mp4', // ← Show clicking a worker → seeing per‑shift score breakdown
        ],
        caption:
          "Per‑role, month‑specific scoring weights: lateness, early departure, pauses, service speed. Bonuses toggle per role — fast service, no complaints, attendance. The video shows drilling into a worker's breakdown: per‑shift scores, deductions, bonuses, and the final estimated salary — all updated in real time.",
      },
      {
        title: 'Reports – Resolve Flow',
        media: [
          '/images/admin-reports-resolve.mp4', // ← Show opening a report → resolving with a note → status changes
        ],
        caption:
          "One inbox for three report types — worker justifications, customer complaints, bug reports — filed by source (WORKER vs CUSTOMER). Admin resolves or rejects with notes. The video shows the resolve flow: opening a pending report, adding a note, and the status updating instantly via Pusher — the worker receives a private notification.",
      },
      {
        title: 'Users & Tokens – Access Control',
        media: [
          
          '/images/admin-tokens-generate.mp4','/images/admin-users.png', // ← Show generating a token → copying it → appearing in the list
        ],
        caption:
          "User management with role filtering and email verification badges. Staff tokens can be generated for SERVICE, COOK, or DELIVERY roles, with configurable expiry, copied to clipboard, and revoked if unused. The video shows the generate → copy → list refresh flow.",
      },
      {
        title: 'Tables – PhotoView with Drag‑to‑Place',
        media: [
          '/images/admin-tables-place.mp4', // ← Show clicking on a photo to place a table dot
        ],
        caption:
          "Upload floor photos and place tables as percentage‑based coordinates on the image. Tables persist across screen sizes because coordinates are relative, not pixel‑based. The video shows the admin uploading a photo, clicking to place a table, and seeing it appear instantly on the PhotoView — ready for customers and staff to use.",
      },
    ],
  },
  },

  retrospective: {
    title: 'What\u2019s Next',
    intro:
      'Feature-complete and live. This is the honest part — what got deferred on purpose, and the discipline the next project starts with instead of retrofitting.',
    limitations: [
      "Single-restaurant by design. The whole data model assumes one venue — no multi-tenant, no org-level permissions. Adding a second restaurant would touch the schema at every layer, and that wasn't the two-month job.",
      "Validation sits at the edges, not the gates. Zod on DTOs and environment variables was deliberately deferred; errors are friendly because they were hit during manual testing, not because typed validation caught them.",
      'No automated test suite. Manual testing held up for a solo build, but the salary engine and assignment algorithm are exactly the kind of logic that deserves regression tests before anyone else touches the code.',
    ],
    forwardLessons: [
      'Foundation-first: Zod, Pino logging, Helmet, and rate limiting are day-one dependencies on the next project — not retrofit items.',
      "Deploy early, even broken. SMTP blocks, IPv6 poolers, and cold starts only surfaced after the system was feature-complete. An MVP on Render + Supabase from week one would have de-risked the final month.",
      'Structure and tests go in the same commit as the feature. The effort is similar; the confidence is not.',
    ],
    closingLine:
      'RestaurantOS is feature-complete, live, and the fire is in the details. The next project starts from these lessons — not from zero.',
  },
}