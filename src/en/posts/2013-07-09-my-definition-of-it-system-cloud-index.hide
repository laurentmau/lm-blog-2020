---
title: "My definition of IT system cloud index"
date: 2013-07-09 17:57:54+00:00
draft: false
layout: layouts/post.njk
tags: posts
---

The objective of the "cloud index" is to monitor the cloud level of an IT system in order to monitor and to communicate in a simple way to the level of cloud reached.

Here's the definition I use.

The IT system is defined as a sum of [Business Services](http://en.wikipedia.org/wiki/Business_service_management) (i.e. applications, see ITIL definition).

Each business service is characterized by a "feature_size".

The "feature_size" express the complexity of the application (kind of  "[function point](http://en.wikipedia.org/wiki/Function_point)" approach).

For each business service, we express it's "cloud_level" on a scale from 0 to 100 :



	  * **0****  ** : the business service is hosted on dedicated servers on premise
	  * **10** : the business service is hosted on shared servers (via virtualization for example) on servers on premise.
	  * **20** : the business service is hosted on an external datacenter
	  * **50** : the business service is hosted on a IaaS platform
	  * **60** : the business service is on a PaaS platform
	  * **100** : the business service is supported by a full Saas Solution.

Based on this, the cloud index is defined as the weighted average of the business services "cloud_level" weighted by the "feature_size".




