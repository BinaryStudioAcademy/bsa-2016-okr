import axios from 'axios';

export const OBJ_TEMPLATE_ACCEPTED = 'NOTIFICATIONS:OBJ_TEMPLATE_ACCEPTED';
export const OBJ_TEMPLATE_DECLINED = 'NOTIFICATIONS:OBJ_TEMPLATE_DECLINED';

export const KEY_TEMPLATE_ACCEPTED = 'NOTIFICATIONS:KEY_TEMPLATE_ACCEPTED';
export const KEY_TEMPLATE_DECLINED = 'NOTIFICATIONS:KEY_TEMPLATE_DECLINED';

export const RECEIVED_ERROR = 'NOTIFICATIONS:RECEIVED_ERROR';

export function notificationApprenticeUpdateKey(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice has modified him key result!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationApprenticeUpdateObjective(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice has modified him objective!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}


export function notificationApprenticeDeletedKey(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice has deleted him key result!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationApprenticeDeletedObjective(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice has deleted him objective!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationApprenticeAddedKeyResult(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice added new key result!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationApprenticeAddedObjective(userId) {

	let body = {};
	body.title = "Apprentice did update!";
	body.text = "Your apprentice added new objective!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationObjTemplateAccepted(userId) {

	let body = {};
	body.title = "Congratulation!";
	body.text = "Your objective template was accepted!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];

	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {
			dispatch({ type: REMOVE_REQUEST });
		})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function notificationObjTemplateDeclined(userId) {

	let body = {};
	body.title = "Sad news!";
	body.text = "Your objective template was declined!For more information follow by link.";
	body.images = [];
	body.url = "http:://localhost:4444/";
	body.sound = "true";
	body.serviceType = "OKR";
	body.users = [userId];


	return (dispatch, getStore) => {

		return axios.post('http://team.binary-studio.com/app/api/notification/', JSON.stringify(body))
		.then(response => {
		})
		.catch(response => {
			dispatch(receivedError(response.data));
		});
	};
}

export function receivedError(data) {
	
	return {
		type: RECEIVED_ERROR,
		data
	};
}