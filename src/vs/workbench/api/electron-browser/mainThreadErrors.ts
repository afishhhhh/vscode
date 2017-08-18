/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as errors from 'vs/base/common/errors';
import { MainThreadErrorsShape, MainContext } from '../node/extHost.protocol';
import { extHostNamedCustomer } from "vs/workbench/api/electron-browser/extHostCustomers";

@extHostNamedCustomer(MainContext.MainThreadErrors)
export class MainThreadErrors implements MainThreadErrorsShape {

	public dispose(): void {
	}

	public $onUnexpectedExtHostError(err: any | errors.SerializedError): void {
		if (err.$isError) {
			const { name, message, stack } = err;
			err = new Error();
			err.name = name;
			err.message = message;
			err.stack = stack;
		}
		errors.onUnexpectedError(err);
	}
}
