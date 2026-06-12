/* ============================================================
   COMPASS — seed data + formatting helpers
   Exposes window.COMPASS = { domains, coaches, mentors, analytics, fmt }
   ============================================================ */
(function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Formatting rules — dates DD MMM YYYY, times HH:MMam/pm
  const fmt = {
    date(d) {
      // -> "04 Jun 2026"
      const x = d instanceof Date ? d : new Date(d);
      return String(x.getDate()).padStart(2, "0") + " " + MONTHS[x.getMonth()] + " " + x.getFullYear();
    },
    monthYear(d) {
      // -> "Jun 2026"
      const x = d instanceof Date ? d : new Date(d);
      return MONTHS[x.getMonth()] + " " + x.getFullYear();
    },
    weekday(d) {
      const x = d instanceof Date ? d : new Date(d);
      return DAYS[x.getDay()];
    },
    time(h, m) {
      // (14, 0) -> "2:00pm"
      const ap = h >= 12 ? "pm" : "am";
      let hh = h % 12;
      if (hh === 0) hh = 12;
      return hh + ":" + String(m).padStart(2, "0") + ap;
    },
    timeStr(s) {
      // "14:00" -> "2:00pm"
      const [h, m] = s.split(":").map(Number);
      return fmt.time(h, m);
    }
  };
  const TODAY = new Date(2026, 5, 1); // 01 Jun 26
  function dayOffset(n) {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + n);
    return d;
  }

  // Domain registry — single domain per coach
  const domains = [{
    id: "leadership",
    name: "Leadership & Management",
    short: "Leadership",
    icon: "compass",
    hue: "#0063D0"
  }, {
    id: "transitions",
    name: "Career Transitions",
    short: "Transitions",
    icon: "route",
    hue: "#7729D6"
  }, {
    id: "negotiation",
    name: "Negotiation & Pay",
    short: "Negotiation",
    icon: "scale",
    hue: "#1F8517"
  }, {
    id: "techlead",
    name: "Technical Leadership",
    short: "Tech Lead",
    icon: "terminal",
    hue: "#002E84"
  }, {
    id: "wellbeing",
    name: "Wellbeing & Balance",
    short: "Wellbeing",
    icon: "leaf",
    hue: "#68C34E"
  }, {
    id: "comms",
    name: "Communication",
    short: "Communication",
    icon: "chat",
    hue: "#DB8502"
  }, {
    id: "onboarding",
    name: "New Joiner Onboarding",
    short: "Onboarding",
    icon: "spark",
    hue: "#B86AFB"
  }, {
    id: "earlycareer",
    name: "Early Career Growth",
    short: "Early Career",
    icon: "seedling",
    hue: "#2C8DFF"
  }];
  const domainById = Object.fromEntries(domains.map(d => [d.id, d]));

  // Avatar gradient palettes (MEX Hub-Blue family with purple/green accents)
  const grads = [["#2C8DFF", "#0063D0"], ["#0063D0", "#002E84"], ["#56A3FF", "#0150A7"], ["#7729D6", "#0063D0"], ["#0063D0", "#1F8517"], ["#B86AFB", "#7729D6"], ["#2C8DFF", "#063690"], ["#0063D0", "#56A3FF"], ["#581CB3", "#0150A7"], ["#9938F9", "#0063D0"], ["#0063D0", "#339B1F"], ["#7729D6", "#9938F9"]];

  // Slot generators -------------------------------------------------
  function slot(dOff, h, m) {
    const d = dayOffset(dOff);
    return {
      id: "s" + dOff + "-" + h + m,
      dayOffset: dOff,
      date: d.toISOString(),
      h,
      m,
      label: fmt.weekday(d) + " " + fmt.date(d),
      time: fmt.time(h, m)
    };
  }
  function slots(arr) {
    return arr.map(([d, h, m]) => slot(d, h, m));
  }

  // Coaches ---------------------------------------------------------
  const coaches = [{
    id: "c1",
    name: "Amara Okonkwo",
    role: "VP, People & Culture",
    domain: "leadership",
    rating: 4.9,
    reviews: 128,
    years: 14,
    sessions: 312,
    grad: grads[0],
    bio: "Fifteen years building and leading high-trust teams across fintech and health. I coach managers stepping into their first leadership role and seasoned leads navigating org change. Direct, warm, and very practical — we'll leave every session with one thing to try.",
    tags: ["1:1 leadership", "Team health", "Difficult conversations", "Org change", "First-time managers"],
    slots: slots([[2, 10, 0], [2, 14, 30], [4, 9, 0], [5, 15, 0], [8, 11, 0], [9, 16, 0]])
  }, {
    id: "c2",
    name: "Daniel Reyes",
    role: "Career Transition Coach",
    domain: "transitions",
    rating: 4.8,
    reviews: 96,
    years: 11,
    sessions: 241,
    grad: grads[1],
    bio: "Former recruiter turned coach. I help people who feel stuck — switching functions, returning from a break, or chasing a role that doesn't have a clear ladder. We map what you actually want, then build the bridge to get there.",
    tags: ["Role switching", "Returning to work", "CV & story", "Internal moves", "Confidence"],
    slots: slots([[3, 11, 30], [3, 16, 0], [6, 10, 0], [7, 13, 0], [10, 9, 30]])
  }, {
    id: "c3",
    name: "Priya Nair",
    role: "Negotiation Specialist",
    domain: "negotiation",
    rating: 5.0,
    reviews: 74,
    years: 9,
    sessions: 188,
    grad: grads[2],
    bio: "Ex-management consultant. I demystify pay conversations and help you ask with evidence and ease. We'll rehearse the actual words, handle the awkward pause, and build a number you can defend without apology.",
    tags: ["Salary asks", "Promotion case", "Offer review", "Scripts & rehearsal", "Knowing your worth"],
    slots: slots([[2, 13, 0], [5, 10, 30], [8, 14, 0], [11, 11, 0]])
  }, {
    id: "c4",
    name: "Marcus Bennett",
    role: "Principal Engineer",
    domain: "techlead",
    rating: 4.7,
    reviews: 110,
    years: 16,
    sessions: 276,
    grad: grads[3],
    bio: "Principal engineer who's mentored dozens of ICs into staff+ roles. We talk technical influence without authority, writing that lands, and how to grow scope when your title hasn't caught up yet.",
    tags: ["Staff+ path", "Technical influence", "Design reviews", "Mentoring others", "Scope & impact"],
    slots: slots([[4, 15, 30], [6, 11, 0], [9, 9, 0], [10, 14, 30], [12, 16, 0]])
  }, {
    id: "c5",
    name: "Sofia Almeida",
    role: "Wellbeing & Performance Coach",
    domain: "wellbeing",
    rating: 4.9,
    reviews: 143,
    years: 12,
    sessions: 358,
    grad: grads[4],
    bio: "I work with people running hot — overcommitted, blurry boundaries, quietly exhausted. Together we rebuild a pace you can sustain, without dropping your ambition. Confidential and judgement-free.",
    tags: ["Burnout recovery", "Boundaries", "Sustainable pace", "Focus", "Energy management"],
    slots: slots([[2, 9, 30], [3, 14, 0], [5, 16, 30], [7, 10, 0], [9, 13, 30], [11, 15, 0]])
  }, {
    id: "c6",
    name: "Theo Lambert",
    role: "Communication Coach",
    domain: "comms",
    rating: 4.6,
    reviews: 67,
    years: 8,
    sessions: 154,
    grad: grads[5],
    bio: "Storyteller and ex-broadcast journalist. Whether it's a nervy all-hands, exec updates, or just being heard in a loud room — we sharpen what you say and how you say it so the message actually lands.",
    tags: ["Presenting", "Exec comms", "Storytelling", "Stakeholder buy-in", "Being heard"],
    slots: slots([[3, 10, 0], [6, 14, 0], [8, 16, 0], [12, 11, 30]])
  }, {
    id: "c7",
    name: "Hannah Goldberg",
    role: "Onboarding & Belonging Lead",
    domain: "onboarding",
    rating: 4.8,
    reviews: 52,
    years: 7,
    sessions: 121,
    grad: grads[6],
    bio: "Your first 90 days set the tone. I help new joiners find their feet fast — who to meet, how to ask for what you need, and how to turn early uncertainty into momentum. No question is too small.",
    tags: ["First 90 days", "Building network", "Asking for help", "Ramp-up", "Belonging"],
    slots: slots([[2, 11, 0], [4, 13, 30], [5, 9, 30], [8, 15, 0], [10, 11, 0]])
  }, {
    id: "c8",
    name: "Kwame Mensah",
    role: "Early Career Coach",
    domain: "earlycareer",
    rating: 4.9,
    reviews: 89,
    years: 9,
    sessions: 203,
    grad: grads[7],
    bio: "I coach people in their first few years of work — finding direction, building good habits, and learning how to grow without burning out. We'll set goals that actually mean something to you.",
    tags: ["Goal setting", "Feedback", "Visibility", "Habits", "Direction"],
    slots: slots([[3, 9, 0], [4, 11, 30], [7, 15, 30], [9, 10, 0], [11, 13, 0]])
  }, {
    id: "c9",
    name: "Yuki Tanaka",
    role: "Director, Engineering",
    domain: "leadership",
    rating: 4.7,
    reviews: 81,
    years: 13,
    sessions: 198,
    grad: grads[8],
    bio: "Engineering director who grew from IC to leading 40+. I coach new and aspiring managers on delegation, the shift from doing to enabling, and holding the line on quality while moving fast.",
    tags: ["New managers", "Delegation", "Hiring", "Team rhythm", "Letting go"],
    slots: slots([[5, 11, 0], [6, 16, 30], [10, 10, 0], [12, 14, 0]])
  }, {
    id: "c10",
    name: "Isabella Rossi",
    role: "Career Strategist",
    domain: "transitions",
    rating: 4.8,
    reviews: 64,
    years: 10,
    sessions: 167,
    grad: grads[9],
    bio: "I help people who've outgrown their current role figure out the next chapter — sideways, upwards, or somewhere entirely new. We'll get honest about what you want and build a plan you'll actually follow.",
    tags: ["Next chapter", "Self-discovery", "Planning", "Pivots", "Clarity"],
    slots: slots([[4, 10, 30], [7, 14, 0], [9, 11, 30], [11, 16, 0]])
  }, {
    id: "c11",
    name: "Noah Schmidt",
    role: "Staff Engineer & Mentor",
    domain: "techlead",
    rating: 4.9,
    reviews: 95,
    years: 12,
    sessions: 219,
    grad: grads[10],
    bio: "Staff engineer who loves the craft of technical leadership. We dig into architecture decisions, leading without managing, and building the kind of reputation that opens doors. Bring a real problem.",
    tags: ["Architecture", "Tech strategy", "Leading projects", "Reputation", "Craft"],
    slots: slots([[3, 13, 0], [5, 9, 0], [8, 11, 30], [12, 15, 30]])
  }, {
    id: "c12",
    name: "Grace Adeyemi",
    role: "Communication & Presence Coach",
    domain: "comms",
    rating: 5.0,
    reviews: 58,
    years: 8,
    sessions: 142,
    grad: grads[11],
    bio: "Executive presence isn't loud — it's clear, calm, and intentional. I help people who undersell themselves take up the right amount of space. Especially good for the quietly brilliant.",
    tags: ["Executive presence", "Speaking up", "Influence", "Confidence", "Clarity"],
    slots: slots([[2, 15, 30], [4, 14, 0], [6, 10, 0], [9, 15, 0], [11, 9, 30]])
  }];

  // Mentors (Rise programme) — senior women -------------------------
  const mentors = [{
    id: "m1",
    name: "Eleanor Whitfield",
    role: "SVP, Product",
    years: 19,
    grad: grads[5],
    focus: ["leadership", "transitions", "comms"],
    bio: "Joined as a graduate, now leads a 200-person product org. Eleanor has navigated returning from maternity leave twice, two reorgs, and the jump into the C-suite. She mentors with candour and a lot of warmth.",
    tags: ["Leadership", "Navigating bias", "Big career moves", "Speaking up"]
  }, {
    id: "m2",
    name: "Fatima Al-Rashid",
    role: "Director, Data Science",
    years: 15,
    grad: grads[2],
    focus: ["techlead", "earlycareer", "negotiation"],
    bio: "One of few women in her field when she started. Fatima champions technical women finding their voice, owning their expertise, and asking for what they're worth — without shrinking to fit the room.",
    tags: ["Technical women", "Owning expertise", "Pay", "Visibility"]
  }, {
    id: "m3",
    name: "Rosa Delgado",
    role: "VP, Operations",
    years: 17,
    grad: grads[9],
    focus: ["wellbeing", "transitions", "leadership"],
    bio: "Rosa rebuilt her career after a burnout that nearly ended it. She mentors on sustainable ambition — how to rise without losing yourself — and is fiercely protective of the women she works with.",
    tags: ["Sustainable ambition", "Resilience", "Boundaries", "Confidence"]
  }, {
    id: "m4",
    name: "Mei Lin Chen",
    role: "Head of Design",
    years: 14,
    grad: grads[4],
    focus: ["comms", "onboarding", "earlycareer"],
    bio: "Mei Lin remembers exactly how it felt to be new and unsure. She mentors early-career women on finding belonging, building a network from zero, and turning quiet competence into recognised impact.",
    tags: ["Belonging", "Early career", "Network", "Recognition"]
  }];

  // Analytics seed (will be augmented live by bookings) -------------
  const analytics = {
    kpis: {
      sessionsYTD: 1284,
      activeCoaches: 12,
      satisfaction: 4.8,
      mentorships: 47
    },
    // monthly series Jan..Jun 26
    months: ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026"],
    sessionsSeries: [168, 192, 214, 236, 261, 213],
    mentorshipsSeries: [4, 6, 7, 9, 11, 10],
    byDomain: [{
      id: "leadership",
      value: 268
    }, {
      id: "techlead",
      value: 212
    }, {
      id: "wellbeing",
      value: 198
    }, {
      id: "transitions",
      value: 164
    }, {
      id: "comms",
      value: 142
    }, {
      id: "negotiation",
      value: 118
    }, {
      id: "earlycareer",
      value: 110
    }, {
      id: "onboarding",
      value: 72
    }],
    utilisation: [
    // coach id -> booked / capacity this month
    {
      id: "c5",
      booked: 22,
      cap: 24
    }, {
      id: "c1",
      booked: 20,
      cap: 24
    }, {
      id: "c8",
      booked: 17,
      cap: 22
    }, {
      id: "c4",
      booked: 16,
      cap: 22
    }, {
      id: "c12",
      booked: 15,
      cap: 20
    }, {
      id: "c2",
      booked: 13,
      cap: 20
    }, {
      id: "c11",
      booked: 11,
      cap: 18
    }, {
      id: "c7",
      booked: 9,
      cap: 18
    }],
    demand: [
    // unmet / waitlist demand by domain
    {
      id: "leadership",
      waitlist: 18,
      trend: +4
    }, {
      id: "negotiation",
      waitlist: 14,
      trend: +6
    }, {
      id: "wellbeing",
      waitlist: 12,
      trend: +2
    }, {
      id: "techlead",
      waitlist: 9,
      trend: -1
    }, {
      id: "transitions",
      waitlist: 7,
      trend: +1
    }]
  };
  window.COMPASS = {
    domains,
    domainById,
    coaches,
    mentors,
    analytics,
    fmt,
    TODAY
  };
})();
;
/* COMPASS — icon set (inline SVG, 1.8 stroke, currentColor) */
(function () {
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a3 3 0 0 0 3-3V8"/><path d="M16 5h-6a3 3 0 0 0-3 3v0"/>',
    scale: '<path d="M12 3v18"/><path d="M6 7h12"/><path d="M6 7l-3 6a3 3 0 0 0 6 0z"/><path d="M18 7l-3 6a3 3 0 0 0 6 0z"/><path d="M8 21h8"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9l3 3-3 3"/><path d="M13 15h4"/>',
    leaf: '<path d="M5 21c0-9 6-14 14-14 0 8-5 14-14 14z"/><path d="M5 21c2-5 5-8 10-10"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.3-5.5A8 8 0 1 1 21 12z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
    seedling: '<path d="M12 21v-7"/><path d="M12 14C8 14 6 11 6 7c4 0 6 3 6 7z"/><path d="M12 12c0-3 2-5 6-5 0 3-2 5-6 5z"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L4.5 9.7l5.9-.9z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    briefcase: '<rect x="3" y="7.5" width="18" height="12.5" rx="2.5"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 13h18"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1"/><path d="M17.5 14.4A5.5 5.5 0 0 1 20.5 19"/>',
    heart: '<path d="M12 20s-7-4.5-9.2-9.2C1.2 7.5 3 4.5 6.2 4.5c1.9 0 3.1 1 3.8 2 .7-1 1.9-2 3.8-2 3.2 0 5 3 3.4 6.3C19 15.5 12 20 12 20z"/>',
    bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    trendUp: '<path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v5h-5"/>',
    trendDown: '<path d="M3 7l6 6 4-4 8 8"/><path d="M21 17v-5h-5"/>',
    chart: '<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/>',
    dot3: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    note: '<path d="M5 4h11l3 3v13H5z"/><path d="M15 4v4h4M8.5 12h7M8.5 16h5"/>',
    pin: '<path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    logout: '<path d="M14 4h-7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M11 12h9M17 8l4 4-4 4"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'
  };
  function Icon({
    name,
    size = 18,
    stroke = 1.8,
    className = "",
    style = {}
  }) {
    const d = P[name] || P.dot3;
    return React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      style,
      dangerouslySetInnerHTML: {
        __html: d
      }
    });
  }
  window.Icon = Icon;
})();
;
/* COMPASS — shared store (React context) */
(function () {
  const {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo
  } = React;
  const C = window.COMPASS;
  const StoreCtx = createContext(null);
  function StoreProvider({
    children
  }) {
    const [role, setRole] = useState("employee"); // employee | coach | hr
    const [view, setView] = useState("find"); // find | bookings | rise (employee)

    // Live booked sessions (employee)
    const [bookings, setBookings] = useState([
    // one pre-existing booking so "My bookings" isn't empty
    {
      id: "bk-seed1",
      coachId: "c5",
      domain: "wellbeing",
      date: new Date(2026, 5, 5).toISOString(),
      time: "4:30pm",
      focus: "Rebuilding boundaries after a heavy quarter — want a sustainable weekly rhythm.",
      status: "confirmed",
      createdAt: Date.now() - 86400000
    }]);

    // The signed-in coach (for the Coach role view)
    const COACH_ME = "c1";

    // Sessions booked WITH the signed-in coach (their client roster)
    const [coachSessions, setCoachSessions] = useState([{
      id: "cs1",
      who: "Liam Brooks",
      team: "Growth",
      dayOffset: 2,
      h: 14,
      m: 30,
      focus: "Preparing for my first round of performance reviews as a new manager.",
      status: "confirmed"
    }, {
      id: "cs2",
      who: "Aisha Khan",
      team: "Platform Eng",
      dayOffset: 4,
      h: 9,
      m: 0,
      focus: "Navigating a tricky stakeholder who keeps reopening settled decisions.",
      status: "confirmed"
    }, {
      id: "cs3",
      who: "Diego Fernández",
      team: "Design",
      dayOffset: 5,
      h: 15,
      m: 0,
      focus: "",
      status: "confirmed"
    }, {
      id: "cs4",
      who: "Hannah Wu",
      team: "Finance",
      dayOffset: 9,
      h: 16,
      m: 0,
      focus: "Building the case for a step up to team lead.",
      status: "confirmed"
    }]);

    // Coach availability — keyed by coachId, list of {id,label,time,date}
    const [availability, setAvailability] = useState(() => {
      const map = {};
      C.coaches.forEach(c => {
        map[c.id] = c.slots.map(s => ({
          ...s
        }));
      });
      return map;
    });

    // Rise mentorship requests
    const [mentorships, setMentorships] = useState([]);

    // Slide-in booking panel target coach
    const [bookingCoach, setBookingCoach] = useState(null);

    // toast
    const [toast, setToast] = useState(null);
    const showToast = useCallback((msg, kind = "default") => {
      setToast({
        msg,
        kind,
        id: Date.now()
      });
      setTimeout(() => setToast(t => t && Date.now() - t.id >= 3200 ? null : t), 3400);
    }, []);
    const bookSession = useCallback((coach, slot, focus) => {
      setBookings(prev => [{
        id: "bk-" + Date.now(),
        coachId: coach.id,
        domain: coach.domain,
        date: slot.date,
        time: slot.time,
        focus: focus || "",
        status: "confirmed",
        createdAt: Date.now()
      }, ...prev]);
      // remove the slot from availability
      setAvailability(prev => ({
        ...prev,
        [coach.id]: (prev[coach.id] || []).filter(s => s.id !== slot.id)
      }));
      // if booking the signed-in coach, add to their roster (live cross-view)
      if (coach.id === COACH_ME) {
        setCoachSessions(prev => [...prev, {
          id: "cs-" + Date.now(),
          who: "You",
          team: "—",
          dayOffset: slot.dayOffset,
          h: slot.h,
          m: slot.m,
          focus: focus || "",
          status: "confirmed",
          isYou: true
        }]);
      }
      showToast("Session confirmed with " + coach.name.split(" ")[0], "success");
    }, [showToast]);
    const addAvailability = useCallback((coachId, slot) => {
      setAvailability(prev => ({
        ...prev,
        [coachId]: [...(prev[coachId] || []), slot].sort((a, b) => a.dayOffset - b.dayOffset || a.h * 60 + a.m - (b.h * 60 + b.m))
      }));
    }, []);
    const removeAvailability = useCallback((coachId, slotId) => {
      setAvailability(prev => ({
        ...prev,
        [coachId]: (prev[coachId] || []).filter(s => s.id !== slotId)
      }));
    }, []);
    const requestMentor = useCallback((mentor, focusAreas, note) => {
      setMentorships(prev => [{
        id: "ms-" + Date.now(),
        mentorId: mentor.id,
        focusAreas,
        note,
        status: "matched",
        createdAt: Date.now()
      }, ...prev]);
      showToast("Mentorship request sent — confidential & off the record", "rise");
    }, [showToast]);
    const value = useMemo(() => ({
      role,
      setRole,
      view,
      setView,
      bookings,
      setBookings,
      bookSession,
      availability,
      addAvailability,
      removeAvailability,
      mentorships,
      requestMentor,
      bookingCoach,
      setBookingCoach,
      coachSessions,
      COACH_ME,
      toast,
      showToast
    }), [role, view, bookings, availability, mentorships, bookingCoach, coachSessions, toast, bookSession, addAvailability, removeAvailability, requestMentor, showToast]);
    return React.createElement(StoreCtx.Provider, {
      value
    }, children);
  }
  function useStore() {
    return useContext(StoreCtx);
  }
  window.StoreProvider = StoreProvider;
  window.useStore = useStore;
})();
;

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
;
/* COMPASS — shared UI primitives */
(function () {
  const C = window.COMPASS;
  const Icon = window.Icon;
  function initials(name) {
    return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }
  function Avatar({
    name,
    grad,
    size = 48,
    ring = false,
    style = {}
  }) {
    const fs = Math.round(size * 0.36);
    const [a, b] = grad || ["#2C8DFF", "#0063D0"];
    return /*#__PURE__*/React.createElement("span", {
      className: "avatar",
      style: {
        width: size,
        height: size,
        fontSize: fs,
        background: `linear-gradient(135deg, ${a}, ${b})`,
        boxShadow: ring ? "0 0 0 3px #fff, 0 0 0 4.5px " + a + "55" : "none",
        ...style
      }
    }, initials(name));
  }
  function Stars({
    rating,
    size = 14,
    showNum = true
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        color: "#FFA500"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: size,
      stroke: 0,
      style: {
        fill: "#FFA500"
      }
    })), showNum && /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: size + 0.5,
        color: "var(--ink)",
        fontWeight: 700
      }
    }, rating.toFixed(1)));
  }
  function DomainBadge({
    domainId,
    withIcon = true,
    size = "md"
  }) {
    const d = C.domainById[domainId];
    if (!d) return null;
    const small = size === "sm";
    return /*#__PURE__*/React.createElement("span", {
      className: "chip",
      style: {
        background: d.hue + "14",
        color: d.hue,
        fontSize: small ? 11.5 : 12.5,
        padding: small ? "4px 9px" : "5px 11px",
        fontWeight: 700
      }
    }, withIcon && /*#__PURE__*/React.createElement(Icon, {
      name: d.icon,
      size: small ? 12 : 14,
      stroke: 2
    }), d.name);
  }
  function Stat({
    icon,
    value,
    label,
    accent
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 15,
        fontWeight: 700,
        color: "var(--ink)"
      }
    }, icon && /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 14,
      stroke: 2,
      style: {
        color: accent || "var(--ink-3)"
      }
    }), value), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: "var(--ink-3)",
        fontWeight: 600,
        letterSpacing: ".01em"
      }
    }, label));
  }

  // Animated number (counts up) — rests at `value` so it's correct even if rAF never fires
  function CountUp({
    value,
    decimals = 0,
    duration = 900,
    suffix = "",
    prefix = ""
  }) {
    const [n, setN] = React.useState(value);
    React.useEffect(() => {
      let raf, start;
      const step = t => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(value * eased);
        if (p < 1) raf = requestAnimationFrame(step);else setN(value);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [value]);
    return /*#__PURE__*/React.createElement("span", null, prefix, n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }), suffix);
  }

  // Section header
  function SectionHead({
    eyebrow,
    title,
    sub,
    right,
    accent
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        color: accent || "var(--violet)",
        marginBottom: 8
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 30,
        lineHeight: 1.08
      }
    }, title), sub && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "8px 0 0",
        color: "var(--ink-3)",
        fontSize: 15,
        maxWidth: 560
      }
    }, sub)), right);
  }
  function Toast() {
    const {
      toast
    } = window.useStore();
    if (!toast) return null;
    const isRise = toast.kind === "rise";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        gap: 11,
        background: "var(--ink)",
        color: "#fff",
        padding: "13px 20px 13px 16px",
        borderRadius: 999,
        boxShadow: "0 16px 40px rgba(0,16,60,.3)",
        animation: "fadeUp .34s cubic-bezier(.2,.8,.3,1) both",
        fontWeight: 600,
        fontSize: 14.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: isRise ? "var(--rise-gradient)" : "var(--brand-gradient)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isRise ? "heart" : "check",
      size: 15,
      stroke: 2.6
    })), toast.msg);
  }
  window.UI = {
    Avatar,
    Stars,
    DomainBadge,
    Stat,
    CountUp,
    SectionHead,
    Toast,
    initials
  };
})();
;
/* COMPASS — HR Analytics: charts (SVG) */
(function () {
  const {
    useState
  } = React;
  const C = window.COMPASS;
  const Icon = window.Icon;

  // ---- smooth path helper (Catmull-Rom -> bezier) ----
  function smoothPath(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i],
        p1 = pts[i],
        p2 = pts[i + 1],
        p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6,
        c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6,
        c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  // ---------- Area chart (dual series) ----------
  function AreaChart({
    months,
    sessions,
    mentorships
  }) {
    const W = 640,
      H = 260,
      padL = 8,
      padR = 8,
      padT = 18,
      padB = 34;
    const iw = W - padL - padR,
      ih = H - padT - padB;
    const maxS = Math.max(...sessions) * 1.15;
    const n = months.length;
    const x = i => padL + iw * i / (n - 1);
    const yS = v => padT + ih - v / maxS * ih;
    const maxM = Math.max(...mentorships) * 1.6;
    const yM = v => padT + ih - v / maxM * ih;
    const [hover, setHover] = useState(null);
    const sPts = sessions.map((v, i) => [x(i), yS(v)]);
    const mPts = mentorships.map((v, i) => [x(i), yM(v)]);
    const sLine = smoothPath(sPts);
    const sArea = sLine + ` L ${x(n - 1)} ${padT + ih} L ${x(0)} ${padT + ih} Z`;
    const mLine = smoothPath(mPts);
    const gridY = [0, 0.25, 0.5, 0.75, 1].map(t => padT + ih - t * ih);
    return /*#__PURE__*/React.createElement("div", {
      className: "chart-wrap"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      className: "area-svg",
      preserveAspectRatio: "none",
      onMouseLeave: () => setHover(null),
      onMouseMove: e => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width * W;
        let idx = Math.round((px - padL) / iw * (n - 1));
        idx = Math.max(0, Math.min(n - 1, idx));
        setHover(idx);
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "areaFill",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#2C8DFF",
      stopOpacity: "0.26"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#0063D0",
      stopOpacity: "0.02"
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "sLineGrad",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "0"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#2C8DFF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#0063D0"
    }))), gridY.map((gy, i) => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: padL,
      y1: gy,
      x2: W - padR,
      y2: gy,
      stroke: "#E5E5E5",
      strokeWidth: "1"
    })), /*#__PURE__*/React.createElement("path", {
      d: sArea,
      fill: "url(#areaFill)"
    }), /*#__PURE__*/React.createElement("path", {
      d: sLine,
      fill: "none",
      stroke: "url(#sLineGrad)",
      strokeWidth: "2.6",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: mLine,
      fill: "none",
      stroke: "#FA7A25",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeDasharray: "2 5"
    }), mPts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: "m" + i,
      cx: p[0],
      cy: p[1],
      r: "3",
      fill: "#FA7A25"
    })), sPts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: "s" + i,
      cx: p[0],
      cy: p[1],
      r: hover === i ? 5.5 : 3.5,
      fill: "#fff",
      stroke: "#0063D0",
      strokeWidth: "2.4"
    })), hover !== null && /*#__PURE__*/React.createElement("line", {
      x1: x(hover),
      y1: padT,
      x2: x(hover),
      y2: padT + ih,
      stroke: "#0063D0",
      strokeWidth: "1",
      strokeDasharray: "3 3",
      opacity: "0.4"
    })), /*#__PURE__*/React.createElement("div", {
      className: "area-xaxis"
    }, months.map((m, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: hover === i ? "on" : ""
    }, m.split(" ")[0]))), hover !== null && /*#__PURE__*/React.createElement("div", {
      className: "area-tip",
      style: {
        left: `${x(hover) / W * 100}%`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "att-mo"
    }, months[hover]), /*#__PURE__*/React.createElement("div", {
      className: "att-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "att-dot",
      style: {
        background: "#0063D0"
      }
    }), " ", sessions[hover], " sessions"), /*#__PURE__*/React.createElement("div", {
      className: "att-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "att-dot",
      style: {
        background: "#FA7A25"
      }
    }), " ", mentorships[hover], " mentorships")));
  }

  // ---------- Donut ----------
  function Donut({
    data
  }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const R = 78,
      r = 50,
      cx = 90,
      cy = 90;
    let acc = 0;
    const [hover, setHover] = useState(null);
    function arc(start, end) {
      const a0 = start / total * Math.PI * 2 - Math.PI / 2;
      const a1 = end / total * Math.PI * 2 - Math.PI / 2;
      const large = end - start > total / 2 ? 1 : 0;
      const x0 = cx + R * Math.cos(a0),
        y0 = cy + R * Math.sin(a0);
      const x1 = cx + R * Math.cos(a1),
        y1 = cy + R * Math.sin(a1);
      const xi1 = cx + r * Math.cos(a1),
        yi1 = cy + r * Math.sin(a1);
      const xi0 = cx + r * Math.cos(a0),
        yi0 = cy + r * Math.sin(a0);
      return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} L ${xi1} ${yi1} A ${r} ${r} 0 ${large} 0 ${xi0} ${yi0} Z`;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "donut-wrap"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 180 180",
      className: "donut-svg"
    }, data.map((d, i) => {
      const dm = C.domainById[d.id];
      const start = acc;
      acc += d.value;
      const isH = hover === i;
      return /*#__PURE__*/React.createElement("path", {
        key: d.id,
        d: arc(start, acc),
        fill: dm.hue,
        opacity: hover === null || isH ? 1 : 0.35,
        style: {
          transform: isH ? "scale(1.04)" : "none",
          transformOrigin: "90px 90px",
          transition: "all .18s",
          cursor: "pointer"
        },
        onMouseEnter: () => setHover(i),
        onMouseLeave: () => setHover(null)
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: "90",
      y: "85",
      textAnchor: "middle",
      dominantBaseline: "central",
      className: "donut-num"
    }, hover === null ? total : data[hover].value), /*#__PURE__*/React.createElement("text", {
      x: "90",
      y: "107",
      textAnchor: "middle",
      dominantBaseline: "central",
      className: "donut-lbl"
    }, hover === null ? "sessions" : C.domainById[data[hover].id].short)), /*#__PURE__*/React.createElement("div", {
      className: "donut-legend"
    }, data.map((d, i) => {
      const dm = C.domainById[d.id];
      return /*#__PURE__*/React.createElement("div", {
        key: d.id,
        className: "dleg" + (hover === i ? " on" : ""),
        onMouseEnter: () => setHover(i),
        onMouseLeave: () => setHover(null)
      }, /*#__PURE__*/React.createElement("span", {
        className: "dleg-dot",
        style: {
          background: dm.hue
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "dleg-name"
      }, dm.name), /*#__PURE__*/React.createElement("span", {
        className: "dleg-val"
      }, Math.round(d.value / total * 100), "%"));
    })));
  }
  window.CompassCharts = {
    AreaChart,
    Donut
  };
})();
;
/* COACHLY — Employee · Find a coach (editorial list rows) */
(function () {
  const {
    useState,
    useMemo,
    useRef,
    useEffect
  } = React;
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    Avatar
  } = window.UI;
  function firstSentence(s) {
    const m = s.match(/^[^.!?]*[.!?]/);
    return m ? m[0].trim() : s;
  }

  // ---- custom domain dropdown ----
  function DomainDropdown({
    value,
    onChange
  }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);
    const sel = value ? C.domainById[value] : null;
    return /*#__PURE__*/React.createElement("div", {
      className: "dd",
      ref: ref
    }, /*#__PURE__*/React.createElement("button", {
      className: "dd-btn" + (open ? " open" : ""),
      onClick: () => setOpen(o => !o)
    }, /*#__PURE__*/React.createElement("span", {
      className: "dd-ico",
      style: {
        color: sel ? sel.hue : "var(--ink-3)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: sel ? sel.icon : "filter",
      size: 17,
      stroke: 2
    })), /*#__PURE__*/React.createElement("span", {
      className: "dd-val"
    }, sel ? sel.name : "All domains"), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 16,
      stroke: 2.2,
      style: {
        color: "var(--ink-3)",
        transition: "transform .18s",
        transform: open ? "rotate(180deg)" : "none"
      }
    })), open && /*#__PURE__*/React.createElement("div", {
      className: "dd-menu"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dd-item" + (!value ? " on" : ""),
      onClick: () => {
        onChange(null);
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dd-dot",
      style: {
        background: "var(--ink-4)"
      }
    }), "All domains"), C.domains.map(d => /*#__PURE__*/React.createElement("button", {
      key: d.id,
      className: "dd-item" + (value === d.id ? " on" : ""),
      onClick: () => {
        onChange(d.id);
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dd-dot",
      style: {
        background: d.hue
      }
    }), d.name))));
  }
  function CoachRow({
    coach,
    i
  }) {
    const {
      setBookingCoach,
      availability
    } = window.useStore();
    const d = C.domainById[coach.domain];
    const open = (availability[coach.id] || []).length;
    return /*#__PURE__*/React.createElement("article", {
      className: "crow fade-up",
      style: {
        animationDelay: i * 45 + "ms"
      },
      onClick: () => setBookingCoach(coach)
    }, /*#__PURE__*/React.createElement("div", {
      className: "crow-avatar"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: coach.name,
      grad: coach.grad,
      size: 66
    }), /*#__PURE__*/React.createElement("span", {
      className: "crow-domdot",
      style: {
        background: d.hue
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: d.icon,
      size: 13,
      stroke: 2.4
    }))), /*#__PURE__*/React.createElement("div", {
      className: "crow-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "crow-top"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "crow-name"
    }, coach.name), /*#__PURE__*/React.createElement("span", {
      className: "crow-role"
    }, coach.role)), /*#__PURE__*/React.createElement("div", {
      className: "crow-pill",
      style: {
        background: d.hue + "15",
        color: d.hue
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: d.icon,
      size: 13,
      stroke: 2.2
    }), d.name), /*#__PURE__*/React.createElement("p", {
      className: "crow-voice"
    }, "\"", firstSentence(coach.bio), "\"")), /*#__PURE__*/React.createElement("div", {
      className: "crow-stats"
    }, /*#__PURE__*/React.createElement("div", {
      className: "crow-rating"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: 15,
      stroke: 0,
      style: {
        fill: "var(--gold)",
        color: "var(--gold)"
      }
    }), /*#__PURE__*/React.createElement("strong", null, coach.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", null, "\xB7 ", coach.reviews)), /*#__PURE__*/React.createElement("div", {
      className: "crow-meta"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, coach.years), " yrs"), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, coach.sessions), " sessions")), /*#__PURE__*/React.createElement("div", {
      className: "crow-cta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "crow-open" + (open === 0 ? " none" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "oc-dot"
    }), open > 0 ? open + " open" : "Waitlist"), /*#__PURE__*/React.createElement("span", {
      className: "crow-book"
    }, "View & book", /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 16,
      stroke: 2.2
    })))));
  }
  function FindCoach() {
    const [q, setQ] = useState("");
    const [domain, setDomain] = useState(null);
    const [sort, setSort] = useState("rating");
    const {
      availability
    } = window.useStore();
    const list = useMemo(() => {
      let arr = C.coaches.filter(c => {
        if (domain && c.domain !== domain) return false;
        if (q.trim()) {
          const hay = (c.name + " " + c.role + " " + C.domainById[c.domain].name + " " + c.bio + " " + c.tags.join(" ")).toLowerCase();
          if (!hay.includes(q.trim().toLowerCase())) return false;
        }
        return true;
      });
      const openOf = c => (availability[c.id] || []).length;
      if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      if (sort === "experience") arr = [...arr].sort((a, b) => b.years - a.years);
      if (sort === "availability") arr = [...arr].sort((a, b) => openOf(b) - openOf(a));
      return arr;
    }, [q, domain, sort, availability]);
    const sorts = [["rating", "Top rated"], ["experience", "Most experienced"], ["availability", "Most availability"]];
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("section", {
      className: "find-hero fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fh-text"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }), "Good morning, Wei"), /*#__PURE__*/React.createElement("h1", {
      className: "fh-title"
    }, "Who's in your", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "fh-em"
    }, "corner"), " today?"), /*#__PURE__*/React.createElement("p", {
      className: "fh-sub"
    }, "Book a 1:1 with an in-house coach \u2014 leadership, career moves, pay, wellbeing and more. Free, confidential, and yours to schedule.")), /*#__PURE__*/React.createElement("div", {
      className: "fh-aside"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fh-stat"
    }, /*#__PURE__*/React.createElement("b", null, "12"), /*#__PURE__*/React.createElement("span", null, "coaches ready")), /*#__PURE__*/React.createElement("div", {
      className: "fh-divline"
    }), /*#__PURE__*/React.createElement("div", {
      className: "fh-stat"
    }, /*#__PURE__*/React.createElement("b", null, "8"), /*#__PURE__*/React.createElement("span", null, "specialisms")), /*#__PURE__*/React.createElement("div", {
      className: "fh-divline"
    }), /*#__PURE__*/React.createElement("div", {
      className: "fh-stat"
    }, /*#__PURE__*/React.createElement("b", null, "4.8"), /*#__PURE__*/React.createElement("span", null, "avg rating")))), /*#__PURE__*/React.createElement("div", {
      className: "find-toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "find-search"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18,
      stroke: 2,
      style: {
        color: "var(--ink-4)"
      }
    }), /*#__PURE__*/React.createElement("input", {
      className: "fs-input",
      placeholder: "Search by name, focus area, or keyword\u2026",
      value: q,
      onChange: e => setQ(e.target.value)
    }), q && /*#__PURE__*/React.createElement("button", {
      className: "fs-clear",
      onClick: () => setQ("")
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 15,
      stroke: 2.2
    }))), /*#__PURE__*/React.createElement(DomainDropdown, {
      value: domain,
      onChange: setDomain
    })), /*#__PURE__*/React.createElement("div", {
      className: "find-sortbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "find-sorts"
    }, sorts.map(([id, lbl]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      className: "sort-chip" + (sort === id ? " on" : ""),
      onClick: () => setSort(id)
    }, lbl))), /*#__PURE__*/React.createElement("div", {
      className: "find-count"
    }, list.length, " ", list.length === 1 ? "coach" : "coaches")), /*#__PURE__*/React.createElement("div", {
      className: "crow-list"
    }, list.map((c, i) => /*#__PURE__*/React.createElement(CoachRow, {
      key: c.id,
      coach: c,
      i: i
    })), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "find-empty"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 30,
      stroke: 1.7,
      style: {
        color: "var(--ink-4)"
      }
    }), /*#__PURE__*/React.createElement("h3", null, "No coaches match that"), /*#__PURE__*/React.createElement("p", null, "Try a different keyword or clear the domain filter."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: () => {
        setQ("");
        setDomain(null);
      }
    }, "Clear filters"))));
  }
  window.FindCoach = FindCoach;
})();
;
/* COACHLY — Employee · Booking slide-in panel */
(function () {
  const {
    useState,
    useEffect,
    useMemo
  } = React;
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    Avatar
  } = window.UI;
  function BookingPanel() {
    const {
      bookingCoach,
      setBookingCoach,
      availability,
      bookSession
    } = window.useStore();
    const [slot, setSlot] = useState(null);
    const [focus, setFocus] = useState("");
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      if (bookingCoach) {
        setSlot(null);
        setFocus("");
        setMounted(true);
      }
    }, [bookingCoach]);
    const close = () => {
      setMounted(false);
      setTimeout(() => setBookingCoach(null), 240);
    };

    // group slots by date
    const groups = useMemo(() => {
      if (!bookingCoach) return [];
      const slots = availability[bookingCoach.id] || [];
      const map = new Map();
      slots.forEach(s => {
        const k = s.date.slice(0, 10);
        if (!map.has(k)) map.set(k, {
          date: s.date,
          items: []
        });
        map.get(k).items.push(s);
      });
      return [...map.values()].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [bookingCoach, availability]);
    if (!bookingCoach) return null;
    const coach = bookingCoach;
    const d = C.domainById[coach.domain];
    const confirm = () => {
      if (!slot) return;
      bookSession(coach, slot, focus);
      close();
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "bp-back" + (mounted ? " in" : ""),
      onClick: close
    }), /*#__PURE__*/React.createElement("aside", {
      className: "bp" + (mounted ? " in" : "")
    }, /*#__PURE__*/React.createElement("button", {
      className: "bp-close",
      onClick: close
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20,
      stroke: 2.2
    })), /*#__PURE__*/React.createElement("div", {
      className: "bp-head",
      style: {
        background: `linear-gradient(135deg, ${coach.grad[0]}, ${coach.grad[1]})`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-head-row"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: coach.name,
      grad: ["#ffffff22", "#ffffff10"],
      size: 68,
      style: {
        boxShadow: "0 0 0 3px rgba(255,255,255,.3)"
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "bp-name"
    }, coach.name), /*#__PURE__*/React.createElement("div", {
      className: "bp-role"
    }, coach.role), /*#__PURE__*/React.createElement("div", {
      className: "bp-rate"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: 14,
      stroke: 0,
      style: {
        fill: "#FFD66B",
        color: "#FFD66B"
      }
    }), /*#__PURE__*/React.createElement("strong", null, coach.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", null, "\xB7 ", coach.reviews, " reviews \xB7 ", coach.sessions, " sessions")))), /*#__PURE__*/React.createElement("span", {
      className: "bp-domain"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: d.icon,
      size: 14,
      stroke: 2.2
    }), d.name)), /*#__PURE__*/React.createElement("div", {
      className: "bp-scroll"
    }, /*#__PURE__*/React.createElement("section", {
      className: "bp-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-label"
    }, "About ", coach.name.split(" ")[0]), /*#__PURE__*/React.createElement("p", {
      className: "bp-bio"
    }, coach.bio)), /*#__PURE__*/React.createElement("section", {
      className: "bp-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-label"
    }, "Specialisms"), /*#__PURE__*/React.createElement("div", {
      className: "bp-tags"
    }, coach.tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "bp-tag",
      style: {
        background: d.hue + "12",
        color: d.hue
      }
    }, t)))), /*#__PURE__*/React.createElement("section", {
      className: "bp-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-label"
    }, "Pick a time", /*#__PURE__*/React.createElement("span", {
      className: "bp-label-r"
    }, (availability[coach.id] || []).length, " open slots")), groups.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "bp-noslots"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 20,
      stroke: 1.8
    }), "No open slots right now \u2014 you can join the waitlist below."), /*#__PURE__*/React.createElement("div", {
      className: "bp-slots"
    }, groups.map(g => {
      const dt = new Date(g.date);
      return /*#__PURE__*/React.createElement("div", {
        key: g.date,
        className: "bp-day"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bp-day-head"
      }, /*#__PURE__*/React.createElement("span", {
        className: "bp-day-wd"
      }, C.fmt.weekday(dt)), /*#__PURE__*/React.createElement("span", {
        className: "bp-day-dt"
      }, C.fmt.date(dt))), /*#__PURE__*/React.createElement("div", {
        className: "bp-times"
      }, g.items.map(s => /*#__PURE__*/React.createElement("button", {
        key: s.id,
        className: "bp-time" + (slot && slot.id === s.id ? " on" : ""),
        onClick: () => setSlot(s)
      }, s.time))));
    }))), /*#__PURE__*/React.createElement("section", {
      className: "bp-sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-label"
    }, "What would you like to focus on?", /*#__PURE__*/React.createElement("span", {
      className: "bp-opt"
    }, "optional")), /*#__PURE__*/React.createElement("textarea", {
      className: "field bp-focus",
      rows: 3,
      placeholder: "A few words on what's on your mind, so your coach can prepare\u2026",
      value: focus,
      onChange: e => setFocus(e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "bp-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bp-foot-info"
    }, slot ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bp-foot-lbl"
    }, "You're booking"), /*#__PURE__*/React.createElement("span", {
      className: "bp-foot-val"
    }, C.fmt.weekday(new Date(slot.date)), " ", C.fmt.date(new Date(slot.date)), " \xB7 ", slot.time)) : /*#__PURE__*/React.createElement("span", {
      className: "bp-foot-hint"
    }, "Select a time to continue")), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      disabled: !slot,
      style: {
        opacity: slot ? 1 : .5,
        pointerEvents: slot ? "auto" : "none"
      },
      onClick: confirm
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 17,
      stroke: 2.4
    }), "Confirm booking"))));
  }
  window.BookingPanel = BookingPanel;
})();
;
/* COACHLY — Employee · My bookings (agenda timeline) */
(function () {
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    Avatar
  } = window.UI;
  function MyBookings() {
    const {
      bookings,
      setRole,
      setView
    } = window.useStore();
    const sorted = [...bookings].sort((a, b) => new Date(a.date) - new Date(b.date));
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("header", {
      className: "bk-head fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }), "Your corner"), /*#__PURE__*/React.createElement("h1", {
      className: "bk-title"
    }, "My bookings"), /*#__PURE__*/React.createElement("p", {
      className: "bk-sub"
    }, bookings.length === 0 ? "Sessions you book will appear here." : `${bookings.length} session${bookings.length === 1 ? "" : "s"} lined up. We'll send a calendar hold and a reminder the day before.`)), sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "bk-empty fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-empty-mark"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 32,
      stroke: 1.6
    })), /*#__PURE__*/React.createElement("h3", null, "No sessions yet"), /*#__PURE__*/React.createElement("p", null, "Find a coach who gets where you want to go, and book your first 1:1."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => {
        setRole("employee");
        setView("find");
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16,
      stroke: 2.2
    }), "Find a coach")) : /*#__PURE__*/React.createElement("div", {
      className: "bk-timeline"
    }, sorted.map((b, i) => {
      const coach = C.coaches.find(c => c.id === b.coachId);
      const d = C.domainById[b.domain];
      const dt = new Date(b.date);
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        className: "bk-item fade-up",
        style: {
          animationDelay: i * 55 + "ms"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "bk-rail"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bk-date",
        style: {
          background: d.hue + "12",
          color: d.hue
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "bk-wd"
      }, C.fmt.weekday(dt)), /*#__PURE__*/React.createElement("span", {
        className: "bk-dnum"
      }, String(dt.getDate()).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
        className: "bk-mo"
      }, C.fmt.monthYear(dt).split(" ")[0])), i < sorted.length - 1 && /*#__PURE__*/React.createElement("div", {
        className: "bk-line"
      })), /*#__PURE__*/React.createElement("div", {
        className: "bk-card"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bk-card-top"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bk-coach"
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: coach.name,
        grad: coach.grad,
        size: 46
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "bk-coach-name"
      }, coach.name), /*#__PURE__*/React.createElement("span", {
        className: "bk-pill",
        style: {
          background: d.hue + "14",
          color: d.hue
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: d.icon,
        size: 12,
        stroke: 2.2
      }), d.name))), /*#__PURE__*/React.createElement("span", {
        className: "pill pill-confirmed"
      }, /*#__PURE__*/React.createElement("span", {
        className: "dot"
      }), "Confirmed")), /*#__PURE__*/React.createElement("div", {
        className: "bk-when"
      }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 15,
        stroke: 2
      }), C.fmt.date(dt)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 15,
        stroke: 2
      }), b.time)), b.focus && /*#__PURE__*/React.createElement("div", {
        className: "bk-focus"
      }, /*#__PURE__*/React.createElement("span", {
        className: "bk-focus-lbl"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 13,
        stroke: 2.2
      }), "Your focus"), b.focus), /*#__PURE__*/React.createElement("div", {
        className: "bk-actions"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-ghost btn-sm"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "note",
        size: 15,
        stroke: 2
      }), "Add a note"), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-ghost btn-sm"
      }, "Reschedule"))));
    })));
  }
  window.MyBookings = MyBookings;
})();
;
/* COACHLY — Employee · Rise (women's mentorship) */
(function () {
  const {
    useState,
    useMemo
  } = React;
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    Avatar
  } = window.UI;

  // curated focus areas (mapped to domains for matching)
  const AREAS = [{
    id: "leadership",
    label: "Stepping into leadership"
  }, {
    id: "transitions",
    label: "A big career move"
  }, {
    id: "negotiation",
    label: "Knowing my worth & pay"
  }, {
    id: "techlead",
    label: "Growing as a technical woman"
  }, {
    id: "wellbeing",
    label: "Sustainable ambition"
  }, {
    id: "comms",
    label: "Finding my voice"
  }, {
    id: "onboarding",
    label: "Settling in as a new joiner"
  }, {
    id: "earlycareer",
    label: "Early-career direction"
  }];
  function matchMentor(areas) {
    if (!areas.length) return null;
    let best = null,
      bestScore = -1;
    C.mentors.forEach(m => {
      const score = m.focus.filter(f => areas.includes(f)).length + m.years / 100;
      if (score > bestScore) {
        bestScore = score;
        best = m;
      }
    });
    return best;
  }
  function RiseView() {
    const {
      mentorships,
      requestMentor
    } = window.useStore();
    const [areas, setAreas] = useState([]);
    const [note, setNote] = useState("");
    const existing = mentorships[0];
    const mentor = useMemo(() => matchMentor(areas), [areas]);
    const toggle = id => setAreas(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);
    if (existing) {
      const m = C.mentors.find(x => x.id === existing.mentorId);
      return /*#__PURE__*/React.createElement("div", {
        className: "page rise-page"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rise-confirm fade-up"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rc-badge"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 30,
        stroke: 2.6
      })), /*#__PURE__*/React.createElement("div", {
        className: "eyebrow rise-eye"
      }, /*#__PURE__*/React.createElement("span", {
        className: "tick"
      }), "Rise \xB7 confidential"), /*#__PURE__*/React.createElement("h1", {
        className: "rc-title"
      }, "You're matched with ", m.name.split(" ")[0], "."), /*#__PURE__*/React.createElement("p", {
        className: "rc-sub"
      }, "We've shared your request with ", m.name.split(" ")[0], " \u2014 privately, and off the record. She'll reach out within a few days to set up your first chat."), /*#__PURE__*/React.createElement("div", {
        className: "rise-mentor-card matched"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rm-top"
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: m.name,
        grad: m.grad,
        size: 64
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "rm-name"
      }, m.name), /*#__PURE__*/React.createElement("div", {
        className: "rm-role"
      }, m.role, " \xB7 ", m.years, " yrs")), /*#__PURE__*/React.createElement("span", {
        className: "pill pill-rise"
      }, /*#__PURE__*/React.createElement("span", {
        className: "dot"
      }), "Matched")), /*#__PURE__*/React.createElement("p", {
        className: "rm-bio"
      }, m.bio), /*#__PURE__*/React.createElement("div", {
        className: "rm-tags"
      }, m.tags.map(t => /*#__PURE__*/React.createElement("span", {
        key: t,
        className: "rm-tag"
      }, t)))), /*#__PURE__*/React.createElement("div", {
        className: "rise-private"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "lock",
        size: 15,
        stroke: 2.2
      }), "This pairing sits outside your reporting line. Nothing here is shared with your manager or HR.")));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "page rise-page"
    }, /*#__PURE__*/React.createElement("section", {
      className: "rise-hero fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow rise-eye"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }), "The Rise programme"), /*#__PURE__*/React.createElement("h1", {
      className: "rise-title"
    }, "Mentorship for women,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "rise-em"
    }, "by women who've been there.")), /*#__PURE__*/React.createElement("p", {
      className: "rise-lede"
    }, "Rise pairs newly-hired women with a senior woman who has walked the path \u2014 to talk candidly about growth, navigating the room, and the things that are harder to say out loud."), /*#__PURE__*/React.createElement("div", {
      className: "rise-assure"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 15,
      stroke: 2.2
    }), "Confidential"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "shield",
      size: 15,
      stroke: 2.2
    }), "Outside your reporting line"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 15,
      stroke: 2.2
    }), "No notes, no records"))), /*#__PURE__*/React.createElement("div", {
      className: "rise-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rise-form"
    }, /*#__PURE__*/React.createElement("section", {
      className: "rise-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rise-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rs-n"
    }, "1"), "What would you like a mentor for?"), /*#__PURE__*/React.createElement("p", {
      className: "rise-hint"
    }, "Pick anything that resonates \u2014 we'll use this to find the right person."), /*#__PURE__*/React.createElement("div", {
      className: "rise-areas"
    }, AREAS.map(a => /*#__PURE__*/React.createElement("button", {
      key: a.id,
      className: "rise-chip" + (areas.includes(a.id) ? " on" : ""),
      onClick: () => toggle(a.id)
    }, areas.includes(a.id) && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      stroke: 2.6
    }), a.label)))), /*#__PURE__*/React.createElement("section", {
      className: "rise-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rise-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rs-n"
    }, "2"), "Anything you'd like her to know?", /*#__PURE__*/React.createElement("span", {
      className: "rise-opt"
    }, "optional")), /*#__PURE__*/React.createElement("textarea", {
      className: "field rise-note",
      rows: 3,
      placeholder: "Share as much or as little as you like. Only your mentor will ever see this.",
      value: note,
      onChange: e => setNote(e.target.value)
    }))), /*#__PURE__*/React.createElement("aside", {
      className: "rise-match"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rise-match-label"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 14,
      stroke: 2.2
    }), "Your suggested mentor"), mentor ? /*#__PURE__*/React.createElement("div", {
      className: "rise-mentor-card fade-up",
      key: mentor.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "rm-top"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: mentor.name,
      grad: mentor.grad,
      size: 60
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "rm-name"
    }, mentor.name), /*#__PURE__*/React.createElement("div", {
      className: "rm-role"
    }, mentor.role, " \xB7 ", mentor.years, " yrs"))), /*#__PURE__*/React.createElement("p", {
      className: "rm-bio"
    }, mentor.bio), /*#__PURE__*/React.createElement("div", {
      className: "rm-tags"
    }, mentor.tags.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "rm-tag"
    }, t))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-rise btn-block",
      onClick: () => requestMentor(mentor, areas, note)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16,
      stroke: 2.2
    }), "Request ", mentor.name.split(" ")[0], " as my mentor"), /*#__PURE__*/React.createElement("div", {
      className: "rm-reassure"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 13,
      stroke: 2.2
    }), "Sent privately \u2014 she can say yes, and no one else is told.")) : /*#__PURE__*/React.createElement("div", {
      className: "rise-match-empty"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rme-mark"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 26,
      stroke: 1.7
    })), /*#__PURE__*/React.createElement("p", null, "Choose a focus area and we'll suggest a senior woman who's been exactly where you are.")))));
  }
  window.RiseView = RiseView;
})();
;
/* COACHLY — Coach workspace (availability + booked sessions) */
(function () {
  const {
    useMemo
  } = React;
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    Avatar
  } = window.UI;
  const TIMES = [[9, 0], [10, 30], [11, 0], [13, 0], [14, 30], [16, 0]];
  const DAYS_AHEAD = 12;
  function CoachWorkspace() {
    const {
      COACH_ME,
      availability,
      addAvailability,
      removeAvailability,
      coachSessions,
      showToast
    } = window.useStore();
    const me = C.coaches.find(c => c.id === COACH_ME);
    const d = C.domainById[me.domain];
    const mySlots = availability[COACH_ME] || [];

    // build weekday list (skip Sat/Sun) for the next DAYS_AHEAD days
    const days = useMemo(() => {
      const out = [];
      for (let off = 1; off <= DAYS_AHEAD && out.length < 8; off++) {
        const dt = new Date(C.TODAY);
        dt.setDate(dt.getDate() + off);
        const wd = dt.getDay();
        if (wd === 0 || wd === 6) continue;
        out.push({
          off,
          dt
        });
      }
      return out;
    }, []);
    const slotFor = (off, h, m) => mySlots.find(s => s.dayOffset === off && s.h === h && s.m === m);
    const toggle = (off, dt, h, m) => {
      const ex = slotFor(off, h, m);
      if (ex) {
        removeAvailability(COACH_ME, ex.id);
        showToast("Slot removed", "default");
      } else {
        const slot = {
          id: "av-" + off + "-" + h + "-" + m + "-" + Math.random().toString(36).slice(2, 6),
          dayOffset: off,
          date: dt.toISOString(),
          h,
          m,
          label: C.fmt.weekday(dt) + " " + C.fmt.date(dt),
          time: C.fmt.time(h, m)
        };
        addAvailability(COACH_ME, slot);
        showToast("Slot opened · " + C.fmt.time(h, m), "success");
      }
    };
    const sessions = [...coachSessions].sort((a, b) => a.dayOffset - b.dayOffset || a.h * 60 + a.m - (b.h * 60 + b.m));
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("section", {
      className: "cw-head fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-id"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: me.name,
      grad: me.grad,
      size: 62
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }), "Coach workspace"), /*#__PURE__*/React.createElement("h1", {
      className: "cw-name"
    }, me.name), /*#__PURE__*/React.createElement("span", {
      className: "cw-dom",
      style: {
        background: d.hue + "14",
        color: d.hue
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: d.icon,
      size: 13,
      stroke: 2.2
    }), d.name))), /*#__PURE__*/React.createElement("div", {
      className: "cw-stats"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-stat"
    }, /*#__PURE__*/React.createElement("b", null, mySlots.length), /*#__PURE__*/React.createElement("span", null, "Open slots")), /*#__PURE__*/React.createElement("div", {
      className: "cw-stat"
    }, /*#__PURE__*/React.createElement("b", null, sessions.length), /*#__PURE__*/React.createElement("span", null, "Booked")), /*#__PURE__*/React.createElement("div", {
      className: "cw-stat"
    }, /*#__PURE__*/React.createElement("b", null, me.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", null, "Rating")), /*#__PURE__*/React.createElement("div", {
      className: "cw-stat"
    }, /*#__PURE__*/React.createElement("b", null, me.sessions), /*#__PURE__*/React.createElement("span", null, "Lifetime")))), /*#__PURE__*/React.createElement("div", {
      className: "cw-grid"
    }, /*#__PURE__*/React.createElement("section", {
      className: "cw-avail fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-sec-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "cw-sec-title"
    }, "Your availability"), /*#__PURE__*/React.createElement("p", {
      className: "cw-sec-sub"
    }, "Tap a time to open or close it. Employees can only book slots you've opened.")), /*#__PURE__*/React.createElement("span", {
      className: "cw-legend"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cwl on"
    }), "Open", /*#__PURE__*/React.createElement("span", {
      className: "cwl"
    }), "Closed")), /*#__PURE__*/React.createElement("div", {
      className: "cw-table"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-thead"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cw-day-cell"
    }), TIMES.map(([h, m]) => /*#__PURE__*/React.createElement("span", {
      key: h + "-" + m,
      className: "cw-th"
    }, C.fmt.time(h, m)))), days.map(({
      off,
      dt
    }) => /*#__PURE__*/React.createElement("div", {
      key: off,
      className: "cw-trow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-day-cell"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cw-day-wd"
    }, C.fmt.weekday(dt)), /*#__PURE__*/React.createElement("span", {
      className: "cw-day-dt"
    }, String(dt.getDate()).padStart(2, "0"), " ", C.fmt.monthYear(dt).split(" ")[0])), TIMES.map(([h, m]) => {
      const on = !!slotFor(off, h, m);
      return /*#__PURE__*/React.createElement("button", {
        key: h + "-" + m,
        className: "cw-cell" + (on ? " on" : ""),
        onClick: () => toggle(off, dt, h, m),
        "aria-label": (on ? "Close " : "Open ") + C.fmt.time(h, m)
      }, on ? /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 15,
        stroke: 2.6
      }) : /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 14,
        stroke: 2.2
      }));
    }))))), /*#__PURE__*/React.createElement("aside", {
      className: "cw-sessions fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-sec-head sticky"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "cw-sec-title"
    }, "Upcoming sessions"), /*#__PURE__*/React.createElement("p", {
      className: "cw-sec-sub"
    }, sessions.length, " booked with you"))), /*#__PURE__*/React.createElement("div", {
      className: "cw-slist"
    }, sessions.map((s, i) => {
      const dt = new Date(C.TODAY);
      dt.setDate(dt.getDate() + s.dayOffset);
      return /*#__PURE__*/React.createElement("div", {
        key: s.id,
        className: "cw-scard" + (s.isYou ? " you" : "")
      }, /*#__PURE__*/React.createElement("div", {
        className: "cw-sdate"
      }, /*#__PURE__*/React.createElement("span", {
        className: "cw-swd"
      }, C.fmt.weekday(dt)), /*#__PURE__*/React.createElement("span", {
        className: "cw-sd"
      }, String(dt.getDate()).padStart(2, "0"))), /*#__PURE__*/React.createElement("div", {
        className: "cw-sbody"
      }, /*#__PURE__*/React.createElement("div", {
        className: "cw-swho"
      }, s.who, s.isYou && /*#__PURE__*/React.createElement("span", {
        className: "cw-youtag"
      }, "you")), /*#__PURE__*/React.createElement("div", {
        className: "cw-smeta"
      }, s.team, " \xB7 ", C.fmt.time(s.h, s.m)), s.focus && /*#__PURE__*/React.createElement("div", {
        className: "cw-sfocus"
      }, "\"", s.focus, "\"")));
    }), sessions.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "cw-sempty"
    }, "No sessions booked yet. Open some slots to get started.")))));
  }
  window.CoachWorkspace = CoachWorkspace;
})();
;
/* COACHLY — HR Analytics dashboard */
(function () {
  const Icon = window.Icon;
  const C = window.COMPASS;
  const {
    CountUp,
    Avatar
  } = window.UI;
  const {
    AreaChart,
    Donut
  } = window.CompassCharts;
  const ACTIVITY = [{
    who: "Liam Brooks",
    action: "booked",
    coach: "c1",
    when: "9:30am · today"
  }, {
    who: "A new joiner",
    action: "rise",
    coach: "m4",
    when: "11:15am · today"
  }, {
    who: "Aisha Khan",
    action: "booked",
    coach: "c4",
    when: "2:15pm · yesterday"
  }, {
    who: "Diego Fernández",
    action: "completed",
    coach: "c5",
    when: "4:30pm · yesterday"
  }, {
    who: "A new joiner",
    action: "rise",
    coach: "m2",
    when: "10:00am · 02 Jun 2026"
  }, {
    who: "Hannah Wu",
    action: "booked",
    coach: "c3",
    when: "3:00pm · 02 Jun 2026"
  }];
  function ActivityRow({
    a
  }) {
    const isRise = a.action === "rise";
    const person = isRise ? C.mentors.find(m => m.id === a.coach) : C.coaches.find(c => c.id === a.coach);
    const label = a.action === "booked" ? /*#__PURE__*/React.createElement(React.Fragment, null, "booked a session with ", /*#__PURE__*/React.createElement("b", null, person.name)) : a.action === "completed" ? /*#__PURE__*/React.createElement(React.Fragment, null, "completed a session with ", /*#__PURE__*/React.createElement("b", null, person.name)) : /*#__PURE__*/React.createElement(React.Fragment, null, "was matched with Rise mentor ", /*#__PURE__*/React.createElement("b", null, person.name));
    return /*#__PURE__*/React.createElement("div", {
      className: "act-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "act-ico " + a.action
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.action === "rise" ? "heart" : a.action === "completed" ? "check" : "calendar",
      size: 15,
      stroke: 2.2
    })), /*#__PURE__*/React.createElement("div", {
      className: "act-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "act-text"
    }, /*#__PURE__*/React.createElement("b", null, a.who), " ", label), /*#__PURE__*/React.createElement("div", {
      className: "act-when"
    }, a.when)));
  }
  function HRDashboard() {
    const {
      bookings,
      mentorships
    } = window.useStore();
    const k = C.analytics.kpis;
    const sessionsTotal = k.sessionsYTD + Math.max(0, bookings.length - 1);
    const riseTotal = k.mentorships + mentorships.length;
    const kpis = [{
      icon: "calendar",
      label: "Sessions booked",
      sub: "year to date",
      value: sessionsTotal,
      color: "var(--violet)",
      soft: "var(--brand-soft)",
      trend: "+18% vs last quarter"
    }, {
      icon: "users",
      label: "Active coaches",
      sub: "this month",
      value: k.activeCoaches,
      color: "#1F8517",
      soft: "#E4F9D3",
      trend: "all fully onboarded"
    }, {
      icon: "star",
      label: "Satisfaction",
      sub: "avg rating",
      value: k.satisfaction,
      decimals: 1,
      color: "#DB8502",
      soft: "#FFF1E3",
      trend: "1,284 reviews"
    }, {
      icon: "heart",
      label: "Rise mentorships",
      sub: "women matched",
      value: riseTotal,
      color: "var(--rise)",
      soft: "var(--rise-soft)",
      trend: "+9 this quarter"
    }];
    const maxDom = Math.max(...C.analytics.byDomain.map(x => x.value));
    return /*#__PURE__*/React.createElement("div", {
      className: "page"
    }, /*#__PURE__*/React.createElement("header", {
      className: "hr-head fade-up"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tick"
    }), "People analytics"), /*#__PURE__*/React.createElement("h1", {
      className: "hr-title"
    }, "Coaching & mentorship"), /*#__PURE__*/React.createElement("p", {
      className: "hr-sub"
    }, "A read on how Coachly is landing across the org. Year to date \xB7 ", C.fmt.monthYear(C.TODAY), ".")), /*#__PURE__*/React.createElement("button", {
      className: "hr-range-btn"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 15,
      stroke: 2
    }), "Jan 2026 \u2013 Jun 2026", /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 14,
      stroke: 2.2
    }))), /*#__PURE__*/React.createElement("div", {
      className: "hr-kpis fade-up"
    }, kpis.map(kp => /*#__PURE__*/React.createElement("div", {
      key: kp.label,
      className: "hr-kpi"
    }, /*#__PURE__*/React.createElement("span", {
      className: "hr-kpi-ico",
      style: {
        background: kp.soft,
        color: kp.color
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: kp.icon,
      size: 20,
      stroke: 2
    })), /*#__PURE__*/React.createElement("div", {
      className: "hr-kpi-val"
    }, /*#__PURE__*/React.createElement(CountUp, {
      value: kp.value,
      decimals: kp.decimals || 0
    })), /*#__PURE__*/React.createElement("div", {
      className: "hr-kpi-lbl"
    }, kp.label), /*#__PURE__*/React.createElement("div", {
      className: "hr-kpi-sub"
    }, kp.sub), /*#__PURE__*/React.createElement("div", {
      className: "hr-kpi-trend"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trendUp",
      size: 13,
      stroke: 2.4
    }), kp.trend)))), /*#__PURE__*/React.createElement("div", {
      className: "hr-charts"
    }, /*#__PURE__*/React.createElement("section", {
      className: "hr-panel fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hr-panel-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "hr-panel-title"
    }, "Sessions & mentorships"), /*#__PURE__*/React.createElement("p", {
      className: "hr-panel-sub"
    }, "Monthly, this year")), /*#__PURE__*/React.createElement("div", {
      className: "hr-legend"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      className: "hl-dot",
      style: {
        background: "#0063D0"
      }
    }), "Sessions"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      className: "hl-dot dash",
      style: {
        background: "#FA7A25"
      }
    }), "Mentorships"))), /*#__PURE__*/React.createElement(AreaChart, {
      months: C.analytics.months,
      sessions: C.analytics.sessionsSeries,
      mentorships: C.analytics.mentorshipsSeries
    })), /*#__PURE__*/React.createElement("section", {
      className: "hr-panel fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hr-panel-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "hr-panel-title"
    }, "By domain"), /*#__PURE__*/React.createElement("p", {
      className: "hr-panel-sub"
    }, "Share of sessions"))), /*#__PURE__*/React.createElement(Donut, {
      data: C.analytics.byDomain
    }))), /*#__PURE__*/React.createElement("div", {
      className: "hr-bottom"
    }, /*#__PURE__*/React.createElement("section", {
      className: "hr-panel fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hr-panel-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "hr-panel-title"
    }, "Top domains"), /*#__PURE__*/React.createElement("p", {
      className: "hr-panel-sub"
    }, "Sessions delivered, YTD"))), /*#__PURE__*/React.createElement("div", {
      className: "hr-bars"
    }, C.analytics.byDomain.slice(0, 6).map(row => {
      const dm = C.domainById[row.id];
      return /*#__PURE__*/React.createElement("div", {
        key: row.id,
        className: "hr-bar-row"
      }, /*#__PURE__*/React.createElement("span", {
        className: "hr-bar-name"
      }, /*#__PURE__*/React.createElement("span", {
        className: "hr-bar-dot",
        style: {
          background: dm.hue
        }
      }), dm.name), /*#__PURE__*/React.createElement("div", {
        className: "hr-bar-track"
      }, /*#__PURE__*/React.createElement("div", {
        className: "hr-bar-fill",
        style: {
          width: row.value / maxDom * 100 + "%",
          background: dm.hue
        }
      })), /*#__PURE__*/React.createElement("span", {
        className: "hr-bar-val"
      }, row.value));
    }))), /*#__PURE__*/React.createElement("section", {
      className: "hr-panel fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hr-panel-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "hr-panel-title"
    }, "Recent activity"), /*#__PURE__*/React.createElement("p", {
      className: "hr-panel-sub"
    }, "Across the org")), /*#__PURE__*/React.createElement("span", {
      className: "hr-live"
    }, /*#__PURE__*/React.createElement("span", {
      className: "hr-live-dot"
    }), "Live")), /*#__PURE__*/React.createElement("div", {
      className: "act-list"
    }, ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement(ActivityRow, {
      key: i,
      a: a
    }))))));
  }
  window.HRDashboard = HRDashboard;
})();
;
/* COACHLY — Tweaks (applies CSS vars + classes to :root) */
(function () {
  const {
    useEffect
  } = React;
  const {
    useTweaks,
    TweaksPanel,
    TweakSection,
    TweakRadio,
    TweakColor,
    TweakToggle
  } = window;
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "nav": "sidebar",
    "accent": "#FA7A25",
    "rise": "rose",
    "canvas": "warm",
    "density": "comfortable",
    "voice": true
  } /*EDITMODE-END*/;
  const ACCENT_SOFT = {
    "#FA7A25": "#FFF1E3",
    "#0063D0": "#EAF2FC",
    "#1F8517": "#E4F9D3",
    "#7729D6": "#F0E6FC"
  };
  const RISE = {
    rose: {
      c: "#C4456E",
      deep: "#9E2F54",
      soft: "#FBEDF1",
      blush: "#FCF4F0",
      grad: "linear-gradient(125deg,#EC8AAA,#D45B81 52%,#C4456E 120%)"
    },
    purple: {
      c: "#7729D6",
      deep: "#581CB3",
      soft: "#F0E6FC",
      blush: "#F7F1FE",
      grad: "linear-gradient(125deg,#B98CF5,#9450E6 52%,#7729D6 120%)"
    },
    amber: {
      c: "#ED6105",
      deep: "#C24E00",
      soft: "#FFF1E3",
      blush: "#FFF7F0",
      grad: "linear-gradient(125deg,#FFB867,#FA7A25 52%,#ED6105 120%)"
    }
  };
  const CANVAS = {
    warm: {
      c: "#F3EEE6",
      c2: "#EFE9DF",
      line: "#E6DFD2"
    },
    cool: {
      c: "#F2F4F7",
      c2: "#EAEDF1",
      line: "#E2E6EC"
    },
    white: {
      c: "#FAFAFA",
      c2: "#F3F3F4",
      line: "#ECECEE"
    }
  };
  function CornerTweaks() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    useEffect(() => {
      const root = document.documentElement;
      const s = root.style;
      // accent
      s.setProperty("--accent", t.accent);
      s.setProperty("--accent-soft", ACCENT_SOFT[t.accent] || "#FFF1E3");
      // rise family
      const r = RISE[t.rise] || RISE.rose;
      s.setProperty("--rise", r.c);
      s.setProperty("--rise-deep", r.deep);
      s.setProperty("--rise-soft", r.soft);
      s.setProperty("--rise-blush", r.blush);
      s.setProperty("--rise-gradient", r.grad);
      // canvas
      const cv = CANVAS[t.canvas] || CANVAS.warm;
      s.setProperty("--canvas", cv.c);
      s.setProperty("--canvas-2", cv.c2);
      s.setProperty("--paper-line", cv.line);
      // classes
      root.classList.toggle("nav-top", t.nav === "top");
      root.classList.toggle("density-compact", t.density === "compact");
      root.classList.toggle("no-voice", !t.voice);
    }, [t]);
    return /*#__PURE__*/React.createElement(TweaksPanel, {
      title: "Tweaks"
    }, /*#__PURE__*/React.createElement(TweakSection, {
      label: "Layout"
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Navigation",
      value: t.nav,
      options: ["sidebar", "top"],
      onChange: v => setTweak("nav", v)
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Density",
      value: t.density,
      options: ["comfortable", "compact"],
      onChange: v => setTweak("density", v)
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Colour"
    }), /*#__PURE__*/React.createElement(TweakColor, {
      label: "Warmth accent",
      value: t.accent,
      options: ["#FA7A25", "#0063D0", "#1F8517", "#7729D6"],
      onChange: v => setTweak("accent", v)
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Rise accent",
      value: t.rise,
      options: ["rose", "purple", "amber"],
      onChange: v => setTweak("rise", v)
    }), /*#__PURE__*/React.createElement(TweakRadio, {
      label: "Canvas",
      value: t.canvas,
      options: ["warm", "cool", "white"],
      onChange: v => setTweak("canvas", v)
    }), /*#__PURE__*/React.createElement(TweakSection, {
      label: "Content"
    }), /*#__PURE__*/React.createElement(TweakToggle, {
      label: "Coach voice lines",
      value: t.voice,
      onChange: v => setTweak("voice", v)
    }));
  }
  window.CornerTweaks = CornerTweaks;
})();
;
/* COACHLY "In Your Corner" — app shell: sidebar, topbar, role switch, routing */
(function () {
  const {
    useState
  } = React;
  const Icon = window.Icon;
  const C = window.COMPASS;
  const ROLES = [{
    id: "employee",
    label: "Employee",
    icon: "users"
  }, {
    id: "coach",
    label: "Coach",
    icon: "compass"
  }, {
    id: "hr",
    label: "HR Analytics",
    icon: "chart"
  }];
  function CornerMark({
    size = 24,
    color = "#fff"
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2.1",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 8a3.5 3.5 0 0 1 3.5-3.5h9A3.5 3.5 0 0 1 20 8v5.5a3.5 3.5 0 0 1-3.5 3.5H10l-4 3.4V17a3.5 3.5 0 0 1-2-3.2z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.4 12.4l2.4-2.4 1.9 1.9 3-3"
    }));
  }
  window.CornerMark = CornerMark;
  function empNav(bookings, mentorships) {
    return [{
      id: "find",
      label: "Find a coach",
      icon: "search"
    }, {
      id: "bookings",
      label: "My bookings",
      icon: "calendar",
      badge: bookings.length
    }, {
      id: "rise",
      label: "Rise",
      icon: "heart",
      rise: true,
      badge: mentorships.length
    }];
  }
  function Sidebar() {
    const {
      role,
      setRole,
      view,
      setView,
      bookings,
      mentorships
    } = window.useStore();
    const nav = role === "employee" ? empNav(bookings, mentorships) : role === "coach" ? [{
      id: "coach",
      label: "My coaching",
      icon: "calendar"
    }] : [{
      id: "hr",
      label: "Analytics",
      icon: "chart"
    }];
    const onNav = id => {
      if (role === "employee") setView(id);
    };
    const activeId = role === "employee" ? view : nav[0].id;
    return /*#__PURE__*/React.createElement("aside", {
      className: "sidebar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sb-brand",
      onClick: () => {
        setRole("employee");
        setView("find");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "sb-mark"
    }, /*#__PURE__*/React.createElement(CornerMark, {
      size: 23
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "sb-name"
    }, "Coachly"), /*#__PURE__*/React.createElement("div", {
      className: "sb-tag"
    }, "In your corner"))), /*#__PURE__*/React.createElement("div", {
      className: "sb-section"
    }, role === "employee" ? "Your coaching" : role === "coach" ? "Coach space" : "Overview"), /*#__PURE__*/React.createElement("nav", {
      className: "sb-nav"
    }, nav.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "sb-link" + (activeId === n.id ? " on" : "") + (n.rise ? " rise" : ""),
      onClick: () => onNav(n.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "sb-ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 19,
      stroke: 2
    })), n.label, n.badge > 0 && /*#__PURE__*/React.createElement("span", {
      className: "sb-badge"
    }, n.badge)))), /*#__PURE__*/React.createElement("div", {
      className: "sb-spacer"
    }), /*#__PURE__*/React.createElement("div", {
      className: "role-switch"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rs-label"
    }, "Viewing as"), /*#__PURE__*/React.createElement("div", {
      className: "role-seg"
    }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
      key: r.id,
      className: "role-opt" + (role === r.id ? " on" : ""),
      onClick: () => setRole(r.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ro-ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.icon,
      size: 17,
      stroke: 2
    })), r.label, /*#__PURE__*/React.createElement("span", {
      className: "ro-dot"
    }))))));
  }
  function Topbar() {
    const {
      role,
      setRole
    } = window.useStore();
    const [open, setOpen] = useState(false);
    const cur = ROLES.find(r => r.id === role);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tb-brand"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tb-mark"
    }, /*#__PURE__*/React.createElement(CornerMark, {
      size: 19
    })), /*#__PURE__*/React.createElement("div", {
      className: "tb-name"
    }, "Coachly")), /*#__PURE__*/React.createElement("div", {
      className: "tb-spacer"
    }), /*#__PURE__*/React.createElement("button", {
      className: "tb-role",
      onClick: () => setOpen(true)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ro-ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cur.icon,
      size: 15,
      stroke: 2
    })), cur.label, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronDown",
      size: 14,
      stroke: 2.2
    }))), open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "role-sheet-back",
      onClick: () => setOpen(false)
    }), /*#__PURE__*/React.createElement("div", {
      className: "role-sheet"
    }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
      key: r.id,
      className: "role-opt" + (role === r.id ? " on" : ""),
      onClick: () => {
        setRole(r.id);
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ro-ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.icon,
      size: 18,
      stroke: 2
    })), r.label, /*#__PURE__*/React.createElement("span", {
      className: "ro-dot"
    }))))));
  }
  function MobileTabbar() {
    const {
      role,
      view,
      setView,
      bookings,
      mentorships
    } = window.useStore();
    if (role !== "employee") return null;
    const nav = empNav(bookings, mentorships);
    return /*#__PURE__*/React.createElement("nav", {
      className: "mobile-tabbar"
    }, nav.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "mt-link" + (view === n.id ? " on" : "") + (n.rise ? " rise" : ""),
      onClick: () => setView(n.id)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 21,
      stroke: 2
    }), n.badge > 0 && /*#__PURE__*/React.createElement("span", {
      className: "mt-badge"
    }, n.badge)), n.label.replace("Find a coach", "Find"))));
  }

  // desktop horizontal nav (used when nav=top tweak)
  function DeskHead() {
    const {
      role,
      setRole,
      view,
      setView,
      bookings,
      mentorships
    } = window.useStore();
    const nav = role === "employee" ? empNav(bookings, mentorships) : role === "coach" ? [{
      id: "coach",
      label: "My coaching",
      icon: "calendar"
    }] : [{
      id: "hr",
      label: "Analytics",
      icon: "chart"
    }];
    const activeId = role === "employee" ? view : nav[0].id;
    return /*#__PURE__*/React.createElement("header", {
      className: "deskhead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dh-brand",
      onClick: () => {
        setRole("employee");
        setView("find");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "tb-mark"
    }, /*#__PURE__*/React.createElement(CornerMark, {
      size: 19
    })), /*#__PURE__*/React.createElement("div", {
      className: "tb-name"
    }, "Coachly")), /*#__PURE__*/React.createElement("nav", {
      className: "dh-nav"
    }, nav.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "dh-link" + (activeId === n.id ? " on" : "") + (n.rise ? " rise" : ""),
      onClick: () => role === "employee" && setView(n.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 17,
      stroke: 2
    }), n.label, n.badge > 0 && /*#__PURE__*/React.createElement("span", {
      className: "sb-badge"
    }, n.badge)))), /*#__PURE__*/React.createElement("div", {
      className: "dh-spacer"
    }), /*#__PURE__*/React.createElement("div", {
      className: "dh-roles"
    }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
      key: r.id,
      className: "dh-role" + (role === r.id ? " on" : ""),
      onClick: () => setRole(r.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: r.icon,
      size: 15,
      stroke: 2
    }), /*#__PURE__*/React.createElement("span", {
      className: "dh-role-lbl"
    }, r.label)))));
  }
  function Routed() {
    const {
      role,
      view
    } = window.useStore();
    if (role === "coach") return /*#__PURE__*/React.createElement(window.CoachWorkspace, null);
    if (role === "hr") return /*#__PURE__*/React.createElement(window.HRDashboard, null);
    if (view === "bookings") return /*#__PURE__*/React.createElement(window.MyBookings, null);
    if (view === "rise") return /*#__PURE__*/React.createElement(window.RiseView, null);
    return /*#__PURE__*/React.createElement(window.FindCoach, null);
  }
  function App() {
    const {
      role,
      view
    } = window.useStore();
    const riseOn = role === "employee" && view === "rise";
    return /*#__PURE__*/React.createElement("div", {
      className: "app" + (riseOn ? " rise-on" : "")
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement(DeskHead, null), /*#__PURE__*/React.createElement("div", {
      className: "main"
    }, /*#__PURE__*/React.createElement(Topbar, null), /*#__PURE__*/React.createElement("div", {
      className: "main-scroll"
    }, /*#__PURE__*/React.createElement(Routed, null)), /*#__PURE__*/React.createElement(MobileTabbar, null)), /*#__PURE__*/React.createElement(window.BookingPanel, null), /*#__PURE__*/React.createElement(window.UI.Toast, null), window.CornerTweaks ? /*#__PURE__*/React.createElement(window.CornerTweaks, null) : null);
  }
  function Root() {
    return /*#__PURE__*/React.createElement(window.StoreProvider, null, /*#__PURE__*/React.createElement(App, null));
  }
  window.CornerRoot = Root;
})();
;
const mount = () => {
  if (!window.CornerRoot) {
    setTimeout(mount, 30);
    return;
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(window.CornerRoot, null));
};
mount();
