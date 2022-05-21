import keypair, { KeypairResults } from 'keypair';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import Logger from './Logger';

Logger.info('Creating new keys...');

const pairs: KeypairResults = keypair();

Logger.ready('Keys generated!\n');

Logger.info('Initialising new keys...');
Logger.info('Writing public key...');

writeFileSync(resolve('./keys/rsa_jwt_public.pem'), pairs.public, { encoding: 'utf8' });

Logger.info('Writing private key...');

writeFileSync(resolve('./keys/rsa_jwt_private.pem'), pairs.private, { encoding: 'utf8' });

Logger.ready('All keys has been saved!');
