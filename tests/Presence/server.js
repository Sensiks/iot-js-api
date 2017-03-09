// Copyright 2016 Intel Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// The file names for client and server are reversed in this test, because the test suite uses the
// file name to decide which to run first ("server.js"). In the case of presence, however, the
// client must run first, because it must catch the announcement from the server when it comes up.

var client = require( process.argv[ 3 ] ).client;

console.log( JSON.stringify( { assertionCount: 1 } ) );

client
	.on( "devicefound", function( device ) {
		if ( device.name === "test-device-" + process.argv[ 2 ] ) {
			console.log( JSON.stringify( { assertion: "ok", arguments: [
				true, "Client: test device has appeared"
			] } ) );
			console.log( JSON.stringify( { finished: 0 } ) );
		}
	} );

console.log( JSON.stringify( { ready: true } ) );
