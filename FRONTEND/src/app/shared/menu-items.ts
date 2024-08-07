import { Inject, Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashbaord', icon: 'home', role: '' },
    { state: 'category', name: 'Manage category', icon: 'home', role: '' },
    { state: 'users', name: 'Manage users', icon: 'home', role: 'admin' },
    { state: 'article', name: 'Articles', icon: 'home', role: '' },
    { state: 'help', name: 'Help', icon: 'home', role: '' }
]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}