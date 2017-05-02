import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getListBySearch = params => {  
		return axios.get(
			'http://10.48.154.203:8080/loyaltyApp/cms/productmanage/getListBySearch',
			{params:params}
		) }

//export const  listBySearch =  params => { return axios.get(`http://10.48.2.63:8080/loyaltyApp/cms/productmanage/getListBySearch`, { params: params }); };

//export const getTotal  = function() { 
//	return axios.get('http://10.48.2.63:8080/loyaltyApp/cms/productmanage/getListBySearch')
//	.then(function (response) {
//	    console.log('数据：',response.data);
//	})
//	.catch(function (error) {
//	    console.log(error);
//	});
//};