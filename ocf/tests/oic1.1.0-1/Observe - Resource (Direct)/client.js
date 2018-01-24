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

var client = require( process.argv[ 3 ] ).client;

var observationCount = 0;

console.log( JSON.stringify( { assertionCount: 1 } ) );

function listener( resource ) {
	observationCount++;
	if ( observationCount === 3 ) {
		console.log( JSON.stringify( { assertion: "ok", arguments: [
			true, "Client: Performed three observations"
		] } ) );
		resource.removeListener( "update", listener );
	}
}

function devicefound( device ) {
	if ( device.name !== "test-device-" + process.argv[ 2 ] ) {
		return;
	}
	client.removeListener( "devicefound", devicefound );
	client.retrieve( {
			deviceId: device.uuid,
			resourcePath: "/a/" + process.argv[ 2 ]
	}, listener )
		.catch(
			function( error ) {
				console.log( JSON.stringify( { assertion: "ok", arguments: [
					false, "Client: Failed to directly retrieve resource: " +
						( "" + error ) + "\n" + JSON.stringify( error, null, 4 )
				] } ) );
			} );
}

client
	.findDevices( devicefound )
	.catch( function( error ) {
		console.log( JSON.stringify( { assertion: "ok", arguments: [
			false, "Client: Failed to start device discovery: " +
				( "" + error ) + "\n" + JSON.stringify( error, null, 4 )
		] } ) );
	} );
