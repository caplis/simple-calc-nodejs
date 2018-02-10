const grpc = require('grpc');
const PROTOS = __dirname + '/protos/simple_calc.proto';
const protoDescriptor = grpc.load(PROTOS);

function add(call, callback) {
    const reducer = (a, c) => c + a;
    const value = call.request.operands.reduce(reducer, 0);
    callback(null, {value});
}

function sub(call, callback) {
    const reducer = (a, c) => a ? a - c : c;
    const value = call.request.operands.reduce(reducer, 0);
    callback(null, {value});
}

function mult(call, callback) {
    const reducer = (a, c) => a ? a * c : c;
    const value = call.request.operands.reduce(reducer, 0);
    callback(null, {value});
}

function div(call, callback) {
    if (call.request.operands.length !== 2) {
        return callback(new Error('expected 2 operands'));
    }
    const value = call.request.operands[0] / call.request.operands[1];
    callback(null, {value}); 
}

const server = new grpc.Server();
server.addService(protoDescriptor.simplecalc.SimpleCalc.service, {
    add,
    sub,
    mult,
    div
});
server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure());
server.start();
