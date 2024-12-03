import {Observable, tap} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractEntity} from '../entities/abstractEntity';
import {appDefaults} from '../../config/config';
import {Page} from '../entities/page';
import {EntityModel} from '../entitymodels/entity-model';

export abstract class AbstractEntityService<E extends AbstractEntity> {
  baseUrl = appDefaults.serverUrl;
  findUrl: string;
  findByUrl: string;
  getUrl: string;

  protected constructor(protected http: HttpClient,
                        public entityType: typeof AbstractEntity) {
    this.findUrl = this.baseUrl + entityType.entityName + '/find';
    this.findByUrl = this.baseUrl + entityType.entityName + '/findby';
    this.getUrl = this.baseUrl + entityType.entityName + '/get';
  }

  findByOtherNameLike(otherEntity: typeof AbstractEntity, searchString: string, pageNumber: number, pageSize: number): Observable<Page<E>> {
    const params = new HttpParams()
      .set(otherEntity.entityName, searchString)
      .set(appDefaults.serviceParamPageNumber, pageNumber)
      .set(appDefaults.serviceParamPageSize, pageSize);
    return this.getPage(this.findByUrl, params);
  }

  findNameLike(searchString: string, pageNumber: number, pageSize: number): Observable<Page<E>> {
    const params = new HttpParams()
      .set(appDefaults.serviceParamName, searchString)
      .set(appDefaults.serviceParamPageNumber, pageNumber)
      .set(appDefaults.serviceParamPageSize, pageSize);
    return this.getPage(this.findUrl, params);
  }

  findByOtherId(otherEntityType: typeof AbstractEntity, id: number, pageNumber: number, pageSize: number): Observable<Page<E>> {
    const params = new HttpParams()
      .set(otherEntityType.entityName + appDefaults.serviceParamSuffixId, id)
      .set(appDefaults.serviceParamPageNumber, pageNumber)
      .set(appDefaults.serviceParamPageSize, pageSize);
    return this.getPage(this.getUrl, params);
  }

  protected getPage(url: string, params: HttpParams): Observable<Page<E>> {
    console.log("getPage", url, params);
    return this.http.get<Page<E>>(url, {params}).pipe(tap(
      page => {
        page.modelContent = page.content.map(e => new EntityModel(e));
      }));
  }
}
