const { spawn } = require('child_process');
const http = require('http');

async function main() {
  console.log("Starting Chrome...");
  const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=' + require('os').tmpdir() + '/chrome-profile-' + Date.now()
  ]);

  // Wait for Chrome to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("Fetching target list...");
  let targets;
  try {
    targets = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9222/json/list', res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  } catch (err) {
    console.error("Failed to connect to Chrome remote debugging port:", err);
    chromeProcess.kill();
    process.exit(1);
  }

  console.log("Targets found:", targets.map(t => ({ type: t.type, url: t.url })));
  const target = targets.find(t => t.type === 'page');
  if (!target) {
    console.error("No active page target found in Chrome.");
    chromeProcess.kill();
    process.exit(1);
  }

  console.log("Connecting to target WebSocket:", target.webSocketDebuggerUrl);
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  const errors = [];
  const logs = [];

  ws.onopen = () => {
    console.log("WebSocket connected. Enabling domains...");
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    ws.send(JSON.stringify({ id: 2, method: "Console.enable" }));
    ws.send(JSON.stringify({ id: 3, method: "Page.enable" }));

    console.log("Navigating to index.html...");
    ws.send(JSON.stringify({
      id: 4,
      method: "Page.navigate",
      params: { url: "file:///C:/Users/Estrella/Documents/PROYECTOS PERSONALES/Pagina mami/index.html" }
    }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    
    if (msg.method === "Console.messageAdded") {
      const message = msg.params.message;
      const text = `[Console ${message.level}] ${message.text} (${message.url}:${message.line})`;
      if (message.level === "error") {
        errors.push(text);
      } else {
        logs.push(text);
      }
    }

    if (msg.method === "Runtime.exceptionThrown") {
      const details = msg.params.exceptionDetails;
      const text = `[Uncaught Exception] ${details.exception.description || details.text} at ${details.url}:${details.lineNumber}`;
      errors.push(text);
    }
  };

  // Wait 4 seconds for page load and GSAP to execute
  await new Promise(resolve => setTimeout(resolve, 4000));

  console.log("\n=== CONSOLE LOGS ===");
  logs.forEach(l => console.log(l));

  console.log("\n=== CONSOLE ERRORS ===");
  if (errors.length === 0) {
    console.log("No errors detected!");
  } else {
    errors.forEach(e => console.error(e));
  }

  // Get current URL and Title from page
  ws.send(JSON.stringify({
    id: 98,
    method: "Runtime.evaluate",
    params: { expression: "document.location.href" }
  }));
  ws.send(JSON.stringify({
    id: 99,
    method: "Runtime.evaluate",
    params: { expression: "document.title" }
  }));
  ws.send(JSON.stringify({
    id: 97,
    method: "Runtime.evaluate",
    params: { expression: "document.body ? document.body.innerHTML.substring(0, 500) : 'No Body'" }
  }));

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id === 98) console.log("Loaded URL:", msg.result.result.value);
    if (msg.id === 99) console.log("Loaded Title:", msg.result.result.value);
    if (msg.id === 97) console.log("Body Snippet:", msg.result.result.value);
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  // Check visibility of key elements
  console.log("\n=== ELEMENT STYLES ===");
  const elementsToCheck = [
    '#inicio',
    '.hero-content',
    '#sobre-mi',
    '.photo-image',
    '.name-block',
    '.testiSwiper'
  ];

  for (const selector of elementsToCheck) {
    const evalId = 100 + elementsToCheck.indexOf(selector);
    ws.send(JSON.stringify({
      id: evalId,
      method: "Runtime.evaluate",
      params: {
        expression: `(() => {
          const el = document.querySelector('${selector}');
          if (!el) return 'Not Found';
          const style = window.getComputedStyle(el);
          return {
            opacity: style.opacity,
            display: style.display,
            visibility: style.visibility,
            height: style.height,
            transform: style.transform
          };
        })()`,
        returnByValue: true
      }
    }));
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id >= 100 && msg.id < 200) {
      const selector = elementsToCheck[msg.id - 100];
      const result = msg.result ? (msg.result.result ? msg.result.result.value : null) : null;
      console.log(`${selector}:`, JSON.stringify(result, null, 2));
    }
  };

  // Wait 1 second for evaluations to print
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("\nClosing Chrome...");
  chromeProcess.kill();
  process.exit(0);
}

main().catch(err => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
