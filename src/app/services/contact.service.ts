import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Contacts } from "../models/contacts";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) {}

  getAllContacts() {
    return this.http.get(this.baseUrl + "contacts/bindContacts");
  }

  addContacts(contact:Contacts){
    return this.http.post(this.baseUrl+"contacts/add",contact);
  }
}
