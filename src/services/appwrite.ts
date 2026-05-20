import { Client, Account, Databases, Storage } from 'appwrite';
import appConfig from '../config/appConfig';

const client = new Client();

const { endpoint, projectId } = appConfig.appwrite;

console.log('Appwrite Lib: Initialization check');
console.log('Appwrite Lib: Endpoint found?', !!endpoint);
console.log('Appwrite Lib: Project ID found?', !!projectId);

if (!endpoint) {
  console.error('Appwrite Error: VITE_APPWRITE_ENDPOINT is missing!');
}
if (!projectId) {
  console.error('Appwrite Error: VITE_APPWRITE_PROJECT_ID is missing!');
}

client
  .setEndpoint(endpoint || '')
  .setProject(projectId || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };
