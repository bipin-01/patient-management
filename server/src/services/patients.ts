import ContactModel from '../models/contact';

import Logger from 'utils/logger';

const logger = new Logger('services/okr-areas');
import data from '../data/notes';

export async function fetchAll() {
  logger.info('Fetching Patients Information');

  const data = await ContactModel.find();
  const res = data;

  return res;
}

export async function fetchById(id: string) {
  logger.info(`Fetching Patient with id: ${id}`);

  const patient = data.find((n) => n._id === id);


  return patient;
}
