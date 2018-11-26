import loki from 'lokijs';
import Promise from 'bluebird';
import { has, extend, get, groupBy, each, omit, flatMap } from 'lodash';

var DB = new loki('ctu.db', { adapter: 'memory' });

export var areaDB = DB.addCollection('flights', {
	unique: ['areaId'],
	// indices: ['scheduleTime', 'seat', 'movement', 'naturalDate', 'operationDate', 'groundHandler', 'monitorId', 'status', 'markD', 'markV'],
});
// flightDB.ensureUniqueIndex('flightId');

// export var personalDB = DB.addCollection('personal', {
// 	indices: ['type', 'pageKey'],
// });

// const splitFlights = (flights) => {
// 	let movementCfg = {
// 		D: 'arriveFlight',
// 		A: 'departFlight',
// 	};
// 	return flatMap(flights, (item) => {
// 		let movement = get(item, 'movement');
// 		let field = movementCfg[movement];
// 		let otherFlight = item[field];
// 		if (otherFlight) {
// 			item[field] = otherFlight.flightId;
// 			return [item, otherFlight];
// 		}
// 		return item;
// 	});
// };

// export const saveToFlightDB = (flights) => {
// 	return Promise.map(splitFlights(flights), (item) => {
// 		//忽略内存数据库的特有属性
// 		let fixedItem = omit(item, ['$loki', 'meta']);

// 		if (has(fixedItem, 'deleted') && get(fixedItem, 'deleted')) {
// 			let flightId = get(fixedItem, 'flightId');
// 			let removeFlight = flightDB.by('flightId', flightId);
// 			if (removeFlight) {
// 				flightDB.remove(removeFlight);
// 			}
// 			return Promise.resolve();
// 		}
// 		//检查是否有对象不含FlightId, 忽略
// 		let flightId = get(fixedItem, 'flightId');
// 		if (flightId === 'null') {
// 			log.error('flightId is string null');
// 			return Promise.resolve();
// 		}
// 		if (flightId === 'undefined') {
// 			log.error('flightId is string undefined');
// 			return Promise.resolve();
// 		}
// 		if (!has(fixedItem, 'flightId')) {
// 			// log.error('missed key flightId for', fixedItem);
// 			return Promise.resolve();
// 		}

// 		//尝试Insert, 如果失败就Update
// 		try {
// 			let flightId = get(fixedItem, 'flightId');
// 			let existFlight = flightDB.by('flightId', flightId);
// 			if (!existFlight) {
// 				flightDB.insert(fixedItem);
// 			} else {
// 				flightDB.update(extend(existFlight, fixedItem));
// 			}
// 		} catch (ex) {
// 			log.error(fixedItem, ex);
// 		}
// 		return Promise.resolve();
// 	});
// };

// export const replacePersonalDBByType = (type, data) => {
// 	personalDB.findAndRemove({ type: type });
// 	let groupData = groupBy(data, (d) => get(d, 'pageKey'));
// 	groupData = each(groupData, (v, k) => {
// 		let value = each(v, (setting) => {
// 			personalDB.insert({ type: type, pageKey: k, key: get(setting, 'key'), value: get(setting, 'value') });
// 		});
// 	});
// 	return Promise.resolve();
// };
