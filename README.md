# Visualització de la sequera a Catalunya

![Captura de pantalla del panell](/screengrab.png)

Aquest panell de dades reimagina la visualització de [l'Estat dels embassaments a Catalunya](https://aca.gencat.cat/ca/laigua/consulta-de-dades/dades-obertes/visualitzacio-interactiva-dades/estat-embassaments/) de la Agència Catalana de l'Aigua, reutilitzant les [dades obertes disponibles](https://analisi.transparenciacatalunya.cat/Medi-Ambient/Quantitat-d-aigua-als-embassaments-de-les-Conques-/gn9e-3qhr/about_data) al portal de Transparència de la Generalitat de Catalunya.

L'objectiu d'aquest exercici és millorar la visualització existent i destacar la facilitat d'ús del [Observable Framework](https://observablehq.com/framework), una eina que ensenyem al mòdul de Visualització de la Informació del [Màster en Ciència de Dades a la Universitat de Girona](https://www.udg.edu/en/masters-en-tecnologia/ciencia-de-dades).

## To Do
Tenim un munt de funcionalitats en marxa, entre elles:

- [ ] Incorporar dades de la Confederació Hidrogràfica de l'Ebre (un dels [workshops](https://drought-workshop.vercel.app/) del Màster propi en Visual Tools to Empower Citizens va aconseguir aixó)
- [ ] Un mapa com el del [visor de la sequera](https://aplicacions.aca.gencat.cat/visseq/estat-actual) (les [dades](https://analisi.transparenciacatalunya.cat/Medi-Ambient/Estat-de-sequera-per-unitats-d-explotaci-i-municip/i5n8-43cw/about_data) al portal de Transparència tenen un desfàs de setmanes i [les dades en temps real](https://aca.gencat.cat/ca/laigua/consulta-de-dades/dades-obertes/dades-obertes-temps-real/) necessiten càlculs geoespacials)
- [ ] Un informe diari com el que proporciona la [Agència Catalana de l'Aigua](https://info.aca.gencat.cat/ca/aca/informacio/informesdwh/dades_embassaments_ca.pdf)

Si [vols col·laborar]→(/CONTRIBUTING.md).

---

## Com iniciar el projecte

Aquest és un projecte del [Observable Framework](https://observablehq.com/framework). Per iniciar el servidor de previsualització local, executa:

```
npm run dev
```

Després visita <http://localhost:3000> per previsualitzar el teu projecte.

Per a més informació, consulta <https://observablehq.com/framework/getting-started>.

## Estructura del projecte

Un projecte típic del Observable Framework es veu així:

```ini
.
├─ src
│  ├─ components
│  │  └─ grafic-super-xulo.js         # un mòdul importable
│  ├─ data
│  │  ├─ dades-de-la-api.csv.js       # un carregador de dades
│  │  └─ dades.json                   # un fitxer de dades estàtic
│  ├─ panell.md                       # una pàgina
│  ├─ informe.md                      # una altra pàgina
│  └─ index.md                        # la pàgina principal
├─ .gitignore
├─ observablehq.config.js             # el fitxer de configuració del projecte
├─ package.json
└─ README.md
```

**`src`** - Aquesta és l'"arrel de fonts" — on viuen els teus fitxers font. Les pàgines van aquí. Cada pàgina és un fitxer Markdown. El Observable Framework utilitza [encaminament basat en fitxers](https://observablehq.com/framework/routing), la qual cosa significa que el nom del fitxer controla on es serveix la pàgina. Pots crear tantes pàgines com vulguis. Utilitza carpetes per organitzar les teves pàgines.

**`src/index.md`** - Aquesta és la pàgina principal del teu lloc. Pots tenir tantes pàgines addicionals com vulguis, però sempre hauries de tenir també una pàgina principal.

**`src/data`** - Pots posar [carregadors de dades](https://observablehq.com/framework/loaders) o fitxers de dades estàtics en qualsevol lloc de la teva arrel de fonts, però recomanem posar-los aquí.

**`src/components`** - Pots posar mòduls [JavaScript compartits](https://observablehq.com/framework/javascript/imports) en qualsevol lloc de la teva arrel de fonts, però recomanem posar-los aquí. Això t'ajuda a extreure codi dels fitxers Markdown i posar-lo en mòduls JavaScript, facilitant la reutilització del codi a través de les pàgines, escriure proves, executar linters, i fins i tot compartir codi amb aplicacions web vanilla.

**`observablehq.config.js`** - Aquest és el fitxer de [configuració del projecte](https://observablehq.com/framework/config), com ara les pàgines i seccions en la navegació lateral, i el títol del projecte.

## Referència de comandes

| Comanda              | Descripció                                                |
| ------------------- | --------------------------------------------------------- |
| `npm install`       | Instal·la o reinstal·la dependències                      |
| `npm run dev`       | Inicia el servidor de previsualització local              |
| `npm run build`     | Construeix el teu lloc estàtic, generant `./dist`         |
| `npm run deploy`    | Desplega el teu projecte a Observable                      |
| `npm run clean`     | Neteja la memòria cau del carregador de dades local       |
| `npm run observable`| Executa comandes com `observable help`                    |
