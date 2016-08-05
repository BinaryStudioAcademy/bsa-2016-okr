import { expect } from 'chai';
import '../../db/dbConnect';
import mongoose from 'mongoose';

describe('Database tests', () => {
	
	it('Connected to DB', () => {
		expect(mongoose.connection.readyState).to.equal(1);
	});
});