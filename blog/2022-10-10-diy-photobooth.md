---
title: DIY photo booth
draft: true
pubDate: 2022-10-10
---

I recently [got married]() and as we know, weddings are _expensive_. Previously, I documented saving money by [creating my own website]() and foregoing spending money on paper RSVPs. We also decided to skip paying a photographer the exorbitant extra fees to also photograph our reception, but we still wanted to have lots of memories from the event.

I've always loved getting in photo booths, having a bunch of laughs, and keeping the printed photos for later. But do you know how much a photobooth rental is? At _least_ $1,500! And even then, they usually print out photos instead of providing a digital version that you can actually save and use long-term.

Well, in keeping with my theme of not spending money, but instead spending _way too much time_ over-engineering a similar solution: I set out to build my own. And I succeeded.

---

## Plan

- Website w/ webcam
  - Electron application
  - Webcam
- Open GoPro
  - scratch, gopro as webcam
- controls: streamdeck
- state machine
  - xstate
  - save files
  - uploads
- ui
  - tailwindcss
  - ever-present video
- controls: touch screen
- cost breakdown

## Original plan

GoPro has an API called [Open GoPro](https://gopro.github.io/OpenGoPro/)? It's a fully documented API spec to control their cameras over Bluetooth LE, WiFi, and USB (some protocols better than others).

Unfortunately, after buying a brand new GoPro Hero 10 ($350) and spending at least 30 hours with the API over USB, I had to throw out the idea of using the API. The fact of it is that GoPro cameras are just _very slow_ at taking photos and being ready to take another photo. Probably fine out in the wild, since the cameras are rarely used for photos – typically just action video, but in a setting where timing and speed are key, controlling the camera with the API was just an absolute failure.

However, GoPros can also be used as webcams now, given that you have [the GoPro Webcam app](https://community.gopro.com/s/article/GoPro-Webcam) installed.

## Backup plan

## Cost breakdown

| What                                                                                                                               | Cost     | Actual cost   |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| [Elgato Stream Deck Mini](https://www.elgato.com/en/stream-deck-mini)                                                              | owned    | $80           |
| [Portable USB-C screen](https://www.amazon.com/Lepow-C2S-1920%C3%971080P-Kickstand-Black/dp/B09H2WF8TY?ref_=ast_sto_dp&th=1&psc=1) | borrowed | $190          |
| [GoPro Hero 10](https://gopro.com/en/us/shop/cameras/hero10-black/CHDHX-101-master.html)                                           | owned    | $350          |
| [12" LED ring light](https://www.amazon.com/gp/product/B08DD36M29/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1)                | $40      | $40           |
| Wood & supplies for structure                                                                                                      | gifted   | ?             |
| Total                                                                                                                              | $40      | at least $660 |

So, given the cost breakdown, I like to tell myself that I only spent about $40 on the entire build – and even if I count every piece of hardware (less the actual computer that has to run the app), I would still be spending about $1,000 less than if I had rented a photobooth.

However, if you count how my time is worth money as well, I probably spent at least 100 hours in total across software and physical structure building – maybe more. I don't even want to try calculating a dollar amount on this.

I like to keep in mind that the time spent was also an investment into my own skills. I can now say that I've gone through building at least a decent piece of software using Electron, dug pretty deep into proper state machines, and become intimately familiar with the web Media APIs.
