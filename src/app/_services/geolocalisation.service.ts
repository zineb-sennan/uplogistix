import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class GeoLocalisationService {

    constructor(private http: HttpClient) { }

    getPositions(vehicule_id: any, groupe_id: any) {
        return this.http.post(environment.apiURL + `/geolocalisation/last-position`, { vehicule_id: vehicule_id, groupe_id: groupe_id });
    }

    getHistorique(id: number, date_debut: any, date_fin: any) {
        return this.http.post(environment.apiURL + `/geolocalisation/vehicule/${id}/historique`, { date_debut, date_fin });
    }

    getTrajetDetails(id: number) {
        return this.http.get<any>(environment.apiURL + `/geolocalisation/trajet/${id}/details`);
    }

    getVehicules() {
        return this.http.get<any[]>(environment.apiURL + `/vehicules`);
    }

    getGroupes() {
        return this.http.get(environment.apiURL + `/vehicules/groupes/list`);
    }

    createZone(zone: any) {
        return this.http.post(environment.apiURL + `/geolocalisation/zones`, zone);
    }

    getAllZones() {
        return this.http.get(environment.apiURL + `/geolocalisation/zones`);
    }

    getZoneById(id: number) {
        return this.http.get(environment.apiURL + `/geolocalisation/zones/` + id);
    }

    updateZoneById(zone: any) {
        return this.http.put(environment.apiURL + `/geolocalisation/zones/` + zone.id, zone);
    }

    deleteZoneById(id: number) {
        return this.http.delete(environment.apiURL + `/geolocalisation/zones/` + id);
    }

    /*** *** Eco-conduite *** *** */
    
    // getSpeedAverage(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/speed-average`, record );
    // }

    // getMaxSpeed(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/max-speed`, record );
    // }

    // getDistance(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/distance`, record );
    // }

    // getDriveTime(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/drive-time`, record );
    // }

    // getL100(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/l100`, record );
    // }

    // getFuel(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/fuel`, record );
    // }

    // getCarbone(record: any){
    //     return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse/carbone`, record );
    // }

    getInfosDashboard(){
        return this.http.get<any>(environment.apiURL + `/geolocalisation/analyse/stats`);
    }

    getAnalyseVehicule(record:any){
        return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse-vehicule`, record);
    }

    analyseConducteur(record:any){
        return this.http.post<any>(environment.apiURL + `/geolocalisation/analyse-comportement`, record);
    }

    analyseParVehicule(id:number){
        return this.http.get<any>(environment.apiURL + '/geolocalisation/vehicules/'+id+'/stats');
    }

}