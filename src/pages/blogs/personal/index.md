---
layout: "../../../layouts/MySiteLayout.astro"
title: "Hello galaxy of possibilities!"
description: "Take your blog to astronomical heights. Space shuttle leaving curved trail in the sky. Space shuttle leaving curved trail in the sky. Space shuttle leaving curved trail in the sky. Space shuttle leaving curved trail in the sky. Space shuttle leaving curved trail in the sky"
publishDate: "12 Sep 2021"
followMe:
  username: "MrAbhisheksaha"
  href: "https://twitter.com/MrAbhisheksaha"
halfTheMeaning: 21
image:
  src: "https://picsum.photos/seed/sun/200/300"
  alt: "Space shuttle leaving curved trail in the sky. "
tags: ["hello"]
setup: |  
  import FollowMe from "../../../components/FollowMe.astro"
---

<FollowMe username={frontmatter.followMe.username} href={frontmatter.followMe.href} />
Access all exported properties with JSX expressions. For example, let's find the meaning of life: **{frontmatter.halfTheMeaning * 2}**
If this seems cool, consider giving my post a like with this Preact component: 

__Hello__

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

