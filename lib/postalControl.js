import postal from 'postal';
var postalMap = {};

export const pub = (channel, topic , data) =>{
	postal.publish({channel, topic, data});
}

export const sub = (channel, topic, callback)=>{
    let pos = postal.subscribe({
        channel, topic, callback
    });
    let [module, name] = topic.split('.');
    if(!postalMap[module]){
        postalMap[module] = {};
    }
    postalMap[module][name] = pos;
    console.log(postalMap);
}

export const removeSub = (topic) =>{
    if(!topic){return}
    let [module, name ]= topic.split('.');
    if(module && name && postalMap[module][name]){
        postalMap[module][name].unsubscribe();
        delete postalMap[module][name];
        return;
    }
    if(module){
        map(postalMap[module],(v,k)=>{
            v && postal.unsubscribe(v);
            delete postalMap[module][k];
        });
        delete postalMap[module];
    }
}

const clearPostal = ()=>{
    map(postalMap, (v,k)=>{
        removeSub(k);
    });
}
