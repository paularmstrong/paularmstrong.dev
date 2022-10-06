---
layout: '~/layouts/BlogPost.astro'
title: 'Creating a modern wedding website in 2022: Introduction'
description: Multi-part series documenting how to create a modern realtime RSVP-enabled wedding website using Google Firebase, React, Tailwindcss, and Parcel.
authors: paularmstrong
pubDate: 2022-06-04T00:00
tags:
  - amazon
  - amplify
  - google
  - firebase
  - wedding
---

Weddings are _expensive_. Trying to do one on a budget while following the social norms and expectations of planning and putting on a wedding just don't really mix. After getting engaged, Kelly and I discussed what we did and _definitely did not_ want when it came to our wedding.

<figure>
  <div style={{ borderRadius: 5, overflow: 'hidden' }}>
    <img src="/img/blog/wedding/proposal.jpg" alt="Proposal" />
  </div>
  <figcaption>Oh hey, I'm getting married!</figcaption>
</figure>

One of the first things to do that we threw out was the idea of sending paper invites. Not only is it incredibly wasteful, but we had just received a wedding invitation in the mail and it just seemed expensive, tacky, and impersonal. Take this RSVP card option that comes from _popular wedding registry website redacted_:

<!-- truncate -->

<ImageWrapper maxWidth="400px">
  <img src="/img/blog/wedding/the-knot-rsvp.jpg" alt="RSVP cards from The Knot" />
</ImageWrapper>

Call me _not_ old-fashioned, but the “M\_\_\_\_” line makes no sense to me. After researching, I guess you're supposed to fill in “Mr…”, “Mrs…”, or “Ms…”, but who uses that anymore? And what if you’re extra fancy and it should be “Dr…”? But really, _why isn't this filled in **for me**_? You should know who I am!

And you know what else? I'm just going to lose that if you send it to me. I'm not saying it happened… well, actually yeah it happened.

## Do something better

So we decided we could do something better. I figure I've been building websites long enough that I should be able to handle it.

The following series will recount building a modern wedding website as a replacement for paper snail mail RSVPs.

## Requirements

Before starting, we made a list of things that we needed in terms of functionality both for us and for our guests:

- Free or _very cheap_ hosting (wedding websites like theknot are already free, afterall) with a custom domain and SSL
- Invitees must be able to
  - Sign in with their email address and no password (magic link email)
  - Manage their RSVP, as well as their plus-one and/or family, directly on the site
  - View a schedule of events with maps, times, details
  - RSVP separately for optional hosted events
  - Receive automated emails for their invitation and RSVP confirmation
- All significant information must come from a protected database
  - For example, exact dates & locations should require authentication and not be compiled directly into JavaScript/HTML bundles
  - Mostly this is minor paranoia on my part to have _some_ security on private information
- Ability to import guest/invitee information from CSV
  - Immediately send invitation emails upon import
- Ability to export RSVPs to a CSV for use in a spreadsheet (no "admin" site necessary)
  - Spreadsheets are much quicker for iteration and data manipulation than writing, committing, and deploying code
  - Allows my partner to have freedom and ownership
- Minimal maintenance overhead
  - I'm not going to be "on-call" for this. I just want it up and running.

:::info[Multi-part series]

This is the beginning of a multi-part series. The following other posts are ready now. Check back soon for more!

1. [**Introduction**](index.mdx)
2. [Part 1: Choosing the tools](part-1.mdx)
3. _More coming soon!_

:::