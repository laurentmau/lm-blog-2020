---
title: Debug collections Eleventy
layout: layouts/base.njk
permalink: /fr/debug/collections/
---

# 🛠 Debug des collections Eleventy

{% for collectionName, items in collections %}
## {{ collectionName }}
Nombre d’items : {{ items.length }}

<ul>
  {% for item in items %}
    <li>
      <code>{{ item.inputPath }}</code><br />
      <small>URL : {{ item.url }}</small><br />
      {% if item.outputPath %}
        <small>Output : {{ item.outputPath }}</small>
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% endfor %}

