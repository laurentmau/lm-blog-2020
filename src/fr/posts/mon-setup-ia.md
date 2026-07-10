---
title: "Mon setup IA"
date: 2026-07-10
draft: false
layout: layouts/post.njk
tags: IA
short: mon-setup-ia
---
Mon setup IA : un mini-PC sous Ubuntu qui tourne en continu chez moi (elios), et dessus une dizaine de sessions Claude Code en parallèle, une par chantier : finances, code client, produit, coaching, notes. Chaque session vit dans un onglet de terminal, parfois pendant des jours. Ce post décrit le câblage, brique par brique. Si vous travaillez avec Claude Code ou un agent équivalent, il y a peut-être des morceaux à prendre.

Le principe qui organise tout : la session est jetable, le contexte ne l'est pas. Une conversation avec l'IA, je la ferme sans regret. Ce qui doit survivre (où j'en suis, ce qui a été décidé, la prochaine étape) vit dans des fichiers à moi, et chaque session vient s'y brancher.

## Le contexte vit dans des fichiers

La mémoire n'est pas dans l'IA. Elle est dans un vault Obsidian : des fichiers Markdown. Chaque chantier actif y a son fichier "topic" :

```yaml
---
type: topic
etat: ACTIF
slug: renovation-maison
workdir: ~
prochain_pas: relancer le plaquiste, valider le devis du cabanon
---
# 2026-07-08
Devis électricité validé. Reste le point KNX...
```

Un frontmatter avec l'état et la prochaine étape, puis un journal d'entrées datées, les plus récentes en premier. C'est tout. Un index JSON du vault, régénéré par cron, permet aux scripts de s'y retrouver sans parser tous les fichiers.

## Le pont avec Claude, automatique aux deux bouts

Au lancement. Un lanceur maison, `mc`, affiche un dashboard des chantiers et des sessions vivantes (picker fzf). Entrée sur un topic : cd dans son workdir, lancement de Claude Code avec le slug du topic injecté. Un hook SessionStart lit alors le fichier topic et charge le frontmatter plus la dernière entrée datée dans le contexte. La session démarre en sachant où on en est, je ne réexplique rien.

À la fermeture. Un hook SessionEnd loggue chaque session dans un registre (résumé, durée, commande de reprise), qui alimente une page web perso pour retrouver une vieille conversation en deux clics. Et si le topic du jour n'a pas encore d'entrée datée, le hook lance en tâche de fond un `claude -p` headless qui lit le transcript de la conversation et rédige lui-même l'entrée du jour dans le fichier topic, avec backup du fichier avant écriture. Je ferme l'onglet, le vault se met à jour seul.

C'est ce qui rend la session jetable pour de bon : rien d'important ne meurt avec elle.

## Des sessions qui survivent quand même

Entre deux passages au vault, une session porte du travail en cours qui n'est écrit nulle part. Et un process meurt avec le terminal qui l'a lancé. Chaque session tourne donc dans dtach, un petit outil qui détache le process du terminal : une socket par chantier, fermer l'onglet ou couper le SSH ne tue rien. `mc` liste les sessions vivantes et les réattache.

En mobilité, un Chromebook rejoint elios en SSH via Tailscale ; `mc live` liste les sessions restées ouvertes et les rapatrie une par une. Je reprends chaque chantier exactement où il en était.

Dernier détail, étonnamment utile sur autant d'onglets : Claude réécrit en continu le titre de l'onglet, avec un glyphe qui bouge quand il travaille et se fige quand il attend. `mc` ajoute un emoji par projet. Chaque onglet dit en permanence qui c'est et où ça en est.

## Les skills : le comportement par domaine

Une quinzaine de fichiers "skills", un par domaine : finances, coaching, incidents client, rénovation, présentations. Chacun décrit quand se déclencher et comment travailler : quelles données croiser, dans quel ordre présenter, quels seuils signaler. "Où en est la trésorerie ce mois-ci" charge le skill finances ; je n'ai décrit ni procédure ni outils. Le skill coaching, lui, sait qu'il doit relire les données de ma dernière sortie avant de commenter, et que la santé passe avant la performance.

Quand un skill se trompe de registre, je corrige son fichier une fois : c'est acquis pour toutes les sessions futures. Le comportement, lui aussi, survit à la session.

## Le code : spec-driven

La partie la plus outillée, celle qui produit du livrable : c'est comme ça que je fais avancer WATSY chez Atipik et que je construis Uxium. Quatre gestes : spec, code, land, release.

Une spec est un fichier qui décrit un morceau de travail livrable, avec un statut (brouillon, prête à coder, en cours, livrée). C'est elle l'unité de travail, pas la session : une spec demande souvent plusieurs sessions de code.

Chaque feature (un lot livrable, pas un module technique) vit dans son propre worktree git, avec sa propre stack Docker, sa base, ses ports. Deux features avancent en parallèle sans se marcher dessus ; à l'intérieur d'une feature, les sessions de code s'enchaînent en séquentiel sur la même branche. `land` ramène la feature terminée vers la branche d'intégration ; `release` groupe plusieurs features vers la production.

## Ce qui rame encore

Le multi-poste (elios en fixe, le Chromebook en mobilité) est encore en rodage : rapatrier proprement les sessions ouvertes à distance, éviter les doublons. Ça se stabilise à l'usage. Et j'ai renoncé à un signal par onglet quand une session a fini de travailler : mon terminal ne sait pas marquer un onglet en arrière-plan, à cause d'un bug ouvert depuis quinze ans côté GNOME. Cul-de-sac assumé, le glyphe dans le titre suffit.

Le matériel et les apps sont sur [ma page /uses](/fr/uses.html) ; ma méthode d'organisation, sur [ma page /work](/fr/work.html).
