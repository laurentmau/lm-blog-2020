---
layout: layouts/base.njk
title: Accueil
translationKey: homepage
templateEngineOverride: njk,md
---


## **Je code, je construis, j'accompagne**

J'ai été développeur, chef de projet, responsable commercial, DSI et membre de COMEX. Trente ans dans le numérique, et toujours la même conviction : **le numérique doit aider, clarifier et rendre les choses plus faciles — jamais l'inverse.**

Je suis basé à Grenoble.

---

## J'écris

Des essais sur l'IA, vue par quelqu'un qui la pratique. Les derniers :

<ul class="postlist">
{%- for post in collections.posts_fr | head(-3) | reverse %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> <time class="postlist-date" datetime="{{ post.date | date('Y-MM-DD') }}">{{ post.date | date("DD MMMM Y", locale) }}</time></li>
{%- endfor %}
</ul>

Tous les posts sont dans [l'archive](/fr/archive.html).

---

## Je suis CTO et associé d'**Atipik-solutions**

Je consacre l'essentiel de mon temps à **Watsy®**, notre plateforme pour l'industrie. Watsy mesure les pertes, les rend visibles, et aide les équipes à améliorer leur production au quotidien.

---

## Mes autres projets

**[Uxium](https://uxium.site/)** — la plateforme web que j'ai créée pour permettre aux indépendants et aux PME de disposer d'une vitrine numérique professionnelle, **sans dépendre d'un prestataire technique**. Une alternative simple, prévisible et autonome avec un accompagnement IA intégré.

**[BikeSlot](https://bikeslot.com)** — solution de sécurisation pour la mobilité urbaine.

---

## J'accompagne aussi les dirigeants

J'aide les **dirigeants d'ETI et de PME**, avec une expertise marquée de l'industrie, à clarifier ce que **l'IA et le numérique** changent pour leur entreprise et à décider quoi faire.

**2 à 3 missions par an**, en complément de mes projets.

---

## Et aussi des conférences

Je donne régulièrement des conférences sur l'IA et le numérique, pour des publics variés (dirigeants, étudiants, grand public).

---

## Pour mieux me connaître

Ce que je fais [en ce moment](/fr/now.html) &middot; [comment je m'organise](/fr/work.html) &middot; [les outils que j'utilise](/fr/uses.html)

---

## Envie d'échanger ?

Pour une question, un échange ou une demande d'accompagnement :

📩 laurent&lt;at&gt;weli&lt;point&gt;bo

🔗 [Mon profil LinkedIn](https://www.linkedin.com/in/laurentmaumet/)
