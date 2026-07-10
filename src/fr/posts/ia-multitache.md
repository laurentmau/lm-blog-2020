---
title: "Avec l'IA aussi, le multitâche est contre-productif"
date: 2026-07-10
draft: false
layout: layouts/post.njk
tags: IA
short: ia-multitache
---
Une dizaine de sessions Claude Code ouvertes, des agents qui codent en tâche de fond : l'IA donne l'impression de pouvoir mener dix conversations de front. J'y ai cru. Puis j'ai mesuré.

Trois semaines de mes propres transcripts Claude Code, mi-juin à début juillet, analysées par script : environ 850 messages et 90 sessions par semaine. Le chiffre qui fait mal : deux messages sur trois partent vers une autre session que le message précédent. Temps médian passé sur une session avant de zapper : une à trois minutes. Un mardi matin, 13 sessions touchées en 45 minutes.

Le piège, c'est le temps d'attente. Pendant que l'IA travaille, trente secondes ou trois minutes, switcher vers une autre session semble gratuit. C'est même satisfaisant : aucune minute perdue, toutes les sessions avancent. Mes transcripts montrent la facture : sept sessions en une semaine qui démarrent par "on en est où ?", des décisions prises avec la tête à moitié ailleurs, des specs écrites en pointillé sans jamais avoir le problème complet en tête. L'IA n'a pas supprimé le coût du context switching : elle l'a rendu invisible.

L'erreur est de compter en sessions ouvertes. Chez moi, il y a trois étages :

- **Les chantiers.** Une dizaine en parallèle, et ce sont eux qui durent, des semaines. Ce parallélisme ne coûte rien : ils vivent dans des fichiers, pas dans ma tête.
- **Les agents autonomes.** Des codeurs lancés sur des specs, qui travaillent sans moi et que je consulte à leurs jalons. Eux parallélisent vraiment.
- **Mon attention.** Une seule conversation à la fois. C'est le seul étage qui ne se parallélise pas.

Le multitâche ne se compte donc pas en sessions vivantes, mais en conversations menées de front. Dix sessions ouvertes et cinq agents qui tournent, ce n'est pas du multitâche. La deuxième conversation interactive, si. Les power users d'Anthropic le disent en une ligne : lancez des sessions en parallèle, mais ne les micro-managez pas.

Depuis début juillet, je me suis mis au régime : un chantier principal par jour ; l'admin batché dans un créneau unique ; une seule session interactive à la fois, menée au bout ou parquée proprement ; les codeurs consultés à heures fixes, plus jamais au fil de l'eau. Et une mesure chaque soir : taux de switch, temps par session, nombre de sessions.

La preuve que c'est atteignable était déjà dans mes données : un vendredi à 11 sessions, 34 % de switch et trois vrais blocs profonds, dont un de deux heures. Une semaine de régime plus tard, le temps médian par session est passé de 1 minute à 8. Pas encore les cibles, mais la direction est prise : moins de sessions, menées plus loin.

Les agents parallélisent. L'attention humaine, non. Mon setup s'organise maintenant autour de cette limite, pas contre elle. Le câblage complet est dans [mon post sur mon setup IA](/fr/posts/mon-setup-ia/).
