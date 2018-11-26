import postal from 'postal';
import io from 'socket.io-client';
import Logger from 'logger';

const log = new Logger('library:socketIO');
const WSPORT = 8300;
export default (channel) => {
	let wsHost = location.hostname;
	let wsPort = WSPORT;
	log.verbose(`socket.io should connect to host ${wsHost} port ${wsPort} for channel ${channel}`);
	let socket = io(`${wsHost}:${wsPort}/${channel}`, { forceNew: false });
	socket.on('error', (error) => {
		log.error(`${channel} connection error`);
		log.error(error);
		postal.publish({
			channel: 'Web',
			topic: 'Network.Error',
		});
	});
	socket.on('connect', (error) => {
		log.info(`${channel} connected`);
		postal.publish({
			channel: 'Web',
			topic: 'Network.Connected',
		});
	});
	socket.on('disconnect', (error) => {
		log.info(`${channel} connection disconnected`);
		postal.publish({
			channel: 'Web',
			topic: 'Network.Disconnected',
		});
	});
	return socket;
};
