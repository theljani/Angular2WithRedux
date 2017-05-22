import {Injectable} from '@angular/core';
import {ISigninState} from './signinState';
import {signinStore} from './store';
import {Observable} from 'rxjs/Observable';

import {AccountSigninService} from '../_services/account.signin.service';

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

@Injectable()
export class signinActions {

    constructor(private _signinService: AccountSigninService){}

    signin(state: ISigninState) : void {
        this._signinService.signIn(state.signinEntity)
            .map(result => result.json())
            .subscribe(data => {
                            signinStore.dispatch({
                                type: SIGNIN_SUCCESS,
                                payload: Object.assign({}, data)
                            });
                        },
                        error => {
                            signinStore.dispatch({
                                type: SIGNIN_FAILURE,
                                payload: Object.assign({}, error.json())
                            });
                        }
            );
    }
}


