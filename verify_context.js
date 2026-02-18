
const fs = require('fs');
const path = require('path');

try {
  const contextPath = path.resolve('.ai-context');
  if (!fs.existsSync(contextPath)) {
    console.error('ERROR: .ai-context file not found.');
    process.exit(1);
  }

  const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  const creds = context.master_service_account;

  console.log('Project ID:', creds.project_id);
  console.log('Client Email:', creds.client_email);

  if (creds.project_id === 'pro-connect-hub' && 
      creds.client_email === 'github-auto-deployer@pro-connect-hub.iam.gserviceaccount.com' &&
      creds.private_key.includes('BEGIN PRIVATE KEY')) {
    console.log('SUCCESS: Credentials in .ai-context match the verified source.');
  } else {
    console.error('FAILURE: Mismatch in .ai-context content.');
    process.exit(1);
  }

} catch (err) {
  console.error('Error verifying context:', err);
  process.exit(1);
}
