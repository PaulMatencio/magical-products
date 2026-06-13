import { spawn } from 'child_process';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000/magical-products/';

async function checkPort(port) {
  return new Promise((resolve) => {
    import('net').then(({ default: { connect } }) => {
      const socket = connect(port, 'localhost');
      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.on('error', () => {
        resolve(false);
      });
    });
  });
}

async function main() {
  let devServerProcess = null;
  
  // 1. Check if server is already running
  let isRunning = await checkPort(3000);
  if (!isRunning) {
    console.log('Starting Vite dev server...');
    devServerProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });
    
    // Wait for the dev server to start
    await new Promise((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          reject(new Error('Vite dev server failed to start within 15 seconds'));
        }
      }, 15000);

      devServerProcess.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('3000') || output.includes('localhost') || output.includes('host') || output.includes('Local:')) {
          resolved = true;
          clearTimeout(timeout);
          resolve();
        }
      });
      
      devServerProcess.stderr.on('data', (data) => {
        console.error('Dev server stderr:', data.toString());
      });
    });
    console.log('Vite dev server is ready.');
    // Give it a bit more time to settle
    await new Promise(r => setTimeout(r, 3000));
  } else {
    console.log('Vite dev server is already running.');
  }

  // 2. Start Playwright
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // 3. Inject axe-core
  console.log('Injecting axe-core...');
  const axePath = path.resolve('node_modules/axe-core/axe.min.js');
  await page.addScriptTag({ path: axePath });
  
  // 4. Run axe-core
  console.log('Running accessibility audit...');
  const results = await page.evaluate(async () => {
    return await window.axe.run();
  });
  
  // 5. Process results
  console.log(`Audit completed! Found ${results.violations.length} violations.\n`);
  
  const violationsReport = results.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    helpUrl: v.helpUrl,
    nodes: v.nodes.map(n => ({
      target: n.target,
      html: n.html,
      failureSummary: n.failureSummary
    }))
  }));

  const reportPath = path.resolve('a11y-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(violationsReport, null, 2), 'utf-8');
  console.log(`Detailed report saved to: ${reportPath}`);
  
  // Print summary
  violationsReport.forEach((v, index) => {
    console.log(`\n[${index + 1}] Violation ID: ${v.id} (${v.impact})`);
    console.log(`Description: ${v.description}`);
    console.log(`Help: ${v.help} (URL: ${v.helpUrl})`);
    console.log(`Failing elements (${v.nodes.length}):`);
    v.nodes.forEach(node => {
      console.log(`  - Target: ${node.target.join(', ')}`);
      console.log(`    HTML: ${node.html}`);
      console.log(`    Failure: ${node.failureSummary}`);
    });
  });

  // 6. Cleanup
  console.log('\nCleaning up...');
  await browser.close();
  
  if (devServerProcess) {
    console.log('Stopping Vite dev server...');
    devServerProcess.kill('SIGTERM');
  }
  
  console.log('Done.');
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
