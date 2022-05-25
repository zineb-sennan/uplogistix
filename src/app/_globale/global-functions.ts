import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import * as $ from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class GlobalFunctions {

    constructor(
        private location:Location,
    ) {}

    closeModal() {
        $('.modal').hide();
        $('.modal-backdrop').remove();
        $('body').removeAttr("style");
    }

    fermer(){
        this.location.back();
    }

}