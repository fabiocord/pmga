import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms';
import { Inject, Injectable, NgModule, OnInit, NgZone, Injector, ReflectiveInjector } from '@angular/core';
import { IValidatorService } from './../../../../../services/validator.service';
import { UserService } from './../../../../../services/user.service';
import { UtilsService } from './../../../../../utils/utils';

@Injectable()
export class UserFormValidatorService implements IValidatorService {
    
    
    constructor(private userService : UserService) {               
    }


    getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Preenchimento obrigatório',
            'invalidDocumento': 'Nº do CPF inválido',
            'invalidDocumentoExistente': 'CPF já utilizado',
            'invalidEmailExistente': 'E-mail já utilizado',
            'invalidEmailAddress': 'E-mail inválido',
            'invalidCreditCard': 'Is invalid credit card number',            
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Tamanho mínimo ${validatorValue.requiredLength} caracteres`
        };

        return config[validatorName];
    }

    static documentoValidator(control) {
        if(!UtilsService.verificaCpfValido(control.value))
            return {'invalidDocumento': true};
        else        
            return null;    
    }
    
    static documentoExistenteValidator(userService : UserService, documentoOld: string = "") {         
        return (control: AbstractControl) => {                        
            return userService.checkDocumentoNotTaken(documentoOld,control.value).map(res => {
                return res ? null : {'invalidDocumentoExistente': true};                
            });            
        }
    }

    static emailExistenteValidator(userService : UserService, emailOld: string = "") {   
        return (control: AbstractControl) => {            
            return userService.checkEmailNotTaken(emailOld,control.value).map(res => {
                return res ? null : {'invalidEmailExistente': true};
            });            
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    // static creditCardValidator(control) {
    //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    //     if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
    //         return null;
    //     } else {
    //         return { 'invalidCreditCard': true };
    //     }
    // }

    

    // static passwordValidator(control) {
    //     // {6,100}           - Assert password is between 6 and 100 characters
    //     // (?=.*[0-9])       - Assert a string has at least one number
    //     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
    //         return null;
    //     } else {
    //         return { 'invalidPassword': true };
    //     }
    // }

}