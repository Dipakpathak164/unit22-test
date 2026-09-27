import { execSync } from 'node:child_process';
import * as path from 'node:path';

const schemaPath = process.env.OPENAPI_SCHEMA_URL || path.join(__dirname, '../openapi.yaml');
const outputPath = path.join(__dirname, '../src/openapi-types.ts');

console.log(`Generating TypeScript types from OpenAPI schema: ${schemaPath}`);
try {
  execSync(`npx openapi-typescript ${schemaPath} -o ${outputPath}`, { stdio: 'inherit' });
  console.log('Types generated successfully.');
} catch (err) {
  console.warn('Could not run openapi-typescript on external spec. Keeping static schema types.', err);
}
