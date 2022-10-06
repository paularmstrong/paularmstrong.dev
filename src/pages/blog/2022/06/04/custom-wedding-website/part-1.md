---
layout: '~/layouts/BlogPost.astro'
title: 'Creating a modern wedding website in 2022 Part 1: Choosing the tools'
description: This part of the modern wedding website series will cover tools chosen to satisfy requirements of creating a modern wedding website in 2022.
authors: paularmstrong
pubDate: 2022-06-04T01:00
tags:
  - amazon
  - amplify
  - google
  - firebase
  - wedding
---

:::info[Multi-part series]

In the [introduction](index.mdx) to this series, we covered the rationale for building a custom wedding website, as well as the requirements that we laid out for ourselves.

:::

Now that we know _what_ we need, it’s time to choose the right tools for the job. From our previously set requirements, the following items stood out as important for what we choose here:

- Free or _very cheap_ hosting with a custom domain and SSL
- Invitees must be able to
  - Sign in with their email address and no password (magic link email)
  - Receive automated emails for their invitation and RSVP confirmation
- All significant information must come from a protected database

<!-- truncate -->

## Hosting & backend

### Google Firebase

![Firebase logo](/img/blog/wedding/firebase.png)

I’ve used [Google Firebase](https://firebase.google.com/) before, but never deployed a full web application for it. It has always been a bit more tailored for native mobile apps, but I have seen that they’ve worked really hard in making the web tools top-notch.

#### Downsides

- Locking in to Google
- Worse, Firebase is full lock-in and you can’t just replace the API with a different REST of GraphQL endpoint like you could with Amplify. Maybe you could refactor out to [Supabase](https://supabase.com/) or another similar alternative, but your options are still very limited.
- Despite efforts to trim bundle sizes, Firebase JavaScript packages still come in pretty hefty.

#### Blockers

There are no blockers given the [requirements](#requirements) that I initially laid out.

### Alternatives considered

Hosting and backend framework evalutation can get long and tiring. I considered a few others otuside of Google Firebase – at least one of them I had initially thought I would end up using before considering Firebase.

<details>
  <summary>Click to expand alternatives considered ↕</summary>

#### AWS Amplify

![AWS Amplify logo](/img/blog/wedding/aws-amplify.png)

Initially, I had hoped to be able to try out [AWS Amplify](https://docs.amplify.aws/). It would be an opportunity to learn something new that I hadn’t worked with before. It has a free tier and I thought it should cover everything that I wanted. Unfortunately there were roadblocks from the start.

##### Downsides

- The documentation pushed me through a web wizard. This wizard, while neat and provided a small overview to me of what might be capable, I tend to only really learn by _doing_ and writing code. I did find the docs I needed eventually by searching for "AWS Amplify getting started JavaScript".
- "To set up the project, we’ll first create a new React app with create-react-app" -- I don’t want create-react-app! Where are the instructions to do this differently?
- Everything in their documentation kept pushing me at `@aws-amplify/ui-react`. It seemed basic enough, but wanting to get this together quickly, I didn’t want to _also_ learn another UI component framework.
- Locking in to Amazon
- It seemed like Amplify is really just a little piece of the Amazon puzzle and I’d mostly need to string a bunch of services together, eg SES for sending emails.

##### Blockers

Unfortunately, there were a number of blockers that came up for me during investigation and prototyping:

- It’s not possible to sign in with just an email address.
- I really didn’t want to use GraphQL, even if it’s the "new hotness". That’s just overkill for what I was looking to do.
- REST might have been okay, but also still overkill needing to pick & choose the right tools to fetch data and manage state.

#### Supabase

![Supabase logo](/img/blog/wedding/supabase.png)

I would have liked to have tried [Supabase](https://supabase.com) since it's open-source and free. However, I didn't dive too far into it after the two blockers that I found:

- Cloud functions are only experimental and very limited
- No automated HTML email sending available

#### Parse Platform

![Parse Platform logo](/img/blog/wedding/parse.png)

Parse is another open source platform that I looked at briefly. Unfortunately, it had too many blockers to consider even prototyping.

- No email sending available
- It’s not possible to sign in with just an email address.
- Hosting limitations and potential cost
  - Hosting a Parse Platform application would either require a lot of setup and cost with another provider, or using [Back4App's free plan](https://www.back4app.com/compare-all-plans, which doesn't appear to have SSL.

</details>

## Application frameworks & tools

### [Preact](https://preactjs.com/)

![Preact logo](/img/blog/wedding/preact.webp)

I could have used React, but I initially wanted to see how small I could keep the build size and didn’t think I'd need any of the extra weight from React for such a small site.

### [Tailwindcss](https://tailwindcss.com/)

![Tailwindcss logo](/img/blog/wedding/tailwind.png)

I have built a few things with Tailwind before and it really makes things simple while keeping the final build sizes small.

### [Parcel](https://parceljs.org/)

![Parcel logo](/img/blog/wedding/parcel.png)

I have used Parcel before for some really small projects like this and it's pretty dead simple as a bundler to get set up. I also didn't want to spend a week tweaking my compilation process to get things _just right_ like I tend to do with Webpack.

:::info[Multi-part series]

This is the beginning of a multi-part series. The following other posts are ready now. Check back soon for more!

1. [Introduction](.)
2. [**Part 1: Choosing the tools**](part-1)
3. [Part 2: Setup](part-2)
4. _More coming soon!_

:::

## Coming soon…

In part 2 of this series, we'll cover setting up the repository, Firebase, Parcel & Tailwindcss.
