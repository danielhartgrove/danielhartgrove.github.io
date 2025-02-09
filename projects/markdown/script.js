import {marked} from "https://esm.sh/marked";

const defaultMarkdown = `\
# freecodecamp Solutions:
## Build a markdown previewer
[Learn more about the freecodecamp.org project](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-drum-machine).

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

\`This is an example of inline code\`

\`\`\`javascript
function exampleOf() {
  return "multiLineCodeBlock"; // Corrected string
}
\`\`\`

- This
- is
- an
- example
- of
- list
- items

> This is an example of block quote

![freecodecamp](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png)

**This is an example of Bolded Text**`;

let output = document.getElementById("preview");
let input = document.querySelector("textarea");

function render() {
  output.innerHTML = marked.parse(input.value);
}

input.addEventListener("input", render);

window.addEventListener('DOMContentLoaded', () => { // Use DOMContentLoaded
  input.value = defaultMarkdown;
  render(); // Call render after setting the initial value
});