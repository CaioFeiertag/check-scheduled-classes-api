import './config/setup-alias';
import { dataSource } from './factories/data-source-factory';

import { initializeServer } from './server';

async function initializeDB(): Promise<void> {
	try {
		await dataSource.initialize();

		console.log('DB initialized');
	} catch (error) {
		throw new Error('DB could not be initialized');
	}
}

const initializeApp = async () => {
	await initializeDB();

	return initializeServer();
};

export const app = initializeApp();
