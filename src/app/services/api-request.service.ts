import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'https://my-photo-room-backend.vercel.app'; // 'http://localhost:4000' // 'https://my-photo-room-backend.vercel.app'
  }

  // SOLICITUD: Para registrarse (base de datos)
  postAccountDB(formData: any) {
    return this.http.post<any>(`${this.URL}/database_account`, formData);
  }

  // SOLICITUD: Para iniciar sesión (base de datos)
  getAccountDB(formData: any) {
    return this.http.get<any>(
      `${this.URL}/database_account/${formData.user}/${formData.password}`
    );
  }

  // SOLICITUD: Para eliminar cuenta (base de datos)
  deleteAccountDB(user: string) {
    return this.http.delete<any>(`${this.URL}/database_account/${user}`);
  }

  // SOLICITUD: Para cargar datos de un usuario (base de datos)
  getUserDB(user: string) {
    return this.http.get<any>(`${this.URL}/database_user/${user}`);
  }

  // SOLICITUD: Para obtener imágen de perfil (base de datos)
  getProfileDB(userRef: string) {
    return this.http.get<any>(`${this.URL}/database_profile/${userRef}`);
  }

  // SOLICITUD: Para subir/eliminar imágen de perfil (base de datos)
  putProfileDB(imgData: any) {
    return this.http.put<any>(`${this.URL}/database_profile`, imgData);
  }

  /*
  // SOLICITUD: Para guardar imágen de perfil (backend)
  postProfileBE(imgData: any, user: string) {
    return this.http.post<any>(`${this.URL}/backend_profile/${user}`, imgData);
  }
  */

  // SOLICITUD: Para guardar imágen de perfil (cloudinary)
  postProfileCloudinary(imgData: any) {
    return this.http.post<any>(
      `https://api.cloudinary.com/v1_1/dfrujr0bd/image/upload`,
      imgData
    );
  }

  /*
  // SOLICITUD: Para eliminar imágen de perfil (backend)
  deleteProfileBE(imgData: any) {
    return this.http.delete<any>(`${this.URL}/backend_profile/${imgData}`);
  }
  */

  // SOLICITUD: Para eliminar imágen de perfil (cloudinary)
  deleteProfileCloudinary(imgName: any) {
    return this.http.put<any>(`${this.URL}/cloudinary_profile`, imgName);
  }

  // SOLICITUD: Para obtener todas las publicaciones de todos los usuarios (base de datos)
  getAllSubmitsDB(page: number) {
    return this.http.get<any>(`${this.URL}/database_all_submits/${page}`);
  }

  // SOLICITUD: Para eliminar todas las publicaciones del usuario (backend)
  deleteAllSubmitsBE(imgData: any) {
    return this.http.delete<any>(`${this.URL}/backend_all_submits/${imgData}`);
  }

  // SOLICITUD: Para obtener todas las publicaciones del usuario (base de datos)
  getSubmitsDB(user: string, page: number) {
    return this.http.get<any>(`${this.URL}/database_submits/${user}/${page}`);
  }

  // SOLICITUD: Para eliminar todas las publicaciones del usuario (base de datos)
  deleteSubmitsDB(user: string) {
    return this.http.delete<any>(`${this.URL}/database_submits/${user}`);
  }

  // SOLICITUD: Para eliminar todas las publicaciones del usuario (cloudinary)
  deleteSubmitsCloudinary(imgData: any) {
    console.log(imgData);
    return this.http.patch<any>(`${this.URL}/cloudinary_submits`, imgData);
  }

  // SOLICITUD: Para guardar una publicación (base de datos)
  postSubmitDB(formData: any) {
    return this.http.patch<any>(`${this.URL}/database_submit`, formData);
  }

  /*
  // SOLICITUD: Para guardar una publicación del usuario (backend)
  postSubmitBE(imgData: any, formData: any) {
    return this.http.post<any>(
      `${this.URL}/backend_submit/${formData.user}/${formData.date}`,
      imgData
    );
  }
  */

  // SOLICITUD: Para guardar una publicación del usuario (cloudinary)
  postSubmitCloudinary(imgData: any) {
    return this.http.post<any>(
      `https://api.cloudinary.com/v1_1/dfrujr0bd/image/upload`,
      imgData
    );
  }

  // SOLICITUD: Para obtener una publicación (base de datos)
  getSubmitDB(imageName: string) {
    return this.http.get<any>(`${this.URL}/database_submit/${imageName}`);
  }

  // SOLICITUD: Para eliminar una publicación (base de datos)
  deleteSubmitDB(id: number) {
    return this.http.delete<any>(`${this.URL}/database_submit/${id}`);
  }

  /*
  // SOLICITUD: Para eliminar una publicación (backend)
  deleteSubmitBE(imgName: string) {
    return this.http.delete<any>(`${this.URL}/backend_submit/${imgName}`);
  }
  */

  // SOLICITUD: Para eliminar una publicación (cloudinary)
  deleteSubmitCloudinary(imgName: any) {
    return this.http.put<any>(`${this.URL}/cloudinary_submit`, imgName);
  }
}