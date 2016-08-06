import { expect } from 'chai';
import '../../db/dbConnect';
import { connection } from 'mongoose';

describe('Database tests', () => {
	
	it('Connected to DB', () => {
		expect(connection.readyState).to.equal(1);
	});
});