var md = require("markdown-it")({
  linkify: true,
  typographer: true,
});
var test =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit hoc ultimum bonorum, quod nunc a me defenditur;  [Vitae autem degendae](https://nextjs.org/)  ratio maxime quidem illis placuit quieta. Duo Reges: constructio interrete. Nam quid possumus facere melius? This is a button block Left aligned paragraph.  **Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid dubitas igitur mutare principia naturae?**  Ita multo sanguine profuso in laetitia et in victoria est mortuus. Omnia contraria, quos etiam insanos esse vultis.  Hinc ceteri particulas arripere conati suam quisque videro voluit afferre sententiam.  Quis non odit sordidos, vanos, leves, futtiles? Quasi ego id curem, quid ille aiat aut neget. ``` import Document, { Html, Head, Main, NextScript } from 'next/document' ```";
var result = md.render(test);
console.log(result);
