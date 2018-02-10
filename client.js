const async = require('async');
const util = require('util');
const grpc = require('grpc');
const PROTOS = __dirname + '/protos/simple_calc.proto';
const protoDescriptor = grpc.load(PROTOS);
const client = new protoDescriptor.simplecalc.SimpleCalc('localhost:8080', grpc.credentials.createInsecure());

const operands = {operands:[10.0, 3.0, -2, 4]};

const timeoutToDeadline = (n) => Date.now() + n;

async.series([
  function addTest(cb) {
      client.add(operands, {deadline: timeoutToDeadline(2000)}, cb); 
  },
  function subTest(cb) {
      client.sub(operands, {deadline: timeoutToDeadline(2000)}, cb);
  },
  function multTest(cb) {
      client.mult(operands, {deadline: timeoutToDeadline(2000)}, cb);
  },
  function divTest(cb) {
      client.div({operands: [22, 10]}, {deadline: timeoutToDeadline(2000)}, cb);
  }], (err, res) => { err ? console.log(err) : console.log(res); });
