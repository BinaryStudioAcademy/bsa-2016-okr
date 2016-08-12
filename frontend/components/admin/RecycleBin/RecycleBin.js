import React, { Component } from 'react'
import Tabs from './Tabs'
import Pane from './Pane'
import DeletedTmplsItem from './deletedTmplsItem'
import DeletedPlansItem from './deletedPlansItem'

import './recycleBin.scss'

import data_for_recycle from '../../mockData/data_for_recycle_bin'

class RecycleBin extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let deleted_tmpls = data_for_recycle.templates.map((item) => {
			return <DeletedTmplsItem item={item} key={item.id} />
		});
		let deleted_plans = data_for_recycle.plans.map((item) => {
			return <DeletedPlansItem item={item} key={item.id} />
		});
		return (
			<div className="recycle-page">
				<h2>Recycle Bin</h2>
				<Tabs>
					<Pane label="Templates">
						{ deleted_tmpls }
					</Pane>
					<Pane label="Plans">
						{ deleted_plans }
					</Pane>
				</Tabs>
			</div>
		);
	}
}

export default RecycleBin