---
title: "Mapping park run courses"
date: 2020-11-05
---
I love park run. It's been one of the main things I've missed during the last six, locked down, months. But one thing that's always surprised me is the lack of rigourous information about the difficulty of various park run courses.

There are (or were, pre-pandemic) over 1,000 events UK events. But one event may have a multitude of different courses that are run each week. For example, my local park run Crystal Palace has at least two courses - a summer course that goes through muddy forest and a winter course that sticks to the paths.

So I wanted to build something that would answer the question of 'What's the hilliest park run course in South London' or 'What's the fastest course in Yorkshire...'

With 1,000 events, that's quite a lot of data collection that I'm too lazy to do. So instead, I've built a simple data collection hub, to store the information about courses in a structured way. Strava is a great start for gathering this data, as most park run events have strava segments that correlate to their courses. So my little web app I've begun to build allows people to submit a Strava segment id, and the course be downloaded, saved and displayed. Once I have a fair amount of data, I'll start working on building tools to compare the various courses with each other.

This project is a long way from finished and it's pretty rough, but it's a start and it's out there. But mainly, it was a good opportunity to use some technology I hadn't touched in a while. The code is open in two repositories ([here](https://github.com/sbmooc/park-run-courses) and [here](https://github.com/sbmooc/park-run-courses-be)).

It's available for you to play with [here](http://park-run.olimc.co.uk)

![screenshot](/park-run-screenshot.png)

**The server:**

It's a simple REST API built using Node. I'm using a sqlite db to keep it simple, and sequelize for the ORM.

**The front end:**

A vue front end. I used the excellent [vue-leaflet](https://github.com/vue-leaflet/Vue2Leaflet) library for the mapping functionality.

**Continuious deployment & hosting:**

I'm a big fan of [github actions](https://github.com/features/actions). I find the syntax easy to use and you can often find the functionality you need in already published actions. I haven't implemented the b/e CD yet - but the f/e uses vue-cli to to build the static files on the github runner then uses scp to copy them over to the live server.

I plan to Dockerise the deployment, so that I build an image on merge, run E2E tests against that image, and if they pass, then deploy the image. This would make rolling back to previous versions really easy, and allows for easy developer replication of production environments.

I use Nginx to reverse proxy the node app, and to serve the static front end. It was the first time I've implemented an SSL certificate through letsencrypt which was beautifully straightforward.

I'll continue to work on this over the coming weeks. The design needs a fair amount of work & there are some basic b/e functionality (e.g. throttling, some basic authentication) that needs to be implemented.
