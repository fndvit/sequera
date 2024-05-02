---
title: Panell de dades
toc: false
---

```js
const embassamentsShortNames = ({
    'Embassament de Darnius Boadella (Darnius)': 'Darnius Boadella',
    'Embassament de Foix (Castellet i la Gornal)': 'Foix',
    'Embassament de Sau (Vilanova de Sau)': 'Sau',
    'Embassament de Siurana (Cornudella de Montsant)': 'Siurana',
    'Embassament de Sant Ponç (Clariana de Cardener)': 'Sant Ponç',
    'Embassament de Susqueda (Osor)': 'Susqueda',
    'Embassament de Riudecanyes': 'Riudecanyes',
    'Embassament de la Llosa del Cavall (Navès)': 'La Llosa del Cavall',
    'Embassament de la Baells (Cercs)': 'La Baells'
})

const weightedMean = (data) => {
  const total = data.reduce(
    (acc, item) => {
      acc.totalWeight += item.pct * item.capacity;
      acc.totalCapacity += item.capacity;
      return acc;
    },
    { totalWeight: 0, totalCapacity: 0 }
  );

  return total.totalWeight / total.totalCapacity;
}

const occlusionY = ({radius = 6.5, ...options} = {}) => Plot.initializer(options, (data, facets, { y: {value: Y}, text: {value: T} }, {y: sy}, dimensions, context) => {
  for (const index of facets) {
    const unique = new Set();
    const nodes = Array.from(index, (i) => ({
      fx: 0,
      y: sy(Y[i]),
      visible: unique.has(T[i]) // remove duplicate labels
        ? false
        : !!unique.add(T[i]),
      i
    }));
    d3.forceSimulation(nodes.filter((d) => d.visible))
      .force("y", d3.forceY(({y}) => y)) // gravitate towards the original y
      .force("collide", d3.forceCollide().radius(radius)) // collide
      .stop()
      .tick(20);
    for (const { y, node, i, visible } of nodes) Y[i] = !visible ? NaN : y;
  }
  return {data, facets, channels: {y: {value: Y}}};
})

const apiCall = await fetch(
  "https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.json?$limit=33000"
).then((response) => response.json())

const sorted = apiCall.sort((a, b) => new Date(a.dia) - new Date(b.dia));
const actual = [
    ...new Map(sorted.map((d) => [d.estaci, d])).values()
  ].map((d) => {
    d.name = embassamentsShortNames[d.estaci];
    d.capacity = (100 * d.volum_embassat) / d.percentatge_volum_embassat;
    d.pct = +d.percentatge_volum_embassat;
    d.level = +d.volum_embassat;
    return d;
  });

const actualMean = +weightedMean(actual).toFixed(1);

const historic = apiCall.map((d) => {
  const name = embassamentsShortNames[d.estaci];
  const date = new Date(d.dia);
  const pct = +d.percentatge_volum_embassat;
  const level = +d.volum_embassat;
  return { name, date, pct, level };
});
  
const sortInput = Inputs.toggle({
  label: "Ordenat per volum",
  value: true,
  width: 600
})

const sort = Generators.input(sortInput);

const historicDateSpan = [...new Set(historic.map(d => d.date))]
const [startDate, latestDate] = d3.extent(historicDateSpan);
const yearAgo = new Date();
yearAgo.setFullYear(latestDate.getFullYear() - 1);

const selected = "Foix"

const selectInput = Inputs.select(Object.values(embassamentsShortNames), {
    label: "Selecciona un embassament"
  })

const select = Generators.input(selectInput);

```
# Estat dels embassaments de Catalunya

