---
slug: open-source-break
title: Taking a break from open source
draft: true
authors: paularmstrong
tags:
  - open source
---

I've been sitting on this decision for a long time. It's not easy to abandon something I have poured a lot of thought, care, time, and effort into. It's almost like quitting a job… except I never got paid for the job.

Open source was, is, and will continue to be the gateway for my entire skillset. Without it, I don't think I would have ever learned how write software, let alone ever have become a software developer.

## Some history

Years ago, before React, Angular, Vue, all of the great frameworks that we're _currently_ using, we (maybe just me?) obsessed over templating engines. Some were good, some were bad, and some were [Jinja](https://jinja.palletsprojects.com/en/3.0.x/). I absolutely loved Jinja. It's flexibility, composition, and inheritance made it amazing for building out complex web sites.

Maybe more correct, I fell in love with the PHP version of Jinja, [Twig](https://twig.symfony.com/). At the time, I was working for a small company with a massive PHP website–a massive _spaghetti-code_ PHP website. SQL queries were embedded in the top of PHP pages, security holes, and every bad practice you could imagine existed in its codebase. There wasn't a single hint that a skilled "frontend developer" had ever worked there. _(Fun side note: one did for a hot minute before I joined. Apparently they rage-quit within a month because of how bad everything was.)_

We went full-gas implementing an MVC for our PHP website. Fixing the security holes, getting those SQL queries shored up, and most importantly (to me) setting up a reusable templating system with Twig. I loved it. The template engine was easy to learn, extend, reuse, and teach.

Then I got more and more into node.js and I wanted a project to help me learn more. I noticed there wasn't a good templating engine with the features that Twig and Jinja offered. So in came [Swig](https://github.com/paularmstrong/swig). Initially it was nearly compatible with Twig. It actually took off quite a bit.

It had nearly 100% code coverage, was used by quite a few real companies selling real products. I felt like I was _making it_ as an open source developer.

Except I wasn't. Other than Swig's own documentation, I never actually got to use Swig for anything. It was my favorite thing I'd created, and I never got to enjoy it.

But that's not why I abandoned it.

I abandoned it because I wasn't able to create a healthy community around it. It felt like every notification I got from Github was someone filing an issue or requesting another feature. But barely single pull request was ever there. I tried for a time to keep up fixing and implementing to keep the issues clear. But it became too much. I tried to help others do it themselves, but I would get silence in return. It was _exhausting_ and _unrewarding_.

With a heavy heart, I opened an issue looking for maintainers. I updated the README to point to it. I left it be for a few months and no one stepped up.

So I closed the issues, stopped accepting any PRs, and marked the repository as archived and unmaintained.

## Backlash

People were unhappy, to say the least. Some were mad directly _at me_. How could I do this?

And I've seen a few posts, polls, and discussions lately about open source maintainers and long-term maintenance and viability. A good number of people have rational responses, but there are still some that try to argue that as an open source maintainer, it is _your duty_ to continue maintaining what you've written. For free. Your time, your effort, your life.

And therein lies the point of this post:

I'm afraid of the backlash. I shouldn't be, I know that. And I know that there's a silent majority that understand and will just go on with their lives. But I also know that it's disheartening when there's something that you use and rely on that suddenly looks like it's going to disappear.

##
