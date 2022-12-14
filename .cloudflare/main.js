const fs = require("fs");
const pkg = require("./package.json");

/* Redirects config */
pkg.config.redirects.forEach(r => {
	console.log(r.url, r.target);
});

/* Notion config */
let slugRe = /(?<=-)[a-f0-9]+$/ // Get page slug from Notion URL
let notionPages = pkg.config.notion.redirects.map(r => 
	`\t"${r.path}": "${r.target.match(slugRe).toString()}"`
).join(",\n");  // Create JS object to map paths to Notion page paths

// Full Cloudflare worker script
const notionWorker = `const MY_DOMAIN = "${pkg.config.notion.baseURL}";
const SLUG_TO_PAGE = {
${notionPages}};
const PAGE_TITLE = "${pkg.config.notion.title}";
const PAGE_DESCRIPTION = "${pkg.config.notion.description}";
const GOOGLE_FONT = "${pkg.config.notion.googleFont}";
const CUSTOM_SCRIPT = \`${pkg.config.notion.customScript}\`;

${fs.readFileSync("workerBase.js", "utf8")}`

console.log(notionWorker)