<div class="grid grid-cols-4">
  <div class="card grid-colspan-2">
  <h2>Les reserves d'aigua als embassaments estàn al ${actualMean}%</h2>
    <h3>Dades actualitzades a ${d3.timeFormat("%x")(latestDate)} per embassaments amb capacitat superior a 2hm³</h3>
    <figure class="grafic" style="max-width: none;">
      ${resize((width) =>
    Plot.plot({
  width,
  height: 480,
  marginRight: width > 480 ? 120 : 0,
  x: { domain: [0, 100], label: "% volum embassat" },
  y: { label: "Capacitat in hm³" },
  color: {
    domain: [16, 25, 40, 60],
    range: ["#b02418", "#ef8733", "#f7d05d","#7aa047","#577af7"],
    type: "threshold",
    label: "% volum embassat",
    legend: true
  },
  marks: [
    () => htl.svg`<defs>
      <pattern
        id="diagonal-stripe"
        width="100px"
        height="5px"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        patternTransform="rotate(-45)"
      >
        <line
          x1="0"
          x2="100"
          y1="30"
          y2="30"
          stroke-width="40"
          style="stroke: #eee"
        />
      </pattern>
    </defs>`,
    Plot.rectX(
      actual,
      Plot.stackY({
        y: "capacity",
        order: sort ? "pct" : "capacity",
        x2: 100,
        fill: "url(#diagonal-stripe)",
        stroke: "#e0e0e0"
      })
    ),
    Plot.rectX(
      actual,
      Plot.stackY({
        y: "capacity",
        order: sort ? "pct" : "capacity",
        x2: "pct",
        fill: "pct",
        title: (d) => `${d.name}\n${d.pct}%`,
        insetTop: 0.2,
        insetBottom: 0.2,
        tip: true
      })
    ),
    width > 480 ? Plot.text(
      actual,
      occlusionY(
        Plot.stackY({
          y: "capacity",
          order: sort ? "pct" : "capacity",
          x: 100,
          text: "name",
          textAnchor: "start",
          insetTop: 0.2,
          insetBottom: 0.2,
          dx: 16
        })
      )
    )
    : 
    Plot.text(
      actual,
      occlusionY(
        Plot.stackY({
          y: "capacity",
          order: sort ? "pct" : "capacity",
          x: 100,
          text: "name",
          textAnchor: "end",
          insetTop: 0.2,
          insetBottom: 0.2,
          dx: -4
        })
      )
    )
    ,
    Plot.ruleX([actualMean]),
    Plot.text(
      [actualMean],
      {
          y: 650,
          x: d => d,
          text: d => `${d}%`,
          fontSize: 20,
          fontWeight: "bold",
          textAnchor: "middle",
          fill: "#000",
          stroke:"#f0f0f0",
        })
  ]
})
  )}
    </figure>
    ${sortInput}

  </div>
  <div class="card grid-colspan-2" style="min-height: 480px">
  <h2>Change in demand by balancing authority</h2>
    <h3>Evolució de les reserves en l'últim any</h3>
    <figure class="grafic" style="max-width: none;">
${resize((width) =>
  Plot.plot({
  width: width,
  height: 480,
  marginRight: 120,
  y: { grid: true, label: "% volum embassat" },
  color: {
    domain: [16, 25, 40, 60],
    range: ["#b02418", "#ef8733", "#f7d05d","#7aa047","#577af7"],
    type: "threshold",
    label: "% volum embassat",
    legend: true
  },
  style: "overflow: visible;",
  marks: [
    Plot.lineY(
      historic.filter((d) => d.date > yearAgo),
      {
        x: "date",
        y: "pct",
        z: "name",
        stroke: "pct",
        tip: true
      }
    ),
    Plot.dot(
      historic.filter((d) => d.date > yearAgo),
      Plot.selectLast({
        r: 2.5,
        x: "date",
        y: "pct",
        z: "name",
        fill: "pct",
        stroke: "none"
      })
    ),
    Plot.text(
      historic.filter((d) => d.date > yearAgo),
      occlusionY(
        Plot.selectLast({
          x: "date",
          y: "pct",
          z: "name",
          text: "name",
          textAnchor: "start",
          dx: 6
        })
      )
    )
  ]
})
)}
</figure>
</div>
</div>

<div class="grid grid-cols-4">
  <div class="card grid-colspan-1">
  ${selectInput}
  </div>
  <div class="card grid-colspan-3">
  ${
    resize((width) =>
      Plot.plot({
  width: width,
  height: width / 3,
  y: { grid: true, label: "% volum embassat" },
  color: {
    domain: [16, 25, 40, 60],
    range: ["#b02418", "#ef8733", "#f7d05d","#7aa047","#577af7"],
    type: "threshold"
  },
  style: "overflow: visible;",
  marks: [
    Plot.lineY(
      historic.filter((d) => d.name === select),
      {
        x: "date",
        y: "pct",
        z: "name",
        stroke: "#BDBDBD"
      }
    ),
    Plot.lineY(
      historic.filter((d) => d.name === select),
      Plot.windowY(365, {
        x: "date",
        y: "pct",
        z: "name",
        stroke: "#000",
        strokeDasharray: [2,4]
      })
    ),
    Plot.lineY(
      historic.filter((d) => d.name === select),
      Plot.windowY(28, {
        x: "date",
        y: "pct",
        z: "name",
        strokeWidth: 1.8,
        stroke: "pct",
        tip: true
      })
    )
  ]
})
    )
  }
  </div>
</div>
